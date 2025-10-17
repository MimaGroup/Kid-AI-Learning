"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { useState } from "react"

interface DownloadReportButtonProps {
  childId: string
  childName: string
}

export function DownloadReportButton({ childId, childName }: DownloadReportButtonProps) {
  const [loading, setLoading] = useState(false)

  const handleDownload = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/reports/generate?childId=${childId}`)
      const data = await response.json()

      if (response.ok) {
        const reportContent = generateReportContent(data, childName)
        const blob = new Blob([reportContent], { type: "text/plain" })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `${childName}-learning-report-${new Date().toISOString().split("T")[0]}.txt`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      }
    } catch (error) {
      console.error("Error generating report:", error)
    } finally {
      setLoading(false)
    }
  }

  const generateReportContent = (data: any, name: string) => {
    const date = new Date().toLocaleDateString()
    return `
AI Kids Learning - Progress Report
Generated: ${date}
Student: ${name}

=== OVERVIEW ===
Total Activities Completed: ${data.stats?.totalActivities || 0}
Total Achievements: ${data.stats?.totalAchievements || 0}
Average Score: ${data.stats?.averageScore || 0}%
Current Level: ${data.gamification?.level || 1}
Total Points: ${data.gamification?.points || 0}
Current Streak: ${data.gamification?.streakDays || 0} days

=== ACTIVITY BREAKDOWN ===
Math Adventures: ${data.stats?.mathGames || 0}
Word Builder: ${data.stats?.wordGames || 0}
AI Quizzes: ${data.stats?.quizzesTaken || 0}
Memory Games: ${data.stats?.memoryGames || 0}
Mysteries Solved: ${data.stats?.mysteriesSolved || 0}

=== RECENT ACHIEVEMENTS ===
${
  data.achievements
    ?.slice(0, 5)
    .map((a: any) => `- ${a.achievement_name} (${new Date(a.earned_at).toLocaleDateString()})`)
    .join("\n") || "No achievements yet"
}

=== EARNED BADGES ===
${data.gamification?.earnedBadges?.map((b: any) => `- ${b.badges.name} (${b.badges.rarity})`).join("\n") || "No badges yet"}

=== RECOMMENDATIONS ===
Continue practicing regularly to maintain your learning streak!
Try new activities to earn more badges and achievements.
Challenge yourself with harder difficulty levels.

---
Keep up the great work!
    `.trim()
  }

  return (
    <Button onClick={handleDownload} disabled={loading} variant="outline" size="sm">
      <Download className="w-4 h-4 mr-2" />
      {loading ? "Generating..." : "Download Report"}
    </Button>
  )
}
