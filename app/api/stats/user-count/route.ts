import { createServiceRoleClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    // A public-facing aggregate count needs to see every row, not just the
    // caller's own -- profiles RLS only allows auth.uid() = id, which would
    // make this always return 0 or 1.
    const supabase = await createServiceRoleClient()

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
