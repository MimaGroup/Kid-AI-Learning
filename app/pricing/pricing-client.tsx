"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { createBrowserClient } from "@/lib/supabase/client"
import { Footer } from "@/components/footer"
import { trackEvent, trackConversion } from "@/lib/analytics"

export default function PricingPageClient() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")
  const [loading, setLoading] = useState<string | null>(null)
  const [user, setUser] = useState<any>(null)
  const [authLoading, setAuthLoading] = useState(true)
  const router = useRouter()
  const supabase = createBrowserClient()

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
      setAuthLoading(false)
    }
    checkAuth()
  }, [])

  useEffect(() => {
    trackConversion("pricing_viewed")

    console.log("[v0] Stripe Price IDs:", {
      monthly: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID,
      yearly: process.env.NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID,
    })
  }, [])

  const plans = [
    {
      id: "free",
      name: "Free Plan",
      price: { monthly: 0, yearly: 0 },
      description: "Perfect for getting started with AI learning",
      features: [
        "Access to 4 basic games",
        "AI Quiz Challenge",
        "Memory Match game",
        "Basic progress tracking",
        "Parent dashboard access",
      ],
      limitations: ["No AI Friend Creator", "No Pattern Training", "Limited content library"],
      cta: "Current Plan",
      popular: false,
      disabled: true,
    },
    {
      id: "monthly",
      name: "Premium Monthly",
      price: { monthly: 9.99, yearly: 0 },
      description: "Full access to all AI learning activities",
      features: [
        "All 7 interactive games",
        "AI Friend Creator",
        "Pattern Training",
        "Full content library access",
        "Advanced progress analytics",
        "Priority support",
        "New activities every month",
        "Offline mode",
      ],
      cta: "Start Monthly",
      popular: false,
      priceId: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID,
    },
    {
      id: "yearly",
      name: "Premium Yearly",
      price: { monthly: 0, yearly: 99.99 },
      description: "Best value - Save 17% with annual billing",
      features: [
        "Everything in Monthly",
        "Save $20 per year",
        "Exclusive yearly badges",
        "Early access to new features",
        "Priority support",
        "Family sharing (up to 3 kids)",
      ],
      cta: "Start Yearly",
      popular: true,
      priceId: process.env.NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID,
    },
  ]

  const handleSubscribe = async (planId: string, priceId?: string) => {
    if (!priceId) {
      console.error("[v0] Missing price ID for plan:", planId)
      alert("Configuration error: Missing price ID. Please contact support.")
      return
    }

    if (!user) {
      alert("Please log in to subscribe to a plan.")
      router.push("/auth/login")
      return
    }

    trackConversion("upgrade_clicked", planId)

    setLoading(planId)
    try {
      console.log("[v0] Starting subscription:", { planId, priceId })

      trackEvent("subscription_started", {
        plan: planId,
        price_id: priceId,
      })

      const response = await fetch("/api/stripe/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId, planType: planId }),
      })

      console.log("[v0] Response status:", response.status)
      const data = await response.json()
      console.log("[v0] Response data:", data)

      if (data.url) {
        trackConversion("checkout_started", planId)
        window.location.href = data.url
      } else {
        const errorMessage = data.details || data.error || "Failed to create checkout session"
        throw new Error(errorMessage)
      }
    } catch (error) {
      console.error("[v0] Subscription error:", error)
      alert(`Failed to start subscription: ${error instanceof Error ? error.message : "Please try again."}`)
    } finally {
      setLoading(null)
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl text-gray-600">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex flex-col">
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Choose Your Learning Plan</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Unlock the full potential of AI learning for your child
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`relative p-8 ${
                  plan.popular ? "border-2 border-purple-500 shadow-2xl scale-105" : "border border-gray-200"
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600 text-white px-4 py-1">
                    Most Popular
                  </Badge>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{plan.description}</p>

                  <div className="mb-4">
                    {plan.id === "yearly" ? (
                      <>
                        <div className="text-4xl font-bold text-gray-900">${plan.price.yearly}</div>
                        <div className="text-sm text-gray-500">per year</div>
                        <div className="text-xs text-green-600 font-medium mt-1">Save $20 annually</div>
                      </>
                    ) : (
                      <>
                        <div className="text-4xl font-bold text-gray-900">${plan.price.monthly}</div>
                        <div className="text-sm text-gray-500">{plan.id === "free" ? "forever" : "per month"}</div>
                      </>
                    )}
                  </div>
                </div>

                <Button
                  onClick={() => handleSubscribe(plan.id, plan.priceId)}
                  disabled={plan.disabled || loading === plan.id}
                  className={`w-full mb-6 ${
                    plan.popular ? "bg-purple-600 hover:bg-purple-700" : "bg-gray-900 hover:bg-gray-800"
                  }`}
                >
                  {loading === plan.id ? "Processing..." : plan.cta}
                </Button>

                <div className="space-y-3">
                  <div className="font-semibold text-gray-900 text-sm mb-2">Includes:</div>
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">✓</span>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}

                  {plan.limitations && plan.limitations.length > 0 && (
                    <>
                      <div className="font-semibold text-gray-900 text-sm mt-4 mb-2">Limitations:</div>
                      {plan.limitations.map((limitation, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <span className="text-gray-400 mt-0.5">✗</span>
                          <span className="text-sm text-gray-500">{limitation}</span>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
            <div className="max-w-3xl mx-auto space-y-4 text-left">
              <Card className="p-6">
                <h4 className="font-semibold text-gray-900 mb-2">Can I cancel anytime?</h4>
                <p className="text-gray-600">
                  Yes! You can cancel your subscription at any time. You'll continue to have access until the end of
                  your billing period.
                </p>
              </Card>
              <Card className="p-6">
                <h4 className="font-semibold text-gray-900 mb-2">Is there a free trial?</h4>
                <p className="text-gray-600">
                  You can start with our free plan to explore basic features. Upgrade anytime to unlock premium content.
                </p>
              </Card>
              <Card className="p-6">
                <h4 className="font-semibold text-gray-900 mb-2">How many children can use one account?</h4>
                <p className="text-gray-600">
                  Monthly plans support 1 child. Yearly plans include family sharing for up to 3 children.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
