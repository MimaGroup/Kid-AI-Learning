import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Use raw SQL query via the database to bypass PostgREST cache
    const { data: profileData, error: profileError } = await supabase.rpc('get_profile_with_key', {
      user_id_input: user.id
    })

    if (profileError) {
      console.error('[v0] Profile fetch error:', profileError)
      // Fallback: try direct query with specific fields
      const { data: fallbackProfile, error: fallbackError } = await supabase
        .from('profiles')
        .select('id, email, display_name')
        .eq('id', user.id)
        .single()
      
      if (fallbackError) throw fallbackError
      
      // Return without secret key if we can't get it
      return NextResponse.json({
        profile: fallbackProfile,
        friends: []
      })
    }

    // Get friends
    const { data: friendsData, error: friendsError } = await supabase.rpc('get_user_friends_list', {
      user_id_input: user.id
    })

    if (friendsError) {
      console.error('[v0] Friends fetch error:', friendsError)
      return NextResponse.json({
        profile: profileData[0],
        friends: []
      })
    }

    return NextResponse.json({
      profile: profileData[0],
      friends: friendsData || []
    })
  } catch (error) {
    console.error('[v0] API route error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    )
  }
}
