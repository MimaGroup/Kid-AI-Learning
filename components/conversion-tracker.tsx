"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"

export function ConversionTracker() {
  const searchParams = useSearchParams()

  useEffect(() => {
    const source = searchParams.get("utm_source")
    const medium = searchParams.get("utm_medium")
    const campaign = searchParams.get("utm_campaign")

    if (source || medium || campaign) {
      // Track the visit
      fetch("/api/analytics/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: "page_view",
          source: source || "direct",
          metadata: {
            medium,
            campaign,
            referrer: document.referrer,
            page: window.location.pathname,
          },
        }),
      }).catch((err) => console.error("[v0] Tracking error:", err))

      // Store source in session for conversion attribution
      sessionStorage.setItem(
        "attribution",
        JSON.stringify({
          source,
          medium,
          campaign,
          timestamp: new Date().toISOString(),
        }),
      )

      console.log("[v0] Tracked visit from:", { source, medium, campaign })
    }
  }, [searchParams])

  return null // This component doesn't render anything
}
