import { NextResponse } from "next/server"
import { createServiceRoleClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    const supabase = await createServiceRoleClient()

    const { data: courses, error } = await supabase
      .from("courses")
      .select("*")
      .eq("is_published", true)
      .order("price", { ascending: true })

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
