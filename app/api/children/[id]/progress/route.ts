import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Verify the child belongs to this parent
    const { data: child } = await supabase
      .from("children")
      .select("child_id")
      .eq("id", params.id)
      .eq("parent_id", user.id)
      .single()

    if (!child) {
      return NextResponse.json({ error: "Child not found" }, { status: 404 })
    }

    // Get progress data for this child
    const { data: progress, error: progressError } = await supabase
      .from("user_progress")
      .select("*")
      .eq("user_id", child.child_id)
      .order("completed_at", { ascending: false })
      .limit(50)

    if (progressError) {
      console.error("Error fetching progress:", progressError)
      return NextResponse.json({ error: progressError.message }, { status: 500 })
    }

    // Get achievements for this child
    const { data: achievements, error: achievementsError } = await supabase
      .from("achievements")
      .select("*")
      .eq("user_id", child.child_id)
      .order("earned_at", { ascending: false })

    if (achievementsError) {
      console.error("Error fetching achievements:", achievementsError)
      return NextResponse.json({ error: achievementsError.message }, { status: 500 })
    }

    // Calculate statistics
    const stats = {
      totalActivities: progress?.length || 0,
      totalAchievements: achievements?.length || 0,
      quizzesTaken: progress?.filter((p) => p.activity_type === "ai_quiz").length || 0,
      mysteriesSolved: progress?.filter((p) => p.activity_type === "ai_detective").length || 0,
      averageScore: progress?.length
        ? Math.round(progress.reduce((sum, p) => sum + (p.score || 0), 0) / progress.length)
        : 0,
    }

    return NextResponse.json({
      progress: progress || [],
      achievements: achievements || [],
      stats,
    })
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
