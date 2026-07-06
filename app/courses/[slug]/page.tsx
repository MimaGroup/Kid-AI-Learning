"use client"

import { useState, useEffect } from "react"
import { useParams, useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Footer } from "@/components/footer"
import { BYTE_CHARACTER } from "@/lib/byte-character"
import { useSubscription } from "@/hooks/use-subscription"
import {
  ArrowLeft,
  Clock,
  BookOpen,
  Users,
  CheckCircle2,
  GraduationCap,
  ShieldCheck,
  Loader2,
  Lock,
  Play,
  Sparkles,
} from "lucide-react"

interface Course {
  id: string
  slug: string
  title: string
  description: string
  long_description: string | null
  price: number
  currency: string
  age_min: number
  age_max: number
  difficulty: string
  duration_minutes: number
  lessons_count: number
  thumbnail_url: string | null
  is_free: boolean
  category: string
  curriculum: { title: string; lessons: number }[]
  learning_outcomes: string[]
}

function formatPrice(priceInCents: number): string {
  if (priceInCents === 0) return "Brezplačno"
  return `${(priceInCents / 100).toFixed(2).replace(".", ",")} EUR`
}

function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  if (hours === 0) return `${minutes} min`
  if (mins === 0) return `${hours} ur`
  return `${hours} ur ${mins} min`
}

function getDifficultyLabel(difficulty: string): string {
  switch (difficulty) {
    case "beginner": return "Začetnik"
    case "intermediate": return "Srednji"
    case "advanced": return "Napreden"
    default: return difficulty
  }
}

function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case "beginner": return "bg-emerald-100 text-emerald-800 border-emerald-200"
    case "intermediate": return "bg-amber-100 text-amber-800 border-amber-200"
    case "advanced": return "bg-rose-100 text-rose-800 border-rose-200"
    default: return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

