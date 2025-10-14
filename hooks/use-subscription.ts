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

export function useSubscription() {
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [loading, setLoading] = useState(true)
  const [hasPremium, setHasPremium] = useState(false)

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

      const { data, error } = await supabase.from("subscriptions").select("*").eq("user_id", user.id).single()

      if (error) {
        console.error("Error fetching subscription:", error)
        setLoading(false)
        return
      }

      setSubscription(data)
      setHasPremium(data?.status === "active" && (data?.plan_type === "monthly" || data?.plan_type === "yearly"))
      setLoading(false)
    }

    fetchSubscription()
  }, [])

  return { subscription, loading, hasPremium }
}
