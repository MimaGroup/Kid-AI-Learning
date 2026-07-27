import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { stripe } from "@/lib/stripe"

export const dynamic = "force-dynamic"

// GDPR Art. 17 / ZVOP-2 — right to erasure. Permanently deletes the parent account,
// every linked child profile, and all associated progress/behavioral data.
export async function POST(req: NextRequest) {
  const supabase = await createServerClient()
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  let body: { confirm?: string }
  try {
    body = await req.json()
  } catch {
    body = {}
  }

  // Require an explicit typed confirmation so this can't be triggered by an accidental click.
  if (body.confirm !== "IZBRIŠI") {
    return NextResponse.json({ error: "Potrditev ni pravilna" }, { status: 400 })
  }

  const userId = user.id
  const admin = createAdminClient()

  // Best-effort cancel any active Stripe subscription before removing the account record.
  try {
    const { data: subscription } = await admin
      .from("subscriptions")
      .select("stripe_subscription_id")
      .eq("user_id", userId)
      .maybeSingle()
    if (subscription?.stripe_subscription_id) {
      await stripe.subscriptions.cancel(subscription.stripe_subscription_id)
    }
  } catch (err) {
    console.error("[account-delete] Stripe cancellation failed (continuing):", err)
  }

  // Children are profile records under the parent's own account, not separate auth
  // users — all learning activity (user_progress, achievements, ai_friends) is owned
  // by the parent's own id and tagged with child_profile_id, so deleting by userId
  // below covers every child profile automatically (their rows cascade via child_profile_id
  // ON DELETE SET NULL when the "children" row itself is removed a few steps down).
  const relatedUserIds = [userId]

  // Delete leaf tables first (tables that reference profiles/auth.users but may not cascade),
  // then children rows, then the profile, then the auth user itself.
  // Each step is best-effort: a table that doesn't exist or already empty shouldn't block the rest.
  const deletions: Array<() => PromiseLike<unknown>> = [
    () => admin.from("user_progress").delete().in("user_id", relatedUserIds),
    () => admin.from("achievements").delete().in("user_id", relatedUserIds),
    () => admin.from("ai_friends").delete().in("user_id", relatedUserIds),
    () => admin.from("notifications").delete().in("user_id", relatedUserIds),
    () => admin.from("email_sequence").delete().eq("user_id", userId),
    () => admin.from("email_log").delete().eq("user_id", userId),
    () => admin.from("byte_rate_limit").delete().eq("user_id", userId),
    () => admin.from("referral_rewards").delete().eq("user_id", userId),
    () => admin.from("referral_invitations").delete().eq("referrer_id", userId),
    () => admin.from("payment_history").delete().eq("user_id", userId),
    () => admin.from("subscriptions").delete().eq("user_id", userId),
    () => admin.from("children").delete().eq("parent_id", userId),
    () => admin.from("profiles").delete().eq("id", userId),
  ]

  for (const step of deletions) {
    try {
      await step()
    } catch (err) {
      console.error("[account-delete] Cleanup step failed (continuing):", err)
    }
  }

  const { error: deleteUserError } = await admin.auth.admin.deleteUser(userId)
  if (deleteUserError) {
    console.error("[account-delete] Failed to delete auth user:", deleteUserError)
    return NextResponse.json({ error: "Izbris računa ni v celoti uspel. Kontaktirajte podporo." }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
