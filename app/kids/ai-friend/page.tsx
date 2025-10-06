"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { ToastContainer } from "@/components/toast-notification"

interface AIFriend {
  id: string
  name: string
  personality: string
  color: string
  created_at: string
}

export default function AIFriendBuilder() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const toast = useToast()

  const [friendName, setFriendName] = useState("")
  const [personality, setPersonality] = useState("Friendly")
  const [color, setColor] = useState("#4F46E5")

  const [savedFriends, setSavedFriends] = useState<AIFriend[]>([])
  const [isSaving, setIsSaving] = useState(false)
  const [isLoadingFriends, setIsLoadingFriends] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login")
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user) {
      loadFriends()
    }
  }, [user])

  const loadFriends = async () => {
    try {
      setIsLoadingFriends(true)
      const response = await fetch("/api/ai-friends")
      const data = await response.json()

      if (response.ok) {
        setSavedFriends(data.friends || [])
      } else {
        toast.error(data.error || "Failed to load friends")
      }
    } catch (err) {
      toast.error("Failed to load friends. Please check your connection.")
    } finally {
      setIsLoadingFriends(false)
    }
  }

  const handleSaveFriend = async () => {
    if (!friendName.trim()) {
      toast.warning("Please enter a name for your AI friend")
      return
    }

    try {
      setIsSaving(true)

      const response = await fetch("/api/ai-friends", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: friendName,
          personality,
          color,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success(`${friendName} has been created!`)
        setSavedFriends([data.friend, ...savedFriends])

        // Reset form
        setFriendName("")
        setPersonality("Friendly")
        setColor("#4F46E5")
      } else {
        toast.error(data.error || "Failed to save friend")
      }
    } catch (err) {
      toast.error("Failed to save friend. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const handleDeleteFriend = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete ${name}?`)) {
      return
    }

    try {
      const response = await fetch(`/api/ai-friends/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setSavedFriends(savedFriends.filter((f) => f.id !== id))
        toast.success("Friend deleted successfully")
      } else {
        const data = await response.json()
        toast.error(data.error || "Failed to delete friend")
      }
    } catch (err) {
      toast.error("Failed to delete friend. Please try again.")
    }
  }

  if (loading || isLoadingFriends) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🤖</div>
          <p className="text-gray-600">Loading AI Playground...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer toasts={toast.toasts} onRemove={toast.removeToast} />

      <header className="bg-white shadow-sm border-b p-4">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <span className="text-4xl mr-3">🎮</span>
          AI Playground
        </h1>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-blue-100 p-4 rounded-lg mb-6 flex items-start space-x-4">
          <div className="text-4xl">🤖</div>
          <div>
            <p className="text-gray-800">
              Welcome to the AI Playground! This is where you can have fun, create, and explore interactive AI
              experiences. Choose an activity below to get started!
            </p>
          </div>
        </div>

        <div className="flex space-x-1 mb-6 bg-white rounded-lg p-1">
          <button className="px-4 py-2 text-sm font-medium text-gray-600">🗺️ Adventure Map</button>
          <button className="px-4 py-2 text-sm font-medium text-gray-600">🏆 Achievements</button>
          <button className="px-4 py-2 text-sm font-medium bg-blue-100 text-blue-700 rounded-md">
            🤖 AI Friend Builder
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-600">🧪 Experiment Lab</button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Build Your AI Friend</h2>
            <p className="text-gray-600 mb-6">Create your very own AI friend! Customize how they look and behave.</p>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name your AI friend</label>
                <input
                  type="text"
                  value={friendName}
                  onChange={(e) => setFriendName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter a name..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Choose a personality</label>
                <select
                  value={personality}
                  onChange={(e) => setPersonality(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Friendly">Friendly</option>
                  <option value="Curious">Curious</option>
                  <option value="Helpful">Helpful</option>
                  <option value="Playful">Playful</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pick your friend's favorite color
                </label>
                <div className="flex space-x-3">
                  {["#4F46E5", "#EF4444", "#10B981", "#F59E0B", "#8B5CF6"].map((c) => (
                    <button
                      key={c}
                      onClick={() => setColor(c)}
                      className={`w-12 h-12 rounded-lg border-2 ${color === c ? "border-gray-800" : "border-gray-300"}`}
                      style={{ backgroundColor: c }}
                      aria-label={`Select color ${c}`}
                    />
                  ))}
                </div>
              </div>

              <button
                onClick={handleSaveFriend}
                disabled={isSaving || !friendName.trim()}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {isSaving ? "Creating..." : "Create AI Friend"}
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Your AI Friend Preview</h3>
            <div className="border-2 border-blue-200 rounded-lg p-8 text-center">
              <div
                className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl"
                style={{ backgroundColor: color }}
              >
                🤖
              </div>
              <h4 className="text-xl font-bold text-blue-700 mb-2">{friendName || "Your Friend"}</h4>
              <p className="text-gray-600">Personality: {personality}</p>
            </div>
          </div>
        </div>

        {savedFriends.length > 0 && (
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Your AI Friends</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedFriends.map((friend) => (
                <div
                  key={friend.id}
                  className="border-2 border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center text-2xl"
                      style={{ backgroundColor: friend.color }}
                    >
                      🤖
                    </div>
                    <button
                      onClick={() => handleDeleteFriend(friend.id, friend.name)}
                      className="text-red-500 hover:text-red-700 text-sm font-medium"
                    >
                      Delete
                    </button>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-1">{friend.name}</h4>
                  <p className="text-sm text-gray-600">Personality: {friend.personality}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
