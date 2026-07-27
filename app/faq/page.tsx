import type { Metadata } from "next"
import { createMetadata, generateStructuredData } from "@/lib/metadata"
import { StructuredData } from "@/components/structured-data"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export const metadata: Metadata = createMetadata({
  title: "Pogosta vprašanja | Kids Learning AI",
  description:
    "Odgovori na pogosta vprašanja o platformi Kids Learning AI. Preberite več o cenah, varnosti, funkcijah in delovanju našega učenja z umetno inteligenco za otroke.",
  path: "/faq",
})

export default function FAQPage() {
  const faqSchema = generateStructuredData("FAQPage", {
    questions: [
      {
        question: "Za katero starostno skupino je platforma namenjena?",
        answer:
          "Kids Learning AI je namenjena otrokom, starim 5–12 let. Naša vsebina je skrbno pripravljena tako, da je primerna za starost, z različnimi stopnjami težavnosti in vrstami vsebin za različne razvojne faze znotraj tega razpona.",
      },
      {
        question: "Ali je platforma varna za mojega otroka?",
        answer:
          "Da! Varnost je naša glavna prioriteta. Skladni smo z zahtevami COPPA in GDPR/ZVOP-2, uporabljamo filtriranje vsebin, zahtevamo starševsko ustvarjanje računa in izvajamo varnostne ukrepe po najvišjih standardih. Vse interakcije z umetno inteligenco so nadzorovane in filtrirane za starosti primerno vsebino.",
      },
      {
        question: "Koliko stane Premium naročnina?",
        answer:
          "Naročnina Kids Learning AI stane €7,90 na mesec, z 7 dni brezplačnim preskusnim obdobjem brez potrebne kreditne kartice. Naročnino lahko kadarkoli prekličete.",
      },
      {
        question: "Ali lahko naročnino prekličem kadarkoli?",
        answer:
          "Da! Naročnino lahko kadarkoli prekličete v nastavitvah računa. Dostop do Premium vsebin ohranite do konca trenutnega obračunskega obdobja.",
      },
      {
        question: "Ali lahko spremljam napredek svojega otroka?",
        answer:
          "Da! Starševska nadzorna plošča ponuja pregledno analitiko, vključno s časom učenja, zgodovino dejavnosti, rezultati iger, doseženimi dosežki, pridobljenimi značkami, dnevnimi učnimi nizi in podrobnimi zapisi sej.",
      },
    ],
  })

  return (
    <>
      <StructuredData data={faqSchema} />
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 relative overflow-hidden">
        {/* Floating AI-themed decorative elements */}
        <div className="absolute top-10 left-10 text-6xl opacity-30 animate-float">🤖</div>
        <div className="absolute top-32 right-20 text-5xl opacity-20 animate-float" style={{ animationDelay: '1s' }}>💡</div>
        <div className="absolute top-56 left-1/4 text-4xl opacity-25 animate-float" style={{ animationDelay: '2s' }}>📚</div>
        <div className="absolute bottom-40 right-1/4 text-5xl opacity-20 animate-float" style={{ animationDelay: '1.5s' }}>⚙️</div>

        {/* Gradient blobs */}
        <div className="absolute top-20 right-10 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="max-w-4xl mx-auto px-4 py-12 relative z-10">
          <Link href="/">
            <Button variant="ghost" className="mb-6 hover:bg-white/50 rounded-full">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Nazaj na domačo stran
            </Button>
          </Link>

          <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 border border-white/20">
            <div className="text-center mb-12">
              <div className="text-5xl mb-4">❓</div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Pogosta vprašanja</h1>
              <p className="text-lg text-gray-600">Odgovori na najpogostejša vprašanja o naši platformi</p>
            </div>

            <Accordion type="multiple" className="space-y-4">
              <AccordionItem value="item-1" className="border-2 border-purple-100 rounded-2xl px-6 bg-white/50">
                <AccordionTrigger className="text-left font-semibold hover:text-purple-600">
                  Za katero starostno skupino je platforma namenjena?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700">
                  Kids Learning AI je namenjena otrokom, starim 5–12 let. Naša vsebina je skrbno pripravljena tako, da
                  je primerna za starost, z različnimi stopnjami težavnosti in vrstami vsebin za različne razvojne
                  faze znotraj tega razpona.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border-2 border-purple-100 rounded-2xl px-6 bg-white/50">
                <AccordionTrigger className="text-left font-semibold hover:text-purple-600">
                  Ali je platforma varna za mojega otroka?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700">
                  Da! Varnost je naša glavna prioriteta. Skladni smo z zahtevami COPPA in GDPR/ZVOP-2, uporabljamo
                  filtriranje vsebin, zahtevamo starševsko ustvarjanje računa in izvajamo varnostne ukrepe po
                  najvišjih standardih. Vse interakcije z umetno inteligenco so nadzorovane in filtrirane za starosti
                  primerno vsebino. Priporočamo starševski nadzor, še posebej pri mlajših otrocih.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border-2 border-purple-100 rounded-2xl px-6 bg-white/50">
                <AccordionTrigger className="text-left font-semibold hover:text-purple-600">
                  Kaj vključuje brezplačni nivo?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700">
                  Brezplačni nivo vključuje:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Dostop do osnovnih učnih dejavnosti</li>
                    <li>Omejeno število interakcij z AI na dan</li>
                    <li>Osnovno sledenje napredku</li>
                    <li>En profil otroka</li>
                    <li>Dostop do izbranih iger in zgodb</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border-2 border-purple-100 rounded-2xl px-6 bg-white/50">
                <AccordionTrigger className="text-left font-semibold hover:text-purple-600">
                  Katere dodatne funkcije dobim s Premium naročnino?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700">
                  Premium naročnina vključuje:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Neomejene interakcije z AI</li>
                    <li>Dostop do vseh iger, dejavnosti in zgodb</li>
                    <li>Napredno spremljanje napredka</li>
                    <li>Več profilov otrok (do 5)</li>
                    <li>Prednostna podpora</li>
                    <li>Zgoden dostop do novih funkcij</li>
                    <li>Brez oglasov</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border-2 border-purple-100 rounded-2xl px-6 bg-white/50">
                <AccordionTrigger className="text-left font-semibold hover:text-purple-600">
                  Koliko stane Premium naročnina?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700">
                  Cena Premium naročnine:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>
                      <strong>€7,90 na mesec</strong>, z 7 dni brezplačnim preskusnim obdobjem
                    </li>
                  </ul>
                  Kreditna kartica za začetek preskusa ni potrebna, naročnino pa lahko kadarkoli prekličete.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="border-2 border-purple-100 rounded-2xl px-6 bg-white/50">
                <AccordionTrigger className="text-left font-semibold hover:text-purple-600">
                  Ali lahko naročnino prekličem kadarkoli?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700">
                  Da! Naročnino lahko kadarkoli prekličete v nastavitvah računa. Dostop do Premium vsebin ohranite do
                  konca trenutnega obračunskega obdobja. Za delne mesece povračil ne izvajamo, do izteka naročnine pa
                  obdržite dostop do vseh Premium funkcij.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7" className="border-2 border-purple-100 rounded-2xl px-6 bg-white/50">
                <AccordionTrigger className="text-left font-semibold hover:text-purple-600">
                  Kako deluje umetna inteligenca? Ali se dejansko pogovarja z mojim otrokom?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700">
                  Naša platforma uporablja napredne jezikovne modele AI za ustvarjanje izobraževalnih vsebin, zgodb in
                  pogovorov. AI je posebej prilagojena za otrokom prijazne interakcije, s filtriranjem vsebin in
                  varnostnimi ukrepi. Čeprav AI odgovore ustvarja v realnem času, so vse interakcije nadzorovane in
                  filtrirane, da zagotovimo starosti primerno vsebino. Razumite jo kot učni pripomoček, ne kot
                  nadomestilo za človeško interakcijo.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8" className="border-2 border-purple-100 rounded-2xl px-6 bg-white/50">
                <AccordionTrigger className="text-left font-semibold hover:text-purple-600">
                  Ali lahko spremljam napredek svojega otroka?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700">
                  Da! Starševska nadzorna plošča ponuja pregledno analitiko, vključno z:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Časom učenja in zgodovino dejavnosti</li>
                    <li>Rezultati iger in dosežki</li>
                    <li>Pridobljenimi značkami in nagradami</li>
                    <li>Dnevnimi učnimi nizi</li>
                    <li>Področji, kjer otrok izstopa ali potrebuje izboljšave</li>
                    <li>Podrobnimi zapisi sej</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-9" className="border-2 border-purple-100 rounded-2xl px-6 bg-white/50">
                <AccordionTrigger className="text-left font-semibold hover:text-purple-600">
                  Koliko profilov otrok lahko ustvarim?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700">
                  Brezplačni računi lahko ustvarijo 1 profil otroka. Premium naročniki lahko ustvarijo do 5 profilov
                  otrok, vsakega s svojim sledenjem napredku, dosežki in prilagojeno učno izkušnjo.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-10" className="border-2 border-purple-100 rounded-2xl px-6 bg-white/50">
                <AccordionTrigger className="text-left font-semibold hover:text-purple-600">
                  Katere naprave lahko uporabljamo?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700">
                  Kids Learning AI deluje na vsaki napravi s sodobnim spletnim brskalnikom:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Namizni računalniki (Windows, Mac, Linux)</li>
                    <li>Tablice (iPad, Android tablice)</li>
                    <li>Pametni telefoni (iOS, Android)</li>
                  </ul>
                  Za najboljšo izkušnjo priporočamo tablice ali računalnike. Platforma je popolnoma odzivna in za
                  mnoge funkcije deluje tudi brez povezave, ko je vsebina enkrat naložena.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-11" className="border-2 border-purple-100 rounded-2xl px-6 bg-white/50">
                <AccordionTrigger className="text-left font-semibold hover:text-purple-600">
                  Ali zbirate osebne podatke mojega otroka?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700">
                  Zbiramo minimalne podatke, potrebne za učno izkušnjo: ime, starost in podatke o učnem napredku. NE
                  zbiramo občutljivih osebnih podatkov, fotografij ali podatkov o lokaciji. Vsi podatki so šifrirani
                  in varno shranjeni. Starši imajo popoln nadzor in lahko kadarkoli izbrišejo podatke svojega otroka.
                  Za vse podrobnosti si oglejte našo{" "}
                  <Link href="/privacy" className="text-blue-600 hover:underline">
                    Politiko zasebnosti
                  </Link>
                  .
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-12" className="border-2 border-purple-100 rounded-2xl px-6 bg-white/50">
                <AccordionTrigger className="text-left font-semibold hover:text-purple-600">
                  Kaj, če moj otrok naleti na neprimerno vsebino?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700">
                  Čeprav imamo robustno filtriranje vsebin in varnostne ukrepe, noben sistem ni popoln. Če vaš otrok
                  naleti na kakršno koli neprimerno vsebino, jo prosimo takoj prijavite prek platforme ali kontaktirajte
                  našo podporo. Vsako prijavo jemljemo resno in nenehno izboljšujemo naše varnostne sisteme.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-13" className="border-2 border-purple-100 rounded-2xl px-6 bg-white/50">
                <AccordionTrigger className="text-left font-semibold hover:text-purple-600">
                  Ali lahko moj otrok uporablja platformo brez nadzora?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700">
                  Čeprav je naša platforma zasnovana z mislijo na varnost, priporočamo starševski nadzor, še posebej
                  pri mlajših otrocih. Starejši otroci lahko platformo uporabljajo bolj samostojno, a starše
                  spodbujamo, naj redno pregledujejo napredek in dejavnosti svojega otroka prek starševske nadzorne
                  plošče.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-14" className="border-2 border-purple-100 rounded-2xl px-6 bg-white/50">
                <AccordionTrigger className="text-left font-semibold hover:text-purple-600">
                  Kako dobim pomoč ali prijavim težavo?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700">
                  Pomoč lahko dobite na več načinov:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>
                      Obiščite našo{" "}
                      <Link href="/contact" className="text-blue-600 hover:underline">
                        stran za stik
                      </Link>
                    </li>
                    <li>Pišite nam na support@kids-learning-ai.com</li>
                    <li>Uporabite gumb za pomoč v aplikaciji (Premium naročniki imajo prednostno podporo)</li>
                  </ul>
                  Običajno odgovorimo v 24–48 urah.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-15" className="border-2 border-purple-100 rounded-2xl px-6 bg-white/50">
                <AccordionTrigger className="text-left font-semibold hover:text-purple-600">
                  Se bo moj otrok res naučil o umetni inteligenci?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700">
                  Da! Naša platforma uči koncepte AI skozi praktične izkušnje. Otroci se učijo o:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Prepoznavanju vzorcev in osnovah strojnega učenja</li>
                    <li>Tem, kako AI sprejema odločitve</li>
                    <li>Obdelavi naravnega jezika skozi pogovore</li>
                    <li>Ustvarjalni uporabi AI</li>
                    <li>Etičnih vidikih tehnologije AI</li>
                  </ul>
                  Učenje poteka naravno skozi igro, zaradi česar so kompleksni koncepti dostopni in zabavni.
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="mt-12 p-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl text-center border-2 border-purple-200">
              <h3 className="font-bold text-lg mb-2 text-gray-900">Imate še vprašanja?</h3>
              <p className="text-gray-700 mb-4">Tu smo, da pomagamo! Kontaktirajte našo ekipo za podporo.</p>
              <Link href="/contact">
                <Button className="bg-purple-600 hover:bg-purple-700 rounded-full">Kontaktiraj podporo</Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Cloud wave divider at bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 0L60 10C120 20 240 40 360 45C480 50 600 40 720 35C840 30 960 30 1080 35C1200 40 1320 50 1380 55L1440 60V120H0V0Z" fill="white" fillOpacity="0.3"/>
          </svg>
        </div>
      </div>
    </>
  )
}
