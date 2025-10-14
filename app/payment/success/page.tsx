"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function PaymentSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (sessionId) {
      // Verify the payment session
      fetch(`/api/stripe/verify-session?session_id=${sessionId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setLoading(false)
          } else {
            setError(data.error || "Payment verification failed")
            setLoading(false)
          }
        })
        .catch((err) => {
          setError("Failed to verify payment")
          setLoading(false)
        })
    } else {
      setError("No session ID provided")
      setLoading(false)
    }
  }, [sessionId])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
        <Card className="p-8 max-w-md text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Verifying Payment...</h2>
          <p className="text-gray-600">Please wait while we confirm your subscription.</p>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
        <Card className="p-8 max-w-md text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button onClick={() => router.push("/pricing")} className="bg-purple-600 hover:bg-purple-700">
            Back to Pricing
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
      <Card className="p-8 max-w-md text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Premium!</h2>
        <p className="text-gray-600 mb-6">
          Your subscription is now active. You have full access to all premium activities and content.
        </p>

        <div className="bg-purple-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-gray-900 mb-2">What's unlocked:</h3>
          <ul className="text-left text-sm text-gray-700 space-y-1">
            <li>✓ AI Friend Creator</li>
            <li>✓ Pattern Training</li>
            <li>✓ Full Content Library</li>
            <li>✓ Advanced Analytics</li>
            <li>✓ Priority Support</li>
          </ul>
        </div>

        <Button onClick={() => router.push("/kids/home")} className="w-full bg-purple-600 hover:bg-purple-700">
          Start Learning
        </Button>
      </Card>
    </div>
  )
}
