import { createServerClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

const LEVEL_THRESHOLDS = [0, 100, 250, 500, 1000, 1500, 2500, 4000, 6000, 9000, 13000, 18000, 25000, 35000, 50000]

function calculateLevel(experience: number): number {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (experience >= LEVEL_THRESHOLDS[i]) {
      return i + 1
    }
  }
  return 1
}

export async function POST(request: Request) {
  console.log("[v0] Progress API: Received POST request")
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    console.log("[v0] Progress API: Unauthorized - no user")
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  console.log("[v0] Progress API: User authenticated:", user.id)

  const body = await request.json()
  console.log("[v0] Progress API: Request body:", body)

  const { activity_type, score, total_questions, time_spent, metadata } = body

  if (!activity_type) {
    console.log("[v0] Progress API: Missing activity_type")
    return NextResponse.json({ error: "Missing activity_type" }, { status: 400 })
  }

  // Save progress
  const { data: progress, error } = await supabase
    .from("user_progress")
    .insert({
      user_id: user.id,
      activity_type,
      score: score || 0,
      total_questions: total_questions || 0,
      time_spent: time_spent || 0,
      metadata: metadata || {},
    })
    .select()
    .single()

  if (error) {
    console.error("[v0] Progress API: Error inserting progress:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  console.log("[v0] Progress API: Progress saved successfully:", progress)

  const pointsEarned = calculatePoints(score, total_questions, time_spent)
  const gamificationData = await awardPoints(supabase, user.id, pointsEarned, activity_type)

  await checkDailyChallenges(supabase, user.id, activity_type, score, total_questions, time_spent)

  const achievements = await checkAchievements(supabase, user.id, activity_type, score, total_questions)
  console.log("[v0] Progress API: Achievements earned:", achievements)

  return NextResponse.json({
    progress,
    achievements,
    gamification: gamificationData,
    pointsEarned,
  })
}

export async function GET() {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { data: progress, error } = await supabase
    .from("user_progress")
    .select("*")
    .eq("user_id", user.id)
    .order("completed_at", { ascending: false })
    .limit(50)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ progress })
}

async function checkAchievements(
  supabase: any,
  userId: string,
  activityType: string,
  score: number,
  totalQuestions: number,
) {
  const newAchievements = []

  const { data: progressHistory } = await supabase
    .from("user_progress")
    .select("*")
    .eq("user_id", userId)
    .eq("activity_type", activityType)

  const completionCount = progressHistory?.length || 0

  if (score === totalQuestions && totalQuestions > 0) {
    const { data: existing } = await supabase
      .from("achievements")
      .select("*")
      .eq("user_id", userId)
      .eq("achievement_type", "perfect_score")
      .eq("metadata->>activity_type", activityType)
      .maybeSingle()

    if (!existing) {
      const { data: achievement } = await supabase
        .from("achievements")
        .insert({
          user_id: userId,
          achievement_type: "perfect_score",
          achievement_name: "Perfect Score!",
          metadata: {
            activity_type: activityType,
            description: `Got a perfect score in ${activityType}`,
          },
        })
        .select()
        .single()

      if (achievement) newAchievements.push(achievement)
    }
  }

  const milestones = [5, 10, 25, 50]
  for (const milestone of milestones) {
    if (completionCount === milestone) {
      const { data: existing } = await supabase
        .from("achievements")
        .select("*")
        .eq("user_id", userId)
        .eq("achievement_type", `completed_${milestone}`)
        .eq("metadata->>activity_type", activityType)
        .maybeSingle()

      if (!existing) {
        const { data: achievement } = await supabase
          .from("achievements")
          .insert({
            user_id: userId,
            achievement_type: `completed_${milestone}`,
            achievement_name: `${milestone} Completions!`,
            metadata: {
              activity_type: activityType,
              description: `Completed ${activityType} ${milestone} times`,
            },
          })
          .select()
          .single()

        if (achievement) newAchievements.push(achievement)
      }
    }
  }

  return newAchievements
}

function calculatePoints(score: number, totalQuestions: number, timeSpent: number): number {
  let points = 10 // Base points for completing activity

  // Bonus for accuracy
  if (totalQuestions > 0) {
    const accuracy = score / totalQuestions
    points += Math.floor(accuracy * 20) // Up to 20 bonus points for perfect score
  }

  // Bonus for speed (if completed in under 5 minutes)
  if (timeSpent > 0 && timeSpent < 300) {
    points += 5
  }

  return points
}

