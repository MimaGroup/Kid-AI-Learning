import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { sendEmail, emailTemplates } from "@/lib/email"

export const dynamic = "force-dynamic"

// This endpoint is designed to be called by a Vercel Cron Job daily.
// It finds users who signed up but never did any activity and sends them
// a nudge email. It tracks which emails have been sent to avoid duplicates.
//
// Email sequence:
// - Day 1 after signup (no activity): "Need help getting started?" nudge
// - Day 3 (still inactive): Onboarding follow-up with tips
// - Day 7 (still inactive): Final nudge with activity highlights

export async function GET(request: NextRequest) {
  try {
    // Verify the request is from Vercel Cron (or allow in dev)
    const authHeader = request.headers.get("authorization")
    const cronSecret = process.env.CRON_SECRET

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const supabase = await createClient()

    // Fetch all users (parents) who have no activity
    const { data: allUsers, error: usersError } = await supabase
      .from("profiles")
      .select("id, email, display_name, created_at, last_activity_date")
      .or("role.eq.parent,role.is.null")
      .is("last_activity_date", null)

    if (usersError) {
      console.error("[v0] Error fetching inactive users:", usersError)
      return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
    }

    const now = new Date()
    let emailsSent = 0
    let emailsSkipped = 0
    let emailsFailed = 0
    const results: Array<{ email: string; type: string; status: string }> = []

    for (const user of allUsers || []) {
      const signupDate = new Date(user.created_at)
      const daysSinceSignup = Math.floor(
        (now.getTime() - signupDate.getTime()) / (1000 * 60 * 60 * 24)
      )

      // Determine which email to send based on days since signup
      let emailType: string | null = null
      let emailTemplate: { subject: string; html: string } | null = null
      const name = user.display_name || "there"

      if (daysSinceSignup >= 7) {
        emailType = "final_nudge"
        emailTemplate = emailTemplates.inactiveUserFinalNudge(name)
      } else if (daysSinceSignup >= 3) {
        emailType = "onboarding_followup"
        emailTemplate = emailTemplates.onboardingFollowUp(name, daysSinceSignup)
      } else if (daysSinceSignup >= 1) {
        emailType = "inactive_nudge"
        emailTemplate = emailTemplates.inactiveUserNudge(name)
      }

      if (!emailType || !emailTemplate) {
        emailsSkipped++
        continue
      }

      // Check if we already sent this type of email to this user
      let alreadySent = false
      try {
        const { data: existingLog } = await supabase
          .from("email_log")
          .select("id")
          .eq("user_id", user.id)
          .eq("email_type", emailType)
          .eq("status", "sent")
          .limit(1)

        alreadySent = (existingLog?.length || 0) > 0
      } catch {
        // email_log table may not exist, proceed anyway
      }

      if (alreadySent) {
        emailsSkipped++
        results.push({ email: user.email, type: emailType, status: "skipped_already_sent" })
        continue
      }

      // Send the email
      const result = await sendEmail({
        to: user.email,
        subject: emailTemplate.subject,
        html: emailTemplate.html,
      })

      if (result.success) {
        emailsSent++
        results.push({ email: user.email, type: emailType, status: "sent" })

        // Log the email (best effort)
        try {
          await supabase.from("email_log").insert({
            user_id: user.id,
            email_type: emailType,
            recipient_email: user.email,
            subject: emailTemplate.subject,
            status: "sent",
            metadata: {
              automated: true,
              days_since_signup: daysSinceSignup,
              sent_at: now.toISOString(),
            },
          })
        } catch {
          // email_log table may not exist
        }
      } else {
        emailsFailed++
        results.push({ email: user.email, type: emailType, status: "failed" })
      }
    }

    return NextResponse.json({
      success: true,
      summary: {
        totalInactiveUsers: allUsers?.length || 0,
        emailsSent,
        emailsSkipped,
        emailsFailed,
      },
      results,
    })
  } catch (error) {
    console.error("[v0] Cron inactive users error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
