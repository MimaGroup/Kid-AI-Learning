import { type NextRequest, NextResponse } from "next/server"
import { createServiceRoleClient, createServerClient } from "@/lib/supabase/server"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const supabase = await createServiceRoleClient()

    // Get the course
    const { data: course, error: courseError } = await supabase
      .from("courses")
      .select("id, title, slug, price, curriculum")
      .eq("slug", slug)
      .eq("is_published", true)
      .single()

    if (courseError || !course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 })
    }

    // Check purchase status
    let userId: string | null = null
    let purchased = false
    try {
      const userSupabase = await createServerClient()
      const { data: { user } } = await userSupabase.auth.getUser()
      if (user) {
        userId = user.id
        if (course.price === 0) {
          purchased = true
        } else {
          const { data: purchase } = await supabase
            .from("course_purchases")
            .select("id")
            .eq("user_id", user.id)
            .eq("course_id", course.id)
            .eq("status", "completed")
            .single()
          purchased = !!purchase
        }
      }
    } catch {
      // Not authenticated
    }

    if (!purchased) {
      return NextResponse.json({ error: "Course not purchased" }, { status: 403 })
    }

    // Get all lessons for this course
    const { data: lessons, error: lessonsError } = await supabase
      .from("course_lessons")
      .select("id, course_id, module_index, lesson_index, title, content_type, duration_minutes, key_concepts")
      .eq("course_id", course.id)
      .order("module_index", { ascending: true })
      .order("lesson_index", { ascending: true })

    if (lessonsError) {
      console.error("Error fetching lessons:", lessonsError)
      return NextResponse.json({ error: "Failed to fetch lessons" }, { status: 500 })
    }

    // Get progress for this user
    let progressMap: Record<string, { status: string; completed_at: string | null; quiz_score: number | null }> = {}
    if (userId) {
      const { data: progress } = await supabase
        .from("lesson_progress")
        .select("lesson_id, status, completed_at, quiz_score")
        .eq("user_id", userId)
        .eq("course_id", course.id)

      if (progress) {
        progressMap = Object.fromEntries(
          progress.map(p => [p.lesson_id, { status: p.status, completed_at: p.completed_at, quiz_score: p.quiz_score }])
        )
      }
    }

    // Group lessons by module using curriculum data
    const curriculum = course.curriculum as Array<{ module: string; lessons: number }>
    const modules = curriculum.map((mod, moduleIndex) => {
      const moduleLessons = lessons
        .filter(l => l.module_index === moduleIndex)
        .map(l => ({
          ...l,
          progress: progressMap[l.id] || { status: "not_started", completed_at: null, quiz_score: null },
        }))

      const completedCount = moduleLessons.filter(l => l.progress.status === "completed").length

      return {
        index: moduleIndex,
        title: mod.module,
        totalLessons: mod.lessons,
        completedLessons: completedCount,
        lessons: moduleLessons,
      }
    })

    const totalLessons = lessons.length
    const completedLessons = Object.values(progressMap).filter(p => p.status === "completed").length

    return NextResponse.json({
      course: { id: course.id, title: course.title, slug: course.slug },
      modules,
      totalLessons,
      completedLessons,
      progressPercent: totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0,
    })
  } catch (error) {
    console.error("Error in lessons API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
