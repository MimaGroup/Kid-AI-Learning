import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    console.log("[v0] Fetching all permissions")
    const supabase = await createServerClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      console.log("[v0] No authenticated user")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

    if (profile?.role !== "admin") {
      console.log("[v0] User is not admin")
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }

    const { data: permissions, error } = await supabase
      .from("permissions")
      .select("*")
      .order("resource", { ascending: true })
      .order("action", { ascending: true })

    if (error) {
      console.error("[v0] Error fetching permissions:", error)
      if (error.message?.includes("does not exist") || error.code === "42P01") {
        return NextResponse.json(
          { error: "Permissions system not initialized. Please run the permissions SQL script in Supabase." },
          { status: 500 },
        )
      }
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log("[v0] Found permissions:", permissions?.length || 0)
    return NextResponse.json({ permissions })
  } catch (error) {
    console.error("[v0] Error in GET /api/permissions:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
