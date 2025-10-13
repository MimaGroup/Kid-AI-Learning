"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { ToastContainer } from "@/components/toast-notification"
import { ArrowLeft, Send } from "lucide-react"

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

export default function AIFriendChat() {
  const params = useParams()
  const router = useRouter()
  const toast = useToast()
  const messagesEndRef = useRef<HTMLDivElement>(null)

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
    scrollToBottom()
  }, [messages])

  const loadFriend = () => {
    try {
      const stored = localStorage.getItem("ai_friends")
      if (stored) {
        const friends: AIFriend[] = JSON.parse(stored)
        const foundFriend = friends.find((f) => f.id === friendId)
        if (foundFriend) {
          setFriend(foundFriend)
        } else {
          toast.error("Friend not found")
          router.push("/kids/ai-friend")
        }
      }
    } catch (err) {
      console.error("Error loading friend:", err)
      toast.error("Failed to load friend")
    }
  }

  const loadMessages = () => {
    try {
      const stored = localStorage.getItem(`chat_${friendId}`)
      if (stored) {
        setMessages(JSON.parse(stored))
      } else {
        const welcomeMessage: Message = {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "Hi! I'm so excited to chat with you! Ask me anything or tell me about your day!",
          timestamp: new Date().toISOString(),
        }
        setMessages([welcomeMessage])
        localStorage.setItem(`chat_${friendId}`, JSON.stringify([welcomeMessage]))
      }
    } catch (err) {
      console.error("Error loading messages:", err)
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
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
          conversationHistory: updatedMessages.slice(-6), // Last 3 exchanges for context
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to get response")
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
        toast.warning(data.fallbackMessage || "Using simple responses due to high demand")
      }
    } catch (err) {
      console.error("Error sending message:", err)
      toast.error(err instanceof Error ? err.message : "Failed to send message")

      const fallbackMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "I'm having trouble thinking right now. Can you try asking me again in a moment?",
        timestamp: new Date().toISOString(),
      }
      const finalMessages = [...updatedMessages, fallbackMessage]
      setMessages(finalMessages)
      localStorage.setItem(`chat_${friendId}`, JSON.stringify(finalMessages))
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  if (!friend) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🤖</div>
          <p className="text-gray-600">Loading friend...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <ToastContainer toasts={toast.toasts} onRemove={toast.removeToast} />

      <header className="bg-white shadow-sm border-b p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={() => router.push("/kids/ai-friend")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
              style={{ backgroundColor: friend.color }}
            >
              🤖
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{friend.name}</h1>
              <p className="text-sm text-gray-600">{friend.personality}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-lg p-4 ${
                  message.role === "user" ? "bg-blue-600 text-white" : "bg-white border-2 border-gray-200 text-gray-900"
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                <p className={`text-xs mt-2 ${message.role === "user" ? "text-blue-100" : "text-gray-500"}`}>
                  {new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="bg-white border-t p-4">
        <div className="max-w-4xl mx-auto flex space-x-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={`Chat with ${friend.name}...`}
            className="flex-1 min-h-[60px] max-h-[120px] resize-none"
            disabled={isLoading}
          />
          <Button onClick={handleSend} disabled={!input.trim() || isLoading} size="icon" className="h-[60px] w-[60px]">
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
