import { NextResponse } from "next/server"
import { Resend } from "resend"

// Lazy initialization to avoid build-time errors when env vars aren't available
let resendInstance: Resend | null = null
function getResend() {
  if (!resendInstance) {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      throw new Error("RESEND_API_KEY environment variable is not set")
    }
    resendInstance = new Resend(apiKey)
  }
  return resendInstance
}

export async function POST(request: Request) {
  try {
    const { to, inviteeName, referrerEmail, referralCode } = await request.json()

    if (!to || !referralCode) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kids-learning-ai.com"
    const signupUrl = `${siteUrl}/auth/sign-up?ref=${referralCode}`

    const resend = getResend()
    const { data, error } = await resend.emails.send({
      from: "Kids Learning AI <hello@kids-learning-ai.com>",
      to: [to],
      subject: `${referrerEmail} vas vabi, da preizkusite Kids Learning AI!`,
      html: `
        <!DOCTYPE html>
        <html lang="sl">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f3f4f6; padding: 40px 20px;">
          <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <div style="background: linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%); padding: 40px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px;">🎉 Povabljeni ste!</h1>
            </div>
            <div style="padding: 40px;">
              <p style="font-size: 18px; color: #374151; margin-bottom: 20px;">
                Živjo${inviteeName ? ` ${inviteeName}` : ""}!
              </p>
              <p style="font-size: 16px; color: #6B7280; line-height: 1.6;">
                <strong>${referrerEmail}</strong> meni, da bi vam bila všeč platforma Kids Learning AI — interaktivna platforma, ki otroke, stare 5–12 let, skozi igre in ustvarjalne izzive uči o umetni inteligenci.
              </p>

              <div style="background: linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%); border-radius: 12px; padding: 20px; margin: 30px 0; text-align: center;">
                <p style="margin: 0 0 10px 0; font-size: 14px; color: #92400E;">🎁 Vabilo prijatelja</p>
                <p style="margin: 0; font-size: 20px; font-weight: bold; color: #78350F;">
                  7 dni brezplačno preskusno obdobje
                </p>
                <p style="margin: 10px 0 0 0; font-size: 14px; color: #92400E;">
                  Brez kreditne kartice
                </p>
              </div>

              <div style="text-align: center; margin: 30px 0;">
                <a href="${signupUrl}" style="display: inline-block; background: linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%); color: white; text-decoration: none; padding: 16px 40px; border-radius: 30px; font-weight: bold; font-size: 16px;">
                  Začni brezplačno preskusno obdobje →
                </a>
              </div>

              <div style="background: #F3F4F6; border-radius: 8px; padding: 15px; text-align: center; margin-top: 30px;">
                <p style="margin: 0 0 5px 0; font-size: 12px; color: #6B7280;">Vaša priporočilna koda:</p>
                <p style="margin: 0; font-size: 24px; font-weight: bold; color: #8B5CF6; letter-spacing: 2px;">${referralCode}</p>
              </div>

              <p style="font-size: 14px; color: #9CA3AF; margin-top: 30px; text-align: center;">
                Kreditna kartica ni potrebna. Prekličete lahko kadarkoli.
              </p>
            </div>
            <div style="background: #F9FAFB; padding: 20px; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #9CA3AF;">
                © ${new Date().getFullYear()} Kids Learning AI. Učenje o umetni inteligenci, zabavno za otroke.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    })

    if (error) {
      console.error("Resend error:", error)
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
    }

    return NextResponse.json({ success: true, messageId: data?.id })
  } catch (error) {
    console.error("Email send error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
