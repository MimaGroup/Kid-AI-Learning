import { type NextRequest, NextResponse } from "next/server"
import { createServiceRoleClient, createServerClient } from "@/lib/supabase/server"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string; lessonId: string }> }
) {
  try {
    const { slug, lessonId } = await params
    const supabase = await createServiceRoleClient()

    // Get the course
    const { data: course, error: courseError } = await supabase
      .from("courses")
      .select("id, title, slug, price, age_min, age_max, curriculum")
      .eq("slug", slug)
      .eq("is_published", true)
      .single()

    if (courseError || !course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 })
    }

    // Check auth and purchase
    let userId: string | null = null
    try {
      const userSupabase = await createServerClient()
      const { data: { user } } = await userSupabase.auth.getUser()
      if (user) {
        userId = user.id
      }
    } catch {
      // Not authenticated
    }

    if (!userId) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    // Check purchase
    if (course.price > 0) {
      const { data: purchase } = await supabase
        .from("course_purchases")
        .select("id")
        .eq("user_id", userId)
        .eq("course_id", course.id)
        .eq("status", "completed")
        .single()

      if (!purchase) {
        return NextResponse.json({ error: "Course not purchased" }, { status: 403 })
      }
    }

    // Get the lesson with full content
    const { data: lesson, error: lessonError } = await supabase
      .from("course_lessons")
      .select("*")
      .eq("id", lessonId)
      .eq("course_id", course.id)
      .single()

    if (lessonError || !lesson) {
      return NextResponse.json({ error: "Lesson not found" }, { status: 404 })
    }

    // Get progress for this lesson
    const { data: progress } = await supabase
      .from("lesson_progress")
      .select("*")
      .eq("user_id", userId)
      .eq("lesson_id", lessonId)
      .single()

    // Get prev/next lessons
    const { data: allLessons } = await supabase
      .from("course_lessons")
      .select("id, module_index, lesson_index, title")
      .eq("course_id", course.id)
      .order("module_index", { ascending: true })
      .order("lesson_index", { ascending: true })

    let prevLesson = null
    let nextLesson = null
    if (allLessons) {
      const currentIdx = allLessons.findIndex(l => l.id === lessonId)
      if (currentIdx > 0) prevLesson = allLessons[currentIdx - 1]
      if (currentIdx < allLessons.length - 1) nextLesson = allLessons[currentIdx + 1]
    }

    // Mark as in_progress if not started
    if (!progress) {
      await supabase.from("lesson_progress").insert({
        user_id: userId,
        lesson_id: lessonId,
        course_id: course.id,
        status: "in_progress",
        started_at: new Date().toISOString(),
      })
    }

    const curriculum = course.curriculum as Array<{ module: string; lessons: number }>
    const moduleName = curriculum[lesson.module_index]?.module || `Modul ${lesson.module_index + 1}`

    return NextResponse.json({
      lesson: {
        ...lesson,
        moduleName,
      },
      progress: progress || { status: "in_progress", quiz_score: null },
      navigation: { prevLesson, nextLesson },
      course: { id: course.id, title: course.title, slug: course.slug, ageMin: course.age_min, ageMax: course.age_max },
    })
  } catch (error) {
    console.error("Error in lesson detail API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
