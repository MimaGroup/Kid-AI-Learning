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
  const now = new Date()
  const in7Days = new Date(now.getTime() + 7 * 86400000).toISOString()

  const [
    { count: totalUsers },
    { data: subscriptions },
    { count: totalLessonsCompleted },
    { count: totalBadgesEarned },
    { data: recentUsers },
    { data: courseProgress },
    { data: allProgress },
  ] = await Promise.all([
    admin.from("profiles").select("id", { count: "exact", head: true }),
    admin.from("subscriptions").select("user_id, status, plan_type, current_period_end, created_at"),
    admin.from("lesson_progress").select("id", { count: "exact", head: true }).eq("status", "completed"),
    admin.from("user_badges").select("id", { count: "exact", head: true }),
    admin.from("profiles").select("id, email, created_at").order("created_at", { ascending: false }).limit(10),
    // lessons completed per course_id
    admin.from("lesson_progress").select("course_id").eq("status", "completed"),
    // all users who ever started a lesson (for inactive calc)
    admin.from("lesson_progress").select("user_id"),
  ])

  const subs = subscriptions ?? []
  const active   = subs.filter(s => s.status === "active").length
  const trialing = subs.filter(s => s.status === "trialing").length
  const pastDue  = subs.filter(s => s.status === "past_due").length
  const canceled = subs.filter(s => s.status === "canceled").length
  const monthly  = subs.filter(s => s.plan_type === "monthly" && ["active","trialing"].includes(s.status)).length
  const yearly   = subs.filter(s => s.plan_type === "yearly"  && ["active","trialing"].includes(s.status)).length

  // Conversion funnel
  const totalWithSub  = subs.length
  const convertedToActive = active
  const conversionRate = totalWithSub > 0
    ? Math.round((convertedToActive / totalWithSub) * 100)
    : 0

  // Trials expiring in 7 days
  const trialsExpiringSoon = subs.filter(s =>
    s.status === "trialing" &&
    s.current_period_end != null &&
    s.current_period_end <= in7Days &&
    s.current_period_end >= now.toISOString()
  )

  // Past due users
  const pastDueUsers = subs.filter(s => s.status === "past_due")

  // Never active (registered but no lesson started)
  const activeUserIds = new Set((allProgress ?? []).map(p => p.user_id))
  const subUserIds    = new Set(subs.map(s => s.user_id))
  const recentAll = await admin.from("profiles").select("id, email, created_at").order("created_at", { ascending: false })
  const neverActiveUsers = (recentAll.data ?? []).filter(u => !activeUserIds.has(u.id)).slice(0, 20)
  const neverActiveCount = (recentAll.data ?? []).filter(u => !activeUserIds.has(u.id)).length
  const registeredNoSub  = (recentAll.data ?? []).filter(u => !subUserIds.has(u.id)).length

  // Course popularity — count completed lessons per course_id
  const courseCompletions: Record<string, number> = {}
  for (const row of (courseProgress ?? [])) {
    if (row.course_id) courseCompletions[row.course_id] = (courseCompletions[row.course_id] ?? 0) + 1
  }

  // Fetch course names
  const { data: courses } = await admin.from("courses").select("id, title, slug, lessons_count")
  const courseStats = (courses ?? []).map(c => ({
    id: c.id,
    title: c.title,
    slug: c.slug,
    lessonsTotal: c.lessons_count,
    lessonsCompleted: courseCompletions[c.id] ?? 0,
  })).sort((a, b) => b.lessonsCompleted - a.lessonsCompleted)

  return NextResponse.json({
    users: {
      total: totalUsers ?? 0,
      recent: recentUsers ?? [],
      neverActive: neverActiveCount,
      neverActiveList: neverActiveUsers,
      registeredNoSub,
    },
    subscriptions: {
      total: subs.length,
      active,
      trialing,
      pastDue,
      canceled,
      monthly,
      yearly,
      mrr: (active * 7.9 + yearly * (79 / 12)).toFixed(2),
      conversionRate,
      trialsExpiringSoon: trialsExpiringSoon.map(s => ({ userId: s.user_id, expiresAt: s.current_period_end })),
      pastDueList: pastDueUsers.map(s => ({ userId: s.user_id, since: s.created_at })),
    },
    activity: {
      lessonsCompleted: totalLessonsCompleted ?? 0,
      badgesEarned: totalBadgesEarned ?? 0,
    },
    courses: courseStats,
  })
}