async function awardPoints(supabase: any, userId: string, points: number, activityType: string) {
  try {
    // Get current profile
    const { data: profile } = await supabase.from("profiles").select("*").eq("id", userId).single()

    if (!profile) {
      console.error("[v0] Profile not found for user:", userId)
      return null
    }

    const newPoints = (profile.points || 0) + points
    const newExperience = (profile.experience || 0) + points
    const newLevel = calculateLevel(newExperience)

    // Update streak
    const today = new Date().toISOString().split("T")[0]
    const lastActivity = profile.last_activity_date
    let newStreak = profile.streak_days || 0

    if (lastActivity) {
      const lastDate = new Date(lastActivity)
      const todayDate = new Date(today)
      const diffDays = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24))

      if (diffDays === 1) {
        newStreak += 1
      } else if (diffDays > 1) {
        newStreak = 1
      }
    } else {
      newStreak = 1
    }

    // Update profile
    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        points: newPoints,
        experience: newExperience,
        level: newLevel,
        streak_days: newStreak,
        last_activity_date: today,
      })
      .eq("id", userId)

    if (updateError) {
      console.error("[v0] Error updating profile:", updateError)
      return null
    }

    // Check for new badges
    const newBadges = await checkAndAwardBadges(supabase, userId, {
      points: newPoints,
      level: newLevel,
      streak: newStreak,
      activityType,
    })

    console.log("[v0] Gamification updated: points +", points, "new level:", newLevel, "badges:", newBadges.length)

    return {
      success: true,
      points: newPoints,
      experience: newExperience,
      level: newLevel,
      leveledUp: newLevel > (profile.level || 1),
      streak: newStreak,
      newBadges,
    }
  } catch (error) {
    console.error("[v0] Error awarding points:", error)
    return null
  }
}

async function checkAndAwardBadges(
  supabase: any,
  userId: string,
  stats: { points: number; level: number; streak: number; activityType?: string },
) {
  const newBadges = []

  try {
    // Get user's activity count
    const { count: activityCount } = await supabase
      .from("user_progress")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId)

    // Get already earned badges
    const { data: earnedBadges } = await supabase.from("user_badges").select("badge_id").eq("user_id", userId)

    const earnedBadgeIds = new Set(earnedBadges?.map((b: any) => b.badge_id) || [])

    // Check milestone badges
    const milestones = [
      { count: 1, badgeId: "first_steps" },
      { count: 5, badgeId: "quick_learner" },
      { count: 25, badgeId: "dedicated_student" },
      { count: 100, badgeId: "master_learner" },
    ]

    for (const milestone of milestones) {
      if ((activityCount || 0) >= milestone.count && !earnedBadgeIds.has(milestone.badgeId)) {
        const { data: badge } = await supabase
          .from("user_badges")
          .insert({ user_id: userId, badge_id: milestone.badgeId })
          .select("*, badges(*)")
          .single()

        if (badge) newBadges.push(badge)
      }
    }

    // Check streak badges
    const streakBadges = [
      { days: 3, badgeId: "streak_3" },
      { days: 7, badgeId: "streak_7" },
      { days: 30, badgeId: "streak_30" },
    ]

    for (const streakBadge of streakBadges) {
      if (stats.streak >= streakBadge.days && !earnedBadgeIds.has(streakBadge.badgeId)) {
        const { data: badge } = await supabase
          .from("user_badges")
          .insert({ user_id: userId, badge_id: streakBadge.badgeId })
          .select("*, badges(*)")
          .single()

        if (badge) newBadges.push(badge)
      }
    }

    // Check level badges
    if (stats.level >= 10 && !earnedBadgeIds.has("legendary_learner")) {
      const { data: badge } = await supabase
        .from("user_badges")
        .insert({ user_id: userId, badge_id: "legendary_learner" })
        .select("*, badges(*)")
        .single()

      if (badge) newBadges.push(badge)
    }

    // Check subject-specific badges
    if (stats.activityType) {
      const { count: typeCount } = await supabase
        .from("user_progress")
        .select("*", { count: "exact", head: true })
        .eq("user_id", userId)
        .eq("activity_type", stats.activityType)

      const subjectBadges: Record<string, string> = {
        "math-adventure": "math_wizard",
        "word-builder": "word_master",
        "memory-match": "memory_champion",
      }

      const badgeId = subjectBadges[stats.activityType]
      if (badgeId && (typeCount || 0) >= 10 && !earnedBadgeIds.has(badgeId)) {
        const { data: badge } = await supabase
          .from("user_badges")
          .insert({ user_id: userId, badge_id: badgeId })
          .select("*, badges(*)")
          .single()

        if (badge) newBadges.push(badge)
      }
    }
  } catch (error) {
    console.error("[v0] Error checking badges:", error)
  }

  return newBadges
}

