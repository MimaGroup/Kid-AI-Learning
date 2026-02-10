import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Checkout API called")

    const { priceId, planType, trialDays } = await request.json()
    console.log("[v0] Request data:", { priceId, planType, trialDays })

    if (!priceId || !planType) {
      console.log("[v0] Missing required fields")
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const cookieStore = await cookies()

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
          set(name: string, value: string, options: any) {
            try {
              cookieStore.set(name, value, options)
            } catch (error) {
              // Cookie setting might fail in API routes, but that's okay for read operations
            }
          },
          remove(name: string, options: any) {
            try {
              cookieStore.delete(name)
            } catch (error) {
              // Cookie removal might fail in API routes, but that's okay for read operations
            }
          },
        },
      },
    )

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    console.log("[v0] User auth:", { userId: user?.id, email: user?.email, hasError: !!authError })

    if (authError || !user) {
      console.log("[v0] Unauthorized - authError:", authError?.message || "Auth session missing!")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://v0-ai-for-kids-inky.vercel.app"
    console.log("[v0] Creating checkout session for user:", user.email)

    let customerId: string

    // Try to find existing customer by email
    const existingCustomers = await stripe.customers.list({
      email: user.email!,
      limit: 1,
    })

    if (existingCustomers.data.length > 0) {
      customerId = existingCustomers.data[0].id
      console.log("[v0] Found existing customer:", customerId)

      // Update customer metadata if needed
      await stripe.customers.update(customerId, {
        metadata: {
          user_id: user.id,
        },
      })
    } else {
      // Create new customer with metadata
      const customer = await stripe.customers.create({
        email: user.email!,
        metadata: {
          user_id: user.id,
        },
      })
      customerId = customer.id
      console.log("[v0] Created new customer:", customerId)
    }

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
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
    }

    // Add free trial if requested
    if (trialDays && trialDays > 0) {
      sessionParams.subscription_data = {
        trial_period_days: trialDays,
      }
      console.log("[v0] Adding trial period:", trialDays, "days")
    }

    const session = await stripe.checkout.sessions.create(sessionParams)

    console.log("[v0] Checkout session created successfully:", session.id)
    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error("[v0] Error in checkout API:", error)
    return NextResponse.json(
      {
        error: "Failed to create checkout session",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
