"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sparkles, Star, Trophy, Download, Share2, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

interface WorksheetDisplayProps {
  title: string
  difficulty: string
  content: string
}

export function WorksheetDisplay({ title, difficulty, content }: WorksheetDisplayProps) {
  const router = useRouter()
  const sections = content.split("\n\n").filter((section) => section.trim())

  const getDifficultyColor = (diff: string) => {
    const lower = diff.toLowerCase()
    if (lower.includes("easy")) return "bg-fun-green text-white"
    if (lower.includes("medium")) return "bg-fun-orange text-white"
    if (lower.includes("hard")) return "bg-fun-pink text-white"
    return "bg-primary text-primary-foreground"
  }

  const handleDownload = () => {
    const formattedContent = `
${title.toUpperCase()}
Difficulty: ${difficulty}
${"=".repeat(50)}

${content}

${"=".repeat(50)}
Downloaded from AI for Kids Learning Platform
Keep learning and exploring AI concepts!
    `.trim()

    const blob = new Blob([formattedContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${title.toLowerCase().replace(/ /g, "-")}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: `Check out this fun AI worksheet: ${title}`,
          url: window.location.href,
        })
      } catch (err) {
        console.log("Error sharing:", err)
      }
    } else {
      // Fallback: copy link to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  const handleBack = () => {
    router.push("/kids/library")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Button variant="ghost" className="mb-4 hover-lift text-primary font-semibold" onClick={handleBack}>
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Library
        </Button>

        <Card className="mb-6 p-6 md:p-8 fun-shadow-lg border-4 border-primary/20 bg-white">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center animate-pulse-glow">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-primary">{title}</h1>
              </div>
              <Badge className={`${getDifficultyColor(difficulty)} text-lg px-4 py-2 rounded-full font-semibold`}>
                {difficulty}
              </Badge>
            </div>
            <div className="flex gap-2">
              <Button
                size="icon"
                variant="outline"
                className="rounded-full hover-lift bg-transparent"
                onClick={handleDownload}
                title="Download worksheet"
              >
                <Download className="w-5 h-5" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="rounded-full hover-lift bg-transparent"
                onClick={handleShare}
                title="Share worksheet"
              >
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </Card>

        <div className="space-y-6">
          {sections.map((section, index) => {
            const isInstruction = section.toLowerCase().includes("instruction")
            const isPattern = section.toLowerCase().includes("pattern")
            const isChallenge = section.toLowerCase().includes("challenge")
            const isAnswer = section.toLowerCase().includes("answer:")

            // Determine card style based on content type
            let cardClass = "bg-white"
            let iconColor = "text-primary"
            let icon = <Star className="w-6 h-6" />

            if (isInstruction) {
              cardClass = "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200"
              iconColor = "text-fun-blue"
            } else if (isChallenge) {
              cardClass = "bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200"
              iconColor = "text-fun-orange"
              icon = <Trophy className="w-6 h-6" />
            } else if (isPattern) {
              cardClass = "bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200"
              iconColor = "text-primary"
            }

            return (
              <Card key={index} className={`p-6 md:p-8 fun-shadow border-3 hover-lift transition-all ${cardClass}`}>
                <div className="flex gap-4">
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-xl bg-white flex items-center justify-center ${iconColor}`}
                  >
                    {icon}
                  </div>
                  <div className="flex-1">
                    <pre className="font-sans text-base md:text-lg leading-relaxed whitespace-pre-wrap text-foreground">
                      {section}
                    </pre>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        <Card className="mt-8 p-6 bg-gradient-to-r from-primary via-accent to-secondary text-white fun-shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center animate-bounce-gentle">
              <Trophy className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-1">Great job! 🎉</h3>
              <p className="text-lg opacity-90">Keep learning and exploring AI concepts!</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
