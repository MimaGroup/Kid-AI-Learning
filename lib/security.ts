import type { NextRequest } from "next/server"

export function generateCsrfToken(): string {
  const array = new Uint8Array(32)
  window.crypto.getRandomValues(array)
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join("")
}

export function validateCsrfToken(token: string, storedToken: string): boolean {
  if (!token || !storedToken) return false
  // Simple constant-time comparison
  if (token.length !== storedToken.length) return false

  let result = 0
  for (let i = 0; i < token.length; i++) {
    result |= token.charCodeAt(i) ^ storedToken.charCodeAt(i)
  }
  return result === 0
}

export function generateSecureToken(length = 32): string {
  const array = new Uint8Array(length)
  window.crypto.getRandomValues(array)
  // Convert to base64url format
  return btoa(String.fromCharCode(...array))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "")
}

export async function hashData(data: string): Promise<string> {
  const encoder = new TextEncoder()
  const dataBuffer = encoder.encode(data)
  const hashBuffer = await window.crypto.subtle.digest("SHA-256", dataBuffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((byte) => byte.toString(16).padStart(2, "0")).join("")
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

  // On Vercel, x-forwarded-for or x-real-ip headers are always set
  return "unknown"
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
  if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_DEV_MODE === "true") {
    console.log("[AUDIT]", JSON.stringify(entry, null, 2))
  }
  // TODO: Implement production logging
}
