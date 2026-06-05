"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Lock, CheckCircle2, ArrowLeft } from 'lucide-react'
import { useSubscription } from "@/hooks/use-subscription"
import { useRouter } from 'next/navigation'

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
      title: "Potovanje po AI osnovah",
      description: "Začni svojo AI pustolovščino! Nauči se, kaj je AI in kako deluje.",
      icon: "🤖",
      color: "from-blue-500 to-cyan-500",
      totalLessons: 5,
      completedLessons: 2,
      lessons: [
        {
          id: "1",
          title: "Kaj je AI?",
          duration: "10 min",
          isCompleted: true,
          isLocked: false,
          href: "/kids/games/ai-quiz",
        },
        {
          id: "2",
          title: "Kako računalniki razmišljajo",
          duration: "12 min",
          isCompleted: true,
          isLocked: false,
          href: "/kids/games/pattern-training",
        },
        {
          id: "3",
          title: "AI v vsakdanjem življenju",
          duration: "15 min",
          isCompleted: false,
          isLocked: false,
          href: "/kids/games/ai-detective",
        },
        {
          id: "4",
          title: "Osnove strojnega učenja",
          duration: "18 min",
          isCompleted: false,
          isLocked: !hasPremium,
          href: "#",
        },
        {
          id: "5",
          title: "Ustvari svojega AI prijatelja",
          duration: "20 min",
          isCompleted: false,
          isLocked: !hasPremium,
          href: "/kids/ai-friend",
        },
      ],
    },
    {
      id: "coding-adventure",
      title: "Programerska pustolovščina",
      description: "Nauči se programirati korak za korakom! Ustvari svoje programe.",
      icon: "💻",
      color: "from-purple-500 to-pink-500",
      totalLessons: 6,
      completedLessons: 0,
      lessons: [
        {
          id: "1",
          title: "Kaj je koda?",
          duration: "8 min",
          isCompleted: false,
          isLocked: false,
          href: "/kids/games/coding-basics",
        },
        {
          id: "2",
          title: "Zaporedja in ukazi",
          duration: "12 min",
          isCompleted: false,
          isLocked: false,
          href: "/kids/games/coding-basics",
        },
        {
          id: "3",
          title: "Zanke in ponavljanje",
          duration: "15 min",
          isCompleted: false,
          isLocked: !hasPremium,
          href: "#",
        },
        {
          id: "4",
          title: "Sprejemanje odločitev (IF/ELSE)",
          duration: "15 min",
          isCompleted: false,
          isLocked: !hasPremium,
          href: "#",
        },
        {
          id: "5",
          title: "Spremenljivke in podatki",
          duration: "18 min",
          isCompleted: false,
          isLocked: !hasPremium,
          href: "#",
        },
        {
          id: "6",
          title: "Ustvari svojo prvo igro",
          duration: "25 min",
          isCompleted: false,
          isLocked: !hasPremium,
          href: "#",
        },
      ],
    },
    {
      id: "math-master",
      title: "Pot matematičnega mojstra",
      description: "Postani matematični čarovnik! Reši naloge in napreduješ.",
      icon: "🧮",
      color: "from-green-500 to-emerald-500",
      totalLessons: 4,
      completedLessons: 1,
      lessons: [
        {
          id: "1",
          title: "Seštevanje in odštevanje",
          duration: "10 min",
          isCompleted: true,
          isLocked: false,
          href: "/kids/games/math-adventure",
        },
        {
          id: "2",
          title: "Množenje za zabavo",
          duration: "12 min",
          isCompleted: false,
          isLocked: false,
          href: "/kids/games/math-adventure",
        },
        {
          id: "3",
          title: "Izziv deljenja",
          duration: "15 min",
          isCompleted: false,
          isLocked: !hasPremium,
          href: "#",
        },
        {
          id: "4",
          title: "Besedilne naloge",
          duration: "18 min",
          isCompleted: false,
          isLocked: !hasPremium,
          href: "#",
        },
      ],
    },
    {
      id: "science-explorer",
      title: "Raziskovalec znanosti",
      description: "Odkrij, kako AI pomaga pri znanosti! Izvajaj virtualne eksperimente.",
      icon: "🔬",
      color: "from-orange-500 to-red-500",
      totalLessons: 5,
      completedLessons: 0,
      lessons: [
        {
          id: "1",
          title: "AI in prepoznavanje barv",
          duration: "12 min",
          isCompleted: false,
          isLocked: false,
          href: "/kids/games/science-lab",
        },
        {
          id: "2",
          title: "Zvok in glasovni AI",
          duration: "15 min",
          isCompleted: false,
          isLocked: false,
          href: "/kids/games/science-lab",
        },
        {
          id: "3",
          title: "Pametno kmetovanje",
          duration: "15 min",
          isCompleted: false,
          isLocked: !hasPremium,
          href: "#",
        },
        {
          id: "4",
          title: "Napovedovanje vremena",
          duration: "18 min",
          isCompleted: false,
          isLocked: !hasPremium,
          href: "#",
        },
        {
          id: "5",
          title: "Raziskovanje vesolja",
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
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 relative overflow-hidden p-6">
        <div className="absolute top-16 left-10 text-6xl opacity-20 animate-float">🎓</div>
        <div className="absolute top-40 right-20 text-5xl opacity-15 animate-float" style={{ animationDelay: '1s' }}>📚</div>
        <div className="absolute bottom-32 left-1/4 text-6xl opacity-20 animate-float" style={{ animationDelay: '2s' }}>🤖</div>
        <div className="absolute top-20 right-10 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="mb-6">
            <Button variant="ghost" size="sm" onClick={() => setSelectedPath(null)} className="hover:bg-white/50 rounded-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Nazaj na poti
            </Button>
          </div>
          <Card className="bg-white/70 backdrop-blur-xl border-white/20 shadow-2xl rounded-3xl">
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
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 relative overflow-hidden p-6">
      <div className="absolute top-16 left-10 text-7xl opacity-25 animate-float">🎓</div>
      <div className="absolute top-40 right-16 text-6xl opacity-20 animate-float" style={{ animationDelay: '1.5s' }}>🚀</div>
      <div className="absolute bottom-32 right-1/4 text-6xl opacity-25 animate-float" style={{ animationDelay: '1s' }}>💡</div>
      <div className="absolute bottom-20 left-20 text-5xl opacity-20 animate-float" style={{ animationDelay: '2s' }}>⭐</div>
      <div className="absolute top-10 right-1/4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-10 left-1/4 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-6">
          <Link href="/kids/home">
            <Button variant="ghost" size="sm" className="hover:bg-white/50 rounded-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🎓</div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Learning Paths</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Follow structured learning journeys to master new skills! Complete lessons to unlock the next ones.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {learningPaths.map((path) => (
            <Card
              key={path.id}
              className="bg-white/70 backdrop-blur-xl border-white/20 hover:shadow-2xl transition-all duration-300 cursor-pointer hover:scale-105 rounded-3xl"
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
