import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"
import { sendEmail } from "@/lib/email"
import { SupportTicketConfirmation } from "@/lib/email"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    const supabase = await createServerClient()

    // Get current user if logged in
    const {
      data: { user },
    } = await supabase.auth.getUser()

    // Create support ticket in database
    const { data: ticket, error: ticketError } = await supabase
      .from("support_tickets")
      .insert({
        user_id: user?.id || null,
        name,
        email,
        subject,
        message,
        status: "open",
        priority: "normal",
        category: "general",
      })
      .select()
      .single()

    if (ticketError) {
      console.error("[v0] Error creating support ticket:", ticketError)
      return NextResponse.json({ error: "Failed to create support ticket" }, { status: 500 })
    }

    // Send confirmation email to customer
    try {
      await sendEmail({
        to: email,
        subject: `Support Ticket ${ticket.ticket_number} - AI Kids Learning`,
        react: SupportTicketConfirmation({
          name,
          ticketNumber: ticket.ticket_number,
          subject,
          message,
        }),
      })
    } catch (emailError) {
      console.error("[v0] Error sending confirmation email:", emailError)
      // Don't fail the request if email fails
    }

    return NextResponse.json({
      success: true,
      ticketNumber: ticket.ticket_number,
      message: "Support ticket created successfully",
    })
  } catch (error) {
    console.error("[v0] Error in contact API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
