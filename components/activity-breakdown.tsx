"use client"

import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ActivityBreakdownProps {
  data: Array<{
    activity_type: string
    score: number
  }>
}

const ACTIVITY_LABELS: Record<string, { name: string; color: string; emoji: string }> = {
  ai_quiz: { name: "AI Quiz", color: "bg-purple-500", emoji: "🎯" },
  ai_detective: { name: "AI Detective", color: "bg-blue-500", emoji: "🕵️" },
  math_adventure: { name: "Math Adventure", color: "bg-green-500", emoji: "🧮" },
  word_builder: { name: "Word Builder", color: "bg-yellow-500", emoji: "📚" },
  memory_match: { name: "Memory Match", color: "bg-pink-500", emoji: "🎴" },
}

export function ActivityBreakdown({ data }: ActivityBreakdownProps) {
  const breakdown = useMemo(() => {
    if (!data || data.length === 0) return []

    const activityCounts: Record<string, { count: number; totalScore: number }> = {}

    data.forEach((item) => {
      if (!activityCounts[item.activity_type]) {
        activityCounts[item.activity_type] = { count: 0, totalScore: 0 }
      }
      activityCounts[item.activity_type].count++
      activityCounts[item.activity_type].totalScore += item.score
    })

    return Object.entries(activityCounts)
      .map(([type, stats]) => ({
        type,
        count: stats.count,
        avgScore: Math.round(stats.totalScore / stats.count),
        ...ACTIVITY_LABELS[type],
      }))
      .sort((a, b) => b.count - a.count)
  }, [data])

  const totalActivities = breakdown.reduce((sum, item) => sum + item.count, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Activity Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {breakdown.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-4">No activities yet</p>
          ) : (
            breakdown.map((activity) => {
              const percentage = Math.round((activity.count / totalActivities) * 100)
              return (
                <div key={activity.type} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{activity.emoji}</span>
                      <span className="font-medium">{activity.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-gray-600">{activity.count} times</span>
                      <span className="text-gray-600">Avg: {activity.avgScore}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`${activity.color} h-2 rounded-full transition-all`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              )
            })
          )}
        </div>
      </CardContent>
    </Card>
  )
}
