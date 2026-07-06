"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Crown, AlertCircle, CheckCircle2, ChevronDown, Sparkles, XCircle, AlertTriangle } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface SubscriptionManagerProps {
  userId: string
  userEmail: string
}

const STATUS_OPTIONS = [
  {
    value: "active",
    label: "Premium",
    description: "Full premium access to all features",
    icon: Crown,
    color: "text-[#7c3aed]",
    bgColor: "bg-[#7c3aed]/20",
    borderColor: "border-[#7c3aed]",
  },
  {
    value: "free",
    label: "Free",
    description: "Basic features only",
    icon: Sparkles,
    color: "text-[#6cd4c3]",
    bgColor: "bg-[#6cd4c3]/20",
    borderColor: "border-[#6cd4c3]",
  },
  {
    value: "canceled",
    label: "Canceled",
    description: "Will revert to free at period end",
    icon: XCircle,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-400",
  },
  {
    value: "past_due",
    label: "Past Due",
    description: "Payment issue, limited access",
    icon: AlertTriangle,
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-400",
  },
]

export function SubscriptionManager({ userId, userEmail }: SubscriptionManagerProps) {
  const [currentStatus, setCurrentStatus] = useState<string | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [open, setOpen] = useState(false)

  console.log("[v0] SubscriptionManager - userId:", userId, "currentStatus:", currentStatus)

  useEffect(() => {
    fetchSubscriptionStatus()
  }, [userId])

  const fetchSubscriptionStatus = async () => {
    try {
      setLoading(true)
      console.log("[v0] Fetching subscription status for user:", userId)
      const response = await fetch(`/api/admin/users/${userId}/subscription`)
      const data = await response.json()

      if (response.ok) {
        console.log("[v0] Subscription status fetched:", data.status)
        setCurrentStatus(data.status || "free")
        setSelectedStatus(data.status || "free")
      } else {
        console.error("[v0] Failed to fetch subscription:", data.error)
        setError(data.error || "Failed to fetch subscription status")
      }
    } catch (err) {
      console.error("[v0] Error fetching subscription:", err)
      setError("Failed to fetch subscription status")
    } finally {
      setLoading(false)
    }
  }

  const handleApply = async () => {
    if (!selectedStatus || selectedStatus === currentStatus) {
      setOpen(false)
      return
    }

    try {
      setUpdating(true)
      setError(null)
      setSuccess(null)

      console.log("[v0] Updating subscription to:", selectedStatus)
      const response = await fetch(`/api/admin/users/${userId}/subscription`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: selectedStatus }),
      })

      const data = await response.json()

      if (response.ok) {
        console.log("[v0] Subscription updated successfully")
        setCurrentStatus(selectedStatus)
        setSuccess(`Subscription updated to ${STATUS_OPTIONS.find((opt) => opt.value === selectedStatus)?.label}`)
        setTimeout(() => setSuccess(null), 3000)
        setOpen(false)
      } else {
        console.error("[v0] Failed to update subscription:", data.error)
        setError(data.error || "Failed to update subscription")
      }
    } catch (err) {
      console.error("[v0] Error updating subscription:", err)
      setError("Failed to update subscription")
    } finally {
      setUpdating(false)
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="py-8">
          <div className="flex items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        </CardContent>
      </Card>
    )
  }

  const currentOption = STATUS_OPTIONS.find((opt) => opt.value === currentStatus)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Crown className="h-5 w-5 text-[#7c3aed]" />
          Subscription Management
        </CardTitle>
        <CardDescription>Manage subscription status for {userEmail}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="border-[#6cd4c3] bg-[#6cd4c3]/10">
            <CheckCircle2 className="h-4 w-4 text-[#6cd4c3]" />
            <AlertDescription className="text-[#6cd4c3]">{success}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Current Status:</span>
            {currentStatus === "active" ? (
              <Badge className="bg-gradient-to-r from-[#7c3aed] to-[#6cd4c3] text-white border-0">
                <Crown className="h-3 w-3 mr-1" />
                Premium
              </Badge>
            ) : (
              <Badge variant="outline">{currentOption?.label || "Free"}</Badge>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Change Status:</label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-between bg-transparent" disabled={updating}>
                  {selectedStatus
                    ? STATUS_OPTIONS.find((opt) => opt.value === selectedStatus)?.label
                    : "Select status..."}
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[480px] p-6" align="start">
                <div className="space-y-5">
                  <div className="text-lg font-bold text-foreground pb-3 border-b-2 border-slate-200">
                    Select New Status
                  </div>
                  <RadioGroup value={selectedStatus || "free"} onValueChange={setSelectedStatus}>
                    <div className="space-y-4">
                      {STATUS_OPTIONS.map((option) => {
                        const Icon = option.icon
                        const isSelected = selectedStatus === option.value
                        return (
                          <div
                            key={option.value}
                            className={`flex items-start space-x-4 rounded-xl border-3 p-5 transition-all cursor-pointer hover:shadow-lg hover:scale-[1.02] ${
                              isSelected
                                ? `${option.borderColor} ${option.bgColor} shadow-md ring-2 ring-offset-2 ${option.borderColor.replace("border", "ring")}`
                                : "border-slate-200 bg-white hover:border-slate-400 hover:bg-slate-50"
                            }`}
                            onClick={() => setSelectedStatus(option.value)}
                          >
                            <RadioGroupItem value={option.value} id={option.value} className="mt-1.5 h-5 w-5" />
                            <Icon className={`h-7 w-7 mt-0.5 ${option.color}`} />
                            <div className="flex-1 space-y-1">
                              <Label
                                htmlFor={option.value}
                                className="text-xl font-bold cursor-pointer block leading-tight"
                              >
                                {option.label}
                              </Label>
                              <p className="text-base text-muted-foreground leading-relaxed">{option.description}</p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </RadioGroup>
                  <div className="flex gap-3 pt-4">
                    <Button
                      onClick={handleApply}
                      disabled={updating}
                      className="flex-1 bg-[#7c3aed] hover:bg-[#6b2fd6] text-white font-bold text-base h-12"
                    >
                      {updating ? "Updating..." : "Apply Changes"}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setOpen(false)}
                      className="flex-1 font-bold text-base h-12 border-2"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
