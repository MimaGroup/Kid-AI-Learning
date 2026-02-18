"use client"

import Link from "next/link"
import Image from "next/image"
import { Clock, BookOpen, Users, EyeOff } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface Course {
  id: string
  slug: string
  title: string
  description: string
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
}

function formatPrice(priceInCents: number): string {
  if (priceInCents === 0) return "Brezplačno"
  return `${(priceInCents / 100).toFixed(2).replace(".", ",")} EUR`
}

function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  if (hours === 0) return `${minutes} min`
  return `${hours} ur`
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

export function CourseCard({ course }: { course: Course }) {
  return (
    <Link href={`/courses/${course.slug}`}>
      <Card className="group h-full overflow-hidden border-2 border-transparent hover:border-[#7C3AED]/20 hover:shadow-xl transition-all duration-300 cursor-pointer bg-white">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={course.thumbnail_url || "/placeholder.svg"}
            alt={course.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {course.is_published === false && (
            <div className="absolute inset-0 bg-black/5 z-10 flex items-start justify-start p-3">
              <Badge className="bg-amber-500 text-white border-0 px-3 py-1 text-xs font-semibold shadow-md flex items-center gap-1">
                <EyeOff className="w-3 h-3" />
                Osnutek
              </Badge>
            </div>
          )}
          {course.is_free && course.is_published !== false && (
            <div className="absolute top-3 left-3">
              <Badge className="bg-emerald-500 text-white border-0 px-3 py-1 text-xs font-semibold shadow-md">
                Brezplačno
              </Badge>
            </div>
          )}
          <div className="absolute top-3 right-3">
            <Badge className={`${getDifficultyColor(course.difficulty)} border px-3 py-1 text-xs font-semibold`}>
              {getDifficultyLabel(course.difficulty)}
            </Badge>
          </div>
        </div>
        <CardContent className="p-5">
          <h3 className="font-heading font-bold text-lg text-[#2D2A3D] mb-2 group-hover:text-[#7C3AED] transition-colors line-clamp-2">
            {course.title}
          </h3>
          <p className="text-sm text-[#64748B] mb-4 line-clamp-2">
            {course.description}
          </p>
          <div className="flex items-center gap-4 text-xs text-[#94A3B8] mb-4">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {formatDuration(course.duration_minutes)}
            </span>
            <span className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" />
              {course.lessons_count} lekcij
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              {course.age_min}-{course.age_max} let
            </span>
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <span className={`font-bold text-lg ${course.is_free ? "text-emerald-600" : "text-[#7C3AED]"}`}>
              {formatPrice(course.price)}
            </span>
            <span className="text-sm font-medium text-[#7C3AED] group-hover:translate-x-1 transition-transform">
              {'Poglej več →'}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
