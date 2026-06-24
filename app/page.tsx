import Link from "next/link"
import { redirect } from "next/navigation"
import { createServerClient } from "../lib/supabase/server"
import { BytePreview } from "../components/byte-preview"
import { SupportChat } from "../components/support-chat"

const AGE_GROUPS = [
  {
    emoji: "🌱",
    label: "Mlajši (5–7 let)",
    activities: ["AI Detektiv", "Ustvarjalnik AI prijateljev"],
    desc: "Otrok se uči prepoznati, kdaj je bila vsebina ustvarjena z AI in kdaj jo je ustvaril človek. Ustvari svojega AI prijatelja z imenom in osebnostjo.",
    learns: "Kaj je AI · Kako prepoznam AI vsebino · Zakaj AI ni živ",
    bg: "rgba(134,239,172,0.08)",
    borderColor: "rgba(74,222,128,0.25)",
    pillBg: "rgba(74,222,128,0.18)",
    textColor: "#15803d",
  },
  {
    emoji: "🌿",
    label: "Srednji (7–10 let)",
    activities: ["AI Kviz", "AI Detektiv"],
    desc: "Otrok rešuje kvize o resničnih primerih AI v vsakdanjem življenju — od priporočil na YouTubu do glasovnih asistentov.",
    learns: "Kje je AI v mojem življenju · Kako AI odloča · Zakaj AI naredi napake",
    bg: "rgba(147,197,253,0.08)",
    borderColor: "rgba(96,165,250,0.25)",
    pillBg: "rgba(96,165,250,0.18)",
    textColor: "#1d4ed8",
  },
  {
    emoji: "🌳",
    label: "Napredni (10–12 let)",
    activities: ["Usposabljanje vzorcev", "Eksperimentalni laboratorij"],
    desc: "Otrok nauči računalnik prepoznati vzorce — kot pravi podatkovni znanstvenik. Preizkusi, kako sprememba podatkov vpliva na rezultat.",
    learns: "Osnove strojnega učenja · Podatkovni vzorci · Kritično razmišljanje o AI",
    bg: "rgba(216,180,254,0.08)",
    borderColor: "rgba(192,132,252,0.25)",
    pillBg: "rgba(192,132,252,0.18)",
    textColor: "#7c3aed",
  },
]

const SESSION_STEPS = [
  { icon: "🤖", title: "Byte pozdravi otroka", desc: "Byte pokliče otroka po imenu in predlaga naslednjo misijo glede na pretekli napredek." },
  { icon: "🕵️", title: "Otrok začne igro", desc: "Byte razloži pravila v enem stavku. Otrok takoj začne igrati — brez dolgih navodil." },
  { icon: "🧠", title: "Uči se skozi igro", desc: "10–15 minut igre, odgovorov in razlag. Byte poda povratno informacijo po vsakem koraku." },
  { icon: "🏆", title: "Prejme nagrado", desc: "Po zaključeni lekciji otrok dobi točke ali značko. Napredek se takoj zapiše v vašo ploščo." },
  { icon: "🛸", title: "Starš prejme povzetek", desc: "Vi vidite, kaj je otrok naredil, koliko časa je bil aktiven in kaj ga čaka naslednjič." },
]

const LANDING_FAQ = [
  { q: "Ali moram biti zraven med igranjem?", a: "Ne. Otrok igra samostojno. Vi pa v starševski plošči vidite vse — brez da bi bili zraven." },
  { q: "Koliko časa traja ena lekcija?", a: "10 do 20 minut. Platforma prilagodi dolžino glede na starost in tempo otroka." },
  { q: "Ali je vsebina res v slovenščini?", a: "100 %. Brez angleških besed, brez prevodov, brez tujega kulturnega konteksta." },
  { q: "Kaj se zgodi po 14 dneh?", a: "Nič samodejno. Kreditna kartica ni potrebna za preskus — plačilo je vaša odločitev." },
  { q: "Ali lahko dodam več otrok?", a: "Trenutno je v paketu en otroški profil. Podpora za več profilov bo na voljo kmalu." },
  { q: "Kako vem, da vsebina ustreza starosti mojega otroka?", a: "Platforma samodejno prilagodi težavnost glede na starost in stopnjo znanja, ki ju vnesete pri registraciji." },
]

