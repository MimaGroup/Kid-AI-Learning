import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { friendshipId } = await request.json()

    if (!friendshipId) {
      return NextResponse.json({ error: "Friendship ID is required" }, { status: 400 })
    }

    // Get the friendship to find the reciprocal friendship
    const { data: friendship } = await supabase
      .from("friendships")
      .select("friend_id")
      .eq("id", friendshipId)
      .eq("user_id", user.id)
      .single()

    if (!friendship) {
      return NextResponse.json({ error: "Friendship not found" }, { status: 404 })
    }

    // Delete the friendship
    const { error: deleteError } = await supabase
      .from("friendships")
      .delete()
      .eq("id", friendshipId)
      .eq("user_id", user.id)

    if (deleteError) {
      console.error("[v0] Error deleting friendship:", deleteError)
      return NextResponse.json({ error: "Failed to remove friend" }, { status: 500 })
    }

    // Delete reciprocal friendship
    await supabase
      .from("friendships")
      .delete()
      .eq("user_id", friendship.friend_id)
      .eq("friend_id", user.id)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error in remove friend:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
