"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, Mail, Calendar, Crown, Settings, ArrowUpDown, Filter, X, CircleDollarSign } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface User {
  id: string
  email: string
  display_name: string | null
  created_at: string
  last_activity_date: string | null
  role: string
  subscription_status: string | null
}

type SortField = "created_at" | "last_activity_date" | "email" | "display_name"
type SortOrder = "asc" | "desc"
type RoleFilter = "all" | "admin" | "parent" | "child"
type StatusFilter = "all" | "premium" | "free"
type ActivityFilter = "all" | "active" | "inactive"

export function UsersManagement() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState<SortField>("created_at")
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc")
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("all")
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all")
  const [activityFilter, setActivityFilter] = useState<ActivityFilter>("all")
  const router = useRouter()

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/admin/users")
      const data = await response.json()
      setUsers(data.users || [])
    } catch (error) {
      console.error("Failed to fetch users:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredAndSortedUsers = users
    .filter((user) => {
      // Search filter
      const matchesSearch =
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.display_name?.toLowerCase().includes(searchTerm.toLowerCase())

      if (!matchesSearch) return false

      // Role filter
      if (roleFilter !== "all" && user.role !== roleFilter) return false

      // Status filter
      if (statusFilter === "premium" && user.subscription_status !== "active") return false
      if (statusFilter === "free" && user.subscription_status === "active") return false

      // Activity filter
      if (activityFilter !== "all") {
        const sevenDaysAgo = new Date()
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
        const lastActivity = user.last_activity_date ? new Date(user.last_activity_date) : null

        if (activityFilter === "active" && (!lastActivity || lastActivity < sevenDaysAgo)) return false
        if (activityFilter === "inactive" && lastActivity && lastActivity >= sevenDaysAgo) return false
      }

      return true
    })
    .sort((a, b) => {
      let aValue: string | number | null = null
      let bValue: string | number | null = null

      switch (sortField) {
        case "created_at":
          aValue = new Date(a.created_at).getTime()
          bValue = new Date(b.created_at).getTime()
          break
        case "last_activity_date":
          aValue = a.last_activity_date ? new Date(a.last_activity_date).getTime() : 0
          bValue = b.last_activity_date ? new Date(b.last_activity_date).getTime() : 0
          break
        case "email":
          aValue = a.email || ""
          bValue = b.email || ""
          break
        case "display_name":
          aValue = a.display_name || ""
          bValue = b.display_name || ""
          break
      }

      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1
      return 0
    })

  const clearFilters = () => {
    setSearchTerm("")
    setRoleFilter("all")
    setStatusFilter("all")
    setActivityFilter("all")
    setSortField("created_at")
    setSortOrder("desc")
  }

  const hasActiveFilters = searchTerm || roleFilter !== "all" || statusFilter !== "all" || activityFilter !== "all"

  const handlePermissionsClick = (userId: string, userEmail: string) => {
    console.log("[v0] Permissions button clicked for user:", userId, userEmail)
    const targetUrl = `/admin/users/${userId}/permissions`
    console.log("[v0] Navigating to:", targetUrl)
    router.push(targetUrl)
  }

  if (loading) {
    return <div className="text-center py-8">Loading users...</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Management</CardTitle>
        <CardDescription>View and manage all registered users</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2 flex-1 min-w-[250px]">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by email or name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                  <Filter className="h-4 w-4" />
                  Filters
                  {hasActiveFilters && (
                    <Badge variant="secondary" className="ml-1 px-1.5 py-0">
                      {[roleFilter !== "all", statusFilter !== "all", activityFilter !== "all"].filter(Boolean).length}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-96 p-6" align="end">
                <div className="space-y-5">
                  <div className="text-lg font-bold text-foreground pb-3 border-b-2 border-slate-200">Filter Users</div>

                  <div className="space-y-3 bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <label className="text-base font-bold flex items-center gap-2">
                      <Crown className="h-5 w-5 text-[#7c3aed]" />
                      Role
                    </label>
                    <Select value={roleFilter} onValueChange={(value) => setRoleFilter(value as RoleFilter)}>
                      <SelectTrigger className="bg-white h-12 text-base font-semibold shadow-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all" className="font-bold text-base py-3">
                          All Roles
                        </SelectItem>
                        <SelectItem value="admin" className="font-bold text-base py-3">
                          Admin
                        </SelectItem>
                        <SelectItem value="parent" className="font-bold text-base py-3">
                          Parent
                        </SelectItem>
                        <SelectItem value="child" className="font-bold text-base py-3">
                          Child
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3 bg-teal-50 p-4 rounded-lg border border-teal-200">
                    <label className="text-base font-bold flex items-center gap-2">
                      <CircleDollarSign className="h-5 w-5 text-[#6cd4c3]" />
                      Subscription
                    </label>
                    <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as StatusFilter)}>
                      <SelectTrigger className="bg-white h-12 text-base font-semibold shadow-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all" className="font-bold text-base py-3">
                          All Status
                        </SelectItem>
                        <SelectItem value="premium" className="font-bold text-base py-3">
                          Premium Only
                        </SelectItem>
                        <SelectItem value="free" className="font-bold text-base py-3">
                          Free Only
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3 bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <label className="text-base font-bold flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-blue-600" />
                      Activity
                    </label>
                    <Select
                      value={activityFilter}
                      onValueChange={(value) => setActivityFilter(value as ActivityFilter)}
                    >
                      <SelectTrigger className="bg-white h-12 text-base font-semibold shadow-sm">
                        <SelectValue placeholder="Sort by..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all" className="font-bold text-base py-3">
                          All Users
                        </SelectItem>
                        <SelectItem value="active" className="font-bold text-base py-3">
                          Active (Last 7 days)
                        </SelectItem>
                        <SelectItem value="inactive" className="font-bold text-base py-3">
                          Inactive (7+ days)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Select value={sortField} onValueChange={(value) => setSortField(value as SortField)}>
              <SelectTrigger className="w-[200px] h-11 text-base font-semibold">
                <SelectValue placeholder="Sort by..." />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="created_at" className="font-bold text-base py-3 hover:bg-purple-50">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-[#7c3aed]" />
                    Joined Date
                  </div>
                </SelectItem>
                <SelectItem value="last_activity_date" className="font-bold text-base py-3 hover:bg-teal-50">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-[#6cd4c3]" />
                    Last Activity
                  </div>
                </SelectItem>
                <SelectItem value="email" className="font-bold text-base py-3 hover:bg-orange-50">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-orange-500" />
                    Email
                  </div>
                </SelectItem>
                <SelectItem value="display_name" className="font-bold text-base py-3 hover:bg-slate-50">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-slate-600" />
                    Name
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="sm" onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
              <ArrowUpDown className="h-4 w-4 mr-2" />
              {sortOrder === "asc" ? "Asc" : "Desc"}
            </Button>

            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <X className="h-4 w-4 mr-2" />
                Clear
              </Button>
            )}
          </div>

          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2">
              {roleFilter !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  Role: {roleFilter}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setRoleFilter("all")} />
                </Badge>
              )}
              {statusFilter !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  Status: {statusFilter}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setStatusFilter("all")} />
                </Badge>
              )}
              {activityFilter !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  Activity: {activityFilter}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setActivityFilter("all")} />
                </Badge>
              )}
            </div>
          )}
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground">
                    No users found
                  </TableCell>
                </TableRow>
              ) : (
                filteredAndSortedUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div>
                          <p className="font-medium">{user.display_name || "No name"}</p>
                          {user.role === "admin" && (
                            <Badge variant="secondary" className="text-xs">
                              <Crown className="h-3 w-3 mr-1" />
                              Admin
                            </Badge>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{user.email}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {user.subscription_status === "active" ? (
                        <Badge variant="default">Premium</Badge>
                      ) : (
                        <Badge variant="outline">Free</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {new Date(user.created_at).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {user.last_activity_date ? new Date(user.last_activity_date).toLocaleDateString() : "Never"}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => handlePermissionsClick(user.id, user.email)}>
                        <Settings className="h-4 w-4 mr-2" />
                        Permissions
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <div className="text-sm text-muted-foreground">
          Showing {filteredAndSortedUsers.length} of {users.length} users
        </div>
      </CardContent>
    </Card>
  )
}
