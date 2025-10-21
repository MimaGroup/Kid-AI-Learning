"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Lock, CheckCircle2, ArrowLeft } from "lucide-react"
import { useSubscription } from "@/hooks/use-subscription"
import { useRouter } from "next/navigation"

interface LearningPath {
  id: string
  title: string
  description: string
  icon: string
  color: string
  totalLessons: number
  completedLessons: number
  lessons: {
    id: string
    title: string
    duration: string
    isCompleted: boolean
    isLocked: boolean
    href: string
  }[]
}

export default function LearningPathsPage() {
  const [selectedPath, setSelectedPath] = useState<string | null>(null)
  const { hasPremium, loading: subscriptionLoading } = useSubscription()
  const router = useRouter()

  const learningPaths: LearningPath[] = [
    {
      id: "ai-basics",
      title: "AI Basics Journey",
      description: "Start your AI adventure! Learn what AI is and how it works.",
      icon: "🤖",
      color: "from-blue-500 to-cyan-500",
      totalLessons: 5,
      completedLessons: 2,
      lessons: [
        {
          id: "1",
          title: "What is AI?",
          duration: "10 min",
          isCompleted: true,
          isLocked: false,
          href: "/kids/games/ai-quiz",
        },
        {
          id: "2",
          title: "How Computers Think",
          duration: "12 min",
          isCompleted: true,
          isLocked: false,
          href: "/kids/games/pattern-training",
        },
        {
          id: "3",
          title: "AI in Everyday Life",
          duration: "15 min",
          isCompleted: false,
          isLocked: false,
          href: "/kids/games/ai-detective",
        },
        {
          id: "4",
          title: "Machine Learning Basics",
          duration: "18 min",
          isCompleted: false,
          isLocked: !hasPremium,
          href: "#",
        },
        {
          id: "5",
          title: "Build Your AI Friend",
          duration: "20 min",
          isCompleted: false,
          isLocked: !hasPremium,
          href: "/kids/ai-friend",
        },
      ],
    },
    {
      id: "coding-adventure",
      title: "Coding Adventure",
      description: "Learn to code step by step! Create your own programs.",
      icon: "💻",
      color: "from-purple-500 to-pink-500",
      totalLessons: 6,
      completedLessons: 0,
      lessons: [
        {
          id: "1",
          title: "What is Code?",
          duration: "8 min",
          isCompleted: false,
          isLocked: false,
          href: "/kids/games/coding-basics",
        },
        {
          id: "2",
          title: "Sequences & Commands",
          duration: "12 min",
          isCompleted: false,
          isLocked: false,
          href: "/kids/games/coding-basics",
        },
        {
          id: "3",
          title: "Loops & Repetition",
          duration: "15 min",
          isCompleted: false,
          isLocked: !hasPremium,
          href: "#",
        },
        {
          id: "4",
          title: "Making Decisions (IF/ELSE)",
          duration: "15 min",
          isCompleted: false,
          isLocked: !hasPremium,
          href: "#",
        },
        {
          id: "5",
          title: "Variables & Data",
          duration: "18 min",
          isCompleted: false,
          isLocked: !hasPremium,
          href: "#",
        },
        {
          id: "6",
          title: "Build Your First Game",
          duration: "25 min",
          isCompleted: false,
          isLocked: !hasPremium,
          href: "#",
        },
      ],
    },
    {
      id: "math-master",
      title: "Math Master Path",
      description: "Become a math wizard! Solve problems and level up.",
      icon: "🧮",
      color: "from-green-500 to-emerald-500",
      totalLessons: 4,
      completedLessons: 1,
      lessons: [
        {
          id: "1",
          title: "Addition & Subtraction",
          duration: "10 min",
          isCompleted: true,
          isLocked: false,
          href: "/kids/games/math-adventure",
        },
        {
          id: "2",
          title: "Multiplication Fun",
          duration: "12 min",
          isCompleted: false,
          isLocked: false,
          href: "/kids/games/math-adventure",
        },
        {
          id: "3",
          title: "Division Challenge",
          duration: "15 min",
          isCompleted: false,
          isLocked: !hasPremium,
          href: "#",
        },
        {
          id: "4",
          title: "Word Problems",
          duration: "18 min",
          isCompleted: false,
          isLocked: !hasPremium,
          href: "#",
        },
      ],
    },
    {
      id: "science-explorer",
      title: "Science Explorer",
      description: "Discover how AI helps in science! Conduct virtual experiments.",
      icon: "🔬",
      color: "from-orange-500 to-red-500",
      totalLessons: 5,
      completedLessons: 0,
      lessons: [
        {
          id: "1",
          title: "AI & Color Recognition",
          duration: "12 min",
          isCompleted: false,
          isLocked: false,
          href: "/kids/games/science-lab",
        },
        {
          id: "2",
          title: "Sound & Voice AI",
          duration: "15 min",
          isCompleted: false,
          isLocked: false,
          href: "/kids/games/science-lab",
        },
        {
          id: "3",
          title: "Smart Farming",
          duration: "15 min",
          isCompleted: false,
          isLocked: !hasPremium,
          href: "#",
        },
        {
          id: "4",
          title: "Weather Prediction",
          duration: "18 min",
          isCompleted: false,
          isLocked: !hasPremium,
          href: "#",
        },
        {
          id: "5",
          title: "Space Exploration",
          duration: "20 min",
          isCompleted: false,
          isLocked: !hasPremium,
          href: "#",
        },
      ],
    },
  ]

  const selectedPathData = learningPaths.find((path) => path.id === selectedPath)

  const handleLessonClick = (lesson: any) => {
    if (lesson.isLocked && !hasPremium) {
      router.push("/pricing")
    }
  }

  if (selectedPath && selectedPathData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Button variant="ghost" size="sm" onClick={() => setSelectedPath(null)}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Paths
            </Button>
          </div>

          <Card>
            <CardHeader>
              <div className={`bg-gradient-to-r ${selectedPathData.color} text-white p-6 rounded-lg mb-4`}>
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-5xl">{selectedPathData.icon}</span>
                  <div>
                    <CardTitle className="text-3xl">{selectedPathData.title}</CardTitle>
                    <p className="text-white/90 mt-2">{selectedPathData.description}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progress</span>
                    <span>
                      {selectedPathData.completedLessons}/{selectedPathData.totalLessons} lessons
                    </span>
                  </div>
                  <Progress
                    value={(selectedPathData.completedLessons / selectedPathData.totalLessons) * 100}
                    className="h-3 bg-white/20"
                  />
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                {selectedPathData.lessons.map((lesson, index) => (
                  <div
                    key={lesson.id}
                    className={`p-4 rounded-lg border-2 ${
                      lesson.isCompleted
                        ? "bg-green-50 border-green-300"
                        : lesson.isLocked
                          ? "bg-gray-50 border-gray-200 opacity-60"
                          : "bg-white border-purple-200 hover:border-purple-400 transition-colors"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                            lesson.isCompleted
                              ? "bg-green-500 text-white"
                              : lesson.isLocked
                                ? "bg-gray-300 text-gray-600"
                                : "bg-purple-500 text-white"
                          }`}
                        >
                          {lesson.isCompleted ? (
                            <CheckCircle2 className="w-5 h-5" />
                          ) : lesson.isLocked ? (
                            <Lock className="w-5 h-5" />
                          ) : (
                            index + 1
                          )}
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">{lesson.title}</h3>
                          <p className="text-sm text-gray-600">{lesson.duration}</p>
                        </div>
                      </div>
                      {!lesson.isLocked && !lesson.isCompleted && (
                        <Link href={lesson.href}>
                          <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                            Start
                          </Button>
                        </Link>
                      )}
                      {lesson.isCompleted && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          Completed
                        </Badge>
                      )}
                      {lesson.isLocked && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-yellow-500 text-yellow-700 hover:bg-yellow-50 bg-transparent"
                          onClick={() => handleLessonClick(lesson)}
                        >
                          <Lock className="w-4 h-4 mr-2" />
                          Upgrade to Unlock
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Link href="/kids/home">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🎓</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Learning Paths</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Follow structured learning journeys to master new skills! Complete lessons to unlock the next ones.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {learningPaths.map((path) => (
            <Card
              key={path.id}
              className="hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => setSelectedPath(path.id)}
            >
              <CardHeader>
                <div className={`bg-gradient-to-r ${path.color} text-white p-6 rounded-lg`}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-4xl">{path.icon}</span>
                    <CardTitle className="text-2xl">{path.title}</CardTitle>
                  </div>
                  <p className="text-white/90">{path.description}</p>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Progress</span>
                      <span>
                        {path.completedLessons}/{path.totalLessons} lessons
                      </span>
                    </div>
                    <Progress value={(path.completedLessons / path.totalLessons) * 100} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <BookOpen className="w-4 h-4" />
                      <span>{path.totalLessons} lessons</span>
                    </div>
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                      {path.completedLessons > 0 ? "Continue" : "Start Path"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
