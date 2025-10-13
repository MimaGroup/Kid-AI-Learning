"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Sparkles } from "lucide-react"

interface Recommendation {
  activityType: string
  activityName: string
  reason: string
  difficulty: string
  priority: number
  icon: string
  href: string
}

export function RecommendedActivities() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/recommendations")
        const data = await response.json()

        if (response.ok) {
          setRecommendations(data.recommendations || [])
        }
      } catch (error) {
        console.error("Error fetching recommendations:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchRecommendations()
  }, [])

  if (loading) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-gray-500">Loading recommendations...</CardContent>
      </Card>
    )
  }

  if (recommendations.length === 0) {
    return null
  }

  const difficultyColors: Record<string, string> = {
    beginner: "bg-green-100 text-green-700",
    practice: "bg-yellow-100 text-yellow-700",
    review: "bg-blue-100 text-blue-700",
    advanced: "bg-purple-100 text-purple-700",
    explore: "bg-pink-100 text-pink-700",
  }

  return (
    <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-600" />
          <CardTitle className="text-xl text-purple-900">Recommended For You</CardTitle>
        </div>
        <p className="text-sm text-gray-600">Personalized activities based on your learning journey</p>
      </CardHeader>
      <CardContent className="space-y-3">
        {recommendations.map((rec, index) => (
          <div
            key={rec.activityType + index}
            className="bg-white rounded-lg p-4 border border-purple-100 hover:border-purple-300 transition-all"
          >
            <div className="flex items-start gap-3">
              <div className="text-3xl">{rec.icon}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-gray-900">{rec.activityName}</h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${difficultyColors[rec.difficulty]}`}>
                    {rec.difficulty}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{rec.reason}</p>
                <Link href={rec.href}>
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                    Start Activity
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
