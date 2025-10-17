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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <DashboardSkeleton />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      <OnboardingFlow userType="parent" />
      <TutorialTour tourId="parent-dashboard" steps={parentTourSteps} />

      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Parent Dashboard</h1>
                <p className="text-gray-600 mt-2">Welcome back, {user?.email}</p>
              </div>
              <button
                onClick={handleSignOut}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
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
                  <h2 className="text-2xl font-bold text-gray-900">Manage Children</h2>
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
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <p className="text-gray-600 mb-4">No child profiles yet</p>
                    <p className="text-sm text-gray-500">
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
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Learning Progress</h2>

                {childrenLoading ? (
                  <div className="space-y-4">
                    {[...Array(2)].map((_, i) => (
                      <ProgressCardSkeleton key={i} />
                    ))}
                  </div>
                ) : children.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <p className="text-gray-600 mb-4">No children to track</p>
                    <p className="text-sm text-gray-500">Add child profiles to see their learning progress</p>
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 pt-8 border-t">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-2">Kids Learning</h3>
                <p className="text-purple-100 mb-4">Monitor your child's AI learning progress</p>
                <Link
                  href="/kids/home"
                  className="inline-block bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50 transition-colors"
                >
                  View Progress
                </Link>
              </div>

              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-2">AI Activities</h3>
                <p className="text-blue-100 mb-4">Interactive AI games and learning tools</p>
                <Link
                  href="/kids/activities"
                  className="inline-block bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Explore Activities
                </Link>
              </div>

              <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-2">Subscription</h3>
                <p className="text-orange-100 mb-4">Upgrade to premium for full access</p>
                <Link
                  href="/pricing"
                  className="inline-block bg-white text-orange-600 px-4 py-2 rounded-lg hover:bg-orange-50 transition-colors"
                >
                  View Plans
                </Link>
              </div>

              <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-2">Settings</h3>
                <p className="text-green-100 mb-4">Manage account and preferences</p>
                <Link
                  href="/parent/subscription"
                  className="inline-block bg-white text-green-600 px-4 py-2 rounded-lg hover:bg-green-50 transition-colors"
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
