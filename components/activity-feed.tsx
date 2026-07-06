"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Trophy, BookOpen, Star, Clock } from "lucide-react"

interface Activity {
  id: string
  type: string
  title: string
  description: string
  timestamp: string
  icon: string
}

export function ActivityFeed({ childId }: { childId?: string }) {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchActivities()
  }, [childId])

  const fetchActivities = async () => {
    try {
      // Fetch recent activities from user_progress and achievements
      const response = await fetch(`/api/activity-feed${childId ? `?childId=${childId}` : ""}`)
      if (response.ok) {
        const data = await response.json()
        setActivities(data.activities || [])
      }
    } catch (error) {
      console.error("[v0] Error fetching activities:", error)
    } finally {
      setLoading(false)
    }
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "achievement":
        return <Trophy className="w-5 h-5 text-yellow-500" />
      case "activity":
        return <BookOpen className="w-5 h-5 text-blue-500" />
      case "milestone":
        return <Star className="w-5 h-5 text-purple-500" />
      default:
        return <Clock className="w-5 h-5 text-gray-500" />
    }
  }

  if (loading) {
    return (
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse flex gap-3">
              <div className="w-10 h-10 bg-muted rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-3 bg-muted rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
      {activities.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">No recent activity</p>
      ) : (
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex gap-3 items-start">
              <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                {getIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">{activity.title}</p>
                <p className="text-xs text-muted-foreground">{activity.description}</p>
                <p className="text-xs text-muted-foreground mt-1">{new Date(activity.timestamp).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}
