import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(request.url)
    const timeRange = searchParams.get("timeRange") || "24h"

    // Calculate time filter
    const now = new Date()
    const startTime = new Date()
    switch (timeRange) {
      case "1h":
        startTime.setHours(now.getHours() - 1)
        break
      case "24h":
        startTime.setHours(now.getHours() - 24)
        break
      case "7d":
        startTime.setDate(now.getDate() - 7)
        break
      case "30d":
        startTime.setDate(now.getDate() - 30)
        break
    }

    // Fetch error logs
    const { data: errorLogs, error: errorLogsError } = await supabase
      .from("error_logs")
      .select("*")
      .gte("created_at", startTime.toISOString())
      .order("created_at", { ascending: false })
      .limit(100)

    // Fetch system alerts
    const { data: systemAlerts, error: alertsError } = await supabase
      .from("system_alerts")
      .select("*")
      .gte("created_at", startTime.toISOString())
      .order("created_at", { ascending: false })
      .limit(50)

    // Fetch performance metrics
    const { data: performanceMetrics, error: metricsError } = await supabase
      .from("performance_metrics")
      .select("*")
      .gte("created_at", startTime.toISOString())
      .order("created_at", { ascending: false })
      .limit(1000)

    if (errorLogsError || alertsError || metricsError) {
      console.error("[v0] Error fetching monitoring data:", { errorLogsError, alertsError, metricsError })
      return NextResponse.json({ error: "Failed to fetch monitoring data" }, { status: 500 })
    }

    // Calculate statistics
    const stats = {
      totalErrors: errorLogs?.length || 0,
      criticalErrors: errorLogs?.filter((e) => e.severity === "critical").length || 0,
      activeAlerts: systemAlerts?.filter((a) => a.status === "active").length || 0,
      avgResponseTime:
        performanceMetrics && performanceMetrics.length > 0
          ? Math.round(performanceMetrics.reduce((sum, m) => sum + m.duration_ms, 0) / performanceMetrics.length)
          : 0,
    }

    return NextResponse.json({
      success: true,
      data: {
        errorLogs: errorLogs || [],
        systemAlerts: systemAlerts || [],
        performanceMetrics: performanceMetrics || [],
        stats,
      },
    })
  } catch (error) {
    console.error("[v0] Error in monitoring route:", error)
    return NextResponse.json({ error: "Failed to fetch monitoring data" }, { status: 500 })
  }
}
