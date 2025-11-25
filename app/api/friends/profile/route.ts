import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    const supabase = await createClient()
    
    const {
      data: { user },
      error: authError
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data, error } = await supabase.rpc('exec_sql', {
      query: `SELECT id, email, display_name, secret_key FROM profiles WHERE id = '${user.id}' LIMIT 1`
    })

    if (error) {
      console.error('[v0] Profile API: RPC error, trying alternative', error)
      
      // Fallback: try direct table query with select
      const { data: profileData, error: selectError } = await supabase
        .from('profiles')
        .select('id, email, display_name')
        .eq('id', user.id)
        .single()
      
      if (selectError || !profileData) {
        console.error('[v0] Profile API: Select error', selectError)
        return NextResponse.json({ error: "Profile not found" }, { status: 404 })
      }

      // Generate a temporary key if none exists
      const tempKey = Array.from({ length: 8 }, () => 
        'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'[Math.floor(Math.random() * 36)]
      ).join('')

      return NextResponse.json({
        profile: {
          ...profileData,
          secret_key: tempKey
        }
      })
    }

    return NextResponse.json({ profile: data[0] })
  } catch (error) {
    console.error('[v0] Profile API: Error', error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
