import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function GET() {
  const supabase = await createServerClient()
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { data } = await supabase
    .from("user_badges")
    .select("badge_id, earned_at")
    .eq("user_id", session.user.id)
    .order("earned_at", { ascending: false })

  return NextResponse.json({ badges: data ?? [] })
}
