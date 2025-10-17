// Performance monitoring and error tracking utilities

/**
 * Monitor performance metrics
 */
export function trackPerformance(metricName: string, value: number, unit = "ms") {
  if (process.env.NODE_ENV === "development") {
    console.log(`[v0] Performance: ${metricName} = ${value}${unit}`)
  }

  // Send to monitoring service (e.g., Vercel Analytics, Sentry)
  // Example: performance.measure(metricName)
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

    return result
  } catch (error) {
    const duration = performance.now() - startTime

    trackPerformance(`api_${apiName}_error`, duration)

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

  // Send to analytics dashboard
  // This would integrate with your business intelligence tools
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

      // Track error
      if (event.reason instanceof Error) {
        // You would send this to your error tracking service
        console.error("[v0] Error details:", {
          message: event.reason.message,
          stack: event.reason.stack,
        })
      }
    })

    // Catch global errors
    window.addEventListener("error", (event) => {
      console.error("[v0] Global error:", event.error)

      // Track error
      if (event.error instanceof Error) {
        console.error("[v0] Error details:", {
          message: event.error.message,
          stack: event.error.stack,
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
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

    // Add more health checks as needed

    checks.status = Object.values(checks.checks).every(Boolean) ? "healthy" : "degraded"
  } catch (error) {
    checks.status = "unhealthy"
    console.error("[v0] Health check failed:", error)
  }

  return checks
}
