"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Clock, Target, Zap } from "lucide-react"

interface ProgressOverviewCardProps {
  totalActivities: number
  totalTimeSpent: number
  weeklyGrowth: number
  currentStreak: number
}

export function ProgressOverviewCard({
  totalActivities,
  totalTimeSpent,
  weeklyGrowth,
  currentStreak,
}: ProgressOverviewCardProps) {
  const hours = Math.floor(totalTimeSpent / 3600)
  const minutes = Math.floor((totalTimeSpent % 3600) / 60)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="shadow-lg hover:shadow-xl transition-all duration-200 border-2 hover:border-primary/50 hover:scale-105">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-br from-primary/10 to-primary/5 rounded-t-xl">
          <CardTitle className="text-sm font-semibold">Skupaj dejavnosti</CardTitle>
          <Target className="h-5 w-5 text-primary" />
        </CardHeader>
        <CardContent className="pt-4">
          <div className="text-3xl font-bold text-primary">{totalActivities}</div>
          <p className="text-xs text-muted-foreground mt-1">Opravljenih ta mesec</p>
        </CardContent>
      </Card>

      <Card className="shadow-lg hover:shadow-xl transition-all duration-200 border-2 hover:border-accent/50 hover:scale-105">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-br from-accent/10 to-accent/5 rounded-t-xl">
          <CardTitle className="text-sm font-semibold">Čas učenja</CardTitle>
          <Clock className="h-5 w-5 text-accent" />
        </CardHeader>
        <CardContent className="pt-4">
          <div className="text-3xl font-bold text-accent">
            {hours} h {minutes} min
          </div>
          <p className="text-xs text-muted-foreground mt-1">Skupaj vloženega časa</p>
        </CardContent>
      </Card>

      <Card className="shadow-lg hover:shadow-xl transition-all duration-200 border-2 hover:border-green-500/50 hover:scale-105">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-br from-green-100 to-green-50 rounded-t-xl">
          <CardTitle className="text-sm font-semibold">Tedenska rast</CardTitle>
          <TrendingUp className="h-5 w-5 text-green-600" />
        </CardHeader>
        <CardContent className="pt-4">
          <div className="text-3xl font-bold text-green-600">+{weeklyGrowth} %</div>
          <p className="text-xs text-muted-foreground mt-1">V primerjavi s prejšnjim tednom</p>
        </CardContent>
      </Card>

      <Card className="shadow-lg hover:shadow-xl transition-all duration-200 border-2 hover:border-orange-500/50 hover:scale-105">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-br from-orange-100 to-orange-50 rounded-t-xl">
          <CardTitle className="text-sm font-semibold">Trenutni niz</CardTitle>
          <Zap className="h-5 w-5 text-orange-600" />
        </CardHeader>
        <CardContent className="pt-4">
          <div className="text-3xl font-bold text-orange-600">{currentStreak}</div>
          <p className="text-xs text-muted-foreground mt-1">Dni zapored</p>
        </CardContent>
      </Card>
    </div>
  )
}
