import Link from "next/link"

export const metadata = {
  title: "Varstvo otrok — Kids Learning AI",
  description: "Kako varujemo otroke na platformi Kids Learning AI. Naša zaveza k varni izobraževalni izkušnji.",
}

const PILLARS = [
  {
    icon: "🔒",
    title: "Brez samostojnih otroških računov",
    body: "Otrok ne more ustvariti lastnega računa. Vse poteka prek starševskega računa — starš je vedno v nadzoru. Otroci nimajo dostopa do nastavitev, plačil ali osebnih podatkov.",
  },
  {
    icon: "📵",
    title: "Brez zbiranja podatkov otrok",
    body: "Ne zbiramo e-poštnega naslova, datuma rojstva, lokacije, fotografij ali glasovnih posnetkov otrok. Edini podatek je ime profila, ki ga določi starš.",
  },
  {
    icon: "🤖",
    title: "Varni AI pogovori z Byte-om",
    body: "Byte, naš AI učni pomočnik, je programiran izključno za izobraževalne vsebine. Ne odgovarja na neprimerna vprašanja, ne sprašuje po osebnih podatkih in samodejno usmeri otroka nazaj k učenju.",
  },
  {
    icon: "🚫",
    title: "Brez oglasov in socialnih funkcij",
    body: "Na platformi ni oglasov, ni klepetalnic med uporabniki, ni možnosti deljenja vsebine z drugimi otroki. Okolje je zaprto in namenjeno izključno učenju.",
  },
  {
    icon: "👨‍👩‍👧",
    title: "Starševski nadzor",
    body: "Starš ima vpogled v ves napredek otroka prek namenske plošče. Otroški profil je možno kadar koli urejati ali izbrisati — skupaj z vsemi podatki.",
  },
  {
    icon: "🛡️",
    title: "Šifriranje in varnost",
    body: "Vsa komunikacija poteka prek HTTPS/TLS. Gesla so shranjena v šifrirani obliki (bcrypt). Dostop do podatkov je omejen z varnostnimi pravili na ravni baze podatkov (Row Level Security).",
  },
]

const FAQS = [
  {
    q: "Ali otrok lahko komunicira z drugimi otroki na platformi?",
    a: "Ne. Na platformi ni klepetalnic, forumov ali socialnih funkcij. Edini AI pogovor je z Byte-om, ki je strogo moderiran.",
  },
  {
    q: "Kaj se zgodi, če Byte zazna zaskrbljujoče sporočilo?",
    a: "Byte je naučen, da ob vsakem sporočilu, ki nakazuje ogroženost, otroku prijazno svetuje, naj o tem pove staršem ali zaupnemu odraslemu.",
  },
  {
    q: "Kako omejim dostop do določenih vsebin?",
    a: "Vsa vsebina na platformi je predhodno pregledana in primerna za starost 8–14 let. Ob ustvarjanju profila starš nastavi stopnjo znanja, ki prilagodi prikazane tečaje.",
  },
  {
    q: "Ali se Byteovi pogovori shranjujejo?",
    a: "Pogovori z Byte-om se ne shranjujejo trajno. Vsaka seja je ločena in ni dostopna staršem ali nam.",
  },
  {
    q: "Kako zahtevam izbris podatkov otroka?",
    a: "Profil otroka izbrišete v starševski plošči. Vsi povezani podatki (napredek, značke) se trajno izbrišejo. Za popoln izbris računa pišite na support@kids-learning-ai.com.",
  },
]

