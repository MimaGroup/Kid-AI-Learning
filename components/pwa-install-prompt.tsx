"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      console.log("[v0] App is already installed")
      return
    }

    // Check if user has dismissed the prompt before
    const dismissed = localStorage.getItem("pwa-install-dismissed")
    if (dismissed) {
      console.log("[v0] User previously dismissed install prompt")
      return
    }

    // Listen for the beforeinstallprompt event
    const handler = (e: Event) => {
      console.log("[v0] beforeinstallprompt event fired")
      e.preventDefault()
      setDeferredPrompt(e)
      // Show prompt after a short delay
      setTimeout(() => setShowPrompt(true), 3000)
    }

    window.addEventListener("beforeinstallprompt", handler)

    return () => {
      window.removeEventListener("beforeinstallprompt", handler)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    console.log("[v0] User clicked install")
    deferredPrompt.prompt()

    const { outcome } = await deferredPrompt.userChoice
    console.log("[v0] User choice:", outcome)

    if (outcome === "accepted") {
      console.log("[v0] User accepted the install prompt")
    } else {
      console.log("[v0] User dismissed the install prompt")
    }

    setDeferredPrompt(null)
    setShowPrompt(false)
  }

  const handleDismiss = () => {
    console.log("[v0] User dismissed install prompt")
    localStorage.setItem("pwa-install-dismissed", "true")
    setShowPrompt(false)
  }

  if (!showPrompt) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50 animate-in slide-in-from-bottom-5">
      <div className="bg-white rounded-xl shadow-2xl border border-gray-200 p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
            <span className="text-2xl">🚀</span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 mb-1">Install AI Kids Learning</h3>
            <p className="text-sm text-gray-600 mb-3">Install our app for quick access and offline learning!</p>
            <div className="flex gap-2">
              <button
                onClick={handleInstall}
                className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
              >
                Install
              </button>
              <button
                onClick={handleDismiss}
                className="px-4 py-2 text-gray-600 text-sm font-medium hover:text-gray-800 transition-colors"
              >
                Not now
              </button>
            </div>
          </div>
          <button onClick={handleDismiss} className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
