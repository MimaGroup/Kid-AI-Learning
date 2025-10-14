"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Gamepad2, Trophy, BookOpen, Users, Sparkles, Target } from "lucide-react"

export default function GettingStarted() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Getting Started with AI Kids Learning</h1>
          <p className="text-xl text-gray-600">Everything you need to know to start your learning adventure!</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="text-4xl mb-4">🎮</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">For Kids</h2>
            <p className="text-gray-600 mb-6">
              Start your AI learning journey with fun games, challenges, and rewards!
            </p>
            <Link href="/kids/home">
              <Button className="w-full" size="lg">
                Start Learning <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="text-4xl mb-4">👨‍👩‍👧‍👦</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">For Parents</h2>
            <p className="text-gray-600 mb-6">Track your children's progress and manage their learning experience.</p>
            <Link href="/parent/dashboard">
              <Button className="w-full bg-transparent" size="lg" variant="outline">
                View Dashboard <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Key Features</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gamepad2 className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Interactive Games</h3>
              <p className="text-gray-600">7+ educational games covering AI, math, vocabulary, and memory skills.</p>
            </div>

            <div className="text-center p-6">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Gamification</h3>
              <p className="text-gray-600">Earn points, level up, unlock badges, and maintain learning streaks!</p>
            </div>

            <div className="text-center p-6">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Daily Challenges</h3>
              <p className="text-gray-600">Complete special challenges each day for bonus rewards and achievements.</p>
            </div>

            <div className="text-center p-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Content Library</h3>
              <p className="text-gray-600">Access educational videos, interactive stories, and learning resources.</p>
            </div>

            <div className="text-center p-6">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">AI Friends</h3>
              <p className="text-gray-600">Create and chat with personalized AI companions that help you learn.</p>
            </div>

            <div className="text-center p-6">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Parent Dashboard</h3>
              <p className="text-gray-600">Track progress, view analytics, and manage multiple child profiles.</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold mb-4">Quick Start Guide</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="bg-white text-purple-600 w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Choose Your Interface</h3>
                <p className="text-purple-100">Select Kids Learning App or Parent Dashboard from the sidebar.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-white text-purple-600 w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Explore Activities</h3>
                <p className="text-purple-100">Try different games and activities to discover what you enjoy most.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-white text-purple-600 w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Earn Rewards</h3>
                <p className="text-purple-100">
                  Complete activities to earn points, level up, and unlock badges and achievements.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-white text-purple-600 w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                4
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Track Progress</h3>
                <p className="text-purple-100">
                  Parents can monitor learning progress and achievements from the dashboard.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link href="/kids/home">
            <Button size="lg" className="text-lg px-8 py-6">
              Start Your Learning Journey <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
