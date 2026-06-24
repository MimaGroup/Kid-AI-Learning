import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function GET() {
  const supabase = await createServerClient()

  const { data, error } = await supabase
    .from("courses")
    .select("id, title, slug, description, difficulty, age_min, age_max, duration_minutes, lessons_count, thumbnail_url, is_free, price, currency, category")
    .eq("is_published", true)
    .order("created_at")

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ courses: data ?? [] })
}
