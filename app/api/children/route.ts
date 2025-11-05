import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    console.log("[v0] GET /api/children - Fetching children...")
    const supabase = await createServerClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      console.log("[v0] Unauthorized request")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: children, error } = await supabase
      .from("children")
      .select("*")
      .eq("parent_id", user.id)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("[v0] Error fetching children:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log("[v0] Successfully fetched children:", children?.length || 0)
    return NextResponse.json({ children: children || [] })
  } catch (error) {
    console.error("[v0] Unexpected error in GET:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    console.log("[v0] POST /api/children - Creating child profile...")
    const supabase = await createServerClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      console.log("[v0] Unauthorized request")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    console.log("[v0] User authenticated:", user.id)

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", user.id)
      .single()

    if (profileError || !profile) {
      console.log("[v0] User profile not found, creating one...")

      const { error: createProfileError } = await supabase.from("profiles").insert({
        id: user.id,
        email: user.email,
        display_name: user.email?.split("@")[0] || "User",
        role: "parent",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })

      if (createProfileError) {
        console.error("[v0] Error creating profile:", createProfileError)
        return NextResponse.json({ error: "Failed to create user profile. Please contact support." }, { status: 500 })
      }

      console.log("[v0] User profile created successfully")
    }

    const body = await request.json()
    console.log("[v0] Request body:", body)

    const { name, age, avatar_color, learning_level } = body

    if (!name || typeof name !== "string") {
      return NextResponse.json({ error: "Name is required and must be a string" }, { status: 400 })
    }

    if (!age || typeof age !== "number" || age < 3 || age > 18) {
      return NextResponse.json({ error: "Age must be a number between 3 and 18" }, { status: 400 })
    }

    if (!avatar_color || typeof avatar_color !== "string") {
      return NextResponse.json({ error: "Avatar color is required" }, { status: 400 })
    }

    if (!learning_level || typeof learning_level !== "string") {
      return NextResponse.json({ error: "Learning level is required" }, { status: 400 })
    }

    const sanitizedName = name.trim().slice(0, 50)

    console.log("[v0] Validated data:", { name: sanitizedName, age, avatar_color, learning_level })

    const { data: child, error: insertError } = await supabase
      .from("children")
      .insert({
        parent_id: user.id,
        name: sanitizedName,
        age,
        avatar_color: avatar_color || "#4F46E5",
        learning_level: learning_level || "beginner",
      })
      .select()
      .single()

    if (insertError) {
      console.error("[v0] Error creating child profile:", insertError)
      return NextResponse.json(
        {
          error: insertError.message || "Failed to create child profile",
        },
        { status: 500 },
      )
    }

    console.log("[v0] Child profile created successfully:", child.id)

    return NextResponse.json({ child }, { status: 201 })
  } catch (error) {
    console.error("[v0] Unexpected error in POST /api/children:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 },
    )
  }
}

export async function DELETE(request: Request) {
  try {
    console.log("[v0] DELETE /api/children - Deleting child profile")
    const supabase = await createServerClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      console.log("[v0] Unauthorized - no user")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const childId = searchParams.get("id")

    if (!childId) {
      console.log("[v0] Missing child ID")
      return NextResponse.json({ error: "Missing child ID" }, { status: 400 })
    }

    console.log("[v0] Deleting child:", childId)

    const { data: child } = await supabase.from("children").select("parent_id").eq("id", childId).single()

    if (!child || child.parent_id !== user.id) {
      console.log("[v0] Unauthorized - not the parent")
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    const { error } = await supabase.from("children").delete().eq("id", childId)

    if (error) {
      console.error("[v0] Error deleting child:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log("[v0] Child deleted successfully")
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error in DELETE /api/children:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 },
    )
  }
}