export default async function HomePage() {
  const supabase = await createServerClient()
  const { data: { session } } = await supabase.auth.getSession()
  if (session) redirect("/parent/dashboard")

  return (
    <div className="min-h-screen bg-white">

      {/* Nav */}
      <nav className="border-b bg-white/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🚀</span>
            <span className="font-bold text-gray-900 text-lg">Kids Learning AI</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex gap-5 text-sm text-gray-500">
              <Link href="/faq" className="hover:text-gray-900">Pomoč</Link>
              <Link href="/about" className="hover:text-gray-900">O nas</Link>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/auth/login" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
                Prijava
              </Link>
              <Link
                href="/auth/sign-up"
                className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
              >
                Začni brezplačno
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* ── 1. HERO ── */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-100 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-purple-100 text-purple-700 text-sm font-semibold px-4 py-1 rounded-full mb-6">
            Slovenska učna platforma za varno, igrivo AI učenje
          </div>
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            Kjer mladi umi spoznajo<br />
            <span className="text-purple-600">umetno inteligenco</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Interaktivne igre in dejavnosti, ki otroke učijo konceptov umetne inteligence skozi igro.
            Starši imajo popolno nadzorno ploščo. Brez slabe vesti glede zaslonskega časa.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            {[
              { icon: "🔒", label: "Brez tujcev in oglasov" },
              { icon: "🇸🇮", label: "Razvito v Sloveniji" },
              { icon: "👨‍👩‍👧", label: "Starši imajo popoln nadzor" },
              { icon: "🇪🇺", label: "GDPR + ZVOP-2 skladen", green: true },
            ].map((pill) => (
              <span
                key={pill.label}
                className={`inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full shadow-sm border ${
                  pill.green
                    ? "bg-green-50 border-green-200 text-green-700"
                    : "bg-white border-gray-200 text-gray-700"
                }`}
              >
                {pill.icon} {pill.label}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Link
              href="/subscribe"
              className="bg-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-purple-700 transition-colors shadow-lg"
            >
              Začni brezplačno →
            </Link>
            <a
              href="#demo"
              className="text-purple-600 font-semibold text-lg hover:text-purple-800 transition-colors"
            >
              ↓ Poglej demo
            </a>
          </div>

          <div className="inline-flex flex-col items-center bg-white rounded-2xl shadow-md px-8 py-5 border border-purple-100">
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-4xl font-extrabold text-gray-900">€7,90</span>
              <span className="text-gray-500 font-medium">/ mesec</span>
            </div>
            <p className="text-sm text-gray-500">Po 14-dnevnem brezplačnem preskusu &nbsp;·&nbsp; Prekliči kadarkoli &nbsp;·&nbsp; Vse cene v EUR</p>
          </div>
        </div>
      </section>

      {/* Pilot social proof */}
      <section className="bg-gray-950 border-b border-white/5 py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-white/30 text-xs font-semibold uppercase tracking-widest mb-6">
            Pilotna faza · Slovenija 2025
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-4xl font-extrabold text-white mb-1">37</p>
              <p className="text-white/50 text-sm">slovenskih družin<br />v pilotni fazi</p>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-white mb-1">5–12</p>
              <p className="text-white/50 text-sm">let starosti otrok<br />v programu</p>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-white mb-1">100%</p>
              <p className="text-white/50 text-sm">vsebine v slovenščini<br />brez angleških besed</p>
            </div>
          </div>
          <p className="text-center text-white/20 text-xs mt-6">
            Platforma je v aktivnem razvoju — pilotni starši oblikujejo vsebino skupaj z nami.
          </p>
        </div>
      </section>

      {/* ── 2. MINI DEMO ── */}
      <section id="demo" className="py-16 px-6 bg-gray-950">
        <div className="max-w-2xl mx-auto text-center mb-10">
          <div className="inline-block bg-purple-900/50 border border-purple-700/50 text-purple-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
            Interaktivni predogled
          </div>
          <h2 className="text-3xl font-bold text-white mb-3">Prvih 10 minut z Bytom</h2>
          <p className="text-gray-400 text-sm">Preizkusi lekcijo sam — točno tako jo doživi tvoj otrok.</p>
        </div>
        <BytePreview />
      </section>

      {/* ── 3. SAFETY FOR PARENTS ── */}
      <section className="bg-white border-b border-gray-100 py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-green-50 border border-green-200 rounded-2xl px-6 py-5 mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <span className="text-3xl flex-shrink-0">🇸🇮</span>
            <div className="flex-1">
              <p className="font-bold text-green-900 text-sm mb-1">
                Za otroke do 15 let zahtevamo starševsko soglasje — ker tako zahteva slovensko pravo.
              </p>
              <p className="text-green-700 text-xs leading-relaxed">
                V skladu z GDPR (člen 8) in ZVOP-2 otrok ne more odpreti računa brez vaše odobritve. Registracija poteka prek starševskega računa — vi ste vedno prvi korak.
              </p>
            </div>
            <a href="/privacy" className="flex-shrink-0 text-xs text-green-600 underline hover:text-green-800 whitespace-nowrap">
              Politika zasebnosti →
            </a>
          </div>

          <p className="text-center text-xs font-semibold text-gray-400 uppercase tracking-widest mb-8">
            Vprašanja, ki si jih zastavi vsak starš
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { q: "Ali otrok potrebuje e-pošto?", a: "Ne. Starš odpre račun — otrok samo igra." },
              { q: "Se otrok pogovarja z neznanimi?", a: "Nikoli. Ni klepetov, forumov ali skupin." },
              { q: "Ali so oglasi?", a: "Ni enega. Niti skritih nakupov v aplikaciji." },
              { q: "Kdo vidi, kaj otrok počne?", a: "Vi. Vsak rezultat je viden v starševski plošči." },
              { q: "Kaj z našimi podatki?", a: "Podatke pobrišemo na zahtevo. Brez vprašanj." },
            ].map((item) => (
              <div key={item.q} className="bg-green-50 rounded-2xl p-5 border border-green-100">
                <p className="text-green-700 font-semibold text-xs mb-2 leading-snug">✓ {item.q}</p>
                <p className="text-gray-900 font-bold text-sm leading-snug">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. WHAT CHILD LEARNS — by age group ── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-3">Kaj se bo moj otrok naučil?</h2>
          <p className="text-gray-500 text-center mb-12">Vsebina se samodejno prilagodi starosti in tempu otroka.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {AGE_GROUPS.map((g) => (
              <div
                key={g.label}
                className="rounded-2xl p-6 border"
                style={{ background: g.bg, borderColor: g.borderColor }}
              >
                <div className="text-4xl mb-3">{g.emoji}</div>
                <p className="font-bold text-gray-900 text-lg mb-3">{g.label}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {g.activities.map((a) => (
                    <span
                      key={a}
                      className="text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{ background: g.pillBg, color: g.textColor }}
                    >
                      {a}
                    </span>
                  ))}
                </div>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{g.desc}</p>
                <p className="text-xs font-semibold mb-1" style={{ color: g.textColor }}>Nauči se:</p>
                <p className="text-xs text-gray-500 leading-relaxed">{g.learns}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. HOW A SESSION LOOKS ── */}
      <section className="py-20 px-6 bg-gray-950">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-3">Kako izgleda ena seja?</h2>
          <p className="text-gray-400 text-center mb-12 text-sm">Otrok igra sam. Vi vidite vse. Tako deluje vsaka lekcija.</p>
          <div className="space-y-4">
            {SESSION_STEPS.map((s, i) => (
              <div key={s.title} className="flex gap-4 items-start">
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: "rgba(168,85,247,0.2)", border: "1px solid rgba(168,85,247,0.35)" }}
                >
                  {s.icon}
                </div>
                <div
                  className="flex-1 rounded-2xl px-5 py-4"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-purple-500 text-xs font-bold">{i + 1}.</span>
                    <p className="text-white font-bold text-sm">{s.title}</p>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. SAMPLE WEEKLY REPORT ── */}
      <section className="py-20 px-6 bg-gray-950 border-t border-white/5">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-3">Kar vidite vsak teden</h2>
            <p className="text-gray-400 text-sm">Tedenski povzetek v starševski plošči — brez da bi bili zraven.</p>
          </div>

          <div
            className="rounded-3xl overflow-hidden"
            style={{
              background: "rgba(8,8,30,0.92)",
              border: "1px solid rgba(168,85,247,0.3)",
              boxShadow: "0 0 60px rgba(168,85,247,0.1)",
            }}
          >
            {/* Header */}
            <div
              className="px-6 py-4 flex items-center justify-between"
              style={{ background: "rgba(168,85,247,0.18)", borderBottom: "1px solid rgba(168,85,247,0.2)" }}
            >
              <div>
                <p className="text-white font-bold">Tilen — Tedenski povzetek</p>
                <p className="text-purple-400 text-xs">2.–8. junij 2026</p>
              </div>
              <span className="text-2xl">🛸</span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              {[
                { label: "Aktivnih dni", value: "4", icon: "📅" },
                { label: "Dejavnosti", value: "7", icon: "🎮" },
                { label: "Skupni čas", value: "52 min", icon: "⏱️" },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className="py-5 text-center"
                  style={{ borderRight: i < 2 ? "1px solid rgba(255,255,255,0.06)" : "none" }}
                >
                  <p className="text-xl mb-1">{stat.icon}</p>
                  <p className="text-white font-extrabold text-xl">{stat.value}</p>
                  <p className="text-white/40 text-xs mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Activity log */}
            <div className="p-6 space-y-3">
              <p className="text-white/35 text-xs font-semibold uppercase tracking-wider mb-4">Dejavnosti ta teden</p>
              {[
                { activity: "AI Detektiv", result: "4/4 pravilno", badge: "🏆", dot: "#3b82f6" },
                { activity: "Usposabljanje vzorcev", result: "3/4 pravilno", badge: "⭐", dot: "#22c55e" },
                { activity: "AI Kviz", result: "5/6 pravilno", badge: "🎯", dot: "#f97316" },
              ].map((row) => (
                <div
                  key={row.activity}
                  className="flex items-center justify-between rounded-xl px-4 py-3"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{row.badge}</span>
                    <div>
                      <p className="text-white text-sm font-semibold">{row.activity}</p>
                      <p className="text-white/40 text-xs">{row.result}</p>
                    </div>
                  </div>
                  <div className="w-2 h-2 rounded-full" style={{ background: row.dot }} />
                </div>
              ))}
            </div>

            {/* Next suggested */}
            <div
              className="mx-6 mb-6 rounded-xl px-4 py-3 flex items-center gap-3"
              style={{ background: "rgba(168,85,247,0.12)", border: "1px solid rgba(168,85,247,0.25)" }}
            >
              <span className="text-lg">🚀</span>
              <div>
                <p className="text-purple-300 text-xs font-bold tracking-wider">PRIPOROČENO ZA NASLEDNJI TEDEN</p>
                <p className="text-white text-sm">AI Prijatelj — Lekcija 2 · Kaj AI zna in česa ne</p>
              </div>
            </div>
          </div>

          <p className="text-center text-white/25 text-xs mt-4">
            Prikazana vsebina je primer — vaš povzetek bo odražal dejansko aktivnost vašega otroka.
          </p>
        </div>
      </section>

      {/* ── 7. PRICING ── */}
      <section className="py-20 px-6 bg-gradient-to-br from-purple-50 to-blue-50" id="cenik">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Preprosta, pregledna cena</h2>
          <p className="text-gray-500 mb-10">En paket. Vse vključeno. Zaračunano v EUR.</p>
          <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-3xl p-8 text-white shadow-xl">
            <div className="text-sm font-semibold uppercase tracking-wide text-purple-200 mb-4">Družinski paket</div>
            <div className="flex items-baseline justify-center gap-1 mb-2">
              <span className="text-6xl font-extrabold">€7,90</span>
              <span className="text-purple-200 text-lg">/ mesec</span>
            </div>
            <p className="text-purple-200 text-sm mb-8">Vse cene v EUR · DDV po potrebi</p>
            <ul className="text-left space-y-3 mb-8">
              {[
                "14-dnevno brezplačno preskusno obdobje — brez plačila",
                "Neomejene dejavnosti za 1 otroka",
                "Starševska nadzorna plošča s celotnim sledenjem napredka",
                "Nova vsebina vsak mesec",
                "Preklic kadarkoli, brez vprašanj",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-green-400 font-bold mt-0.5">✓</span>
                  <span className="text-purple-100 text-sm">{item}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/subscribe"
              className="block w-full bg-white text-purple-700 py-4 rounded-xl font-bold text-lg hover:bg-purple-50 transition-colors"
            >
              Začni brezplačno
            </Link>
          </div>
        </div>
      </section>

      {/* ── 8. FAQ ── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-3">Pogosta vprašanja</h2>
          <p className="text-gray-500 text-center mb-12">Odgovori brez marketinškega žargona.</p>
          <div className="space-y-4">
            {LANDING_FAQ.map((item) => (
              <div key={item.q} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <p className="font-bold text-gray-900 mb-2">{item.q}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
          <p className="text-center mt-8 text-sm text-gray-400">
            Več vprašanj?{" "}
            <Link href="/faq" className="text-purple-600 hover:text-purple-800 font-medium">
              Obiščite celotno stran s pogostimi vprašanji →
            </Link>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gray-50 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="text-xl">🚀</span>
            <span className="font-semibold text-gray-700">Kids Learning AI</span>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <Link href="/terms" className="hover:text-gray-900">Pogoji uporabe</Link>
            <Link href="/privacy" className="hover:text-gray-900">Zasebnost</Link>
            <Link href="/varstvo-otrok" className="hover:text-gray-900">Varstvo otrok</Link>
            <Link href="/faq" className="hover:text-gray-900">Pogosta vprašanja</Link>
            <Link href="/about" className="hover:text-gray-900">O nas</Link>
            <Link href="/auth/login" className="hover:text-gray-900">Prijava</Link>
          </div>
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} Kids Learning AI. Vse cene v EUR.</p>
        </div>
      </footer>
      <SupportChat />
    </div>
  )
}
