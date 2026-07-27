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
      title: "Kaj je umetna inteligenca?",
      description: "Spoznaj osnove AI v tem zabavnem animiranem videu!",
      thumbnail: "/ai-robot-learning.jpg",
      duration: "5:30",
      category: "ai-basics",
      url: "https://www.youtube.com/embed/kWmX3pd1f10",
      ageRange: "5–12",
    },
    {
      id: 2,
      title: "Kako razmišljajo računalniki?",
      description: "Odkrij, kako računalniki obdelujejo informacije",
      thumbnail: "/computer-brain-thinking.jpg",
      duration: "4:15",
      category: "ai-basics",
      url: "https://www.youtube.com/embed/AkFi90lZmXA",
      ageRange: "5–12",
    },
    {
      id: 3,
      title: "Strojno učenje za otroke",
      description: "Razumevanje, kako se stroji učijo iz primerov",
      thumbnail: "/machine-learning-kids.jpg",
      duration: "6:45",
      category: "coding",
      url: "https://www.youtube.com/embed/f_uwKZIAeM0",
      ageRange: "5–12",
    },
    {
      id: 4,
      title: "Roboti in umetna inteligenca",
      description: "Kako roboti z AI pomagajo ljudem",
      thumbnail: "/friendly-robot-helping.jpg",
      duration: "5:00",
      category: "robotics",
      url: "https://www.youtube.com/embed/7Pq-S557XQU",
      ageRange: "5–12",
    },
  ]

  const stories = [
    {
      id: 1,
      title: "Prijazni AI robot",
      description: "Zgodba o robotu, ki se uči biti dober prijatelj",
      icon: "🤖",
      readTime: "8 min",
      category: "friendship",
      content: `Nekoč, v svetlem in barvitem mestecu, je živel majhen robot po imenu Čip. Čip je bil drugačen od drugih robotov — želel se je naučiti, kako biti dober prijatelj ...`,
    },
    {
      id: 2,
      title: "Pomočnik pametnega doma",
      description: "Kako AI pomaga izboljšati naše domove",
      icon: "🏠",
      readTime: "6 min",
      category: "technology",
      content: `V hiši družine Novak je živel poseben pomočnik po imenu Nia. Ni bila oseba, a je znala govoriti in pomagati pri marsičem ...`,
    },
    {
      id: 3,
      title: "Detektiv vzorcev",
      description: "Skrivnost, razrešena s prepoznavanjem vzorcev",
      icon: "🔍",
      readTime: "10 min",
      category: "problem-solving",
      content: `Detektivka Maja je imela posebno spretnost — opazila je vzorce, ki jih drugi niso videli. Nekega dne je dobila skrivnosten primer ...`,
    },
  ]

  const resources = [
    {
      id: 1,
      title: "AI slovarček za otroke",
      description: "Preprosta razlaga izrazov o umetni inteligenci",
      icon: "📚",
      type: "glossary",
      items: [
        { term: "Algoritem", definition: "Zaporedje korakov za rešitev problema, kot recept" },
        { term: "Strojno učenje", definition: "Ko se računalniki učijo iz primerov" },
        { term: "Nevronska mreža", definition: "Računalniški sistem, navdihnjen po človeških možganih" },
        { term: "Podatki", definition: "Informacije, iz katerih se učijo računalniki" },
      ],
    },
    {
      id: 2,
      title: "Zabavna dejstva o AI",
      description: "Osupljiva dejstva o umetni inteligenci",
      icon: "💡",
      type: "facts",
      items: [
        "AI lahko prepozna obraze na fotografijah hitreje kot ljudje!",
        "Prvi AI program je nastal leta 1956",
        "AI zdravnikom pomaga odkriti bolezni prej",
        "Samovozeči avtomobili uporabljajo AI za varnost na cesti",
        "AI lahko ustvarja umetnost, glasbo in zgodbe!",
      ],
    },
    {
      id: 3,
      title: "Delovni listi za dejavnosti",
      description: "Tiskljive dejavnosti za učenje brez zaslona",
      icon: "📝",
      type: "worksheets",
      items: [
        { name: "Uganka prepoznavanja vzorcev", difficulty: "Lahko" },
        { name: "Sestavi svoj algoritem", difficulty: "Srednje" },
        { name: "Iskanje AI besed", difficulty: "Lahko" },
        { name: "Izziv oblikovanja robota", difficulty: "Težko" },
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

  const handleViewWorksheet = (name: string) => {
    const worksheetKey = name.toLowerCase().replace(/ /g, "-")
    window.location.href = `/worksheets/${worksheetKey}`
  }

  const difficultyLabels: Record<string, string> = {
    Lahko: "bg-green-100 text-green-800",
    Srednje: "bg-yellow-100 text-yellow-800",
    Težko: "bg-red-100 text-red-800",
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <BackToHomeButton variant="home" />
              <UserHeader />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-8 rounded-2xl mb-8">
          <div className="flex items-center space-x-4">
            <div className="text-5xl">📚</div>
            <div>
              <h2 className="text-3xl font-bold mb-2">Knjižnica vsebin</h2>
              <p className="text-indigo-100 text-lg">Videi, zgodbe in gradiva, ki ti pomagajo spoznati AI!</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="videos" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-2xl mx-auto">
            <TabsTrigger value="videos" className="text-lg">
              🎥 Videi
            </TabsTrigger>
            <TabsTrigger value="stories" className="text-lg">
              📖 Zgodbe
            </TabsTrigger>
            <TabsTrigger value="resources" className="text-lg">
              📚 Gradiva
            </TabsTrigger>
          </TabsList>

          <TabsContent value="videos" className="space-y-6">
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                onClick={() => setSelectedCategory("all")}
              >
                Vsi videi
              </Button>
              <Button
                variant={selectedCategory === "ai-basics" ? "default" : "outline"}
                onClick={() => setSelectedCategory("ai-basics")}
              >
                Osnove AI
              </Button>
              <Button
                variant={selectedCategory === "coding" ? "default" : "outline"}
                onClick={() => setSelectedCategory("coding")}
              >
                Programiranje
              </Button>
              <Button
                variant={selectedCategory === "robotics" ? "default" : "outline"}
                onClick={() => setSelectedCategory("robotics")}
              >
                Robotika
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
                          Starost {video.ageRange}
                        </span>
                        <Button size="sm" onClick={() => handleWatchVideo(video)}>
                          Poglej zdaj
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
                      <Button size="sm">Preberi zgodbo</Button>
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
                          <div
                            key={idx}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <span className="font-medium">{worksheetItem.name}</span>
                            <div className="flex items-center space-x-2">
                              <span
                                className={`text-xs px-2 py-1 rounded ${
                                  difficultyLabels[worksheetItem.difficulty] ?? "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {worksheetItem.difficulty}
                              </span>
                              <Button size="sm" onClick={() => handleViewWorksheet(worksheetItem.name)}>
                                Poglej
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
            <Button onClick={handleCloseVideo}>Zapri</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
