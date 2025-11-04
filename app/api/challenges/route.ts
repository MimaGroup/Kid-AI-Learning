import { createServerClient, createServiceRoleClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

// Challenge templates that rotate daily
const CHALLENGE_TEMPLATES = [
  {
    id: "complete_3_games",
    title: "Game Master",
    description: "Complete 3 different games today",
    activity_type: "any",
    target_value: 3,
    points_reward: 50,
  },
  {
    id: "score_100_points",
    title: "Point Collector",
    description: "Earn 100 points today",
    activity_type: "points",
    target_value: 100,
    points_reward: 30,
  },
  {
    id: "perfect_score_challenge",
    title: "Perfectionist",
    description: "Get a perfect score on any game",
    activity_type: "perfect",
    target_value: 1,
    points_reward: 40,
  },
  {
    id: "math_master",
    title: "Math Master",
    description: "Complete 2 Math Adventure games",
    activity_type: "math-adventure",
    target_value: 2,
    points_reward: 35,
  },
  {
    id: "word_wizard",
    title: "Word Wizard",
    description: "Complete 2 Word Builder games",
    activity_type: "word-builder",
    target_value: 2,
    points_reward: 35,
  },
  {
    id: "memory_master",
    title: "Memory Master",
    description: "Complete 2 Memory Match games",
    activity_type: "memory-match",
    target_value: 2,
    points_reward: 35,
  },
  {
    id: "speed_demon",
    title: "Speed Demon",
    description: "Complete any game in under 3 minutes",
    activity_type: "speed",
    target_value: 180,
    points_reward: 45,
  },
]

function getDailyChallenges(date: string): typeof CHALLENGE_TEMPLATES {
  // Use date as seed to get consistent challenges for the day
  const seed = new Date(date).getDate()
  const shuffled = [...CHALLENGE_TEMPLATES].sort((a, b) => {
    const hashA = (a.id.charCodeAt(0) + seed) % CHALLENGE_TEMPLATES.length
    const hashB = (b.id.charCodeAt(0) + seed) % CHALLENGE_TEMPLATES.length
    return hashA - hashB
  })
  // Return 3 challenges per day
  return shuffled.slice(0, 3)
}

async function ensureDailyChallengesExist(date: string) {
  const supabaseAdmin = await createServiceRoleClient()
  const dailyChallenges = getDailyChallenges(date)

  // Instead of checking and inserting, we'll upsert which updates active_date if challenge exists
  const challengesToUpsert = dailyChallenges.map((c) => ({
    challenge_id: c.id,
    title: c.title,
    description: c.description,
    activity_type: c.activity_type,
    target_value: c.target_value,
    points_reward: c.points_reward,
    active_date: date,
  }))

  const { error } = await supabaseAdmin.from("daily_challenges").upsert(challengesToUpsert, {
    onConflict: "challenge_id",
    ignoreDuplicates: false, // Update the active_date if challenge already exists
  })

  if (error) {
    console.error("[v0] Error upserting daily challenges:", error)
  }

  return dailyChallenges
}

export async function GET() {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const today = new Date().toISOString().split("T")[0]

  const dailyChallenges = await ensureDailyChallengesExist(today)

  // Get user's progress for today
  const { data: todayProgress } = await supabase
    .from("user_progress")
    .select("*")
    .eq("user_id", user.id)
    .gte("completed_at", `${today}T00:00:00`)
    .lte("completed_at", `${today}T23:59:59`)

  // Get user's points earned today
  const { data: profile } = await supabase.from("profiles").select("points").eq("id", user.id).single()

  const startOfDay = new Date(today)
  startOfDay.setHours(0, 0, 0, 0)

  // Get completed challenges
  const { data: completedChallenges } = await supabase
    .from("user_daily_challenges")
    .select("*")
    .eq("user_id", user.id)
    .gte("completed_at", `${today}T00:00:00`)

  const completedChallengeIds = new Set(completedChallenges?.map((c) => c.challenge_id) || [])

  // Calculate progress for each challenge
  const challengesWithProgress = dailyChallenges.map((challenge) => {
    let currentProgress = 0
    const isCompleted = completedChallengeIds.has(challenge.id)

    if (!isCompleted) {
      if (challenge.activity_type === "any") {
        // Count unique activity types
        const uniqueActivities = new Set(todayProgress?.map((p) => p.activity_type) || [])
        currentProgress = uniqueActivities.size
      } else if (challenge.activity_type === "points") {
        // This would need to track points earned today specifically
        // For now, we'll use a simplified version
        currentProgress = profile?.points || 0
      } else if (challenge.activity_type === "perfect") {
        const perfectScores = todayProgress?.filter((p) => p.score === p.total_questions && p.total_questions > 0) || []
        currentProgress = perfectScores.length
      } else if (challenge.activity_type === "speed") {
        const fastGames = todayProgress?.filter((p) => p.time_spent > 0 && p.time_spent <= challenge.target_value) || []
        currentProgress = fastGames.length
      } else {
        // Specific activity type
        const activityProgress = todayProgress?.filter((p) => p.activity_type === challenge.activity_type) || []
        currentProgress = activityProgress.length
      }
    }

    return {
      ...challenge,
      current_progress: isCompleted ? challenge.target_value : currentProgress,
      is_completed: isCompleted,
      progress_percentage: isCompleted ? 100 : Math.min((currentProgress / challenge.target_value) * 100, 100),
    }
  })

  return NextResponse.json({
    challenges: challengesWithProgress,
    date: today,
  })
}

export async function POST(request: Request) {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { challenge_id, points_earned } = await request.json()

  if (!challenge_id) {
    return NextResponse.json({ error: "Missing challenge_id" }, { status: 400 })
  }

  // Check if already completed
  const today = new Date().toISOString().split("T")[0]
  const { data: existing } = await supabase
    .from("user_daily_challenges")
    .select("*")
    .eq("user_id", user.id)
    .eq("challenge_id", challenge_id)
    .gte("completed_at", `${today}T00:00:00`)
    .maybeSingle()

  if (existing) {
    return NextResponse.json({ error: "Challenge already completed" }, { status: 400 })
  }

  // Mark challenge as completed
  const { data: completion, error } = await supabase
    .from("user_daily_challenges")
    .insert({
      user_id: user.id,
      challenge_id,
      points_earned: points_earned || 0,
    })
    .select()
    .single()

  if (error) {
    console.error("[v0] Error completing challenge:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Award bonus points
  if (points_earned > 0) {
    const { data: profile } = await supabase.from("profiles").select("points, experience").eq("id", user.id).single()

    if (profile) {
      await supabase
        .from("profiles")
        .update({
          points: (profile.points || 0) + points_earned,
          experience: (profile.experience || 0) + points_earned,
        })
        .eq("id", user.id)
    }
  }

  return NextResponse.json({
    success: true,
    completion,
  })
}
