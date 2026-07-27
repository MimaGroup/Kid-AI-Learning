import { type NextRequest, NextResponse } from "next/server"
import { createServiceRoleClient, createServerClient } from "@/lib/supabase/server"
import { hasCourseAccess } from "@/lib/course-access"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const supabase = await createServiceRoleClient()

    // Check if current user is admin
    let isAdmin = false
    let currentUser: any = null
    try {
      const userSupabase = await createServerClient()
      const { data: { user } } = await userSupabase.auth.getUser()
      currentUser = user
      if (user) {
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

    let query = supabase
      .from("courses")
      .select("*")
      .eq("slug", slug)

    if (!isAdmin) {
      query = query.eq("is_published", true)
    }

    const { data: course, error } = await query.single()

    if (error || !course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 })
    }

    const { data: lessons } = await supabase
      .from("course_lessons")
      .select("id, module_index, lesson_index, title, content_type, duration_minutes, key_concepts")
      .eq("course_id", course.id)
      .order("module_index", { ascending: true })
      .order("lesson_index", { ascending: true })

    // Check if user has purchased this course, or has an active/trial subscription
    let purchased = false
    let hasAccess = course.is_free ?? false
    try {
      const user = currentUser
      if (user) {
        const [{ data: purchase }, accessGranted] = await Promise.all([
          supabase
            .from("course_purchases")
            .select("id")
            .eq("user_id", user.id)
            .eq("course_id", course.id)
            .eq("status", "completed")
            .maybeSingle(),
          hasCourseAccess(supabase, user.id, course),
        ])
        purchased = !!purchase
        hasAccess = accessGranted
      }
    } catch {
      // User not authenticated, that's fine
    }

    return NextResponse.json({ course, lessons: lessons || [], purchased, hasAccess })
  } catch (error) {
    console.error("Error in course detail API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
