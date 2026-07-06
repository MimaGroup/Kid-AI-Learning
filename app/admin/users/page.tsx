import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { UsersManagement } from "@/components/admin/users-management"

export default async function AdminUsersPage() {
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

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your AI Kids Learning platform</p>
        </div>

        <UsersManagement />
      </div>
    </div>
  )
}
