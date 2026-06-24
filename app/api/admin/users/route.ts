import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"

const ADMIN_EMAIL = "danijel.milovanovic88@gmail.com"

export async function GET() {
  const supabase = await createServerClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session || session.user.email !== ADMIN_EMAIL) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const admin = createAdminClient()

  const { data: profiles } = await admin
    .from("profiles")
    .select("id, email, created_at")
    .order("created_at", { ascending: false })

  const { data: subscriptions } = await admin
    .from("subscriptions")
    .select("user_id, status, plan_type, current_period_end, cancel_at_period_end, created_at")

  const { data: progress } = await admin
    .from("lesson_progress")
    .select("user_id, status")

  const { data: badges } = await admin
    .from("user_badges")
    .select("user_id, badge_id")

  const subMap = Object.fromEntries((subscriptions ?? []).map(s => [s.user_id, s]))
  const progressCount = (progress ?? []).reduce((acc, p) => {
    if (p.status === "completed") acc[p.user_id] = (acc[p.user_id] ?? 0) + 1
    return acc
  }, {} as Record<string, number>)
  const badgeCount = (badges ?? []).reduce((acc, b) => {
    acc[b.user_id] = (acc[b.user_id] ?? 0) + 1
    return acc
  }, {} as Record<string, number>)

  const users = (profiles ?? []).map(p => ({
    id: p.id,
    email: p.email,
    createdAt: p.created_at,
    subscription: subMap[p.id] ?? null,
    lessonsCompleted: progressCount[p.id] ?? 0,
    badgesEarned: badgeCount[p.id] ?? 0,
  }))

  return NextResponse.json({ users })
}
