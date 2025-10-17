import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { sendEmail, emailTemplates } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Get all active users with children
    const { data: parents, error: parentsError } = await supabase
      .from("profiles")
      .select("id, email, display_name")
      .eq("role", "parent")

    if (parentsError) {
      console.error("[v0] Error fetching parents:", parentsError)
      return NextResponse.json({ error: "Failed to fetch parents" }, { status: 500 })
    }

    let emailsSent = 0
    let emailsFailed = 0

    for (const parent of parents || []) {
      try {
        // Get parent's children
        const { data: children } = await supabase.from("children").select("id, name").eq("parent_id", parent.id)

        if (!children || children.length === 0) continue

        // For each child, get weekly stats
        for (const child of children) {
          const oneWeekAgo = new Date()
          oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

          // Get activity stats
          const { data: activities } = await supabase
            .from("user_progress")
            .select("*")
            .eq("user_id", child.id)
            .gte("completed_at", oneWeekAgo.toISOString())

          // Get achievements
          const { data: achievements } = await supabase
            .from("achievements")
            .select("*")
            .eq("user_id", child.id)
            .gte("earned_at", oneWeekAgo.toISOString())

          const stats = {
            activitiesCompleted: activities?.length || 0,
            timeSpent: activities?.reduce((sum, a) => sum + (a.time_spent || 0), 0) || 0,
            pointsEarned: activities?.reduce((sum, a) => sum + (a.score || 0), 0) || 0,
            achievementsUnlocked: achievements?.length || 0,
            highlights: [
              activities && activities.length > 0 ? `Completed ${activities.length} activities` : null,
              achievements && achievements.length > 0 ? `Unlocked ${achievements.length} new achievements` : null,
            ].filter(Boolean),
          }

          // Only send if there's activity
          if (stats.activitiesCompleted > 0) {
            const emailTemplate = emailTemplates.weeklyProgress(parent.display_name || "there", child.name, stats)

            const result = await sendEmail({
              to: parent.email,
              subject: emailTemplate.subject,
              html: emailTemplate.html,
            })

            if (result.success) {
              emailsSent++

              // Log email
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

    return NextResponse.json({
      success: true,
      emailsSent,
      emailsFailed,
    })
  } catch (error) {
    console.error("[v0] Weekly summary error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
