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
import { TutorialTour } from "../../../components/tutorial-tour"
import { trackEvent } from "@/lib/analytics"
import { Footer } from "@/components/footer"
import { DashboardSkeleton, ProgressCardSkeleton } from "@/components/skeleton-screens"
import { OnboardingFlow } from "@/components/onboarding-flow"

export default function ParentDashboard() {
  const { user, logout, loading: authLoading } = useAuth()
  const { children, loading: childrenLoading, createChild, deleteChild } = useChildren()
  const router = useRouter()
  const [selectedChild, setSelectedChild] = useState<Child | null>(null)

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
  }

  const handleEditChild = (child: Child) => {
    setSelectedChild(child)
  }

  const parentTourSteps = [
    {
      target: ".tabs-list",
      title: "Welcome to Parent Dashboard! 👋",
      content: "Switch between managing child profiles and viewing their learning progress.",
      position: "bottom" as const,
    },
    {
      target: ".add-child-button",
      title: "Add Child Profiles 👶",
      content: "Click here to add your children's profiles. You can track multiple children's progress!",
      position: "left" as const,
    },
    {
      target: ".progress-tab",
      title: "Track Learning Progress 📊",
      content: "View detailed analytics of your children's learning activities, achievements, and gamification stats.",
      position: "bottom" as const,
    },
  ]

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
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />

      <OnboardingFlow userType="parent" />
      <TutorialTour tourId="parent-dashboard" steps={parentTourSteps} />

      <div className="flex-1 p-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="bg-card rounded-2xl shadow-xl p-8 border border-border">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Parent Dashboard</h1>
                <p className="text-muted-foreground mt-2">Welcome back, {user?.email}</p>
              </div>
              <button
                onClick={handleSignOut}
                className="bg-destructive text-destructive-foreground px-4 py-2 rounded-lg hover:bg-destructive/90 transition-colors shadow-lg"
              >
                Sign Out
              </button>
            </div>

            <Tabs defaultValue="profiles" className="mb-8">
              <TabsList className="grid w-full max-w-md grid-cols-2 tabs-list">
                <TabsTrigger value="profiles">Child Profiles</TabsTrigger>
                <TabsTrigger value="progress" className="progress-tab">
                  Learning Progress
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profiles" className="mt-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-foreground">Manage Children</h2>
                  <div className="add-child-button">
                    <AddChildDialog onAdd={handleAddChild} />
                  </div>
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
                    {children.map((child) => (
                      <ChildCard key={child.id} child={child} onDelete={handleDeleteChild} onEdit={handleEditChild} />
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="progress" className="mt-6">
                <h2 className="text-2xl font-bold text-foreground mb-4">Learning Progress</h2>

                {childrenLoading ? (
                  <div className="space-y-4">
                    {[...Array(2)].map((_, i) => (
                      <ProgressCardSkeleton key={i} />
                    ))}
                  </div>
                ) : children.length === 0 ? (
                  <div className="text-center py-12 bg-muted rounded-lg">
                    <p className="text-muted-foreground mb-4">No children to track</p>
                    <p className="text-sm text-muted-foreground">Add child profiles to see their learning progress</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {children.map((child) => (
                      <ChildProgressCard key={child.id} child={child} />
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 pt-8 border-t border-border">
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
