"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { ToastContainer } from "@/components/toast-notification"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"
import { trackAIFriend } from "@/lib/analytics"
import { useSubscription } from "@/hooks/use-subscription"

interface AIFriend {
  id: string
  name: string
  personality: string
  color: string
  created_at: string
}

export default function AIFriendBuilder() {
  const router = useRouter()
  const toast = useToast()
  const { hasPremium, loading: subscriptionLoading } = useSubscription()

  const [friendName, setFriendName] = useState("")
  const [personality, setPersonality] = useState("Friendly")
  const [color, setColor] = useState("#4F46E5")

  const [savedFriends, setSavedFriends] = useState<AIFriend[]>([])
  const [isSaving, setIsSaving] = useState(false)
  const [isLoadingFriends, setIsLoadingFriends] = useState(true)

  useEffect(() => {
    loadFriendsFromLocalStorage()
    if (!subscriptionLoading && !hasPremium) {
      router.push("/pricing")
    }
  }, [subscriptionLoading, hasPremium, router])

  const loadFriendsFromLocalStorage = () => {
    try {
      const stored = localStorage.getItem("ai_friends")
      if (stored) {
        setSavedFriends(JSON.parse(stored))
      }
    } catch (err) {
      console.error("Error loading friends from localStorage:", err)
    } finally {
      setIsLoadingFriends(false)
    }
  }

  const handleSaveFriend = async () => {
    if (!friendName.trim()) {
      toast.warning("Please enter a name for your AI friend")
      return
    }

    setIsSaving(true)

    try {
      const newFriend: AIFriend = {
        id: crypto.randomUUID(),
        name: friendName,
        personality,
        color,
        created_at: new Date().toISOString(),
      }

      const updatedFriends = [newFriend, ...savedFriends]
      setSavedFriends(updatedFriends)
      localStorage.setItem("ai_friends", JSON.stringify(updatedFriends))

      trackAIFriend("created", friendName)

      toast.success(`${friendName} has been created!`)

      // Reset form
      setFriendName("")
      setPersonality("Friendly")
      setColor("#4F46E5")
    } catch (err) {
      console.error("Error saving friend:", err)
      toast.error("Failed to create friend. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const handleDeleteFriend = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete ${name}?`)) {
      return
    }

    try {
      const updatedFriends = savedFriends.filter((f) => f.id !== id)
      setSavedFriends(updatedFriends)
      localStorage.setItem("ai_friends", JSON.stringify(updatedFriends))

      localStorage.removeItem(`chat_${id}`)

      toast.success("Friend deleted")
    } catch (err) {
      console.error("Error deleting friend:", err)
      toast.error("Failed to delete friend. Please try again.")
    }
  }

  const handleChatWithFriend = (friendId: string) => {
    const friend = savedFriends.find((f) => f.id === friendId)
    if (friend) {
      trackAIFriend("chat_started", friend.name)
    }
    router.push(`/kids/ai-friend/chat/${friendId}`)
  }

  if (isLoadingFriends || subscriptionLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🤖</div>
          <p className="text-gray-600">Loading AI Playground...</p>
        </div>
      </div>
    )
  }

  if (!hasPremium) {
    return null
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
        <div className="bg-blue-100 border-l-4 border-blue-500 p-4 rounded-lg mb-6">
          <div className="flex items-start space-x-3">
            <div className="text-2xl">ℹ️</div>
            <div>
              <p className="text-gray-800 font-medium">Your friends are saved in your browser</p>
              <p className="text-gray-600 text-sm mt-1">
                Create and manage your AI friends! They're stored locally on your device.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-blue-100 p-4 rounded-lg mb-6 flex items-start space-x-4">
          <div className="text-4xl">🤖</div>
          <div>
            <p className="text-gray-600">
              Welcome to the AI Playground! Create your own AI friends and chat with them. Each friend has their own
              unique personality!
            </p>
          </div>
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
                  <p className="text-sm text-gray-600 mb-3">Personality: {friend.personality}</p>
                  <Button onClick={() => handleChatWithFriend(friend.id)} className="w-full" variant="default">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Chat with {friend.name}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
