"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface GamificationData {
  points: number
  level: number
  experience: number
  experienceProgress: number
  experienceNeeded: number
  streakDays: number
  earnedBadges: any[]
  badgeCount: number
  totalBadges: number
}

const LEVEL_THRESHOLDS = [0, 100, 250, 500, 1000, 1500, 2500, 4000, 6000, 9000, 13000, 18000, 25000, 35000, 50000]

function calculateLevel(experience: number): number {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (experience >= LEVEL_THRESHOLDS[i]) {
      return i + 1
    }
  }
  return 1
}

function getExperienceForNextLevel(level: number): number {
  return LEVEL_THRESHOLDS[level] || LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1]
}

export function GamificationDisplay() {
  const [data, setData] = useState<GamificationData | null>(null)
  const [loading, setLoading] = useState(true)
  const [isGuest, setIsGuest] = useState(false)

  useEffect(() => {
    fetchGamificationData()
  }, [])

  const fetchGamificationData = async () => {
    try {
      const response = await fetch("/api/gamification")

      if (response.ok) {
        const result = await response.json()
        setData(result)
        setIsGuest(false)
      } else if (response.status === 401 || response.status === 404) {
        setIsGuest(true)
        loadGuestData()
      } else {
        console.error("[v0] Gamification API error:", response.status)
        setIsGuest(true)
        loadGuestData()
      }
    } catch (error) {
      console.error("[v0] Error fetching gamification data:", error)
      setIsGuest(true)
      loadGuestData()
    } finally {
      setLoading(false)
    }
  }

  const loadGuestData = () => {
    const guestData = localStorage.getItem("guestGamification")
    if (guestData) {
      const parsed = JSON.parse(guestData)
      const level = calculateLevel(parsed.experience || 0)
      const expForCurrentLevel = LEVEL_THRESHOLDS[level - 1] || 0
      const expForNextLevel = getExperienceForNextLevel(level)
      const expProgress = (parsed.experience || 0) - expForCurrentLevel
      const expNeeded = expForNextLevel - expForCurrentLevel

      setData({
        points: parsed.points || 0,
        level,
        experience: parsed.experience || 0,
        experienceProgress: expProgress,
        experienceNeeded: expNeeded,
        streakDays: parsed.streakDays || 0,
        earnedBadges: parsed.earnedBadges || [],
        badgeCount: parsed.earnedBadges?.length || 0,
        totalBadges: 16,
      })
    } else {
      const initialData = {
        points: 0,
        level: 1,
        experience: 0,
        experienceProgress: 0,
        experienceNeeded: 100,
        streakDays: 0,
        earnedBadges: [],
        badgeCount: 0,
        totalBadges: 16,
      }
      setData(initialData)
      localStorage.setItem(
        "guestGamification",
        JSON.stringify({
          points: 0,
          experience: 0,
          streakDays: 0,
          earnedBadges: [],
        }),
      )
    }
  }

  if (loading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </Card>
    )
  }

  if (!data) {
    return null
  }

  const levelProgress = (data.experienceProgress / data.experienceNeeded) * 100

  return (
    <div className="space-y-4">
      {isGuest && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm text-yellow-800">
          <span className="font-semibold">Guest Mode:</span> Your progress is saved locally. Log in to sync across
          devices!
        </div>
      )}

      {/* Level and Experience */}
      <Card className="p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-sm opacity-90">Level</div>
            <div className="text-4xl font-bold">{data.level}</div>
          </div>
          <div className="text-right">
            <div className="text-sm opacity-90">Total Points</div>
            <div className="text-2xl font-bold">{data.points.toLocaleString()}</div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress to Level {data.level + 1}</span>
            <span>
              {data.experienceProgress} / {data.experienceNeeded} XP
            </span>
          </div>
          <Progress value={levelProgress} className="h-3 bg-white/20" />
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4 text-center bg-gradient-to-br from-orange-400 to-orange-600 text-white">
          <div className="text-3xl mb-2">🔥</div>
          <div className="text-2xl font-bold">{data.streakDays}</div>
          <div className="text-sm opacity-90">Day Streak</div>
        </Card>
        <Card className="p-4 text-center bg-gradient-to-br from-blue-400 to-blue-600 text-white">
          <div className="text-3xl mb-2">🏆</div>
          <div className="text-2xl font-bold">{data.badgeCount}</div>
          <div className="text-sm opacity-90">Badges Earned</div>
        </Card>
        <Card className="p-4 text-center bg-gradient-to-br from-green-400 to-green-600 text-white">
          <div className="text-3xl mb-2">⚡</div>
          <div className="text-2xl font-bold">{data.experience}</div>
          <div className="text-sm opacity-90">Total XP</div>
        </Card>
      </div>

      {/* Recent Badges */}
      {data.earnedBadges.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4">Recent Badges</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {data.earnedBadges.slice(0, 8).map((userBadge: any, index: number) => (
              <div
                key={userBadge.id || index}
                className="text-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
              >
                <div className="text-3xl mb-2">{userBadge.badges?.icon || userBadge.icon}</div>
                <div className="text-sm font-semibold">{userBadge.badges?.name || userBadge.name}</div>
                <Badge variant="secondary" className="mt-1 text-xs">
                  {userBadge.badges?.rarity || userBadge.rarity}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}
