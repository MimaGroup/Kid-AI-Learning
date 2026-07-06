"use client"

import { useState } from "react"
import Link from "next/link"

interface Experiment {
  id: string
  title: string
  description: string
  steps: string[]
  question: string
  options: string[]
  correct: number
  funFact: string
}

const STARS = [
  {x:5,y:8},{x:18,y:82},{x:28,y:22},{x:38,y:58},{x:48,y:12},
  {x:58,y:72},{x:68,y:38},{x:78,y:88},{x:88,y:18},{x:94,y:52},
  {x:12,y:48},{x:52,y:42},{x:82,y:62},{x:32,y:78},{x:72,y:8},
  {x:22,y:95},{x:65,y:95},{x:44,y:95},
]

const spaceStyle = { background: "radial-gradient(ellipse at 40% 30%, #1a1060 0%, #0a0a1a 75%)" }

export default function ScienceLabPage() {
  const [currentExperiment, setCurrentExperiment] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [gameComplete, setGameComplete] = useState(false)

  const experiments: Experiment[] = [
    {
      id: "color-mixing",
      title: "AI mešanje barv",
      description: "Nauči se, kako AI prepoznava in meša barve!",
      steps: [
        "AI kamere vidijo milijone barv",
        "Računalniki shranjujejo barve kot številke (RGB)",
        "AI se nauči prepoznavati barve z ogledom mnogih primerov",
        "Preizkusimo tvoje znanje o barvah!",
      ],
      question: "Kaj nastane, ko zmešaš rdečo in modro?",
      options: ["Zelena", "Vijolična", "Oranžna", "Rumena"],
      correct: 1,
      funFact: "AI uporablja prepoznavanje barv za samovozeče avtomobile, da vidijo semaforje!",
    },
    {
      id: "sound-waves",
      title: "Prepoznavanje zvoka",
      description: "Odkrijte, kako AI sliši in razume zvoke!",
      steps: [
        "Zvok potuje v valovih skozi zrak",
        "AI pretvori zvočne valove v vzorce",
        "Glasovni asistenti uporabljajo AI za razumevanje govora",
        "Preizkusimo, kaj si se naučil!",
      ],
      question: "Kako AI razume tvoj glas?",
      options: ["Z branjem misli", "Z analizo zvočnih vzorcev", "Z ugibanjem", "Z magijo"],
      correct: 1,
      funFact: "AI zna prepoznati več kot 100 različnih jezikov in naglasov!",
    },
    {
      id: "plant-growth",
      title: "Pametno kmetijstvo",
      description: "Poglej, kako AI pomaga rastlinam rasti bolje!",
      steps: [
        "Rastline potrebujejo vodo, sončno svetlobo in hranila",
        "AI senzorji nadzorujejo vlažnost tal in temperaturo",
        "Pametni sistemi zalivajo rastline ob pravem trenutku",
        "Čas je za preizkus znanja!",
      ],
      question: "Kako AI pomaga kmetom?",
      options: [
        "Z opravljanjem vsega dela",
        "Z nadzorom in optimizacijo nege rastlin",
        "Z takojšnjim rastjo rastlin",
        "S pogovorom z rastlinami",
      ],
      correct: 1,
      funFact: "Kmetije z AI porabijo do 90% manj vode kot tradicionalno kmetijstvo!",
    },
  ]

  const experiment = experiments[currentExperiment]

  const handleNextStep = () => {
    if (currentStep < experiment.steps.length - 1) setCurrentStep(currentStep + 1)
  }

  const handlePreviousStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1)
  }

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return
    setShowResult(true)
    if (selectedAnswer === experiment.correct) setScore(score + 1)
  }

  const handleNextExperiment = () => {
    if (currentExperiment < experiments.length - 1) {
      setCurrentExperiment(currentExperiment + 1)
      setCurrentStep(0)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      setGameComplete(true)
    }
  }

  const handleRestart = () => {
    setCurrentExperiment(0)
    setCurrentStep(0)
    setSelectedAnswer(null)
    setScore(0)
    setShowResult(false)
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
          style={{ background: "rgba(8,8,30,0.9)", border: "1px solid rgba(34,197,94,0.35)", boxShadow: "0 0 40px rgba(34,197,94,0.1)" }}>
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="text-2xl font-bold text-white mb-2">Laboratorij končan!</h2>
          <p className="text-4xl font-bold mb-1" style={{ color: "#4ade80" }}>{score}/{experiments.length}</p>
          <p className="text-white/50 text-sm mb-6">
            {score === experiments.length
              ? "Popolno! Si zvezdica znanosti!"
              : score >= experiments.length / 2
                ? "Odlično! Toliko se učiš!"
                : "Dobro! Poskusi znova, da se naučiš več!"}
          </p>
          <div className="rounded-2xl p-5 mb-6 text-left"
            style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)" }}>
            <p className="text-green-300 font-bold text-sm mb-3">Naučil si se:</p>
            <ul className="text-white/60 text-sm space-y-1.5">
              <li>✓ Kako AI prepoznava barve in vzorce</li>
              <li>✓ Kako glasovni asistenti razumejo govor</li>
              <li>✓ Kako AI pomaga pri pametnem kmetijstvu</li>
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

  const isOnQuestion = currentStep === experiment.steps.length - 1
  const answeredCorrectly = selectedAnswer === experiment.correct

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
          style={{ background: "rgba(8,8,30,0.88)", border: "1px solid rgba(34,197,94,0.2)", boxShadow: "0 0 40px rgba(34,197,94,0.06)" }}>

          {/* Header */}
          <div className="px-6 py-4 flex justify-between items-center"
            style={{ background: "rgba(34,197,94,0.1)", borderBottom: "1px solid rgba(34,197,94,0.15)" }}>
            <div className="flex items-center gap-3">
              <span className="text-3xl">🔬</span>
              <div>
                <h1 className="text-xl font-bold text-white">AI Znanstveni laboratorij</h1>
                <p className="text-xs font-medium" style={{ color: "#4ade80" }}>
                  Eksperiment {currentExperiment + 1} od {experiments.length}
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
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(34,197,94,0.12)" }}>
              <div className="h-full rounded-full transition-all duration-500"
                style={{ width: `${((currentExperiment + 1) / experiments.length) * 100}%`, background: "linear-gradient(90deg, #059669, #4ade80)" }} />
            </div>

            {/* Experiment header */}
            <div className="rounded-2xl p-5"
              style={{ background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.15)" }}>
              <h2 className="text-lg font-bold text-white mb-1">✨ {experiment.title}</h2>
              <p className="text-white/60 text-sm">{experiment.description}</p>
            </div>

            {/* Steps */}
            {!isOnQuestion && (
              <div className="space-y-4">
                <div className="rounded-2xl p-5"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm text-white"
                      style={{ background: "linear-gradient(135deg, #059669, #4ade80)" }}>
                      {currentStep + 1}
                    </div>
                    <p className="text-white/50 text-xs font-semibold">KORAK {currentStep + 1} od {experiment.steps.length - 1}</p>
                  </div>
                  <p className="text-white text-base leading-relaxed">{experiment.steps[currentStep]}</p>
                </div>

                <div className="flex gap-3">
                  <button onClick={handlePreviousStep} disabled={currentStep === 0}
                    className="flex-1 py-3 rounded-2xl font-bold text-sm transition-all active:scale-95 disabled:opacity-30"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.6)" }}>
                    ← Prejšnji
                  </button>
                  <button onClick={handleNextStep}
                    className="flex-1 py-3 rounded-2xl font-bold text-white text-sm transition-all active:scale-95"
                    style={{ background: "linear-gradient(135deg, #059669, #10b981)" }}>
                    Naslednji korak →
                  </button>
                </div>
              </div>
            )}

            {/* Question */}
            {isOnQuestion && !showResult && (
              <div className="space-y-4 animate-slide-up">
                <div className="rounded-2xl p-5"
                  style={{ background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.25)" }}>
                  <p className="text-white font-bold text-base mb-4">{experiment.question}</p>
                  <div className="space-y-2">
                    {experiment.options.map((option, index) => (
                      <button key={index} onClick={() => setSelectedAnswer(index)}
                        className="w-full p-4 rounded-2xl text-left transition-all font-medium text-sm"
                        style={{
                          background: selectedAnswer === index ? "rgba(34,197,94,0.2)" : "rgba(255,255,255,0.04)",
                          border: selectedAnswer === index ? "1px solid rgba(34,197,94,0.5)" : "1px solid rgba(255,255,255,0.1)",
                          color: selectedAnswer === index ? "#4ade80" : "rgba(255,255,255,0.8)",
                        }}>
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <button onClick={handleSubmitAnswer} disabled={selectedAnswer === null}
                  className="w-full py-3.5 rounded-2xl font-bold text-white text-sm transition-all active:scale-95 disabled:opacity-30"
                  style={{ background: "linear-gradient(135deg, #7C3AED, #a855f7)" }}>
                  Oddaj odgovor
                </button>
              </div>
            )}

            {/* Result */}
            {showResult && (
              <div className="space-y-4 animate-slide-up">
                <div className="rounded-2xl p-5"
                  style={{
                    background: answeredCorrectly ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)",
                    border: `1px solid ${answeredCorrectly ? "rgba(34,197,94,0.4)" : "rgba(239,68,68,0.4)"}`,
                  }}>
                  <p className="text-2xl mb-2">{answeredCorrectly ? "🎉" : "💡"}</p>
                  <h3 className="font-bold text-base mb-1" style={{ color: answeredCorrectly ? "#4ade80" : "#f87171" }}>
                    {answeredCorrectly ? "Pravilno!" : "Ni prav!"}
                  </h3>
                  <p className="text-white/60 text-sm">
                    {answeredCorrectly
                      ? "Odlično! Imaš prav!"
                      : `Pravilen odgovor je: ${experiment.options[experiment.correct]}`}
                  </p>
                </div>

                <div className="rounded-2xl p-4"
                  style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.3)" }}>
                  <p className="text-blue-300 text-sm leading-relaxed">
                    <span className="font-bold">✨ Zanimivost: </span>{experiment.funFact}
                  </p>
                </div>

                <button onClick={handleNextExperiment}
                  className="w-full py-3.5 rounded-2xl font-bold text-white text-sm transition-all active:scale-95"
                  style={{ background: "linear-gradient(135deg, #7C3AED, #a855f7)" }}>
                  {currentExperiment < experiments.length - 1 ? "Naslednji eksperiment →" : "Poglej rezultate"}
                </button>
              </div>
            )}

            <p className="text-center text-xs text-white/30">
              Rezultat: {score}/{currentExperiment + (showResult ? 1 : 0)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
