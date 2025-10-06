import { createServerClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json()
  const { activity_type, score, total_questions, time_spent, metadata } = body

  if (!activity_type) {
    return NextResponse.json({ error: "Missing activity_type" }, { status: 400 })
  }

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
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const achievements = await checkAchievements(supabase, user.id, activity_type, score, total_questions)

  return NextResponse.json({ progress, achievements })
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
      .eq("activity_type", activityType)
      .single()

    if (!existing) {
      const { data: achievement } = await supabase
        .from("achievements")
        .insert({
          user_id: userId,
          achievement_type: "perfect_score",
          activity_type: activityType,
          title: "Perfect Score!",
          description: `Got a perfect score in ${activityType}`,
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
        .eq("activity_type", activityType)
        .single()

      if (!existing) {
        const { data: achievement } = await supabase
          .from("achievements")
          .insert({
            user_id: userId,
            achievement_type: `completed_${milestone}`,
            activity_type: activityType,
            title: `${milestone} Completions!`,
            description: `Completed ${activityType} ${milestone} times`,
          })
          .select()
          .single()

        if (achievement) newAchievements.push(achievement)
      }
    }
  }

  return newAchievements
}
