import type { NextRequest } from "next/server"
import crypto from "crypto"

export function generateCsrfToken(): string {
  return crypto.randomBytes(32).toString("hex")
}

export function validateCsrfToken(token: string, storedToken: string): boolean {
  if (!token || !storedToken) return false
  return crypto.timingSafeEqual(Buffer.from(token), Buffer.from(storedToken))
}

export function generateSecureToken(length = 32): string {
  return crypto.randomBytes(length).toString("base64url")
}

export function hashData(data: string): string {
  return crypto.createHash("sha256").update(data).digest("hex")
}

export function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for")
  const realIp = request.headers.get("x-real-ip")

  if (forwarded) {
    return forwarded.split(",")[0].trim()
  }

  if (realIp) {
    return realIp
  }

  return request.ip || "unknown"
}

export function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return false

  const allowedOrigins = [
    process.env.NEXT_PUBLIC_SITE_URL,
    "https://kids-learning-ai.com",
    "http://localhost:3000",
  ].filter(Boolean)

  return allowedOrigins.some((allowed) => origin.startsWith(allowed as string))
}

export interface AuditLogEntry {
  userId?: string
  action: string
  resource: string
  ip: string
  userAgent: string
  timestamp: Date
  metadata?: Record<string, any>
}

export function createAuditLog(entry: AuditLogEntry): void {
  // In production, send to logging service (e.g., Vercel Analytics, Sentry)
  if (process.env.NODE_ENV === "development") {
    console.log("[AUDIT]", JSON.stringify(entry, null, 2))
  }
  // TODO: Implement production logging
}
