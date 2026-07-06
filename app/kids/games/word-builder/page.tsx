"use client"

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"
import { useProgress } from "@/hooks/use-progress"
import { AchievementPopup } from "@/components/achievement-popup"
import { trackActivity, trackGameScore } from "@/lib/analytics"

type GameMode = "spelling" | "unscramble" | "definition"

interface WordChallenge {
  word: string
  definition: string
  scrambled?: string
  options?: string[]
  hint: string
}

const WORD_LISTS = {
  easy: [
    { word: "robot", definition: "Stroj, ki samodejno opravlja naloge", hint: "Začne se z R" },
    { word: "computer", definition: "Elektronska naprava za obdelavo podatkov", hint: "Morda ga právkar uporabljaš" },
    { word: "game", definition: "Dejavnost, ki jo igraš za zabavo", hint: "4 črke" },
    { word: "learn", definition: "Pridobivati znanje ali veščine", hint: "Kar počneš v šoli" },
    { word: "smart", definition: "Imeti inteligenco", hint: "Nasprotje od neumno" },
    { word: "think", definition: "Uporabljati misli", hint: "Kar počnejo možgani" },
    { word: "code", definition: "Navodila za računalnike", hint: "Programerji pišejo to" },
    { word: "data", definition: "Informacije shranjene v računalnikih", hint: "4 črke, začne se z D" },
    { word: "brain", definition: "Organ, ki ti pomaga razmišljati", hint: "V tvoji glavi" },
    { word: "friend", definition: "Nekdo, ki ga imaš rad in mu zaupaš", hint: "Prijatelj" },
  ],
  medium: [
    { word: "algorithm", definition: "Niz korakov za reševanje problema", hint: "Uporablja se v programiranju" },
    { word: "artificial", definition: "Ustvarjen s strani človeka, ni naraven", hint: "AI pomeni to + Intelligence" },
    { word: "technology", definition: "Orodja in stroji, ki nam pomagajo", hint: "Računalniki in telefoni so to" },
    { word: "intelligence", definition: "Sposobnost učenja in razumevanja", hint: "Kar te dela pametnega" },
    { word: "pattern", definition: "Ponavljajoč se dizajn ali zaporedje", hint: "AI išče te" },
    { word: "machine", definition: "Naprava, ki opravlja delo", hint: "Roboti so vrsta tega" },
    { word: "digital", definition: "Računalniška tehnologija", hint: "Nasprotje od analogno" },
    { word: "network", definition: "Povezani računalniki, ki si delijo informacije", hint: "Internet je eden" },
    { word: "program", definition: "Navodila, ki povejo računalniku, kaj naj naredi", hint: "Programska oprema" },
    { word: "creative", definition: "Uporaba domišljije za ustvarjanje novih stvari", hint: "Umetniki so to" },
  ],
  hard: [
    { word: "neural", definition: "Povezano z živci ali možgani", hint: "AI mreže so poimenovane po tem" },
    { word: "recognition", definition: "Prepoznavanje nečesa, kar si že videl", hint: "Prepoznavanje obraza" },
    { word: "automation", definition: "Samodejno opravljanje nalog", hint: "Roboti to počnejo" },
    { word: "prediction", definition: "Ugibanje, kaj se bo zgodilo v prihodnosti", hint: "Vremenska napoved je ___" },
    { word: "processing", definition: "Obdelava in organiziranje informacij", hint: "Kar računalniki počnejo s podatki" },
    { word: "interface", definition: "Način interakcije z računalnikom", hint: "Uporabniški ___" },
    { word: "virtual", definition: "Obstaja v računalnikih, ne fizično", hint: "___ resničnost" },
    { word: "simulation", definition: "Posnemanje resnične situacije", hint: "Pilotski ___ simulator" },
    { word: "optimization", definition: "Narediti nekaj, da deluje čim bolje", hint: "Iskanje najboljše rešitve" },
    { word: "classification", definition: "Razvrščanje stvari v kategorije", hint: "Organiziranje po vrstah" },
  ],
}

