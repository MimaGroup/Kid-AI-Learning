"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

interface WeeklyActivityChartProps {
  data: any[]
}

export function WeeklyActivityChart({ data }: WeeklyActivityChartProps) {
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (6 - i))
    return date.toISOString().split("T")[0]
  })

  const weeklyData = last7Days.map((date) => {
    const dayActivities = data.filter((p) => p.completed_at?.startsWith(date))
    return {
      date: new Date(date).toLocaleDateString("en-US", { weekday: "short" }),
      activities: dayActivities.length,
      avgScore: dayActivities.length
        ? Math.round(dayActivities.reduce((sum, a) => sum + (a.score || 0), 0) / dayActivities.length)
        : 0,
      timeSpent: Math.round(dayActivities.reduce((sum, a) => sum + (a.time_spent || 0), 0) / 60), // Convert to minutes
    }
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Activity Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="activities" stroke="#8884d8" name="Activities" strokeWidth={2} />
            <Line type="monotone" dataKey="avgScore" stroke="#82ca9d" name="Avg Score %" strokeWidth={2} />
            <Line type="monotone" dataKey="timeSpent" stroke="#ffc658" name="Time (min)" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
