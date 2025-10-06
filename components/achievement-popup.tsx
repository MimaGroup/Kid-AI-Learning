"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "./ui/card"

interface Achievement {
  id: string
  title: string
  description: string
}

interface AchievementPopupProps {
  achievements: Achievement[]
  onClose: () => void
}

export function AchievementPopup({ achievements, onClose }: AchievementPopupProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (achievements.length > 0) {
      const timer = setTimeout(() => {
        setVisible(false)
        setTimeout(onClose, 300)
      }, 4000)

      return () => clearTimeout(timer)
    }
  }, [achievements, onClose])

  if (achievements.length === 0 || !visible) return null

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right">
      {achievements.map((achievement) => (
        <Card key={achievement.id} className="mb-2 bg-gradient-to-r from-yellow-100 to-orange-100 border-yellow-400">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="text-3xl">🏆</div>
              <div>
                <h4 className="font-bold text-yellow-900">{achievement.title}</h4>
                <p className="text-sm text-yellow-800">{achievement.description}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
