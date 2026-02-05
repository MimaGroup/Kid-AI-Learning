"use client"

import { useEffect, useState } from "react"

interface Stats {
  userCount: number
  activityCount: number
  satisfactionRate: number
}

export function StatsSection() {
  const [stats, setStats] = useState<Stats>({
    userCount: 0,
    activityCount: 50,
    satisfactionRate: 98
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/stats/user-count")
        const data = await res.json()
        setStats(prev => ({
          ...prev,
          userCount: data.count || 0
        }))
      } catch (error) {
        console.error("Failed to fetch stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  // Format number with appropriate suffix
  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return `${Math.floor(num / 1000)}K+`
    }
    return `${num}+`
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#7C3AED]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          <div className="space-y-2">
            <div className="text-5xl md:text-6xl font-heading font-bold">
              {loading ? (
                <span className="animate-pulse">...</span>
              ) : (
                formatNumber(stats.userCount)
              )}
            </div>
            <div className="text-lg font-medium opacity-90">Aktivnih učencev</div>
          </div>
          <div className="space-y-2">
            <div className="text-5xl md:text-6xl font-heading font-bold">{stats.activityCount}+</div>
            <div className="text-lg font-medium opacity-90">Učnih aktivnosti</div>
          </div>
          <div className="space-y-2">
            <div className="text-5xl md:text-6xl font-heading font-bold">{stats.satisfactionRate}%</div>
            <div className="text-lg font-medium opacity-90">Zadovoljnih staršev</div>
          </div>
          <div className="space-y-2">
            <div className="text-5xl md:text-6xl font-heading font-bold">24/7</div>
            <div className="text-lg font-medium opacity-90">Dostop do učenja</div>
          </div>
        </div>
      </div>
    </section>
  )
}
