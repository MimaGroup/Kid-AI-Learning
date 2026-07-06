"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useReferrals } from "@/hooks/use-referrals"
import { useToast } from "@/hooks/use-toast"
import { Gift, Copy, Send, Check, Clock, Mail } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function ReferralWidget() {
  const { referralCode, referralCount, invitations, pendingRewards, loading, sendInvitation, getReferralLink } =
    useReferrals()
  const { success, error } = useToast()
  const [copied, setCopied] = useState(false)
  const [inviteEmail, setInviteEmail] = useState("")
  const [inviteName, setInviteName] = useState("")
  const [sending, setSending] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(referralCode)
      setCopied(true)
      success("Referral code copied to clipboard!")
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      error("Failed to copy code")
    }
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(getReferralLink())
      success("Referral link copied to clipboard!")
    } catch (err) {
      error("Failed to copy link")
    }
  }

  const handleSendInvite = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inviteEmail) return

    setSending(true)
    try {
      await sendInvitation(inviteEmail, inviteName)
      success("Invitation sent successfully!")
      setInviteEmail("")
      setInviteName("")
      setDialogOpen(false)
    } catch (err) {
      error(err instanceof Error ? err.message : "Failed to send invitation")
    } finally {
      setSending(false)
    }
  }

  if (loading) {
    return (
      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-purple-200 rounded w-1/2"></div>
            <div className="h-8 bg-purple-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 text-white border-0 shadow-xl overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

      <CardHeader className="relative">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-white/20 rounded-full">
            <Gift className="w-5 h-5" />
          </div>
          <div>
            <CardTitle className="text-xl">Invite Friends & Earn</CardTitle>
            <CardDescription className="text-white/80">Get 1 free month for each friend who subscribes</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative space-y-4">
        {/* Stats */}
        <div className="flex gap-4">
          <div className="flex-1 bg-white/20 rounded-xl p-3 text-center">
            <div className="text-2xl font-bold">{referralCount}</div>
            <div className="text-xs text-white/80">Friends Referred</div>
          </div>
          <div className="flex-1 bg-white/20 rounded-xl p-3 text-center">
            <div className="text-2xl font-bold">{pendingRewards.length}</div>
            <div className="text-xs text-white/80">Rewards Pending</div>
          </div>
        </div>

        {/* Referral Code */}
        <div className="bg-white/20 rounded-xl p-4">
          <div className="text-xs text-white/80 mb-1">Your Referral Code</div>
          <div className="flex items-center gap-2">
            <div className="flex-1 font-mono text-2xl font-bold tracking-wider">{referralCode}</div>
            <Button
              size="sm"
              variant="secondary"
              onClick={handleCopyCode}
              className="bg-white/30 hover:bg-white/40 text-white border-0"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            onClick={handleCopyLink}
            variant="secondary"
            className="flex-1 bg-white text-purple-600 hover:bg-white/90"
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy Link
          </Button>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex-1 bg-white/20 hover:bg-white/30 text-white border-0">
                <Mail className="w-4 h-4 mr-2" />
                Send Invite
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Invite a Friend</DialogTitle>
                <DialogDescription>
                  Send a referral invitation. They'll get a 14-day free trial, and you'll get a free month when they
                  subscribe!
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSendInvite} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="inviteName">Friend's Name (optional)</Label>
                  <Input
                    id="inviteName"
                    placeholder="John"
                    value={inviteName}
                    onChange={(e) => setInviteName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="inviteEmail">Friend's Email</Label>
                  <Input
                    id="inviteEmail"
                    type="email"
                    placeholder="friend@example.com"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" disabled={sending || !inviteEmail} className="w-full">
                  {sending ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Invitation
                    </>
                  )}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Recent Invitations */}
        {invitations.length > 0 && (
          <div className="space-y-2">
            <div className="text-xs text-white/80 font-medium">Recent Invitations</div>
            <div className="space-y-1">
              {invitations.slice(0, 3).map((inv) => (
                <div
                  key={inv.id}
                  className="flex items-center justify-between bg-white/10 rounded-lg px-3 py-2 text-sm"
                >
                  <span className="truncate">{inv.invitee_email}</span>
                  <Badge
                    variant="outline"
                    className={`text-xs border-white/30 ${
                      inv.status === "accepted" ? "bg-green-500/30 text-white" : "bg-white/20 text-white"
                    }`}
                  >
                    {inv.status === "accepted" ? (
                      <>
                        <Check className="w-3 h-3 mr-1" />
                        Joined
                      </>
                    ) : (
                      <>
                        <Clock className="w-3 h-3 mr-1" />
                        Pending
                      </>
                    )}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Incentive Reminder */}
        <div className="text-center text-xs text-white/70 pt-2 border-t border-white/20">
          🎁 Your friend gets 14-day trial • You get 1 free month per subscription
        </div>
      </CardContent>
    </Card>
  )
}
