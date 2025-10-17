import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const childId = searchParams.get("childId")

    if (!childId) {
      return NextResponse.json({ error: "Child ID required" }, { status: 400 })
    }

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
      .select("child_id, name")
      .eq("id", childId)
      .eq("parent_id", user.id)
      .single()

    if (!child) {
      return NextResponse.json({ error: "Child not found" }, { status: 404 })
    }

    // Get all progress data
    const { data: progress } = await supabase
      .from("user_progress")
      .select("*")
      .eq("user_id", child.child_id)
      .order("completed_at", { ascending: false })

    const { data: achievements } = await supabase
      .from("achievements")
      .select("*")
      .eq("user_id", child.child_id)
      .order("earned_at", { ascending: false })

    const { data: profile } = await supabase
      .from("profiles")
      .select("points, level, experience, streak_days")
      .eq("id", child.child_id)
      .maybeSingle()

    const { data: earnedBadges } = await supabase
      .from("user_badges")
      .select("*, badges(*)")
      .eq("user_id", child.child_id)

    const stats = {
      totalActivities: progress?.length || 0,
      totalAchievements: achievements?.length || 0,
      quizzesTaken: progress?.filter((p) => p.activity_type === "ai_quiz").length || 0,
      mysteriesSolved: progress?.filter((p) => p.activity_type === "ai_detective").length || 0,
      mathGames: progress?.filter((p) => p.activity_type === "math_adventure").length || 0,
      wordGames: progress?.filter((p) => p.activity_type === "word_builder").length || 0,
      memoryGames: progress?.filter((p) => p.activity_type === "memory_match").length || 0,
      averageScore: progress?.length
        ? Math.round(progress.reduce((sum, p) => sum + (p.score || 0), 0) / progress.length)
        : 0,
    }

    return NextResponse.json({
      stats,
      achievements,
      gamification: {
        points: profile?.points || 0,
        level: profile?.level || 1,
        streakDays: profile?.streak_days || 0,
        earnedBadges: earnedBadges || [],
      },
    })
  } catch (error) {
    console.error("Error generating report:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
