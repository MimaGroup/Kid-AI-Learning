"use client"

import { useState, useRef, useEffect } from "react"

interface Message {
  role: "user" | "assistant"
  content: string
}

interface ByteTutorProps {
  lessonTitle?: string
  lessonContent?: string
}

export function ByteTutor({ lessonTitle, lessonContent }: ByteTutorProps) {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Živjo! 🤖 Sem Byte, tvoj učni pomočnik! Če imaš kakšno vprašanje o lekciji ali o AI, sem tu da pomagam!" },
  ])
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [open])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, loading])

  const send = async () => {
    const text = input.trim().slice(0, 400)
    if (!text || loading) return
    setInput("")
    const userMsg: Message = { role: "user", content: text }
    setMessages(prev => [...prev, userMsg])
    setLoading(true)

    try {
      const res = await fetch("/api/byte", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          lessonTitle,
          lessonContent,
          history: messages.slice(-6),
        }),
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role: "assistant", content: data.reply ?? "Ups, poskusi znova 🤖" }])
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Ups, pri meni je prišlo do napake. Poskusi znova! 🔧" }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-24 right-5 md:bottom-8 md:right-8 z-40 flex items-center gap-2 px-4 py-3 rounded-2xl font-bold text-white transition-all active:scale-95 hover:scale-105"
        style={{
          background: open ? "linear-gradient(135deg,#6d28d9,#9333ea)" : "linear-gradient(135deg,#7c3aed,#a855f7)",
          boxShadow: "0 4px 24px rgba(168,85,247,0.55)",
        }}
        aria-label="Vprašaj Byte-a"
      >
        <span style={{ fontSize: 22 }}>🤖</span>
        <span className="text-sm hidden sm:inline">{open ? "Zapri" : "Vprašaj Byte-a"}</span>
      </button>

      {/* Tap-outside overlay (mobile) */}
      {open && (
        <div className="fixed inset-0 z-30 md:hidden" onClick={() => setOpen(false)} aria-hidden />
      )}

      {/* Chat panel */}
      {open && (
        <div
          className="fixed bottom-44 right-5 md:bottom-24 md:right-8 z-40 flex flex-col rounded-3xl overflow-hidden"
          style={{
            width: "min(360px, calc(100vw - 40px))",
            height: 420,
            background: "#0d0d2b",
            border: "1px solid rgba(168,85,247,0.35)",
            boxShadow: "0 8px 48px rgba(0,0,0,0.7), 0 0 32px rgba(168,85,247,0.2)",
            animation: "slideUpChat 0.25s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <style>{`
            @keyframes slideUpChat {
              from { transform: translateY(16px); opacity: 0; }
              to   { transform: translateY(0);    opacity: 1; }
            }
          `}</style>

          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
            style={{ background: "linear-gradient(135deg,#7c3aed22,#a855f711)", borderBottom: "1px solid rgba(168,85,247,0.2)" }}>
            <div className="flex items-center justify-center rounded-xl"
              style={{ width: 36, height: 36, background: "rgba(168,85,247,0.2)", border: "1px solid rgba(168,85,247,0.4)", fontSize: 20 }}>
              🤖
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-none">Byte</p>
              <p className="text-purple-400 text-xs mt-0.5">AI učni pomočnik</p>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Zapri"
              className="ml-auto flex items-center justify-center rounded-lg transition-all hover:bg-white/10 active:scale-90"
              style={{ width: 32, height: 32, color: "rgba(255,255,255,0.65)", fontSize: 18 }}>✕</button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3" style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(168,85,247,0.3) transparent" }}>
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                {m.role === "assistant" && (
                  <div className="flex-shrink-0 mr-2 mt-0.5 text-lg">🤖</div>
                )}
                <div
                  className="max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed"
                  style={m.role === "user"
                    ? { background: "linear-gradient(135deg,#7c3aed,#a855f7)", color: "white", borderBottomRightRadius: 4 }
                    : { background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.85)", border: "1px solid rgba(255,255,255,0.08)", borderBottomLeftRadius: 4 }
                  }
                >
                  {m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="flex-shrink-0 mr-2 text-lg">🤖</div>
                <div className="px-4 py-2.5 rounded-2xl" style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="flex gap-1 items-center">
                    {[0,1,2].map(i => (
                      <div key={i} className="rounded-full bg-purple-400"
                        style={{ width: 6, height: 6, animation: `bounce 1.2s ${i * 0.2}s infinite` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="px-3 pb-3 pt-2 flex-shrink-0" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="flex gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && !e.shiftKey && send()}
                placeholder="Vprašaj Byte-a..."
                className="flex-1 px-3 py-2.5 rounded-xl text-sm outline-none text-white placeholder-white/30"
                style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}
              />
              <button
                onClick={send}
                disabled={!input.trim() || loading}
                className="px-3 py-2.5 rounded-xl font-bold transition-all active:scale-95 disabled:opacity-40"
                style={{ background: "linear-gradient(135deg,#7c3aed,#a855f7)", color: "white", minWidth: 44 }}
              >
                →
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
