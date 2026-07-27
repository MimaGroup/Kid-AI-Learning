import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Nazaj na domačo stran
          </Button>
        </Link>

        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">Politika piškotkov</h1>
          <p className="text-sm text-gray-500 mb-8">Zadnja posodobitev: {new Date().toLocaleDateString("sl-SI")}</p>

          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900">1. Kaj so piškotki?</h2>
              <p>
                Piškotki so majhne besedilne datoteke, ki se na vašo napravo shranijo ob obisku naše spletne strani.
                Pomagajo nam zagotavljati boljšo izkušnjo z ohranjanjem vaših nastavitev in razumevanjem uporabe
                platforme.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900">2. Kako uporabljamo piškotke</h2>
              <p className="mb-3">Piškotke uporabljamo za naslednje namene:</p>

              <h3 className="text-xl font-semibold mb-2 text-gray-800">Nujni piškotki (obvezni)</h3>
              <p className="mb-2">Ti piškotki so nujni za delovanje platforme in jih ni mogoče izklopiti:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>
                  <strong>Avtentikacija:</strong> Ohranja vašo prijavo v račun
                </li>
                <li>
                  <strong>Varnost:</strong> Ščiti pred goljufijami in nepooblaščenim dostopom
                </li>
                <li>
                  <strong>Upravljanje seje:</strong> Zapomni si vaša dejanja med brskanjem
                </li>
                <li>
                  <strong>Zaščita CSRF:</strong> Preprečuje napade ponarejanja zahtev med spletnimi mesti
                </li>
              </ul>

              <h3 className="text-xl font-semibold mb-2 text-gray-800">Funkcionalni piškotki</h3>
              <p className="mb-2">Ti piškotki izboljšajo vašo izkušnjo:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>
                  <strong>Nastavitve:</strong> Zapomnijo si vaše nastavitve in izbire
                </li>
                <li>
                  <strong>Jezik:</strong> Shranijo vaš izbrani jezik
                </li>
                <li>
                  <strong>Profil otroka:</strong> Zapomnijo si, kateri profil otroka je aktiven
                </li>
              </ul>

              <h3 className="text-xl font-semibold mb-2 text-gray-800">Trženjski piškotki (samo z vašo privolitvijo)</h3>
              <p className="mb-2">
                Te piškotke naložimo izključno, če jih sprejmete prek pasice s piškotki, in{" "}
                <strong>nikoli znotraj otroškega dela aplikacije</strong> (vse poti pod /kids):
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Facebook Pixel:</strong> Meri učinkovitost naših oglasnih kampanj na Facebooku/Instagramu
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900">3. Vrste piškotkov, ki jih uporabljamo</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-3 text-left">Ime piškotka</th>
                      <th className="border border-gray-300 p-3 text-left">Namen</th>
                      <th className="border border-gray-300 p-3 text-left">Trajanje</th>
                      <th className="border border-gray-300 p-3 text-left">Vrsta</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 p-3">sb-access-token</td>
                      <td className="border border-gray-300 p-3">Avtentikacijska seja</td>
                      <td className="border border-gray-300 p-3">1 ura</td>
                      <td className="border border-gray-300 p-3">Nujni</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3">sb-refresh-token</td>
                      <td className="border border-gray-300 p-3">Podaljšanje seje</td>
                      <td className="border border-gray-300 p-3">30 dni</td>
                      <td className="border border-gray-300 p-3">Nujni</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3">csrf-token</td>
                      <td className="border border-gray-300 p-3">Varnostna zaščita</td>
                      <td className="border border-gray-300 p-3">Seja</td>
                      <td className="border border-gray-300 p-3">Nujni</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3">cookie-consent</td>
                      <td className="border border-gray-300 p-3">Shrani vašo izbiro glede piškotkov</td>
                      <td className="border border-gray-300 p-3">1 leto</td>
                      <td className="border border-gray-300 p-3">Nujni</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3">user-preferences</td>
                      <td className="border border-gray-300 p-3">Shranjevanje uporabniških nastavitev</td>
                      <td className="border border-gray-300 p-3">1 leto</td>
                      <td className="border border-gray-300 p-3">Funkcionalni</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3">_fbp</td>
                      <td className="border border-gray-300 p-3">Facebook Pixel — meritev oglasnih kampanj</td>
                      <td className="border border-gray-300 p-3">90 dni</td>
                      <td className="border border-gray-300 p-3">Trženjski (z privolitvijo)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900">4. Piškotki tretjih oseb</h2>
              <p className="mb-3">Uporabljamo storitve zaupanja vrednih tretjih oseb, ki lahko nastavijo svoje piškotke:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Stripe:</strong> Obdelava plačil (varno plačevanje) — nujno
                </li>
                <li>
                  <strong>Vercel:</strong> Gostovanje in optimizacija delovanja — nujno
                </li>
                <li>
                  <strong>Facebook Pixel (Meta):</strong> Trženjski piškotek, naložen izključno z vašo privolitvijo in
                  nikoli na otroških straneh platforme
                </li>
              </ul>
              <p className="mt-3">
                Za piškotke tretjih oseb veljajo njihove lastne politike zasebnosti — priporočamo, da jih pregledate.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900">5. Zasebnost otrok</h2>
              <p>
                Piškotkov ne uporabljamo za sledenje ali profiliranje otrok. Trženjski piškotki (Facebook Pixel) se ne
                naložijo nikoli, kadar je aktiven profil otroka ali ste na katerikoli strani znotraj otroškega dela
                aplikacije (/kids). Vsi profili otrok delujejo prek starševskega računa, brez lastnih sledilnih
                mehanizmov.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900">6. Upravljanje piškotkov</h2>
              <p className="mb-3">Nad piškotki imate popoln nadzor:</p>

              <h3 className="text-xl font-semibold mb-2 text-gray-800">Pasica s piškotki</h3>
              <p className="mb-2">
                Ob prvem obisku lahko izberete "Sprejmi vse" ali "Samo nujne". Izbiro lahko kadar koli spremenite z
                brisanjem piškotka <code>cookie-consent</code> v nastavitvah brskalnika.
              </p>

              <h3 className="text-xl font-semibold mb-2 text-gray-800">Nastavitve brskalnika</h3>
              <p className="mb-2">Večina brskalnikov omogoča:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Pregled in brisanje piškotkov</li>
                <li>Blokiranje piškotkov tretjih oseb</li>
                <li>Blokiranje vseh piškotkov (lahko vpliva na delovanje)</li>
                <li>Brisanje piškotkov ob zaprtju brskalnika</li>
              </ul>

              <h3 className="text-xl font-semibold mb-2 text-gray-800">Navodila po brskalnikih</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Chrome:</strong> Nastavitve → Zasebnost in varnost → Piškotki
                </li>
                <li>
                  <strong>Firefox:</strong> Nastavitve → Zasebnost in varnost → Piškotki
                </li>
                <li>
                  <strong>Safari:</strong> Nastavitve → Zasebnost → Piškotki
                </li>
                <li>
                  <strong>Edge:</strong> Nastavitve → Piškotki in dovoljenja spletnih mest
                </li>
              </ul>

              <p className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <strong>Opozorilo:</strong> Blokiranje nujnih piškotkov vam bo onemogočilo prijavo in uporabo
                platforme. Funkcionalne in trženjske piškotke lahko onemogočite brez vpliva na osnovno delovanje.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900">7. Sledenje ("Do Not Track")</h2>
              <p>
                Nekateri brskalniki imajo funkcijo "Do Not Track". Trenutno ne obstaja panožni standard za odziv na
                ta signal. Ciljanega oglaševanja tretjim osebam ne posredujemo — trženjski piškotek (Facebook Pixel)
                se uporablja izključno za merjenje učinkovitosti lastnih oglasnih kampanj in samo z vašo privolitvijo.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900">8. Posodobitve te politike</h2>
              <p>
                To politiko piškotkov lahko občasno posodobimo zaradi sprememb tehnologije ali zakonodaje. O
                bistvenih spremembah vas bomo obvestili po e-pošti ali z obvestilom na platformi.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900">9. Stik z nami</h2>
              <p className="mb-3">Za vprašanja o uporabi piškotkov nas kontaktirajte:</p>
              <ul className="space-y-1">
                <li>
                  <strong>E-pošta:</strong> support@kids-learning-ai.com
                </li>
                <li>
                  <strong>Podpora:</strong>{" "}
                  <Link href="/contact" className="text-blue-600 hover:underline">
                    Kontaktni obrazec
                  </Link>
                </li>
              </ul>
            </section>

            <section className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Povezane politike</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy" className="text-blue-600 hover:underline">
                    Politika zasebnosti
                  </Link>{" "}
                  — kako zbiramo in uporabljamo vaše podatke
                </li>
                <li>
                  <Link href="/terms" className="text-blue-600 hover:underline">
                    Pogoji uporabe
                  </Link>{" "}
                  — pravila in smernice za uporabo platforme
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
