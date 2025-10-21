import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { createClient } from "@supabase/supabase-js"
import { sendEmail, emailTemplates } from "@/lib/email"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-09-30.clover",
})

const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

type SubscriptionWithPeriod = Stripe.Subscription & {
  current_period_start: number
  current_period_end: number
}

type InvoiceWithPaymentIntent = Stripe.Invoice & {
  payment_intent: string | Stripe.PaymentIntent
}

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get("stripe-signature")!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    console.error("Webhook signature verification failed:", err)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session
        await handleCheckoutCompleted(session)
        break
      }

      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionUpdate(subscription)
        break
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionDeleted(subscription)
        break
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice
        await handlePaymentSucceeded(invoice)
        break
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice
        await handlePaymentFailed(invoice)
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook handler error:", error)
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 })
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  console.log("[v0] Checkout completed - Session ID:", session.id)
  console.log("[v0] Session metadata:", session.metadata)
  console.log("[v0] Session customer:", session.customer)
  console.log("[v0] Session subscription:", session.subscription)

  const userId = session.metadata?.user_id
  const planType = session.metadata?.plan_type

  if (!userId || !planType) {
    console.error("[v0] Missing metadata in checkout session - userId:", userId, "planType:", planType)
    return
  }

  if (!session.subscription) {
    console.error("[v0] No subscription ID in checkout session")
    return
  }

  try {
    const subscription = (await stripe.subscriptions.retrieve(
      session.subscription as string,
    )) as unknown as SubscriptionWithPeriod

    console.log("[v0] Retrieved subscription:", subscription.id, "Status:", subscription.status)

    const { data, error } = await supabaseAdmin.from("subscriptions").upsert(
      {
        user_id: userId,
        stripe_customer_id: session.customer as string,
        stripe_subscription_id: subscription.id,
        plan_type: planType,
        status: "active",
        current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
        current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
        cancel_at_period_end: false,
      },
      {
        onConflict: "user_id",
      },
    )

    if (error) {
      console.error("[v0] Database error creating subscription:", error)
      throw error
    }

    console.log("[v0] Subscription created/updated successfully for user:", userId)
    console.log("[v0] Database response:", data)
  } catch (error) {
    console.error("[v0] Error in handleCheckoutCompleted:", error)
    throw error
  }

  try {
    const { data: userData } = await supabaseAdmin
      .from("profiles")
      .select("email, display_name")
      .eq("id", userId)
      .single()

    if (userData?.email) {
      const planName = planType === "monthly" ? "Premium Monthly" : "Premium Yearly"
      const amount = planType === "monthly" ? 999 : 9999

      const emailTemplate = emailTemplates.subscriptionConfirmation(userData.display_name || "there", planName, amount)

      await sendEmail({
        to: userData.email,
        subject: emailTemplate.subject,
        html: emailTemplate.html,
      })

      console.log(`[v0] Subscription confirmation email sent to ${userData.email}`)
    }
  } catch (error) {
    console.error("[v0] Error sending subscription confirmation email:", error)
  }
}

async function handleSubscriptionUpdate(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string

  const { data: existingSub } = await supabaseAdmin
    .from("subscriptions")
    .select("user_id")
    .eq("stripe_customer_id", customerId)
    .single()

  if (!existingSub) {
    console.log(
      "[v0] Subscription not found for customer:",
      customerId,
      "- Skipping update (will be created by checkout.session.completed)",
    )
    return
  }

  const sub = subscription as SubscriptionWithPeriod

  const periodStart = sub.current_period_start ? new Date(sub.current_period_start * 1000).toISOString() : null
  const periodEnd = sub.current_period_end ? new Date(sub.current_period_end * 1000).toISOString() : null

  await supabaseAdmin
    .from("subscriptions")
    .update({
      stripe_subscription_id: sub.id,
      status: sub.status,
      current_period_start: periodStart,
      current_period_end: periodEnd,
      cancel_at_period_end: sub.cancel_at_period_end,
      updated_at: new Date().toISOString(),
    })
    .eq("stripe_customer_id", customerId)

  console.log(`[v0] Subscription updated for customer ${customerId}`)
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string

  await supabaseAdmin
    .from("subscriptions")
    .update({
      status: "canceled",
      updated_at: new Date().toISOString(),
    })
    .eq("stripe_customer_id", customerId)

  console.log(`Subscription canceled for customer ${customerId}`)
}

async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
  const customerId = invoice.customer as string

  const { data: subscription } = await supabaseAdmin
    .from("subscriptions")
    .select("id, user_id")
    .eq("stripe_customer_id", customerId)
    .single()

  if (!subscription) {
    console.log(
      "[v0] Subscription not found for customer:",
      customerId,
      "- Skipping payment record (subscription not created yet)",
    )
    return
  }

  const invoiceWithIntent = invoice as unknown as InvoiceWithPaymentIntent

  await supabaseAdmin.from("payment_history").insert({
    user_id: subscription.user_id,
    subscription_id: subscription.id,
    stripe_payment_intent_id: invoiceWithIntent.payment_intent as string,
    amount: invoice.amount_paid,
    currency: invoice.currency,
    status: "succeeded",
    description: invoice.description || "Subscription payment",
  })

  console.log(`[v0] Payment succeeded for customer ${customerId}`)

  try {
    const { data: userData } = await supabaseAdmin
      .from("profiles")
      .select("email, display_name")
      .eq("id", subscription.user_id)
      .single()

    if (userData?.email) {
      const amount = invoice.amount_paid
      const date = new Date(invoice.created * 1000).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })

      const emailTemplate = emailTemplates.paymentReceipt(
        userData.display_name || "there",
        amount,
        date,
        invoice.hosted_invoice_url || "",
      )

      await sendEmail({
        to: userData.email,
        subject: emailTemplate.subject,
        html: emailTemplate.html,
      })

      console.log(`[v0] Payment receipt email sent to ${userData.email}`)
    }
  } catch (error) {
    console.error("[v0] Error sending payment receipt email:", error)
  }
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  const customerId = invoice.customer as string

  const { data: subscription } = await supabaseAdmin
    .from("subscriptions")
    .select("id, user_id")
    .eq("stripe_customer_id", customerId)
    .single()

  if (!subscription) {
    console.error("Subscription not found for customer:", customerId)
    return
  }

  const invoiceWithIntent = invoice as unknown as InvoiceWithPaymentIntent

  await supabaseAdmin
    .from("subscriptions")
    .update({
      status: "past_due",
      updated_at: new Date().toISOString(),
    })
    .eq("stripe_customer_id", customerId)

  await supabaseAdmin.from("payment_history").insert({
    user_id: subscription.user_id,
    subscription_id: subscription.id,
    stripe_payment_intent_id: invoiceWithIntent.payment_intent as string,
    amount: invoice.amount_due,
    currency: invoice.currency,
    status: "failed",
    description: invoice.description || "Subscription payment failed",
  })

  console.log(`Payment failed for customer ${customerId}`)
}
