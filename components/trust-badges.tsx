"use client"

import { Shield, Lock, Award, CheckCircle2 } from "lucide-react"
import { Card } from "@/components/ui/card"

interface TrustBadgesProps {
  variant?: "default" | "compact"
  className?: string
}

export function TrustBadges({ variant = "default", className = "" }: TrustBadgesProps) {
  const badges = [
    {
      icon: Shield,
      title: "COPPA skladno",
      description: "Certificirana varnost otrok",
    },
    {
      icon: Lock,
      title: "Varno placevanje",
      description: "256-bitno SSL sifriranje",
    },
    {
      icon: Award,
      title: "Garancija vracila",
      description: "30-dnevno polno vracilo",
    },
    {
      icon: CheckCircle2,
      title: "Brez obveznosti",
      description: "Prekliците kadarkoli",
    },
  ]

  if (variant === "compact") {
    return (
      <div className={`flex flex-wrap justify-center gap-4 ${className}`}>
        {badges.map((badge, index) => (
          <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
            <badge.icon className="w-4 h-4 text-primary" />
            <span>{badge.title}</span>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${className}`}>
      {badges.map((badge, index) => (
        <Card key={index} className="p-4 text-center hover:shadow-lg transition-shadow border-2">
          <badge.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
          <div className="font-semibold text-sm mb-1">{badge.title}</div>
          <div className="text-xs text-muted-foreground">{badge.description}</div>
        </Card>
      ))}
    </div>
  )
}
