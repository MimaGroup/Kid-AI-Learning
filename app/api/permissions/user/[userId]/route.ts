import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"
import { getUserPermissions } from "@/lib/permissions"

export const dynamic = "force-dynamic"

export async function GET(request: Request, { params }: { params: Promise<{ userId: string }> }) {
  try {
    const { userId } = await params
    const supabase = await createServerClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if requester is admin or viewing their own permissions
    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

    if (profile?.role !== "admin" && user.id !== userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const permissions = await getUserPermissions(userId)

    if (!permissions) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ permissions })
  } catch (error) {
    console.error("[v0] Error fetching user permissions:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request, { params }: { params: Promise<{ userId: string }> }) {
  try {
    const { userId } = await params
    const supabase = await createServerClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Only admins can modify permissions
    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

    if (profile?.role !== "admin") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }

    const { permissionName, granted } = await request.json()

    if (!permissionName || typeof granted !== "boolean") {
      return NextResponse.json({ error: "Missing permissionName or granted flag" }, { status: 400 })
    }

    // Get permission ID
    const { data: permission } = await supabase.from("permissions").select("id").eq("name", permissionName).single()

    if (!permission) {
      return NextResponse.json({ error: "Permission not found" }, { status: 404 })
    }

    // Upsert user permission
    const { error } = await supabase.from("user_permissions").upsert(
      {
        user_id: userId,
        permission_id: permission.id,
        granted,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "user_id,permission_id",
      },
    )

    if (error) {
      console.error("[v0] Error updating user permission:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error in POST /api/permissions/user/[userId]:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
