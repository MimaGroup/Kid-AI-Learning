import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createServerClient()

  const { data: course, error: courseError } = await supabase
    .from("courses")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single()

  if (courseError || !course) {
    return NextResponse.json({ error: "Course not found" }, { status: 404 })
  }

  const { data: lessons } = await supabase
    .from("course_lessons")
    .select("id, module_index, lesson_index, title, content_type, duration_minutes, key_concepts")
    .eq("course_id", course.id)
    .order("module_index")
    .order("lesson_index")

  // Check if the current user has an active subscription
  let hasAccess = course.is_free
  const { data: { session } } = await supabase.auth.getSession()
  if (session) {
    const { data: sub } = await supabase
      .from("subscriptions")
      .select("status")
      .eq("user_id", session.user.id)
      .maybeSingle()
    hasAccess = hasAccess || sub?.status === "active" || sub?.status === "trialing"
  }

  return NextResponse.json({ course, lessons: lessons ?? [], hasAccess })
}
