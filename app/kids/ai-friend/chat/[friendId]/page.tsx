"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { ToastContainer } from "@/components/toast-notification"
import { BYTE_CHARACTER } from "@/lib/byte-character"
import Image from "next/image"
import Link from "next/link"

interface AIFriend {
  id: string
  name: string
  personality: string
  color: string
  created_at: string
}

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: string
}

const spaceStyle = { background: "radial-gradient(ellipse at 40% 30%, #1a1060 0%, #0a0a1a 75%)" }

export default function AIFriendChat() {
  const params = useParams()
  const router = useRouter()
  const toast = useToast()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const friendId = params.friendId as string
  const [friend, setFriend] = useState<AIFriend | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    loadFriend()
    loadMessages()
  }, [friendId])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const loadFriend = () => {
    try {
      const stored = localStorage.getItem("ai_friends")
      if (stored) {
        const friends: AIFriend[] = JSON.parse(stored)
        const found = friends.find((f) => f.id === friendId)
        if (found) {
          setFriend(found)
        } else {
          toast.error("Prijatelj ni bil najden")
          router.push("/kids/ai-friend")
        }
      }
    } catch (err) {
      console.error("Error loading friend:", err)
      toast.error("Napaka pri nalaganju prijatelja")
    }
  }

  const loadMessages = () => {
    try {
      const stored = localStorage.getItem(`chat_${friendId}`)
      if (stored) {
        setMessages(JSON.parse(stored))
      } else {
        const friendsStored = localStorage.getItem("ai_friends")
        const friends: AIFriend[] = friendsStored ? JSON.parse(friendsStored) : []
        const currentFriend = friends.find((f) => f.id === friendId)
        const isByte = currentFriend?.name === BYTE_CHARACTER.name

        const welcomeMessage: Message = {
          id: crypto.randomUUID(),
          role: "assistant",
          content: isByte
            ? "Zdravo! Jaz sem Byte, tvoj robotski prijatelj! Skupaj bova odkrivala svet umetne inteligence. Kaj te danes zanima?"
            : `Zdravo! Super je, da si tu! Vprašaj me karkoli ali mi povej, kako ti gre.`,
          timestamp: new Date().toISOString(),
        }
        setMessages([welcomeMessage])
        localStorage.setItem(`chat_${friendId}`, JSON.stringify([welcomeMessage]))
      }
    } catch (err) {
      console.error("Error loading messages:", err)
    }
  }

  const handleSend = async () => {
    if (!input.trim() || isLoading || !friend) return

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: input.trim(),
      timestamp: new Date().toISOString(),
    }

    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/ai-friend/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          friendName: friend.name,
          personality: friend.personality,
          message: userMessage.content,
          conversationHistory: updatedMessages.slice(-6),
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Napaka pri odgovoru")
      }

      const data = await response.json()

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.message,
        timestamp: new Date().toISOString(),
      }

      const finalMessages = [...updatedMessages, assistantMessage]
      setMessages(finalMessages)
      localStorage.setItem(`chat_${friendId}`, JSON.stringify(finalMessages))

      if (data.fallback) {
        toast.warning(data.fallbackMessage || "Preprosti odgovori zaradi obremenitve strežnika")
      }
    } catch (err) {
      console.error("Error sending message:", err)
      toast.error(err instanceof Error ? err.message : "Napaka pri pošiljanju sporočila")

      const fallbackMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "Trenutno imam težave z razmišljanjem. Poskusi me vprašati čez trenutek!",
        timestamp: new Date().toISOString(),
      }
      const finalMessages = [...updatedMessages, fallbackMessage]
      setMessages(finalMessages)
      localStorage.setItem(`chat_${friendId}`, JSON.stringify(finalMessages))
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const isByte = friend?.name === BYTE_CHARACTER.name

  if (!friend) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={spaceStyle}>
        <div className="text-center">
          <div className="inline-block w-10 h-10 rounded-full animate-spin mb-3"
            style={{ border: "3px solid rgba(168,85,247,0.2)", borderTopColor: "#a855f7" }} />
          <p className="text-white/50 text-sm">Nalaganje...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col" style={spaceStyle}>
      <ToastContainer toasts={toast.toasts} onRemove={toast.removeToast} />

      {/* Header */}
      <header className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
        style={{ background: "rgba(8,8,30,0.9)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <Link href="/kids/ai-friend"
          className="flex items-center justify-center w-9 h-9 rounded-xl transition-all hover:bg-white/10 active:scale-95 text-white/60 hover:text-white"
          style={{ border: "1px solid rgba(255,255,255,0.1)", fontSize: 18 }}>
          ←
        </Link>

        {isByte ? (
          <Image
            src={BYTE_CHARACTER.images.avatar}
            alt={BYTE_CHARACTER.fullName}
            width={40}
            height={40}
            className="rounded-full object-cover flex-shrink-0"
            style={{ border: "2px solid rgba(168,85,247,0.5)" }}
          />
        ) : (
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold text-white flex-shrink-0"
            style={{ backgroundColor: friend.color, border: "2px solid rgba(255,255,255,0.2)" }}>
            {friend.name.charAt(0).toUpperCase()}
          </div>
        )}

        <div>
          <h1 className="text-white font-bold text-base leading-none">{friend.name}</h1>
          <p className="text-purple-400 text-xs mt-0.5">{friend.personality}</p>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
        style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(168,85,247,0.3) transparent" }}>
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} items-end gap-2`}>
            {message.role === "assistant" && (
              isByte ? (
                <Image
                  src={BYTE_CHARACTER.images.avatar}
                  alt="Byte"
                  width={28}
                  height={28}
                  className="rounded-full object-cover flex-shrink-0 mb-0.5"
                  style={{ border: "1px solid rgba(168,85,247,0.4)" }}
                />
              ) : (
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0 mb-0.5"
                  style={{ backgroundColor: friend.color }}>
                  {friend.name.charAt(0).toUpperCase()}
                </div>
              )
            )}
            <div
              className="max-w-[78%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed"
              style={message.role === "user"
                ? { background: "linear-gradient(135deg,#7c3aed,#a855f7)", color: "white", borderBottomRightRadius: 4 }
                : { background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.9)", border: "1px solid rgba(255,255,255,0.1)", borderBottomLeftRadius: 4 }
              }
            >
              <p className="whitespace-pre-wrap">{message.content}</p>
              <p className="text-xs mt-1.5 opacity-50">
                {new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start items-end gap-2">
            {isByte ? (
              <Image src={BYTE_CHARACTER.images.avatar} alt="Byte" width={28} height={28}
                className="rounded-full object-cover flex-shrink-0 mb-0.5"
                style={{ border: "1px solid rgba(168,85,247,0.4)" }} />
            ) : (
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0 mb-0.5"
                style={{ backgroundColor: friend.color }}>
                {friend.name.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="px-4 py-3 rounded-2xl" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)", borderBottomLeftRadius: 4 }}>
              <div className="flex gap-1 items-center">
                {[0,1,2].map(i => (
                  <div key={i} className="rounded-full bg-purple-400"
                    style={{ width: 6, height: 6, animation: `bounce 1.2s ${i * 0.2}s infinite` }} />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="px-4 pb-4 pt-3 flex-shrink-0"
        style={{ borderTop: "1px solid rgba(255,255,255,0.07)", background: "rgba(8,8,30,0.8)" }}>
        <div className="flex gap-2 items-end">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Pogovarjaj se z ${friend.name}...`}
            rows={1}
            className="flex-1 px-4 py-3 rounded-2xl text-sm outline-none text-white placeholder-white/30 resize-none"
            style={{
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(168,85,247,0.25)",
              minHeight: 48,
              maxHeight: 120,
            }}
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="flex items-center justify-center rounded-2xl font-bold text-white transition-all active:scale-95 disabled:opacity-40 flex-shrink-0"
            style={{ background: "linear-gradient(135deg,#7c3aed,#a855f7)", width: 48, height: 48 }}
          >
            →
          </button>
        </div>
      </div>
    </div>
  )
}
