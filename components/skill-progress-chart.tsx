"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

interface SkillProgressChartProps {
  data: any[]
}

export function SkillProgressChart({ data }: SkillProgressChartProps) {
  const skillData = [
    {
      skill: "Math",
      activities: data.filter((p) => p.activity_type === "math_adventure").length,
      avgScore: calculateAvgScore(data.filter((p) => p.activity_type === "math_adventure")),
    },
    {
      skill: "Reading",
      activities: data.filter((p) => p.activity_type === "word_builder").length,
      avgScore: calculateAvgScore(data.filter((p) => p.activity_type === "word_builder")),
    },
    {
      skill: "Logic",
      activities: data.filter((p) => p.activity_type === "ai_quiz").length,
      avgScore: calculateAvgScore(data.filter((p) => p.activity_type === "ai_quiz")),
    },
    {
      skill: "Memory",
      activities: data.filter((p) => p.activity_type === "memory_match").length,
      avgScore: calculateAvgScore(data.filter((p) => p.activity_type === "memory_match")),
    },
    {
      skill: "Problem Solving",
      activities: data.filter((p) => p.activity_type === "ai_detective").length,
      avgScore: calculateAvgScore(data.filter((p) => p.activity_type === "ai_detective")),
    },
  ]

  function calculateAvgScore(activities: any[]) {
    if (activities.length === 0) return 0
    const total = activities.reduce((sum, a) => sum + (a.score || 0), 0)
    return Math.round(total / activities.length)
  }

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow border-2">
      <CardHeader className="bg-gradient-to-r from-accent/10 to-primary/10 rounded-t-xl">
        <CardTitle className="text-xl font-bold">Skill Progress</CardTitle>
        <p className="text-sm text-muted-foreground">Performance across different learning areas</p>
      </CardHeader>
      <CardContent className="pt-6">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={skillData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="activitiesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.6} />
              </linearGradient>
              <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#10b981" stopOpacity={0.6} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="skill"
              stroke="#6b7280"
              style={{ fontSize: "13px", fontWeight: 500 }}
              angle={-15}
              textAnchor="end"
              height={80}
            />
            <YAxis yAxisId="left" orientation="left" stroke="#8b5cf6" style={{ fontSize: "14px", fontWeight: 500 }} />
            <YAxis yAxisId="right" orientation="right" stroke="#10b981" style={{ fontSize: "14px", fontWeight: 500 }} />
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
            <Legend wrapperStyle={{ paddingTop: "20px" }} iconType="rect" />
            <Bar
              yAxisId="left"
              dataKey="activities"
              fill="url(#activitiesGradient)"
              radius={[8, 8, 0, 0]}
              name="Activities Completed"
            />
            <Bar
              yAxisId="right"
              dataKey="avgScore"
              fill="url(#scoreGradient)"
              radius={[8, 8, 0, 0]}
              name="Average Score %"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
