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
            <h3 className="text-lg font-semibold mb-2 text-gray-900">Parental Consent Required</h3>
            <p className="text-sm text-gray-700 mb-4">
              AI Kids Learning Platform is designed for children and complies with COPPA (Children's Online Privacy
              Protection Act). By using this platform, you confirm that you are a parent or legal guardian and consent
              to the collection and use of your child's information as described in our{" "}
              <Link href="/privacy-policy" className="text-blue-600 hover:underline font-medium">
                Privacy Policy
              </Link>
              . We collect only necessary information for educational purposes and never share children's data with
              third parties for marketing.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button onClick={handleAccept} className="bg-blue-600 hover:bg-blue-700">
                I Consent (Parent/Guardian)
              </Button>
              <Button onClick={handleDecline} variant="outline">
                Decline
              </Button>
              <Link href="/privacy-policy" className="inline-flex items-center text-sm text-blue-600 hover:underline">
                Learn More About Our Privacy Practices
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
