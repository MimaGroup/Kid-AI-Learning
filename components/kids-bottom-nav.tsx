"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const NAV = [
  { href: "/kids/home",       icon: "🏠", label: "Domov" },
  { href: "/kids/activities", icon: "🎮", label: "Dejavnosti" },
  { href: "/kids/courses",    icon: "📚", label: "Tečaji" },
]

export function KidsBottomNav() {
  const pathname = usePathname()

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-stretch"
      style={{
        background: "linear-gradient(180deg, #0d0d2b 0%, #060614 100%)",
        borderTop: "1px solid rgba(168,85,247,0.2)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      {NAV.map((item) => {
        const active = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className="flex-1 flex flex-col items-center justify-center py-3 gap-0.5 transition-all active:scale-95 relative"
            style={{ color: active ? "#c084fc" : "rgba(255,255,255,0.38)" }}
          >
            {active && (
              <span
                className="absolute top-0 left-1/2 -translate-x-1/2 rounded-b-full"
                style={{
                  width: 32,
                  height: 3,
                  background: "linear-gradient(90deg, #7c3aed, #a855f7)",
                  boxShadow: "0 0 8px rgba(168,85,247,0.8)",
                }}
              />
            )}
            <span className="text-2xl leading-none">{item.icon}</span>
            <span className="text-xs font-bold tracking-wide mt-0.5">{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
