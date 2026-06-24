"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"

const PLANETS = [
  {
    id: "detective",
    name: "AI Detektiv",
    icon: "🕵️",
    href: "/kids/games/ai-detective",
    color: "#3b82f6",
    bg: "from-blue-500 to-blue-800",
    x: 20, y: 24,
    desc: "Odkrij, ali je to naredil AI!",
    size: 80,
  },
  {
    id: "quiz",
    name: "AI Kviz",
    icon: "🎯",
    href: "/kids/games/ai-quiz",
    color: "#f97316",
    bg: "from-orange-400 to-red-600",
    x: 76, y: 20,
    desc: "Preizkusi znanje o AI!",
    size: 72,
  },
  {
    id: "friend",
    name: "AI Prijatelji",
    icon: "🤖",
    href: "/kids/ai-friend",
    color: "#a855f7",
    bg: "from-purple-500 to-pink-600",
    x: 71, y: 68,
    desc: "Ustvari svojega AI prijatelja!",
    size: 76,
  },
  {
    id: "patterns",
    name: "Vzorci",
    icon: "🧠",
    href: "/kids/games/pattern-training",
    color: "#22c55e",
    bg: "from-green-400 to-teal-600",
    x: 22, y: 70,
    desc: "Nauči AI prepoznavati vzorce!",
    size: 72,
  },
]

// Fixed star field — no Math.random() to avoid hydration mismatch
const STARS = [
  { x: 6,  y: 8,  r: 1.5, d: 0 },   { x: 18, y: 3,  r: 1,   d: 0.5 },
  { x: 33, y: 11, r: 2,   d: 1 },   { x: 47, y: 5,  r: 1.5, d: 0.2 },
  { x: 58, y: 14, r: 1,   d: 0.8 }, { x: 72, y: 6,  r: 2,   d: 1.4 },
  { x: 84, y: 9,  r: 1.5, d: 0.3 }, { x: 93, y: 22, r: 1,   d: 0.6 },
  { x: 4,  y: 38, r: 2,   d: 1.2 }, { x: 44, y: 44, r: 1,   d: 0.9 },
  { x: 57, y: 37, r: 1.5, d: 0.4 }, { x: 81, y: 48, r: 1,   d: 1.1 },
  { x: 92, y: 58, r: 2,   d: 0.7 }, { x: 11, y: 78, r: 1,   d: 1.3 },
  { x: 36, y: 85, r: 1.5, d: 0.1 }, { x: 53, y: 91, r: 2,   d: 0.5 },
  { x: 68, y: 82, r: 1,   d: 0.9 }, { x: 87, y: 88, r: 1.5, d: 0.2 },
  { x: 26, y: 96, r: 1,   d: 1.5 }, { x: 61, y: 97, r: 2,   d: 0.8 },
  { x: 78, y: 55, r: 1,   d: 0.4 }, { x: 14, y: 52, r: 1.5, d: 1.0 },
  { x: 50, y: 60, r: 1,   d: 0.6 }, { x: 95, y: 73, r: 2,   d: 1.3 },
]

const BYTE_MESSAGES: Record<number, string[]> = {
  0: ["Gremo na detektivsko misijo! 🕵️", "Pripravi se — tu so skrivnosti!", "Na planetu Detektiv te čaka uganka!"],
  1: ["Čas za kviz! Koliko veš o AI? 🎯", "Na planetu Kviz te čaka izziv!", "Pokažimo kaj znamo!"],
  2: ["Ustvari svojega AI prijatelja! 🤖", "Na planetu Prijatelji je zabavno!", "Kateri AI bo tvoj naslednji?"],
  3: ["Vzorci so osnova AI! 🧠", "Na planetu Vzorci se AI uči od tebe!", "Poišči vzorec in zmagai!"],
}

function randomMsg(idx: number, seed: number) {
  const msgs = BYTE_MESSAGES[idx]
  return msgs[seed % msgs.length]
}

