import { type NextRequest, NextResponse } from "next/server"
import { createServiceRoleClient, createServerClient } from "@/lib/supabase/server"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const supabase = await createServiceRoleClient()

    // Authenticate user
    const userSupabase = await createServerClient()
    const { data: { user } } = await userSupabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    // Check admin status
    let isAdmin = false
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single()
    isAdmin = profile?.role === "admin"

    // Get the course (admins can see unpublished)
    let courseQuery = supabase
      .from("courses")
      .select("id, title, slug, curriculum")
      .eq("slug", slug)

    if (!isAdmin) {
      courseQuery = courseQuery.eq("is_published", true)
    }

    const { data: course, error: courseError } = await courseQuery.single()

    if (courseError || !course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 })
    }

    // Get total lessons count
    const { count: totalLessons } = await supabase
      .from("course_lessons")
      .select("id", { count: "exact", head: true })
      .eq("course_id", course.id)

    // Get completed lessons count
    const { count: completedLessons } = await supabase
      .from("lesson_progress")
      .select("id", { count: "exact", head: true })
      .eq("user_id", user.id)
      .eq("course_id", course.id)
      .eq("status", "completed")

    if (!totalLessons || !completedLessons || completedLessons < totalLessons) {
      return NextResponse.json(
        { error: "Course not completed yet", completedLessons, totalLessons },
        { status: 403 }
      )
    }

    // Get user profile for the name
    const { data: profile } = await supabase
      .from("profiles")
      .select("display_name, email")
      .eq("id", user.id)
      .single()

    // Find the earliest and latest completion dates
    const { data: progressDates } = await supabase
      .from("lesson_progress")
      .select("completed_at")
      .eq("user_id", user.id)
      .eq("course_id", course.id)
      .eq("status", "completed")
      .order("completed_at", { ascending: false })
      .limit(1)

    const completionDate = progressDates?.[0]?.completed_at || new Date().toISOString()

    // Get average quiz score
    const { data: quizScores } = await supabase
      .from("lesson_progress")
      .select("quiz_score")
      .eq("user_id", user.id)
      .eq("course_id", course.id)
      .eq("status", "completed")
      .not("quiz_score", "is", null)

    let averageScore: number | null = null
    if (quizScores && quizScores.length > 0) {
      const total = quizScores.reduce((sum, s) => sum + (s.quiz_score || 0), 0)
      averageScore = Math.round(total / quizScores.length)
    }

    return NextResponse.json({
      studentName: profile?.display_name || profile?.email?.split("@")[0] || "Učenec",
      courseTitle: course.title,
      completionDate,
      totalLessons,
      averageScore,
    })
  } catch (error) {
    console.error("Certificate API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
