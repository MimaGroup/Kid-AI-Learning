import { createServerClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = await createServerClient()

    const { count, error } = await supabase.from("profiles").select("*", { count: "exact", head: true })

    if (error) {
      console.error("[v0] Error fetching user count:", error)
      return NextResponse.json({ count: 0 }, { status: 500 })
    }

    return NextResponse.json({ count: count || 0 })
  } catch (error) {
    console.error("[v0] Exception in user count API:", error)
    return NextResponse.json({ count: 0 }, { status: 500 })
  }
}
