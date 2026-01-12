"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Share2, Check, Download, Facebook, Mail } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useReferrals } from "@/hooks/use-referrals"

export function ReferralShareCard() {
  const { referralCode, getReferralLink } = useReferrals()
  const { success } = useToast()
  const [copied, setCopied] = useState(false)

  const shareText = `Pridruži se meni na KidsLearnAI - zabavni AI učni platformi za otroke! 🎮📚\n\nUporabi mojo kodo ${referralCode} za 7 dni brezplačnega dostopa.\n\n`

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(getReferralLink())
      setCopied(true)
      success("Link skopiran!")
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("[v0] Failed to copy:", err)
    }
  }

  const handleShareFacebook = () => {
    const url = encodeURIComponent(getReferralLink())
    const text = encodeURIComponent(shareText)
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, "_blank", "width=600,height=400")
  }

  const handleShareEmail = () => {
    const subject = encodeURIComponent("Poskusi KidsLearnAI - AI učenje za otroke")
    const body = encodeURIComponent(`${shareText}${getReferralLink()}`)
    window.location.href = `mailto:?subject=${subject}&body=${body}`
  }

  const handleDownloadGraphic = async () => {
    // Create a shareable graphic
    const canvas = document.createElement("canvas")
    canvas.width = 1200
    canvas.height = 630
    const ctx = canvas.getContext("2d")

    if (!ctx) return

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 1200, 630)
    gradient.addColorStop(0, "#7C3AED")
    gradient.addColorStop(0.5, "#EC4899")
    gradient.addColorStop(1, "#6CD4C3")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 1200, 630)

    // Add text
    ctx.fillStyle = "#FFFFFF"
    ctx.font = "bold 64px Arial"
    ctx.textAlign = "center"
    ctx.fillText("KidsLearnAI", 600, 200)

    ctx.font = "32px Arial"
    ctx.fillText("Zaslon, ki uči. Igra, ki razvija.", 600, 280)

    ctx.font = "bold 48px Arial"
    ctx.fillText(`Uporabi kodo: ${referralCode}`, 600, 400)

    ctx.font = "28px Arial"
    ctx.fillText("za 7 dni brezplačnega dostopa", 600, 480)

    ctx.fillText("kids-learning-ai.com", 600, 560)

    // Download
    canvas.toBlob((blob) => {
      if (!blob) return
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `kidslearnai-referral-${referralCode}.png`
      a.click()
      URL.revokeObjectURL(url)
      success("Grafika prenesena!")
    })
  }

  return (
    <Card className="p-6 bg-gradient-to-br from-purple-50 to-teal-50 border-purple-200">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Share2 className="w-5 h-5 text-purple-600" />
          <h3 className="font-heading font-bold text-lg text-gray-900">Deli s prijatelji</h3>
        </div>

        <p className="text-sm text-gray-600">
          Povabi prijatelje in dobite oba nagrade - oni 7 dni brezplačnega dostopa, ti pa mesec premium!
        </p>

        <div className="flex flex-col gap-2">
          <Button onClick={handleCopyLink} variant="outline" className="w-full justify-start gap-2 bg-transparent">
            {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
            {copied ? "Skopirano!" : "Kopiraj povezavo"}
          </Button>

          <Button onClick={handleShareFacebook} variant="outline" className="w-full justify-start gap-2 bg-transparent">
            <Facebook className="w-4 h-4 text-blue-600" />
            Deli na Facebooku
          </Button>

          <Button onClick={handleShareEmail} variant="outline" className="w-full justify-start gap-2 bg-transparent">
            <Mail className="w-4 h-4 text-gray-600" />
            Pošlji po e-pošti
          </Button>

          <Button
            onClick={handleDownloadGraphic}
            variant="outline"
            className="w-full justify-start gap-2 bg-transparent"
          >
            <Download className="w-4 h-4 text-purple-600" />
            Prenesi grafiko za deljenje
          </Button>
        </div>

        {/* Preview of referral code */}
        <div className="mt-4 p-4 bg-white rounded-lg border-2 border-dashed border-purple-300 text-center">
          <div className="text-xs text-gray-500 mb-1">Tvoja referral koda</div>
          <div className="font-mono text-2xl font-bold bg-gradient-to-r from-purple-600 to-teal-500 bg-clip-text text-transparent">
            {referralCode}
          </div>
        </div>
      </div>
    </Card>
  )
}
