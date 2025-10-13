"use client"

import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ProgressChartProps {
  data: Array<{
    activity_type: string
    score: number
    completed_at: string
  }>
}

export function ProgressChart({ data }: ProgressChartProps) {
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return []

    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - (6 - i))
      return date.toISOString().split("T")[0]
    })

    return last7Days.map((date) => {
      const dayActivities = data.filter((item) => item.completed_at.startsWith(date))
      const avgScore = dayActivities.length
        ? Math.round(dayActivities.reduce((sum, item) => sum + item.score, 0) / dayActivities.length)
        : 0

      return {
        date: new Date(date).toLocaleDateString("en-US", { weekday: "short" }),
        score: avgScore,
        count: dayActivities.length,
      }
    })
  }, [data])

  const maxScore = Math.max(...chartData.map((d) => d.score), 100)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Weekly Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-end justify-between h-48 gap-2">
            {chartData.map((day, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div className="relative w-full flex flex-col items-center justify-end h-full">
                  {day.count > 0 && <div className="absolute -top-6 text-xs font-bold text-blue-600">{day.score}%</div>}
                  <div
                    className="w-full bg-gradient-to-t from-blue-500 to-blue-300 rounded-t-lg transition-all hover:from-blue-600 hover:to-blue-400"
                    style={{
                      height: `${(day.score / maxScore) * 100}%`,
                      minHeight: day.count > 0 ? "8px" : "0px",
                    }}
                  />
                </div>
                <div className="text-xs text-gray-600 font-medium">{day.date}</div>
                {day.count > 0 && <div className="text-xs text-gray-500">{day.count} activities</div>}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
