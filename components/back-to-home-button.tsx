"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft } from "lucide-react"

interface BackToHomeButtonProps {
  variant?: "home" | "back"
  href?: string
  label?: string
}

export function BackToHomeButton({ variant = "home", href, label }: BackToHomeButtonProps) {
  const defaultHref = variant === "home" ? "/parent/dashboard" : href || "/parent/dashboard"
  const defaultLabel = variant === "home" ? "Back to Home" : label || "Back"
  const Icon = variant === "home" ? Home : ArrowLeft

  return (
    <Link href={defaultHref}>
      <Button variant="ghost" size="sm" className="gap-2">
        <Icon className="w-4 h-4" />
        {defaultLabel}
      </Button>
    </Link>
  )
}
