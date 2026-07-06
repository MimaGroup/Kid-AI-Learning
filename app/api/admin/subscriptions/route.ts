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

    const { data: subscriptions, error: subsError } = await supabase
      .from("subscriptions")
      .select(`
        id,
        user_id,
        plan_type,
        status,
        current_period_end,
        created_at,
        cancel_at_period_end
      `)
      .order("created_at", { ascending: false })

    if (subsError) throw subsError

    // Get user emails
    const subscriptionsWithEmails = await Promise.all(
      (subscriptions || []).map(async (sub) => {
        const { data: profile } = await supabase.from("profiles").select("email").eq("id", sub.user_id).single()

        return {
          ...sub,
          user_email: profile?.email || "Unknown",
        }
      }),
    )

    return NextResponse.json({ subscriptions: subscriptionsWithEmails })
  } catch (error) {
    console.error("Admin subscriptions error:", error)
    return NextResponse.json({ error: "Failed to fetch subscriptions" }, { status: 500 })
  }
}
