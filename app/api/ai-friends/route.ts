import { createServerClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = await createServerClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: friends, error } = await supabase
      .from("ai_friends")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("[v0] Error loading AI friends:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ friends })
  } catch (error: any) {
    console.error("[v0] Unexpected error in GET /api/ai-friends:", error)
    return NextResponse.json({ error: error.message || "Failed to load AI friends" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createServerClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { name, personality, color } = body

    if (!name || !personality || !color) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const { data: friend, error } = await supabase
      .from("ai_friends")
      .insert({
        user_id: user.id,
        name,
        personality,
        color,
      })
      .select()
      .single()

    if (error) {
      console.error("[v0] Error creating AI friend:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ friend })
  } catch (error: any) {
    console.error("[v0] Unexpected error in POST /api/ai-friends:", error)
    return NextResponse.json({ error: error.message || "Failed to create AI friend" }, { status: 500 })
  }
}
