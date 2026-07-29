import { type NextRequest, NextResponse } from "next/server"
import { createClient, createServiceRoleClient } from "@/lib/supabase/server"
import { sendEmail, emailTemplates } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    const supabase = await createClient()

    // This request is made while logged out, so there's no auth.uid() for
    // RLS to match against -- needs the service role to look up the name.
    const adminSupabase = await createServiceRoleClient()
    const { data: profile } = await adminSupabase.from("profiles").select("display_name").eq("email", email).single()

    // Generate password reset link using Supabase Auth
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/auth/reset-password`,
    })

    if (error) {
      console.error("[v0] Error requesting password reset:", error)
      // Don't reveal if email exists or not for security
      return NextResponse.json({
        success: true,
        message: "If an account exists with this email, you will receive a password reset link.",
      })
    }

    // Send custom password reset email
    try {
      const resetLink = `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/auth/reset-password`
      const emailTemplate = emailTemplates.passwordReset(profile?.display_name || "", resetLink)

      await sendEmail({
        to: email,
        subject: emailTemplate.subject,
        html: emailTemplate.html,
      })

      console.log("[v0] Password reset email sent to:", email)
    } catch (emailError) {
      console.error("[v0] Error sending password reset email:", emailError)
      // Continue anyway - Supabase will send its own email
    }

    return NextResponse.json({
      success: true,
      message: "If an account exists with this email, you will receive a password reset link.",
    })
  } catch (error) {
    console.error("[v0] Password reset error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
