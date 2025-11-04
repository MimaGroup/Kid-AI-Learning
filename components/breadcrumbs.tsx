"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Home } from "lucide-react"
import { Fragment } from "react"

export function Breadcrumbs() {
  const pathname = usePathname()

  if (!pathname || pathname === "/") return null

  const segments = pathname.split("/").filter(Boolean)

  // Don't show breadcrumbs on main pages
  if (segments.length <= 2) return null

  const breadcrumbMap: Record<string, string> = {
    kids: "Kids Learning",
    parent: "Parent",
    dashboard: "Dashboard",
    games: "Games",
    activities: "Activities",
    library: "Library",
    settings: "Settings",
    "ai-detective": "AI Detective",
    "pattern-training": "Pattern Training",
    "ai-quiz": "AI Quiz",
    "math-adventure": "Math Adventure",
    "word-builder": "Word Builder",
    "memory-match": "Memory Match",
    "ai-friend": "AI Friend",
  }

  const getBreadcrumbLabel = (segment: string) => {
    return breadcrumbMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ")
  }

  return (
    <nav className="flex items-center gap-2 text-sm text-muted-foreground px-4 sm:px-6 lg:px-8 py-3 bg-muted/30">
      <Link href="/kids/home" className="hover:text-foreground transition-colors">
        <Home className="w-4 h-4" />
      </Link>
      {segments.map((segment, index) => {
        const href = "/" + segments.slice(0, index + 1).join("/")
        const isLast = index === segments.length - 1

        return (
          <Fragment key={segment}>
            <ChevronRight className="w-4 h-4" />
            {isLast ? (
              <span className="text-foreground font-medium">{getBreadcrumbLabel(segment)}</span>
            ) : (
              <Link href={href} className="hover:text-foreground transition-colors">
                {getBreadcrumbLabel(segment)}
              </Link>
            )}
          </Fragment>
        )
      })}
    </nav>
  )
}
