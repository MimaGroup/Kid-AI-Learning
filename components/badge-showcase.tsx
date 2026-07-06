"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface BadgeData {
  badge_id: string
  name: string
  description: string
  icon: string
  points_required: number
  category: string
  rarity: string
}

interface UserBadge {
  badge_id: string
  earned_at: string
  badges: BadgeData
}

export function BadgeShowcase() {
  const [earnedBadges, setEarnedBadges] = useState<UserBadge[]>([])
  const [allBadges, setAllBadges] = useState<BadgeData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBadges()
  }, [])

  const fetchBadges = async () => {
    try {
      const response = await fetch("/api/gamification")
      if (response.ok) {
        const data = await response.json()
        setEarnedBadges(data.earnedBadges || [])
        setAllBadges(data.allBadges || [])
      }
    } catch (error) {
      console.error("Error fetching badges:", error)
    } finally {
      setLoading(false)
    }
  }

  const earnedBadgeIds = new Set(earnedBadges.map((ub) => ub.badge_id))

  const categories = ["all", "milestone", "achievement", "streak", "subject", "special"]

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-gray-100 text-gray-800"
      case "rare":
        return "bg-blue-100 text-blue-800"
      case "epic":
        return "bg-purple-100 text-purple-800"
      case "legendary":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="grid grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Badge Collection</h2>
        <p className="text-gray-600">
          {earnedBadges.length} / {allBadges.length} badges earned
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4 flex flex-wrap h-auto gap-2">
          {categories.map((category) => (
            <TabsTrigger
              key={category}
              value={category}
              className="capitalize text-xs sm:text-sm px-3 sm:px-4 py-2 flex-shrink-0"
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category} value={category}>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {allBadges
                .filter((badge) => category === "all" || badge.category === category)
                .map((badge) => {
                  const isEarned = earnedBadgeIds.has(badge.badge_id)
                  return (
                    <div
                      key={badge.badge_id}
                      className={`p-4 rounded-lg border-2 text-center transition ${
                        isEarned
                          ? "bg-white border-green-500 shadow-lg"
                          : "bg-gray-50 border-gray-200 opacity-50 grayscale"
                      }`}
                    >
                      <div className="text-4xl mb-2">{badge.icon}</div>
                      <div className="text-sm font-semibold mb-1">{badge.name}</div>
                      <div className="text-xs text-gray-600 mb-2">{badge.description}</div>
                      <Badge className={`text-xs ${getRarityColor(badge.rarity)}`}>{badge.rarity}</Badge>
                      {!isEarned && (
                        <div className="text-xs text-gray-500 mt-2">{badge.points_required} pts required</div>
                      )}
                    </div>
                  )
                })}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </Card>
  )
}