async function checkDailyChallenges(
  supabase: any,
  userId: string,
  activityType: string,
  score: number,
  totalQuestions: number,
  timeSpent: number,
) {
  try {
    const today = new Date().toISOString().split("T")[0]

    // Get today's progress
    const { data: todayProgress } = await supabase
      .from("user_progress")
      .select("*")
      .eq("user_id", userId)
      .gte("completed_at", `${today}T00:00:00`)

    // Get profile for points
    const { data: profile } = await supabase.from("profiles").select("points").eq("id", userId).single()

    // Get completed challenges
    const { data: completedChallenges } = await supabase
      .from("user_daily_challenges")
      .select("challenge_id")
      .eq("user_id", userId)
      .gte("completed_at", `${today}T00:00:00`)

    const completedIds = new Set(completedChallenges?.map((c: { challenge_id: string }) => c.challenge_id) || [])

    // Check "complete 3 games" challenge
    if (!completedIds.has("complete_3_games")) {
      const uniqueActivities = new Set(todayProgress?.map((p: { activity_type: string }) => p.activity_type) || [])
      if (uniqueActivities.size >= 3) {
        await completeChallenge(supabase, userId, "complete_3_games", 50)
      }
    }

    // Check "perfect score" challenge
    if (!completedIds.has("perfect_score_challenge") && score === totalQuestions && totalQuestions > 0) {
      await completeChallenge(supabase, userId, "perfect_score_challenge", 40)
    }

    // Check specific activity challenges
    const activityChallenges: Record<string, { id: string; target: number; points: number }> = {
      "math-adventure": { id: "math_master", target: 2, points: 35 },
      "word-builder": { id: "word_wizard", target: 2, points: 35 },
      "memory-match": { id: "memory_master", target: 2, points: 35 },
    }

    const activityChallenge = activityChallenges[activityType]
    if (activityChallenge && !completedIds.has(activityChallenge.id)) {
      const activityCount =
        todayProgress?.filter((p: { activity_type: string }) => p.activity_type === activityType).length || 0
      if (activityCount >= activityChallenge.target) {
        await completeChallenge(supabase, userId, activityChallenge.id, activityChallenge.points)
      }
    }

    // Check "speed demon" challenge
    if (!completedIds.has("speed_demon") && timeSpent > 0 && timeSpent <= 180) {
      await completeChallenge(supabase, userId, "speed_demon", 45)
    }
  } catch (error) {
    console.error("[v0] Error checking daily challenges:", error)
  }
}

async function completeChallenge(supabase: any, userId: string, challengeId: string, points: number) {
  try {
    const { data: existing } = await supabase
      .from("user_daily_challenges")
      .select("id")
      .eq("user_id", userId)
      .eq("challenge_id", challengeId)
      .gte("completed_at", `${new Date().toISOString().split("T")[0]}T00:00:00`)
      .maybeSingle()

    // If already completed today, skip
    if (existing) {
      console.log(`[v0] Challenge ${challengeId} already completed today, skipping`)
      return
    }

    // Mark challenge as completed
    const { error: insertError } = await supabase.from("user_daily_challenges").insert({
      user_id: userId,
      challenge_id: challengeId,
      points_earned: points,
    })

    // If duplicate key error, just skip (race condition)
    if (insertError?.code === "23505") {
      console.log(`[v0] Challenge ${challengeId} already completed (race condition), skipping`)
      return
    }

    if (insertError) {
      console.error("[v0] Error inserting challenge completion:", insertError)
      return
    }

    // Award bonus points
    const { data: profile } = await supabase.from("profiles").select("points, experience").eq("id", userId).single()

    if (profile) {
      await supabase
        .from("profiles")
        .update({
          points: (profile.points || 0) + points,
          experience: (profile.experience || 0) + points,
        })
        .eq("id", userId)
    }

    console.log(`[v0] Challenge ${challengeId} completed! Awarded ${points} bonus points`)
  } catch (error) {
    console.error("[v0] Error completing challenge:", error)
  }
}
