import { NextResponse } from "next/server"
import { checkAdminAuth } from "@/lib/admin-auth"
import { createServiceRoleClient } from "@/lib/supabase/server"

export async function GET() {
  const { isAdmin, error } = await checkAdminAuth()

  if (!isAdmin) {
    return NextResponse.json({ error: error || "Unauthorized" }, { status: 401 })
  }

  try {
    const supabase = await createServiceRoleClient()

    const { data: users, error: usersError } = await supabase
      .from("profiles")
      .select(`
        id,
        email,
        display_name,
        created_at,
        last_activity_date,
        role
      `)
      .order("created_at", { ascending: false })
      .limit(100)

    if (usersError) throw usersError

    // Get subscription status for each user
    const usersWithSubscriptions = await Promise.all(
      (users || []).map(async (user) => {
        // Remove .single() and use .maybeSingle() to handle 0 results gracefully
        const { data: subscription } = await supabase
          .from("subscriptions")
          .select("status")
          .eq("user_id", user.id)
          .eq("status", "active")
          .maybeSingle()

        return {
          ...user,
          subscription_status: subscription?.status || null,
        }
      }),
    )

    return NextResponse.json({ users: usersWithSubscriptions })
  } catch (error) {
    console.error("Admin users error:", error)
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}
