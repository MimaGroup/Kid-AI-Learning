'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

export default function ActivityPage() {
  const params = useParams()
  const router = useRouter()
  const activityId = params.activityId as string
  const [score, setScore] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)

  const activities = {
    'detective': {
      title: 'AI Detective Game',
      description: 'Discover which items use AI technology!',
      icon: '🕵️',
      questions: [
        { question: 'Which device uses AI to understand your voice?', options: ['Smart Speaker', 'Regular Phone', 'Calculator'], correct: 0 },
        { question: 'What helps cars drive themselves?', options: ['Magic', 'AI Sensors', 'Loud Music'], correct: 1 }
      ]
    },
    'friend-creator': {
      title: 'AI Friend Creator',
      description: 'Design your own AI companion!',
      icon: '🤖',
      questions: [
        { question: 'What makes an AI friend helpful?', options: ['Being Smart', 'Being Kind', 'Both!'], correct: 2 },
        { question: 'How do AI friends learn?', options: ['From Data', 'From Sleep', 'From Food'], correct: 0 }
      ]
    },
    'pattern-training': {
      title: 'Pattern Training',
      description: 'Train AI to recognize patterns!',
      icon: '🧠',
      questions: [
        { question: 'What is a pattern?', options: ['Something Random', 'Something That Repeats', 'Something Loud'], correct: 1 },
        { question: 'How does AI find patterns?', options: ['By Looking at Data', 'By Guessing', 'By Sleeping'], correct: 0 }
      ]
    },
    'ai-quiz': {
      title: 'AI Quiz',
      description: 'Test your AI knowledge!',
      icon: '🎯',
      questions: [
        { question: 'What does AI stand for?', options: ['Artificial Intelligence', 'Amazing Ideas', 'Apple Ice'], correct: 0 },
        { question: 'Where do we use AI?', options: ['Only Computers', 'Phones and Games', 'Nowhere'], correct: 1 }
      ]
    }
  }

  const activity = activities[activityId as keyof typeof activities]

  if (!activity) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Activity Not Found</h1>
          <Link href="/kids/home" className="text-blue-600 hover:underline">
            Back to Games
          </Link>
        </div>
      </div>
    )
  }

  const handleAnswer = (selectedIndex: number) => {
    if (selectedIndex === activity.questions[currentQuestion].correct) {
      setScore(score + 1)
    }
    
    if (currentQuestion < activity.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      alert(`Game completed! Your score: ${score + (selectedIndex === activity.questions[currentQuestion].correct ? 1 : 0)}/${activity.questions.length}`)
      router.push('/kids/home')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      <header className="bg-white shadow-sm border-b p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/kids/home" className="text-blue-600 hover:underline">← Back to Games</Link>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">{activity.icon}</span>
              <h1 className="text-2xl font-bold">{activity.title}</h1>
            </div>
          </div>
          <div className="text-sm text-gray-600">Score: {score}/{activity.questions.length}</div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Question {currentQuestion + 1} of {activity.questions.length}</h2>
              <div className="bg-blue-100 px-3 py-1 rounded-full text-sm text-blue-700">
                Progress: {Math.round(((currentQuestion + 1) / activity.questions.length) * 100)}%
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / activity.questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {activity.questions[currentQuestion].question}
            </h3>
          </div>

          <div className="grid gap-4">
            {activity.questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className="w-full p-4 text-left bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-lg transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-semibold">
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="text-lg">{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
