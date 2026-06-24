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

interface Stats {
  badges: number
  streak: number
  level: number
  levelName: string
}

export function useStats() {
  const [stats, setStats] = useState<Stats>({ badges: 0, streak: 0, level: 1, levelName: "Beginner" })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      setIsLoading(true)
      const [achievementsRes, progressRes] = await Promise.all([
        fetch("/api/achievements"),
        fetch("/api/progress"),
      ])

      if (!achievementsRes.ok || !progressRes.ok) return

      const achievementsData = await achievementsRes.json()
      const progressData = await progressRes.json()

      const badges: number = achievementsData.achievements?.length ?? 0
      const progressList: { completed_at: string }[] = progressData.progress ?? []

      // Unique activity dates, newest first
      const dates = Array.from(
        new Set(progressList.map((p) => new Date(p.completed_at).toISOString().split("T")[0]))
      ).sort((a, b) => b.localeCompare(a))

      // Count consecutive days ending today or yesterday
      let streak = 0
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      let expected = new Date(today)

      for (const dateStr of dates) {
        const date = new Date(dateStr)
        if (date.getTime() === expected.getTime()) {
          streak++
          expected.setDate(expected.getDate() - 1)
        } else if (date < expected) {
          break
        }
      }

      // If no activity today, still allow streak from yesterday
      if (streak === 0 && dates.length > 0) {
        const yesterday = new Date(today)
        yesterday.setDate(yesterday.getDate() - 1)
        let check = new Date(yesterday)
        for (const dateStr of dates) {
          const date = new Date(dateStr)
          if (date.getTime() === check.getTime()) {
            streak++
            check.setDate(check.getDate() - 1)
          } else if (date < check) {
            break
          }
        }
      }

      // Level based on total activities completed
      const total = progressList.length
      let level = 1
      let levelName = "Beginner"
      if (total >= 50) { level = 5; levelName = "AI Master" }
      else if (total >= 20) { level = 4; levelName = "AI Explorer" }
      else if (total >= 10) { level = 3; levelName = "Learner" }
      else if (total >= 5) { level = 2; levelName = "Explorer" }

      setStats({ badges, streak, level, levelName })
    } catch {
      // leave defaults on error
    } finally {
      setIsLoading(false)
    }
  }

  return { stats, isLoading }
}
