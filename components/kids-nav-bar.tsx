"use client"

import { useState, useEffect, useCallback } from "react"
import { usePathname, useRouter } from "next/navigation"

const PLANETS = [
  { id: "detective", name: "AI Detektiv",  icon: "🕵️", href: "/kids/games/ai-detective",      color: "#3b82f6" },
  { id: "quiz",      name: "AI Kviz",      icon: "🎯", href: "/kids/games/ai-quiz",            color: "#f97316" },
  { id: "friend",    name: "Prijatelji",   icon: "🤖", href: "/kids/ai-friend",                color: "#a855f7" },
  { id: "patterns",  name: "Vzorci",       icon: "🧠", href: "/kids/games/pattern-training",   color: "#22c55e" },
]

const PATH_TO_IDX: Record<string, number> = {
  "/kids/games/ai-detective":       0,
  "/kids/games/ai-quiz":            1,
  "/kids/ai-friend":                2,
  "/kids/games/pattern-training":   3,
}

// Fixed mini-stars
const STARS = [
  {x:3,y:20},{x:10,y:60},{x:18,y:30},{x:27,y:70},{x:35,y:15},
  {x:43,y:55},{x:52,y:25},{x:61,y:65},{x:70,y:35},{x:79,y:75},
  {x:87,y:20},{x:94,y:60},{x:48,y:80},{x:22,y:85},{x:66,y:10},
]

// Rocket horizontal % for each tab
const TAB_LEFT = [12.5, 37.5, 62.5, 87.5]

export function KidsNavBar() {
  const pathname  = usePathname()
  const router    = useRouter()

  const currentIdx = PATH_TO_IDX[pathname] ?? -1

  const [rocketAt,    setRocketAt]    = useState(currentIdx >= 0 ? currentIdx : 0)
  const [isTraveling, setIsTraveling] = useState(false)

  // Keep rocket in sync when URL changes from outside the nav
  useEffect(() => {
    if (currentIdx >= 0) setRocketAt(currentIdx)
  }, [currentIdx])

  const travelTo = useCallback((idx: number) => {
    if (isTraveling) return
    if (idx === currentIdx) return           // already here
    setIsTraveling(true)
    setRocketAt(idx)
    setTimeout(() => {
      setIsTraveling(false)
      router.push(PLANETS[idx].href)
    }, 750)
  }, [isTraveling, currentIdx, router])

  // Hide on pages that have their own sidebar + KidsBottomNav
  if (
    ["/kids/home", "/kids/activities", "/kids/courses"].includes(pathname) ||
    pathname.startsWith("/kids/courses/")
  ) return null

  const activePlanet = PLANETS[currentIdx] ?? null

  return (
    <>
      {/* Spacer so page content isn't hidden behind nav */}
      <div className="h-20" />

      <div
        className="fixed bottom-0 left-0 right-0 z-50 overflow-hidden"
        style={{
          background: "linear-gradient(to top, #050510, #1e1b4b)",
          borderTop: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        {/* Mini star field */}
        {STARS.map((s, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{ left: `${s.x}%`, top: `${s.y}%`, width: 2, height: 2, opacity: 0.2 + (i % 3) * 0.1 }}
          />
        ))}

        {/* Rocket — floats above the tabs, slides horizontally */}
        <div
          className="absolute pointer-events-none"
          style={{
            left: `${TAB_LEFT[rocketAt]}%`,
            top: -6,
            transform: `translateX(-50%) ${isTraveling ? "scale(1.3) translateY(-4px)" : "translateY(0)"}`,
            transition: "left 0.75s cubic-bezier(0.68,-0.55,0.27,1.55), transform 0.3s ease",
            fontSize: 22,
            filter: "drop-shadow(0 0 8px rgba(255,200,80,0.95))",
            zIndex: 10,
          }}
        >
          🚀
        </div>

        {/* Planet tabs */}
        <div className="grid grid-cols-4 h-[4.5rem]">
          {PLANETS.map((planet, i) => {
            const isActive = currentIdx === i
            const isRocket = rocketAt === i
            return (
              <button
                key={planet.id}
                onClick={() => travelTo(i)}
                disabled={isTraveling}
                className="flex flex-col items-center justify-center gap-0.5 pt-3 focus:outline-none group transition-all"
                style={{ opacity: isActive ? 1 : 0.5 }}
              >
                <span
                  className="text-xl transition-transform duration-200"
                  style={{ transform: isRocket && !isTraveling ? "scale(1.2)" : "scale(1)" }}
                >
                  {planet.icon}
                </span>
                <span
                  className="text-xs font-semibold leading-none"
                  style={{ color: isActive ? planet.color : "rgba(255,255,255,0.7)" }}
                >
                  {planet.name}
                </span>
                {/* Active dot */}
                <div
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: isActive ? 20 : 4,
                    height: 3,
                    background: isActive ? planet.color : "transparent",
                    marginTop: 2,
                  }}
                />
              </button>
            )
          })}
        </div>

        {/* Byte speech — only while traveling */}
        {isTraveling && (
          <div
            className="absolute left-1/2 -translate-x-1/2 bottom-[4.75rem] bg-black/70 backdrop-blur border border-white/20 rounded-full px-4 py-1.5 text-white text-xs font-medium whitespace-nowrap flex items-center gap-2"
            style={{ animation: "fadeIn 0.2s ease" }}
          >
            <span>🤖</span>
            Byte leti na &ldquo;{PLANETS[rocketAt].name}&rdquo;...
          </div>
        )}
      </div>
    </>
  )
}
