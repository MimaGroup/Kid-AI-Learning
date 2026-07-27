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
        a.download = `${childName}-porocilo-o-napredku-${new Date().toISOString().split("T")[0]}.txt`
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
    const date = new Date().toLocaleDateString("sl-SI")
    return `
Kids Learning AI — Poročilo o napredku
Ustvarjeno: ${date}
Otrok: ${name}

=== PREGLED ===
Skupaj opravljenih dejavnosti: ${data.stats?.totalActivities || 0}
Skupaj dosežkov: ${data.stats?.totalAchievements || 0}
Povprečna ocena: ${data.stats?.averageScore || 0} %
Trenutni nivo: ${data.gamification?.level || 1}
Skupaj točk: ${data.gamification?.points || 0}
Trenutni niz: ${data.gamification?.streakDays || 0} dni

=== RAZČLENITEV DEJAVNOSTI ===
Matematična pustolovščina: ${data.stats?.mathGames || 0}
Graditelj besed: ${data.stats?.wordGames || 0}
AI Kvizi: ${data.stats?.quizzesTaken || 0}
Igre spomina: ${data.stats?.memoryGames || 0}
Rešene skrivnosti: ${data.stats?.mysteriesSolved || 0}

=== NEDAVNI DOSEŽKI ===
${
  data.achievements
    ?.slice(0, 5)
    .map((a: any) => `- ${a.achievement_name} (${new Date(a.earned_at).toLocaleDateString("sl-SI")})`)
    .join("\n") || "Še ni dosežkov"
}

=== OSVOJENE ZNAČKE ===
${data.gamification?.earnedBadges?.map((b: any) => `- ${b.badges.name} (${b.badges.rarity})`).join("\n") || "Še ni značk"}

=== PRIPOROČILA ===
Za ohranjanje učnega niza redno vadi!
Preizkusi nove dejavnosti za več značk in dosežkov.
Izzovi se z višjo stopnjo težavnosti.

---
Tako naprej!
    `.trim()
  }

  return (
    <Button onClick={handleDownload} disabled={loading} variant="outline" size="sm">
      <Download className="w-4 h-4 mr-2" />
      {loading ? "Ustvarjanje ..." : "Prenesi poročilo"}
    </Button>
  )
}
