import { NextResponse } from "next/server"
import { createServiceRoleClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    console.log("[v0] Fetching support tickets")

    const supabase = await createServiceRoleClient()

    const { data: tickets, error } = await supabase
      .from("support_tickets")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("[v0] Error fetching support tickets:", error.message)
      return NextResponse.json({ tickets: [], error: error.message })
    }

    console.log("[v0] Fetched tickets:", tickets?.length || 0)
    return NextResponse.json({ tickets: tickets || [] })
  } catch (error) {
    console.error("[v0] Error fetching support tickets:", error)
    return NextResponse.json({
      tickets: [],
      error: error instanceof Error ? error.message : "Failed to fetch tickets",
    })
  }
}

export async function PATCH(request: Request) {
  try {
    const { ticketId, status, priority, assigned_to } = await request.json()

    const supabase = await createServiceRoleClient()

    const updateData: any = {}
    if (status) updateData.status = status
    if (priority) updateData.priority = priority
    if (assigned_to !== undefined) updateData.assigned_to = assigned_to

    if (status === "resolved" && !updateData.resolved_at) {
      updateData.resolved_at = new Date().toISOString()
    }

    const { error } = await supabase.from("support_tickets").update(updateData).eq("id", ticketId)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error updating ticket:", error)
    return NextResponse.json({ error: "Failed to update ticket" }, { status: 500 })
  }
}
