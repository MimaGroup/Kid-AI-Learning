import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { FriendsPageClient } from "./friends-client"
import { getUserProfile, getUserFriends } from "./actions"

export default async function FriendsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  try {
    const [profile, friends] = await Promise.all([getUserProfile(), getUserFriends()])

    const secretKey = profile?.secret_key || "GENERATING..."
    const userName = profile?.display_name || profile?.email || user.email || "User"

    return <FriendsPageClient secretKey={secretKey} userName={userName} friends={friends} />
  } catch (error) {
    console.error("[v0] FriendsPage: Error occurred", error)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-red-500/10 border-2 border-red-500 rounded-lg p-6 max-w-md">
          <h2 className="text-white text-xl font-bold mb-2">Error Loading Friends</h2>
          <p className="text-white/80">{error instanceof Error ? error.message : "Unknown error occurred"}</p>
        </div>
      </div>
    )
  }
}
