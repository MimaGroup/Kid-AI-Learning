"use client"

import Link from "next/link"
import { useState } from "react"
import { SupportChat } from "../../components/support-chat"

const CATEGORIES = [
  {
    label: "Splošno",
    icon: "🚀",
    items: [
      {
        q: "Kaj je Kids Learning AI?",
        a: "Kids Learning AI je izobraževalna platforma, ki otrokom med 5 in 12 let na zabaven in interaktiven način predstavi umetno inteligenco. Skozi tečaje, igre, kvize in pogovore z AI pomočnikom Byte-om otroci spoznajo, kako AI deluje v vsakdanjem življenju.",
      },
      {
        q: "Za katero starost je platforma primerna?",
        a: "Platforma je zasnovana za otroke med 5 in 12 let. Vsebine so razporejene po stopnjah (Začetnik, Srednji, Napreden), tako da so primerne tako za prvič srečanje z AI kot za naprednejše učence.",
      },
      {
        q: "V katerem jeziku je platforma?",
        a: "Celotna platforma je v slovenščini — vsebina, tečaji, igre in Byte, naš AI pomočnik. Zasnovana je posebej za slovensko govoreče otroke in starše.",
      },
      {
        q: "Katere vsebine so na voljo?",
        a: "Na voljo je 5 tečajev (od osnov AI do robotike), 3 interaktivne igre (AI Detektiv, AI Kviz, Vzorci), sistem značk in napredka, certifikati ob zaključku tečaja ter Byte — AI učni pomočnik, ki je na voljo med vsako lekcijo.",
      },
    ],
  },
  {
    label: "Naročnina in plačilo",
    icon: "💳",
    items: [
      {
        q: "Ali potrebujem kreditno kartico za preskusno obdobje?",
        a: "Ne. Za začetek 14-dnevnega brezplačnega preskusa kreditna kartica ni potrebna. Plačilni podatki so zahtevani šele ko se odločite za plačano naročnino.",
      },
      {
        q: "Koliko stane naročnina?",
        a: "Na voljo sta dva plana:\n• Mesečni: €7,90/mesec\n• Letni: €79,00/leto (prihranite €15,80 — enako kot 2 meseca brezplačno)\n\nOba plana vključujeta popoln dostop za en družinski račun. Vse cene so v EUR in vključujejo DDV.",
      },
      {
        q: "Kdaj se zaračuna naročnina?",
        a: "Zaračunavanje poteka na isti datum vsak mesec (mesečni plan) oz. enkrat letno (letni plan), od dneva aktivacije naročnine.",
      },
      {
        q: "Kako prekličem naročnino?",
        a: "Naročnino prekličete kadar koli v starševski plošči → Nastavitve. Preklic začne veljati ob koncu obračunskega obdobja — dostop ohranite do tega datuma. Nobenih skritih stroškov ali kazni.",
      },
      {
        q: "Ali imam pravico do vračila?",
        a: "Da. V skladu z EU zakonodajo o pravicah potrošnikov (Direktiva 2011/83/EU) ponujamo popolno povračilo v 14 dneh od prvega plačila. Pišite nam na support@kids-learning-ai.com.",
      },
    ],
  },
  {
    label: "Tečaji in napredek",
    icon: "📚",
    items: [
      {
        q: "Koliko tečajev je na voljo?",
        a: "Trenutno je na voljo 5 tečajev: AI osnove za otroke, AI varnost in zasebnost, AI in umetnost, Kodiranje z AI, AI in robotika. Skupaj vsebujejo 74 lekcij. Vsak tečaj je razdeljen na module.",
      },
      {
        q: "Kako platforma sledi napredku otroka?",
        a: "Sistem samodejno beleži vsako začeto in zaključeno lekcijo. Starš vidi napredek v starševski plošči: katere lekcije so opravljene, rezultati kvizov in pridobljene značke.",
      },
      {
        q: "Kaj so značke in kako jih pridobi otrok?",
        a: "Značke so digitalne nagrade za dosežke:\n• 🌟 Prve korake — 1. zaključena lekcija\n• ⚡ Hitri učenec — 5 zaključenih lekcij\n• 🎓 Vztrajni študent — 25 zaključenih lekcij\n• 🏆 Mojster učenja — 100 zaključenih lekcij\n• 💯 Perfektna ocena — kviz s 100% točnostjo",
      },
      {
        q: "Kaj je certifikat in kako ga otrok dobi?",
        a: "Ko otrok zaključi vse lekcije v posameznem tečaju, prejme digitalni certifikat z imenom, naslovom tečaja in datumom. Certifikat je na voljo na strani tečaja in ga je možno natisniti ali shraniti kot PDF.",
      },
      {
        q: "Ali se napredek shrani, če prekličem naročnino?",
        a: "Da. Napredek, značke in certifikati so shranjeni tudi po preklicu naročnine. Ob ponovni aktivaciji so takoj dostopni.",
      },
    ],
  },
  {
    label: "Byte — AI pomočnik",
    icon: "🤖",
    items: [
      {
        q: "Kaj je Byte?",
        a: "Byte je naš AI učni pomočnik, ki je na voljo med vsako lekcijo. Otroku pomaga razumeti snov, odgovarja na vprašanja o vsebini in spodbuja radovednost. Byte ne poda direktnih odgovorov na kvizna vprašanja — daje namige.",
      },
      {
        q: "Je Byte varen za otroke?",
        a: "Da. Byte je programiran izključno za izobraževalne pogovore. Ne razpravlja o neprimernih temah, ne sprašuje po osebnih podatkih in ob morebitno zaskrbljujočem sporočilu otroka napoti k staršem. Pogovori so omejeni na 40 na dan.",
      },
      {
        q: "Ali Byte shrani pogovore?",
        a: "Pogovori z Byte-om se ne shranjujejo trajno. Vsaka seja je ločena in ni dostopna staršem ali nam. Byte si ne zapomni prejšnjih pogovorov.",
      },
      {
        q: "V katerem jeziku govori Byte?",
        a: "Byte vedno odgovarja v slovenščini, ne glede na jezik vprašanja.",
      },
    ],
  },
  {
    label: "Varnost in zasebnost",
    icon: "🛡️",
    items: [
      {
        q: "Ali je platforma varna za otroke?",
        a: "Da. Platforma ne zbira e-poštnih naslovov ali kontaktnih podatkov otrok. Ni klepetalnic, forumov ali oglasov. Otroci nimajo samostojnih računov — vse upravljanje poteka prek starševskega računa.",
      },
      {
        q: "Katere podatke zberate o otroku?",
        a: "Zbiramo samo: ime profila (ki ga določi starš) in stopnjo znanja. Ne zbiramo datuma rojstva, lokacije, fotografij ali e-poštnega naslova otroka.",
      },
      {
        q: "Ali prodajate podatke tretjim osebam?",
        a: "Ne. Podatkov ne prodajamo, ne dajemo v najem in ne tržimo. Delimo jih izključno s ponudniki infrastrukture (Supabase za bazo, Vercel za gostovanje) — oba delujeta skladno z GDPR.",
      },
      {
        q: "Kako zahtevam izbris podatkov?",
        a: "Profil otroka izbrišete v starševski plošči. Za popoln izbris računa in vseh podatkov pišite na support@kids-learning-ai.com — izbrišemo vse v 30 dneh.",
      },
    ],
  },
  {
    label: "Tehnično",
    icon: "⚙️",
    items: [
      {
        q: "Ali platforma deluje na mobilnih napravah?",
        a: "Da. Platforma je popolnoma odzivna in deluje na telefonih, tablicah in računalnikih. Ni potrebno nameščati aplikacije — dostop je prek brskalnika.",
      },
      {
        q: "Kateri brskalniki so podprti?",
        a: "Platforma deluje v vseh modernih brskalnikih: Chrome, Firefox, Safari, Edge. Priporočamo najnovejšo različico brskalnika za najboljšo izkušnjo.",
      },
      {
        q: "Kaj naredim, če ne morem dostopati do računa?",
        a: "Na strani za prijavo kliknite 'Pozabljeno geslo' in sledite navodilom. Če težava ne izgine, pišite na support@kids-learning-ai.com.",
      },
    ],
  },
]

