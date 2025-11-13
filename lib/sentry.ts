// Sentry disabled for v0 preview environment compatibility
// Original Sentry import commented out:
// import * as Sentry from "@sentry/nextjs"

export function initSentry() {
  // No-op: Sentry initialization disabled
  return
}

// Helper to capture exceptions with context
export function captureException(error: Error, context?: Record<string, any>) {
  // Log to console instead of Sentry
  if (process.env.NODE_ENV === "development") {
    console.error("[Error]", error, context)
  }
}

// Helper to capture messages
export function captureMessage(message: string, level: "info" | "warning" | "error" = "info") {
  // Log to console instead of Sentry
  if (process.env.NODE_ENV === "development") {
    console.log(`[${level}]:`, message)
  }
}

// Helper to set user context
export function setUser(user: { id: string; email?: string; username?: string } | null) {
  // No-op: Sentry disabled
  return
}

// Helper to add breadcrumb
export function addBreadcrumb(breadcrumb: {
  message: string
  category?: string
  level?: "info" | "warning" | "error"
  data?: Record<string, any>
}) {
  // No-op: Sentry disabled
  return
}
