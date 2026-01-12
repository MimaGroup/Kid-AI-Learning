import { NextResponse } from "next/server"
import { checkAdminAuth } from "@/lib/admin-auth"
import { createServiceRoleClient } from "@/lib/supabase/server"

export async function GET(request: Request, { params }: { params: { userId: string } }) {
  const { isAdmin, error } = await checkAdminAuth()

  if (!isAdmin) {
    return NextResponse.json({ error: error || "Unauthorized" }, { status: 401 })
  }

  try {
    const supabase = await createServiceRoleClient()
    const { userId } = params

    const { data: subscription, error: subError } = await supabase
      .from("subscriptions")
      .select("status")
      .eq("user_id", userId)
      .eq("status", "active")
      .maybeSingle()

    if (subError) throw subError

    return NextResponse.json({
      status: subscription?.status || "free",
    })
  } catch (error) {
    console.error("Error fetching subscription:", error)
    return NextResponse.json({ error: "Failed to fetch subscription" }, { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: { params: { userId: string } }) {
  const { isAdmin, error } = await checkAdminAuth()

  if (!isAdmin) {
    return NextResponse.json({ error: error || "Unauthorized" }, { status: 401 })
  }

  try {
    const supabase = await createServiceRoleClient()
    const { userId } = params
    const { status } = await request.json()

    if (!status) {
      return NextResponse.json({ error: "Status is required" }, { status: 400 })
    }

    // Check if subscription exists
    const { data: existingSub } = await supabase.from("subscriptions").select("id").eq("user_id", userId).single()

    if (existingSub) {
      // Update existing subscription
      const { error: updateError } = await supabase
        .from("subscriptions")
        .update({
          status,
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", userId)

      if (updateError) throw updateError
    } else {
      // Create new subscription record
      const { error: insertError } = await supabase.from("subscriptions").insert({
        user_id: userId,
        status,
        plan_type: status === "active" ? "monthly" : null,
        created_at: new Date().toISOString(),
      })

      if (insertError) throw insertError
    }

    return NextResponse.json({
      success: true,
      status,
    })
  } catch (error) {
    console.error("Error updating subscription:", error)
    return NextResponse.json({ error: "Failed to update subscription" }, { status: 500 })
  }
}
