"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, Trophy, Zap } from "lucide-react"

interface Challenge {
  id: string
  title: string
  description: string
  activity_type: string
  target_value: number
  points_reward: number
  current_progress: number
  is_completed: boolean
  progress_percentage: number
}

export function DailyChallenges() {
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchChallenges()
  }, [])

  const fetchChallenges = async () => {
    try {
      const response = await fetch("/api/challenges")
      if (response.ok) {
        const data = await response.json()
        setChallenges(data.challenges || [])
      }
    } catch (error) {
      console.error("[v0] Error fetching challenges:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            <div className="h-20 bg-gray-200 rounded"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
        </div>
      </Card>
    )
  }

  if (challenges.length === 0) {
    return null
  }

  const completedCount = challenges.filter((c) => c.is_completed).length
  const totalPoints = challenges.reduce((sum, c) => sum + (c.is_completed ? c.points_reward : 0), 0)

  return (
    <Card className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Trophy className="w-6 h-6 text-yellow-600" />
          <h3 className="text-xl font-bold text-gray-900">Daily Challenges</h3>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="font-semibold text-yellow-700">
            {completedCount}/{challenges.length} Complete
          </span>
          {totalPoints > 0 && (
            <span className="px-2 py-1 bg-yellow-200 text-yellow-800 rounded-full font-bold text-xs">
              +{totalPoints} pts
            </span>
          )}
        </div>
      </div>

      <div className="space-y-3">
        {challenges.map((challenge) => (
          <div
            key={challenge.id}
            className={`p-4 rounded-lg border-2 transition-all ${
              challenge.is_completed
                ? "bg-green-50 border-green-300"
                : "bg-white border-gray-200 hover:border-yellow-300"
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-bold text-gray-900">{challenge.title}</h4>
                  {challenge.is_completed && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                </div>
                <p className="text-sm text-gray-600">{challenge.description}</p>
              </div>
              <div className="flex items-center gap-1 text-yellow-600 font-bold ml-4">
                <Zap className="w-4 h-4" />
                <span className="text-sm">+{challenge.points_reward}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Progress value={challenge.progress_percentage} className="flex-1 h-2" />
              <span className="text-xs font-semibold text-gray-600 min-w-[60px] text-right">
                {challenge.current_progress}/{challenge.target_value}
              </span>
            </div>
          </div>
        ))}
      </div>

      {completedCount === challenges.length && (
        <div className="mt-4 p-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-lg text-center">
          <div className="text-2xl mb-1">🎉</div>
          <div className="font-bold">All Challenges Complete!</div>
          <div className="text-sm opacity-90">Come back tomorrow for new challenges!</div>
        </div>
      )}
    </Card>
  )
}
