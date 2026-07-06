export async function register() {
  // Sentry disabled for v0 preview environment compatibility
  // Uncomment below to re-enable in production:
  /*
  // Only initialize Sentry if DSN is configured
  if (!process.env.NEXT_PUBLIC_SENTRY_DSN) {
    return
  }

  try {
    if (process.env.NEXT_RUNTIME === "nodejs") {
      const { initSentry } = await import("./lib/sentry")
      initSentry()
    }

    if (process.env.NEXT_RUNTIME === "edge") {
      const { initSentry } = await import("./lib/sentry")
      initSentry()
    }
  } catch (error) {
    // Silently fail if Sentry initialization fails (e.g., in preview environments)
    console.warn("Failed to initialize Sentry:", error)
  }
  */
}
