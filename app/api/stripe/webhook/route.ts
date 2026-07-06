import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { createClient } from "@supabase/supabase-js"
import { sendEmail, emailTemplates } from "@/lib/email"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not configured")
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY)
}

function getSupabaseAdmin() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("Supabase environment variables are not configured")
  }
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
}

type SubscriptionWithPeriod = Stripe.Subscription & {
  current_period_start: number
  current_period_end: number
}

type InvoiceWithPaymentIntent = Stripe.Invoice & {
  payment_intent: string | Stripe.PaymentIntent
}

export async function POST(request: NextRequest) {
  const stripe = getStripe()
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

  // Handle course purchases (one-time payments)
  if (session.metadata?.type === "course_purchase") {
    await handleCoursePurchase(session)
    return
  }

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
    const stripe = getStripe()
    const subscription = (await stripe.subscriptions.retrieve(
      session.subscription as string,
    )) as unknown as SubscriptionWithPeriod

    console.log("[v0] Retrieved subscription:", subscription.id, "Status:", subscription.status)
    console.log("[v0] Subscription periods:", subscription.current_period_start, subscription.current_period_end)

    const periodStart = subscription.current_period_start
      ? new Date(subscription.current_period_start * 1000).toISOString()
      : new Date().toISOString()

    const periodEnd = subscription.current_period_end
      ? new Date(subscription.current_period_end * 1000).toISOString()
      : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // Default to 30 days from now

    const { data, error } = await getSupabaseAdmin().from("subscriptions").upsert(
      {
        user_id: userId,
        stripe_customer_id: session.customer as string,
        stripe_subscription_id: subscription.id,
        plan_type: planType,
        status: "active",
        current_period_start: periodStart,
        current_period_end: periodEnd,
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
    const { data: userData } = await getSupabaseAdmin()
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

async function handleCoursePurchase(session: Stripe.Checkout.Session) {
  const userId = session.metadata?.user_id
  const courseId = session.metadata?.course_id

  if (!userId || !courseId) {
    console.error("[v0] Missing course purchase metadata:", { userId, courseId })
    return
  }

  try {
    const { error } = await getSupabaseAdmin().from("course_purchases").upsert(
      {
        user_id: userId,
        course_id: courseId,
        stripe_session_id: session.id,
        stripe_payment_intent_id: session.payment_intent as string,
        amount: session.amount_total || 0,
        currency: session.currency || "eur",
        status: "completed",
      },
      {
        onConflict: "user_id,course_id",
      },
    )

    if (error) {
      console.error("[v0] Error recording course purchase:", error)
      throw error
    }

    console.log(`[v0] Course purchase recorded - User: ${userId}, Course: ${courseId}`)

    // Send confirmation email
    try {
      const { data: userData } = await getSupabaseAdmin()
        .from("profiles")
        .select("email, display_name")
        .eq("id", userId)
        .single()

      const { data: courseData } = await getSupabaseAdmin()
        .from("courses")
        .select("title, slug")
        .eq("id", courseId)
        .single()

      if (userData?.email && courseData) {
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://v0-ai-for-kids-inky.vercel.app"
        await sendEmail({
          to: userData.email,
          subject: `Potrditev nakupa: ${courseData.title}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
              <h1 style="color: #7C3AED;">Hvala za nakup!</h1>
              <p>Pozdravljeni ${userData.display_name || ""},</p>
              <p>Uspešno ste kupili tečaj <strong>${courseData.title}</strong>.</p>
              <p>Zdaj imate neomejen dostop do vseh lekcij in materialov.</p>
              <a href="${siteUrl}/courses/${courseData.slug}" style="display: inline-block; background: #7C3AED; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; margin-top: 16px;">Začni z učenjem</a>
            </div>
          `,
        })
        console.log(`[v0] Course purchase confirmation email sent to ${userData.email}`)
      }
    } catch (emailError) {
      console.error("[v0] Error sending course purchase email:", emailError)
    }
  } catch (error) {
    console.error("[v0] Error in handleCoursePurchase:", error)
    throw error
  }
}

async function handleSubscriptionUpdate(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string

  const { data: existingSub } = await getSupabaseAdmin()
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

  const periodStart = sub.current_period_start
    ? new Date(sub.current_period_start * 1000).toISOString()
    : new Date().toISOString()

  const periodEnd = sub.current_period_end
    ? new Date(sub.current_period_end * 1000).toISOString()
    : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()

  let planType = "monthly" // default
  if (sub.items.data.length > 0) {
    const priceId = sub.items.data[0].price.id
    // Check if it's the yearly price
    if (priceId === process.env.NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID) {
      planType = "yearly"
    }
  }

  await getSupabaseAdmin()
    .from("subscriptions")
    .update({
      stripe_subscription_id: sub.id,
      plan_type: planType,
      status: sub.status,
      current_period_start: periodStart,
      current_period_end: periodEnd,
      cancel_at_period_end: sub.cancel_at_period_end,
      updated_at: new Date().toISOString(),
    })
    .eq("stripe_customer_id", customerId)

  console.log(
    `[v0] Subscription updated for customer ${customerId} - Status: ${sub.status}, Plan: ${planType}, Cancel at period end: ${sub.cancel_at_period_end}`,
  )
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string

  await getSupabaseAdmin()
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

  const { data: subscription } = await getSupabaseAdmin()
    .from("subscriptions")
    .select("id, user_id")
    .eq("stripe_customer_id", customerId)
    .single()

  let userId = subscription?.user_id
  const subscriptionId = subscription?.id

  if (!subscription) {
    console.log(
      "[v0] Subscription not found in database for customer:",
      customerId,
      "- Will create payment record without subscription link",
    )

    try {
      const stripe = getStripe()
      const customer = await stripe.customers.retrieve(customerId)
      if (customer && !customer.deleted && customer.metadata?.user_id) {
        userId = customer.metadata.user_id
        console.log("[v0] Found user_id from Stripe customer metadata:", userId)
      }
    } catch (error) {
      console.error("[v0] Error retrieving customer from Stripe:", error)
    }

    if (!userId) {
      console.error("[v0] Cannot create payment record - no user_id found for customer:", customerId)
      return
    }
  }

  const invoiceWithIntent = invoice as unknown as InvoiceWithPaymentIntent

  const { error: paymentError } = await getSupabaseAdmin().from("payment_history").insert({
    user_id: userId,
    subscription_id: subscriptionId || null,
    stripe_payment_intent_id: invoiceWithIntent.payment_intent as string,
    amount: invoice.amount_paid,
    currency: invoice.currency,
    status: "succeeded",
    description: invoice.description || "Subscription payment",
  })

  if (paymentError) {
    console.error("[v0] Error creating payment record:", paymentError)
  } else {
    console.log(`[v0] Payment record created for customer ${customerId}, user ${userId}`)
  }

  try {
    const { data: userData } = await getSupabaseAdmin()
      .from("profiles")
      .select("email, display_name")
      .eq("id", userId)
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

  const { data: subscription } = await getSupabaseAdmin()
    .from("subscriptions")
    .select("id, user_id")
    .eq("stripe_customer_id", customerId)
    .single()

  if (!subscription) {
    console.error("Subscription not found for customer:", customerId)
    return
  }

  const invoiceWithIntent = invoice as unknown as InvoiceWithPaymentIntent

  await getSupabaseAdmin()
    .from("subscriptions")
    .update({
      status: "past_due",
      updated_at: new Date().toISOString(),
    })
    .eq("stripe_customer_id", customerId)

  await getSupabaseAdmin().from("payment_history").insert({
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
