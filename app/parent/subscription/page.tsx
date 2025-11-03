"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { UserHeader } from "@/components/user-header"
import { BackToHomeButton } from "@/components/back-to-home-button"
import { ContactSupportDialog } from "@/components/contact-support-dialog"

interface Subscription {
  plan_type: string
  status: string
  current_period_end: string | null
  cancel_at_period_end: boolean
}

export default function SubscriptionManagementPage() {
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [loading, setLoading] = useState(true)
  const [canceling, setCanceling] = useState(false)
  const router = useRouter()

  useEffect(() => {
    fetchSubscription()
  }, [])

  const fetchSubscription = async () => {
    try {
      const response = await fetch("/api/subscription/status")
      const data = await response.json()
      setSubscription(data)
    } catch (error) {
      console.error("Failed to fetch subscription:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCancelSubscription = async () => {
    if (
      !confirm(
        "Are you sure you want to cancel your subscription? You'll have access until the end of your billing period.",
      )
    ) {
      return
    }

    setCanceling(true)
    try {
      const response = await fetch("/api/subscription/cancel", {
        method: "POST",
      })

      const data = await response.json()

      if (data.success) {
        alert("Subscription canceled successfully. You'll have access until the end of your billing period.")
        fetchSubscription()
      } else {
        alert(data.error || "Failed to cancel subscription")
      }
    } catch (error) {
      console.error("Cancellation error:", error)
      alert("Failed to cancel subscription")
    } finally {
      setCanceling(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">Loading subscription details...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <BackToHomeButton variant="home" />
          <UserHeader />
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-8">Subscription Management</h1>

        <Card className="p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Current Plan</h2>
              <p className="text-gray-600">Manage your subscription and billing</p>
            </div>
            <Badge className={subscription?.status === "active" ? "bg-green-500" : "bg-gray-500"}>
              {subscription?.status || "Unknown"}
            </Badge>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b">
              <span className="text-gray-700 font-medium">Plan Type:</span>
              <span className="text-gray-900 font-semibold capitalize">{subscription?.plan_type || "Free"}</span>
            </div>

            {subscription?.current_period_end && (
              <div className="flex justify-between items-center py-3 border-b">
                <span className="text-gray-700 font-medium">Next Billing Date:</span>
                <span className="text-gray-900">{new Date(subscription.current_period_end).toLocaleDateString()}</span>
              </div>
            )}

            {subscription?.cancel_at_period_end && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800 font-medium">
                  Your subscription will be canceled at the end of the current billing period.
                </p>
              </div>
            )}
          </div>

          <div className="mt-8 flex gap-4">
            {subscription?.plan_type === "free" ? (
              <Button onClick={() => router.push("/pricing")} className="bg-purple-600 hover:bg-purple-700">
                Upgrade to Premium
              </Button>
            ) : (
              <>
                {!subscription?.cancel_at_period_end && (
                  <Button
                    onClick={handleCancelSubscription}
                    disabled={canceling}
                    variant="outline"
                    className="border-red-500 text-red-500 hover:bg-red-50 bg-transparent"
                  >
                    {canceling ? "Canceling..." : "Cancel Subscription"}
                  </Button>
                )}
                <Button onClick={() => router.push("/pricing")} variant="outline">
                  Change Plan
                </Button>
              </>
            )}
          </div>
        </Card>

        <Card className="p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Need Help?</h3>
          <p className="text-gray-600 mb-4">
            If you have any questions about your subscription or billing, please contact our support team.
          </p>
          <ContactSupportDialog />
        </Card>
      </div>
    </div>
  )
}
