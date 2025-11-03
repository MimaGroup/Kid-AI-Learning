import * as Sentry from "@sentry/nextjs"

export function initSentry() {
  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

      // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
      // Adjust this value in production
      tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,

      // Capture Replay for 10% of all sessions,
      // plus 100% of sessions with an error
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,

      environment: process.env.NODE_ENV,

      // Filter out sensitive data
      beforeSend(event, hint) {
        // Remove sensitive headers
        if (event.request?.headers) {
          delete event.request.headers["authorization"]
          delete event.request.headers["cookie"]
        }

        // Remove sensitive query params
        if (event.request?.query_string) {
          const sensitiveParams = ["token", "api_key", "password", "secret"]
          sensitiveParams.forEach((param) => {
            if (event.request?.query_string?.includes(param)) {
              event.request.query_string = event.request.query_string.replace(
                new RegExp(`${param}=[^&]*`, "gi"),
                `${param}=[REDACTED]`,
              )
            }
          })
        }

        return event
      },

      // Ignore certain errors
      ignoreErrors: [
        // Browser extensions
        "top.GLOBALS",
        "chrome-extension://",
        "moz-extension://",
        // Network errors
        "NetworkError",
        "Failed to fetch",
        // User cancelled actions
        "AbortError",
        "User cancelled",
      ],
    })
  }
}

// Helper to capture exceptions with context
export function captureException(error: Error, context?: Record<string, any>) {
  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    Sentry.captureException(error, {
      extra: context,
    })
  }

  // Also log to console in development
  if (process.env.NODE_ENV === "development") {
    console.error("[Sentry]", error, context)
  }
}

// Helper to capture messages
export function captureMessage(message: string, level: "info" | "warning" | "error" = "info") {
  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    Sentry.captureMessage(message, level)
  }

  if (process.env.NODE_ENV === "development") {
    console.log(`[Sentry] ${level}:`, message)
  }
}

// Helper to set user context
export function setUser(user: { id: string; email?: string; username?: string } | null) {
  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    Sentry.setUser(user)
  }
}

// Helper to add breadcrumb
export function addBreadcrumb(breadcrumb: {
  message: string
  category?: string
  level?: "info" | "warning" | "error"
  data?: Record<string, any>
}) {
  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    Sentry.addBreadcrumb(breadcrumb)
  }
}
