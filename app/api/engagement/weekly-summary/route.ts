import { type NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { sendEmail, emailTemplates } from "@/lib/email"

export const dynamic = "force-dynamic"

async function runWeeklySummary() {
  // Cron jobs have no user session/cookies, so an RLS-scoped client would see zero rows —
  // this must run with the service-role admin client.
  const supabase = createAdminClient()

  // Only email parents who haven't opted out of weekly reports.
  const { data: parents, error: parentsError } = await supabase
    .from("profiles")
    .select("id, email, display_name")
    .eq("role", "parent")
    .eq("weekly_reports_enabled", true)

  if (parentsError) {
    console.error("[v0] Error fetching parents:", parentsError)
    throw new Error("Failed to fetch parents")
  }

  let emailsSent = 0
  let emailsFailed = 0

  for (const parent of parents || []) {
    try {
      const { data: children } = await supabase.from("children").select("id, name").eq("parent_id", parent.id)

      if (!children || children.length === 0) continue

      for (const child of children) {
        const oneWeekAgo = new Date()
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

        const { data: activities } = await supabase
          .from("user_progress")
          .select("*")
          .eq("user_id", parent.id)
          .eq("child_profile_id", child.id)
          .gte("completed_at", oneWeekAgo.toISOString())

        const { data: achievements } = await supabase
          .from("achievements")
          .select("*")
          .eq("user_id", parent.id)
          .eq("child_profile_id", child.id)
          .gte("earned_at", oneWeekAgo.toISOString())

        const stats = {
          activitiesCompleted: activities?.length || 0,
          timeSpent: activities?.reduce((sum, a) => sum + (a.time_spent || 0), 0) || 0,
          pointsEarned: activities?.reduce((sum, a) => sum + (a.score || 0), 0) || 0,
          achievementsUnlocked: achievements?.length || 0,
          highlights: [
            activities && activities.length > 0 ? `Opravljenih ${activities.length} dejavnosti` : null,
            achievements && achievements.length > 0 ? `Odklenjenih ${achievements.length} novih dosežkov` : null,
          ].filter(Boolean),
        }

        // Only send if there's activity
        if (stats.activitiesCompleted > 0) {
          const emailTemplate = emailTemplates.weeklyProgress(parent.display_name || "", child.name, stats)

          const result = await sendEmail({
            to: parent.email,
            subject: emailTemplate.subject,
            html: emailTemplate.html,
          })

          if (result.success) {
            emailsSent++

            await supabase.from("email_log").insert({
              user_id: parent.id,
              email_type: "weekly_progress",
              recipient_email: parent.email,
              subject: emailTemplate.subject,
              status: "sent",
              metadata: { child_id: child.id, stats },
            })
          } else {
            emailsFailed++
          }
        }
      }
    } catch (error) {
      console.error(`[v0] Error processing parent ${parent.id}:`, error)
      emailsFailed++
    }
  }

  return { emailsSent, emailsFailed }
}

// Called weekly by Vercel Cron (see vercel.json)
export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization")
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const result = await runWeeklySummary()
    return NextResponse.json({ success: true, ...result })
  } catch (error) {
    console.error("[v0] Weekly summary error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Manual trigger (e.g. from an internal admin tool) — requires the same cron secret.
export async function POST(req: NextRequest) {
  const auth = req.headers.get("authorization")
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const result = await runWeeklySummary()
    return NextResponse.json({ success: true, ...result })
  } catch (error) {
    console.error("[v0] Weekly summary error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
