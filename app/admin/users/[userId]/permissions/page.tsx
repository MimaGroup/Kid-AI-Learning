import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { UserPermissionsManager } from "@/components/admin/user-permissions-manager"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default async function UserPermissionsPage({ params }: { params: { userId: string } }) {
  const supabase = await createServerClient()

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

  // Get target user info
  const { data: targetUser } = await supabase
    .from("profiles")
    .select("email, display_name")
    .eq("id", params.userId)
    .single()

  if (!targetUser) {
    redirect("/admin/users")
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

        <UserPermissionsManager
          userId={params.userId}
          userName={targetUser.display_name || targetUser.email || "User"}
        />
      </div>
    </div>
  )
}
