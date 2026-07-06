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
    <Card className="shadow-lg hover:shadow-xl transition-shadow border-2">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-t-xl">
        <CardTitle className="text-xl font-bold">Weekly Activity Trend</CardTitle>
        <p className="text-sm text-muted-foreground">Track daily learning activities and performance</p>
      </CardHeader>
      <CardContent className="pt-6">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={weeklyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="date" stroke="#6b7280" style={{ fontSize: "14px", fontWeight: 500 }} />
            <YAxis stroke="#6b7280" style={{ fontSize: "14px", fontWeight: 500 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "2px solid #e5e7eb",
                borderRadius: "12px",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                padding: "12px",
              }}
              labelStyle={{ fontWeight: "bold", marginBottom: "8px" }}
            />
            <Legend wrapperStyle={{ paddingTop: "20px" }} iconType="line" iconSize={20} />
            <Line
              type="monotone"
              dataKey="activities"
              stroke="#8b5cf6"
              strokeWidth={3}
              dot={{ fill: "#8b5cf6", r: 5 }}
              activeDot={{ r: 7, fill: "#7c3aed" }}
              name="Activities"
            />
            <Line
              type="monotone"
              dataKey="avgScore"
              stroke="#10b981"
              strokeWidth={3}
              dot={{ fill: "#10b981", r: 5 }}
              activeDot={{ r: 7, fill: "#059669" }}
              name="Avg Score %"
            />
            <Line
              type="monotone"
              dataKey="timeSpent"
              stroke="#f59e0b"
              strokeWidth={3}
              dot={{ fill: "#f59e0b", r: 5 }}
              activeDot={{ r: 7, fill: "#d97706" }}
              name="Time (min)"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
