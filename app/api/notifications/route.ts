import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const unreadOnly = searchParams.get("unread") === "true"

    let query = supabase
      .from("notifications")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(50)

    if (unreadOnly) {
      query = query.eq("read", false)
    }

    const { data: notifications, error } = await query

    if (error) {
      console.error("[v0] Error fetching notifications:", error)
      // If table doesn't exist, return empty array instead of error
      if (error.code === "PGRST204" || error.code === "PGRST205" || error.message?.includes("does not exist")) {
        return NextResponse.json({ notifications: [], tableExists: false })
      }
      return NextResponse.json({ error: "Failed to fetch notifications" }, { status: 500 })
    }

    return NextResponse.json({ notifications, tableExists: true })
  } catch (error) {
    console.error("[v0] Notifications API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { type, title, message, metadata } = body

    const { data: notification, error } = await supabase
      .from("notifications")
      .insert({
        user_id: user.id,
        type,
        title,
        message,
        metadata: metadata || {},
      })
      .select()
      .single()

    if (error) {
      console.error("[v0] Error creating notification:", error)
      if (error.code === "PGRST204" || error.code === "PGRST205" || error.message?.includes("does not exist")) {
        return NextResponse.json({ error: "Notifications table not set up yet" }, { status: 503 })
      }
      return NextResponse.json({ error: "Failed to create notification" }, { status: 500 })
    }

    return NextResponse.json({ notification })
  } catch (error) {
    console.error("[v0] Notifications API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
