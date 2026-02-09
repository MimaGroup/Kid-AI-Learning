import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { sendEmail, emailTemplates } from "@/lib/email"

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Verify admin auth
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single()

    if (!profile || profile.role !== "admin") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }

    const body = await request.json()
    const { userId, email, displayName, emailType } = body

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    const name = displayName || "there"
    let emailTemplate

    switch (emailType) {
      case "inactive_nudge":
        emailTemplate = emailTemplates.inactiveUserNudge(name)
        break
      case "final_nudge":
        emailTemplate = emailTemplates.inactiveUserFinalNudge(name)
        break
      case "onboarding_followup":
        emailTemplate = emailTemplates.onboardingFollowUp(name, 3)
        break
      default:
        emailTemplate = emailTemplates.inactiveUserNudge(name)
    }

    const result = await sendEmail({
      to: email,
      subject: emailTemplate.subject,
      html: emailTemplate.html,
    })

    if (!result.success) {
      return NextResponse.json(
        { error: "Failed to send email", details: result.error },
        { status: 500 }
      )
    }

    // Log the email send in the database (best effort)
    try {
      await supabase.from("email_log").insert({
        user_id: userId || null,
        email_type: emailType || "inactive_nudge",
        recipient_email: email,
        subject: emailTemplate.subject,
        status: "sent",
        metadata: { sent_by_admin: user.id, sent_at: new Date().toISOString() },
      })
    } catch {
      // email_log table may not exist yet, that's fine
    }

    return NextResponse.json({ success: true, message: `Email sent to ${email}` })
  } catch (error) {
    console.error("[v0] Error sending nudge email:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
