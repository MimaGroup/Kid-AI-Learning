import type { NextRequest, NextResponse } from "next/server"
import { logError } from "./monitoring"

/**
 * Middleware wrapper for API routes to automatically track performance and errors
 */
export function withMonitoring<T>(
  handler: (req: NextRequest, ...args: any[]) => Promise<NextResponse<T>>,
  options: {
    endpoint: string
    trackPerformance?: boolean
  },
) {
  return async (req: NextRequest, ...args: any[]): Promise<NextResponse<T>> => {
    const startTime = performance.now()
    const { endpoint, trackPerformance = true } = options

    try {
      const response = await handler(req, ...args)
      const duration = performance.now() - startTime

      // Log performance if enabled and response is successful
      if (trackPerformance && response.ok) {
        // Fire and forget - don't await
        fetch("/api/admin/monitoring/log-performance", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            metric_type: "api_call",
            metric_name: endpoint,
            duration_ms: Math.round(duration),
            status: "success",
            endpoint,
            metadata: {
              method: req.method,
              status: response.status,
            },
          }),
        }).catch((err) => console.error("[v0] Failed to log performance:", err))
      }

      return response
    } catch (error) {
      const duration = performance.now() - startTime

      // Log error
      await logError({
        error_type: "api_error",
        error_message: error instanceof Error ? error.message : "Unknown error",
        stack_trace: error instanceof Error ? error.stack : undefined,
        severity: "high",
        source: "api",
        endpoint,
        metadata: {
          method: req.method,
          duration_ms: Math.round(duration),
        },
      })

      throw error
    }
  }
}

/**
 * Helper to track specific operations within API routes
 */
export async function trackOperation<T>(
  operationName: string,
  operation: () => Promise<T>,
  options?: {
    onError?: (error: Error) => void
    severity?: "low" | "medium" | "high" | "critical"
  },
): Promise<T> {
  const startTime = performance.now()

  try {
    const result = await operation()
    const duration = performance.now() - startTime

    // Log successful operation performance
    if (duration > 1000) {
      // Only log slow operations (>1s)
      console.warn(`[v0] Slow operation: ${operationName} took ${duration.toFixed(2)}ms`)
    }

    return result
  } catch (error) {
    const duration = performance.now() - startTime

    console.error(`[v0] Operation failed: ${operationName}`, error)

    // Log error
    await logError({
      error_type: "operation_error",
      error_message: error instanceof Error ? error.message : "Unknown error",
      stack_trace: error instanceof Error ? error.stack : undefined,
      severity: options?.severity || "medium",
      source: "api",
      metadata: {
        operation: operationName,
        duration_ms: Math.round(duration),
      },
    })

    if (options?.onError) {
      options.onError(error as Error)
    }

    throw error
  }
}
