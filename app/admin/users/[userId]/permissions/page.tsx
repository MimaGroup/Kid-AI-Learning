import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { UserPermissionsManager } from "@/components/admin/user-permissions-manager"
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
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

  if (profile?.role !== "admin") {
    redirect("/parent/dashboard")
  }

  const { data: targetUser } = await supabase
    .from("profiles")
    .select("email, display_name, username")
    .eq("id", userId)
    .single()

  if (!targetUser) {
    redirect("/admin/users")
  }

  const displayName = targetUser.username || targetUser.display_name || targetUser.email || "User"

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

        <UserPermissionsManager userId={userId} userName={displayName} />
      </div>
    </div>
  )
}
