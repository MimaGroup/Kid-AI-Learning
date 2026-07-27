import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { sendEmail } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { name, email } = await request.json()

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 })
    }

    // Get inviter profile
    const { data: inviterProfile } = await supabase
      .from("profiles")
      .select("display_name, email")
      .eq("id", user.id)
      .single()

    const inviterName = inviterProfile?.display_name || inviterProfile?.email || "Your friend"

    // Create invitation record
    const { error: insertError } = await supabase.from("friend_invitations").insert({
      inviter_id: user.id,
      invitee_email: email,
      invitee_name: name,
      status: "pending",
    })

    if (insertError) {
      console.error("[v0] Error creating invitation:", insertError)
      return NextResponse.json({ error: "Failed to create invitation" }, { status: 500 })
    }

    // Send invitation email
    try {
      await sendEmail({
        to: email,
        subject: `${inviterName} te je povabil/a na Kids Learning AI!`,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                .button { display: inline-block; background: #667eea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
                .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>Povabljen/a si!</h1>
                </div>
                <div class="content">
                  <p>Živjo ${name},</p>
                  <p><strong>${inviterName}</strong> bi se rad/a s teboj spoprijateljil/a na <strong>Kids Learning AI</strong>!</p>
                  <p>Pridruži se in skupaj raziskujta zabavne učne dejavnosti, igre in zgodbe s pomočjo umetne inteligence.</p>
                  <p style="text-align: center;">
                    <a href="${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/auth/sign-up" class="button">
                      Pridruži se zdaj
                    </a>
                  </p>
                  <p>Ko se registriraš, se lahko povežeš z uporabnikom ${inviterName} in začneta učiti skupaj!</p>
                </div>
                <div class="footer">
                  <p>Kids Learning AI - Učenje postane zabavno z umetno inteligenco</p>
                </div>
              </div>
            </body>
          </html>
        `,
      })
    } catch (emailError) {
      console.error("[v0] Error sending invitation email:", emailError)
      // Don't fail the request if email fails
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error in invite friend:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
