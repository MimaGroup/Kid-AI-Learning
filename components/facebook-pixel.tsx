"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

declare global {
  interface Window {
    fbq: (...args: unknown[]) => void
  }
}

export function FacebookPixelPageView() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Track page view on route change
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "PageView")
    }
  }, [pathname, searchParams])

  return null
}
