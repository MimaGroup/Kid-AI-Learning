import { type NextRequest, NextResponse } from "next/server"
import { createServiceRoleClient } from "@/lib/supabase/server"

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  try {
    // Called by every visitor's browser (no session), and performance_metrics
    // has no INSERT policy at all (only admin-scoped SELECT) -- the
    // RLS-bound client can never write here, only the service role can.
    const supabase = await createServiceRoleClient()
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
