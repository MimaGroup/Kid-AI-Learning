'use client'

import { useAuth } from '../../../hooks/use-auth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'

export default function ParentDashboard() {
  const { user, isLoading, logout } = useAuth()
  const router = useRouter()

  console.log('[v0] Dashboard rendering, user:', user, 'isLoading:', isLoading)

  useEffect(() => {
    if (!isLoading && !user) {
      console.log('[v0] No user found, redirecting to login')
      router.push('/auth/login')
    }
  }, [user, isLoading, router])

  if (isLoading) {
    console.log('[v0] Dashboard loading...')
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg">Loading dashboard...</div>
        </div>
      </div>
    )
  }

  if (!user) {
    console.log('[v0] No user, returning null')
    return null
  }

  console.log('[v0] Rendering dashboard for user:', user.email)

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Parent Dashboard</h1>
            <button
              onClick={logout}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Welcome, {user.name || user.email}!</h2>
          <p className="text-gray-600 mb-6">
            Welcome to your AI Kids Learning Platform dashboard. Monitor your child's progress and manage their learning experience.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <div className="text-2xl mb-2">🎮</div>
              <h3 className="font-semibold text-blue-900">Active Games</h3>
              <p className="text-2xl font-bold text-blue-700">4</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <div className="text-2xl mb-2">⭐</div>
              <h3 className="font-semibold text-green-900">Achievements</h3>
              <p className="text-2xl font-bold text-green-700">12</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <div className="text-2xl mb-2">📈</div>
              <h3 className="font-semibold text-purple-900">Progress</h3>
              <p className="text-2xl font-bold text-purple-700">85%</p>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link 
                href="/kids/home"
                className="block w-full bg-blue-600 text-white text-center py-3 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Explore Kids Games
              </Link>
              <Link 
                href="/kids/progress"
                className="block w-full bg-green-600 text-white text-center py-3 px-4 rounded-md hover:bg-green-700 transition-colors"
              >
                View Progress & Achievements
              </Link>
              <Link 
                href="/kids/ai-friend"
                className="block w-full bg-purple-600 text-white text-center py-3 px-4 rounded-md hover:bg-purple-700 transition-colors"
              >
                AI Friend Builder
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
