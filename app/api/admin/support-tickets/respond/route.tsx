import { NextResponse } from "next/server"
import { createServiceRoleClient } from "@/lib/supabase/server"
import { sendEmail } from "@/lib/email"

export async function POST(request: Request) {
  try {
    const supabase = await createServiceRoleClient()

    const { ticketId, message } = await request.json()

    if (!ticketId || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Get ticket details
    const { data: ticket, error: ticketError } = await supabase
      .from("support_tickets")
      .select("*")
      .eq("id", ticketId)
      .single()

    if (ticketError || !ticket) {
      console.error("[v0] Error fetching ticket:", ticketError)
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 })
    }

    // Save response to database
    const { error: responseError } = await supabase.from("support_ticket_responses").insert({
      ticket_id: ticketId,
      user_id: ticket.user_id, // Use the ticket's user_id instead of placeholder
      message,
      is_staff_response: true,
    })

    if (responseError) {
      console.error("[v0] Error saving response:", responseError)
      throw responseError
    }

    // Update ticket
    const { error: updateError } = await supabase
      .from("support_tickets")
      .update({
        response_count: (ticket.response_count || 0) + 1,
        first_response_at: ticket.first_response_at || new Date().toISOString(),
        status: ticket.status === "open" ? "in_progress" : ticket.status,
      })
      .eq("id", ticketId)

    if (updateError) {
      console.error("[v0] Error updating ticket:", updateError)
      throw updateError
    }

    // Send email to customer
    try {
      await sendEmail({
        to: ticket.email,
        subject: `Re: Support Ticket ${ticket.ticket_number} - ${ticket.subject}`,
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
                <h1>Support Team Response</h1>
              </div>
              
              <div class="content">
                <h2 style="color: #8B5CF6;">Hi ${ticket.name},</h2>
                <p>Our support team has responded to your ticket <strong>${ticket.ticket_number}</strong>:</p>
                
                <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #8B5CF6; margin: 20px 0;">
                  ${message.replace(/\n/g, "<br>")}
                </div>
                
                <p>If you have any follow-up questions, please reply to this email or reference your ticket number.</p>
              </div>
              
              <div class="footer">
                <p>© ${new Date().getFullYear()} AI Kids Learning. All rights reserved.</p>
              </div>
            </body>
          </html>
        `,
      })
    } catch (emailError) {
      console.error("[v0] Error sending email:", emailError)
      // Don't fail the request if email fails
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error sending response:", error)
    return NextResponse.json({ error: "Failed to send response" }, { status: 500 })
  }
}
