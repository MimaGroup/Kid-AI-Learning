"use client"

import { useEffect, useRef, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { COOKIE_CONSENT_KEY, COOKIE_CONSENT_EVENT } from "@/components/cookie-consent-banner"

declare global {
  interface Window {
    fbq: (...args: unknown[]) => void
  }
}

const FB_PIXEL_ID = "26081756688144186"

// Hard exclusion: the pixel must NEVER load on child-facing surfaces, no matter what
// the parent consented to elsewhere. Everything outside /kids/* may load it once the
// parent has accepted marketing cookies via the cookie consent banner.
function isChildSurface(pathname: string) {
  return pathname.startsWith("/kids")
}

function hasMarketingConsent() {
  return localStorage.getItem(COOKIE_CONSENT_KEY) === "all"
}

function loadPixelScript() {
  if ("fbq" in window) return
  const win = window as unknown as Record<string, any>
  /* eslint-disable */
  ;(function (f: any, b: any, e: any, v: any) {
    if (f.fbq) return
    const n: any = (f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
    })
    if (!f._fbq) f._fbq = n
    n.push = n
    n.loaded = true
    n.version = "2.0"
    n.queue = []
    const t = b.createElement(e)
    t.async = true
    t.src = v
    const s = b.getElementsByTagName(e)[0]
    s.parentNode.insertBefore(t, s)
  })(win, document, "script", "https://connect.facebook.net/en_US/fbevents.js")
  /* eslint-enable */
  win.fbq("init", FB_PIXEL_ID)
  win.fbq("track", "PageView")
}

/**
 * Facebook Pixel — consent-gated, and hard-disabled on every /kids/* route.
 * Renders nothing; only ever injects the tracking script when both:
 *  1. the current route is not a child-facing surface (/kids/*)
 *  2. the visitor has accepted marketing cookies via the cookie consent banner
 */
export function FacebookPixel() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [loaded, setLoaded] = useState(false)
  const previousPath = useRef<string | null>(null)

  useEffect(() => {
    if (isChildSurface(pathname)) return

    if (hasMarketingConsent() && !loaded) {
      loadPixelScript()
      setLoaded(true)
    }

    const onConsentChange = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail
      if (detail === "all" && !isChildSurface(window.location.pathname) && !loaded) {
        loadPixelScript()
        setLoaded(true)
      }
    }
    window.addEventListener(COOKIE_CONSENT_EVENT, onConsentChange)
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, onConsentChange)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, loaded])

  useEffect(() => {
    if (!loaded || isChildSurface(pathname)) return
    if (previousPath.current === null) {
      previousPath.current = pathname
      return
    }
    if (pathname !== previousPath.current && window.fbq) {
      previousPath.current = pathname
      window.fbq("track", "PageView")
    }
  }, [pathname, searchParams, loaded])

  return null
}
