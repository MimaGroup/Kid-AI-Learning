import { type NextRequest, NextResponse } from "next/server"
import { sendEmail, emailTemplates } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Send email to support team
    const supportEmail = emailTemplates.contactFormSubmission(name, email, subject, message)

    const result = await sendEmail({
      to: "support@kids-learning-ai.com", // Your support email
      subject: supportEmail.subject,
      html: supportEmail.html,
    })

    if (!result.success) {
      throw new Error("Failed to send email")
    }

    // Send confirmation email to user
    const confirmationEmail = {
      subject: "We received your message - AI Kids Learning",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: 'Poppins', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%); color: white; padding: 40px 20px; text-align: center; border-radius: 12px; }
              .content { background: #f9fafb; padding: 30px; border-radius: 12px; margin: 20px 0; }
              .footer { text-align: center; color: #6b7280; font-size: 14px; margin-top: 30px; }
              h1 { margin: 0; font-size: 28px; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>Thank You for Contacting Us!</h1>
            </div>
            
            <div class="content">
              <h2 style="color: #8B5CF6;">Hi ${name},</h2>
              <p>We've received your message and our team will get back to you within 24-48 hours.</p>
              
              <p><strong>Your message:</strong></p>
              <p style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #8B5CF6;">${message.replace(/\n/g, "<br>")}</p>
              
              <p>If you have any urgent questions, feel free to reply to this email.</p>
            </div>
            
            <div class="footer">
              <p>© ${new Date().getFullYear()} AI Kids Learning. All rights reserved.</p>
            </div>
          </body>
        </html>
      `,
    }

    await sendEmail({
      to: email,
      subject: confirmationEmail.subject,
      html: confirmationEmail.html,
    })

    return NextResponse.json({
      success: true,
      message: "Message sent successfully",
    })
  } catch (error) {
    console.error("[v0] Error in contact form:", error)
    return NextResponse.json({ error: "Failed to send message. Please try again later." }, { status: 500 })
  }
}
