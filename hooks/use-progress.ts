"use client"

import { useState, useEffect } from "react"

interface Achievement {
  id: string
  achievement_type: string
  activity_type: string
  title: string
  description: string
  earned_at: string
}

export function useProgress() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submitProgress = async (
    activityType: string,
    score: number,
    totalQuestions: number,
    timeSpent = 0,
    metadata: any = {},
  ): Promise<Achievement[]> => {
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          activity_type: activityType,
          score,
          total_questions: totalQuestions,
          time_spent: timeSpent,
          metadata,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit progress")
      }

      return data.achievements || []
    } catch (err: any) {
      setError(err.message)
      return []
    } finally {
      setIsSubmitting(false)
    }
  }

  return { submitProgress, isSubmitting, error }
}

export function useAchievements() {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadAchievements()
  }, [])

  const loadAchievements = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/achievements")
      const data = await response.json()

      if (response.ok) {
        setAchievements(data.achievements || [])
      } else {
        setError(data.error || "Failed to load achievements")
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return { achievements, isLoading, error, reload: loadAchievements }
}
