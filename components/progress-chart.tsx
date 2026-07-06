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
    <Card className="shadow-md border-2">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
        <CardTitle className="text-lg font-bold">Weekly Progress</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-end justify-between h-48 gap-2">
            {chartData.map((day, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2 group">
                <div className="relative w-full flex flex-col items-center justify-end h-full">
                  {day.count > 0 && (
                    <div className="absolute -top-7 text-sm font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                      {day.score}%
                    </div>
                  )}
                  <div
                    className="w-full bg-gradient-to-t from-primary via-primary/80 to-primary/60 rounded-t-xl transition-all duration-200 group-hover:from-primary group-hover:via-primary/90 group-hover:to-primary/70 shadow-md group-hover:shadow-lg"
                    style={{
                      height: `${(day.score / maxScore) * 100}%`,
                      minHeight: day.count > 0 ? "12px" : "0px",
                    }}
                  />
                </div>
                <div className="text-sm text-foreground font-semibold">{day.date}</div>
                {day.count > 0 && (
                  <div className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                    {day.count} {day.count === 1 ? "activity" : "activities"}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
