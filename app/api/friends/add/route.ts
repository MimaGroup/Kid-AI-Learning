import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { friendSecretKey } = await request.json()

    if (!friendSecretKey) {
      return NextResponse.json({ error: "Secret key is required" }, { status: 400 })
    }

    // Find friend by secret key
    const { data: friendProfile, error: friendError } = await supabase
      .from("profiles")
      .select("id, secret_key")
      .eq("secret_key", friendSecretKey.toUpperCase())
      .single()

    if (friendError || !friendProfile) {
      return NextResponse.json({ error: "Friend not found with that secret key" }, { status: 404 })
    }

    if (friendProfile.id === user.id) {
      return NextResponse.json({ error: "You cannot add yourself as a friend" }, { status: 400 })
    }

    // Check if friendship already exists
    const { data: existingFriendship } = await supabase
      .from("friendships")
      .select("id, status")
      .eq("user_id", user.id)
      .eq("friend_id", friendProfile.id)
      .single()

    if (existingFriendship) {
      return NextResponse.json({ error: "Already friends with this user" }, { status: 400 })
    }

    // Create friendship
    const { error: insertError } = await supabase.from("friendships").insert({
      user_id: user.id,
      friend_id: friendProfile.id,
      status: "accepted",
    })

    if (insertError) {
      console.error("[v0] Error creating friendship:", insertError)
      return NextResponse.json({ error: "Failed to add friend" }, { status: 500 })
    }

    // Create reciprocal friendship
    await supabase.from("friendships").insert({
      user_id: friendProfile.id,
      friend_id: user.id,
      status: "accepted",
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error in add friend:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
