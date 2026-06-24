'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '@/hooks/use-auth'
import { useRouter } from 'next/navigation'
import { KidsBottomNav } from '@/components/kids-bottom-nav'

const STARS = [
  {x:4,y:10},{x:14,y:78},{x:24,y:28},{x:36,y:62},{x:46,y:8},
  {x:56,y:80},{x:66,y:40},{x:76,y:88},{x:88,y:18},{x:95,y:55},
  {x:10,y:50},{x:50,y:44},{x:82,y:65},{x:32,y:82},{x:74,y:14},
  {x:20,y:94},{x:60,y:94},{x:40,y:92},
]

const activities = [
  {
    id: 'ai-detective',
    title: 'AI Detektiv',
    description: 'Odkrij, kateri predmeti uporabljajo tehnologijo AI!',
    category: 'games',
    difficulty: 'Začetnik',
    icon: '🕵️',
    accent: '#3b82f6',
    gradient: 'from-blue-500 to-blue-700',
    href: '/kids/games/ai-detective'
  },
  {
    id: 'pattern-training',
    title: 'Vzorci',
    description: 'Nauči AI prepoznavati vzorce!',
    category: 'learning',
    difficulty: 'Srednji',
    icon: '🧠',
    accent: '#22c55e',
    gradient: 'from-green-400 to-green-600',
    href: '/kids/games/pattern-training'
  },
  {
    id: 'ai-friend',
    title: 'AI Prijatelji',
    description: 'Ustvari svojega AI prijatelja!',
    category: 'creative',
    difficulty: 'Začetnik',
    icon: '🤖',
    accent: '#a855f7',
    gradient: 'from-purple-500 to-purple-700',
    href: '/kids/ai-friend'
  },
  {
    id: 'ai-quiz',
    title: 'AI Kviz',
    description: 'Preveri svoje znanje o AI!',
    category: 'games',
    difficulty: 'Vse stopnje',
    icon: '🎯',
    accent: '#f97316',
    gradient: 'from-orange-400 to-orange-600',
    href: '/kids/games/ai-quiz'
  }
]

const categories = [
  { id: 'all',      name: 'Vse',         icon: '🌟' },
  { id: 'games',    name: 'Igre',        icon: '🎮' },
  { id: 'learning', name: 'Učenje',      icon: '📖' },
  { id: 'creative', name: 'Ustvarjalno', icon: '🎨' },
]

export default function ActivitiesPage() {
  const { user, loading, logout } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.push('/auth/login')
  }
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    if (!loading && !user) router.push('/auth/login')
  }, [user, loading, router])

  const spaceStyle = { background: 'radial-gradient(ellipse at 50% 20%, #1a0a40 0%, #0a0a1a 75%)' }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={spaceStyle}>
        <div className="text-center">
          <div className="text-5xl mb-4 animate-bounce">🌟</div>
          <p className="text-purple-300 font-semibold">Nalaganje dejavnosti...</p>
        </div>
      </div>
    )
  }

  const filtered = selectedCategory === 'all'
    ? activities
    : activities.filter(a => a.category === selectedCategory)

  return (
    <div className="min-h-screen relative p-6 pb-24 md:pb-10" style={spaceStyle}>
      {/* Stars */}
      {STARS.map((s, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white pointer-events-none"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: 2, height: 2, opacity: 0.1 + (i % 4) * 0.08 }}
        />
      ))}

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Top bar */}
        <div className="mb-6 flex items-center justify-between">
          <Link href="/kids/home" className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors">
            ← Nazaj na zemljevid
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/parent/dashboard"
              className="text-xs font-semibold px-3 py-1.5 rounded-xl transition-all hover:bg-white/5"
              style={{ color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              🛸 Starševska plošča
            </Link>
            <button
              onClick={handleLogout}
              className="text-xs font-semibold px-3 py-1.5 rounded-xl transition-all hover:bg-red-500/10 active:scale-95"
              style={{ color: "rgba(239,68,68,0.7)", border: "1px solid rgba(239,68,68,0.2)" }}
            >
              ↩ Odjava
            </button>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">AI Dejavnosti</h1>
          <p className="text-purple-300 text-lg max-w-xl mx-auto">
            Razišči interaktivne AI izkušnje, ki učenje naredijo zabavno!
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className="px-5 py-2.5 rounded-full font-semibold text-sm transition-all"
              style={{
                background: selectedCategory === cat.id
                  ? 'linear-gradient(135deg, #7c3aed, #a855f7)'
                  : 'rgba(255,255,255,0.07)',
                color: selectedCategory === cat.id ? 'white' : 'rgba(255,255,255,0.55)',
                border: selectedCategory === cat.id
                  ? '1px solid rgba(168,85,247,0.5)'
                  : '1px solid rgba(255,255,255,0.12)',
                boxShadow: selectedCategory === cat.id ? '0 0 16px rgba(168,85,247,0.35)' : 'none',
              }}
            >
              <span className="mr-1.5">{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>

        {/* Activity cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map((activity) => (
            <div
              key={activity.id}
              className="rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:brightness-110"
              style={{
                background: 'rgba(8,8,30,0.85)',
                border: `1px solid ${activity.accent}44`,
                boxShadow: `0 0 20px ${activity.accent}18`,
              }}
            >
              {/* Icon banner */}
              <div
                className={`h-28 bg-gradient-to-br ${activity.gradient} flex items-center justify-center relative`}
              >
                <span className="text-6xl drop-shadow-lg">{activity.icon}</span>
                <div
                  className="absolute inset-0 opacity-20"
                  style={{ background: `radial-gradient(circle at 50% 50%, white, transparent 70%)` }}
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-white mb-1">{activity.title}</h3>
                <p className="text-white/55 text-sm mb-4 leading-snug">{activity.description}</p>

                <div className="flex items-center justify-between mb-4">
                  <span
                    className="px-2.5 py-1 rounded-lg text-xs font-semibold"
                    style={{ background: `${activity.accent}22`, color: activity.accent }}
                  >
                    {activity.difficulty}
                  </span>
                </div>

                <Link href={activity.href}>
                  <button
                    className="w-full py-2.5 rounded-xl font-bold text-white text-sm transition-all active:scale-95"
                    style={{ background: `linear-gradient(135deg, ${activity.accent}cc, ${activity.accent})` }}
                  >
                    Začni →
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <KidsBottomNav />
    </div>
  )
}
