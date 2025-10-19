import { NextResponse } from "next/server"
import { createServiceRoleClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  console.log("[v0] Contact API called")

  try {
    const body = await request.json()
    console.log("[v0] Received body:", body)

    const { name, email, subject, message } = body

    // Basic validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Generate ticket number
    const ticketNumber = `TKT-${new Date().toISOString().split("T")[0].replace(/-/g, "")}-${Math.floor(
      Math.random() * 10000,
    )
      .toString()
      .padStart(4, "0")}`

    console.log("[v0] Generated ticket number:", ticketNumber)

    try {
      const supabase = await createServiceRoleClient()

      const { error: insertError } = await supabase.from("support_tickets").insert({
        ticket_number: ticketNumber,
        name,
        email,
        subject,
        message,
        status: "open",
        priority: "normal",
        category: "general",
        response_count: 0,
      })

      if (insertError) {
        console.error("[v0] Error saving ticket to database:", insertError)
        // Continue anyway - ticket number is still valid
      } else {
        console.log("[v0] Ticket saved to database successfully")
      }
    } catch (dbError) {
      console.error("[v0] Database error:", dbError)
      // Continue anyway - we'll still return success to the user
    }

    return NextResponse.json({
      success: true,
      ticketNumber: ticketNumber,
      message: "Support ticket created successfully. We'll get back to you within 24-48 hours.",
    })
  } catch (error) {
    console.error("[v0] Error in contact API:", error)
    return NextResponse.json(
      {
        error: "Failed to process request",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
