/**
 * Testing utilities for AI Kids Learning platform
 * Use these helpers for manual and automated testing
 */

import { createClient } from "@/lib/supabase/client"

// Test user credentials for different scenarios
export const TEST_USERS = {
  free: {
    email: "test-free@example.com",
    password: "TestPassword123!",
  },
  premium: {
    email: "test-premium@example.com",
    password: "TestPassword123!",
  },
  admin: {
    email: "test-admin@example.com",
    password: "TestPassword123!",
  },
}

// Stripe test cards
export const TEST_CARDS = {
  success: "4242424242424242",
  decline: "4000000000000002",
  requiresAuth: "4000002500003155",
  insufficientFunds: "4000000000009995",
}

/**
 * Test API endpoint
 */
export async function testApiEndpoint(endpoint: string, method: "GET" | "POST" | "PUT" | "DELETE" = "GET", body?: any) {
  try {
    const response = await fetch(endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    })

    const data = await response.json()

    return {
      success: response.ok,
      status: response.status,
      data,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

/**
 * Test database query
 */
export async function testDatabaseQuery(
  table: string,
  operation: "select" | "insert" | "update" | "delete",
  data?: any,
) {
  const supabase = createClient()

  try {
    let query

    switch (operation) {
      case "select":
        query = supabase.from(table).select("*")
        break
      case "insert":
        query = supabase.from(table).insert(data)
        break
      case "update":
        query = supabase.from(table).update(data)
        break
      case "delete":
        query = supabase.from(table).delete()
        break
    }

    const { data: result, error } = await query

    return {
      success: !error,
      data: result,
      error: error?.message,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

/**
 * Test authentication flow
 */
export async function testAuthFlow(email: string, password: string) {
  const supabase = createClient()

  // Test signup
  const { data: signupData, error: signupError } = await supabase.auth.signUp({
    email,
    password,
  })

  if (signupError) {
    return {
      success: false,
      step: "signup",
      error: signupError.message,
    }
  }

  // Test login
  const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (loginError) {
    return {
      success: false,
      step: "login",
      error: loginError.message,
    }
  }

  // Test logout
  const { error: logoutError } = await supabase.auth.signOut()

  if (logoutError) {
    return {
      success: false,
      step: "logout",
      error: logoutError.message,
    }
  }

  return {
    success: true,
    message: "Auth flow completed successfully",
  }
}

/**
 * Test analytics tracking
 */
export function testAnalyticsEvent(eventName: string, properties?: Record<string, any>) {
  console.log("[v0] Testing analytics event:", eventName, properties)

  // Check if event is tracked in localStorage
  const events = JSON.parse(localStorage.getItem("analytics_events") || "[]")
  const eventExists = events.some((e: any) => e.event === eventName)

  return {
    success: eventExists,
    message: eventExists ? `Event "${eventName}" tracked successfully` : `Event "${eventName}" not found in tracking`,
  }
}

/**
 * Test email delivery (check console/logs)
 */
export async function testEmailDelivery(type: "welcome" | "progress" | "achievement" | "reengagement") {
  const endpoints = {
    welcome: "/api/send-welcome-email",
    progress: "/api/engagement/send-weekly-summaries",
    achievement: "/api/engagement/trigger-achievement",
    reengagement: "/api/engagement/send-reengagement",
  }

  const endpoint = endpoints[type]

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })

    return {
      success: response.ok,
      status: response.status,
      message: response.ok ? `${type} email sent successfully` : `Failed to send ${type} email`,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

/**
 * Test performance metrics
 */
export function testPerformanceMetrics() {
  if (typeof window === "undefined") return null

  const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming

  return {
    loadTime: navigation.loadEventEnd - navigation.fetchStart,
    domContentLoaded: navigation.domContentLoadedEventEnd - navigation.fetchStart,
    firstPaint: performance.getEntriesByType("paint").find((entry) => entry.name === "first-paint")?.startTime,
    firstContentfulPaint: performance.getEntriesByType("paint").find((entry) => entry.name === "first-contentful-paint")
      ?.startTime,
  }
}

/**
 * Generate test report
 */
export function generateTestReport(tests: Array<{ name: string; passed: boolean; error?: string }>) {
  const totalTests = tests.length
  const passedTests = tests.filter((t) => t.passed).length
  const failedTests = totalTests - passedTests
  const passRate = ((passedTests / totalTests) * 100).toFixed(2)

  console.log("=== Test Report ===")
  console.log(`Total Tests: ${totalTests}`)
  console.log(`Passed: ${passedTests}`)
  console.log(`Failed: ${failedTests}`)
  console.log(`Pass Rate: ${passRate}%`)
  console.log("\nFailed Tests:")
  tests
    .filter((t) => !t.passed)
    .forEach((t) => {
      console.log(`- ${t.name}: ${t.error}`)
    })

  return {
    totalTests,
    passedTests,
    failedTests,
    passRate: Number.parseFloat(passRate),
  }
}
