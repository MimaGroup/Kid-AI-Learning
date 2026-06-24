import { NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { createAdminClient } from "@/lib/supabase/admin"
import { sendWelcomeEmail, sendPaymentFailedEmail, sendCancellationEmail } from "@/lib/emails"
import Stripe from "stripe"

function getPlanType(interval: string | null | undefined): string {
  if (interval === "year") return "yearly"
  return "monthly"
}

function subToRow(subscription: Stripe.Subscription, userId: string, customerId?: string) {
  const price = subscription.items.data[0]?.price
  const planType = getPlanType(price?.recurring?.interval)
  return {
    user_id: userId,
    stripe_customer_id: customerId ?? subscription.customer as string,
    stripe_subscription_id: subscription.id,
    plan_type: planType,
    status: subscription.status,
    current_period_start: new Date((subscription as any).current_period_start * 1000).toISOString(),
    current_period_end: new Date((subscription as any).current_period_end * 1000).toISOString(),
    cancel_at_period_end: subscription.cancel_at_period_end,
    updated_at: new Date().toISOString(),
  }
}

async function getUserEmail(supabase: ReturnType<typeof createAdminClient>, userId: string): Promise<string | null> {
  const { data } = await supabase.from("profiles").select("email").eq("id", userId).maybeSingle()
  return data?.email ?? null
}

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get("stripe-signature")

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    console.error("Webhook signature failed:", err)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  const supabase = createAdminClient()

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session
      const userId = session.metadata?.user_id
      if (!userId || !session.subscription || !session.customer) break

      const subscription = await stripe.subscriptions.retrieve(session.subscription as string)
      const row = subToRow(subscription, userId, session.customer as string)
      await supabase.from("subscriptions").upsert(row, { onConflict: "user_id" })

      // Welcome email
      const email = session.customer_email ?? await getUserEmail(supabase, userId)
      if (email) {
        const isTrial = subscription.status === "trialing"
        const planType = row.plan_type as "monthly" | "yearly"
        await sendWelcomeEmail(email, planType, isTrial).catch(console.error)
      }
      break
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription
      const userId = subscription.metadata?.user_id
      if (!userId) break

      await supabase.from("subscriptions").upsert(
        subToRow(subscription, userId),
        { onConflict: "user_id" }
      )
      break
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription
      const userId = subscription.metadata?.user_id
      if (!userId) break

      const accessUntil = new Date((subscription as any).current_period_end * 1000).toISOString()
      await supabase.from("subscriptions")
        .update({ status: "canceled", cancel_at_period_end: false, updated_at: new Date().toISOString() })
        .eq("user_id", userId)

      // Cancellation email
      const email = await getUserEmail(supabase, userId)
      if (email) await sendCancellationEmail(email, accessUntil).catch(console.error)
      break
    }

    case "invoice.payment_failed": {
      const invoice = event.data.object as Stripe.Invoice
      const subscriptionId = (invoice as any).subscription as string | null
      if (!subscriptionId) break
      const subscription = await stripe.subscriptions.retrieve(subscriptionId)
      const userId = subscription.metadata?.user_id
      if (!userId) break

      await supabase.from("subscriptions")
        .update({ status: "past_due", updated_at: new Date().toISOString() })
        .eq("user_id", userId)

      // Payment failed email
      const email = (invoice as any).customer_email ?? await getUserEmail(supabase, userId)
      if (email) await sendPaymentFailedEmail(email).catch(console.error)
      break
    }
  }

  return NextResponse.json({ received: true })
}