export function AdventureMap() {
  const [byteAt, setByteAt] = useState(0)
  const [isTraveling, setIsTraveling] = useState(false)
  const [hovered, setHovered] = useState<number | null>(null)
  const [msgSeed] = useState(1)
  const router = useRouter()

  const travelTo = useCallback((idx: number) => {
    if (isTraveling) return
    if (idx === byteAt) {
      router.push(PLANETS[idx].href)
      return
    }
    setIsTraveling(true)
    setByteAt(idx)
    setTimeout(() => {
      setIsTraveling(false)
      router.push(PLANETS[idx].href)
    }, 1000)
  }, [isTraveling, byteAt, router])

  const target = PLANETS[byteAt]

  return (
    <div className="space-y-3">
      {/* Map container */}
      <div
        className="relative w-full rounded-3xl overflow-hidden select-none"
        style={{
          height: 400,
          background: "radial-gradient(ellipse at 40% 30%, #1e1b4b 0%, #0a0a1a 75%)",
        }}
      >
        {/* Stars */}
        {STARS.map((s, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: s.r * 2,
              height: s.r * 2,
              opacity: 0.3 + (i % 4) * 0.15,
              animation: `pulse ${2 + s.d}s ease-in-out ${s.d}s infinite`,
            }}
          />
        ))}

        {/* Nebula blobs */}
        <div className="absolute rounded-full opacity-10 blur-3xl" style={{ width: 200, height: 200, background: "#6366f1", left: "30%", top: "10%" }} />
        <div className="absolute rounded-full opacity-8 blur-3xl"  style={{ width: 160, height: 160, background: "#a855f7", left: "60%", top: "50%" }} />

        {/* SVG: orbit paths between planets */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {PLANETS.map((p, i) => {
            const next = PLANETS[(i + 1) % PLANETS.length]
            return (
              <line
                key={i}
                x1={p.x} y1={p.y}
                x2={next.x} y2={next.y}
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="0.4"
                strokeDasharray="1.5 2"
              />
            )
          })}
        </svg>

        {/* Planets */}
        {PLANETS.map((planet, i) => {
          const isActive = byteAt === i
          const isHovered = hovered === i
          const sz = planet.size
          return (
            <button
              key={planet.id}
              onClick={() => travelTo(i)}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              disabled={isTraveling}
              className="absolute focus:outline-none"
              style={{
                left: `${planet.x}%`,
                top: `${planet.y}%`,
                transform: "translate(-50%, -50%)",
                zIndex: isActive ? 10 : 5,
              }}
            >
              {/* Glow ring */}
              <div
                className="absolute rounded-full transition-all duration-500"
                style={{
                  inset: -12,
                  background: planet.color,
                  opacity: isActive ? 0.35 : isHovered ? 0.25 : 0.1,
                  filter: "blur(12px)",
                }}
              />

              {/* Active orbit ring */}
              {isActive && (
                <div
                  className="absolute rounded-full border-2 border-white/30"
                  style={{ inset: -10, animation: "spin 8s linear infinite" }}
                />
              )}

              {/* Planet body */}
              <div
                className={`relative rounded-full bg-gradient-to-br ${planet.bg} flex items-center justify-center shadow-2xl transition-all duration-300 border-2`}
                style={{
                  width: sz,
                  height: sz,
                  fontSize: sz * 0.42,
                  borderColor: isActive ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.2)",
                  transform: isHovered && !isTraveling ? "scale(1.12)" : "scale(1)",
                  boxShadow: isActive ? `0 0 30px ${planet.color}88` : undefined,
                }}
              >
                {planet.icon}
              </div>

              {/* Label */}
              <div className="mt-2 text-center pointer-events-none">
                <p className="text-white text-xs font-bold drop-shadow-lg leading-tight">{planet.name}</p>
                {isHovered && !isTraveling && (
                  <p className="text-white/60 text-xs mt-0.5">{planet.desc}</p>
                )}
              </div>
            </button>
          )
        })}

        {/* Byte rocket — slides between planets */}
        <div
          className="absolute pointer-events-none z-20"
          style={{
            left: `${target.x}%`,
            top: `${target.y}%`,
            transform: `translate(-50%, -160%) ${isTraveling ? "scale(1.4)" : "scale(1)"}`,
            transition: "left 1s cubic-bezier(0.4,0,0.2,1), top 1s cubic-bezier(0.4,0,0.2,1), transform 0.3s ease",
            filter: "drop-shadow(0 0 10px rgba(255,200,80,0.9))",
            fontSize: 28,
          }}
        >
          {isTraveling ? "🚀" : "🚀"}
        </div>

        {/* Bottom HUD — Byte speech */}
        <div className="absolute bottom-3 left-3 right-3">
          <div className="bg-black/40 backdrop-blur-sm border border-white/15 rounded-2xl px-4 py-2.5 flex items-center gap-3">
            <span className="text-xl flex-shrink-0">🤖</span>
            <p className="text-white text-sm font-medium leading-snug">
              {isTraveling
                ? `Byte leti na "${target.name}"... 🚀`
                : randomMsg(byteAt, msgSeed)}
            </p>
            {!isTraveling && (
              <span className="ml-auto text-white/50 text-xs flex-shrink-0">klikni planet →</span>
            )}
          </div>
        </div>
      </div>

      {/* Planet legend / quick nav below map */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {PLANETS.map((planet, i) => (
          <button
            key={planet.id}
            onClick={() => travelTo(i)}
            disabled={isTraveling}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-sm font-semibold transition-all ${
              byteAt === i
                ? "bg-white text-gray-900 border-white shadow-lg scale-105"
                : "bg-white/10 text-white border-white/20 hover:bg-white/20"
            }`}
          >
            <span>{planet.icon}</span>
            <span className="truncate">{planet.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
