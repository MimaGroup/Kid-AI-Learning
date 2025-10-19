import { type NextRequest, NextResponse } from "next/server"
import { sendEmail } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, title, message } = body

    // Send email to admin
    const adminEmail = process.env.ADMIN_EMAIL || "danijel.milovanovic88@gmail.com"

    await sendEmail({
      to: adminEmail,
      subject: `🚨 ${type === "alert" ? "System Alert" : "Critical Error"}: ${title}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #EF4444; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
              .content { background: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px; }
              .alert-box { background: #FEE2E2; border-left: 4px solid #EF4444; padding: 15px; margin: 15px 0; border-radius: 4px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🚨 ${type === "alert" ? "System Alert" : "Critical Error"}</h1>
              </div>
              <div class="content">
                <h2>${title}</h2>
                <div class="alert-box">
                  <p><strong>Message:</strong></p>
                  <p>${message}</p>
                </div>
                <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
                <p>Please check the admin dashboard for more details.</p>
                <p><a href="https://kids-learning-ai.com/admin">View Admin Dashboard</a></p>
              </div>
            </div>
          </body>
        </html>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error sending alert email:", error)
    return NextResponse.json({ error: "Failed to send alert" }, { status: 500 })
  }
}
