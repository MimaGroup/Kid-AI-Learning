import { createServerClient } from "@/lib/supabase/server"

export async function checkAdminAuth() {
  const supabase = await createServerClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return { isAdmin: false, user: null, error: "Unauthorized" }
  }

  // Check if user has admin role
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()

  if (profileError || !profile || profile.role !== "admin") {
    return { isAdmin: false, user, error: "Admin access required" }
  }

  return { isAdmin: true, user, error: null }
}
