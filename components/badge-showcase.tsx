"use client"

import { useEffect, useState } from "react"

interface BadgeData {
  badge_id: string
  name: string
  description: string
  icon: string
  points_required: number
  category: string
  rarity: string
}

interface UserBadge {
  badge_id: string
  earned_at: string
  badges: BadgeData
}

interface BadgeShowcaseProps {
  earnedBadgeIds?: string[]
  completedLessons?: number
}

const CATEGORIES: { id: string; label: string }[] = [
  { id: "all",         label: "Vse" },
  { id: "milestone",   label: "Mejnik" },
  { id: "achievement", label: "Dosežek" },
  { id: "streak",      label: "Niz" },
  { id: "subject",     label: "Predmet" },
  { id: "special",     label: "Posebno" },
]

const RARITY: Record<string, { label: string; bg: string; color: string; border: string }> = {
  common:    { label: "Navadno",    bg: "rgba(156,163,175,0.15)", color: "#9ca3af", border: "rgba(156,163,175,0.3)" },
  rare:      { label: "Redko",      bg: "rgba(59,130,246,0.15)",  color: "#60a5fa", border: "rgba(59,130,246,0.35)" },
  epic:      { label: "Epsko",      bg: "rgba(168,85,247,0.18)",  color: "#c084fc", border: "rgba(168,85,247,0.4)" },
  legendary: { label: "Legendarno", bg: "rgba(251,191,36,0.18)",  color: "#fbbf24", border: "rgba(251,191,36,0.4)" },
}

export function BadgeShowcase({ earnedBadgeIds: propIds }: BadgeShowcaseProps = {}) {
  const [earnedBadges, setEarnedBadges] = useState<UserBadge[]>([])
  const [allBadges, setAllBadges] = useState<BadgeData[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState("all")

  useEffect(() => {
    fetch("/api/gamification")
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(data => {
        setEarnedBadges(data.earnedBadges ?? [])
        setAllBadges(data.allBadges ?? [])
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const earnedSet = new Set([
    ...earnedBadges.map(ub => ub.badge_id),
    ...(propIds ?? []),
  ])

  const filtered = allBadges.filter(b => activeCategory === "all" || b.category === activeCategory)

  if (loading) {
    return (
      <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="animate-pulse space-y-4">
          <div className="h-4 rounded-lg w-1/3" style={{ background: "rgba(255,255,255,0.08)" }} />
          <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-24 rounded-2xl" style={{ background: "rgba(255,255,255,0.06)" }} />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-white font-bold text-base">Zbirka značk</h2>
          <p className="text-white/40 text-xs mt-0.5">{earnedSet.size} / {allBadges.length} pridobljenih</p>
        </div>
        <span className="text-2xl">🏆</span>
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {CATEGORIES.map(cat => (
          <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
            className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all active:scale-95"
            style={activeCategory === cat.id
              ? { background: "linear-gradient(135deg,#7c3aed,#a855f7)", color: "white" }
              : { background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.45)", border: "1px solid rgba(255,255,255,0.08)" }
            }>
            {cat.label}
          </button>
        ))}
      </div>

      {/* Badge grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-8 text-white/30 text-sm">Ni značk v tej kategoriji</div>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
          {filtered.map(badge => {
            const earned = earnedSet.has(badge.badge_id)
            const rarity = RARITY[badge.rarity] ?? RARITY.common
            return (
              <div key={badge.badge_id}
                className="flex flex-col items-center p-3 rounded-2xl text-center transition-all"
                style={{
                  background: earned ? "rgba(168,85,247,0.12)" : "rgba(255,255,255,0.03)",
                  border: earned ? "1px solid rgba(168,85,247,0.35)" : "1px solid rgba(255,255,255,0.07)",
                  opacity: earned ? 1 : 0.45,
                  filter: earned ? "none" : "grayscale(0.6)",
                }}>
                <div className="text-3xl mb-1.5">{badge.icon}</div>
                <div className="text-xs font-semibold text-white leading-tight mb-1">{badge.name}</div>
                <div className="text-xs leading-tight mb-2" style={{ color: "rgba(255,255,255,0.35)" }}>{badge.description}</div>
                <span className="px-2 py-0.5 rounded-full text-xs font-bold"
                  style={{ background: rarity.bg, color: rarity.color, border: `1px solid ${rarity.border}` }}>
                  {rarity.label}
                </span>
                {!earned && (
                  <div className="text-xs mt-1.5" style={{ color: "rgba(255,255,255,0.3)" }}>
                    {badge.points_required} točk
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
