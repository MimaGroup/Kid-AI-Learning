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
  }

  const handleDeleteChild = async (id: string) => {
    await deleteChild(id)
  }

  const handleEditChild = (child: Child) => {
    setSelectedChild(child)
  }

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
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
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="profiles">Child Profiles</TabsTrigger>
              <TabsTrigger value="progress">Learning Progress</TabsTrigger>
            </TabsList>

            <TabsContent value="profiles" className="mt-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Manage Children</h2>
                <AddChildDialog onAdd={handleAddChild} />
              </div>

              {childrenLoading ? (
                <div className="text-center py-8 text-gray-500">Loading children...</div>
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
                <div className="text-center py-8 text-gray-500">Loading progress...</div>
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

            <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-2">Settings</h3>
              <p className="text-green-100 mb-4">Manage account and preferences</p>
              <button className="bg-white text-green-600 px-4 py-2 rounded-lg hover:bg-green-50 transition-colors">
                Manage Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
