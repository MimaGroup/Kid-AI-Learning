interface Stats {
  userCount: number
  activityCount: number
  satisfactionRate: number
}

export function StatsSection() {
  // Hardcoded stats for now - update to dynamic when more traction
  const stats: Stats = {
    userCount: 159,
    activityCount: 50,
    satisfactionRate: 98,
  }

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
              {formatNumber(stats.userCount)}
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
