import { type NextRequest, NextResponse } from "next/server"
import { createServiceRoleClient, createServerClient } from "@/lib/supabase/server"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const supabase = await createServiceRoleClient()

    const { data: course, error } = await supabase
      .from("courses")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .single()

    if (error || !course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 })
    }

    // Check if user has purchased this course
    let purchased = false
    try {
      const userSupabase = await createServerClient()
      const { data: { user } } = await userSupabase.auth.getUser()

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