export default function ChildSafetyPage() {
  return (
    <div className="min-h-screen" style={{ background: "radial-gradient(ellipse at 40% 20%, #1a1060 0%, #0a0a1a 70%)" }}>
      <div className="max-w-3xl mx-auto px-6 py-16">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-5"
            style={{ background: "rgba(168,85,247,0.15)", border: "1px solid rgba(168,85,247,0.3)", fontSize: 32 }}>
            🛡️
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-4">Varstvo otrok</h1>
          <p className="text-white/55 text-lg leading-relaxed max-w-xl mx-auto">
            Varnost otrok je naša absolutna prednostna naloga. Tukaj pojasnjujemo, kako jo zagotavljamo v praksi.
          </p>
        </div>

        {/* Commitment banner */}
        <div className="rounded-2xl px-6 py-5 mb-12 text-center"
          style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)" }}>
          <p className="text-green-400 font-bold text-sm">
            ✓ Kids Learning AI je zasnovan po načelu "privacy by design" za otroke — varnost ni dodatna funkcija, je temelj platforme.
          </p>
        </div>

        {/* Six pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-14">
          {PILLARS.map((p) => (
            <div key={p.title} className="rounded-2xl p-5"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 flex items-center justify-center rounded-xl"
                  style={{ width: 44, height: 44, background: "rgba(168,85,247,0.12)", border: "1px solid rgba(168,85,247,0.25)", fontSize: 22 }}>
                  {p.icon}
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm mb-1.5">{p.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{p.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Byte safety section */}
        <div className="rounded-2xl p-6 mb-12"
          style={{ background: "rgba(168,85,247,0.08)", border: "1px solid rgba(168,85,247,0.25)" }}>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🤖</span>
            <h2 className="text-white font-bold text-lg">Byte — varni AI pomočnik</h2>
          </div>
          <p className="text-white/60 text-sm leading-relaxed mb-4">
            Byte je naš AI učni pomočnik, zasnovan posebej za otroke. Deluje po strogih varnostnih pravilih:
          </p>
          <ul className="space-y-2">
            {[
              "Odgovarja izključno na vprašanja, povezana z učenjem in AI",
              "Ne sprašuje po imenu, starosti, lokaciji ali osebnih podatkih",
              "Ne razpravlja o nasilju, neprimernih temah ali škodljivih aktivnostih",
              "Ob zaznavi zaskrbljujočega sporočila otroka napoti k staršem",
              "Omejen na 40 pogovorov na dan — preprečuje pretirano uporabo",
              "Nikoli ne razkrije direktnih odgovorov na kvizna vprašanja",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-white/65">
                <span className="text-purple-400 mt-0.5 flex-shrink-0">✓</span> {item}
              </li>
            ))}
          </ul>
        </div>

        {/* FAQ */}
        <h2 className="text-white font-bold text-xl mb-5">Pogosta vprašanja staršev</h2>
        <div className="space-y-3 mb-14">
          {FAQS.map((faq) => (
            <div key={faq.q} className="rounded-2xl p-5"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <p className="text-white font-semibold text-sm mb-2">{faq.q}</p>
              <p className="text-white/50 text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>

        {/* Report concern */}
        <div className="rounded-2xl p-6 mb-10 text-center"
          style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)" }}>
          <p className="text-white font-bold mb-2">⚠️ Imate pomislek ali opazili težavo?</p>
          <p className="text-white/50 text-sm mb-4 leading-relaxed">
            Če ste opazili neprimerno vsebino ali imate varnostni pomislek, nas takoj kontaktirajte.
          </p>
          <a href="mailto:support@kids-learning-ai.com"
            className="inline-block px-6 py-3 rounded-xl font-bold text-white transition-all"
            style={{ background: "linear-gradient(135deg,#dc2626,#ef4444)" }}>
            Poročaj o težavi
          </a>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <Link href="/privacy" className="text-purple-400 hover:text-purple-300 transition-colors">Politika zasebnosti</Link>
          <span className="text-white/20">·</span>
          <Link href="/terms" className="text-purple-400 hover:text-purple-300 transition-colors">Pogoji uporabe</Link>
          <span className="text-white/20">·</span>
          <Link href="/" className="text-purple-400 hover:text-purple-300 transition-colors">← Domov</Link>
        </div>

      </div>
    </div>
  )
}
