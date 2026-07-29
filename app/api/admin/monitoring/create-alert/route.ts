import { type NextRequest, NextResponse } from "next/server"
import { createServiceRoleClient } from "@/lib/supabase/server"
import { checkAdminAuth } from "@/lib/admin-auth"

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  const { isAdmin, error: authError } = await checkAdminAuth()
  if (!isAdmin) {
    return NextResponse.json({ error: authError || "Unauthorized" }, { status: 401 })
  }

  try {
    // system_alerts has no INSERT policy at all (only admin-scoped SELECT/
    // UPDATE) -- even as an authenticated admin, the RLS-bound client can't
    // write here.
    const supabase = await createServiceRoleClient()
    const body = await request.json()

    const { data, error } = await supabase.from("system_alerts").insert([body]).select().single()

    if (error) {
      console.error("[v0] Error creating alert:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // If critical alert, send email notification
    if (body.severity === "critical" || body.severity === "error") {
      await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || "https://kids-learning-ai.com"}/api/admin/monitoring/send-alert`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "alert",
          title: body.title,
          message: body.description,
        }),
      })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("[v0] Error in create-alert route:", error)
    return NextResponse.json({ error: "Failed to create alert" }, { status: 500 })
  }
}
