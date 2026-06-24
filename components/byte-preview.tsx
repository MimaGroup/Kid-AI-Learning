"use client"

import { useState } from "react"

type Step = "intro" | "question" | "answered" | "badge" | "parent"

const SCENARIO = {
  text: "Sonce zahaja za gorami. Nebo se obarva v toplo rdečo in oranžno. Veter prinaša vonj po svežem dežju.",
  correct: 1,
  options: ["👨 Napisal je človek", "🤖 Napisala je umetna inteligenca"],
  explanationCorrect:
    "Točno! 🎯 To je napisala umetna inteligenca v manj kot sekundi. Naučila se je iz milijonov knjig — in zdaj zna opisati skoraj vse.",
  explanationWrong:
    "Skoraj! 😊 Tokrat je to napisala umetna inteligenca — v manj kot sekundi. AI se je naučil iz milijonov knjig in sedaj zna pisati kot človek.",
}

const BYTE_SAYS: Record<Exclude<Step, "answered">, string> = {
  intro:
    "Živijo! Jaz sem Byte — tvoj AI sopotnik. Skupaj bova odkrivala, kako deluje umetna inteligenca. Pripravi se na svojo prvo misijo!",
  question:
    "Detektivski čas! 🕵️ Preberi spodnje besedilo in ugani — je to napisal ČLOVEK ali UMETNA INTELIGENCA?",
  badge:
    "Bravo! Prislužil si svojo prvo značko. Starš bo v svoji plošči takoj videl, kaj si danes odkril.",
  parent:
    "To je tisto, kar starš vidi po vsaki lekciji — brez da bi moral biti zraven.",
}

const STEPS: Step[] = ["intro", "question", "answered", "badge", "parent"]

