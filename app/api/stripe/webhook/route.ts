import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { createClient } from "@supabase/supabase-js"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-09-30.clover",
})

const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

type SubscriptionWithPeriod = Stripe.Subscription & {
  current_period_start: number
  current_period_end: number
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
  const userId = session.metadata?.user_id
  const planType = session.metadata?.plan_type

  if (!userId || !planType) {
    console.error("Missing metadata in checkout session")
    return
  }

  const subscription = (await stripe.subscriptions.retrieve(
    session.subscription as string,
  )) as unknown as SubscriptionWithPeriod

  await supabaseAdmin.from("subscriptions").upsert({
    user_id: userId,
    stripe_customer_id: session.customer as string,
    stripe_subscription_id: subscription.id,
    plan_type: planType,
    status: "active",
    current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
    current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
    cancel_at_period_end: false,
  })

  console.log(`Subscription created for user ${userId}`)
}

async function handleSubscriptionUpdate(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string

  const { data: existingSub } = await supabaseAdmin
    .from("subscriptions")
    .select("user_id")
    .eq("stripe_customer_id", customerId)
    .single()

  if (!existingSub) {
    console.error("Subscription not found for customer:", customerId)
    return
  }

  const sub = subscription as SubscriptionWithPeriod

  await supabaseAdmin
    .from("subscriptions")
    .update({
      stripe_subscription_id: sub.id,
      status: sub.status,
      current_period_start: new Date(sub.current_period_start * 1000).toISOString(),
      current_period_end: new Date(sub.current_period_end * 1000).toISOString(),
      cancel_at_period_end: sub.cancel_at_period_end,
      updated_at: new Date().toISOString(),
    })
    .eq("stripe_customer_id", customerId)

  console.log(`Subscription updated for customer ${customerId}`)
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
    console.error("Subscription not found for customer:", customerId)
    return
  }

  await supabaseAdmin.from("payment_history").insert({
    user_id: subscription.user_id,
    subscription_id: subscription.id,
    stripe_payment_intent_id: invoice.payment_intent as string,
    amount: invoice.amount_paid,
    currency: invoice.currency,
    status: "succeeded",
    description: invoice.description || "Subscription payment",
  })

  console.log(`Payment succeeded for customer ${customerId}`)
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
    stripe_payment_intent_id: invoice.payment_intent as string,
    amount: invoice.amount_due,
    currency: invoice.currency,
    status: "failed",
    description: invoice.description || "Subscription payment failed",
  })

  console.log(`Payment failed for customer ${customerId}`)
}
