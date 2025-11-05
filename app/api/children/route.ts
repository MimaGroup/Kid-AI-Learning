import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { validateInput, childProfileSchema, sanitizeString } from "@/lib/validation"
import { createAuditLog, getClientIp } from "@/lib/security"

export const dynamic = "force-dynamic"

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

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", user.id)
      .single()

    if (profileError || !profile) {
      console.log("[v0] User profile not found, creating one...")

      // Create profile for user
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

    const validation = validateInput(childProfileSchema, {
      name: sanitizeString(body.name),
      age: Number.parseInt(body.age),
      avatar_color: body.avatar_color,
      learning_level: body.learning_level,
    })

    if (!validation.success) {
      return NextResponse.json({ error: validation.error }, { status: 400 })
    }

    const { name, age, avatar_color, learning_level } = validation.data

    const { data: child, error: insertError } = await supabase
      .from("children")
      .insert({
        parent_id: user.id,
        name,
        age,
        avatar_color: avatar_color || "#4F46E5",
        learning_level: learning_level || "beginner",
      })
      .select()
      .single()

    if (insertError) {
      console.error("Error creating child profile:", insertError)
      return NextResponse.json(
        {
          error: insertError.message || "Failed to create child profile",
        },
        { status: 500 },
      )
    }

    createAuditLog({
      userId: user.id,
      action: "CREATE",
      resource: "child_profile",
      ip: getClientIp(request as any),
      userAgent: request.headers.get("user-agent") || "unknown",
      timestamp: new Date(),
      metadata: { childId: child.id },
    })

    return NextResponse.json({ child }, { status: 201 })
  } catch (error) {
    console.error("Unexpected error in POST /api/children:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 },
    )
  }
}
