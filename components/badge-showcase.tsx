"use client"

import { useEffect, useState } from "react"

const ALL_BADGES = [
  { id: "first_steps",       icon: "🌟", label: "Prve korake",      desc: "Opravi 1 lekcijo",     threshold: 1,   color: "#fbbf24" },
  { id: "quick_learner",     icon: "⚡", label: "Hitri učenec",     desc: "Opravi 5 lekcij",      threshold: 5,   color: "#60a5fa" },
  { id: "dedicated_student", icon: "🎓", label: "Vztrajni študent", desc: "Opravi 25 lekcij",     threshold: 25,  color: "#a78bfa" },
  { id: "master_learner",    icon: "🏆", label: "Mojster učenja",   desc: "Opravi 100 lekcij",    threshold: 100, color: "#f472b6" },
  { id: "perfect_score",     icon: "💯", label: "Perfektna ocena",  desc: "Kviz s 100% točnostjo",threshold: null, color: "#34d399" },
]

interface BadgeShowcaseProps {
  earnedBadgeIds: string[]
  completedLessons: number
}

export function BadgeShowcase({ earnedBadgeIds, completedLessons }: BadgeShowcaseProps) {
  const earned = new Set(earnedBadgeIds)

  // Find next milestone badge
  const nextMilestone = ALL_BADGES.filter(b => b.threshold !== null && !earned.has(b.id))
    .sort((a, b) => (a.threshold ?? 0) - (b.threshold ?? 0))[0]

  const remaining = nextMilestone?.threshold ? nextMilestone.threshold - completedLessons : null

  return (
    <div
      className="rounded-2xl p-5"
      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-bold">Tvoje značke</h3>
        <span className="text-white/40 text-sm">{earnedBadgeIds.length}/{ALL_BADGES.length}</span>
      </div>

      <div className="grid grid-cols-5 gap-3 mb-4">
        {ALL_BADGES.map((badge) => {
          const isEarned = earned.has(badge.id)
          return (
            <div key={badge.id} className="flex flex-col items-center gap-1.5 group relative">
              <div
                className="flex items-center justify-center rounded-2xl transition-all"
                style={{
                  width: 52, height: 52,
                  background: isEarned ? `${badge.color}18` : "rgba(255,255,255,0.04)",
                  border: isEarned ? `2px solid ${badge.color}55` : "2px solid rgba(255,255,255,0.08)",
                  boxShadow: isEarned ? `0 0 16px ${badge.color}33` : "none",
                  fontSize: 24,
                  filter: isEarned ? "none" : "grayscale(1) opacity(0.3)",
                }}
              >
                {badge.icon}
              </div>
              <span
                className="text-center text-xs leading-tight font-medium"
                style={{ color: isEarned ? badge.color : "rgba(255,255,255,0.25)", fontSize: 10 }}
              >
                {badge.label}
              </span>

              {/* Tooltip on hover */}
              <div
                className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2.5 py-1.5 rounded-lg text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10"
                style={{ background: "#0d0d2b", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.8)" }}
              >
                {badge.desc}
              </div>
            </div>
          )
        })}
      </div>

      {/* Next milestone hint */}
      {nextMilestone && remaining !== null && remaining > 0 && (
        <div
          className="flex items-center gap-3 rounded-xl px-4 py-3"
          style={{ background: "rgba(168,85,247,0.08)", border: "1px solid rgba(168,85,247,0.2)" }}
        >
          <span style={{ fontSize: 20 }}>{nextMilestone.icon}</span>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-white/60 text-xs">Naslednja značka: <strong className="text-white/80">{nextMilestone.label}</strong></span>
              <span className="text-purple-400 text-xs font-semibold">{completedLessons}/{nextMilestone.threshold}</span>
            </div>
            <div className="rounded-full overflow-hidden" style={{ height: 4, background: "rgba(255,255,255,0.08)" }}>
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${Math.min(100, (completedLessons / (nextMilestone.threshold ?? 1)) * 100)}%`,
                  background: "linear-gradient(90deg, #7c3aed, #a855f7)",
                }}
              />
            </div>
          </div>
        </div>
      )}

      {earnedBadgeIds.length === ALL_BADGES.length && (
        <div className="text-center py-2 text-sm font-semibold" style={{ color: "#fbbf24" }}>
          🎉 Vse značke so odklenjen! Si pravi mojster!
        </div>
      )}
    </div>
  )
}
