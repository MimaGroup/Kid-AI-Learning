import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"
import { sendEmail } from "@/lib/email"
import { SupportTicketConfirmation } from "@/lib/email"

const FALLBACK_MODE = process.env.NODE_ENV === "development" || !process.env.SUPABASE_URL

export async function POST(request: Request) {
  try {
    console.log("[v0] Contact API called")
    const body = await request.json()
    const { name, email, subject, message } = body

    console.log("[v0] Request body:", { name, email, subject, messageLength: message?.length })

    // Validate required fields
    if (!name || !email || !subject || !message) {
      console.log("[v0] Validation failed: missing fields")
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    if (FALLBACK_MODE) {
      console.log("[v0] Running in fallback mode (no database)")
      const mockTicketNumber = `TKT-${new Date().toISOString().split("T")[0].replace(/-/g, "")}-${Math.floor(
        Math.random() * 10000,
      )
        .toString()
        .padStart(4, "0")}`

      try {
        await sendEmail({
          to: email,
          subject: `Support Ticket ${mockTicketNumber} - AI Kids Learning`,
          react: SupportTicketConfirmation({
            name,
            ticketNumber: mockTicketNumber,
            subject,
            message,
          }),
        })
        console.log("[v0] Confirmation email sent successfully")
      } catch (emailError) {
        console.error("[v0] Error sending email:", emailError)
        // Continue anyway in fallback mode
      }

      return NextResponse.json({
        success: true,
        ticketNumber: mockTicketNumber,
        message: "Support ticket created successfully (fallback mode)",
      })
    }

    let supabase
    try {
      supabase = await createServerClient()
      console.log("[v0] Supabase client created successfully")
    } catch (supabaseError) {
      console.error("[v0] Failed to create Supabase client:", supabaseError)
      return NextResponse.json(
        {
          error: "Database connection failed",
          details:
            "Unable to connect to database. Please try again later or contact support directly at info@kids-learning-ai.com",
        },
        { status: 503 },
      )
    }

    // Get current user if logged in
    let user = null
    try {
      const { data } = await supabase.auth.getUser()
      user = data.user
      console.log("[v0] User ID:", user?.id || "not logged in")
    } catch (authError) {
      console.warn("[v0] Auth check failed, continuing without user:", authError)
    }

    // Create support ticket in database
    console.log("[v0] Creating support ticket...")
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
      return NextResponse.json(
        { error: "Failed to create support ticket", details: ticketError.message },
        { status: 500 },
      )
    }

    console.log("[v0] Support ticket created:", ticket.ticket_number)

    // Send confirmation email to customer
    try {
      console.log("[v0] Sending confirmation email...")
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
      console.log("[v0] Confirmation email sent successfully")
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
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}
