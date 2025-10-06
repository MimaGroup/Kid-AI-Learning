import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: children, error } = await supabase
      .from("children")
      .select("*")
      .eq("parent_id", user.id)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching children:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ children: children || [] })
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
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
    const { name, age, avatar_color, learning_level, email, password } = body

    if (!name || !age || !email || !password) {
      return NextResponse.json({ error: "Name, age, email, and password are required" }, { status: 400 })
    }

    // Create child auth account
    const { data: childAuth, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          role: "child",
          parent_id: user.id,
        },
      },
    })

    if (signUpError || !childAuth.user) {
      console.error("Error creating child auth:", signUpError)
      return NextResponse.json({ error: signUpError?.message || "Failed to create child account" }, { status: 500 })
    }

    // Create child profile in children table
    const { data: child, error: insertError } = await supabase
      .from("children")
      .insert({
        parent_id: user.id,
        child_id: childAuth.user.id,
        name,
        age,
        avatar_color: avatar_color || "#4F46E5",
        learning_level: learning_level || "beginner",
      })
      .select()
      .single()

    if (insertError) {
      console.error("Error creating child profile:", insertError)
      return NextResponse.json({ error: insertError.message }, { status: 500 })
    }

    return NextResponse.json({ child }, { status: 201 })
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
