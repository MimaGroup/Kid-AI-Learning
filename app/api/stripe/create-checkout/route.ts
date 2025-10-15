import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { createServerClient, createServiceRoleClient } from "@/lib/supabase/server"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-09-30.clover",
})

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Checkout API called")

    const { priceId, planType } = await request.json()
    console.log("[v0] Request data:", { priceId, planType })

    if (!priceId || !planType) {
      console.log("[v0] Missing required fields")
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const supabase = await createServerClient()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    console.log("[v0] User auth:", { userId: user?.id, authError })

    if (authError || !user) {
      console.log("[v0] Unauthorized")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const supabaseAdmin = await createServiceRoleClient()

    // Check if user already has a Stripe customer ID
    const { data: subscription } = await supabaseAdmin
      .from("subscriptions")
      .select("stripe_customer_id")
      .eq("user_id", user.id)
      .single()

    console.log("[v0] Existing subscription:", subscription)

    let customerId = subscription?.stripe_customer_id

    // Create Stripe customer if doesn't exist
    if (!customerId) {
      console.log("[v0] Creating new Stripe customer")
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: {
          supabase_user_id: user.id,
        },
      })
      customerId = customer.id
      console.log("[v0] Created customer:", customerId)

      // Save customer ID to database
      await supabaseAdmin.from("subscriptions").upsert({
        user_id: user.id,
        stripe_customer_id: customerId,
        plan_type: "free",
        status: "active",
      })
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://v0-ai-for-kids-inky.vercel.app"
    console.log("[v0] Site URL:", siteUrl)

    // Create Stripe checkout session
    console.log("[v0] Creating checkout session")
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${siteUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/pricing`,
      metadata: {
        user_id: user.id,
        plan_type: planType,
      },
    })

    console.log("[v0] Checkout session created:", session.id)
    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error("[v0] Stripe checkout error:", error)
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 })
  }
}
