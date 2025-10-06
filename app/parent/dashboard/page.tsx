"use client"

import { useAuth } from "../../../hooks/use-auth"
import { useRouter } from "next/navigation"

export default function ParentDashboard() {
  const { user, logout, loading } = useAuth()
  const router = useRouter()

  const handleSignOut = async () => {
    await logout()
    router.push("/auth/login")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-2">Kids Learning</h3>
              <p className="text-purple-100 mb-4">Monitor your child's AI learning progress</p>
              <button
                onClick={() => router.push("/kids/home")}
                className="bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50 transition-colors"
              >
                View Progress
              </button>
            </div>

            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-2">AI Activities</h3>
              <p className="text-blue-100 mb-4">Interactive AI games and learning tools</p>
              <button
                onClick={() => router.push("/kids/activities")}
                className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Explore Activities
              </button>
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
