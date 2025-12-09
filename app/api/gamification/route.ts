import { createServerClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

// Level thresholds (experience points needed for each level)
const LEVEL_THRESHOLDS = [0, 100, 250, 500, 1000, 1500, 2500, 4000, 6000, 9000, 13000, 18000, 25000, 35000, 50000]

function calculateLevel(experience: number): number {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (experience >= LEVEL_THRESHOLDS[i]) {
      return i + 1
    }
  }
  return 1
}

function getExperienceForNextLevel(level: number): number {
  return LEVEL_THRESHOLDS[level] || LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1]
}

export async function GET() {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle()

  // If profile doesn't exist, return default gamification data
  if (!profile) {
    return NextResponse.json({
      points: 0,
      level: 1,
      experience: 0,
      experienceProgress: 0,
      experienceNeeded: 100,
      experienceForNextLevel: 100,
      streakDays: 0,
      lastActivityDate: null,
      earnedBadges: [],
      allBadges: [],
      badgeCount: 0,
      totalBadges: 0,
    })
  }

  // Get earned badges
  const { data: userBadges } = await supabase
    .from("user_badges")
    .select("*, badges(*)")
    .eq("user_id", user.id)
    .order("earned_at", { ascending: false })

  // Get all available badges
  const { data: allBadges } = await supabase.from("badges").select("*").order("points_required", { ascending: true })

  // Calculate level progress
  const currentLevel = profile.level || 1
  const currentExp = profile.experience || 0
  const expForCurrentLevel = LEVEL_THRESHOLDS[currentLevel - 1] || 0
  const expForNextLevel = getExperienceForNextLevel(currentLevel)
  const expProgress = currentExp - expForCurrentLevel
  const expNeeded = expForNextLevel - expForCurrentLevel

  return NextResponse.json({
    points: profile.points || 0,
    level: currentLevel,
    experience: currentExp,
    experienceProgress: expProgress,
    experienceNeeded: expNeeded,
    experienceForNextLevel: expForNextLevel,
    streakDays: profile.streak_days || 0,
    lastActivityDate: profile.last_activity_date,
    earnedBadges: userBadges || [],
    allBadges: allBadges || [],
    badgeCount: userBadges?.length || 0,
    totalBadges: allBadges?.length || 0,
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

  const body = await request.json()
  const { action, points, activityType } = body

  if (action === "award_points") {
    const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle()

    const currentPoints = profile?.points || 0
    const currentExperience = profile?.experience || 0
    const currentLevel = profile?.level || 1
    const currentStreak = profile?.streak_days || 0
    const lastActivity = profile?.last_activity_date

    const newPoints = currentPoints + points
    const newExperience = currentExperience + points
    const newLevel = calculateLevel(newExperience)

    // Update streak
    const today = new Date().toISOString().split("T")[0]
    let newStreak = currentStreak

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

    const { error: updateError } = await supabase.from("profiles").upsert({
      id: user.id,
      points: newPoints,
      experience: newExperience,
      level: newLevel,
      streak_days: newStreak,
      last_activity_date: today,
    })

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 })
    }

    // Check for new badges
    const newBadges = await checkAndAwardBadges(supabase, user.id, {
      points: newPoints,
      level: newLevel,
      streak: newStreak,
      activityType,
    })

    return NextResponse.json({
      success: true,
      points: newPoints,
      experience: newExperience,
      level: newLevel,
      leveledUp: newLevel > currentLevel,
      streak: newStreak,
      newBadges,
    })
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 })
}

async function checkAndAwardBadges(
  supabase: any,
  userId: string,
  stats: { points: number; level: number; streak: number; activityType?: string },
) {
  const newBadges = []

  // Get user's activity count
  const { data: progressCount } = await supabase
    .from("user_progress")
    .select("id", { count: "exact" })
    .eq("user_id", userId)

  const activityCount = progressCount?.length || 0

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
    if (activityCount >= milestone.count && !earnedBadgeIds.has(milestone.badgeId)) {
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
    const { data: typeProgress } = await supabase
      .from("user_progress")
      .select("id", { count: "exact" })
      .eq("user_id", userId)
      .eq("activity_type", stats.activityType)

    const typeCount = typeProgress?.length || 0

    const subjectBadges: Record<string, string> = {
      "math-adventure": "math_wizard",
      "word-builder": "word_master",
      "memory-match": "memory_champion",
    }

    const badgeId = subjectBadges[stats.activityType]
    if (badgeId && typeCount >= 10 && !earnedBadgeIds.has(badgeId)) {
      const { data: badge } = await supabase
        .from("user_badges")
        .insert({ user_id: userId, badge_id: badgeId })
        .select("*, badges(*)")
        .single()

      if (badge) newBadges.push(badge)
    }
  }

  return newBadges
}
