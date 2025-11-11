"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, UserCog, AlertCircle, Check, X } from "lucide-react"

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

  useEffect(() => {
    fetchData()
  }, [userId])

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)

      const [permsRes, userPermsRes] = await Promise.all([
        fetch("/api/permissions"),
        fetch(`/api/permissions/user/${userId}`),
      ])

      if (!permsRes.ok || !userPermsRes.ok) {
        throw new Error("Failed to fetch permissions")
      }

      const permsData = await permsRes.json()
      const userPermsData = await userPermsRes.json()

      setAllPermissions(permsData.permissions || [])
      setUserPermissions(userPermsData.permissions || null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load permissions")
    } finally {
      setLoading(false)
    }
  }

  const togglePermission = async (permissionName: string, currentlyHas: boolean) => {
    try {
      setSaving(permissionName)
      setError(null)

      const res = await fetch(`/api/permissions/user/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          permissionName,
          granted: !currentlyHas,
        }),
      })

      if (!res.ok) {
        throw new Error("Failed to update permission")
      }

      // Refresh permissions
      await fetchData()
    } catch (err) {
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
                      className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{perm.name}</span>
                          {hasIt ? (
                            <Check className="h-4 w-4 text-green-600" />
                          ) : (
                            <X className="h-4 w-4 text-muted-foreground" />
                          )}
                        </div>
                        {perm.description && <p className="text-sm text-muted-foreground mt-1">{perm.description}</p>}
                        <p className="text-xs text-muted-foreground mt-1">
                          Action: <code className="bg-muted px-1 py-0.5 rounded">{perm.action}</code>
                        </p>
                      </div>
                      <Switch
                        checked={hasIt}
                        onCheckedChange={() => togglePermission(perm.name, hasIt)}
                        disabled={isSaving}
                      />
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
