import { NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { sendTrialReminderEmail } from "@/lib/emails"

// Called daily by Vercel Cron — sends trial reminder 3 days before expiry
export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization")
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const supabase = createAdminClient()
  const now = new Date()
  const in3Days = new Date(now.getTime() + 3 * 86400000).toISOString()
  const in4Days = new Date(now.getTime() + 4 * 86400000).toISOString()

  // Find trialing subscriptions expiring in ~3 days
  const { data: expiring } = await supabase
    .from("subscriptions")
    .select("user_id, current_period_end")
    .eq("status", "trialing")
    .gte("current_period_end", in3Days)
    .lte("current_period_end", in4Days)

  if (!expiring?.length) return NextResponse.json({ sent: 0 })

  const userIds = expiring.map(s => s.user_id)
  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, email")
    .in("id", userIds)

  const emailMap = Object.fromEntries((profiles ?? []).map(p => [p.id, p.email]))

  let sent = 0
  for (const sub of expiring) {
    const email = emailMap[sub.user_id]
    if (!email) continue
    const daysLeft = Math.ceil((new Date(sub.current_period_end).getTime() - now.getTime()) / 86400000)
    await sendTrialReminderEmail(email, daysLeft).catch(console.error)
    sent++
  }

  return NextResponse.json({ sent })
}
