"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"

interface Message {
  role: "user" | "assistant"
  content: string
}

const QUICK = [
  "Koliko stane naročnina?",
  "Je primerno za mojega otroka?",
  "Kako deluje brezplačni preskus?",
  "Je platforma varna?",
]

export function SupportChat() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Pozdravljeni! 👋 Sem vaš asistent za Kids Learning AI. Kako vam lahko pomagam?",
    },
  ])
  const [loading, setLoading] = useState(false)
  const [showQuick, setShowQuick] = useState(true)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 150)
  }, [open])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, loading])

  const send = async (text?: string) => {
    const msg = (text ?? input).trim()
    if (!msg || loading) return
    setInput("")
    setShowQuick(false)
    setMessages(prev => [...prev, { role: "user", content: msg }])
    setLoading(true)

    try {
      const res = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg, history: messages.slice(-6) }),
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role: "assistant", content: data.reply ?? "Poskusite znova." }])
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Prišlo je do napake. Pišite nam na support@kids-learning-ai.com." }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl font-bold text-white shadow-2xl transition-all hover:scale-105 active:scale-95"
        style={{
          background: open ? "#5b21b6" : "linear-gradient(135deg,#7c3aed,#a855f7)",
          boxShadow: "0 4px 24px rgba(124,58,237,0.5)",
        }}
        aria-label="Podpora"
      >
        <span className="text-xl">{open ? "✕" : "💬"}</span>
        <span className="text-sm hidden sm:inline">{open ? "Zapri" : "Podpora"}</span>
        {!open && (
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-400"
            style={{ boxShadow: "0 0 6px rgba(74,222,128,0.8)" }} />
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          className="fixed bottom-20 right-6 z-50 flex flex-col rounded-3xl overflow-hidden"
          style={{
            width: "min(380px, calc(100vw - 48px))",
            height: 480,
            background: "#ffffff",
            boxShadow: "0 16px 64px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.05)",
            animation: "slideChatUp 0.25s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <style>{`
            @keyframes slideChatUp {
              from { transform: translateY(16px); opacity: 0; }
              to   { transform: translateY(0);    opacity: 1; }
            }
          `}</style>

          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3.5 flex-shrink-0"
            style={{ background: "linear-gradient(135deg,#7c3aed,#a855f7)" }}>
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/20 text-lg flex-shrink-0">
              🚀
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-bold text-sm leading-none">Kids Learning AI</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-300" />
                <span className="text-purple-200 text-xs">Podpora</span>
              </div>
            </div>
            <Link href="/auth/sign-up"
              className="flex-shrink-0 text-xs font-bold px-3 py-1.5 rounded-lg bg-white/20 text-white hover:bg-white/30 transition-colors">
              Brezplačno →
            </Link>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-gray-50"
            style={{ scrollbarWidth: "thin" }}>
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                {m.role === "assistant" && (
                  <div className="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center text-sm flex-shrink-0 mr-2 mt-0.5">
                    🚀
                  </div>
                )}
                <div
                  className="max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed"
                  style={m.role === "user"
                    ? { background: "linear-gradient(135deg,#7c3aed,#a855f7)", color: "white", borderBottomRightRadius: 4 }
                    : { background: "white", color: "#1f2937", border: "1px solid #e5e7eb", borderBottomLeftRadius: 4 }
                  }
                >
                  {m.content}
                </div>
              </div>
            ))}

            {/* Quick replies */}
            {showQuick && messages.length === 1 && (
              <div className="space-y-1.5 pt-1">
                {QUICK.map(q => (
                  <button key={q} onClick={() => send(q)}
                    className="w-full text-left px-3.5 py-2 rounded-xl text-sm font-medium transition-all hover:bg-purple-50 active:scale-98"
                    style={{ background: "white", border: "1px solid #e5e7eb", color: "#374151" }}>
                    {q}
                  </button>
                ))}
              </div>
            )}

            {loading && (
              <div className="flex justify-start">
                <div className="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center text-sm flex-shrink-0 mr-2 mt-0.5">🚀</div>
                <div className="px-4 py-3 rounded-2xl bg-white border border-gray-100" style={{ borderBottomLeftRadius: 4 }}>
                  <div className="flex gap-1 items-center h-4">
                    {[0, 1, 2].map(i => (
                      <div key={i} className="w-1.5 h-1.5 rounded-full bg-purple-400"
                        style={{ animation: `bounce 1.2s ${i * 0.2}s infinite` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="px-3 py-3 bg-white border-t border-gray-100 flex-shrink-0">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && !e.shiftKey && send()}
                placeholder="Vaše vprašanje..."
                className="flex-1 px-3.5 py-2.5 rounded-xl text-sm outline-none text-gray-800 placeholder-gray-400 border border-gray-200 focus:border-purple-400 transition-colors"
              />
              <button
                onClick={() => send()}
                disabled={!input.trim() || loading}
                className="px-3.5 py-2.5 rounded-xl font-bold text-white transition-all active:scale-95 disabled:opacity-40 flex-shrink-0"
                style={{ background: "linear-gradient(135deg,#7c3aed,#a855f7)" }}
              >
                →
              </button>
            </div>
            <p className="text-center text-xs text-gray-400 mt-2">
              Ali pišite na{" "}
              <a href="mailto:support@kids-learning-ai.com" className="text-purple-500 hover:underline">
                support@kids-learning-ai.com
              </a>
            </p>
          </div>
        </div>
      )}
    </>
  )
}
