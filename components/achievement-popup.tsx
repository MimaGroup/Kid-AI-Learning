"use client"

import { useEffect, useState } from "react"

const BADGE_META: Record<string, { icon: string; label: string; color: string }> = {
  first_steps:       { icon: "🌟", label: "Prve korake",       color: "#fbbf24" },
  quick_learner:     { icon: "⚡", label: "Hitri učenec",      color: "#60a5fa" },
  dedicated_student: { icon: "🎓", label: "Vztrajni študent",  color: "#a78bfa" },
  master_learner:    { icon: "🏆", label: "Mojster učenja",    color: "#f472b6" },
  perfect_score:     { icon: "💯", label: "Perfektna ocena",   color: "#34d399" },
  course_complete:   { icon: "🚀", label: "Tečaj opravljen!",  color: "#fb923c" },
}

interface AchievementPopupProps {
  badges: string[]
  onClose: () => void
}

export function AchievementPopup({ badges, onClose }: AchievementPopupProps) {
  const [visible, setVisible] = useState(true)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!badges.length) return
    const hide = setTimeout(() => {
      setVisible(false)
      setTimeout(onClose, 400)
    }, 3500)
    return () => clearTimeout(hide)
  }, [badges, onClose])

  useEffect(() => {
    if (badges.length <= 1) return
    const next = setInterval(() => {
      setCurrent(c => (c + 1) % badges.length)
    }, 2500)
    return () => clearInterval(next)
  }, [badges])

  if (!badges.length || !visible) return null

  const badgeId = badges[current]
  const meta = BADGE_META[badgeId] ?? { icon: "🏅", label: badgeId, color: "#a855f7" }

  return (
    <div
      className="fixed top-6 right-6 z-50"
      style={{
        animation: "slideInRight 0.4s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(120%); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
        @keyframes popStar {
          0%   { transform: scale(0) rotate(-20deg); }
          60%  { transform: scale(1.2) rotate(5deg); }
          100% { transform: scale(1) rotate(0deg); }
        }
      `}</style>

      <div
        className="relative overflow-hidden rounded-2xl px-5 py-4 flex items-center gap-4"
        style={{
          background: "linear-gradient(135deg, #0d0d2b, #1a0a3a)",
          border: `1px solid ${meta.color}55`,
          boxShadow: `0 0 32px ${meta.color}33, 0 8px 32px rgba(0,0,0,0.6)`,
          minWidth: 260,
        }}
      >
        {/* Glow ring behind icon */}
        <div
          className="flex-shrink-0 flex items-center justify-center rounded-full"
          style={{
            width: 52, height: 52,
            background: `${meta.color}18`,
            border: `2px solid ${meta.color}55`,
            boxShadow: `0 0 20px ${meta.color}44`,
            animation: "popStar 0.5s cubic-bezier(0.16,1,0.3,1)",
            fontSize: 26,
          }}
        >
          {meta.icon}
        </div>

        <div>
          <p className="text-xs font-semibold mb-0.5" style={{ color: `${meta.color}cc` }}>
            Nova značka odklenjena!
          </p>
          <p className="text-white font-bold text-sm leading-tight">{meta.label}</p>
        </div>

        {/* Multi-badge dots */}
        {badges.length > 1 && (
          <div className="absolute bottom-2 right-3 flex gap-1">
            {badges.map((_, i) => (
              <span
                key={i}
                className="rounded-full"
                style={{ width: 5, height: 5, background: i === current ? meta.color : "rgba(255,255,255,0.2)" }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
