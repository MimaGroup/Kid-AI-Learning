"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Child } from "@/types/child"
import { TrendingUp, Trophy, Brain, Search } from "lucide-react"

interface ChildProgressCardProps {
  child: Child
}

interface ProgressStats {
  totalActivities: number
  totalAchievements: number
  quizzesTaken: number
  mysteriesSolved: number
  averageScore: number
}

interface ProgressData {
  stats: ProgressStats
  progress: any[]
  achievements: any[]
}

export function ChildProgressCard({ child }: ChildProgressCardProps) {
  const [data, setData] = useState<ProgressData | null>(null)
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/children/${child.id}/progress`)
        const result = await response.json()

        if (response.ok) {
          setData(result)
        }
      } catch (error) {
        console.error("Error fetching progress:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProgress()
  }, [child.id])

  if (loading) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-gray-500">Nalaganje napredka...</CardContent>
      </Card>
    )
  }

  if (!data) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-gray-500">Ni podatkov o napredku</CardContent>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-bold"
              style={{ backgroundColor: child.avatar_color }}
            >
              {child.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <CardTitle className="text-lg">{child.name}</CardTitle>
              <p className="text-sm text-muted-foreground capitalize">{child.learning_level}</p>
            </div>
          </div>
          <button onClick={() => setExpanded(!expanded)} className="text-sm text-blue-600 hover:underline">
            {expanded ? "Prikaži manj" : "Prikaži več"}
          </button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-purple-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Brain className="w-4 h-4 text-purple-600" />
              <span className="text-xs text-purple-600 font-medium">Kvizi</span>
            </div>
            <p className="text-2xl font-bold text-purple-900">{data.stats.quizzesTaken}</p>
          </div>
          <div className="bg-indigo-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Search className="w-4 h-4 text-indigo-600" />
              <span className="text-xs text-indigo-600 font-medium">Uganke</span>
            </div>
            <p className="text-2xl font-bold text-indigo-900">{data.stats.mysteriesSolved}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-xs text-green-600 font-medium">Povp. rezultat</span>
            </div>
            <p className="text-2xl font-bold text-green-900">{data.stats.averageScore}%</p>
          </div>
          <div className="bg-yellow-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Trophy className="w-4 h-4 text-yellow-600" />
              <span className="text-xs text-yellow-600 font-medium">Dosežki</span>
            </div>
            <p className="text-2xl font-bold text-yellow-900">{data.stats.totalAchievements}</p>
          </div>
        </div>

        {expanded && (
          <>
            {data.achievements.length > 0 && (
              <div>
                <h4 className="font-semibold text-sm mb-2">Nedavni dosežki</h4>
                <div className="space-y-2">
                  {data.achievements.slice(0, 3).map((achievement) => (
                    <div
                      key={achievement.id}
                      className="bg-yellow-50 border border-yellow-200 rounded-lg p-2 flex items-center gap-2"
                    >
                      <span className="text-lg">🏆</span>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-yellow-900">{achievement.achievement_name}</p>
                        <p className="text-xs text-yellow-700">
                          {new Date(achievement.earned_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {data.progress.length > 0 && (
              <div>
                <h4 className="font-semibold text-sm mb-2">Nedavna dejavnost</h4>
                <div className="space-y-2">
                  {data.progress.slice(0, 5).map((activity) => (
                    <div key={activity.id} className="bg-gray-50 rounded-lg p-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="capitalize">
                          {activity.activity_type.replace("_", " ")}
                        </Badge>
                        <span className="text-sm text-gray-600">Rezultat: {activity.score}</span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {new Date(activity.completed_at).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}
