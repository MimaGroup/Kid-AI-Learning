import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

const MILESTONE_BADGES: { badge_id: string; threshold: number }[] = [
  { badge_id: "first_steps",       threshold: 1  },
  { badge_id: "quick_learner",     threshold: 5  },
  { badge_id: "dedicated_student", threshold: 25 },
  { badge_id: "master_learner",    threshold: 100 },
]

export async function POST(req: NextRequest) {
  const supabase = await createServerClient()
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { lesson_id, course_id, status, quiz_score } = await req.json()
  if (!lesson_id || !course_id || !status) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 })
  }

  const userId = session.user.id
  const now = new Date().toISOString()

  if (status === "started") {
    // Only insert if no record exists yet — don't overwrite a completed lesson
    const { data: existing } = await supabase
      .from("lesson_progress")
      .select("id")
      .eq("user_id", userId)
      .eq("lesson_id", lesson_id)
      .maybeSingle()
    if (!existing) {
      await supabase.from("lesson_progress").insert({
        user_id: userId, lesson_id, course_id, status: "started", started_at: now, updated_at: now,
      })
    }
    return NextResponse.json({ ok: true, newBadges: [] })
  }

  // completed: upsert full record
  const update: Record<string, unknown> = {
    user_id: userId,
    lesson_id,
    course_id,
    status: "completed",
    completed_at: now,
    updated_at: now,
  }
  if (quiz_score !== undefined) update.quiz_score = quiz_score

  await supabase.from("lesson_progress").upsert(update, { onConflict: "user_id,lesson_id" })

  // Check badge conditions after completion
  const newBadges: string[] = []

  const { count } = await supabase
    .from("lesson_progress")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("status", "completed")

  const total = count ?? 0

  const { data: earned } = await supabase
    .from("user_badges")
    .select("badge_id")
    .eq("user_id", userId)

  const earnedSet = new Set((earned ?? []).map(b => b.badge_id))

  for (const { badge_id, threshold } of MILESTONE_BADGES) {
    if (total >= threshold && !earnedSet.has(badge_id)) {
      await supabase.from("user_badges").insert({ user_id: userId, badge_id, earned_at: now })
      newBadges.push(badge_id)
    }
  }

  if (quiz_score === 100 && !earnedSet.has("perfect_score")) {
    await supabase.from("user_badges").insert({ user_id: userId, badge_id: "perfect_score", earned_at: now })
    newBadges.push("perfect_score")
  }

  // Check if entire course is now completed
  const { data: courseRow } = await supabase
    .from("courses")
    .select("title, lessons_count")
    .eq("id", course_id)
    .maybeSingle()

  let courseCompleted = false
  if (courseRow && courseRow.lessons_count > 0) {
    const { count: doneCount } = await supabase
      .from("lesson_progress")
      .select("id", { count: "exact", head: true })
      .eq("user_id", userId)
      .eq("course_id", course_id)
      .eq("status", "completed")
    if ((doneCount ?? 0) >= courseRow.lessons_count) courseCompleted = true
  }

  return NextResponse.json({ ok: true, newBadges, courseCompleted, courseTitle: courseRow?.title ?? "" })
}

export async function GET(req: NextRequest) {
  const supabase = await createServerClient()
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const courseId = req.nextUrl.searchParams.get("course_id")

  // Without course_id — return all progress grouped by course
  if (!courseId) {
    const { data } = await supabase
      .from("lesson_progress")
      .select("lesson_id, course_id, status, quiz_score, completed_at")
      .eq("user_id", session.user.id)
    return NextResponse.json({ progress: data ?? [] })
  }

  const { data } = await supabase
    .from("lesson_progress")
    .select("lesson_id, status, quiz_score, completed_at")
    .eq("user_id", session.user.id)
    .eq("course_id", courseId)

  return NextResponse.json({ progress: data ?? [] })
}
