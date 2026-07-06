import { type NextRequest, NextResponse } from "next/server"
import { createServiceRoleClient, createServerClient } from "@/lib/supabase/server"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string; lessonId: string }> }
) {
  try {
    const { slug, lessonId } = await params
    const supabase = await createServiceRoleClient()

    // Check auth and admin status
    let userId: string | null = null
    let isAdmin = false
    try {
      const userSupabase = await createServerClient()
      const { data: { user } } = await userSupabase.auth.getUser()
      if (user) {
        userId = user.id
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single()
        isAdmin = profile?.role === "admin"
      }
    } catch {
      // Not authenticated
    }

    if (!userId) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    // Get the course (admins can see unpublished)
    let courseQuery = supabase
      .from("courses")
      .select("id, title, slug, price, age_min, age_max, curriculum")
      .eq("slug", slug)

    if (!isAdmin) {
      courseQuery = courseQuery.eq("is_published", true)
    }

    const { data: course, error: courseError } = await courseQuery.single()

    if (courseError || !course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 })
    }

    // Check purchase (admins bypass)
    if (!isAdmin && course.price > 0) {
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
