"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "./use-auth"

export type SubscriptionStatus = "active" | "trialing" | "past_due" | "canceled" | "none"

interface Subscription {
  status: SubscriptionStatus
  currentPeriodEnd: string | null
  cancelAtPeriodEnd: boolean
  stripeCustomerId: string | null
}

interface UseSubscriptionResult {
  subscription: Subscription | null
  loading: boolean
  /** True when subscription is active or trialing with a valid period */
  hasAccess: boolean
  /** Days left in free trial (only meaningful when status === "none") */
  trialDaysLeft: number
}

export function useSubscription(): UseSubscriptionResult {
  const { user } = useAuth()
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      setLoading(false)
      return
    }

    const supabase = createClient()
    supabase
      .from("subscriptions")
      .select("status, current_period_end, cancel_at_period_end, stripe_customer_id")
      .eq("user_id", user.id)
      .maybeSingle()
      .then(({ data }: { data: { status: string; current_period_end: string | null; cancel_at_period_end: boolean | null; stripe_customer_id: string | null } | null }) => {
        if (data) {
          setSubscription({
            status: data.status as SubscriptionStatus,
            currentPeriodEnd: data.current_period_end,
            cancelAtPeriodEnd: data.cancel_at_period_end ?? false,
            stripeCustomerId: data.stripe_customer_id,
          })
        }
        setLoading(false)
      })
  }, [user])

  const hasAccess =
    subscription?.status === "active" || subscription?.status === "trialing"

  const trialDaysLeft = user?.created_at
    ? Math.max(0, 14 - Math.floor((Date.now() - new Date(user.created_at).getTime()) / 86400000))
    : 14

  return { subscription, loading, hasAccess, trialDaysLeft }
}
