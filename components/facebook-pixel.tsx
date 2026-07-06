"use client"

import { useEffect, useRef } from "react"
import { usePathname, useSearchParams } from "next/navigation"

declare global {
  interface Window {
    fbq: (...args: unknown[]) => void
  }
}

export function FacebookPixelPageView() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const initialPageViewFired = useRef(false)
  const previousPath = useRef<string | null>(null)

  useEffect(() => {
    // Skip initial render since the base script already fires PageView
    if (!initialPageViewFired.current) {
      initialPageViewFired.current = true
      previousPath.current = pathname
      return
    }

    // Only fire on actual route changes (not initial load)
    if (typeof window !== "undefined" && window.fbq && pathname !== previousPath.current) {
      previousPath.current = pathname
      window.fbq("track", "PageView")
    }
  }, [pathname, searchParams])

  return null
}
