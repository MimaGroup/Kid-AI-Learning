import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const body = await request.json()

    const { data, error } = await supabase.from("error_logs").insert([body]).select().single()

    if (error) {
      console.error("[v0] Error logging to database:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // If critical error, send email alert
    if (body.severity === "critical") {
      await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/admin/monitoring/send-alert`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "error",
          title: `Critical Error: ${body.error_type}`,
          message: body.error_message,
        }),
      })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("[v0] Error in log-error route:", error)
    return NextResponse.json({ error: "Failed to log error" }, { status: 500 })
  }
}
