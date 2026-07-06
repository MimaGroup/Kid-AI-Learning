"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, UserCog, AlertCircle, Check, X } from "lucide-react"
import { createBrowserClient } from "@supabase/ssr"
import { cn } from "@/lib/utils" // Fixed import path from @/utils/cn to @/lib/utils

interface Permission {
  id: string
  name: string
  description: string | null
  resource: string
  action: string
}

interface UserPermissions {
  role: string
  permissions: Permission[]
}

export function UserPermissionsManager({ userId, userName }: { userId: string; userName: string }) {
  const [allPermissions, setAllPermissions] = useState<Permission[]>([])
  const [userPermissions, setUserPermissions] = useState<UserPermissions | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState<string | null>(null)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  useEffect(() => {
    fetchData()
  }, [userId])

  console.log("[v0] UserPermissionsManager initialized with userId:", userId, "userName:", userName)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)

      console.log("[v0] Fetching permissions directly from Supabase")

      const { data: allPerms, error: permsError } = await supabase
        .from("permissions")
        .select("*")
        .order("resource", { ascending: true })

      if (permsError) {
        console.error("[v0] Error fetching permissions:", permsError)
        throw new Error(permsError.message)
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", userId)
        .maybeSingle()

      if (profileError) {
        console.error("[v0] Error fetching profile:", profileError)
        throw new Error(profileError.message)
      }

      const userRole = profile?.role || "parent"
      console.log("[v0] User role:", userRole, "profile exists:", !!profile)

      const { data: rolePerms, error: rolePermsError } = await supabase
        .from("role_permissions")
        .select("permission_id, permissions(*)")
        .eq("role", userRole)

      if (rolePermsError) {
        console.error("[v0] Error fetching role permissions:", rolePermsError)
      }

      const { data: userPerms, error: userPermsError } = await supabase
        .from("user_permissions")
        .select("permission_id, granted, permissions(*)")
        .eq("user_id", userId)

      if (userPermsError && userPermsError.code !== "PGRST116") {
        console.error("[v0] Error fetching user permissions:", userPermsError)
      }

      console.log("[v0] Loaded permissions:", {
        allPerms: allPerms?.length,
        rolePerms: rolePerms?.length,
        userPerms: userPerms?.length,
        role: userRole,
      })

      const rolePermIds = new Set(rolePerms?.map((rp) => rp.permission_id) || [])
      const userPermOverrides = new Map(userPerms?.map((up) => [up.permission_id, up.granted]) || [])

      // Determine final permissions
      const finalPermissions =
        allPerms?.filter((perm) => {
          const hasOverride = userPermOverrides.has(perm.id)
          if (hasOverride) {
            return userPermOverrides.get(perm.id) // Use override value
          }
          return rolePermIds.has(perm.id) // Use role default
        }) || []

      setAllPermissions(allPerms || [])
      setUserPermissions({
        role: userRole,
        permissions: finalPermissions,
      })
    } catch (err) {
      console.error("[v0] Error in fetchData:", err)
      setError(err instanceof Error ? err.message : "Failed to load permissions")
    } finally {
      setLoading(false)
    }
  }

  const togglePermission = async (permissionName: string, currentlyHas: boolean) => {
    try {
      setSaving(permissionName)
      setError(null)

      console.log("[v0] Toggling permission:", permissionName, "currently has:", currentlyHas)

      const permission = allPermissions.find((p) => p.name === permissionName)
      if (!permission) {
        throw new Error("Permission not found")
      }

      const newGranted = !currentlyHas

      const { data: existing } = await supabase
        .from("user_permissions")
        .select("id")
        .eq("user_id", userId)
        .eq("permission_id", permission.id)
        .single()

      if (existing) {
        const { error } = await supabase
          .from("user_permissions")
          .update({
            granted: newGranted,
            updated_at: new Date().toISOString(),
          })
          .eq("user_id", userId)
          .eq("permission_id", permission.id)

        if (error) throw error
      } else {
        const { error } = await supabase.from("user_permissions").insert({
          user_id: userId,
          permission_id: permission.id,
          granted: newGranted,
        })

        if (error) throw error
      }

      console.log("[v0] Permission updated successfully")

      // Refresh permissions
      await fetchData()
    } catch (err) {
      console.error("[v0] Error updating permission:", err)
      setError(err instanceof Error ? err.message : "Failed to update permission")
    } finally {
      setSaving(null)
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="py-8">
          <div className="flex items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        </CardContent>
      </Card>
    )
  }

  const groupedPermissions = allPermissions.reduce(
    (acc, perm) => {
      if (!acc[perm.resource]) {
        acc[perm.resource] = []
      }
      acc[perm.resource].push(perm)
      return acc
    },
    {} as Record<string, Permission[]>,
  )

  const hasPermission = (permName: string) => userPermissions?.permissions.some((p) => p.name === permName) || false

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <UserCog className="h-5 w-5" />
                User Permissions: {userName}
              </CardTitle>
              <CardDescription>
                Role: <Badge variant="outline">{userPermissions?.role || "N/A"}</Badge>
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={fetchData}>
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {Object.entries(groupedPermissions).map(([resource, perms]) => (
            <div key={resource} className="space-y-3">
              <h3 className="text-lg font-semibold capitalize flex items-center gap-2">
                <Shield className="h-4 w-4" />
                {resource}
              </h3>
              <div className="grid gap-3">
                {perms.map((perm) => {
                  const hasIt = hasPermission(perm.name)
                  const isSaving = saving === perm.name

                  return (
                    <div
                      key={perm.id}
                      className={cn(
                        "flex items-center justify-between p-4 rounded-lg border-2 transition-all",
                        hasIt
                          ? "bg-gradient-to-br from-[#6cd4c3]/10 to-[#7c3aed]/5 border-[#6cd4c3]"
                          : "bg-muted/30 border-muted-foreground/20",
                        isSaving && "opacity-50 cursor-wait",
                      )}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <div
                            className={cn(
                              "flex h-7 w-7 items-center justify-center rounded-full",
                              hasIt
                                ? "bg-gradient-to-br from-[#6cd4c3] to-[#7c3aed] text-white"
                                : "bg-muted text-muted-foreground",
                            )}
                          >
                            {hasIt ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                          </div>
                          <div>
                            <span className="font-medium text-base">{perm.name}</span>
                            {hasIt && (
                              <Badge className="ml-2 bg-gradient-to-r from-[#6cd4c3] to-[#7c3aed] text-white border-0">
                                Enabled
                              </Badge>
                            )}
                          </div>
                        </div>
                        {perm.description && (
                          <p className="text-sm text-muted-foreground mt-2 ml-10">{perm.description}</p>
                        )}
                        <p className="text-xs text-muted-foreground mt-1 ml-10">
                          Action: <code className="bg-muted px-1.5 py-0.5 rounded text-xs">{perm.action}</code>
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-muted-foreground">{hasIt ? "ON" : "OFF"}</span>
                        <Switch
                          checked={hasIt}
                          onCheckedChange={() => togglePermission(perm.name, hasIt)}
                          disabled={isSaving}
                          className="data-[state=checked]:bg-[#7c3aed]"
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
