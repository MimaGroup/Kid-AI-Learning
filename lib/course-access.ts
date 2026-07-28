import type { SupabaseClient } from "@supabase/supabase-js"

/**
 * A user has access to a course if it's free, they bought it individually,
 * or they have an active paid subscription / are still within their free
 * trial window. Mirrors the trial computation in hooks/use-subscription.ts.
 */
export async function hasCourseAccess(
  supabase: SupabaseClient,
  userId: string,
  course: { id: string; price?: number; is_free?: boolean },
): Promise<boolean> {
  if (course.is_free || course.price === 0) return true

  const [purchaseResult, subResult, rewardResult, profileResult] = await Promise.all([
    supabase
      .from("course_purchases")
      .select("id")
      .eq("user_id", userId)
      .eq("course_id", course.id)
      .eq("status", "completed")
      .maybeSingle(),
    supabase.from("subscriptions").select("status, plan_type").eq("user_id", userId).maybeSingle(),
    supabase
      .from("referral_rewards")
      .select("id")
      .eq("user_id", userId)
      .eq("reward_type", "extended_trial")
      .in("status", ["pending", "claimed"])
      .maybeSingle(),
    supabase.from("profiles").select("created_at, referred_by").eq("id", userId).maybeSingle(),
  ])

  if (purchaseResult.data) return true

  const hasPaidSubscription =
    ["active", "trialing"].includes(subResult.data?.status ?? "") &&
    (subResult.data?.plan_type === "monthly" || subResult.data?.plan_type === "yearly")

  if (hasPaidSubscription) return true

  if (profileResult.data?.created_at) {
    const daysSinceCreation = Math.floor(
      (Date.now() - new Date(profileResult.data.created_at).getTime()) / (1000 * 60 * 60 * 24),
    )
    const trialDays = rewardResult.data || profileResult.data.referred_by ? 14 : 7
    if (daysSinceCreation < trialDays) return true
  }

  return false
}
