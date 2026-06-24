import Link from "next/link"
import { redirect } from "next/navigation"
import { createServerClient } from "../../../lib/supabase/server"
import { AdDemo } from "../../../components/ad-demo"
import { BytePreview } from "../../../components/byte-preview"

export const metadata = {
  title: "AI učenje za otroke | Kids Learning AI — Začni brezplačno",
  description: "Interaktivne AI igre za otroke med 5 in 12 letom. 14-dnevno brezplačno preskusno obdobje. Starševska nadzorna plošča. Samo €7,90/mesec.",
}

const WHAT_CHILD_DOES = [
  {
    icon: "🕵️",
    activity: "AI Detektiv",
    age: "5–12 let",
    desc: "Otrok dobi uganko: je to naredil človek ali umetna inteligenca? Išče namige, sestavlja teorijo in razkrije rešitev.",
    learns: "Kritično razmišljanje o AI vsebinah",
  },
  {
    icon: "🧠",
    activity: "Usposabljanje vzorcev",
    age: "7–12 let",
    desc: "Otrok nauči računalnik prepoznati zaporedje — tako kot pravi podatkovni znanstvenik. Izbira odgovore, model pa se uči.",
    learns: "Osnove strojnega učenja skozi igro",
  },
  {
    icon: "🤖",
    activity: "Ustvarjalnik AI prijateljev",
    age: "5–10 let",
    desc: "Otrok ustvari svojega AI prijatelja, mu da ime in osebnost ter preizkusi, kako osebnost vpliva na vedenje.",
    learns: "Kako AI dobi 'karakter' in zakaj je to načrtovano",
  },
]

const SAFETY_PROMISES = [
  { icon: "🚫", title: "Brez tujcev", desc: "Platforma je zaprta — otrok ne komunicira z nikomer zunaj domačega računa. Nobenih klepetov, forumov ali komentarjev." },
  { icon: "📵", title: "Brez oglasov", desc: "Nobenih oglasov, nobenih nakupov znotraj aplikacije, nobenih zunanjih povezav. Otrok vidi samo učno vsebino." },
  { icon: "👁️", title: "Starši vidijo vse", desc: "Vsak dosežek, vsak rezultat, vsako dejavnost — prikazano v starševski nadzorni plošči v realnem času." },
  { icon: "🇪🇺", title: "GDPR + ZVOP-2 zaščita", desc: "Podatki otrok so zaščiteni po EU in slovenski zakonodaji. Ne zbiramo e-pošte ali osebnih podatkov otroka. Starševska privolitev obvezna za otroke do 15 let." },
]

const ACTIVITIES = [
  { icon: "🕵️", name: "AI Detektiv" },
  { icon: "🧠", name: "Usposabljanje vzorcev" },
  { icon: "🎯", name: "AI Kviz" },
  { icon: "🤖", name: "Ustvarjalnik AI prijateljev" },
  { icon: "🧪", name: "Eksperimentalni laboratorij" },
  { icon: "🏆", name: "Dosežki in značke" },
]

const FAQ = [
  {
    q: "Ali moram vnesti podatke o plačilu za preskus?",
    a: "Ne. 14-dnevno preskusno obdobje je popolnoma brezplačno — kreditna kartica ni potrebna.",
  },
  {
    q: "Kako vem, kaj otrok počne na platformi?",
    a: "Starševska nadzorna plošča prikazuje vsako opravljeno dejavnost, dosežen rezultat in pridobljene značke. Dostop ima samo starš.",
  },
  {
    q: "Ali se otrok pogovarja s kom zunaj?",
    a: "Ne. Platforma je popolnoma zaprta — nobenih klepetov, forumov ali stikov z neznanci.",
  },
  {
    q: "Za katero starost je platforma primerna?",
    a: "Za otroke med 5 in 12 letom. Težavnost se samodejno prilagodi glede na starost in stopnjo znanja.",
  },
  {
    q: "Koliko stane po preskusu?",
    a: "€7,90 na mesec. Prekličete lahko kadarkoli, brez skritih stroškov ali kazni.",
  },
]

