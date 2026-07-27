import type { Metadata } from "next"
import { createMetadata } from "@/lib/metadata"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Heart, Shield, Sparkles, Users } from 'lucide-react'
import Image from "next/image"
import { BYTE_CHARACTER } from "@/lib/byte-character"

export const metadata: Metadata = createMetadata({
  title: "O nas | Kids Learning AI",
  description:
    "Spoznajte naše poslanstvo — narediti umetno inteligenco dostopno in zabavno za otroke, stare 5–12 let. Odkrijte, kako opolnomočimo naslednjo generacijo z interaktivnim učenjem AI.",
  path: "/about",
})

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* AI-themed floating decorative emojis */}
      <div className="absolute top-20 right-20 text-6xl opacity-20 animate-float" style={{ filter: 'drop-shadow(0 4px 8px rgba(147, 51, 234, 0.3))' }}>🤖</div>
      <div className="absolute top-60 left-10 text-5xl opacity-20 animate-pulse" style={{ filter: 'drop-shadow(0 4px 8px rgba(236, 72, 153, 0.3))' }}>🧠</div>
      <div className="absolute bottom-40 right-1/4 text-4xl opacity-20 animate-bounce" style={{ filter: 'drop-shadow(0 4px 8px rgba(59, 130, 246, 0.3))' }}>💻</div>

      <div className="max-w-4xl mx-auto px-4 py-12 relative z-10">
        <Link href="/">
          <Button variant="ghost" className="mb-6 rounded-full">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Nazaj na domačo stran
          </Button>
        </Link>

        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-12 border-2 border-purple-200">
          <div className="text-center mb-12">
            <div className="mx-auto mb-4 w-24 h-24">
              <Image
                src={BYTE_CHARACTER.images.waving || "/placeholder.svg"}
                alt={BYTE_CHARACTER.fullName}
                width={96}
                height={96}
                className="rounded-full ring-4 ring-purple-200 shadow-lg mx-auto"
              />
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 bg-clip-text text-transparent">
              O platformi Kids Learning AI
            </h1>
            <p className="text-xl text-gray-600">Kjer se mladi umi srečajo z umetno inteligenco</p>
          </div>

          <div className="space-y-8 text-gray-700">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">Naše poslanstvo</h2>
              <p className="text-lg leading-relaxed">
                Verjamemo, da si vsak otrok zasluži razumeti tehnologijo, ki oblikuje njegovo prihodnost. Naše
                poslanstvo je narediti umetno inteligenco dostopno, razumljivo in zabavno za otroke skozi interaktivne
                učne izkušnje, ki spodbujajo radovednost in gradijo samozavest.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">Kaj ponujamo</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-100 to-cyan-100 p-6 rounded-2xl border-2 border-blue-200 hover:scale-105 transition-transform">
                  <div className="text-3xl mb-3">🎮</div>
                  <h3 className="font-bold text-lg mb-2">Interaktivne igre</h3>
                  <p className="text-sm">
                    Zanimive igre z umetno inteligenco, ki skozi igro učijo prepoznavanje vzorcev, odločanje in
                    reševanje problemov.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-100 to-violet-100 p-6 rounded-2xl border-2 border-purple-200 hover:scale-105 transition-transform">
                  <div className="text-3xl mb-3">📚</div>
                  <h3 className="font-bold text-lg mb-2">Pripovedovanje zgodb z AI</h3>
                  <p className="text-sm">
                    Osebno prilagojene zgodbe, ki jih ustvarja AI in se prilagajajo interesom ter bralni ravni vašega
                    otroka — učenje postane čarobno.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-pink-100 to-rose-100 p-6 rounded-2xl border-2 border-pink-200 hover:scale-105 transition-transform">
                  <div className="text-3xl mb-3">🤖</div>
                  <h3 className="font-bold text-lg mb-2">AI prijatelji</h3>
                  <p className="text-sm">
                    Varni, izobraževalni pogovori z AI sopotniki, ki odgovarjajo na vprašanja in spodbujajo
                    radovednost o svetu.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-orange-100 to-yellow-100 p-6 rounded-2xl border-2 border-orange-200 hover:scale-105 transition-transform">
                  <div className="text-3xl mb-3">🏆</div>
                  <h3 className="font-bold text-lg mb-2">Sledenje napredku</h3>
                  <p className="text-sm">
                    Pregledna starševska nadzorna plošča s podrobno analitiko, dosežki in vpogledom v učno pot
                    vašega otroka.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">Naše vrednote</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <Shield className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Varnost na prvem mestu</h3>
                    <p>
                      Varnost otrok je naša prioriteta — s COPPA-skladnimi praksami, filtriranjem vsebin in
                      starševskim nadzorom. Podatki vašega otroka so zaščiteni z varnostnimi ukrepi po najvišjih
                      standardih.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <Heart className="h-8 w-8 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Učenje, primerno starosti</h3>
                    <p>
                      Vsa vsebina je skrbno zasnovana za otroke, stare 5–12 let, z jezikom, koncepti in interakcijami,
                      primernimi za posamezno razvojno stopnjo.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <Sparkles className="h-8 w-8 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Zabavno in zanimivo</h3>
                    <p>
                      Učenje naj bo razburljivo! Uporabljamo gamifikacijo, nagrade in interaktivne izkušnje, da otroci
                      ostanejo motivirani in vključeni na svoji poti učenja o AI.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <Users className="h-8 w-8 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Partnerstvo s starši</h3>
                    <p>
                      Staršem omogočamo orodja za spremljanje napredka, razumevanje otrokovega učenja in aktivno
                      sodelovanje na njegovi izobraževalni poti.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">Zakaj je učenje o AI pomembno</h2>
              <p className="leading-relaxed mb-4">
                Umetna inteligenca preoblikuje vsak vidik našega življenja — od tega, kako delamo, do tega, kako
                komuniciramo. Današnji otroci bodo odraščali v svetu, kjer je AI vseprisotna, razumevanje teh
                tehnologij pa ni več izbirno — je nujno.
              </p>
              <p className="leading-relaxed">
                S tem, da koncepte AI otrokom predstavimo zgodaj skozi igro in raziskovanje, ne učimo zgolj
                tehnologije — gradimo kritično mišljenje, spodbujamo ustvarjalnost in otroke pripravljamo na to, da
                postanejo informirani, samozavestni udeleženci prihodnosti, ki jo oblikuje AI.
              </p>
            </section>

            <section className="bg-gradient-to-r from-purple-50 to-teal-50 rounded-2xl p-6 border border-purple-200">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-shrink-0">
                  <Image
                    src={BYTE_CHARACTER.images.teaching || "/placeholder.svg"}
                    alt={`${BYTE_CHARACTER.name} — naš maskota`}
                    width={120}
                    height={120}
                    className="rounded-full ring-4 ring-purple-200 shadow-lg"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold mb-2 text-gray-900">Spoznajte Byte-a — vašega učnega prijatelja</h2>
                  <p className="leading-relaxed">
                    Byte je naš prijazen robotski maskota, ki otroke vodi skozi njihovo pot učenja o AI. S
                    radovedno osebnostjo in neskončno potrpežljivostjo Byte kompleksne koncepte AI naredi zabavne in
                    razumljive. Otroci se lahko z Byte-om pogovarjajo, sprašujejo in učijo v varnem, spodbudnem
                    okolju.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">Naša tehnologija</h2>
              <p className="leading-relaxed mb-4">
                Uporabljamo napredno AI tehnologijo zaupanja vrednih ponudnikov, da zagotovimo varne, izobraževalne
                izkušnje:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Napredna obdelava naravnega jezika za pogovore in pripovedovanje zgodb</li>
                <li>Filtriranje vsebin in varnostni ukrepi za starosti primerne interakcije</li>
                <li>Prilagodljivi učni algoritmi, ki vsebino personalizirajo za vsakega otroka</li>
                <li>Varno, šifrirano shranjevanje in prenos podatkov</li>
                <li>Redne posodobitve in izboljšave na podlagi izobraževalnih raziskav</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">Začnite še danes</h2>
              <p className="leading-relaxed mb-6">
                Pridružite se družinam, ki odkrivajo veselje do učenja o AI. Preizkusite platformo s 7 dni brezplačnim
                preskusnim obdobjem, brez potrebne kreditne kartice.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/auth/sign-up">
                  <Button size="lg" className="w-full sm:w-auto">
                    Ustvari brezplačen račun
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                    Poglej cenik
                  </Button>
                </Link>
              </div>
            </section>

            <section className="border-t pt-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">Kontaktirajte nas</h2>
              <p className="leading-relaxed mb-4">Imate vprašanja ali povratne informacije? Radi bi jih slišali!</p>
              <Link href="/contact">
                <Button variant="outline">Stopite v stik</Button>
              </Link>
            </section>
          </div>
        </div>
      </div>

      <div className="relative h-32 mt-12">
        <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path
            d="M0,32 C320,96 640,96 960,32 C1280,0 1600,0 1440,32 L1440,120 L0,120 Z"
            fill="white"
            opacity="0.8"
          />
        </svg>
      </div>
    </div>
  )
}
