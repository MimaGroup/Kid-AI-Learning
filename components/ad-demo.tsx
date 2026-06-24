"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"

// Points awarded when leaving each station
const STATION_POINTS = [15, 10, 12]

// Byte's speech per frame (station-step)
const BYTE: Record<string, string> = {
  "0-0": "Pozdravljeni! Sem Byte 🤖 Skupaj poiščiva, ali je to sliko naredil človek ali umetna inteligenca!",
  "0-1": "Dobro opaziš namige! Katera teorija drži?",
  "0-2": "Bravo! Nepravilne sence in ponavljajoče se ozadje izdajo AI sliko! 🕵️",
  "1-0": "Kviz čas! Katera od teh naprav ni umetna inteligenca?",
  "1-1": "Hmm — dobra izbira, poglejmo razlago...",
  "1-2": "Točno! Kalkulator ne razmišlja — samo računa po pravilih. ⭐",
  "2-0": "Vzorci so osnova vsakega AI sistema! Kaj pride naslednje v tem zaporedju?",
  "2-1": "Odlično! Zaporedje se izmenjuje rdeča–modra–rdeča–modra...",
  "2-2": "Vzorce prepoznaš hitreje kot marsikateri odrasel! Si pravi vzorčni mojster! 🔥",
}

const STATIONS = [
  { icon: "🕵️", name: "AI Detektiv", building: "🏛️" },
  { icon: "🎯", name: "AI Kviz",      building: "🏫" },
  { icon: "🧠", name: "Vzorci",       building: "🔬" },
]

// ─── Activity content ────────────────────────────────────────────────────────

function Detective({ step }: { step: number }) {
  if (step === 0) return (
    <div className="space-y-3 animate-slide-up">
      <div className="flex items-center gap-2 mb-3">
        <span className="bg-purple-100 text-purple-700 text-xs font-bold px-2.5 py-0.5 rounded-full">PRIMER #7</span>
        <span className="text-xs text-gray-400">Fotografija mestnega parka</span>
      </div>
      <div className="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-3">
        <p className="text-xs font-bold text-purple-700 mb-1">🔍 Namig 1</p>
        <p className="text-sm text-gray-700">Osvetlitev je nenavadna — drevesom manjkajo sence.</p>
      </div>
      <div className="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-3">
        <p className="text-xs font-bold text-purple-700 mb-1">🔍 Namig 2</p>
        <p className="text-sm text-gray-700">Ozadje se vzorčasto ponavlja — kot tapeta.</p>
      </div>
      <p className="text-xs text-center text-gray-400 pt-1">Byte preučuje dokaze...</p>
    </div>
  )

  if (step === 1) return (
    <div className="space-y-3 animate-slide-up">
      <p className="text-sm font-semibold text-gray-700 mb-2">Tvoja teorija:</p>
      <div className="flex flex-col gap-2">
        <div className="px-4 py-3 rounded-xl border-2 border-purple-500 bg-purple-50 text-purple-800 font-semibold text-sm flex items-center gap-3 cursor-default">
          <span className="w-5 h-5 rounded-full bg-purple-600 flex-shrink-0 flex items-center justify-center">
            <span className="text-white text-xs">✓</span>
          </span>
          🤖 To je ustvarila umetna inteligenca!
        </div>
        <div className="px-4 py-3 rounded-xl border border-gray-200 text-gray-400 text-sm flex items-center gap-3 cursor-default">
          <span className="w-5 h-5 rounded-full border-2 border-gray-300 flex-shrink-0" />
          👤 To je naredil človek.
        </div>
      </div>
    </div>
  )

  return (
    <div className="text-center space-y-3 animate-slide-up py-2">
      <div className="text-4xl">🎉</div>
      <p className="font-bold text-green-700 text-lg">Pravilno!</p>
      <p className="text-sm text-gray-600 leading-relaxed max-w-xs mx-auto">
        Nepravilne sence in ponavljajoče ozadje sta klasična znaka AI generiranja slik.
      </p>
      <div className="inline-flex items-center gap-2 bg-yellow-50 border border-yellow-200 rounded-full px-4 py-1.5">
        <span className="text-base">🏅</span>
        <span className="text-sm font-bold text-yellow-800">+15 točk · Značka: Detektiv</span>
      </div>
    </div>
  )
}

