import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const supabase = await createServerClient()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: subscription, error } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("user_id", user.id)
      .single()

    if (error) {
      // User doesn't have a subscription yet, return free plan
      return NextResponse.json({
        plan_type: "free",
        status: "active",
        hasPremium: false,
      })
    }

    const hasPremium =
      subscription.status === "active" &&
      (subscription.plan_type === "monthly" || subscription.plan_type === "yearly") &&
      new Date(subscription.current_period_end) > new Date()

    return NextResponse.json({
      ...subscription,
      hasPremium,
    })
  } catch (error) {
    console.error("Subscription status error:", error)
    return NextResponse.json({ error: "Failed to fetch subscription status" }, { status: 500 })
  }
}
