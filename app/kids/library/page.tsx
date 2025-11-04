"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { UserHeader } from "@/components/user-header"
import { BackToHomeButton } from "@/components/back-to-home-button"

export default function ContentLibrary() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedVideo, setSelectedVideo] = useState<any>(null)
  const [isVideoOpen, setIsVideoOpen] = useState(false)

  const videos = [
    {
      id: 1,
      title: "What is Artificial Intelligence?",
      description: "Learn the basics of AI in this fun animated video!",
      thumbnail: "/ai-robot-learning.jpg",
      duration: "5:30",
      category: "ai-basics",
      url: "https://www.youtube.com/embed/kWmX3pd1f10",
      ageRange: "6-10",
    },
    {
      id: 2,
      title: "How Do Computers Think?",
      description: "Discover how computers process information",
      thumbnail: "/computer-brain-thinking.jpg",
      duration: "4:15",
      category: "ai-basics",
      url: "https://www.youtube.com/embed/AkFi90lZmXA",
      ageRange: "8-12",
    },
    {
      id: 3,
      title: "Machine Learning for Kids",
      description: "Understanding how machines learn from examples",
      thumbnail: "/machine-learning-kids.jpg",
      duration: "6:45",
      category: "coding",
      url: "https://www.youtube.com/embed/f_uwKZIAeM0",
      ageRange: "9-12",
    },
    {
      id: 4,
      title: "Robots and AI",
      description: "How robots use AI to help people",
      thumbnail: "/friendly-robot-helping.jpg",
      duration: "5:00",
      category: "robotics",
      url: "https://www.youtube.com/embed/7Pq-S557XQU",
      ageRange: "6-10",
    },
  ]

  const stories = [
    {
      id: 1,
      title: "The Friendly AI Robot",
      description: "A story about a robot who learns to be a good friend",
      icon: "🤖",
      readTime: "8 min",
      category: "friendship",
      content: `Once upon a time, in a bright and colorful town, there lived a small robot named Chip. Chip was different from other robots - he wanted to learn how to be a good friend...`,
    },
    {
      id: 2,
      title: "The Smart Home Helper",
      description: "How AI helps make our homes better",
      icon: "🏠",
      readTime: "6 min",
      category: "technology",
      content: `In the Johnson family's house, there was a special helper named Alexa. She wasn't a person, but she could talk and help with many things...`,
    },
    {
      id: 3,
      title: "The Pattern Detective",
      description: "A mystery solved by recognizing patterns",
      icon: "🔍",
      readTime: "10 min",
      category: "problem-solving",
      content: `Detective Maya had a special skill - she could spot patterns that others missed. One day, she got a mysterious case...`,
    },
  ]

  const resources = [
    {
      id: 1,
      title: "AI Glossary for Kids",
      description: "Simple explanations of AI terms",
      icon: "📚",
      type: "glossary",
      items: [
        { term: "Algorithm", definition: "A set of steps to solve a problem, like a recipe" },
        { term: "Machine Learning", definition: "When computers learn from examples" },
        { term: "Neural Network", definition: "A computer system inspired by the human brain" },
        { term: "Data", definition: "Information that computers use to learn" },
      ],
    },
    {
      id: 2,
      title: "Fun AI Facts",
      description: "Amazing facts about artificial intelligence",
      icon: "💡",
      type: "facts",
      items: [
        "AI can recognize faces in photos faster than humans!",
        "The first AI program was created in 1956",
        "AI helps doctors find diseases earlier",
        "Self-driving cars use AI to stay safe on roads",
        "AI can create art, music, and stories!",
      ],
    },
    {
      id: 3,
      title: "Activity Worksheets",
      description: "Printable activities for offline learning",
      icon: "📝",
      type: "worksheets",
      items: [
        { name: "Pattern Recognition Puzzle", difficulty: "Easy" },
        { name: "Build Your Own Algorithm", difficulty: "Medium" },
        { name: "AI Word Search", difficulty: "Easy" },
        { name: "Robot Design Challenge", difficulty: "Hard" },
      ],
    },
  ]

  const handleWatchVideo = (video: any) => {
    setSelectedVideo(video)
    setIsVideoOpen(true)
  }

  const handleCloseVideo = () => {
    setIsVideoOpen(false)
    setSelectedVideo(null)
  }

  const handleDownloadWorksheet = (name: string, difficulty: string) => {
    const worksheetKey = name.toLowerCase().replace(/ /g, "-")
    const downloadUrl = `/api/worksheets/${worksheetKey}?difficulty=${difficulty}`
    window.location.href = downloadUrl
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <BackToHomeButton variant="home" />
              <div className="text-2xl">📚</div>
              <h1 className="text-2xl font-bold text-gray-900">Learning Library</h1>
            </div>
            <UserHeader />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-8 rounded-2xl mb-8">
          <div className="flex items-center space-x-4">
            <div className="text-5xl">📚</div>
            <div>
              <h2 className="text-3xl font-bold mb-2">Content Library</h2>
              <p className="text-indigo-100 text-lg">Videos, stories, and resources to help you learn about AI!</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="videos" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-2xl mx-auto">
            <TabsTrigger value="videos" className="text-lg">
              🎥 Videos
            </TabsTrigger>
            <TabsTrigger value="stories" className="text-lg">
              📖 Stories
            </TabsTrigger>
            <TabsTrigger value="resources" className="text-lg">
              📚 Resources
            </TabsTrigger>
          </TabsList>

          <TabsContent value="videos" className="space-y-6">
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                onClick={() => setSelectedCategory("all")}
              >
                All Videos
              </Button>
              <Button
                variant={selectedCategory === "ai-basics" ? "default" : "outline"}
                onClick={() => setSelectedCategory("ai-basics")}
              >
                AI Basics
              </Button>
              <Button
                variant={selectedCategory === "coding" ? "default" : "outline"}
                onClick={() => setSelectedCategory("coding")}
              >
                Coding
              </Button>
              <Button
                variant={selectedCategory === "robotics" ? "default" : "outline"}
                onClick={() => setSelectedCategory("robotics")}
              >
                Robotics
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos
                .filter((video) => selectedCategory === "all" || video.category === selectedCategory)
                .map((video) => (
                  <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <Image
                        src={video.thumbnail || "/placeholder.svg"}
                        alt={video.title}
                        width={400}
                        height={225}
                        className="w-full h-48 object-cover"
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIyNSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIyNSIgZmlsbD0iI2VlZSIvPjwvc3ZnPg=="
                      />
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                        {video.duration}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-2">{video.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{video.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          Ages {video.ageRange}
                        </span>
                        <Button size="sm" onClick={() => handleWatchVideo(video)}>
                          Watch Now
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="stories" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stories.map((story) => (
                <Card key={story.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="text-5xl mb-4">{story.icon}</div>
                  <h3 className="font-bold text-xl mb-2">{story.title}</h3>
                  <p className="text-gray-600 mb-4">{story.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">📖 {story.readTime}</span>
                    <Link href={`/kids/library/story/${story.id}`}>
                      <Button size="sm">Read Story</Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {resources.map((resource) => (
                <Card key={resource.id} className="p-6">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="text-4xl">{resource.icon}</div>
                    <div>
                      <h3 className="font-bold text-xl mb-1">{resource.title}</h3>
                      <p className="text-gray-600 text-sm">{resource.description}</p>
                    </div>
                  </div>

                  {resource.type === "glossary" && (
                    <div className="space-y-3">
                      {resource.items.map((item, idx) => {
                        const glossaryItem = item as { term: string; definition: string }
                        return (
                          <div key={idx} className="bg-blue-50 p-3 rounded-lg">
                            <div className="font-semibold text-blue-900">{glossaryItem.term}</div>
                            <div className="text-sm text-gray-700">{glossaryItem.definition}</div>
                          </div>
                        )
                      })}
                    </div>
                  )}

                  {resource.type === "facts" && (
                    <ul className="space-y-2">
                      {resource.items.map((fact, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <span className="text-yellow-500 mt-1">⭐</span>
                          <span className="text-gray-700">{fact as string}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {resource.type === "worksheets" && (
                    <div className="space-y-2">
                      {resource.items.map((worksheet, idx) => {
                        const worksheetItem = worksheet as { name: string; difficulty: string }
                        return (
                          <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span className="font-medium">{worksheetItem.name}</span>
                            <div className="flex items-center space-x-2">
                              <span
                                className={`text-xs px-2 py-1 rounded ${
                                  worksheetItem.difficulty === "Easy"
                                    ? "bg-green-100 text-green-800"
                                    : worksheetItem.difficulty === "Medium"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-red-100 text-red-800"
                                }`}
                              >
                                {worksheetItem.difficulty}
                              </span>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDownloadWorksheet(worksheetItem.name, worksheetItem.difficulty)}
                              >
                                Download
                              </Button>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedVideo?.title}</DialogTitle>
          </DialogHeader>
          <div className="aspect-video w-full">
            {selectedVideo && (
              <iframe
                src={selectedVideo.url}
                title={selectedVideo.title}
                className="w-full h-full rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
          <div className="flex justify-end">
            <Button onClick={handleCloseVideo}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
