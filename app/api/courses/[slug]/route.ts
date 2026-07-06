import { type NextRequest, NextResponse } from "next/server"
import { createServiceRoleClient, createServerClient } from "@/lib/supabase/server"

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

    // Check if user has purchased this course
    let purchased = false
    try {
      const user = currentUser

      if (user) {
        const { data: purchase } = await supabase
          .from("course_purchases")
          .select("id")
          .eq("user_id", user.id)
          .eq("course_id", course.id)
          .eq("status", "completed")
          .single()

        purchased = !!purchase
      }
    } catch {
      // User not authenticated, that's fine
    }

    return NextResponse.json({ course, purchased })
  } catch (error) {
    console.error("Error in course detail API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
