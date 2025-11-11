import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export const dynamic = "force-dynamic"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: child, error } = await supabase
      .from("children")
      .select("*")
      .eq("id", params.id)
      .eq("parent_id", user.id)
      .single()

    if (error) {
      console.error("Error fetching child:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    if (!child) {
      return NextResponse.json({ error: "Child not found" }, { status: 404 })
    }

    return NextResponse.json({ child })
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
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
    const { name, age, avatar_color, learning_level } = body

    const updates: any = {}
    if (name !== undefined) updates.name = name
    if (age !== undefined) updates.age = age
    if (avatar_color !== undefined) updates.avatar_color = avatar_color
    if (learning_level !== undefined) updates.learning_level = learning_level

    const { data: child, error } = await supabase
      .from("children")
      .update(updates)
      .eq("id", params.id)
      .eq("parent_id", user.id)
      .select()
      .single()

    if (error) {
      console.error("Error updating child:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ child })
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    console.log("[v0] DELETE /api/children/[id] - Deleting child:", params.id)
    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      console.log("[v0] Unauthorized - auth error:", authError)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    console.log("[v0] User authenticated:", user.id)

    const { data: child, error: fetchError } = await supabase
      .from("children")
      .select("id, parent_id, name")
      .eq("id", params.id)
      .eq("parent_id", user.id)
      .single()

    if (fetchError) {
      console.error("[v0] Error fetching child:", fetchError)
      return NextResponse.json({ error: "Child not found" }, { status: 404 })
    }

    if (!child) {
      console.log("[v0] Child not found or unauthorized")
      return NextResponse.json({ error: "Child not found" }, { status: 404 })
    }

    console.log("[v0] Found child to delete:", child.name)

    // Delete from children table
    const { error: deleteError } = await supabase.from("children").delete().eq("id", params.id).eq("parent_id", user.id)

    if (deleteError) {
      console.error("[v0] Error deleting child:", deleteError)
      return NextResponse.json({ error: deleteError.message }, { status: 500 })
    }

    console.log("[v0] Child deleted successfully:", child.name)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Unexpected error in DELETE:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
