import type { Metadata } from "next"
import { createMetadata, generateStructuredData } from "@/lib/metadata"
import { StructuredData } from "@/components/structured-data"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export const metadata: Metadata = createMetadata({
  title: "Pogosta vprašanja - KidsLearnAI",
  description:
    "Poiščite odgovore na pogosta vprašanja o platformi KidsLearnAI. Spoznajte cene, varnost, funkcije in kako naše AI učenje deluje za otroke.",
  path: "/faq",
})

export default function FAQPage() {
  const faqSchema = generateStructuredData("FAQPage", {
    questions: [
      {
        question: "Za katero starostno skupino je platforma namenjena?",
        answer:
          "KidsLearnAI je namenjena otrokom od 5 do 12 let. Vsebina je skrbno prilagojena starosti, z različnimi stopnjami težavnosti za različne razvojne faze.",
      },
      {
        question: "Ali je platforma varna za mojega otroka?",
        answer:
          "Da! Varnost je naša prioriteta. Platforma je skladna s COPPA, uporablja filtriranje vsebin, zahteva registracijo staršev in uvaja industrijske varnostne standarde. Vse AI interakcije so nadzorovane in filtrirane za starostno primerno vsebino.",
      },
      {
        question: "Koliko stane Premium naročnina?",
        answer:
          "Ponujamo dve možnosti: Mesečno za €7,90/mesec in Letno za €59/leto (prihranite več kot 37%). Oba paketa vključujeta vse Premium funkcije in ju lahko kadarkoli prekličete.",
      },
      {
        question: "Ali lahko kadarkoli prekličem naročnino?",
        answer:
          "Da! Naročnino lahko kadarkoli prekličete v nastavitvah računa. Premium dostop ohranite do konca tekočega obračunskega obdobja.",
      },
      {
        question: "Ali lahko spremljam napredek svojega otroka?",
        answer:
          "Da! Nadzorna plošča za starše omogoča celovit pregled analitike, vključno s časom učenja, zgodovino aktivnosti, rezultati iger, dosežki, zbranimi značkami in podrobnimi dnevniki sej.",
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
              Nazaj na začetno stran
            </Button>
          </Link>

          <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 border border-white/20">
            <div className="text-center mb-12">
              <div className="text-5xl mb-4">❓</div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Pogosta vprašanja</h1>
              <p className="text-lg text-gray-600">Poiščite odgovore na pogosta vprašanja o naši platformi</p>
            </div>

            <Accordion type="multiple" className="space-y-4">
              <AccordionItem value="item-1" className="border-2 border-purple-100 rounded-2xl px-6 bg-white/50">
                <AccordionTrigger className="text-left font-semibold hover:text-purple-600">
                  Za katero starostno skupino je platforma namenjena?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700">
                  KidsLearnAI je namenjena otrokom od 5 do 12 let. Vsebina je skrbno prilagojena starosti, z različnimi
                  stopnjami težavnosti za različne razvojne faze.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border-2 border-purple-100 rounded-2xl px-6 bg-white/50">
                <AccordionTrigger className="text-left font-semibold hover:text-purple-600">
                  Ali je platforma varna za mojega otroka?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700">
                  Da! Varnost je naša prioriteta. Platforma je skladna s COPPA, uporablja filtriranje vsebin, zahteva
                  registracijo staršev in uvaja industrijske varnostne standarde. Vse AI interakcije so nadzorovane in
                  filtrirane za starostno primerno vsebino. Priporočamo nadzor staršev, zlasti za mlajše otroke.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border-2 border-purple-100 rounded-2xl px-6 bg-white/50">
                <AccordionTrigger className="text-left font-semibold hover:text-purple-600">
                  Kaj je vključeno v brezplačni paket?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700">
                  Brezplačni paket vključuje:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Dostop do prvih 2 lekcij vsakega tečaja</li>
                    <li>Spoznavanje Byte-a, AI tutorja</li>
                    <li>Osnovno spremljanje napredka</li>
                    <li>En otroški profil</li>
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
                    <li>Neomejene AI interakcije</li>
                    <li>Dostop do vseh iger, aktivnosti in zgodb</li>
                    <li>Napredna analitika napredka</li>
                    <li>Več otroških profilov (do 5)</li>
                    <li>Prednostna podpora</li>
                    <li>Zgodnji dostop do novih funkcij</li>
                    <li>Izkušnja brez oglasov</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border-2 border-purple-100 rounded-2xl px-6 bg-white/50">
                <AccordionTrigger className="text-left font-semibold hover:text-purple-600">
                  Koliko stane Premium naročnina?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700">
                  Ponujamo dve možnosti Premium naročnine:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>
                      <strong>Mesečno:</strong> €7,90/mesec
                    </li>
                    <li>
                      <strong>Letno:</strong> €59/leto (prihranite več kot 37%)
                    </li>
                  </ul>
                  Oba paketa vključujeta vse Premium funkcije in ju lahko kadarkoli prekličete.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="border-2 border-purple-100 rounded-2xl px-6 bg-white/50">
                <AccordionTrigger className="text-left font-semibold hover:text-purple-600">
                  Ali lahko kadarkoli prekličem naročnino?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700">
                  Da! Naročnino lahko kadarkoli prekličete v nastavitvah računa. Premium dostop ohranite do konca
                  tekočega obračunskega obdobja. Vračila za delne mesece niso možna, vendar ohranite dostop do Premium
                  funkcij do izteka naročnine.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7" className="border-2 border-purple-100 rounded-2xl px-6 bg-white/50">
                <AccordionTrigger className="text-left font-semibold hover:text-purple-600">
                  Kako deluje AI? Ali res govori z mojim otrokom?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700">
                  Naša platforma uporablja napredne AI jezikovne modele za ustvarjanje izobraževalnih vsebin, zgodb in
                  pogovorov. AI je posebej konfiguriran za otrokom prijazne interakcije s filtriranjem vsebin in
                  varnostnimi ukrepi. Čeprav AI ustvarja odgovore v realnem času, so vse interakcije nadzorovane in
                  filtrirane za starostno primerno vsebino. Glejte na to kot na izobraževalno orodje, ne kot nadomestek
                  za človeško interakcijo.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8" className="border-2 border-purple-100 rounded-2xl px-6 bg-white/50">
                <AccordionTrigger className="text-left font-semibold hover:text-purple-600">
                  Ali lahko spremljam napredek svojega otroka?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700">
                  Da! Nadzorna plošča za starše omogoča celovit pregled analitike, vključno z:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Časom učenja in zgodovino aktivnosti</li>
                    <li>Rezultati iger in dosežki</li>
                    <li>Zbranimi značkami in nagradami</li>
                    <li>Dnevnimi učnimi nizi</li>
                    <li>Področji moči in izboljšav</li>
                    <li>Podrobnimi dnevniki sej</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-9" className="border-2 border-purple-100 rounded-2xl px-6 bg-white/50">
                <AccordionTrigger className="text-left font-semibold hover:text-purple-600">
                  Koliko otroških profilov lahko ustvarim?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700">
                  Z brezplačnim računom lahko ustvarite 1 otroški profil. Premium naročniki lahko ustvarijo do 5 otroških
                  profilov, vsak s svojim sledenjem napredka, dosežki in prilagojeno učno izkušnjo.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-10" className="border-2 border-purple-100 rounded-2xl px-6 bg-white/50">
                <AccordionTrigger className="text-left font-semibold hover:text-purple-600">
                  Katere naprave lahko uporabimo?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700">
                  KidsLearnAI deluje na vsaki napravi z modernim spletnim brskalnikom:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Namizni računalniki (Windows, Mac, Linux)</li>
                    <li>Tablice (iPad, Android tablice)</li>
                    <li>Pametni telefoni (iOS, Android)</li>
                  </ul>
                  Priporočamo tablice ali računalnike za najboljšo izkušnjo. Platforma je popolnoma odzivna in deluje
                  brez povezave za mnoge funkcije, ko je enkrat naložena.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-11" className="border-2 border-purple-100 rounded-2xl px-6 bg-white/50">
                <AccordionTrigger className="text-left font-semibold hover:text-purple-600">
                  Ali zbirate osebne podatke mojega otroka?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700">
                  Zbiramo minimalne podatke, potrebne za izobraževalno izkušnjo: ime, starost in podatke o učnem napredku.
                  NE zbiramo občutljivih osebnih podatkov, fotografij ali podatkov o lokaciji. Vsi podatki so šifrirani
                  in varno shranjeni. Starši imajo popoln nadzor in lahko kadarkoli izbrišejo podatke svojega otroka.
                  Za podrobnosti glejte našo{" "}
                  <Link href="/privacy-policy" className="text-blue-600 hover:underline">
                    Politiko zasebnosti
                  </Link>.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-12" className="border-2 border-purple-100 rounded-2xl px-6 bg-white/50">
                <AccordionTrigger className="text-left font-semibold hover:text-purple-600">
                  Kaj storiti, če moj otrok naleti na neprimerno vsebino?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700">
                  Čeprav imamo robustno filtriranje vsebin in varnostne ukrepe, noben sistem ni popoln. Če vaš otrok
                  naleti na kakršnokoli neprimerno vsebino, jo prosimo takoj prijavite prek platforme ali kontaktirajte
                  našo ekipo za podporo. Vse prijave jemljemo resno in nenehno izboljšujemo naše varnostne sisteme.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-13" className="border-2 border-purple-100 rounded-2xl px-6 bg-white/50">
                <AccordionTrigger className="text-left font-semibold hover:text-purple-600">
                  Ali lahko moj otrok to uporablja brez nadzora?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700">
                  Čeprav je naša platforma zasnovana z mislijo na varnost, priporočamo nadzor staršev, zlasti za mlajše
                  otroke (5-8 let). Starejši otroci (9-12 let) lahko platformo uporabljajo bolj samostojno, vendar
                  spodbujamo starše, da redno pregledujejo napredek in aktivnosti svojega otroka prek nadzorne plošče.
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
                        Kontaktno stran
                      </Link>
                    </li>
                    <li>Pišite nam na support@kids-learning-ai.com</li>
                    <li>Uporabite gumb za pomoč v aplikaciji (Premium naročniki imajo prednostno podporo)</li>
                  </ul>
                  Običajno odgovorimo v 24-48 urah.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-15" className="border-2 border-purple-100 rounded-2xl px-6 bg-white/50">
                <AccordionTrigger className="text-left font-semibold hover:text-purple-600">
                  Se bo moj otrok res naučil o AI?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700">
                  Da! Naša platforma uči koncepte AI skozi praktične izkušnje. Otroci se učijo o:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Prepoznavanju vzorcev in osnovah strojnega učenja</li>
                    <li>Kako AI sprejema odločitve</li>
                    <li>Obdelavi naravnega jezika skozi pogovore</li>
                    <li>Kreativnih uporabah AI</li>
                    <li>Etičnih vidikih AI tehnologije</li>
                  </ul>
                  Učenje poteka naravno skozi igro, kar kompleksne koncepte naredi dostopne in zabavne.
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="mt-12 p-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl text-center border-2 border-purple-200">
              <h3 className="font-bold text-lg mb-2 text-gray-900">Še imate vprašanja?</h3>
              <p className="text-gray-700 mb-4">Tukaj smo, da pomagamo! Obrnite se na našo ekipo za podporo.</p>
              <Link href="/contact">
                <Button className="bg-purple-600 hover:bg-purple-700 rounded-full">Kontaktirajte podporo</Button>
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
