"use client"

import { useState } from "react"
import Link from "next/link"

interface CodeChallenge {
  id: string
  title: string
  description: string
  instructions: string
  codeBlocks: { id: string; code: string }[]
  correctOrder: string[]
  explanation: string
}

const STARS = [
  {x:5,y:8},{x:18,y:82},{x:28,y:22},{x:38,y:58},{x:48,y:12},
  {x:58,y:72},{x:68,y:38},{x:78,y:88},{x:88,y:18},{x:94,y:52},
  {x:12,y:48},{x:52,y:42},{x:82,y:62},{x:32,y:78},{x:72,y:8},
  {x:22,y:95},{x:65,y:95},{x:44,y:95},
]

const spaceStyle = { background: "radial-gradient(ellipse at 40% 30%, #1a1060 0%, #0a0a1a 75%)" }

export default function CodingBasicsPage() {
  const [currentChallenge, setCurrentChallenge] = useState(0)
  const [selectedBlocks, setSelectedBlocks] = useState<string[]>([])
  const [availableBlocks, setAvailableBlocks] = useState<{ id: string; code: string }[]>([])
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [score, setScore] = useState(0)
  const [gameComplete, setGameComplete] = useState(false)

  const challenges: CodeChallenge[] = [
    {
      id: "robot-walk",
      title: "Premakni robota",
      description: "Razvrsti bloke kode, da bo robot hodil naprej!",
      instructions: "Klikni bloke v pravem vrstnem redu za ustvaritev programa",
      codeBlocks: [
        { id: "1", code: "ZAČNI" },
        { id: "2", code: "Pojdi naprej" },
        { id: "3", code: "Pojdi naprej" },
        { id: "4", code: "USTAVI SE" },
      ],
      correctOrder: ["1", "2", "3", "4"],
      explanation: "Programi se izvajajo od zgoraj navzdol. Začnemo, se dvakrat premaknemo, nato ustavimo!",
    },
    {
      id: "if-statement",
      title: "Sprejmi odločitev",
      description: "Pomagaj robotu odločiti, kaj storiti!",
      instructions: "Ustvari program, ki preveri ali dežuje",
      codeBlocks: [
        { id: "1", code: "ČE dežuje" },
        { id: "2", code: "Vzemi dežnik" },
        { id: "3", code: "SICER" },
        { id: "4", code: "Obleči sončna očala" },
      ],
      correctOrder: ["1", "2", "3", "4"],
      explanation: "Stavki ČE pomagajo računalnikom sprejemati odločitve na podlagi pogojev!",
    },
    {
      id: "loop",
      title: "Ponavljaj dejanja",
      description: "Uporabi zanko za ponavljanje dejanj!",
      instructions: "Naredi, da robot 3-krat skoči",
      codeBlocks: [
        { id: "1", code: "PONOVI 3-krat" },
        { id: "2", code: "Skoči" },
        { id: "3", code: "KONEC PONAVLJANJA" },
      ],
      correctOrder: ["1", "2", "3"],
      explanation: "Zanke nam pomagajo ponavljati dejanja, ne da bi pisali isto kodo večkrat!",
    },
  ]

  const challenge = challenges[currentChallenge]

  useState(() => {
    setAvailableBlocks([...challenge.codeBlocks].sort(() => Math.random() - 0.5))
  })

  const handleSelectBlock = (block: { id: string; code: string }) => {
    setSelectedBlocks([...selectedBlocks, block.id])
    setAvailableBlocks(availableBlocks.filter((b) => b.id !== block.id))
  }

  const handleRemoveBlock = (blockId: string) => {
    const block = challenge.codeBlocks.find((b) => b.id === blockId)
    if (block) {
      setSelectedBlocks(selectedBlocks.filter((id) => id !== blockId))
      setAvailableBlocks([...availableBlocks, block])
    }
  }

  const handleCheckAnswer = () => {
    const correct = JSON.stringify(selectedBlocks) === JSON.stringify(challenge.correctOrder)
    setIsCorrect(correct)
    setShowResult(true)
    if (correct) setScore(score + 1)
  }

  const handleNextChallenge = () => {
    if (currentChallenge < challenges.length - 1) {
      const nextChallenge = challenges[currentChallenge + 1]
      setCurrentChallenge(currentChallenge + 1)
      setSelectedBlocks([])
      setAvailableBlocks([...nextChallenge.codeBlocks].sort(() => Math.random() - 0.5))
      setShowResult(false)
      setIsCorrect(false)
    } else {
      setGameComplete(true)
    }
  }

  const handleRestart = () => {
    setCurrentChallenge(0)
    setSelectedBlocks([])
    setAvailableBlocks([...challenges[0].codeBlocks].sort(() => Math.random() - 0.5))
    setShowResult(false)
    setIsCorrect(false)
    setScore(0)
    setGameComplete(false)
  }

  if (gameComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative" style={spaceStyle}>
        {STARS.map((s, i) => (
          <div key={i} className="absolute rounded-full bg-white pointer-events-none"
            style={{ left: `${s.x}%`, top: `${s.y}%`, width: 2, height: 2, opacity: 0.1 + (i % 4) * 0.07 }} />
        ))}
        <div className="relative z-10 max-w-md w-full text-center rounded-3xl p-10"
          style={{ background: "rgba(8,8,30,0.9)", border: "1px solid rgba(168,85,247,0.3)", boxShadow: "0 0 40px rgba(168,85,247,0.1)" }}>
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-white mb-2">Izziv kodiranja končan!</h2>
          <p className="text-4xl font-bold mb-1" style={{ color: "#a855f7" }}>{score}/{challenges.length}</p>
          <p className="text-white/50 text-sm mb-6">
            {score === challenges.length ? "Popolno! Si zvezdica kodiranja!" : "Odlično učenje! Nadaljuj z vadbo!"}
          </p>
          <div className="rounded-2xl p-5 mb-6 text-left"
            style={{ background: "rgba(168,85,247,0.08)", border: "1px solid rgba(168,85,247,0.2)" }}>
            <p className="text-purple-300 font-bold text-sm mb-3">Naučil si se:</p>
            <ul className="text-white/60 text-sm space-y-1.5">
              <li>✓ Kako zaporedno izvajati ukaze</li>
              <li>✓ Kako delujejo stavki ČE</li>
              <li>✓ Kako zanke ponavljajo dejanja</li>
            </ul>
          </div>
          <div className="flex gap-3">
            <button onClick={handleRestart}
              className="flex-1 py-3 rounded-2xl font-bold text-white transition-all active:scale-95"
              style={{ background: "linear-gradient(135deg, #7C3AED, #a855f7)" }}>
              Poskusi znova
            </button>
            <Link href="/kids/activities"
              className="flex-1 py-3 rounded-2xl font-bold text-sm text-center transition-all active:scale-95"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.6)" }}>
              ← Dejavnosti
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative p-4 pb-8" style={spaceStyle}>
      {STARS.map((s, i) => (
        <div key={i} className="absolute rounded-full bg-white pointer-events-none"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: 2, height: 2, opacity: 0.1 + (i % 4) * 0.07 }} />
      ))}

      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="mb-5">
          <Link href="/kids/activities"
            className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors flex items-center gap-1">
            ← Dejavnosti
          </Link>
        </div>

        <div className="rounded-3xl overflow-hidden shadow-2xl"
          style={{ background: "rgba(8,8,30,0.88)", border: "1px solid rgba(168,85,247,0.25)", boxShadow: "0 0 40px rgba(168,85,247,0.08)" }}>

          {/* Header */}
          <div className="px-6 py-4 flex justify-between items-center"
            style={{ background: "rgba(168,85,247,0.15)", borderBottom: "1px solid rgba(168,85,247,0.2)" }}>
            <div className="flex items-center gap-3">
              <span className="text-3xl">💻</span>
              <div>
                <h1 className="text-xl font-bold text-white">Osnove kodiranja</h1>
                <p className="text-purple-400 text-xs font-medium">
                  Izziv {currentChallenge + 1} od {challenges.length}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-white font-bold text-lg">{score}</p>
              <p className="text-white/40 text-xs">točk</p>
            </div>
          </div>

          <div className="p-6 space-y-5">
            {/* Progress bar */}
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(168,85,247,0.15)" }}>
              <div className="h-full rounded-full transition-all duration-500"
                style={{ width: `${((currentChallenge + 1) / challenges.length) * 100}%`, background: "linear-gradient(90deg, #7C3AED, #a855f7)" }} />
            </div>

            {/* Challenge description */}
            <div className="rounded-2xl p-5"
              style={{ background: "rgba(168,85,247,0.08)", border: "1px solid rgba(168,85,247,0.2)" }}>
              <h2 className="text-lg font-bold text-white mb-1">{challenge.title}</h2>
              <p className="text-white/60 text-sm mb-1">{challenge.description}</p>
              <p className="text-purple-400 text-xs">{challenge.instructions}</p>
            </div>

            {!showResult ? (
              <div className="space-y-4">
                {/* Program area */}
                <div className="rounded-2xl p-5"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <p className="text-white/50 text-xs font-semibold mb-3 flex items-center gap-1.5">
                    <span>▶</span> TVOJ PROGRAM:
                  </p>
                  <div className="space-y-2 min-h-[120px] rounded-xl p-3"
                    style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    {selectedBlocks.length === 0 ? (
                      <p className="text-white/20 text-center py-6 text-sm">Klikni bloke spodaj, da jih dodaš...</p>
                    ) : (
                      selectedBlocks.map((blockId) => {
                        const block = challenge.codeBlocks.find((b) => b.id === blockId)
                        return (
                          <div key={blockId} onClick={() => handleRemoveBlock(blockId)}
                            className="rounded-xl p-3 cursor-pointer transition-all hover:opacity-80 active:scale-98"
                            style={{ background: "linear-gradient(135deg, #7C3AED, #a855f7)" }}>
                            <span className="font-mono text-white text-sm">{block?.code}</span>
                          </div>
                        )
                      })
                    )}
                  </div>
                </div>

                {/* Available blocks */}
                <div className="rounded-2xl p-5"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <p className="text-white/50 text-xs font-semibold mb-3">RAZPOLOŽLJIVI BLOKI:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {availableBlocks.map((block) => (
                      <button key={block.id} onClick={() => handleSelectBlock(block)}
                        className="rounded-xl p-3 text-left transition-all hover:scale-[1.02] active:scale-95"
                        style={{ background: "rgba(168,85,247,0.12)", border: "1px solid rgba(168,85,247,0.3)" }}>
                        <span className="font-mono text-white/80 text-sm">{block.code}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setSelectedBlocks([])
                      setAvailableBlocks([...challenge.codeBlocks].sort(() => Math.random() - 0.5))
                    }}
                    className="flex-1 py-3 rounded-2xl font-bold text-sm transition-all active:scale-95"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.6)" }}>
                    Ponastavi
                  </button>
                  <button onClick={handleCheckAnswer}
                    disabled={selectedBlocks.length !== challenge.correctOrder.length}
                    className="flex-1 py-3 rounded-2xl font-bold text-white text-sm transition-all active:scale-95 disabled:opacity-30"
                    style={{ background: "linear-gradient(135deg, #7C3AED, #a855f7)" }}>
                    Zaženi program ▶
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Result */}
                <div className="rounded-2xl p-5 animate-slide-up"
                  style={{
                    background: isCorrect ? "rgba(34,197,94,0.1)" : "rgba(251,191,36,0.1)",
                    border: `1px solid ${isCorrect ? "rgba(34,197,94,0.4)" : "rgba(251,191,36,0.4)"}`,
                  }}>
                  <p className="text-2xl mb-2">{isCorrect ? "✅" : "🔄"}</p>
                  <h3 className="font-bold text-lg mb-1" style={{ color: isCorrect ? "#4ade80" : "#fbbf24" }}>
                    {isCorrect ? "Popolno!" : "Poskusi znova!"}
                  </h3>
                  <p className="text-white/60 text-sm">
                    {isCorrect ? "Tvoj program deluje pravilno!" : "Bloki še niso v pravem vrstnem redu."}
                  </p>
                </div>

                {/* Explanation */}
                <div className="rounded-2xl p-4"
                  style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.3)" }}>
                  <p className="text-blue-300 text-sm leading-relaxed">
                    <span className="font-bold">💡 Razlaga: </span>{challenge.explanation}
                  </p>
                </div>

                <button onClick={handleNextChallenge}
                  className="w-full py-3.5 rounded-2xl font-bold text-white text-sm transition-all active:scale-95"
                  style={{ background: "linear-gradient(135deg, #7C3AED, #a855f7)" }}>
                  {currentChallenge < challenges.length - 1 ? "Naslednji izziv →" : "Poglej rezultate"}
                </button>
              </div>
            )}

            <p className="text-center text-xs text-white/30">
              Rezultat: {score}/{currentChallenge + (showResult && isCorrect ? 1 : 0)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