export default function CourseDetailPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const slug = params.slug as string
  const justPurchased = searchParams.get("purchased") === "true"

  const [course, setCourse] = useState<Course | null>(null)
  const [purchased, setPurchased] = useState(false)
  const [loading, setLoading] = useState(true)
  const [purchasing, setPurchasing] = useState(false)
  const { hasPremium, loading: subscriptionLoading } = useSubscription()

  useEffect(() => {
    async function fetchCourse() {
      try {
        const res = await fetch(`/api/courses/${slug}`)
        if (!res.ok) throw new Error("Not found")
        const data = await res.json()
        setCourse(data.course)
        setPurchased(data.purchased || justPurchased)
      } catch (error) {
        console.error("Failed to fetch course:", error)
      } finally {
        setLoading(false)
      }
    }
    if (slug) fetchCourse()
  }, [slug, justPurchased])

  const handlePurchase = async () => {
    if (!course) return
    setPurchasing(true)

    try {
      const res = await fetch("/api/courses/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId: course.id,
          courseSlug: course.slug,
          courseTitle: course.title,
          priceInCents: course.price,
        }),
      })

      const data = await res.json()

      if (res.status === 401) {
        window.location.href = `/auth/sign-up?redirect=/courses/${course.slug}`
        return
      }

      if (data.free) {
        setPurchased(true)
        return
      }

      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error("Purchase failed:", error)
    } finally {
      setPurchasing(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#FAFBFF] to-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#7C3AED]" />
      </div>
    )
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#FAFBFF] to-white flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-heading font-bold text-[#2D2A3D]">{"Tečaj ni najden"}</h1>
        <Link href="/courses">
          <Button className="bg-[#7C3AED] hover:bg-[#6B2FD6] text-white rounded-full">
            {"Nazaj na tečaje"}
          </Button>
        </Link>
      </div>
    )
  }

  const outcomes = Array.isArray(course.learning_outcomes) ? course.learning_outcomes : []
  const curriculum = Array.isArray(course.curriculum) ? course.curriculum : []

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAFBFF] to-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-lg overflow-hidden ring-2 ring-[#7C3AED]/20">
              <Image
                src={BYTE_CHARACTER.images.avatar || "/placeholder.svg"}
                alt="KidsLearnAI"
                width={32}
                height={32}
                className="object-cover w-full h-full"
              />
            </div>
            <span className="font-heading font-bold text-lg text-[#2D2A3D]">KidsLearnAI</span>
          </Link>
          <Link href="/courses">
            <Button variant="ghost" size="sm" className="gap-2 text-[#64748B]">
              <ArrowLeft className="w-4 h-4" />
              {"Vsi tečaji"}
            </Button>
          </Link>
        </div>
      </header>

      {/* Success Banner */}
      {justPurchased && (
        <div className="bg-emerald-50 border-b border-emerald-200 py-4 px-4">
          <div className="max-w-4xl mx-auto flex items-center gap-3 text-emerald-800">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            <p className="font-medium">
              {"Nakup uspešen! Zdaj imate dostop do tega tečaja. Hvala za zaupanje!"}
            </p>
          </div>
        </div>
      )}

      {/* Hero section */}
      <section className="py-10 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Left: Course info */}
            <div className="lg:col-span-3 order-2 lg:order-1">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className={`${getDifficultyColor(course.difficulty)} border text-xs font-semibold`}>
                  {getDifficultyLabel(course.difficulty)}
                </Badge>
                <Badge className="bg-[#7C3AED]/10 text-[#7C3AED] border-[#7C3AED]/20 text-xs font-semibold">
                  {course.age_min}-{course.age_max} let
                </Badge>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-[#2D2A3D] mb-4 text-balance">
                {course.title}
              </h1>

              <p className="text-lg text-[#64748B] mb-6 leading-relaxed">
                {course.long_description || course.description}
              </p>

              <div className="flex flex-wrap items-center gap-5 text-sm text-[#64748B] mb-8">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#7C3AED]" />
                  {formatDuration(course.duration_minutes)}
                </span>
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-[#7C3AED]" />
                  {course.lessons_count} lekcij
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-[#7C3AED]" />
                  {course.age_min}-{course.age_max} let
                </span>
                <span className="flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-[#7C3AED]" />
                  Certifikat
                </span>
              </div>
            </div>

            {/* Right: Subscription/Purchase card */}
            <div className="lg:col-span-2 order-1 lg:order-2">
              <Card className="overflow-hidden border-2 border-gray-100 shadow-lg sticky top-24">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={course.thumbnail_url || "/placeholder.svg"}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                  {(purchased || hasPremium) && !course.is_free && (
                    <div className="absolute inset-0 bg-emerald-600/80 flex items-center justify-center">
                      <div className="text-center text-white">
                        <CheckCircle2 className="w-12 h-12 mx-auto mb-2" />
                        <p className="font-bold text-lg">{hasPremium ? "Pro dostop" : "Že kupljeno"}</p>
                      </div>
                    </div>
                  )}
                </div>
                <CardContent className="p-6">
                  {/* Show different UI based on subscription status */}
                  {purchased || hasPremium ? (
                    /* User has access - show start learning button */
                    <>
                      <Link href={`/courses/${course.slug}/learn`}>
                        <Button
                          size="lg"
                          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-full py-6 text-lg gap-2"
                        >
                          <Play className="w-5 h-5" />
                          {"Začni z učenjem"}
                        </Button>
                      </Link>
                      <div className="mt-6 space-y-3">
                        <div className="flex items-center gap-2 text-sm text-[#64748B]">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                          <span>Dostop za vedno</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[#64748B]">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                          <span>Certifikat ob zaključku</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[#64748B]">
                          <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                          <span>Varno plačilo s Stripe</span>
                        </div>
                      </div>
                    </>
                  ) : course.is_free ? (
                    /* Free course - show get free button */
                    <>
                      <Button
                        size="lg"
                        onClick={handlePurchase}
                        disabled={purchasing}
                        className="w-full bg-[#7C3AED] hover:bg-[#6B2FD6] text-white rounded-full py-6 text-lg gap-2"
                      >
                        {purchasing ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <>
                            <GraduationCap className="w-5 h-5" />
                            {"Pridobi brezplačno"}
                          </>
                        )}
                      </Button>
                      <div className="mt-6 space-y-3">
                        <div className="flex items-center gap-2 text-sm text-[#64748B]">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                          <span>Dostop za vedno</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[#64748B]">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                          <span>Certifikat ob zaključku</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    /* Not subscribed - show subscription options */
                    <>
                      <h3 className="text-lg font-heading font-bold text-[#2D2A3D] mb-4">
                        {"Dostop do vseh tečajev"}
                      </h3>
                      
                      {/* Plan options */}
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <Link href="/pricing" className="block">
                          <div className="border-2 border-gray-200 rounded-xl p-4 text-center hover:border-[#7C3AED]/50 transition-colors">
                            <p className="text-sm text-[#64748B] mb-1">Mesečno</p>
                            <p className="text-xl font-bold text-[#2D2A3D]">7,90 EUR</p>
                            <p className="text-xs text-[#94A3B8]">/mesec</p>
                          </div>
                        </Link>
                        <Link href="/pricing" className="block">
                          <div className="border-2 border-[#7C3AED] rounded-xl p-4 text-center relative">
                            <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                              <Badge className="bg-[#7C3AED] text-white text-[10px] px-2 py-0.5">
                                Prihranite 35 EUR
                              </Badge>
                            </div>
                            <p className="text-sm text-[#64748B] mb-1">Letno</p>
                            <p className="text-xl font-bold text-[#7C3AED]">59 EUR</p>
                            <p className="text-xs text-[#94A3B8]">/leto</p>
                          </div>
                        </Link>
                      </div>

                      <Link href="/pricing">
                        <Button
                          size="lg"
                          className="w-full bg-[#7C3AED] hover:bg-[#6B2FD6] text-white rounded-full py-6 text-lg gap-2"
                        >
                          <Sparkles className="w-5 h-5" />
                          {"Začni Pro — 7 dni brezplačno"}
                        </Button>
                      </Link>

                      <div className="text-center mt-3">
                        <Link 
                          href="/auth/sign-up" 
                          className="text-sm text-[#7C3AED] hover:underline font-medium"
                        >
                          {"Ali začni brezplačno →"}
                        </Link>
                      </div>

                      <div className="mt-6 space-y-3">
                        <div className="flex items-center gap-2 text-sm text-[#64748B]">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                          <span>Dostop za vedno</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[#64748B]">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                          <span>Certifikat ob zaključku</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[#64748B]">
                          <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                          <span>Varno plačilo s Stripe</span>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Learning outcomes */}
      {outcomes.length > 0 && (
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-[#2D2A3D] mb-8">
              {"Kaj se boste naučili"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {outcomes.map((outcome, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-[#F5F3FF] rounded-xl">
                  <CheckCircle2 className="w-5 h-5 text-[#7C3AED] mt-0.5 flex-shrink-0" />
                  <span className="text-[#2D2A3D] font-medium">{outcome}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Curriculum */}
      {curriculum.length > 0 && (
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-[#2D2A3D] mb-8">
              {"Vsebina tečaja"}
            </h2>
            <div className="space-y-3">
              {curriculum.map((module, i) => (
                <Card key={i} className="border-2 border-gray-100">
                  <CardContent className="p-5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#7C3AED]/10 flex items-center justify-center text-[#7C3AED] font-bold text-sm">
                        {i + 1}
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-[#2D2A3D]">{module.title}</h3>
                        <p className="text-sm text-[#94A3B8]">{module.lessons} lekcij</p>
                      </div>
                    </div>
                    {!purchased && (
                      <Lock className="w-4 h-4 text-[#94A3B8]" />
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      {!purchased && !hasPremium && !course.is_free && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#F5F3FF] to-[#F0FDFA]">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-[#2D2A3D] mb-4">
              {"Pripravljeni na začetek?"}
            </h2>
            <p className="text-[#64748B] mb-8">
              {"Vlagajte v prihodnost svojega otroka z znanjem, ki bo relevantno še desetletja."}
            </p>
            <Link href="/pricing">
              <Button
                size="lg"
                className="bg-[#7C3AED] hover:bg-[#6B2FD6] text-white rounded-full px-10 py-6 text-lg gap-2"
              >
                <Sparkles className="w-5 h-5" />
                {"Začni Pro — 7 dni brezplačno"}
              </Button>
            </Link>
          </div>
        </section>
      )}

      <Footer />
    </div>
  )
}
