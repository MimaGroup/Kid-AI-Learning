'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function KidsHome() {
  const [selectedInterface, setSelectedInterface] = useState('kids')

  const activities = [
    {
      id: 'detective',
      title: 'AI Detective Game',
      description: 'Discover which items use AI technology!',
      icon: '🕵️',
      color: 'from-blue-400 to-blue-600'
    },
    {
      id: 'friend-creator',
      title: 'AI Friend Creator',
      description: 'Design your own AI companion!',
      icon: '🤖',
      color: 'from-purple-400 to-purple-600'
    },
    {
      id: 'pattern-training',
      title: 'Pattern Training',
      description: 'Train AI to recognize patterns!',
      icon: '🧠',
      color: 'from-green-400 to-green-600'
    },
    {
      id: 'ai-quiz',
      title: 'AI Quiz',
      description: 'Test your AI knowledge!',
      icon: '🎯',
      color: 'from-orange-400 to-orange-600'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-2xl">🚀</div>
              <h1 className="text-2xl font-bold text-gray-900">AI Kids Learning Platform</h1>
            </div>
            <div className="text-sm text-gray-600">Where Young Minds Meet Artificial Intelligence!</div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-80 bg-gradient-to-b from-purple-600 to-purple-800 text-white p-6">
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <div className="text-2xl">🚀</div>
              <h2 className="text-xl font-bold">AI Kids Learning</h2>
            </div>
            <p className="text-purple-200 text-sm">Choose Your Interface</p>
          </div>

          <div className="space-y-4">
            <select 
              value={selectedInterface}
              onChange={(e) => setSelectedInterface(e.target.value)}
              className="w-full p-3 rounded-lg bg-white/10 text-white border border-white/20"
            >
              <option value="kids">🎮 Kids Learning App</option>
              <option value="parent">👨‍👩‍👧‍👦 Parent Dashboard</option>
            </select>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Coming Soon Banner */}
          <div className="bg-gradient-to-r from-pink-400 to-pink-600 text-white p-6 rounded-2xl mb-8">
            <div className="flex items-center space-x-3">
              <div className="text-3xl">🎮</div>
              <div>
                <h2 className="text-2xl font-bold">AI Learning Games Coming Soon!</h2>
                <p className="text-pink-100">Interactive AI games and activities for kids!</p>
              </div>
            </div>
          </div>

          {/* Activity Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activities.map((activity) => (
              <Link
                key={activity.id}
                href={`/kids/activity/${activity.id}`}
                className={`bg-gradient-to-r ${activity.color} text-white p-6 rounded-2xl hover:scale-105 transition-transform cursor-pointer`}
              >
                <div className="flex items-center space-x-4">
                  <div className="text-4xl">{activity.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold">{activity.title}</h3>
                    <p className="text-white/90">{activity.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Progress Section */}
          <div className="mt-8 bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Your Learning Progress</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl mb-2">🏆</div>
                <div className="text-lg font-semibold text-blue-900">5 Badges</div>
                <div className="text-sm text-blue-700">Earned</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl mb-2">⚡</div>
                <div className="text-lg font-semibold text-green-900">3 Day</div>
                <div className="text-sm text-green-700">Streak</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl mb-2">🎯</div>
                <div className="text-lg font-semibold text-purple-900">Level 4</div>
                <div className="text-sm text-purple-700">AI Explorer</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
