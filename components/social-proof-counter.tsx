"use client"

import { useEffect, useState } from "react"
import { Users, TrendingUp } from "lucide-react"

export function SocialProofCounter() {
  const [userCount, setUserCount] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchUserCount() {
      try {
        const res = await fetch("/api/stats/user-count")
        const data = await res.json()
        setUserCount(data.count || 0)
      } catch (error) {
        console.error("[v0] Failed to fetch user count:", error)
        setUserCount(0)
      } finally {
        setLoading(false)
      }
    }

    fetchUserCount()
  }, [])

  if (loading) {
    return (
      <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/90 backdrop-blur-sm rounded-full border border-purple-200 shadow-lg animate-pulse">
        <div className="h-5 w-5 bg-purple-200 rounded-full" />
        <div className="h-4 w-32 bg-purple-200 rounded" />
      </div>
    )
  }

  return (
    <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/90 backdrop-blur-sm rounded-full border border-purple-200 shadow-lg hover:shadow-xl transition-all hover:scale-105">
      <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-purple-500 to-teal-400 rounded-full">
        <Users className="w-5 h-5 text-white" />
      </div>
      <div className="flex flex-col">
        <div className="text-sm font-bold text-gray-900">
          {userCount !== null ? (
            <>
              <span className="text-2xl font-heading bg-gradient-to-r from-purple-600 to-teal-500 bg-clip-text text-transparent">
                {userCount}+
              </span>
              <span className="ml-2 text-gray-600">družin</span>
            </>
          ) : (
            "Nalaganje..."
          )}
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <TrendingUp className="w-3 h-3 text-green-500" />
          <span>že uporablja KidsLearnAI</span>
        </div>
      </div>
    </div>
  )
}
