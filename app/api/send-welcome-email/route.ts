import { type NextRequest, NextResponse } from "next/server"
import { sendEmail, emailTemplates } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, name } = body

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    const emailTemplate = emailTemplates.welcome(name || "there")

    const result = await sendEmail({
      to: email,
      subject: emailTemplate.subject,
      html: emailTemplate.html,
    })

    if (!result.success) {
      throw new Error("Failed to send welcome email")
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error sending welcome email:", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}
