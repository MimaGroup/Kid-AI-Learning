import { type NextRequest, NextResponse } from "next/server"
import { createServiceRoleClient, createServerClient } from "@/lib/supabase/server"

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string; lessonId: string }> }
) {
  try {
    const { slug, lessonId } = await params
    const supabase = await createServiceRoleClient()

    // Check auth
    let userId: string | null = null
    try {
      const userSupabase = await createServerClient()
      const { data: { user } } = await userSupabase.auth.getUser()
      if (user) userId = user.id
    } catch {
      // Not authenticated
    }

    if (!userId) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    // Verify course and lesson exist
    const { data: course } = await supabase
      .from("courses")
      .select("id")
      .eq("slug", slug)
      .single()

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 })
    }

    const { data: lesson } = await supabase
      .from("course_lessons")
      .select("id")
      .eq("id", lessonId)
      .eq("course_id", course.id)
      .single()

    if (!lesson) {
      return NextResponse.json({ error: "Lesson not found" }, { status: 404 })
    }

    const body = await request.json()
    const { status, quiz_score } = body

    if (!["in_progress", "completed"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 })
    }

    const updateData: Record<string, unknown> = {
      user_id: userId,
      lesson_id: lessonId,
      course_id: course.id,
      status,
    }

    if (status === "completed") {
      updateData.completed_at = new Date().toISOString()
    }

    if (status === "in_progress" ) {
      updateData.started_at = new Date().toISOString()
    }

    if (typeof quiz_score === "number") {
      updateData.quiz_score = Math.min(100, Math.max(0, quiz_score))
    }

    const { data: progress, error } = await supabase
      .from("lesson_progress")
      .upsert(updateData, { onConflict: "user_id,lesson_id" })
      .select()
      .single()

    if (error) {
      console.error("Error updating progress:", error)
      return NextResponse.json({ error: "Failed to update progress" }, { status: 500 })
    }

    return NextResponse.json({ progress })
  } catch (error) {
    console.error("Error in progress API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
