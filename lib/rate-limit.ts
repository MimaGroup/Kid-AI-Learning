import { Redis } from "@upstash/redis"

const redisUrl = process.env["UPSTASH-KV_KV_REST_API_URL"]
const redisToken = process.env["UPSTASH-KV_KV_REST_API_TOKEN"]

// Only initialize Redis if credentials are available
const redis =
  redisUrl && redisToken
    ? new Redis({
        url: redisUrl,
        token: redisToken,
      })
    : null

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
 * Uses fixed window counter algorithm for simplicity and reliability
 */
export async function checkRateLimit(key: string, config: RateLimitConfig): Promise<RateLimitResult> {
  if (!redis) {
    return {
      allowed: true,
      remaining: config.requests,
      resetTime: Date.now() + config.window,
    }
  }

  try {
    const now = Date.now()
    const windowKey = Math.floor(now / config.window)
    const rateLimitKey = `ratelimit:${key}:${windowKey}`

    // Increment the counter for this window
    const count = await redis.incr(rateLimitKey)

    // Set expiry on first request in this window
    if (count === 1) {
      await redis.expire(rateLimitKey, Math.ceil(config.window / 1000) + 1)
    }

    const resetTime = (windowKey + 1) * config.window

    if (count > config.requests) {
      return {
        allowed: false,
        remaining: 0,
        resetTime,
        resetIn: Math.ceil((resetTime - now) / 1000),
      }
    }

    return {
      allowed: true,
      remaining: config.requests - count,
      resetTime,
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.error("[v0] Rate limit check failed, allowing request:", errorMessage)
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
} satisfies Record<string, RateLimitConfig>

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
