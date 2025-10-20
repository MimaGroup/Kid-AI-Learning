import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"
import { checkRateLimit, RATE_LIMITS, getRateLimitKey } from "@/lib/rate-limit"

// Rate limiting store (in-memory for simplicity, use Redis for production)
// const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

// Rate limit configuration
// const RATE_LIMITS = {
//   api: { requests: 100, window: 60000 }, // 100 requests per minute
//   auth: { requests: 5, window: 300000 }, // 5 requests per 5 minutes
//   payment: { requests: 10, window: 60000 }, // 10 requests per minute
// }

// function getRateLimitKey(ip: string, path: string): string {
//   return `${ip}:${path}`
// }

// function checkRateLimit(
//   key: string,
//   limit: { requests: number; window: number },
// ): { allowed: boolean; remaining: number; resetTime: number } {
//   const now = Date.now()
//   const record = rateLimitStore.get(key)

//   if (!record || now > record.resetTime) {
//     // Create new record
//     rateLimitStore.set(key, { count: 1, resetTime: now + limit.window })
//     return { allowed: true, remaining: limit.requests - 1, resetTime: now + limit.window }
//   }

//   if (record.count >= limit.requests) {
//     return { allowed: false, remaining: 0, resetTime: record.resetTime }
//   }

//   record.count++
//   return { allowed: true, remaining: limit.requests - record.count, resetTime: record.resetTime }
// }

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const ip = request.ip || request.headers.get("x-forwarded-for") || "unknown"

  let rateLimit = RATE_LIMITS.api
  let endpoint = "api"

  if (pathname.startsWith("/api/auth")) {
    rateLimit = RATE_LIMITS.auth
    endpoint = "auth"
  } else if (pathname.startsWith("/api/stripe") || pathname.startsWith("/api/subscription")) {
    rateLimit = RATE_LIMITS.payment
    endpoint = "payment"
  }

  const rateLimitKey = getRateLimitKey(ip, endpoint)
  const rateLimitResult = await checkRateLimit(rateLimitKey, rateLimit)

  if (!rateLimitResult.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: {
          "X-RateLimit-Limit": rateLimit.requests.toString(),
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": new Date(rateLimitResult.resetTime).toISOString(),
          "Retry-After": (rateLimitResult.resetIn || 60).toString(),
        },
      },
    )
  }

  const response = NextResponse.next()

  // Add rate limit headers
  response.headers.set("X-RateLimit-Limit", rateLimit.requests.toString())
  response.headers.set("X-RateLimit-Remaining", rateLimitResult.remaining.toString())
  response.headers.set("X-RateLimit-Reset", new Date(rateLimitResult.resetTime).toISOString())

  response.headers.set("X-Frame-Options", "DENY")
  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
  response.headers.set("X-XSS-Protection", "1; mode=block")
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), interest-cohort=()")

  if (pathname.startsWith("/admin")) {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value
          },
          set(name: string, value: string, options: any) {
            response.cookies.set({ name, value, ...options })
          },
          remove(name: string, options: any) {
            response.cookies.set({ name, value: "", ...options })
          },
        },
      },
    )

    const {
      data: { user },
    } = await supabase.auth.getUser()

    // Redirect to login if not authenticated, with return URL
    if (!user) {
      const loginUrl = new URL("/parent/login", request.url)
      loginUrl.searchParams.set("redirect", pathname)
      return NextResponse.redirect(loginUrl)
    }

    // Check admin role
    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

    // Redirect non-admins to parent dashboard
    if (!profile || profile.role !== "admin") {
      return NextResponse.redirect(new URL("/parent/dashboard", request.url))
    }
  }

  if (pathname.startsWith("/parent") || pathname.startsWith("/kids")) {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value
          },
          set(name: string, value: string, options: any) {
            response.cookies.set({ name, value, ...options })
          },
          remove(name: string, options: any) {
            response.cookies.set({ name, value: "", ...options })
          },
        },
      },
    )

    const {
      data: { user },
    } = await supabase.auth.getUser()

    // Redirect to login if not authenticated
    if (!user && !pathname.startsWith("/parent/login")) {
      return NextResponse.redirect(new URL("/parent/login", request.url))
    }
  }

  return response
}

export const config = {
  matcher: [
    "/api/:path*",
    "/admin/:path*",
    "/parent/:path*",
    "/kids/:path*",
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
