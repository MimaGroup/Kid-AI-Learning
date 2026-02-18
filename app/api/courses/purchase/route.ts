import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { createServerClient as createSupabaseServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(request: NextRequest) {
  try {
    const { courseId, courseSlug, courseTitle, priceInCents } = await request.json()

    if (!courseId || !courseSlug || !courseTitle || priceInCents === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const cookieStore = await cookies()
    const supabase = createSupabaseServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
          set(name: string, value: string, options: any) {
            try { cookieStore.set(name, value, options) } catch {}
          },
          remove(name: string, options: any) {
            try { cookieStore.delete(name) } catch {}
          },
        },
      },
    )

    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if already purchased
    const { data: existingPurchase } = await supabase
      .from("course_purchases")
      .select("id")
      .eq("user_id", user.id)
      .eq("course_id", courseId)
      .eq("status", "completed")
      .single()

    if (existingPurchase) {
      return NextResponse.json({ error: "Course already purchased" }, { status: 400 })
    }

    // If course is free, record purchase directly
    if (priceInCents === 0) {
      const { createServiceRoleClient } = await import("@/lib/supabase/server")
      const serviceSupabase = await createServiceRoleClient()

      await serviceSupabase.from("course_purchases").insert({
        user_id: user.id,
        course_id: courseId,
        amount: 0,
        currency: "eur",
        status: "completed",
      })

      return NextResponse.json({ success: true, free: true })
    }

    // Find or create Stripe customer
    let customerId: string
    const existingCustomers = await stripe.customers.list({
      email: user.email!,
      limit: 1,
    })

    if (existingCustomers.data.length > 0) {
      customerId = existingCustomers.data[0].id
      await stripe.customers.update(customerId, {
        metadata: { user_id: user.id },
      })
    } else {
      const customer = await stripe.customers.create({
        email: user.email!,
        metadata: { user_id: user.id },
      })
      customerId = customer.id
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://v0-ai-for-kids-inky.vercel.app"

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: courseTitle,
              description: `Online tečaj: ${courseTitle}`,
            },
            unit_amount: priceInCents,
          },
          quantity: 1,
        },
      ],
      success_url: `${siteUrl}/courses/${courseSlug}?purchased=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/courses/${courseSlug}`,
      metadata: {
        user_id: user.id,
        course_id: courseId,
        type: "course_purchase",
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error("Error in course purchase API:", error)
    return NextResponse.json(
      { error: "Failed to create checkout session", details: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    )
  }
}
