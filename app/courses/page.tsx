"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { CourseCard } from "@/components/course-card"
import { Footer } from "@/components/footer"
import { Sparkles, GraduationCap, ShieldCheck, Zap, ArrowLeft } from "lucide-react"
import { BYTE_CHARACTER } from "@/lib/byte-character"

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
  is_published?: boolean
  category: string
  curriculum: any[]
  learning_outcomes: string[]
}

const categoryFilters = [
  { key: "all", label: "Vsi tečaji" },
  { key: "ai", label: "Umetna inteligenca" },
  { key: "coding", label: "Programiranje" },
  { key: "creativity", label: "Kreativnost" },
  { key: "robotics", label: "Robotika" },
  { key: "safety", label: "Varnost" },
]

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState("all")

  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await fetch("/api/courses")
        const data = await res.json()
        setCourses(data.courses || [])
      } catch (error) {
        console.error("Failed to fetch courses:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchCourses()
  }, [])

  const filteredCourses = activeFilter === "all"
    ? courses
    : courses.filter(c => c.category === activeFilter)

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
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2 text-[#64748B]">
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Domov</span>
              </Button>
            </Link>
            <Link href="/auth/sign-up">
              <Button size="sm" className="bg-[#7C3AED] hover:bg-[#6B2FD6] text-white rounded-full px-6">
                {'Začni brezplačno'}
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#7C3AED]/10 text-[#7C3AED] px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <GraduationCap className="w-4 h-4" />
            {'Online tečaji za otroke'}
          </div>
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-[#2D2A3D] mb-6 text-balance">
            {'Naučite otroke veščin prihodnosti'}
          </h1>
          <p className="text-lg md:text-xl text-[#64748B] max-w-2xl mx-auto mb-8 text-pretty">
            {'Interaktivni tečaji o umetni inteligenci, programiranju in digitalnih veščinah, zasnovani posebej za otroke od 6 do 16 let.'}
          </p>
        </div>
      </section>

      {/* Trust badges */}
      <section className="pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-6 md:gap-10">
          <div className="flex items-center gap-2 text-sm text-[#64748B]">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            <span>Varno za otroke</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-[#64748B]">
            <Zap className="w-5 h-5 text-amber-500" />
            <span>{'Interaktivno učenje'}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-[#64748B]">
            <Sparkles className="w-5 h-5 text-[#7C3AED]" />
            <span>{'Certificirani tečaji'}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-[#64748B]">
            <GraduationCap className="w-5 h-5 text-blue-500" />
            <span>Dostop za vedno</span>
          </div>
        </div>
      </section>

      {/* Filter tabs */}
      <section className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2 justify-center">
            {categoryFilters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeFilter === filter.key
                    ? "bg-[#7C3AED] text-white shadow-md"
                    : "bg-white text-[#64748B] hover:bg-[#7C3AED]/10 hover:text-[#7C3AED] border border-gray-200"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Course Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl border-2 border-gray-100 overflow-hidden animate-pulse">
                  <div className="aspect-[16/10] bg-gray-200" />
                  <div className="p-5 space-y-3">
                    <div className="h-5 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-100 rounded w-full" />
                    <div className="h-4 bg-gray-100 rounded w-2/3" />
                    <div className="flex gap-4 pt-2">
                      <div className="h-3 bg-gray-100 rounded w-16" />
                      <div className="h-3 bg-gray-100 rounded w-16" />
                      <div className="h-3 bg-gray-100 rounded w-16" />
                    </div>
                    <div className="pt-3 border-t border-gray-100 flex justify-between">
                      <div className="h-6 bg-gray-200 rounded w-20" />
                      <div className="h-4 bg-gray-100 rounded w-24" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 rounded-full bg-[#7C3AED]/10 flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-10 h-10 text-[#7C3AED]" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-[#2D2A3D] mb-3">
                {"Tečaji prihajajo kmalu!"}
              </h3>
              <p className="text-[#64748B] max-w-md mx-auto mb-6 leading-relaxed">
                {"Pridno pripravljamo interaktivne tečaje o umetni inteligenci, programiranju in digitalnih veščinah. Prijavite se, da vas obvestimo, ko bodo na voljo!"}
              </p>
              <Link href="/auth/sign-up">
                <Button className="bg-[#7C3AED] hover:bg-[#6B2FD6] text-white rounded-full px-8 py-3">
                  {"Obvestite me"}
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
