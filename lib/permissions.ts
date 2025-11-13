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
  try {
    const supabase = await createServerClient()

    console.log("[v0] Getting permissions for user:", userId)

    // Get user role
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", userId)
      .single()

    if (profileError) {
      console.error("[v0] Error fetching profile:", profileError)
      return null
    }

    if (!profile) {
      console.error("[v0] Profile not found for user:", userId)
      return null
    }

    console.log("[v0] User role:", profile.role)

    // Get role-based permissions
    const { data: rolePermissions, error: rolePermError } = await supabase
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

    if (rolePermError) {
      console.error("[v0] Error fetching role permissions:", rolePermError)
      // Check if table doesn't exist
      if (rolePermError.message?.includes("does not exist") || rolePermError.code === "42P01") {
        throw new Error("Permissions system not initialized. Please run the permissions SQL script.")
      }
      throw rolePermError
    }

    console.log("[v0] Role permissions:", rolePermissions?.length || 0)

    // Get user-specific permission overrides
    const { data: userPermissions, error: userPermError } = await supabase
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

    if (userPermError) {
      console.error("[v0] Error fetching user permissions:", userPermError)
      throw userPermError
    }

    console.log("[v0] User-specific permissions:", userPermissions?.length || 0)

    // Combine permissions (user overrides take precedence)
    const permissionMap = new Map<string, Permission>()

    // Add role permissions
    if (rolePermissions) {
      for (const rp of rolePermissions) {
        if (rp.permissions) {
          const permArray = rp.permissions as unknown as Permission[]
          for (const perm of permArray) {
            permissionMap.set(perm.name, perm)
          }
        }
      }
    }

    // Apply user-specific overrides
    if (userPermissions) {
      for (const up of userPermissions) {
        if (up.permissions) {
          const permArray = up.permissions as unknown as Permission[]
          for (const perm of permArray) {
            if (up.granted) {
              permissionMap.set(perm.name, perm)
            } else {
              permissionMap.delete(perm.name)
            }
          }
        }
      }
    }

    const permissions = Array.from(permissionMap.values())

    console.log("[v0] Total permissions for user:", permissions.length)

    return {
      role: profile.role,
      permissions,
      hasPermission: (permissionName: string) => permissions.some((p) => p.name === permissionName),
    }
  } catch (error) {
    console.error("[v0] Error in getUserPermissions:", error)
    throw error
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
