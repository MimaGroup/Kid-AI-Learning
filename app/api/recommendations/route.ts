import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

interface ActivityRecommendation {
  activityType: string
  activityName: string
  reason: string
  difficulty: string
  priority: number
  icon: string
  href: string
}

export async function GET() {
  try {
    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get user's progress data
    const { data: progress, error: progressError } = await supabase
      .from("user_progress")
      .select("*")
      .eq("user_id", user.id)
      .order("completed_at", { ascending: false })
      .limit(50)

    if (progressError) {
      console.error("Error fetching progress:", progressError)
      return NextResponse.json({ error: progressError.message }, { status: 500 })
    }

    // Calculate recommendations based on user's performance
    const recommendations = calculateRecommendations(progress || [])

    return NextResponse.json({ recommendations })
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

function calculateRecommendations(progress: any[]): ActivityRecommendation[] {
  const recommendations: ActivityRecommendation[] = []

  // Activity types and their metadata
  const activities = {
    ai_quiz: {
      name: "AI Quiz Challenge",
      icon: "🎯",
      href: "/kids/games/ai-quiz",
      category: "knowledge",
    },
    ai_detective: {
      name: "AI Detective Game",
      icon: "🕵️",
      href: "/kids/games/ai-detective",
      category: "exploration",
    },
    math_adventure: {
      name: "Math Adventure",
      icon: "🧮",
      href: "/kids/games/math-adventure",
      category: "math",
    },
    word_builder: {
      name: "Word Builder",
      icon: "📚",
      href: "/kids/games/word-builder",
      category: "language",
    },
    memory_match: {
      name: "Memory Match",
      icon: "🎴",
      href: "/kids/games/memory-match",
      category: "memory",
    },
  }

  // Calculate activity statistics
  const activityStats: Record<
    string,
    { count: number; totalScore: number; avgScore: number; lastPlayed: Date | null }
  > = {}

  Object.keys(activities).forEach((type) => {
    const activityProgress = progress.filter((p) => p.activity_type === type)
    const totalScore = activityProgress.reduce((sum, p) => sum + (p.score || 0), 0)
    const avgScore = activityProgress.length > 0 ? totalScore / activityProgress.length : 0
    const lastPlayed = activityProgress.length > 0 ? new Date(activityProgress[0].completed_at) : null

    activityStats[type] = {
      count: activityProgress.length,
      totalScore,
      avgScore,
      lastPlayed,
    }
  })

  // Recommendation 1: Activities not yet tried
  const untriedActivities = Object.entries(activities).filter(([type]) => activityStats[type].count === 0)

  if (untriedActivities.length > 0) {
    const [type, activity] = untriedActivities[0]
    recommendations.push({
      activityType: type,
      activityName: activity.name,
      reason: "New adventure awaits! Try this activity for the first time.",
      difficulty: "beginner",
      priority: 10,
      icon: activity.icon,
      href: activity.href,
    })
  }

  // Recommendation 2: Activities with low scores (need improvement)
  const lowScoreActivities = Object.entries(activityStats)
    .filter(([_, stats]) => stats.count > 0 && stats.avgScore < 60)
    .sort((a, b) => a[1].avgScore - b[1].avgScore)

  if (lowScoreActivities.length > 0) {
    const [type, stats] = lowScoreActivities[0]
    const activity = activities[type as keyof typeof activities]
    recommendations.push({
      activityType: type,
      activityName: activity.name,
      reason: `Practice makes perfect! Your average score is ${Math.round(stats.avgScore)}%. Let's improve!`,
      difficulty: "practice",
      priority: 8,
      icon: activity.icon,
      href: activity.href,
    })
  }

  // Recommendation 3: Activities not played recently
  const now = new Date()
  const staleDays = 3
  const staleActivities = Object.entries(activityStats)
    .filter(([_, stats]) => {
      if (!stats.lastPlayed) return false
      const daysSince = (now.getTime() - stats.lastPlayed.getTime()) / (1000 * 60 * 60 * 24)
      return daysSince > staleDays && stats.count > 0
    })
    .sort((a, b) => {
      const daysA = a[1].lastPlayed ? (now.getTime() - a[1].lastPlayed.getTime()) / (1000 * 60 * 60 * 24) : 0
      const daysB = b[1].lastPlayed ? (now.getTime() - b[1].lastPlayed.getTime()) / (1000 * 60 * 60 * 24) : 0
      return daysB - daysA
    })

  if (staleActivities.length > 0) {
    const [type, stats] = staleActivities[0]
    const activity = activities[type as keyof typeof activities]
    const daysSince = stats.lastPlayed
      ? Math.floor((now.getTime() - stats.lastPlayed.getTime()) / (1000 * 60 * 60 * 24))
      : 0
    recommendations.push({
      activityType: type,
      activityName: activity.name,
      reason: `It's been ${daysSince} days! Time to refresh your skills.`,
      difficulty: "review",
      priority: 6,
      icon: activity.icon,
      href: activity.href,
    })
  }

  // Recommendation 4: Activities with high scores (build on strengths)
  const highScoreActivities = Object.entries(activityStats)
    .filter(([_, stats]) => stats.count > 0 && stats.avgScore >= 80)
    .sort((a, b) => b[1].avgScore - a[1].avgScore)

  if (highScoreActivities.length > 0) {
    const [type, stats] = highScoreActivities[0]
    const activity = activities[type as keyof typeof activities]
    recommendations.push({
      activityType: type,
      activityName: activity.name,
      reason: `You're doing great! Average score: ${Math.round(stats.avgScore)}%. Keep up the momentum!`,
      difficulty: "advanced",
      priority: 7,
      icon: activity.icon,
      href: activity.href,
    })
  }

  // Recommendation 5: Balanced learning - suggest different category
  if (progress.length > 5) {
    const recentCategories = progress
      .slice(0, 5)
      .map((p) => activities[p.activity_type as keyof typeof activities]?.category)
      .filter(Boolean)

    const categoryCounts: Record<string, number> = {}
    recentCategories.forEach((cat) => {
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1
    })

    const underrepresentedActivities = Object.entries(activities).filter(([type, activity]) => {
      return (categoryCounts[activity.category] || 0) === 0
    })

    if (underrepresentedActivities.length > 0) {
      const [type, activity] = underrepresentedActivities[0]
      recommendations.push({
        activityType: type,
        activityName: activity.name,
        reason: "Try something different! Balanced learning helps you grow.",
        difficulty: "explore",
        priority: 5,
        icon: activity.icon,
        href: activity.href,
      })
    }
  }

  // If no specific recommendations, suggest a popular activity
  if (recommendations.length === 0) {
    recommendations.push({
      activityType: "ai_quiz",
      activityName: "AI Quiz Challenge",
      reason: "Start your learning journey with this fun quiz!",
      difficulty: "beginner",
      priority: 5,
      icon: "🎯",
      href: "/kids/games/ai-quiz",
    })
  }

  // Sort by priority and return top 3
  return recommendations.sort((a, b) => b.priority - a.priority).slice(0, 3)
}
