"use client"

import { useAuth } from "../../../hooks/use-auth"
import { useChildren } from "../../../hooks/use-children"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { AddChildDialog } from "../../../components/add-child-dialog"
import { ChildCard } from "../../../components/child-card"
import { ChildProgressCard } from "../../../components/child-progress-card"
import { useState } from "react"
import type { Child } from "../../../types/child"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { trackEvent } from "@/lib/analytics"
import { Footer } from "@/components/footer"
import { DashboardSkeleton, ProgressCardSkeleton } from "@/components/skeleton-screens"
import { OnboardingFlow } from "@/components/onboarding-flow"
import { ActivityFeed } from "@/components/activity-feed"
import { ProgressOverviewCard } from "@/components/progress-overview-card"
import { SkillProgressChart } from "@/components/skill-progress-chart"
import { WeeklyActivityChart } from "@/components/weekly-activity-chart"
import { LearningRecommendations } from "@/components/learning-recommendations"
import { DownloadReportButton } from "@/components/download-report-button"
import { AppNavigation } from "@/components/app-navigation"
import { Breadcrumbs } from "@/components/breadcrumbs"

export default function ParentDashboard() {
  const { user, logout, loading: authLoading } = useAuth()
  const { children, loading: childrenLoading, createChild, deleteChild } = useChildren()
  const router = useRouter()
  const [selectedChild, setSelectedChild] = useState<Child | null>(null)
  const [selectedProfileId, setSelectedProfileId] = useState<string>("all")
  const [analyticsChildId, setAnalyticsChildId] = useState<string | null>(null)
  const [showOnboarding, setShowOnboarding] = useState(false)

  const handleSignOut = async () => {
    await logout()
    router.push("/auth/login")
  }

  const handleAddChild = async (input: any) => {
    await createChild(input)
    trackEvent("child_profile_created", {
      child_age: input.age,
      total_children: children.length + 1,
    })
  }

  const handleDeleteChild = async (id: string) => {
    await deleteChild(id)
    if (selectedProfileId === id) {
      setSelectedProfileId("all")
    }
  }

  const handleEditChild = (child: Child) => {
    setSelectedChild(child)
  }

  const displayedChildren =
    selectedProfileId === "all" ? children : children.filter((child) => child.id === selectedProfileId)

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-card rounded-2xl shadow-xl p-8">
            <DashboardSkeleton />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      <AppNavigation />
      <Breadcrumbs />

      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />

      {showOnboarding && <OnboardingFlow userType="parent" onComplete={() => setShowOnboarding(false)} />}

      <div className="flex-1 p-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="bg-card rounded-2xl shadow-xl p-8 border border-border">
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Parent Dashboard</h1>
              <p className="text-muted-foreground mt-2 text-sm sm:text-base">Welcome back, {user?.email}</p>
            </div>

            <Tabs defaultValue="profiles" className="mb-8">
              <TabsList className="grid w-full max-w-md grid-cols-3 tabs-list text-xs sm:text-sm">
                <TabsTrigger value="profiles" className="px-2 py-2">
                  Child Profiles
                </TabsTrigger>
                <TabsTrigger value="progress" className="progress-tab px-2 py-2">
                  Learning Progress
                </TabsTrigger>
                <TabsTrigger value="analytics" className="px-2 py-2">
                  Advanced Analytics
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profiles" className="mt-6">
                <div className="flex flex-col gap-4 mb-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h2 className="text-xl sm:text-2xl font-bold text-foreground">Manage Children</h2>
                    <div className="add-child-button w-full sm:w-auto">
                      <AddChildDialog onAdd={handleAddChild} />
                    </div>
                  </div>

                  {children.length > 1 && (
                    <div className="w-full">
                      <label className="block text-sm font-medium mb-2">View Child Profile</label>
                      <select
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                        value={selectedProfileId}
                        onChange={(e) => setSelectedProfileId(e.target.value)}
                      >
                        <option value="all">All Children ({children.length})</option>
                        {children.map((child) => (
                          <option key={child.id} value={child.id}>
                            {child.name} ({child.age} years old)
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                {childrenLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[...Array(3)].map((_, i) => (
                      <ProgressCardSkeleton key={i} />
                    ))}
                  </div>
                ) : children.length === 0 ? (
                  <div className="text-center py-12 bg-muted rounded-lg">
                    <p className="text-muted-foreground mb-4">No child profiles yet</p>
                    <p className="text-sm text-muted-foreground">
                      Add your first child profile to start tracking their learning progress
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {displayedChildren.map((child) => (
                      <ChildCard key={child.id} child={child} onDelete={handleDeleteChild} onEdit={handleEditChild} />
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="progress" className="mt-6">
                <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">Learning Progress</h2>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                  <div className="lg:col-span-2">
                    {childrenLoading ? (
                      <div className="space-y-4">
                        {[...Array(2)].map((_, i) => (
                          <ProgressCardSkeleton key={i} />
                        ))}
                      </div>
                    ) : children.length === 0 ? (
                      <div className="text-center py-12 bg-muted rounded-lg">
                        <p className="text-muted-foreground mb-4">No children to track</p>
                        <p className="text-sm text-muted-foreground">
                          Add child profiles to see their learning progress
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {children.map((child) => (
                          <ChildProgressCard key={child.id} child={child} />
                        ))}
                      </div>
                    )}
                  </div>
                  <div>
                    <ActivityFeed />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="mt-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground">Advanced Analytics</h2>
                  {analyticsChildId && (
                    <DownloadReportButton
                      childId={analyticsChildId}
                      childName={children.find((c) => c.id === analyticsChildId)?.name || "Child"}
                    />
                  )}
                </div>

                {children.length === 0 ? (
                  <div className="text-center py-12 bg-muted rounded-lg">
                    <p className="text-muted-foreground mb-4">No children to analyze</p>
                    <p className="text-sm text-muted-foreground">Add child profiles to see detailed analytics</p>
                  </div>
                ) : (
                  <>
                    <div className="mb-6">
                      <label className="block text-sm font-medium mb-2">Select Child</label>
                      <select
                        className="w-full max-w-xs px-4 py-2 border border-border rounded-lg bg-background"
                        value={analyticsChildId || ""}
                        onChange={(e) => setAnalyticsChildId(e.target.value)}
                      >
                        <option value="">Choose a child...</option>
                        {children.map((child) => (
                          <option key={child.id} value={child.id}>
                            {child.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {analyticsChildId ? (
                      <AnalyticsView childId={analyticsChildId} />
                    ) : (
                      <div className="text-center py-12 bg-muted rounded-lg">
                        <p className="text-muted-foreground">Select a child to view detailed analytics</p>
                      </div>
                    )}
                  </>
                )}
              </TabsContent>
            </Tabs>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-8 pt-8 border-t border-border">
              <div className="bg-gradient-to-br from-primary via-primary to-primary/80 text-primary-foreground p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-semibold mb-2">Kids Learning</h3>
                <p className="text-primary-foreground/90 mb-4">Monitor your child's AI learning progress</p>
                <Link
                  href="/kids/home"
                  className="inline-block bg-primary-foreground text-primary px-4 py-2 rounded-lg hover:bg-primary-foreground/90 transition-colors font-medium shadow-md"
                >
                  View Progress
                </Link>
              </div>

              <div className="bg-gradient-to-br from-accent via-accent to-accent/80 text-accent-foreground p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-semibold mb-2">AI Activities</h3>
                <p className="text-accent-foreground/90 mb-4">Interactive AI games and learning tools</p>
                <Link
                  href="/kids/activities"
                  className="inline-block bg-accent-foreground text-accent px-4 py-2 rounded-lg hover:bg-accent-foreground/90 transition-colors font-medium shadow-md"
                >
                  Explore Activities
                </Link>
              </div>

              <div className="bg-gradient-to-br from-secondary via-secondary to-secondary/80 text-secondary-foreground p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-semibold mb-2">Subscription</h3>
                <p className="text-secondary-foreground/90 mb-4">Upgrade to premium for full access</p>
                <Link
                  href="/pricing"
                  className="inline-block bg-secondary-foreground text-secondary px-4 py-2 rounded-lg hover:bg-secondary-foreground/90 transition-colors font-medium shadow-md"
                >
                  View Plans
                </Link>
              </div>

              <div className="bg-gradient-to-br from-primary/90 via-accent to-accent/90 text-primary-foreground p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-semibold mb-2">Settings</h3>
                <p className="text-primary-foreground/90 mb-4">Manage account and preferences</p>
                <Link
                  href="/parent/subscription"
                  className="inline-block bg-primary-foreground text-primary px-4 py-2 rounded-lg hover:bg-primary-foreground/90 transition-colors font-medium shadow-md"
                >
                  Manage Settings
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

function AnalyticsView({ childId }: { childId: string }) {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useState(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/children/${childId}/progress`)
        const result = await response.json()
        setData(result)
      } catch (error) {
        console.error("Error fetching analytics:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  })

  if (loading) {
    return <div className="text-center py-12">Loading analytics...</div>
  }

  if (!data) {
    return <div className="text-center py-12 text-muted-foreground">No data available</div>
  }

  const totalTimeSpent = data.progress?.reduce((sum: number, p: any) => sum + (p.time_spent || 0), 0) || 0
  const lastWeekActivities =
    data.progress?.filter((p: any) => {
      const date = new Date(p.completed_at)
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      return date >= weekAgo
    }).length || 0
  const prevWeekActivities =
    data.progress?.filter((p: any) => {
      const date = new Date(p.completed_at)
      const twoWeeksAgo = new Date()
      twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14)
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      return date >= twoWeeksAgo && date < weekAgo
    }).length || 0
  const weeklyGrowth =
    prevWeekActivities > 0 ? Math.round(((lastWeekActivities - prevWeekActivities) / prevWeekActivities) * 100) : 0

  return (
    <div className="space-y-6">
      <ProgressOverviewCard
        totalActivities={data.stats?.totalActivities || 0}
        totalTimeSpent={totalTimeSpent}
        weeklyGrowth={weeklyGrowth}
        currentStreak={data.gamification?.streakDays || 0}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WeeklyActivityChart data={data.progress || []} />
        <SkillProgressChart data={data.progress || []} />
      </div>

      <LearningRecommendations childId={childId} />
    </div>
  )
}
