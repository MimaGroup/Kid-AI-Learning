import { createServerClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = await createServerClient()

    // Check if user is admin
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get user profile to check role
    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

    if (profile?.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    // Fetch recent activities with user email
    const { data: activities, error } = await supabase
      .from("user_progress")
      .select(
        `
        id,
        activity_type,
        activity_id,
        score,
        time_spent,
        completed_at,
        user_id,
        profiles!inner(email)
      `,
      )
      .order("completed_at", { ascending: false })
      .limit(50)

    if (error) {
      console.error("Error fetching activities:", error)
      return NextResponse.json({ error: "Failed to fetch activities" }, { status: 500 })
    }

    // Transform the data to include user email
    const transformedActivities = activities?.map((activity: any) => ({
      id: activity.id,
      user_email: activity.profiles?.email || "Unknown",
      activity_type: activity.activity_type,
      activity_id: activity.activity_id,
      score: activity.score || 0,
      time_spent: activity.time_spent || 0,
      completed_at: activity.completed_at,
    }))

    return NextResponse.json({ activities: transformedActivities })
  } catch (error) {
    console.error("Error in recent activities API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
