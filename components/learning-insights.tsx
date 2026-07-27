"use client"

import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Award, Target } from "lucide-react"

const ACTIVITY_NAMES: Record<string, string> = {
  ai_quiz: "AI Kviz",
  ai_detective: "AI Detektiv",
  math_adventure: "Matematična pustolovščina",
  word_builder: "Graditelj besed",
  memory_match: "Spomin",
  pattern_training: "Usposabljanje vzorcev",
}

const TREND_LABELS: Record<string, string> = {
  up: "Naraščajoč",
  down: "Padajoč",
  neutral: "Stabilen",
}

function activityName(type: string) {
  return ACTIVITY_NAMES[type] ?? type.replace(/_/g, " ")
}

interface LearningInsightsProps {
  data: Array<{
    activity_type: string
    score: number
    completed_at: string
    time_spent: number
  }>
}

export function LearningInsights({ data }: LearningInsightsProps) {
  const insights = useMemo(() => {
    if (!data || data.length === 0) {
      return {
        trend: "neutral",
        strongestArea: null,
        improvementArea: null,
        totalTimeSpent: 0,
        recentStreak: 0,
      }
    }

    const sortedByDate = [...data].sort(
      (a, b) => new Date(b.completed_at).getTime() - new Date(a.completed_at).getTime(),
    )

    const recent5 = sortedByDate.slice(0, 5)
    const previous5 = sortedByDate.slice(5, 10)

    const recentAvg = recent5.length ? recent5.reduce((sum, item) => sum + item.score, 0) / recent5.length : 0
    const previousAvg = previous5.length ? previous5.reduce((sum, item) => sum + item.score, 0) / previous5.length : 0

    const trend = recentAvg > previousAvg + 5 ? "up" : recentAvg < previousAvg - 5 ? "down" : "neutral"

    const activityScores: Record<string, number[]> = {}
    data.forEach((item) => {
      if (!activityScores[item.activity_type]) {
        activityScores[item.activity_type] = []
      }
      activityScores[item.activity_type].push(item.score)
    })

    const activityAverages = Object.entries(activityScores).map(([type, scores]) => ({
      type,
      avg: scores.reduce((sum, score) => sum + score, 0) / scores.length,
    }))

    const strongestArea = activityAverages.sort((a, b) => b.avg - a.avg)[0]
    const improvementArea = activityAverages.sort((a, b) => a.avg - b.avg)[0]

    const totalTimeSpent = data.reduce((sum, item) => sum + (item.time_spent || 0), 0)

    let recentStreak = 0
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    for (let i = 0; i < 30; i++) {
      const checkDate = new Date(today)
      checkDate.setDate(checkDate.getDate() - i)
      const dateStr = checkDate.toISOString().split("T")[0]

      const hasActivity = data.some((item) => item.completed_at.startsWith(dateStr))

      if (hasActivity) {
        recentStreak++
      } else if (i > 0) {
        break
      }
    }

    return {
      trend,
      strongestArea,
      improvementArea,
      totalTimeSpent,
      recentStreak,
    }
  }, [data])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    if (hours > 0) return `${hours} h ${minutes} min`
    return `${minutes} min`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Vpogledi v učenje</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                {insights.trend === "up" ? (
                  <TrendingUp className="w-5 h-5 text-green-600" />
                ) : insights.trend === "down" ? (
                  <TrendingDown className="w-5 h-5 text-red-600" />
                ) : (
                  <Target className="w-5 h-5 text-blue-600" />
                )}
                <span className="text-sm font-medium text-gray-700">Trend uspešnosti</span>
              </div>
              <p className="text-lg font-bold text-gray-900">{TREND_LABELS[insights.trend] ?? insights.trend}</p>
            </div>

            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium text-gray-700">Učni niz</span>
              </div>
              <p className="text-lg font-bold text-gray-900">{insights.recentStreak} dni</p>
            </div>
          </div>

          {insights.strongestArea && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-green-900 mb-1">Najmočnejše področje</h4>
              <p className="text-sm text-green-800">
                {activityName(insights.strongestArea.type)} — povprečje {Math.round(insights.strongestArea.avg)} %
              </p>
            </div>
          )}

          {insights.improvementArea && insights.improvementArea.avg < 70 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-yellow-900 mb-1">Priložnost za napredek</h4>
              <p className="text-sm text-yellow-800">
                {activityName(insights.improvementArea.type)} — povprečje {Math.round(insights.improvementArea.avg)} %
              </p>
              <p className="text-xs text-yellow-700 mt-1">Razmislite o dodatni vadbi na tem področju</p>
            </div>
          )}

          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-gray-900 mb-1">Skupni čas učenja</h4>
            <p className="text-lg font-bold text-gray-900">{formatTime(insights.totalTimeSpent)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
