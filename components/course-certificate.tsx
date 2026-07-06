"use client"

import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, Award, Loader2, Share2 } from "lucide-react"

interface CertificateData {
  studentName: string
  courseTitle: string
  completionDate: string
  totalLessons: number
  averageScore: number | null
}

interface CourseCertificateProps {
  slug: string
}

export function CourseCertificate({ slug }: CourseCertificateProps) {
  const [data, setData] = useState<CertificateData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showCertificate, setShowCertificate] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const fetchCertificate = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/courses/${slug}/certificate`)
      if (!res.ok) {
        const json = await res.json()
        throw new Error(json.error || "Failed to load certificate")
      }
      const json = await res.json()
      setData(json)
      setShowCertificate(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Napaka pri nalaganju certifikata")
    } finally {
      setLoading(false)
    }
  }, [slug])

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString("sl-SI", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  const drawCertificate = useCallback((canvas: HTMLCanvasElement, certData: CertificateData) => {
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const w = 1200
    const h = 850
    canvas.width = w
    canvas.height = h

    // Background
    ctx.fillStyle = "#FFFFFF"
    ctx.fillRect(0, 0, w, h)

    // Outer border - decorative
    const borderWidth = 12
    ctx.strokeStyle = "#7C3AED"
    ctx.lineWidth = borderWidth
    ctx.strokeRect(borderWidth / 2, borderWidth / 2, w - borderWidth, h - borderWidth)

    // Inner border
    ctx.strokeStyle = "#E9D5FF"
    ctx.lineWidth = 2
    ctx.strokeRect(30, 30, w - 60, h - 60)

    // Corner decorations
    const cornerSize = 40
    const corners = [
      [40, 40],
      [w - 40, 40],
      [40, h - 40],
      [w - 40, h - 40],
    ]
    ctx.fillStyle = "#7C3AED"
    for (const [cx, cy] of corners) {
      ctx.beginPath()
      ctx.arc(cx, cy, 6, 0, Math.PI * 2)
      ctx.fill()
    }

    // Top decorative line
    const gradient = ctx.createLinearGradient(200, 0, w - 200, 0)
    gradient.addColorStop(0, "rgba(124, 58, 237, 0)")
    gradient.addColorStop(0.3, "rgba(124, 58, 237, 0.6)")
    gradient.addColorStop(0.5, "rgba(124, 58, 237, 1)")
    gradient.addColorStop(0.7, "rgba(124, 58, 237, 0.6)")
    gradient.addColorStop(1, "rgba(124, 58, 237, 0)")
    ctx.strokeStyle = gradient
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(200, 80)
    ctx.lineTo(w - 200, 80)
    ctx.stroke()

    // Award icon (star shape)
    const starCenterX = w / 2
    const starCenterY = 130
    const outerRadius = 30
    const innerRadius = 14
    const spikes = 5

    ctx.fillStyle = "#7C3AED"
    ctx.beginPath()
    for (let i = 0; i < spikes * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius
      const angle = (Math.PI / 2) * -1 + (Math.PI / spikes) * i
      const x = starCenterX + Math.cos(angle) * radius
      const y = starCenterY + Math.sin(angle) * radius
      if (i === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.closePath()
    ctx.fill()

    // Circle around star
    ctx.strokeStyle = "#E9D5FF"
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.arc(starCenterX, starCenterY, 45, 0, Math.PI * 2)
    ctx.stroke()

    // Title: "CERTIFIKAT"
    ctx.fillStyle = "#7C3AED"
    ctx.font = "bold 14px Arial, Helvetica, sans-serif"
    ctx.textAlign = "center"
    ctx.letterSpacing = "8px"
    ctx.fillText("C E R T I F I K A T", w / 2, 210)

    // Subtitle
    ctx.fillStyle = "#6B7280"
    ctx.font = "16px Arial, Helvetica, sans-serif"
    ctx.letterSpacing = "0px"
    ctx.fillText("o uspešno zaključenem tečaju", w / 2, 240)

    // Decorative line below title
    ctx.strokeStyle = gradient
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.moveTo(350, 260)
    ctx.lineTo(w - 350, 260)
    ctx.stroke()

    // "Podeljen/a"
    ctx.fillStyle = "#9CA3AF"
    ctx.font = "14px Arial, Helvetica, sans-serif"
    ctx.fillText("Podeljen/a", w / 2, 300)

    // Student name
    ctx.fillStyle = "#2D2A3D"
    ctx.font = "bold 38px Arial, Helvetica, sans-serif"
    const displayName = certData.studentName.length > 30
      ? certData.studentName.substring(0, 30) + "..."
      : certData.studentName
    ctx.fillText(displayName, w / 2, 355)

    // Underline under name
    const nameWidth = ctx.measureText(displayName).width
    ctx.strokeStyle = "#7C3AED"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo((w - nameWidth) / 2 - 20, 370)
    ctx.lineTo((w + nameWidth) / 2 + 20, 370)
    ctx.stroke()

    // "za uspesno dokoncanje tecaja"
    ctx.fillStyle = "#6B7280"
    ctx.font = "16px Arial, Helvetica, sans-serif"
    ctx.fillText("za uspešno dokončanje tečaja", w / 2, 415)

    // Course title
    ctx.fillStyle = "#7C3AED"
    ctx.font = "bold 28px Arial, Helvetica, sans-serif"
    const courseTitle = certData.courseTitle.length > 45
      ? certData.courseTitle.substring(0, 45) + "..."
      : certData.courseTitle
    ctx.fillText(courseTitle, w / 2, 460)

    // Stats line
    ctx.fillStyle = "#9CA3AF"
    ctx.font = "14px Arial, Helvetica, sans-serif"
    let statsText = `${certData.totalLessons} lekcij dokončanih`
    if (certData.averageScore !== null) {
      statsText += ` | Povprečna ocena: ${certData.averageScore}%`
    }
    ctx.fillText(statsText, w / 2, 505)

    // Bottom decorative line
    ctx.strokeStyle = gradient
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.moveTo(200, 550)
    ctx.lineTo(w - 200, 550)
    ctx.stroke()

    // Date
    ctx.fillStyle = "#6B7280"
    ctx.font = "14px Arial, Helvetica, sans-serif"
    ctx.fillText(`Datum: ${formatDate(certData.completionDate)}`, w / 2, 600)

    // Platform name
    ctx.fillStyle = "#2D2A3D"
    ctx.font = "bold 18px Arial, Helvetica, sans-serif"
    ctx.fillText("KidsLearnAI", w / 2, 660)

    ctx.fillStyle = "#9CA3AF"
    ctx.font = "13px Arial, Helvetica, sans-serif"
    ctx.fillText("Platforma za učenje umetne inteligence za otroke", w / 2, 685)

    // Bottom decorative line
    ctx.strokeStyle = gradient
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(200, h - 80)
    ctx.lineTo(w - 200, h - 80)
    ctx.stroke()

    // Verification code
    ctx.fillStyle = "#D1D5DB"
    ctx.font = "10px monospace"
    const verificationId = `KLA-${Date.now().toString(36).toUpperCase()}`
    ctx.fillText(`ID: ${verificationId}`, w / 2, h - 50)
  }, [])

  const handleDownload = useCallback(() => {
    if (!canvasRef.current || !data) return

    drawCertificate(canvasRef.current, data)

    const link = document.createElement("a")
    link.download = `certifikat-${slug}.png`
    link.href = canvasRef.current.toDataURL("image/png")
    link.click()
  }, [data, slug, drawCertificate])

  const handleShare = useCallback(async () => {
    if (!canvasRef.current || !data) return

    drawCertificate(canvasRef.current, data)

    try {
      const blob = await new Promise<Blob | null>((resolve) =>
        canvasRef.current!.toBlob(resolve, "image/png")
      )
      if (blob && navigator.share) {
        const file = new File([blob], `certifikat-${slug}.png`, { type: "image/png" })
        await navigator.share({
          title: `Certifikat - ${data.courseTitle}`,
          text: `Uspešno sem zaključil/a tečaj "${data.courseTitle}" na KidsLearnAI!`,
          files: [file],
        })
      }
    } catch {
      // Fallback - just download
      handleDownload()
    }
  }, [data, slug, drawCertificate, handleDownload])

  // Render the certificate preview visually
  if (!showCertificate) {
    return (
      <Card className="border-2 border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50">
        <CardContent className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center">
              <Award className="w-7 h-7 text-amber-600" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-[#2D2A3D] text-lg">
                {"Tvoj certifikat je pripravljen!"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {"Uspešno si zaključil/a vse lekcije. Prevzemi svoj certifikat."}
              </p>
            </div>
          </div>
          <Button
            onClick={fetchCertificate}
            disabled={loading}
            className="bg-amber-500 hover:bg-amber-600 text-white rounded-full gap-2 px-6 flex-shrink-0"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Award className="w-4 h-4" />
            )}
            {"Prevzemi certifikat"}
          </Button>
        </CardContent>
        {error && (
          <div className="px-6 pb-4">
            <p className="text-sm text-red-500">{error}</p>
          </div>
        )}
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {/* Certificate preview card */}
      <Card className="border-2 border-[#7C3AED]/20 overflow-hidden">
        <div className="bg-gradient-to-r from-[#7C3AED] to-[#a78bfa] p-4 flex items-center justify-between">
          <div className="flex items-center gap-3 text-white">
            <Award className="w-6 h-6" />
            <span className="font-heading font-bold text-lg">{"Certifikat o zaključku"}</span>
          </div>
          <div className="flex items-center gap-2">
            {typeof navigator !== "undefined" && navigator.share && (
              <Button
                onClick={handleShare}
                variant="outline"
                size="sm"
                className="bg-white/20 border-white/30 text-white hover:bg-white/30 hover:text-white rounded-full gap-2"
              >
                <Share2 className="w-4 h-4" />
                {"Deli"}
              </Button>
            )}
            <Button
              onClick={handleDownload}
              size="sm"
              className="bg-white text-[#7C3AED] hover:bg-white/90 rounded-full gap-2"
            >
              <Download className="w-4 h-4" />
              {"Prenesi"}
            </Button>
          </div>
        </div>

        {data && (
          <CardContent className="p-8">
            {/* Visual HTML preview of the certificate */}
            <div className="border-4 border-[#7C3AED] rounded-lg p-8 relative bg-white">
              <div className="border border-[#E9D5FF] rounded p-6">
                {/* Star icon */}
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full border-2 border-[#E9D5FF] flex items-center justify-center">
                    <Award className="w-8 h-8 text-[#7C3AED]" />
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-center text-[#7C3AED] text-sm font-bold tracking-[0.3em] mb-1">
                  CERTIFIKAT
                </h2>
                <p className="text-center text-muted-foreground text-sm mb-6">
                  {"o uspešno zaključenem tečaju"}
                </p>

                <div className="w-32 h-px mx-auto bg-gradient-to-r from-transparent via-[#7C3AED] to-transparent mb-6" />

                {/* Student name */}
                <p className="text-center text-muted-foreground text-xs mb-2">{"Podeljen/a"}</p>
                <h3 className="text-center text-3xl font-bold text-[#2D2A3D] mb-2">
                  {data.studentName}
                </h3>
                <div className="w-48 h-0.5 mx-auto bg-[#7C3AED] mb-6" />

                {/* Course title */}
                <p className="text-center text-muted-foreground text-sm mb-2">
                  {"za uspešno dokončanje tečaja"}
                </p>
                <h4 className="text-center text-xl font-bold text-[#7C3AED] mb-2">
                  {data.courseTitle}
                </h4>

                {/* Stats */}
                <p className="text-center text-muted-foreground text-xs mb-6">
                  {data.totalLessons} lekcij dokončanih
                  {data.averageScore !== null && ` | Povprečna ocena: ${data.averageScore}%`}
                </p>

                <div className="w-64 h-px mx-auto bg-gradient-to-r from-transparent via-[#7C3AED]/50 to-transparent mb-6" />

                {/* Date */}
                <p className="text-center text-muted-foreground text-sm mb-6">
                  Datum: {formatDate(data.completionDate)}
                </p>

                {/* Platform */}
                <p className="text-center font-bold text-[#2D2A3D]">KidsLearnAI</p>
                <p className="text-center text-muted-foreground text-xs">
                  {"Platforma za učenje umetne inteligence za otroke"}
                </p>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Hidden canvas for image generation */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  )
}
