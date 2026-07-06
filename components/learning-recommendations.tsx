"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lightbulb, TrendingUp, Target, Star } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

interface Recommendation {
  activityType: string
  activityName: string
  reason: string
  priority: "high" | "medium" | "low"
  icon: string
  href: string
}

interface LearningRecommendationsProps {
  childId: string
}

export function LearningRecommendations({ childId }: LearningRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch(`/api/recommendations?childId=${childId}`)
        const data = await response.json()
        setRecommendations(data.recommendations || [])
      } catch (error) {
        console.error("Error fetching recommendations:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchRecommendations()
  }, [childId])

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <Star className="w-4 h-4 text-yellow-500" />
      case "medium":
        return <TrendingUp className="w-4 h-4 text-blue-500" />
      default:
        return <Target className="w-4 h-4 text-gray-500" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-yellow-200 bg-yellow-50"
      case "medium":
        return "border-blue-200 bg-blue-50"
      default:
        return "border-gray-200 bg-gray-50"
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-muted-foreground">Loading recommendations...</CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-yellow-500" />
          <CardTitle>Personalized Recommendations</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recommendations.length === 0 ? (
            <p className="text-sm text-muted-foreground">No recommendations available yet. Complete more activities!</p>
          ) : (
            recommendations.map((rec, index) => (
              <div key={index} className={`border rounded-lg p-4 ${getPriorityColor(rec.priority)}`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {getPriorityIcon(rec.priority)}
                      <h4 className="font-semibold text-sm">{rec.activityName}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">{rec.reason}</p>
                  </div>
                  <Link href={rec.href}>
                    <Button size="sm" variant="outline">
                      Try Now
                    </Button>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
