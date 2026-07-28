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
      success("Priporočilna koda kopirana!")
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      error("Kopiranje kode ni uspelo")
    }
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(getReferralLink())
      success("Priporočilna povezava kopirana!")
    } catch (err) {
      error("Kopiranje povezave ni uspelo")
    }
  }

  const handleSendInvite = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inviteEmail) return

    setSending(true)
    try {
      await sendInvitation(inviteEmail, inviteName)
      success("Povabilo je bilo uspešno poslano!")
      setInviteEmail("")
      setInviteName("")
      setDialogOpen(false)
    } catch (err) {
      error(err instanceof Error ? err.message : "Pošiljanje povabila ni uspelo")
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
            <CardTitle className="text-xl">Povabi prijatelje in prejmi nagrado</CardTitle>
            <CardDescription className="text-white/80">Za vsakega prijatelja, ki se naroči, dobite 1 brezplačen mesec</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative space-y-4">
        {/* Stats */}
        <div className="flex gap-4">
          <div className="flex-1 bg-white/20 rounded-xl p-3 text-center">
            <div className="text-2xl font-bold">{referralCount}</div>
            <div className="text-xs text-white/80">Povabljenih prijateljev</div>
          </div>
          <div className="flex-1 bg-white/20 rounded-xl p-3 text-center">
            <div className="text-2xl font-bold">{pendingRewards.length}</div>
            <div className="text-xs text-white/80">Nagrad v obravnavi</div>
          </div>
        </div>

        {/* Referral Code */}
        <div className="bg-white/20 rounded-xl p-4">
          <div className="text-xs text-white/80 mb-1">Vaša priporočilna koda</div>
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
            Kopiraj povezavo
          </Button>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex-1 bg-white/20 hover:bg-white/30 text-white border-0">
                <Mail className="w-4 h-4 mr-2" />
                Pošlji povabilo
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Povabi prijatelja</DialogTitle>
                <DialogDescription>
                  Pošljite priporočilno povabilo. Prijatelj dobi 7 dni brezplačno preskusno obdobje, vi pa brezplačen
                  mesec, ko se naroči!
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSendInvite} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="inviteName">Ime prijatelja (neobvezno)</Label>
                  <Input
                    id="inviteName"
                    placeholder="Jan"
                    value={inviteName}
                    onChange={(e) => setInviteName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="inviteEmail">E-pošta prijatelja</Label>
                  <Input
                    id="inviteEmail"
                    type="email"
                    placeholder="prijatelj@primer.com"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" disabled={sending || !inviteEmail} className="w-full">
                  {sending ? (
                    "Pošiljanje ..."
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Pošlji povabilo
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
            <div className="text-xs text-white/80 font-medium">Nedavna povabila</div>
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
                      inv.status === "accepted"
                        ? "bg-green-500/30 text-white"
                        : inv.status === "expired"
                          ? "bg-white/10 text-white/50"
                          : "bg-white/20 text-white"
                    }`}
                  >
                    {inv.status === "accepted" ? (
                      <>
                        <Check className="w-3 h-3 mr-1" />
                        Pridružen
                      </>
                    ) : inv.status === "expired" ? (
                      <>
                        <Clock className="w-3 h-3 mr-1" />
                        Poteklo
                      </>
                    ) : (
                      <>
                        <Clock className="w-3 h-3 mr-1" />
                        V obravnavi
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
          🎁 Vaš prijatelj dobi 7 dni brezplačno · Vi dobite 1 brezplačen mesec ob vsaki naročnini
        </div>
      </CardContent>
    </Card>
  )
}