function Quiz({ step }: { step: number }) {
  const options = ["Glasovni asistent", "Kalkulator", "Priporočilni algoritem"]
  const correct = 1

  if (step === 0) return (
    <div className="space-y-3 animate-slide-up">
      <div className="flex items-center gap-2 mb-2">
        <span className="bg-cyan-100 text-cyan-700 text-xs font-bold px-2.5 py-0.5 rounded-full">VPRAŠANJE 3 / 5</span>
      </div>
      <p className="text-sm font-semibold text-gray-800 leading-relaxed">
        Katera naprava <span className="text-cyan-600 font-bold underline underline-offset-2">NI</span> primer umetne inteligence?
      </p>
      <div className="space-y-2 mt-2">
        {options.map((opt, i) => (
          <div key={i} className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-600 flex items-center gap-3">
            <span className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-xs text-gray-400 font-bold flex-shrink-0">
              {String.fromCharCode(65 + i)}
            </span>
            {opt}
          </div>
        ))}
      </div>
    </div>
  )

  if (step === 1) return (
    <div className="space-y-3 animate-slide-up">
      <p className="text-sm font-semibold text-gray-800 leading-relaxed">
        Katera naprava <span className="text-cyan-600 font-bold underline underline-offset-2">NI</span> primer umetne inteligence?
      </p>
      <div className="space-y-2 mt-2">
        {options.map((opt, i) => (
          <div key={i} className={`px-4 py-2.5 rounded-xl border text-sm flex items-center gap-3 transition-all ${
            i === correct
              ? "border-2 border-green-500 bg-green-50 text-green-800 font-semibold"
              : "border border-gray-100 text-gray-300"
          }`}>
            <span className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold flex-shrink-0 ${
              i === correct ? "border-green-500 bg-green-500 text-white" : "border-gray-200 text-gray-300"
            }`}>
              {i === correct ? "✓" : String.fromCharCode(65 + i)}
            </span>
            {opt}
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="text-center space-y-3 animate-slide-up py-2">
      <div className="text-4xl">⭐</div>
      <p className="font-bold text-green-700 text-lg">Točno!</p>
      <p className="text-sm text-gray-600 leading-relaxed max-w-xs mx-auto">
        Kalkulator deluje po fiksnih pravilih — ne uči se in ne prilagaja odločitev. AI to zna.
      </p>
      <div className="inline-flex items-center gap-2 bg-yellow-50 border border-yellow-200 rounded-full px-4 py-1.5">
        <span className="text-base">⭐</span>
        <span className="text-sm font-bold text-yellow-800">+10 točk</span>
      </div>
    </div>
  )
}

function Patterns({ step }: { step: number }) {
  const seq = ["🔴", "🔵", "🔴", "🔵", "🔴"]
  const opts = ["🔴", "🔵", "🟡"]
  const correct = 1

  if (step === 0) return (
    <div className="space-y-4 animate-slide-up">
      <div className="flex items-center gap-2">
        <span className="bg-green-100 text-green-700 text-xs font-bold px-2.5 py-0.5 rounded-full">VZOREC 2 / 4</span>
      </div>
      <div className="flex items-center justify-center gap-2 py-2 flex-wrap">
        {seq.map((s, i) => (
          <span key={i} className="text-3xl">{s}</span>
        ))}
        <span className="w-10 h-10 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center text-xl text-gray-300 flex-shrink-0">?</span>
      </div>
      <p className="text-sm text-center text-gray-500">Izberi naslednji člen v vzorcu:</p>
      <div className="flex justify-center gap-3">
        {opts.map((opt, i) => (
          <div key={i} className="w-14 h-14 rounded-2xl border-2 border-gray-200 hover:border-green-400 flex items-center justify-center text-3xl cursor-default transition-all">
            {opt}
          </div>
        ))}
      </div>
    </div>
  )

  if (step === 1) return (
    <div className="space-y-4 animate-slide-up">
      <div className="flex items-center justify-center gap-2 py-2 flex-wrap">
        {seq.map((s, i) => (
          <span key={i} className="text-3xl">{s}</span>
        ))}
        <span className="w-10 h-10 rounded-xl border-2 border-green-500 bg-green-50 flex items-center justify-center text-2xl flex-shrink-0">🔵</span>
      </div>
      <div className="flex justify-center gap-3">
        {opts.map((opt, i) => (
          <div key={i} className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center text-3xl transition-all ${
            i === correct
              ? "border-green-500 bg-green-50 shadow-md shadow-green-100 scale-110"
              : "border-gray-100 opacity-30"
          }`}>
            {opt}
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="text-center space-y-3 animate-slide-up py-2">
      <div className="text-4xl">🧠</div>
      <p className="font-bold text-green-700 text-lg">Mojster vzorcev!</p>
      <p className="text-sm text-gray-600 leading-relaxed max-w-xs mx-auto">
        Vzorec se izmenjuje rdeča–modra. Naslednji je <span className="font-bold">🔵 modra</span>.
      </p>
      <div className="inline-flex items-center gap-2 bg-yellow-50 border border-yellow-200 rounded-full px-4 py-1.5">
        <span className="text-base">🧠</span>
        <span className="text-sm font-bold text-yellow-800">+12 točk · Niz: 3 🔥</span>
      </div>
    </div>
  )
}

// ─── Main demo ────────────────────────────────────────────────────────────────

type Frame = { station: 0|1|2; step: 0|1|2; score: number; streak: number; fading: boolean }

export function AdDemo() {
  const [f, setF] = useState<Frame>({ station: 0, step: 0, score: 0, streak: 0, fading: false })
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const tick = useCallback(() => {
    setF(prev => ({ ...prev, fading: true }))
    setTimeout(() => {
      setF(prev => {
        if (prev.step < 2) return { ...prev, step: (prev.step + 1) as 0|1|2, fading: false }
        const next = ((prev.station + 1) % 3) as 0|1|2
        return { station: next, step: 0, score: prev.score + STATION_POINTS[prev.station], streak: prev.streak + 1, fading: false }
      })
    }, 180)
  }, [])

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(tick, 3200)
  }, [tick])

  useEffect(() => {
    startTimer()
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [startTimer])

  const jumpTo = (s: 0|1|2) => {
    setF(prev => ({ ...prev, fading: true }))
    setTimeout(() => {
      setF(prev => ({ ...prev, station: s, step: 0, fading: false }))
      startTimer()
    }, 180)
  }

  // Progress dots (which step within current station)
  const dots = [0, 1, 2].map(i => i === f.step)

  // Vehicle left % position
  const busLeft = ["13%", "50%", "87%"][f.station]

  return (
    <div className="bg-gray-950 rounded-3xl overflow-hidden shadow-2xl border border-gray-800 max-w-xl mx-auto select-none">

      {/* ── Game header ── */}
      <div className="bg-gray-900 px-5 py-3 flex items-center justify-between border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-900 flex items-center justify-center text-xl">🤖</div>
          <div>
            <p className="text-white font-bold text-sm leading-none">Byte</p>
            <p className="text-gray-500 text-xs mt-0.5">AI učni pomočnik</p>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <div className="text-center">
            <p className="text-yellow-400 font-extrabold text-xl leading-none tabular-nums">{f.score}</p>
            <p className="text-gray-600 text-xs mt-0.5">točk</p>
          </div>
          <div className="text-center">
            <p className="text-orange-400 font-extrabold text-xl leading-none">{f.streak}🔥</p>
            <p className="text-gray-600 text-xs mt-0.5">niz</p>
          </div>
        </div>
      </div>

      {/* ── Byte speech bubble ── */}
      <div className="bg-indigo-950 px-5 pt-4 pb-3">
        <div className="flex gap-3 items-start">
          <div className="w-2 h-2 rounded-full bg-indigo-400 mt-2 flex-shrink-0 animate-pulse" />
          <p className="text-indigo-200 text-sm leading-relaxed min-h-[2.5rem] transition-opacity duration-200"
             style={{ opacity: f.fading ? 0 : 1 }}>
            {BYTE[`${f.station}-${f.step}`]}
          </p>
        </div>
      </div>

      {/* ── Activity card ── */}
      <div className="bg-white mx-4 my-4 rounded-2xl p-5 min-h-[200px]">
        <div className="transition-opacity duration-200" style={{ opacity: f.fading ? 0 : 1 }}>
          {f.station === 0 && <Detective step={f.step} />}
          {f.station === 1 && <Quiz step={f.step} />}
          {f.station === 2 && <Patterns step={f.step} />}
        </div>
      </div>

      {/* ── Step dots ── */}
      <div className="flex justify-center gap-2 mb-1">
        {dots.map((active, i) => (
          <div key={i} className={`rounded-full transition-all duration-300 ${active ? "w-5 h-2 bg-indigo-400" : "w-2 h-2 bg-gray-700"}`} />
        ))}
      </div>

      {/* ── Overcooked-style track ── */}
      <div className="px-4 pb-5 pt-2">
        <div className="bg-gray-900 rounded-2xl p-4 border border-gray-800">

          {/* Road + stations + bus */}
          <div className="relative h-20">

            {/* Road surface */}
            <div className="absolute top-1/2 left-[12%] right-[12%] -translate-y-1/2 h-3 bg-gray-700 rounded-full" />

            {/* Road dashes */}
            <div className="absolute top-1/2 left-[20%] right-[20%] -translate-y-1/2 flex justify-around items-center h-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-5 h-0.5 bg-gray-500 rounded-full" />
              ))}
            </div>

            {/* Bus — slides via left + transition */}
            <div
              className="absolute top-1/2 -translate-y-[65%] -translate-x-1/2 text-2xl z-20 pointer-events-none"
              style={{
                left: busLeft,
                transition: "left 0.75s cubic-bezier(0.68,-0.55,0.27,1.55)",
                filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.6))",
              }}
            >
              🚌
            </div>

            {/* Station buildings */}
            {STATIONS.map((s, i) => {
              const leftPct = ["13%", "50%", "87%"][i]
              const isActive = f.station === i
              return (
                <button
                  key={i}
                  onClick={() => jumpTo(i as 0|1|2)}
                  className="absolute top-1/2 -translate-x-1/2 flex flex-col items-center gap-0.5 focus:outline-none group"
                  style={{ left: leftPct, transform: "translateX(-50%) translateY(-75%)" }}
                  aria-label={`Pojdi na ${s.name}`}
                >
                  <div className={`text-2xl transition-all duration-500 ${isActive ? "scale-125 drop-shadow-lg" : "scale-100 opacity-60 group-hover:opacity-90 group-hover:scale-110"}`}>
                    {s.building}
                  </div>
                  {isActive && (
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
                  )}
                </button>
              )
            })}
          </div>

          {/* Station labels */}
          <div className="grid grid-cols-3 mt-1">
            {STATIONS.map((s, i) => (
              <button
                key={i}
                onClick={() => jumpTo(i as 0|1|2)}
                className={`text-center text-xs font-medium transition-colors py-1 rounded-lg focus:outline-none ${
                  f.station === i ? "text-white" : "text-gray-600 hover:text-gray-400"
                }`}
              >
                {s.icon} {s.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="px-4 pb-5">
        <Link
          href="/auth/sign-up"
          className="block w-full bg-purple-600 hover:bg-purple-700 text-white text-center py-3.5 rounded-2xl font-bold text-sm transition-colors"
        >
          Preizkusi res — Začni brezplačno →
        </Link>
        <p className="text-center text-gray-600 text-xs mt-2">14 dni brezplačno · Kreditna kartica ni potrebna</p>
      </div>
    </div>
  )
}
