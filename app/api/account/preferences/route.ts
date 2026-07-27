import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export const dynamic = "force-dynamic"

export async function GET() {
  const supabase = await createServerClient()
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("email_notifications_enabled, weekly_reports_enabled, achievement_alerts_enabled")
    .eq("id", user.id)
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({
    emailNotifications: data?.email_notifications_enabled ?? true,
    weeklyReports: data?.weekly_reports_enabled ?? true,
    achievementAlerts: data?.achievement_alerts_enabled ?? true,
  })
}

export async function PATCH(req: NextRequest) {
  const supabase = await createServerClient()
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  let body: { emailNotifications?: boolean; weeklyReports?: boolean; achievementAlerts?: boolean }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Neveljavna zahteva" }, { status: 400 })
  }

  const update: Record<string, boolean> = {}
  if (typeof body.emailNotifications === "boolean") update.email_notifications_enabled = body.emailNotifications
  if (typeof body.weeklyReports === "boolean") update.weekly_reports_enabled = body.weeklyReports
  if (typeof body.achievementAlerts === "boolean") update.achievement_alerts_enabled = body.achievementAlerts

  const { error } = await supabase.from("profiles").update(update).eq("id", user.id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
