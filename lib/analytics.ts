// Analytics and tracking utilities for monitoring user behavior and app performance

type EventName =
  | "page_view"
  | "user_signup"
  | "user_login"
  | "subscription_started"
  | "subscription_cancelled"
  | "payment_success"
  | "payment_failed"
  | "child_profile_created"
  | "activity_started"
  | "activity_completed"
  | "badge_earned"
  | "achievement_unlocked"
  | "contact_form_submitted"
  | "error_occurred"

type EventProperties = Record<string, string | number | boolean | undefined>

/**
 * Track custom events for analytics
 */
export function trackEvent(eventName: EventName, properties?: EventProperties) {
  try {
    // Log to console in development
    if (process.env.NODE_ENV === "development") {
      console.log("[v0] Analytics Event:", eventName, properties)
    }

    // Send to analytics service (e.g., Google Analytics, Mixpanel, etc.)
    // Example: window.gtag?.('event', eventName, properties)

    // Store in localStorage for basic tracking
    const events = getStoredEvents()
    events.push({
      name: eventName,
      properties,
      timestamp: new Date().toISOString(),
    })

    // Keep only last 100 events
    if (events.length > 100) {
      events.shift()
    }

    localStorage.setItem("analytics_events", JSON.stringify(events))
  } catch (error) {
    console.error("[v0] Analytics tracking error:", error)
  }
}

/**
 * Track page views
 */
export function trackPageView(pagePath: string, pageTitle?: string) {
  trackEvent("page_view", {
    page_path: pagePath,
    page_title: pageTitle || document.title,
  })
}

/**
 * Track subscription metrics
 */
export function trackSubscription(action: "started" | "cancelled", plan: "monthly" | "yearly") {
  const eventName = action === "started" ? "subscription_started" : "subscription_cancelled"
  trackEvent(eventName, {
    plan,
    timestamp: Date.now(),
  })
}

/**
 * Track payment events
 */
export function trackPayment(status: "success" | "failed", amount?: number, currency?: string) {
  const eventName = status === "success" ? "payment_success" : "payment_failed"
  trackEvent(eventName, {
    amount,
    currency,
    timestamp: Date.now(),
  })
}

/**
 * Track errors for monitoring
 */
export function trackError(error: Error, context?: string) {
  trackEvent("error_occurred", {
    error_message: error.message,
    error_stack: error.stack?.substring(0, 500), // Limit stack trace length
    context,
    timestamp: Date.now(),
  })

  // Also log to console
  console.error("[v0] Error tracked:", error, context)
}

/**
 * Get stored analytics events
 */
function getStoredEvents() {
  try {
    const stored = localStorage.getItem("analytics_events")
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

/**
 * Get analytics summary for admin/debugging
 */
export function getAnalyticsSummary() {
  const events = getStoredEvents()

  const summary = {
    totalEvents: events.length,
    eventCounts: {} as Record<string, number>,
    recentEvents: events.slice(-10),
  }

  events.forEach((event: { name: string }) => {
    summary.eventCounts[event.name] = (summary.eventCounts[event.name] || 0) + 1
  })

  return summary
}

/**
 * Clear analytics data (for testing/privacy)
 */
export function clearAnalytics() {
  localStorage.removeItem("analytics_events")
  console.log("[v0] Analytics data cleared")
}
