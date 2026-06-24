import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string; lessonId: string }> }
) {
  const { lessonId } = await params
  const supabase = await createServerClient()

  const { data: { session } } = await supabase.auth.getSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  // Check subscription
  const { data: sub } = await supabase
    .from("subscriptions")
    .select("status")
    .eq("user_id", session.user.id)
    .maybeSingle()

  const hasAccess = sub?.status === "active" || sub?.status === "trialing"
  if (!hasAccess) {
    return NextResponse.json({ error: "Subscription required", code: "NO_SUBSCRIPTION" }, { status: 403 })
  }

  const { data: lesson, error } = await supabase
    .from("course_lessons")
    .select("*")
    .eq("id", lessonId)
    .single()

  if (error || !lesson) return NextResponse.json({ error: "Lesson not found" }, { status: 404 })
  return NextResponse.json({ lesson })
}
