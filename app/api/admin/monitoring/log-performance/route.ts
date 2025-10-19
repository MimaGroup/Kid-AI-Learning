import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const body = await request.json()

    const { data, error } = await supabase.from("performance_metrics").insert([body]).select().single()

    if (error) {
      console.error("[v0] Error logging performance:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("[v0] Error in log-performance route:", error)
    return NextResponse.json({ error: "Failed to log performance" }, { status: 500 })
  }
}
