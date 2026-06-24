import Link from "next/link"
import { SupportChat } from "../../components/support-chat"

export const metadata = {
  title: "O nas — Kids Learning AI",
  description: "Spoznajte Kids Learning AI — platformo, ki slovenskim otrokom odpira vrata v svet umetne inteligence.",
}

const VALUES = [
  {
    icon: "🎮",
    title: "Učenje skozi igro",
    desc: "Verjamemo, da se otroci najboljše učijo, ko se zabavajo. Vsaka dejavnost je zasnovana kot igra, ne kot šolska ura.",
  },
  {
    icon: "👨‍👩‍👧",
    title: "Starši so partnerji",
    desc: "Starši imajo popoln vpogled v otrokov napredek. Nismo 'babysitter' — smo orodje za skupno učenje.",
  },
  {
    icon: "🔒",
    title: "Varnost najprej",
    desc: "Ne zbiramo osebnih podatkov otrok. Brez oglasov, brez profiliranja, brez interakcij z neznanimi.",
  },
  {
    icon: "🌍",
    title: "Slovensko srce",
    desc: "Platforma je v slovenščini in upošteva vrednosti ter kulturo slovenskih družin.",
  },
]

const TEAM = [
  {
    name: "Danijel Milovanović",
    role: "Ustanovitelj in razvoj",
    bio: "Strasten o izobraževalni tehnologiji in AI. Platforma je nastala iz prepričanja, da morajo otroci razumeti svet, v katerem živijo — vključno z umetno inteligenco.",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="border-b bg-white sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl">🚀</span>
            <span className="font-bold text-gray-900">Kids Learning AI</span>
          </Link>
          <Link href="/auth/sign-up" className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
            Začni brezplačno
          </Link>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="text-6xl mb-6">🚀</div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">O nas</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Kids Learning AI je slovenska izobraževalna platforma, ki otrokom med 5 in 12 letom
            na zabaven in varen način odpira vrata v svet umetne inteligence.
          </p>
        </div>

        {/* Mission */}
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl p-10 mb-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Naše poslanstvo</h2>
          <p className="text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto">
            Živimo v svetu, ki ga vse bolj oblikuje umetna inteligenca. Naš cilj je, da otroci
            ne bodo zgolj pasivni uporabniki te tehnologije — ampak jo bodo razumeli, kritično
            ocenjevali in sčasoma tudi soustvarjali. Začnemo z igro, nadaljujemo z znanjem.
          </p>
        </div>

        {/* Values */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Naše vrednote</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {VALUES.map((v) => (
              <div key={v.title} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="text-4xl mb-4">{v.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Story */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Naša zgodba</h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 leading-relaxed mb-4">
              Ideja za Kids Learning AI se je porodila iz enostavnega vprašanja: <em>Kako razložim svojemu otroku, kaj je umetna inteligenca?</em>
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Knjige so bile preveč suhe. YouTube videi preveč površinski. Obstoječe platforme pa
              bodisi v angleščini bodisi namenjene starejšim učencem. Zato smo se lotili dela sami.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Danes Kids Learning AI ponuja štiri interaktivne AI dejavnosti, pet tečajev, starševsko
              nadzorno ploščo in varno okolje brez oglasov. Platforma raste skupaj z nami — in skupaj z vašimi otroki.
            </p>
          </div>
        </section>

        {/* Team */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Ekipa</h2>
          <div className="space-y-6">
            {TEAM.map((member) => (
              <div key={member.name} className="flex items-start gap-5 bg-gray-50 rounded-2xl p-6">
                <div className="w-14 h-14 bg-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shrink-0">
                  {member.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">{member.name}</h3>
                  <p className="text-purple-600 text-sm font-medium mb-2">{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="text-center bg-gradient-to-br from-purple-600 to-purple-800 rounded-3xl p-10 text-white">
          <h2 className="text-2xl font-bold mb-3">Pridružite se nam</h2>
          <p className="text-purple-200 mb-6">14 dni brezplačno. Brez kreditne kartice. Brez tveganja.</p>
          <Link
            href="/auth/sign-up"
            className="inline-block bg-white text-purple-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-purple-50 transition-colors"
          >
            Začni brezplačno
          </Link>
        </div>
      </main>

      <footer className="border-t bg-gray-50 py-8 px-6 mt-12">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-gray-400">
          <Link href="/" className="hover:text-gray-700">← Nazaj na domačo stran</Link>
          <span>© {new Date().getFullYear()} Podjetniške in poslovne storitve, Danijel Milovanović s.p. · Kids Learning AI</span>
          <Link href="/faq" className="hover:text-gray-700">Pogosta vprašanja</Link>
        </div>
      </footer>
      <SupportChat />
    </div>
  )
}
