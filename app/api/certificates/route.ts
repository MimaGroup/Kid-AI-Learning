import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

// Returns all courses the user has fully completed (derived from lesson_progress)
export async function GET() {
  const supabase = await createServerClient()
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const userId = session.user.id

  // Get all completed lesson progress grouped by course
  const { data: progress } = await supabase
    .from("lesson_progress")
    .select("course_id, status, completed_at")
    .eq("user_id", userId)
    .eq("status", "completed")

  if (!progress?.length) return NextResponse.json({ certificates: [] })

  // Count completions per course
  const courseMap: Record<string, { count: number; lastDate: string }> = {}
  for (const p of progress) {
    if (!courseMap[p.course_id]) courseMap[p.course_id] = { count: 0, lastDate: p.completed_at }
    courseMap[p.course_id].count++
    if (p.completed_at > courseMap[p.course_id].lastDate) {
      courseMap[p.course_id].lastDate = p.completed_at
    }
  }

  // Fetch course info for all relevant courses
  const courseIds = Object.keys(courseMap)
  const { data: courses } = await supabase
    .from("courses")
    .select("id, title, slug, lessons_count")
    .in("id", courseIds)

  const certificates = (courses ?? [])
    .filter(c => c.lessons_count > 0 && (courseMap[c.id]?.count ?? 0) >= c.lessons_count)
    .map(c => ({
      course_id: c.id,
      course_title: c.title,
      slug: c.slug,
      completed_at: courseMap[c.id].lastDate,
    }))

  return NextResponse.json({ certificates })
}
