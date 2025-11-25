"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Copy, Check, UserPlus, X, ArrowLeft, Users } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { addFriendBySecretKey, removeFriend } from "./actions"

interface Friend {
  id: string
  status: string
  created_at: string
  friend: {
    id: string
    display_name: string
    email: string
    secret_key: string
  }
}

interface FriendsPageClientProps {
  secretKey: string
  userName: string
  friends: Friend[]
}

export function FriendsPageClient({ secretKey, userName, friends }: FriendsPageClientProps) {
  const [copied, setCopied] = useState(false)
  const [friendKey, setFriendKey] = useState("")
  const [inviteName, setInviteName] = useState("")
  const [inviteEmail, setInviteEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()

  const handleCopyKey = async () => {
    await navigator.clipboard.writeText(secretKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleAddFriend = async () => {
    if (!friendKey.trim()) return

    setLoading(true)
    setError("")
    setSuccess("")

    try {
      const result = await addFriendBySecretKey(friendKey.trim().toUpperCase())

      if (!result.success) {
        throw new Error(result.error || "Failed to add friend")
      }

      setSuccess(`Friend ${result.friendName} added successfully!`)
      setFriendKey("")
      router.refresh()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleInviteFriend = async () => {
    if (!inviteName.trim() || !inviteEmail.trim()) {
      setError("Please enter both name and email")
      return
    }

    setLoading(true)
    setError("")
    setSuccess("")

    try {
      const response = await fetch("/api/friends/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: inviteName.trim(),
          email: inviteEmail.trim(),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to send invitation")
      }

      setSuccess("Invitation sent successfully!")
      setInviteName("")
      setInviteEmail("")
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleRemoveFriend = async (friendshipId: string) => {
    if (!confirm("Are you sure you want to remove this friend?")) return

    try {
      const result = await removeFriend(friendshipId)

      if (!result.success) {
        throw new Error(result.error || "Failed to remove friend")
      }

      router.refresh()
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 relative overflow-hidden">
      {/* AI-themed floating decorative emojis */}
      <div
        className="absolute top-20 left-10 text-6xl opacity-25 animate-bounce"
        style={{ filter: "drop-shadow(0 4px 8px rgba(147, 51, 234, 0.4))" }}
      >
        👥
      </div>
      <div
        className="absolute top-40 right-20 text-5xl opacity-25 animate-pulse"
        style={{ filter: "drop-shadow(0 4px 8px rgba(236, 72, 153, 0.4))" }}
      >
        🤝
      </div>
      <div
        className="absolute bottom-40 left-1/4 text-4xl opacity-25 animate-bounce delay-100"
        style={{ filter: "drop-shadow(0 4px 8px rgba(59, 130, 246, 0.4))" }}
      >
        💬
      </div>
      <div
        className="absolute bottom-60 right-1/3 text-5xl opacity-20 animate-pulse delay-200"
        style={{ filter: "drop-shadow(0 4px 8px rgba(245, 158, 11, 0.4))" }}
      >
        🎉
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Header Banner */}
        <div className="relative bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 text-white p-8 rounded-3xl mb-8 shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 text-9xl opacity-10">👥</div>
          <div className="absolute bottom-0 left-0 text-7xl opacity-10">🤝</div>
          <div className="relative z-10">
            <Link
              href="/kids/home"
              className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </Link>
            <div className="flex items-center space-x-4">
              <div className="text-5xl">
                <Users className="w-16 h-16" />
              </div>
              <div>
                <h1 className="text-4xl font-bold">MY FRIENDS</h1>
                <p className="text-pink-100 text-lg">Connect and learn together!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Error and Success Messages */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border-2 border-red-300 rounded-2xl text-red-800 shadow-lg">{error}</div>
        )}
        {success && (
          <div className="mb-6 p-4 bg-green-100 border-2 border-green-300 rounded-2xl text-green-800 shadow-lg">
            {success}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Secret Key Card */}
          <div className="bg-gradient-to-br from-orange-400 to-orange-600 text-white p-6 rounded-3xl shadow-xl hover:scale-105 transition-transform">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="text-2xl">🔑</span>
              Your secret key
            </h2>
            <div className="bg-white rounded-2xl p-4 mb-4 shadow-lg">
              <p className="text-2xl font-bold text-gray-900 text-center tracking-wider">{secretKey}</p>
            </div>
            <Button
              onClick={handleCopyKey}
              className="w-full bg-white hover:bg-gray-100 text-orange-600 font-semibold shadow-lg rounded-xl"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Share
                </>
              )}
            </Button>
          </div>

          {/* Add Friend Card */}
          <div className="bg-gradient-to-br from-blue-400 to-blue-600 text-white p-6 rounded-3xl shadow-xl hover:scale-105 transition-transform">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="text-2xl">➕</span>
              Add a friend
            </h2>
            <Input
              placeholder="Enter your friend's secret key"
              value={friendKey}
              onChange={(e) => setFriendKey(e.target.value.toUpperCase())}
              className="mb-4 bg-white text-gray-900 placeholder:text-gray-500 border-0 rounded-xl shadow-lg"
              maxLength={8}
            />
            <Button
              onClick={handleAddFriend}
              disabled={loading || !friendKey.trim()}
              className="w-full bg-white hover:bg-gray-100 text-blue-600 font-semibold shadow-lg rounded-xl disabled:opacity-50"
            >
              ADD
            </Button>
          </div>
        </div>

        {/* Friends List */}
        {friends.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-3xl">👥</span>
              Your Friends
            </h2>
            <div className="grid gap-4">
              {friends.map((friendship) => (
                <div
                  key={friendship.id}
                  className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-xl border-2 border-purple-200 hover:scale-102 transition-transform flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-2xl">
                      👤
                    </div>
                    <div>
                      <p className="font-semibold text-lg text-gray-900">
                        {friendship.friend.display_name || friendship.friend.email}
                      </p>
                      <p className="text-sm text-gray-600">Key: {friendship.friend.secret_key}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveFriend(friendship.id)}
                    className="text-red-500 hover:text-red-600 hover:bg-red-100 rounded-full"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Invite Section */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border-2 border-purple-200">
          <div className="text-center mb-6">
            <div className="text-4xl mb-3">✉️</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Invite Friends</h3>
            <p className="text-gray-700 leading-relaxed">
              {friends.length === 0
                ? "Looks like you don't have any friends on KidsLearnAI yet. Want to invite some? Send them an invitation to join the fun and start exploring AI together."
                : "Invite more friends to join the fun and start exploring AI together!"}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <Input
              placeholder="Add your Friend's name"
              value={inviteName}
              onChange={(e) => setInviteName(e.target.value)}
              className="bg-white border-2 border-purple-200 text-gray-900 placeholder:text-gray-500 rounded-xl shadow-md focus:border-purple-400"
            />
            <Input
              type="email"
              placeholder="Add your Friend's Email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              className="bg-white border-2 border-purple-200 text-gray-900 placeholder:text-gray-500 rounded-xl shadow-md focus:border-purple-400"
            />
          </div>

          <Button
            onClick={handleInviteFriend}
            disabled={loading || !inviteName.trim() || !inviteEmail.trim()}
            className="w-full md:w-auto mx-auto flex bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-6 px-8 rounded-xl text-lg shadow-xl disabled:opacity-50 items-center justify-center gap-3"
          >
            <UserPlus className="w-5 h-5" />
            <span>Invite my friend</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
