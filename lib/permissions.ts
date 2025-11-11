// Permission checking utilities
import { createServerClient } from "@/lib/supabase/server"

export interface Permission {
  id: string
  name: string
  description: string | null
  resource: string
  action: string
}

export interface UserPermissions {
  role: string
  permissions: Permission[]
  hasPermission: (permissionName: string) => boolean
}

export async function getUserPermissions(userId: string): Promise<UserPermissions | null> {
  const supabase = await createServerClient()

  // Get user role
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", userId).single()

  if (!profile) return null

  // Get role-based permissions
  const { data: rolePermissions } = await supabase
    .from("role_permissions")
    .select(`
      permissions (
        id,
        name,
        description,
        resource,
        action
      )
    `)
    .eq("role", profile.role)

  // Get user-specific permission overrides
  const { data: userPermissions } = await supabase
    .from("user_permissions")
    .select(`
      granted,
      permissions (
        id,
        name,
        description,
        resource,
        action
      )
    `)
    .eq("user_id", userId)

  // Combine permissions (user overrides take precedence)
  const permissionMap = new Map<string, Permission>()

  // Add role permissions
  if (rolePermissions) {
    for (const rp of rolePermissions) {
      if (rp.permissions) {
        const perm = rp.permissions as unknown as Permission
        permissionMap.set(perm.name, perm)
      }
    }
  }

  // Apply user-specific overrides
  if (userPermissions) {
    for (const up of userPermissions) {
      if (up.permissions) {
        const perm = up.permissions as unknown as Permission
        if (up.granted) {
          permissionMap.set(perm.name, perm)
        } else {
          permissionMap.delete(perm.name)
        }
      }
    }
  }

  const permissions = Array.from(permissionMap.values())

  return {
    role: profile.role,
    permissions,
    hasPermission: (permissionName: string) => permissions.some((p) => p.name === permissionName),
  }
}

export async function checkPermission(userId: string, permissionName: string): Promise<boolean> {
  const userPerms = await getUserPermissions(userId)
  return userPerms?.hasPermission(permissionName) || false
}

export async function checkAnyPermission(userId: string, permissionNames: string[]): Promise<boolean> {
  const userPerms = await getUserPermissions(userId)
  if (!userPerms) return false
  return permissionNames.some((name) => userPerms.hasPermission(name))
}

export async function checkAllPermissions(userId: string, permissionNames: string[]): Promise<boolean> {
  const userPerms = await getUserPermissions(userId)
  if (!userPerms) return false
  return permissionNames.every((name) => userPerms.hasPermission(name))
}

export async function requirePermission(userId: string, permissionName: string): Promise<void> {
  const hasPermission = await checkPermission(userId, permissionName)
  if (!hasPermission) {
    throw new Error(`Permission denied: ${permissionName}`)
  }
}