export default async function AdLandingPage() {
  const supabase = await createServerClient()
  const { data: { session } } = await supabase.auth.getSession()
  if (session) redirect("/parent/dashboard")

  return (
    <div className="min-h-screen bg-white">

      {/* Minimal header */}
      <header className="border-b bg-white">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🚀</span>
            <span className="font-bold text-gray-900">Kids Learning AI</span>
          </div>
          <Link
            href="/auth/sign-up"
            className="bg-purple-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-purple-700 transition-colors"
          >
            Začni brezplačno
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-50 to-blue-50 py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block bg-green-100 text-green-700 text-sm font-semibold px-4 py-1 rounded-full mb-6">
            14 dni brezplačno · Kreditna kartica ni potrebna
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            AI učenje za otroke,<br />
            <span className="text-purple-600">ki je resnično zabavno</span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-xl mx-auto">
            Vaš otrok (5–12 let) se nauči, kako deluje umetna inteligenca —
            skozi igre, kvize in ustvarjalne izzive. V slovenščini.
          </p>

          {/* Trust pills — directly above CTA */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            <span className="inline-flex items-center gap-1.5 bg-white border border-gray-200 text-gray-700 text-sm font-medium px-3 py-1.5 rounded-full shadow-sm">
              🔒 Brez tujcev in oglasov
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white border border-gray-200 text-gray-700 text-sm font-medium px-3 py-1.5 rounded-full shadow-sm">
              🇸🇮 Razvito v Sloveniji
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white border border-gray-200 text-gray-700 text-sm font-medium px-3 py-1.5 rounded-full shadow-sm">
              👨‍👩‍👧 Starši imajo popoln nadzor
            </span>
            <span className="inline-flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-700 text-sm font-medium px-3 py-1.5 rounded-full shadow-sm">
              🇪🇺 GDPR + ZVOP-2 skladen
            </span>
          </div>

          <Link
            href="/auth/sign-up"
            className="inline-block bg-purple-600 text-white px-10 py-5 rounded-2xl text-xl font-bold hover:bg-purple-700 transition-colors shadow-xl mb-4"
          >
            Začni brezplačno preskusno obdobje →
          </Link>

          <p className="text-sm text-gray-400">Po preskusu samo €7,90 / mesec · Prekliči kadarkoli</p>
        </div>
      </section>

      {/* ── Pilot social proof ── */}
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

      {/* ── Byte interactive preview ── */}
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

      {/* ── Bus demo ── */}
      <section className="py-16 px-6 bg-gray-950 border-t border-white/5">
        <div className="max-w-xl mx-auto text-center mb-10">
          <h2 className="text-2xl font-bold text-white mb-3">Byte te vodi med dejavnostmi</h2>
          <p className="text-gray-400 text-sm">Med vsako igro Byte prestopi na naslednjo postajo — otrok nikoli ne ve, kaj ga čaka.</p>
        </div>
        <AdDemo />
      </section>

      {/* ── TRUST BLOCK 1: Kaj bo otrok počel? ── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-3">
            Kaj bo moj otrok počel?
          </h2>
          <p className="text-gray-500 text-center mb-12">
            Konkretne dejavnosti — ne abstraktne lekcije.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {WHAT_CHILD_DOES.map((a) => (
              <div key={a.activity} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl">{a.icon}</span>
                  <div>
                    <p className="font-bold text-gray-900">{a.activity}</p>
                    <p className="text-xs text-gray-400">{a.age}</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{a.desc}</p>
                <div className="bg-purple-50 border border-purple-100 rounded-xl px-4 py-2">
                  <p className="text-xs text-purple-700 font-semibold">Nauči se:</p>
                  <p className="text-xs text-purple-600">{a.learns}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-400 mt-6">
            + še 3 dejavnosti v vsakem paketu
          </p>
        </div>
      </section>

      {/* ── TRUST BLOCK 2: Varnost ── */}
      <section className="py-20 px-6 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-3">
            Ali je varno?
          </h2>
          <p className="text-gray-500 text-center mb-10">
            Zasnovano s starši — ne samo za otroke.
          </p>

          {/* ZVOP-2 consent callout */}
          <div className="bg-white border border-green-200 rounded-2xl px-6 py-5 mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-sm">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {SAFETY_PROMISES.map((s) => (
              <div key={s.title} className="flex gap-4 bg-white rounded-2xl p-6 border border-green-100 shadow-sm">
                <span className="text-3xl shrink-0">{s.icon}</span>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{s.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST BLOCK 3: Kdo stoji za tem? ── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Kdo stoji za platformo?
          </h2>
          <div className="flex flex-col sm:flex-row gap-8 items-start bg-gray-50 rounded-3xl p-8 border border-gray-100">
            <div className="w-20 h-20 rounded-2xl bg-purple-100 flex items-center justify-center text-4xl shrink-0">
              👨‍💻
            </div>
            <div>
              <p className="font-bold text-gray-900 text-lg mb-1">Danijel Milovanović</p>
              <p className="text-purple-600 text-sm font-medium mb-4">Ustanovitelj · Kids Learning AI</p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Platformo sem ustvaril, ker sem kot starš iskal način, kako razložiti umetno inteligenco
                svojemu otroku — brez abstraktnih razlag, brez angleških besed, brez skrbi glede varnosti.
                Nič primernega v slovenščini ni obstajalo. Zato sem ga ustvaril sam.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Platforma je razvita v Sloveniji, vsa vsebina je v slovenščini in vsaka odločitev
                izhaja iz enega vprašanja: <span className="font-semibold text-gray-800">»Bi to zaupal svojemu otroku?«</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Activities */}
      <section className="py-20 px-6 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">6 dejavnosti — vse vključene</h2>
          <p className="text-gray-500 mb-10">Brez nadomestnih nakupov. Brez skritih stroškov.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {ACTIVITIES.map((a) => (
              <div key={a.name} className="bg-white rounded-2xl p-5 border border-purple-100 shadow-sm">
                <div className="text-3xl mb-2">{a.icon}</div>
                <p className="font-semibold text-gray-800 text-sm">{a.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-sm mx-auto">
          <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-3xl p-8 text-white shadow-2xl text-center">
            <p className="text-purple-200 text-sm font-semibold uppercase tracking-widest mb-4">Družinski paket</p>
            <div className="flex items-baseline justify-center gap-1 mb-1">
              <span className="text-6xl font-extrabold">€7,90</span>
              <span className="text-purple-200 text-lg">/ mesec</span>
            </div>
            <p className="text-purple-300 text-sm mb-8">Vse cene v EUR · DDV po potrebi</p>
            <ul className="text-left space-y-3 mb-8 text-sm">
              {[
                "14 dni brezplačno — brez kartice",
                "Neomejene dejavnosti",
                "Starševska nadzorna plošča",
                "Nova vsebina vsak mesec",
                "Preklic kadarkoli",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="text-green-400 font-bold">✓</span>
                  <span className="text-purple-100">{item}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/auth/sign-up"
              className="block w-full bg-white text-purple-700 py-4 rounded-xl font-bold text-lg hover:bg-purple-50 transition-colors"
            >
              Začni brezplačno →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Pogosta vprašanja</h2>
          <div className="space-y-4">
            {FAQ.map((item) => (
              <div key={item.q} className="bg-white rounded-2xl p-6 border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-2">{item.q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-purple-600 to-purple-800 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">Pripravljeni začeti?</h2>
          <p className="text-purple-200 mb-8">Pridružite se in začnite 14-dnevno brezplačno preskusno obdobje danes.</p>
          <Link
            href="/auth/sign-up"
            className="inline-block bg-white text-purple-700 px-10 py-5 rounded-2xl text-xl font-bold hover:bg-purple-50 transition-colors shadow-xl"
          >
            Začni brezplačno →
          </Link>
          <p className="text-purple-300 text-sm mt-4">Kreditna kartica ni potrebna · Prekliči kadarkoli</p>
        </div>
      </section>

      {/* Minimal footer */}
      <footer className="border-t bg-white py-6 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-400">
          <span>© {new Date().getFullYear()} Kids Learning AI</span>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-gray-700">Zasebnost</Link>
            <Link href="/terms" className="hover:text-gray-700">Pogoji uporabe</Link>
            <Link href="/faq" className="hover:text-gray-700">Pomoč</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
