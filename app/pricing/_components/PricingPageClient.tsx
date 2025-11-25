"use client"

import { useState, useEffect } from "react"
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { createBrowserClient } from "@/lib/supabase/client"
import { Footer } from "@/components/footer"
import { trackEvent, trackConversion } from "@/lib/analytics"
import { generateStructuredData } from "@/lib/metadata"
import { TrustBadges } from "@/components/trust-badges"
import { PricingComparison } from "@/components/pricing-comparison"
import { Award, Shield, Users, TrendingUp, Check } from 'lucide-react'

export default function PricingPageClient() {
  const productSchemas = [
    generateStructuredData("Product", {
      name: "AI Kids Learning - Premium Monthly",
      description: "Full access to all AI learning activities with monthly billing",
      price: "9.99",
    }),
    generateStructuredData("Product", {
      name: "AI Kids Learning - Premium Yearly",
      description: "Best value - Save 17% with annual billing. Full access to all AI learning activities.",
      price: "99.99",
    }),
  ]

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
        try {
          // Try to navigate the top-level window (breaks out of iframe)
          if (window.top) {
            window.top.location.href = data.url
          } else {
            window.location.href = data.url
          }
        } catch (e) {
          // If blocked by cross-origin policy, open in new window
          console.log("[v0] Iframe redirect blocked, opening in new window")
          window.open(data.url, "_blank")
        }
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex flex-col relative overflow-hidden">
      {/* AI-themed floating decorative emojis */}
      <div className="absolute top-20 left-10 text-5xl opacity-20 animate-float" style={{ filter: 'drop-shadow(0 4px 8px rgba(147, 51, 234, 0.3))' }}>💎</div>
      <div className="absolute top-40 right-20 text-4xl opacity-20 animate-pulse delay-100" style={{ filter: 'drop-shadow(0 4px 8px rgba(236, 72, 153, 0.3))' }}>⭐</div>
      <div className="absolute bottom-40 left-1/4 text-4xl opacity-20 animate-bounce delay-200" style={{ filter: 'drop-shadow(0 4px 8px rgba(59, 130, 246, 0.3))' }}>🎯</div>
      
      <div className="flex-1 relative z-10">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-8 sm:mb-12 px-4">
            <Badge variant="secondary" className="mb-4 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-purple-200">
              Special Offer
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 bg-clip-text text-transparent mb-4 text-balance">
              Choose Your Learning Plan
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto text-balance">
              Unlock the full potential of AI learning for your child. Start free, upgrade anytime.
            </p>
          </div>

          <div className="mb-8 sm:mb-12">
            <TrustBadges variant="compact" className="mb-8" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto mb-12 sm:mb-16">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`relative p-8 bg-white/80 backdrop-blur-md ${
                  plan.popular ? "border-2 border-purple-400 shadow-2xl scale-105" : "border-2 border-purple-100"
                } rounded-3xl hover:shadow-2xl transition-all duration-300`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600 text-white px-4 py-1">
                    Most Popular
                  </Badge>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{plan.description}</p>

                  <div className="mb-4">
                    {plan.id === "yearly" ? (
                      <>
                        <div className="text-3xl sm:text-4xl font-bold text-gray-900">${plan.price.yearly}</div>
                        <div className="text-sm text-gray-500">per year</div>
                        <div className="text-xs text-green-600 font-medium mt-1">Save $20 annually</div>
                      </>
                    ) : (
                      <>
                        <div className="text-3xl sm:text-4xl font-bold text-gray-900">${plan.price.monthly}</div>
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

          <div className="mb-12 sm:mb-16">
            <h3 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8">Why Parents Choose Premium</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
              <Card className="p-6 text-center">
                <Users className="w-10 h-10 mx-auto mb-3 text-primary" />
                <div className="font-semibold mb-2">10,000+</div>
                <div className="text-sm text-muted-foreground">Happy Families</div>
              </Card>
              <Card className="p-6 text-center">
                <TrendingUp className="w-10 h-10 mx-auto mb-3 text-primary" />
                <div className="font-semibold mb-2">98%</div>
                <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
              </Card>
              <Card className="p-6 text-center">
                <Award className="w-10 h-10 mx-auto mb-3 text-primary" />
                <div className="font-semibold mb-2">50+</div>
                <div className="text-sm text-muted-foreground">Learning Activities</div>
              </Card>
              <Card className="p-6 text-center">
                <Shield className="w-10 h-10 mx-auto mb-3 text-primary" />
                <div className="font-semibold mb-2">100%</div>
                <div className="text-sm text-muted-foreground">Safe & Secure</div>
              </Card>
            </div>
          </div>

          <div className="mb-12 sm:mb-16">
            <h3 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8">Compare Plans in Detail</h3>
            <PricingComparison />
          </div>

          <div className="mb-12 sm:mb-16">
            <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20 max-w-3xl mx-auto">
              <div className="text-center">
                <Award className="w-16 h-16 mx-auto mb-4 text-primary" />
                <h3 className="text-2xl font-bold mb-3">30-Day Money-Back Guarantee</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Try AI Kids Learning risk-free. If you're not completely satisfied, we'll refund your subscription—no
                  questions asked.
                </p>
                <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    <span>Full refund within 30 days</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    <span>No questions asked</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    <span>Cancel anytime</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* FAQ Section */}
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

      <div className="relative h-24">
        <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path
            d="M0,64 C240,20 480,20 720,64 C960,108 1200,108 1440,64 L1440,120 L0,120 Z"
            fill="white"
            opacity="0.9"
          />
        </svg>
      </div>

      <Footer />
    </div>
  )
}
