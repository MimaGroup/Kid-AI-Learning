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
  | "child_profile_deleted"
  | "child_profile_edited"
  | "activity_started"
  | "activity_completed"
  | "activity_abandoned"
  | "quiz_completed"
  | "game_score_achieved"
  | "badge_earned"
  | "achievement_unlocked"
  | "level_up"
  | "ai_friend_created"
  | "ai_friend_chat_started"
  | "ai_friend_message_sent"
  | "library_content_viewed"
  | "story_started"
  | "story_completed"
  | "pricing_page_viewed"
  | "upgrade_button_clicked"
  | "checkout_started"
  | "onboarding_started"
  | "onboarding_completed"
  | "onboarding_abandoned"
  | "tutorial_started"
  | "tutorial_completed"
  | "tutorial_skipped"
  | "contact_form_submitted"
  | "error_occurred"

type EventProperties = Record<string, string | number | boolean | undefined>

/**
 * Track custom events for analytics
 */
export function trackEvent(eventName: EventName, properties?: EventProperties) {
  try {
    if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_DEV_MODE === "true") {
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

/**
 * Track activity events (games, quizzes, etc.)
 */
export function trackActivity(
  action: "started" | "completed" | "abandoned",
  activityName: string,
  properties?: EventProperties,
) {
  const eventMap = {
    started: "activity_started",
    completed: "activity_completed",
    abandoned: "activity_abandoned",
  } as const

  trackEvent(eventMap[action], {
    activity_name: activityName,
    ...properties,
  })
}

/**
 * Track quiz completion with score
 */
export function trackQuizCompletion(quizName: string, score: number, totalQuestions: number, timeSpent?: number) {
  trackEvent("quiz_completed", {
    quiz_name: quizName,
    score,
    total_questions: totalQuestions,
    time_spent_seconds: timeSpent,
    percentage: Math.round((score / totalQuestions) * 100),
  })
}

/**
 * Track game score achievements
 */
export function trackGameScore(gameName: string, score: number, level?: number, timeSpent?: number) {
  trackEvent("game_score_achieved", {
    game_name: gameName,
    score,
    level,
    time_spent_seconds: timeSpent,
  })
}

/**
 * Track gamification events
 */
export function trackGamification(
  type: "badge" | "achievement" | "level_up",
  name: string,
  properties?: EventProperties,
) {
  const eventMap = {
    badge: "badge_earned",
    achievement: "achievement_unlocked",
    level_up: "level_up",
  } as const

  trackEvent(eventMap[type], {
    name,
    ...properties,
  })
}

/**
 * Track AI friend interactions
 */
export function trackAIFriend(action: "created" | "chat_started" | "message_sent", friendName?: string) {
  const eventMap = {
    created: "ai_friend_created",
    chat_started: "ai_friend_chat_started",
    message_sent: "ai_friend_message_sent",
  } as const

  trackEvent(eventMap[action], {
    friend_name: friendName,
    timestamp: Date.now(),
  })
}

/**
 * Track content engagement
 */
export function trackContent(
  type: "library" | "story",
  action: "viewed" | "started" | "completed",
  contentName: string,
  properties?: EventProperties,
) {
  const eventName =
    type === "library" ? "library_content_viewed" : action === "started" ? "story_started" : "story_completed"

  trackEvent(eventName, {
    content_name: contentName,
    ...properties,
  })
}

/**
 * Track conversion funnel events
 */
export function trackConversion(stage: "pricing_viewed" | "upgrade_clicked" | "checkout_started", plan?: string) {
  const eventMap = {
    pricing_viewed: "pricing_page_viewed",
    upgrade_clicked: "upgrade_button_clicked",
    checkout_started: "checkout_started",
  } as const

  trackEvent(eventMap[stage], {
    plan,
    timestamp: Date.now(),
  })
}

/**
 * Track onboarding flow
 */
export function trackOnboarding(action: "started" | "completed" | "abandoned", step?: number, totalSteps?: number) {
  const eventMap = {
    started: "onboarding_started",
    completed: "onboarding_completed",
    abandoned: "onboarding_abandoned",
  } as const

  trackEvent(eventMap[action], {
    step,
    total_steps: totalSteps,
    timestamp: Date.now(),
  })
}

/**
 * Track tutorial interactions
 */
export function trackTutorial(action: "started" | "completed" | "skipped", tutorialId: string, step?: number) {
  const eventMap = {
    started: "tutorial_started",
    completed: "tutorial_completed",
    skipped: "tutorial_skipped",
  } as const

  trackEvent(eventMap[action], {
    tutorial_id: tutorialId,
    step,
    timestamp: Date.now(),
  })
}
