/**
 * Monitor performance metrics
 */
export function trackPerformance(metricName: string, value: number, unit = "ms") {
  if (process.env.NODE_ENV === "development") {
    console.log(`[v0] Performance: ${metricName} = ${value}${unit}`)
  }
}

/**
 * Track API response times
 */
export async function monitorApiCall<T>(apiName: string, apiCall: () => Promise<T>): Promise<T> {
  const startTime = performance.now()

  try {
    const result = await apiCall()
    const duration = performance.now() - startTime

    trackPerformance(`api_${apiName}`, duration)

    // Log to database
    await logPerformanceMetric({
      metric_type: "api_call",
      metric_name: apiName,
      duration_ms: Math.round(duration),
      status: "success",
    })

    return result
  } catch (error) {
    const duration = performance.now() - startTime

    trackPerformance(`api_${apiName}_error`, duration)

    // Log error
    await logError({
      error_type: "api_error",
      error_message: error instanceof Error ? error.message : "Unknown error",
      stack_trace: error instanceof Error ? error.stack : undefined,
      severity: "high",
      source: "api",
      endpoint: apiName,
    })

    throw error
  }
}

/**
 * Monitor component render times
 */
export function useRenderMonitoring(componentName: string) {
  if (process.env.NODE_ENV === "development") {
    const startTime = performance.now()

    return () => {
      const renderTime = performance.now() - startTime
      console.log(`[v0] Render: ${componentName} took ${renderTime.toFixed(2)}ms`)
    }
  }

  return () => {} // No-op in production
}

/**
 * Track subscription metrics for business analytics
 */
export function trackSubscriptionMetrics(metrics: {
  activeSubscriptions?: number
  newSubscriptions?: number
  cancelledSubscriptions?: number
  revenue?: number
  conversionRate?: number
}) {
  if (process.env.NODE_ENV === "development") {
    console.log("[v0] Subscription Metrics:", metrics)
  }
}

/**
 * Monitor database query performance
 */
export async function monitorDatabaseQuery<T>(queryName: string, query: () => Promise<T>): Promise<T> {
  return monitorApiCall(`db_${queryName}`, query)
}

/**
 * Global error boundary handler
 */
export function setupGlobalErrorHandling() {
  if (typeof window !== "undefined") {
    // Catch unhandled promise rejections
    window.addEventListener("unhandledrejection", (event) => {
      console.error("[v0] Unhandled promise rejection:", event.reason)

      if (event.reason instanceof Error) {
        logError({
          error_type: "unhandled_rejection",
          error_message: event.reason.message,
          stack_trace: event.reason.stack,
          severity: "high",
          source: "client",
        })
      }
    })

    // Catch global errors
    window.addEventListener("error", (event) => {
      console.error("[v0] Global error:", event.error)

      if (event.error instanceof Error) {
        logError({
          error_type: "global_error",
          error_message: event.error.message,
          stack_trace: event.error.stack,
          severity: "high",
          source: "client",
          metadata: {
            filename: event.filename,
            lineno: event.lineno,
            colno: event.colno,
          },
        })
      }
    })
  }
}

/**
 * Health check for monitoring service availability
 */
export async function performHealthCheck() {
  const checks = {
    timestamp: new Date().toISOString(),
    status: "healthy" as "healthy" | "degraded" | "unhealthy",
    checks: {
      api: false,
      database: false,
      auth: false,
    },
  }

  try {
    // Check API health
    const apiResponse = await fetch("/api/health")
    checks.checks.api = apiResponse.ok

    checks.status = Object.values(checks.checks).every(Boolean) ? "healthy" : "degraded"
  } catch (error) {
    checks.status = "unhealthy"
    console.error("[v0] Health check failed:", error)
  }

  return checks
}

/**
 * Log error to database
 */
export async function logError(error: {
  error_type: string
  error_message: string
  stack_trace?: string
  severity: "low" | "medium" | "high" | "critical"
  source: "api" | "client" | "database" | "external"
  endpoint?: string
  user_id?: string
  metadata?: Record<string, any>
}) {
  try {
    const response = await fetch("/api/admin/monitoring/log-error", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(error),
    })

    if (!response.ok) {
      console.error("[v0] Failed to log error to database")
    }
  } catch (err) {
    console.error("[v0] Error logging to database:", err)
  }
}

/**
 * Create system alert
 */
export async function createSystemAlert(alert: {
  alert_type: string
  title: string
  description: string
  severity: "info" | "warning" | "error" | "critical"
  affected_service?: string
  metadata?: Record<string, any>
}) {
  try {
    const response = await fetch("/api/admin/monitoring/create-alert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(alert),
    })

    if (!response.ok) {
      console.error("[v0] Failed to create system alert")
    }
  } catch (err) {
    console.error("[v0] Error creating alert:", err)
  }
}

/**
 * Log performance metric to database
 */
async function logPerformanceMetric(metric: {
  metric_type: string
  metric_name: string
  duration_ms: number
  status: string
  endpoint?: string
  metadata?: Record<string, any>
}) {
  try {
    const response = await fetch("/api/admin/monitoring/log-performance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(metric),
    })

    if (!response.ok) {
      console.error("[v0] Failed to log performance metric")
    }
  } catch (err) {
    console.error("[v0] Error logging performance:", err)
  }
}
