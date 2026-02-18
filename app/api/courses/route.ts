import { NextResponse } from "next/server"
import { createServiceRoleClient, createServerClient } from "@/lib/supabase/server"

async function isAdmin(): Promise<boolean> {
  try {
    const supabase = await createServerClient()
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    console.log("[v0] isAdmin check - user:", user?.id, "error:", userError?.message)
    if (!user) return false
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single()
    console.log("[v0] isAdmin check - profile role:", profile?.role, "error:", profileError?.message)
    return profile?.role === "admin"
  } catch (e) {
    console.log("[v0] isAdmin check - exception:", e)
    return false
  }
}

export async function GET() {
  try {
    const supabase = await createServiceRoleClient()
    const adminUser = await isAdmin()
    console.log("[v0] GET /api/courses - adminUser:", adminUser)

    let query = supabase
      .from("courses")
      .select("*")
      .order("price", { ascending: true })

    if (!adminUser) {
      query = query.eq("is_published", true)
    }

    const { data: courses, error } = await query
    console.log("[v0] GET /api/courses - courses count:", courses?.length, "error:", error?.message)

    if (error) {
      console.error("Error fetching courses:", error)
      return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 })
    }

    return NextResponse.json({ courses: courses || [] })
  } catch (error) {
    console.error("Error in courses API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
