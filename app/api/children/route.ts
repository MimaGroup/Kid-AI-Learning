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
    console.log("[v0] Creating child profile - start")
    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    console.log("[v0] Auth check:", { user: user?.id, error: authError?.message })

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    console.log("[v0] Request body:", body)
    const { name, age, avatar_color, learning_level, email, password } = body

    if (!name || !age || !email || !password) {
      return NextResponse.json({ error: "Name, age, email, and password are required" }, { status: 400 })
    }

    console.log("[v0] Creating child auth account...")
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

    console.log("[v0] Child auth result:", {
      userId: childAuth?.user?.id,
      error: signUpError?.message,
    })

    if (signUpError || !childAuth.user) {
      console.error("[v0] Error creating child auth:", signUpError)
      return NextResponse.json({ error: signUpError?.message || "Failed to create child account" }, { status: 500 })
    }

    console.log("[v0] Creating child profile in database...")
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

    console.log("[v0] Child profile result:", {
      child: child?.id,
      error: insertError?.message,
      details: insertError?.details,
    })

    if (insertError) {
      console.error("[v0] Error creating child profile:", insertError)
      return NextResponse.json(
        {
          error: insertError.message,
          details: insertError.details,
          hint: insertError.hint,
        },
        { status: 500 },
      )
    }

    console.log("[v0] Child profile created successfully:", child.id)
    return NextResponse.json({ child }, { status: 201 })
  } catch (error) {
    console.error("[v0] Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
