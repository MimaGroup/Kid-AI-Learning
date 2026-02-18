import { NextResponse } from "next/server"
import { createServiceRoleClient, createServerClient } from "@/lib/supabase/server"

async function isAdmin(): Promise<boolean> {
  try {
    const supabase = await createServerClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return false
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single()
    return profile?.role === "admin"
  } catch {
    return false
  }
}

export async function GET() {
  try {
    const supabase = await createServiceRoleClient()
    const adminUser = await isAdmin()

    let query = supabase
      .from("courses")
      .select("*")
      .order("price", { ascending: true })

    if (!adminUser) {
      query = query.eq("is_published", true)
    }

    const { data: courses, error } = await query

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
