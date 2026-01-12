import { createServerClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { event, source, metadata } = body

    console.log("[v0] Tracking event:", { event, source, metadata })

    const supabase = createServerClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    const { error } = await supabase.from("performance_metrics").insert({
      metric_type: "conversion",
      metric_name: event,
      endpoint: source || "unknown",
      status: "success",
      metadata: {
        ...metadata,
        user_id: user?.id,
        timestamp: new Date().toISOString(),
      },
    })

    if (error) {
      console.error("[v0] Error tracking event:", error)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Exception tracking event:", error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
