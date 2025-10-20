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
    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get child info before deleting
    const { data: child } = await supabase
      .from("children")
      .select("child_id")
      .eq("id", params.id)
      .eq("parent_id", user.id)
      .single()

    if (!child) {
      return NextResponse.json({ error: "Child not found" }, { status: 404 })
    }

    // Delete from children table
    const { error: deleteError } = await supabase.from("children").delete().eq("id", params.id).eq("parent_id", user.id)

    if (deleteError) {
      console.error("Error deleting child:", deleteError)
      return NextResponse.json({ error: deleteError.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
