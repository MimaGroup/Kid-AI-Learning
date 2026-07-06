import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const userType = searchParams.get("userType") || "parent"

    const { data, error } = await supabase
      .from("onboarding_progress")
      .select("*")
      .eq("user_id", user.id)
      .eq("user_type", userType)
      .single()

    if (error && error.code !== "PGRST116") {
      throw error
    }

    return NextResponse.json({ progress: data })
  } catch (error) {
    console.error("[v0] Error fetching onboarding progress:", error)
    return NextResponse.json({ error: "Failed to fetch onboarding progress" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { userType, currentStep, totalSteps, completed, metadata } = body

    // Upsert onboarding progress
    const { data, error } = await supabase
      .from("onboarding_progress")
      .upsert(
        {
          user_id: user.id,
          user_type: userType,
          current_step: currentStep,
          total_steps: totalSteps,
          completed: completed || false,
          completed_at: completed ? new Date().toISOString() : null,
          metadata: metadata || {},
        },
        {
          onConflict: "user_id,user_type",
        },
      )
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, progress: data })
  } catch (error) {
    console.error("[v0] Error updating onboarding progress:", error)
    return NextResponse.json({ error: "Failed to update onboarding progress" }, { status: 500 })
  }
}
