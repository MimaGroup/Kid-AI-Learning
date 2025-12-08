"use client"

import { useState, useEffect, useCallback } from "react"

interface ReferralInvitation {
  id: string
  invitee_email: string
  invitee_name: string | null
  status: "pending" | "accepted" | "expired"
  created_at: string
  accepted_at: string | null
}

interface ReferralReward {
  id: string
  reward_type: "free_month" | "extended_trial" | "discount" | "credits"
  reward_value: string
  source: "referral_sent" | "referral_received"
  status: "pending" | "claimed" | "expired" | "applied"
  created_at: string
  claimed_at: string | null
}

interface ReferralData {
  referralCode: string
  referralCount: number
  referredBy: string | null
  invitations: ReferralInvitation[]
  rewards: ReferralReward[]
}

export function useReferrals() {
  const [data, setData] = useState<ReferralData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchReferrals = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch("/api/referrals")
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to fetch referral data")
      }

      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }, [])

  const sendInvitation = async (email: string, name?: string) => {
    try {
      setError(null)

      const response = await fetch("/api/referrals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to send invitation")
      }

      await fetchReferrals()
      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred"
      setError(errorMessage)
      throw new Error(errorMessage)
    }
  }

  const getReferralLink = () => {
    if (!data?.referralCode) return ""
    const baseUrl = typeof window !== "undefined" ? window.location.origin : ""
    return `${baseUrl}/auth/register?ref=${data.referralCode}`
  }

  useEffect(() => {
    fetchReferrals()
  }, [fetchReferrals])

  return {
    referralCode: data?.referralCode || "",
    referralCount: data?.referralCount || 0,
    invitations: data?.invitations || [],
    rewards: data?.rewards || [],
    pendingRewards: data?.rewards?.filter((r) => r.status === "pending") || [],
    loading,
    error,
    sendInvitation,
    getReferralLink,
    refetch: fetchReferrals,
  }
}
