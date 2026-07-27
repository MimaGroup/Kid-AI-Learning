"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Cookie } from "lucide-react"
import Link from "next/link"

export const COOKIE_CONSENT_KEY = "cookie-consent"
export const COOKIE_CONSENT_EVENT = "cookie-consent-changed"

export function CookieConsentBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const existing = localStorage.getItem(COOKIE_CONSENT_KEY)
    if (!existing) setVisible(true)
  }, [])

  const setConsent = (value: "all" | "essential") => {
    localStorage.setItem(COOKIE_CONSENT_KEY, value)
    window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_EVENT, { detail: value }))
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] bg-white border-t-2 border-purple-500 shadow-2xl">
      <div className="max-w-4xl mx-auto p-5">
        <div className="flex items-start gap-3">
          <Cookie className="h-6 w-6 text-purple-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm text-gray-700 leading-relaxed">
              Uporabljamo nujne piškotke za delovanje platforme. Z vašim soglasjem uporabljamo tudi piškotke za
              trženjske namene (npr. Facebook Pixel) — teh nikoli ne uporabljamo znotraj otroškega dela aplikacije.
              Več v naši{" "}
              <Link href="/cookie-policy" className="text-purple-600 hover:underline font-medium">
                Politiki piškotkov
              </Link>
              .
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <Button size="sm" onClick={() => setConsent("all")} className="bg-purple-600 hover:bg-purple-700">
                Sprejmi vse
              </Button>
              <Button size="sm" variant="outline" onClick={() => setConsent("essential")}>
                Samo nujne
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
