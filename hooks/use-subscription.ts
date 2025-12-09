"use client"

import { useEffect, useState } from "react"
import { createBrowserClient } from "@/lib/supabase/client"

interface Subscription {
  id: string
  plan_type: "free" | "monthly" | "yearly"
  status: "active" | "canceled" | "past_due" | "trialing"
  current_period_end: string | null
  cancel_at_period_end: boolean
}

interface ReferralReward {
  id: string
  reward_type: "free_month" | "extended_trial" | "discount" | "credits"
  reward_value: string
  status: "pending" | "claimed" | "expired" | "applied"
  expires_at: string
}

export function useSubscription() {
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [loading, setLoading] = useState(true)
  const [hasPremium, setHasPremium] = useState(false)
  const [hasExtendedTrial, setHasExtendedTrial] = useState(false)
  const [trialDaysRemaining, setTrialDaysRemaining] = useState<number | null>(null)

  useEffect(() => {
    const fetchSubscription = async () => {
      const supabase = createBrowserClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        setLoading(false)
        return
      }

      // Fetch subscription
      const { data: subData, error: subError } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", user.id)
        .single()

      if (subError && subError.code !== "PGRST116") {
        console.error("Error fetching subscription:", subError)
      }

      setSubscription(subData)

      const { data: rewardData } = await supabase
        .from("referral_rewards")
        .select("*")
        .eq("user_id", user.id)
        .eq("reward_type", "extended_trial")
        .in("status", ["pending", "claimed"])
        .single()

      const { data: profileData } = await supabase
        .from("profiles")
        .select("created_at, referred_by")
        .eq("id", user.id)
        .single()

      let isInTrial = false
      let daysRemaining: number | null = null

      if (profileData?.created_at) {
        const createdAt = new Date(profileData.created_at)
        const now = new Date()
        const daysSinceCreation = Math.floor((now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24))

        // Check if user has referral extended trial (14 days) or standard trial (7 days)
        const trialDays = rewardData || profileData.referred_by ? 14 : 7

        if (daysSinceCreation < trialDays) {
          isInTrial = true
          daysRemaining = trialDays - daysSinceCreation
          setHasExtendedTrial(trialDays === 14)
          setTrialDaysRemaining(daysRemaining)
        }
      }

      const hasPaidSubscription =
        subData?.status === "active" && (subData?.plan_type === "monthly" || subData?.plan_type === "yearly")

      setHasPremium(hasPaidSubscription || isInTrial)
      setLoading(false)
    }

    fetchSubscription()
  }, [])

  return { subscription, loading, hasPremium, hasExtendedTrial, trialDaysRemaining }
}
