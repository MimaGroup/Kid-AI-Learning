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
    <Card>
      <CardHeader>
        <CardTitle>Skill Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={skillData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="skill" />
            <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
            <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="activities" fill="#8884d8" name="Activities Completed" />
            <Bar yAxisId="right" dataKey="avgScore" fill="#82ca9d" name="Average Score %" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