const STARS = [
  {x:5,y:8},{x:18,y:82},{x:28,y:22},{x:38,y:58},{x:48,y:12},
  {x:58,y:72},{x:68,y:38},{x:78,y:88},{x:88,y:18},{x:94,y:52},
  {x:12,y:48},{x:52,y:42},{x:82,y:62},{x:32,y:78},{x:72,y:8},
  {x:22,y:95},{x:65,y:95},{x:44,y:95},
]

const spaceStyle = { background: "radial-gradient(ellipse at 40% 30%, #1a1060 0%, #0a0a1a 75%)" }

const MODE_META: Record<GameMode, { icon: string; label: string; desc: string }> = {
  spelling:   { icon: "✍️", label: "Črkovanje",   desc: "Pravilno napiši besedo" },
  unscramble: { icon: "🔀", label: "Razmeši",      desc: "Razvrsti črke" },
  definition: { icon: "📖", label: "Pomen",        desc: "Poveži besedo s pomenom" },
}

export default function WordBuilderPage() {
  const { user, loading } = useAuth()
  const { submitProgress } = useProgress()

  const [gameMode, setGameMode] = useState<GameMode | null>(null)
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("easy")
  const [challenges, setChallenges] = useState<WordChallenge[]>([])
  const [currentChallenge, setCurrentChallenge] = useState(0)
  const [userInput, setUserInput] = useState("")
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [gameComplete, setGameComplete] = useState(false)
  const [newAchievements, setNewAchievements] = useState<any[]>([])
  const [startTime] = useState(Date.now())
  const [gameStarted, setGameStarted] = useState(false)

  const scrambleWord = (word: string): string => {
    const arr = word.split("")
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    const scrambled = arr.join("")
    return scrambled === word ? scrambleWord(word) : scrambled
  }

  const generateWrongOptions = (correctWord: string, allWords: string[]): string[] => {
    const wrong = allWords.filter((w) => w !== correctWord).sort(() => Math.random() - 0.5).slice(0, 3)
    return [correctWord, ...wrong].sort(() => Math.random() - 0.5)
  }

  const startGame = (mode: GameMode, diff: "easy" | "medium" | "hard") => {
    setGameMode(mode)
    setDifficulty(diff)
    const wordList = WORD_LISTS[diff]
    const selectedWords = [...wordList].sort(() => Math.random() - 0.5).slice(0, 8)
    const generatedChallenges: WordChallenge[] = selectedWords.map((item) => {
      const challenge: WordChallenge = { word: item.word, definition: item.definition, hint: item.hint }
      if (mode === "unscramble") challenge.scrambled = scrambleWord(item.word)
      else if (mode === "definition") challenge.options = generateWrongOptions(item.word, wordList.map((w) => w.word))
      return challenge
    })
    setChallenges(generatedChallenges)
    setGameStarted(true)
    setCurrentChallenge(0)
    setScore(0)
    setGameComplete(false)
    setNewAchievements([])
    setUserInput("")
    setSelectedOption(null)
    setShowResult(false)
    trackActivity("started", "Word Builder", { game_mode: mode, difficulty: diff, word_count: generatedChallenges.length })
  }

  const handleSubmitAnswer = () => {
    const challenge = challenges[currentChallenge]
    let isCorrect = false
    if (gameMode === "spelling" || gameMode === "unscramble") {
      isCorrect = userInput.toLowerCase().trim() === challenge.word.toLowerCase()
    } else if (gameMode === "definition") {
      isCorrect = selectedOption?.toLowerCase() === challenge.word.toLowerCase()
    }
    if (isCorrect) setScore(score + 1)
    setShowResult(true)
  }

  const handleNextChallenge = async () => {
    if (currentChallenge < challenges.length - 1) {
      setCurrentChallenge(currentChallenge + 1)
      setUserInput("")
      setSelectedOption(null)
      setShowResult(false)
    } else {
      setGameComplete(true)
      const timeSpent = Math.floor((Date.now() - startTime) / 1000)
      trackGameScore("Word Builder", score, undefined, timeSpent)
      trackActivity("completed", "Word Builder", { game_mode: gameMode ?? undefined, difficulty, score, total_words: challenges.length, time_spent: timeSpent, percentage: Math.round((score / challenges.length) * 100) })
      if (user) {
        const achievements = await submitProgress("word_builder", score, challenges.length, timeSpent)
        setNewAchievements(achievements)
      }
    }
  }

  const resetGame = () => {
    setGameStarted(false)
    setGameMode(null)
    setCurrentChallenge(0)
    setUserInput("")
    setSelectedOption(null)
    setShowResult(false)
    setScore(0)
    setGameComplete(false)
    setNewAchievements([])
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={spaceStyle}>
        <div className="text-center">
          <div className="text-5xl mb-4 animate-bounce">📚</div>
          <p className="text-purple-300 font-semibold">Nalaganje...</p>
        </div>
      </div>
    )
  }

  if (!gameStarted) {
    return (
      <div className="min-h-screen relative p-4 pb-8" style={spaceStyle}>
        {STARS.map((s, i) => (
          <div key={i} className="absolute rounded-full bg-white pointer-events-none"
            style={{ left: `${s.x}%`, top: `${s.y}%`, width: 2, height: 2, opacity: 0.1 + (i % 4) * 0.07 }} />
        ))}
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="mb-6">
            <Link href="/kids/activities"
              className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors flex items-center gap-1">
              ← Dejavnosti
            </Link>
          </div>
          <div className="rounded-3xl p-8"
            style={{ background: "rgba(8,8,30,0.88)", border: "1px solid rgba(251,191,36,0.2)", boxShadow: "0 0 40px rgba(251,191,36,0.05)" }}>
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">📚</div>
              <h1 className="text-3xl font-bold text-white mb-2">Graditelj besed</h1>
              <p className="text-white/50 text-sm">Izberi način igre in težavnost!</p>
            </div>

            <div className="mb-6">
              <p className="text-white/60 font-medium text-sm text-center mb-4">Izberi način igre</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {(Object.keys(MODE_META) as GameMode[]).map((mode) => {
                  const meta = MODE_META[mode]
                  const active = gameMode === mode
                  return (
                    <button key={mode} onClick={() => setGameMode(mode)}
                      className="p-5 rounded-2xl text-center transition-all"
                      style={{
                        background: active ? "rgba(251,191,36,0.2)" : "rgba(255,255,255,0.04)",
                        border: active ? "1px solid rgba(251,191,36,0.5)" : "1px solid rgba(255,255,255,0.1)",
                        boxShadow: active ? "0 0 16px rgba(251,191,36,0.15)" : "none",
                      }}>
                      <div className="text-4xl mb-2">{meta.icon}</div>
                      <h4 className="text-base font-bold text-white mb-1">{meta.label}</h4>
                      <p className="text-xs text-white/50">{meta.desc}</p>
                    </button>
                  )
                })}
              </div>
            </div>

            {gameMode && (
              <div>
                <p className="text-white/60 font-medium text-sm text-center mb-4">Izberi težavnost</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {(["easy", "medium", "hard"] as const).map((diff) => {
                    const meta = {
                      easy:   { icon: "🌱", label: "Lahka",   desc: "Preproste besede",  color: "34,197,94" },
                      medium: { icon: "⭐", label: "Srednja", desc: "Tehniške besede",    color: "59,130,246" },
                      hard:   { icon: "🚀", label: "Težka",  desc: "Napredni izrazi",    color: "168,85,247" },
                    }[diff]
                    return (
                      <button key={diff} onClick={() => startGame(gameMode, diff)}
                        className="p-5 rounded-2xl text-center transition-all hover:scale-[1.02] active:scale-95"
                        style={{ background: `rgba(${meta.color},0.12)`, border: `1px solid rgba(${meta.color},0.3)` }}>
                        <div className="text-3xl mb-2">{meta.icon}</div>
                        <p className="font-bold text-white text-sm">{meta.label}</p>
                        <p className="text-xs text-white/40">{meta.desc}</p>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  if (gameComplete) {
    const percentage = Math.round((score / challenges.length) * 100)
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative" style={spaceStyle}>
        {STARS.map((s, i) => (
          <div key={i} className="absolute rounded-full bg-white pointer-events-none"
            style={{ left: `${s.x}%`, top: `${s.y}%`, width: 2, height: 2, opacity: 0.1 + (i % 4) * 0.07 }} />
        ))}
        <AchievementPopup achievements={newAchievements} onClose={() => setNewAchievements([])} />
        <div className="relative z-10 max-w-md w-full text-center rounded-3xl p-10"
          style={{ background: "rgba(8,8,30,0.9)", border: "1px solid rgba(251,191,36,0.3)", boxShadow: "0 0 40px rgba(251,191,36,0.08)" }}>
          <div className="text-6xl mb-4">
            {percentage >= 90 ? "🏆" : percentage >= 70 ? "⭐" : percentage >= 50 ? "👍" : "📚"}
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Igra končana!</h2>
          <p className="text-white/60 mb-1">Dosegel si</p>
          <p className="text-4xl font-bold mb-1" style={{ color: "#fbbf24" }}>{score}</p>
          <p className="text-white/40 text-sm mb-6">od {challenges.length} besed · {percentage}%</p>
          <div className="flex flex-col gap-3">
            <button onClick={resetGame}
              className="w-full py-3 rounded-2xl font-bold text-white transition-all active:scale-95"
              style={{ background: "linear-gradient(135deg, #7C3AED, #a855f7)" }}>
              Igraj znova
            </button>
            <Link href="/kids/activities"
              className="block w-full py-3 rounded-2xl font-bold text-sm text-center transition-all active:scale-95"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.6)" }}>
              ← Dejavnosti
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const challenge = challenges[currentChallenge]
  const isCorrect = gameMode === "definition"
    ? selectedOption?.toLowerCase() === challenge.word.toLowerCase()
    : userInput.toLowerCase().trim() === challenge.word.toLowerCase()
  const pct = Math.round(((currentChallenge + 1) / challenges.length) * 100)

  return (
    <div className="min-h-screen relative p-4 pb-8" style={spaceStyle}>
      {STARS.map((s, i) => (
        <div key={i} className="absolute rounded-full bg-white pointer-events-none"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: 2, height: 2, opacity: 0.1 + (i % 4) * 0.07 }} />
      ))}

      <div className="relative z-10 max-w-2xl mx-auto">
        <div className="mb-5">
          <Link href="/kids/activities"
            className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors flex items-center gap-1">
            ← Dejavnosti
          </Link>
        </div>

        <div className="rounded-3xl overflow-hidden shadow-2xl"
          style={{ background: "rgba(8,8,30,0.88)", border: "1px solid rgba(251,191,36,0.2)", boxShadow: "0 0 40px rgba(251,191,36,0.05)" }}>

          {/* Header */}
          <div className="px-6 py-4 flex justify-between items-center"
            style={{ background: "rgba(251,191,36,0.1)", borderBottom: "1px solid rgba(251,191,36,0.15)" }}>
            <div className="flex items-center gap-3">
              <span className="text-3xl">📚</span>
              <div>
                <h1 className="text-xl font-bold text-white">Graditelj besed</h1>
                <p className="text-xs font-medium" style={{ color: "#fbbf24" }}>
                  {gameMode ? MODE_META[gameMode].label : ""} · Beseda {currentChallenge + 1} od {challenges.length}
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
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(251,191,36,0.12)" }}>
              <div className="h-full rounded-full transition-all duration-500"
                style={{ width: `${pct}%`, background: "linear-gradient(90deg, #d97706, #fbbf24)" }} />
            </div>

            {/* Definition panel */}
            <div className="rounded-2xl p-4"
              style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)" }}>
              <p className="text-blue-300 text-sm leading-relaxed">
                <span className="font-bold">Pomen: </span>{challenge.definition}
              </p>
              {!showResult && (
                <p className="text-blue-400/60 text-xs mt-2">
                  <span className="font-bold">Namig: </span>{challenge.hint}
                </p>
              )}
            </div>

            {/* Scrambled word */}
            {gameMode === "unscramble" && (
              <div className="text-center py-4">
                <p className="text-white/50 text-sm mb-2">Razvrsti te črke:</p>
                <p className="text-4xl font-bold tracking-widest" style={{ color: "#fbbf24" }}>{challenge.scrambled}</p>
              </div>
            )}

            {/* Text input */}
            {(gameMode === "spelling" || gameMode === "unscramble") && (
              <div>
                <label className="block text-white/60 text-xs font-medium mb-2">Vpiši odgovor:</label>
                <input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)}
                  disabled={showResult}
                  className="w-full p-4 text-lg text-white rounded-2xl focus:outline-none"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(251,191,36,0.25)" }}
                  placeholder="Napiši besedo..."
                  onKeyDown={(e) => { if (e.key === "Enter" && !showResult && userInput.trim()) handleSubmitAnswer() }} />
              </div>
            )}

            {/* Multiple choice */}
            {gameMode === "definition" && challenge.options && (
              <div className="space-y-2">
                <p className="text-white/60 text-sm font-medium">Izberi pravilno besedo:</p>
                {challenge.options.map((option, index) => {
                  let bg = "rgba(255,255,255,0.04)"
                  let border = "rgba(255,255,255,0.1)"
                  let textColor = "rgba(255,255,255,0.8)"
                  if (selectedOption === option) {
                    if (showResult) {
                      if (isCorrect) { bg = "rgba(34,197,94,0.15)"; border = "rgba(34,197,94,0.45)"; textColor = "#4ade80" }
                      else { bg = "rgba(239,68,68,0.15)"; border = "rgba(239,68,68,0.45)"; textColor = "#f87171" }
                    } else { bg = "rgba(251,191,36,0.18)"; border = "rgba(251,191,36,0.5)" }
                  } else if (showResult && option.toLowerCase() === challenge.word.toLowerCase()) {
                    bg = "rgba(34,197,94,0.15)"; border = "rgba(34,197,94,0.45)"; textColor = "#4ade80"
                  }
                  return (
                    <button key={index} onClick={() => setSelectedOption(option)}
                      disabled={showResult}
                      className="w-full p-4 text-left rounded-2xl font-medium text-sm transition-all"
                      style={{ background: bg, border: `1px solid ${border}`, color: textColor, cursor: showResult ? "not-allowed" : "pointer" }}>
                      {option}
                    </button>
                  )
                })}
              </div>
            )}

            {/* Result */}
            {showResult && (
              <div className="rounded-2xl p-4 animate-slide-up"
                style={{
                  background: isCorrect ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)",
                  border: `1px solid ${isCorrect ? "rgba(34,197,94,0.35)" : "rgba(239,68,68,0.35)"}`,
                }}>
                <p className="font-bold text-sm mb-1" style={{ color: isCorrect ? "#4ade80" : "#f87171" }}>
                  {isCorrect ? "🎉 Pravilno! Odlično!" : `❌ Ni prav. Odgovor je: ${challenge.word}`}
                </p>
                <p className="text-white/50 text-xs">{challenge.definition}</p>
              </div>
            )}

            {/* Action button */}
            <div className="flex justify-center pt-1">
              {!showResult ? (
                <button onClick={handleSubmitAnswer}
                  disabled={gameMode === "definition" ? selectedOption === null : userInput.trim() === ""}
                  className="px-8 py-3.5 rounded-2xl font-bold text-white text-sm transition-all active:scale-95 disabled:opacity-30"
                  style={{ background: "linear-gradient(135deg, #7C3AED, #a855f7)" }}>
                  Oddaj odgovor
                </button>
              ) : (
                <button onClick={handleNextChallenge}
                  className="px-8 py-3.5 rounded-2xl font-bold text-white text-sm transition-all active:scale-95"
                  style={{ background: "linear-gradient(135deg, #7C3AED, #a855f7)" }}>
                  {currentChallenge < challenges.length - 1 ? "Naslednja beseda →" : "Zaključi igro"}
                </button>
              )}
            </div>

            <p className="text-center text-xs text-white/30">
              Rezultat: {score} / {currentChallenge + (showResult ? 1 : 0)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
