import { createServerClient, createServiceRoleClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { UserPermissionsManager } from "@/components/admin/user-permissions-manager"
import { SubscriptionManager } from "@/components/admin/subscription-manager"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default async function UserPermissionsPage({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params

  const supabase = await createServerClient()

  console.log("[v0] UserPermissionsPage - userId from params:", userId)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Check admin access
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle()

  if (profile?.role !== "admin") {
    redirect("/parent/dashboard")
  }

  const { data: targetUser } = await supabase
    .from("profiles")
    .select("email, display_name")
    .eq("id", userId)
    .maybeSingle()

  let displayName = targetUser?.display_name || targetUser?.email || "User"
  let userEmail = targetUser?.email || ""

  if (!targetUser) {
    // Use service role client to access auth admin API
    const serviceClient = await createServiceRoleClient()
    const { data: authUser } = await serviceClient.auth.admin.getUserById(userId)
    if (!authUser?.user) {
      redirect("/admin/users")
    }
    displayName = authUser.user.email || "User"
    userEmail = authUser.user.email || ""
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/users">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Users
            </Button>
          </Link>
        </div>

        <SubscriptionManager userId={userId} userEmail={userEmail} />

        <UserPermissionsManager userId={userId} userName={displayName} />
      </div>
    </div>
  )
}
