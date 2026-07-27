"use client"

import { useEffect, useState, type ReactNode } from "react"
import { usePathname, useRouter } from "next/navigation"
import { getActiveChildId } from "@/hooks/use-active-child"

const spaceStyle = { background: "radial-gradient(ellipse at 40% 30%, #1a1060 0%, #0a0a1a 75%)" }

// Ensures every /kids/* page (other than the picker itself) has an active child
// profile selected, so activity can be correctly attributed to that child.
// Renders nothing until that's confirmed, to avoid a flash of the wrong page.
export function ActiveChildGuard({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(false)

    if (pathname === "/kids/select-profile") {
      setReady(true)
      return
    }

    if (getActiveChildId()) {
      setReady(true)
      return
    }

    router.replace(`/kids/select-profile?next=${encodeURIComponent(pathname)}`)
  }, [pathname, router])

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={spaceStyle}>
        <div className="text-5xl animate-bounce">🚀</div>
      </div>
    )
  }

  return <>{children}</>
}
