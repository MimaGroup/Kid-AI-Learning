import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const supabase = await createServerClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: permissions, error } = await supabase
      .from("permissions")
      .select("*")
      .order("resource", { ascending: true })
      .order("action", { ascending: true })

    if (error) {
      console.error("[v0] Error fetching permissions:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ permissions })
  } catch (error) {
    console.error("[v0] Error in GET /api/permissions:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
