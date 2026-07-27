"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X, Shield } from "lucide-react"
import Link from "next/link"

export function CoppaConsentBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [shouldShow, setShouldShow] = useState(false)

  useEffect(() => {
    // Check if user has already accepted
    const hasAccepted = localStorage.getItem("coppa-consent-accepted")
    if (hasAccepted) {
      return // Don't set up triggers if already accepted
    }

    let hasTriggered = false

    const triggerBanner = () => {
      if (hasTriggered) return
      hasTriggered = true
      setShouldShow(true)
      // Clean up listeners once triggered
      window.removeEventListener("scroll", handleScroll)
      clearTimeout(timeoutId)
    }

    // Trigger 1: Scroll past hero section (~600px)
    const handleScroll = () => {
      if (window.scrollY >= 600) {
        triggerBanner()
      }
    }

    // Trigger 2: 5-second delay
    const timeoutId = setTimeout(() => {
      triggerBanner()
    }, 5000)

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearTimeout(timeoutId)
    }
  }, [])

  // Show banner when trigger condition is met
  useEffect(() => {
    if (shouldShow) {
      setIsVisible(true)
    }
  }, [shouldShow])

  const handleAccept = () => {
    localStorage.setItem("coppa-consent-accepted", "true")
    setIsVisible(false)
  }

  const handleDecline = () => {
    setIsVisible(false)
    // Redirect to home page
    window.location.href = "/"
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-blue-500 shadow-2xl">
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <Shield className="h-8 w-8 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2 text-gray-900">Zahtevana je starševska privolitev</h3>
            <p className="text-sm text-gray-700 mb-4">
              Kids Learning AI je zasnovana za otroke in je skladna z GDPR ter slovenskim ZVOP-2. Z uporabo te
              platforme potrjujete, da ste starš ali zakoniti skrbnik ter soglašate z zbiranjem in uporabo podatkov
              vašega otroka, kot je opisano v naši{" "}
              <Link href="/privacy" className="text-blue-600 hover:underline font-medium">
                Politiki zasebnosti
              </Link>
              . Zbiramo le podatke, ki so nujno potrebni za izobraževalne namene, in jih nikoli ne delimo s tretjimi
              osebami v trženjske namene.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button onClick={handleAccept} className="bg-blue-600 hover:bg-blue-700">
                Soglašam (starš/skrbnik)
              </Button>
              <Button onClick={handleDecline} variant="outline">
                Zavrni
              </Button>
              <Link href="/privacy" className="inline-flex items-center text-sm text-blue-600 hover:underline">
                Preberi več o naši politiki zasebnosti
              </Link>
            </div>
          </div>
          <button
            onClick={handleDecline}
            className="flex-shrink-0 text-gray-400 hover:text-gray-600"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
