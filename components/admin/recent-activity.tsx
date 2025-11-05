"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, UserPlus, Trophy, Clock, RefreshCw } from "lucide-react"

interface UserActivity {
  id: string
  user_email: string
  user_name?: string
  activity_type: string
  activity_id: string
  score: number
  completed_at: string
  time_spent: number
}

interface RecentUser {
  id: string
  email: string
  display_name: string | null
  created_at: string
}

export function RecentActivity() {
  const [activities, setActivities] = useState<UserActivity[]>([])
  const [recentUsers, setRecentUsers] = useState<RecentUser[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [activitiesRes, usersRes] = await Promise.all([
        fetch("/api/admin/recent-activities", { cache: "no-store" }),
        fetch("/api/admin/recent-users", { cache: "no-store" }),
      ])

      const activitiesData = await activitiesRes.json()
      const usersData = await usersRes.json()

      setActivities(activitiesData.activities || [])
      setRecentUsers(usersData.users || [])
    } catch (error) {
      console.error("Failed to fetch recent activity:", error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const handleRefresh = () => {
    setRefreshing(true)
    fetchData()
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "math":
        return "🔢"
      case "quiz":
        return "❓"
      case "game":
        return "🎮"
      default:
        return "📚"
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case "math":
        return "bg-blue-100 text-blue-800"
      case "quiz":
        return "bg-purple-100 text-purple-800"
      case "game":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading recent activity...</div>
  }

  return (
    <Tabs defaultValue="activities" className="space-y-4">
      <div className="flex items-center justify-between">
        <TabsList>
          <TabsTrigger value="activities">Recent Activities</TabsTrigger>
          <TabsTrigger value="users">New Users</TabsTrigger>
        </TabsList>
        <Button onClick={handleRefresh} disabled={refreshing} variant="outline" size="sm">
          <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      <TabsContent value="activities" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Recent Activity Completions
            </CardTitle>
            <CardDescription>Latest user activities including math problems and quizzes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Activity Type</TableHead>
                    <TableHead>Activity ID</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Time Spent</TableHead>
                    <TableHead>Completed</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activities.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-muted-foreground">
                        No recent activities found. Try refreshing the data.
                      </TableCell>
                    </TableRow>
                  ) : (
                    activities.map((activity) => (
                      <TableRow key={activity.id}>
                        <TableCell className="font-medium">{activity.user_name || activity.user_email}</TableCell>
                        <TableCell>
                          <Badge className={getActivityColor(activity.activity_type)}>
                            {getActivityIcon(activity.activity_type)} {activity.activity_type}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">{activity.activity_id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Trophy className="h-4 w-4 text-yellow-500" />
                            <span className="font-semibold">{activity.score}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            {Math.round(activity.time_spent / 60)}m
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(activity.completed_at).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="users" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              Recent User Registrations
            </CardTitle>
            <CardDescription>Latest users who signed up for the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Display Name</TableHead>
                    <TableHead>Registered</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentUsers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center text-muted-foreground">
                        No recent users
                      </TableCell>
                    </TableRow>
                  ) : (
                    recentUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.email}</TableCell>
                        <TableCell>{user.display_name || "Not set"}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(user.created_at).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
