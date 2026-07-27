import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export const dynamic = "force-dynamic"

// GDPR Art. 20 / ZVOP-2 — right to data portability.
// Returns every piece of personal data we hold about this parent account
// and their children, in a machine-readable (JSON) format.
//
// Note on data model: learning activity (user_progress, achievements, ai_friends) is
// currently recorded against the PARENT's own auth id, not a per-child id — child
// profiles under "children" are descriptive records (name/age/avatar), not separate
// data owners. So the activity data below belongs to the account as a whole, and the
// child profiles are included separately as their own metadata.
export async function GET() {
  const supabase = await createServerClient()
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const [profileRes, childrenRes, progressRes, achievementsRes, aiFriendsRes, subscriptionRes] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user.id).single(),
    supabase.from("children").select("*").eq("parent_id", user.id),
    supabase.from("user_progress").select("*").eq("user_id", user.id),
    supabase.from("achievements").select("*").eq("user_id", user.id),
    supabase.from("ai_friends").select("*").eq("user_id", user.id),
    supabase.from("subscriptions").select("*").eq("user_id", user.id).maybeSingle(),
  ])

  const exportData = {
    exported_at: new Date().toISOString(),
    account: {
      id: user.id,
      email: user.email,
      created_at: user.created_at,
    },
    profile: profileRes.data,
    subscription: subscriptionRes.data,
    children: childrenRes.data || [],
    learning_progress: progressRes.data || [],
    achievements: achievementsRes.data || [],
    ai_friends: aiFriendsRes.data || [],
  }

  return new NextResponse(JSON.stringify(exportData, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Content-Disposition": `attachment; filename="kids-learning-ai-podatki-${user.id}.json"`,
    },
  })
}