function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full text-left py-5 flex items-start justify-between gap-4 group"
      >
        <span className="font-semibold text-gray-900 group-hover:text-purple-700 transition-colors text-sm md:text-base leading-snug">
          {q}
        </span>
        <span className="flex-shrink-0 mt-0.5 text-purple-500 text-lg leading-none transition-transform duration-200"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}>
          +
        </span>
      </button>
      {open && (
        <div className="pb-5 pr-8">
          {a.split("\n").map((line, i) =>
            line.trim() ? (
              <p key={i} className="text-gray-600 text-sm leading-relaxed mb-1">{line}</p>
            ) : <div key={i} className="h-1" />
          )}
        </div>
      )}
    </div>
  )
}

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState(0)
  const total = CATEGORIES.reduce((s, c) => s + c.items.length, 0)

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="border-b bg-white sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl">🚀</span>
            <span className="font-bold text-gray-900">Kids Learning AI</span>
          </Link>
          <Link href="/auth/sign-up"
            className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
            Začni brezplačno
          </Link>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Pogosta vprašanja</h1>
          <p className="text-gray-500">{total} odgovorov na najpogostejša vprašanja o platformi Kids Learning AI.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Category sidebar */}
          <aside className="md:w-52 flex-shrink-0">
            <div className="sticky top-24 space-y-1">
              {CATEGORIES.map((cat, i) => (
                <button key={i} onClick={() => setActiveCategory(i)}
                  className="w-full text-left flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
                  style={activeCategory === i
                    ? { background: "#f3e8ff", color: "#7c3aed" }
                    : { color: "#6b7280" }
                  }>
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                  <span className="ml-auto text-xs opacity-50">{cat.items.length}</span>
                </button>
              ))}
            </div>
          </aside>

          {/* Questions */}
          <div className="flex-1 min-w-0">
            {CATEGORIES.map((cat, i) => (
              <div key={i} className={i === activeCategory ? "block" : "hidden"}>
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-2xl">{cat.icon}</span>
                  <h2 className="text-xl font-bold text-gray-900">{cat.label}</h2>
                </div>
                <div className="bg-white border border-gray-100 rounded-2xl px-6 divide-y divide-gray-50">
                  {cat.items.map((item, j) => (
                    <AccordionItem key={j} q={item.q} a={item.a} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 bg-purple-50 border border-purple-200 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold text-purple-900 mb-2">Niste našli odgovora?</h3>
          <p className="text-purple-700 mb-6">Pišite nam in odgovorili vam bomo v 2 delovnih dneh.</p>
          <a href="mailto:support@kids-learning-ai.com"
            className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
            Pišite nam →
          </a>
        </div>
      </main>

      <footer className="border-t bg-gray-50 py-8 px-6 mt-12">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3 text-sm text-gray-400">
          <Link href="/" className="hover:text-gray-700">← Nazaj na domačo stran</Link>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-gray-700">Zasebnost</Link>
            <Link href="/varstvo-otrok" className="hover:text-gray-700">Varstvo otrok</Link>
            <Link href="/terms" className="hover:text-gray-700">Pogoji uporabe</Link>
          </div>
          <span>© {new Date().getFullYear()} Kids Learning AI</span>
        </div>
      </footer>
      <SupportChat />
    </div>
  )
}
