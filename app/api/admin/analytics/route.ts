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

    // Get total users
    const { count: totalUsers } = await supabase.from("profiles").select("*", { count: "exact", head: true })

    // Get active users (last 30 days)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const { count: activeUsers } = await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .gte("last_activity_date", thirtyDaysAgo.toISOString().split("T")[0])

    // Get total revenue
    const { data: payments } = await supabase.from("payment_history").select("amount").eq("status", "succeeded")

    const totalRevenue = payments?.reduce((sum, p) => sum + (p.amount || 0), 0) || 0

    // Get active subscriptions
    const { count: activeSubscriptions } = await supabase
      .from("subscriptions")
      .select("*", { count: "exact", head: true })
      .eq("status", "active")

    // Get user growth (last 30 days)
    const { data: userGrowthData } = await supabase
      .from("profiles")
      .select("created_at")
      .gte("created_at", thirtyDaysAgo.toISOString())
      .order("created_at", { ascending: true })

    // Group by date
    const userGrowth =
      userGrowthData?.reduce((acc: any[], user) => {
        const date = new Date(user.created_at).toLocaleDateString()
        const existing = acc.find((item) => item.date === date)
        if (existing) {
          existing.count++
        } else {
          acc.push({ date, count: 1 })
        }
        return acc
      }, []) || []

    // Get revenue data (last 30 days)
    const { data: revenueDataRaw } = await supabase
      .from("payment_history")
      .select("amount, created_at")
      .eq("status", "succeeded")
      .gte("created_at", thirtyDaysAgo.toISOString())
      .order("created_at", { ascending: true })

    const revenueData =
      revenueDataRaw?.reduce((acc: any[], payment) => {
        const date = new Date(payment.created_at).toLocaleDateString()
        const existing = acc.find((item) => item.date === date)
        if (existing) {
          existing.amount += payment.amount / 100
        } else {
          acc.push({ date, amount: payment.amount / 100 })
        }
        return acc
      }, []) || []

    return NextResponse.json({
      totalUsers: totalUsers || 0,
      activeUsers: activeUsers || 0,
      totalRevenue,
      activeSubscriptions: activeSubscriptions || 0,
      userGrowth,
      revenueData,
    })
  } catch (error) {
    console.error("Admin analytics error:", error)
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 })
  }
}
