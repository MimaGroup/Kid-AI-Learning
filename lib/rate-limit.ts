import { Redis } from "@upstash/redis"

const redis = new Redis({
  url: process.env["UPSTASH-KV_KV_REST_API_URL"] || "",
  token: process.env["UPSTASH-KV_KV_REST_API_TOKEN"] || "",
})

export interface RateLimitConfig {
  requests: number // Maximum requests allowed
  window: number // Time window in milliseconds
}

export interface RateLimitResult {
  allowed: boolean
  remaining: number
  resetTime: number
  resetIn?: number
}

/**
 * Check rate limit using Upstash Redis
 * Uses sliding window algorithm for accurate rate limiting
 */
export async function checkRateLimit(key: string, config: RateLimitConfig): Promise<RateLimitResult> {
  try {
    const now = Date.now()
    const windowStart = now - config.window

    // Use Redis sorted set for sliding window
    const rateLimitKey = `ratelimit:${key}`

    // Remove old entries outside the window
    await redis.zremrangebyscore(rateLimitKey, 0, windowStart)

    // Count requests in current window
    const requestCount = await redis.zcard(rateLimitKey)

    if (requestCount >= config.requests) {
      // Get the oldest request timestamp to calculate reset time
      const oldestRequests = await redis.zrange(rateLimitKey, 0, 0, { withScores: true })
      const oldestTimestamp = oldestRequests.length > 0 ? Number(oldestRequests[1]) : now
      const resetTime = oldestTimestamp + config.window

      return {
        allowed: false,
        remaining: 0,
        resetTime,
        resetIn: Math.ceil((resetTime - now) / 1000),
      }
    }

    // Add current request
    await redis.zadd(rateLimitKey, { score: now, member: `${now}-${Math.random()}` })

    // Set expiry on the key (cleanup)
    await redis.expire(rateLimitKey, Math.ceil(config.window / 1000))

    return {
      allowed: true,
      remaining: config.requests - requestCount - 1,
      resetTime: now + config.window,
    }
  } catch (error) {
    console.error("[v0] Rate limit check failed, allowing request:", error)
    // Fail open - allow request if Redis is down
    return {
      allowed: true,
      remaining: 0,
      resetTime: Date.now() + config.window,
    }
  }
}

/**
 * Rate limit configurations for different endpoint types
 */
export const RATE_LIMITS = {
  // General API endpoints
  api: { requests: 100, window: 60000 }, // 100 requests per minute

  // Authentication endpoints (stricter)
  auth: { requests: 5, window: 300000 }, // 5 requests per 5 minutes

  // Payment endpoints (moderate)
  payment: { requests: 10, window: 60000 }, // 10 requests per minute

  // AI endpoints (expensive operations)
  aiGeneration: { requests: 3, window: 60000 }, // 3 AI generations per minute
  aiChat: { requests: 10, window: 60000 }, // 10 chat messages per minute

  // Premium user limits (higher)
  premiumAiGeneration: { requests: 10, window: 60000 }, // 10 AI generations per minute
  premiumAiChat: { requests: 30, window: 60000 }, // 30 chat messages per minute
} as const

/**
 * Get rate limit key for a user/IP and endpoint
 */
export function getRateLimitKey(identifier: string, endpoint: string): string {
  return `${identifier}:${endpoint}`
}

/**
 * Check if user has premium subscription (for higher rate limits)
 */
export async function isPremiumUser(userId: string): Promise<boolean> {
  try {
    // This would check the user's subscription status
    // For now, return false - implement when subscription check is needed
    return false
  } catch (error) {
    console.error("[v0] Error checking premium status:", error)
    return false
  }
}