export function BytePreview() {
  const [step, setStep] = useState<Step>("intro")
  const [selected, setSelected] = useState<number | null>(null)
  const [byteText, setByteText] = useState(BYTE_SAYS.intro)

  const isCorrect = selected === SCENARIO.correct

  const handleAnswer = (idx: number) => {
    setSelected(idx)
    setByteText(
      idx === SCENARIO.correct
        ? SCENARIO.explanationCorrect
        : SCENARIO.explanationWrong
    )
    setStep("answered")
  }

  const advance = () => {
    const next = STEPS[STEPS.indexOf(step) + 1]
    if (!next) return
    setStep(next)
    if (next !== "answered") setByteText(BYTE_SAYS[next as Exclude<Step, "answered">])
  }

  const restart = () => {
    setStep("intro")
    setSelected(null)
    setByteText(BYTE_SAYS.intro)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div
        className="rounded-3xl overflow-hidden shadow-2xl"
        style={{
          background: "rgba(8,8,30,0.92)",
          border: "1px solid rgba(168,85,247,0.3)",
          boxShadow: "0 0 60px rgba(168,85,247,0.12)",
        }}
      >
        {/* ── Header bar ── */}
        <div
          className="px-6 py-3 flex items-center justify-between"
          style={{ background: "rgba(168,85,247,0.18)", borderBottom: "1px solid rgba(168,85,247,0.2)" }}
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">🚀</span>
            <span className="text-white font-bold text-sm">Kids Learning AI</span>
          </div>
          {/* Progress dots */}
          <div className="flex items-center gap-1.5">
            {STEPS.map((s, i) => (
              <div
                key={s}
                className="rounded-full transition-all duration-300"
                style={{
                  width: step === s ? 20 : 6,
                  height: 6,
                  background:
                    STEPS.indexOf(step) >= i
                      ? "rgba(168,85,247,1)"
                      : "rgba(255,255,255,0.2)",
                }}
              />
            ))}
          </div>
        </div>

        <div className="p-6 space-y-5">
          {/* ── Byte speech bubble ── */}
          <div className="flex items-start gap-3 animate-slide-up" key={step}>
            {/* Byte avatar */}
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 shadow-lg"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                boxShadow: "0 0 16px rgba(168,85,247,0.5)",
              }}
            >
              🤖
            </div>
            {/* Bubble */}
            <div
              className="rounded-2xl rounded-tl-none px-4 py-3 flex-1"
              style={{
                background: "rgba(168,85,247,0.15)",
                border: "1px solid rgba(168,85,247,0.25)",
              }}
            >
              <p className="text-xs text-purple-400 font-bold mb-1">BYTE</p>
              <p className="text-white text-sm leading-relaxed">{byteText}</p>
            </div>
          </div>

          {/* ── INTRO step ── */}
          {step === "intro" && (
            <div className="animate-slide-up">
              <div
                className="rounded-2xl p-5 mb-4 text-center"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div className="text-4xl mb-3">🕵️ 🧠 🎯</div>
                <p className="text-white/70 text-sm">Interaktivna lekcija · ~3 minute · Za otroke 5–12 let</p>
              </div>
              <button
                onClick={advance}
                className="w-full py-3.5 rounded-2xl font-bold text-white text-lg transition-all active:scale-95"
                style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)" }}
              >
                Začni misijo →
              </button>
            </div>
          )}

          {/* ── QUESTION step ── */}
          {step === "question" && (
            <div className="animate-slide-up space-y-4">
              {/* Scenario text */}
              <div
                className="rounded-2xl p-5 text-center"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <p className="text-white/50 text-xs font-semibold mb-3 tracking-wider">PREBERI BESEDILO</p>
                <p className="text-white text-base leading-relaxed italic">&ldquo;{SCENARIO.text}&rdquo;</p>
              </div>
              {/* Answer buttons */}
              <div className="grid grid-cols-2 gap-3">
                {SCENARIO.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(i)}
                    className="py-4 rounded-2xl font-bold text-sm text-white transition-all active:scale-95 hover:brightness-110"
                    style={{
                      background:
                        i === 0
                          ? "linear-gradient(135deg, #1d4ed8, #3b82f6)"
                          : "linear-gradient(135deg, #7c3aed, #a855f7)",
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── ANSWERED step ── */}
          {step === "answered" && selected !== null && (
            <div className="animate-slide-up space-y-4">
              {/* Result */}
              <div
                className="rounded-2xl p-5 text-center"
                style={{
                  background: isCorrect ? "rgba(34,197,94,0.13)" : "rgba(251,191,36,0.12)",
                  border: `1px solid ${isCorrect ? "rgba(34,197,94,0.35)" : "rgba(251,191,36,0.35)"}`,
                }}
              >
                <p className="text-3xl mb-2">{isCorrect ? "🎯" : "💡"}</p>
                <p
                  className="font-bold text-sm mb-1"
                  style={{ color: isCorrect ? "#4ade80" : "#fbbf24" }}
                >
                  {isCorrect ? "PRAVILNO!" : "SKORAJ!"}
                </p>
                <p className="text-white/60 text-xs">
                  Izbral si: <span className="text-white font-semibold">{SCENARIO.options[selected]}</span>
                </p>
              </div>
              <button
                onClick={advance}
                className="w-full py-3.5 rounded-2xl font-bold text-white text-lg transition-all active:scale-95"
                style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)" }}
              >
                Naprej →
              </button>
            </div>
          )}

          {/* ── BADGE step ── */}
          {step === "badge" && (
            <div className="animate-slide-up">
              <div
                className="rounded-2xl p-6 text-center mb-4"
                style={{ background: "rgba(251,191,36,0.12)", border: "1px solid rgba(251,191,36,0.35)" }}
              >
                <div className="text-6xl mb-3 animate-score-pop inline-block">🏆</div>
                <p className="text-yellow-400 text-xs font-bold tracking-wider mb-1">NOVA ZNAČKA</p>
                <p className="text-white font-bold text-lg">AI Detektiv — Začetnik</p>
                <p className="text-white/50 text-xs mt-2">1. lekcija dokončana · +15 točk</p>
              </div>
              <button
                onClick={advance}
                className="w-full py-3.5 rounded-2xl font-bold text-white text-lg transition-all active:scale-95"
                style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)" }}
              >
                Poglej, kaj starš vidi →
              </button>
            </div>
          )}

          {/* ── PARENT SUMMARY step ── */}
          {step === "parent" && (
            <div className="animate-slide-up space-y-3">
              {/* Parent card */}
              <div
                className="rounded-2xl p-5"
                style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.25)" }}
              >
                <p className="text-blue-400 text-xs font-bold tracking-wider mb-3">🛸 STARŠ VIDI V SVOJI PLOŠČI</p>
                <div className="space-y-2.5">
                  {[
                    { label: "Dejavnost",   value: "AI Detektiv — Lekcija 1",   icon: "🕵️" },
                    { label: "Čas",         value: "3 minute",                  icon: "⏱️" },
                    { label: "Rezultat",    value: "Pravilno odgovoril",         icon: "✅" },
                    { label: "Nova značka", value: "AI Detektiv — Začetnik 🏆", icon: "🎖️" },
                    { label: "Naslednje",   value: "AI Kviz — Lekcija 1",       icon: "🎯" },
                  ].map((row) => (
                    <div
                      key={row.label}
                      className="flex items-center justify-between py-1.5"
                      style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                    >
                      <span className="text-white/45 text-xs flex items-center gap-2">
                        <span>{row.icon}</span>{row.label}
                      </span>
                      <span className="text-white text-xs font-semibold">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <a
                href="/auth/sign-up"
                className="block w-full py-3.5 rounded-2xl font-bold text-white text-lg text-center transition-all active:scale-95"
                style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)" }}
              >
                Začni brezplačno — za tvojega otroka →
              </a>
              <button
                onClick={restart}
                className="w-full py-2.5 rounded-2xl text-sm font-semibold text-white/40 hover:text-white/60 transition-all"
              >
                ↺ Ponovi demo
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
