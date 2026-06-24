import Link from "next/link"

export const metadata = {
  title: "Politika zasebnosti — Kids Learning AI",
  description: "Kako zbiramo, uporabljamo in varujemo vaše osebne podatke na platformi Kids Learning AI.",
}

const SECTIONS = [
  {
    title: "1. Upravljavec osebnih podatkov",
    body: `Upravljavec osebnih podatkov je:\n\nPodjetniške in poslovne storitve, Danijel Milovanović s.p.\n(v nadaljevanju »mi« ali »platforma Kids Learning AI«)\n\nKontakt za vprašanja v zvezi z zasebnostjo: support@kids-learning-ai.com.\n\nPlatforma deluje v skladu z:\n• Uredbo EU 2016/679 (GDPR)\n• Zakonom o varstvu osebnih podatkov (ZVOP-2, Ur. l. RS, št. 163/22)\n• Zakonom o varstvu potrošnikov pred nepošteno poslovno prakso`,
  },
  {
    title: "2. Kateri podatki se zbirajo",
    body: `Zbiramo naslednje podatke:\n\n• Starševski račun: e-poštni naslov in geslo (shranjeno v šifriranem obliku).\n• Profil otroka: ime in stopnja znanja. Ne zbiramo e-poštnega naslova, datuma rojstva, naslova ali katerih koli kontaktnih podatkov otroka.\n• Podatki o učnem napredku: vrsta opravljene dejavnosti, dosežen rezultat, porabljeni čas, datum dokončanja.\n• Tehnični podatki: IP-naslov, tip brskalnika in operacijskega sistema — izključno za namene varnosti in odpravljanja napak.`,
  },
  {
    title: "3. Namen in pravna podlaga obdelave",
    body: `Vaše podatke obdelujemo za naslednje namene:\n\n• Zagotavljanje storitve (pravna podlaga: pogodba — člen 6(1)(b) GDPR): ustvarjanje in upravljanje računa, zagotavljanje dostopa do izobraževalnih dejavnosti, prikaz učnega napredka v starševski nadzorni plošči.\n• Varnost in preprečevanje zlorab (pravna podlaga: zakoniti interes — člen 6(1)(f) GDPR): zaščita pred nepooblaščenim dostopom in preprečevanje goljufij.\n• Zakonske obveznosti (pravna podlaga: pravna obveznost — člen 6(1)(c) GDPR): hramba podatkov, ki jo zahteva veljavna zakonodaja.`,
  },
  {
    title: "4. Varstvo podatkov otrok in starševska privolitev (GDPR člen 8 + ZVOP-2)",
    body: `Posebno pozornost namenjamo varstvu zasebnosti otrok.\n\nStarševska privolitev (obvezna za otroke do 15. leta):\nV skladu s členom 8 GDPR in 17. členom ZVOP-2 obdelava osebnih podatkov otroka, mlajšega od 15 let, zahteva privolitev starša ali zakonitega skrbnika. Ob registraciji privolitev pridobimo od starša — otrok nikoli ne more odpreti računa brez starševske odobritve. To ni birokratska obveznost; je vaša zaščita.\n\nKar NIKOLI ne zbiramo:\n• E-poštni naslov otroka\n• Datum rojstva ali starost otroka\n• Lokacijski podatki\n• Fotografije ali glasovni posnetki\n• Kakršni koli socialni ali komunikacijski podatki\n\nKaj zbiramo:\n• Profil otroka: samo ime (ki ga določi starš) in stopnja znanja\n• Učni napredek: vrsta dejavnosti, rezultat, čas — vidno izključno staršu\n\nDodatne zaščite:\n• Otroci nimajo samostojnih računov — vse upravljanje poteka prek starševskega računa\n• Podatkov otrok ne delimo s tretjimi osebami v komercialne namene\n• Na platformi ni oglasov, ni socialnih funkcij, ni klepetalnic\n• Starš ali zakoniti skrbnik lahko kadar koli zahteva takojšnji izbris vseh podatkov otroka`,
  },
  {
    title: "5. Delitev podatkov s tretjimi osebami",
    body: `Vaših osebnih podatkov ne prodajamo, ne dajemo v najem in ne tržimo. Podatke delimo izključno z:\n\n• Supabase (infrastruktura in baza podatkov): shramba podatkov na strežnikih v EU.\n• Vercel (gostovanje aplikacije): gostovanje Next.js aplikacije na strežnikih v EU/ZDA z ustreznimi pogodbenimi zaščitami (standardne pogodbene klavzule).\n• Organi kazenskega pregona: samo ob izrecni zakonski obveznosti.`,
  },
  {
    title: "6. Piškotki in sledilne tehnologije",
    body: `Platforma uporablja izključno funkcionalne piškotke, ki so nujni za delovanje storitve (seja prijave). Ne uporabljamo sledilnih piškotkov, oglasnih piškotkov ali analitičnih orodij tretjih oseb (npr. Google Analytics). Ker so ti piškotki nujni za delovanje, za njihovo uporabo soglasje ni zahtevano.`,
  },
  {
    title: "7. Hramba podatkov",
    body: `Podatke hranimo le toliko časa, kot je nujno potrebno:\n\n• Podatki računa: dokler je račun aktiven ali dokler ne zahtevate izbrisa.\n• Podatki o napredku: do izbrisa računa ali posameznega profila otroka.\n• Tehnični dnevniki: največ 30 dni.\n\nPo zahtevi za izbris ali zaprtju računa izbrišemo vse osebne podatke v roku 30 dni, razen tistih, ki jih moramo hraniti na podlagi zakonske obveznosti.`,
  },
  {
    title: "8. Vaše pravice (GDPR)",
    body: `Kot posameznik s pravico do varstva osebnih podatkov imate naslednje pravice:\n\n• Pravica do dostopa: zahtevate lahko kopijo vseh podatkov, ki jih hranimo o vas.\n• Pravica do popravka: zahtevate lahko popravek nepravilnih ali nepopolnih podatkov.\n• Pravica do izbrisa (»pravica do pozabe«): zahtevate lahko izbris vseh vaših podatkov.\n• Pravica do omejitve obdelave: zahtevate lahko, da omejimo obdelavo vaših podatkov.\n• Pravica do prenosljivosti: zahtevate lahko podatke v strojno berljivi obliki.\n• Pravica do ugovora: ugovarjate lahko obdelavi na podlagi zakonitega interesa.\n\nZahtevo za uveljavljanje pravic pošljite na support@kids-learning-ai.com. Odgovorili bomo v roku 30 dni.`,
  },
  {
    title: "9. Varnost podatkov",
    body: `Izvajamo ustrezne tehnične in organizacijske ukrepe za zaščito vaših podatkov:\n\n• Gesla so shranjena v obliki kriptografskega zgoščevanja (bcrypt).\n• Vsa komunikacija poteka prek šifriranega protokola HTTPS/TLS.\n• Dostop do baze podatkov je omejen z varnostnimi pravilniki na ravni vrstic (Row Level Security).\n• Plačilnih podatkov ne shranjujemo na naših strežnikih — plačila obdeluje certificiran ponudnik.\n\nV primeru kršitve varnosti podatkov, ki bi vplivala na vaše pravice, vas bomo obvestili v skladu z GDPR (72 ur pri organih, brez nepotrebnega odlašanja pri posameznikih).`,
  },
  {
    title: "10. Mednarodni prenosi podatkov",
    body: `Podatki so primarno shranjeni na strežnikih v Evropski uniji. Vercel za gostovanje v nekaterih primerih uporablja strežnike v ZDA — v tem primeru je prenos zaščiten s standardnimi pogodbenimi klavzulami EU (SCC), ki zagotavljajo enakovredno raven varstva kot GDPR.`,
  },
  {
    title: "11. Spremembe politike zasebnosti",
    body: `To politiko zasebnosti lahko občasno posodobimo. O bistvenih spremembah vas bomo obvestili po e-pošti vsaj 14 dni pred začetkom veljavnosti. Datum zadnje posodobitve je viden na vrhu te strani. Priporočamo, da politiko redno preberete.`,
  },
  {
    title: "12. Pritožba pri nadzornem organu",
    body: `Če menite, da vaše osebne podatke obdelujemo v nasprotju z GDPR, imate pravico vložiti pritožbo pri Informacijskem pooblaščencu Republike Slovenije:\n\nInformacijski pooblaščenec\nDunajska cesta 22, 1000 Ljubljana\nwww.ip-rs.si\ngp.ip@ip-rs.si`,
  },
  {
    title: "13. Stik z nami",
    body: `Za vsa vprašanja v zvezi z zasebnostjo pišite na support@kids-learning-ai.com. Trudimo se odgovoriti v 2 delovnih dneh.`,
  },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="border-b bg-white sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl">🚀</span>
            <span className="font-bold text-gray-900">Kids Learning AI</span>
          </Link>
          <Link
            href="/auth/sign-up"
            className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
          >
            Začni brezplačno
          </Link>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Politika zasebnosti</h1>
        <p className="text-gray-500 mb-12">
          Zadnja posodobitev: junij 2026 &nbsp;·&nbsp; Velja za platformo Kids Learning AI
        </p>

        {/* GDPR/ZVOP-2 highlight box */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-6">
          <h2 className="font-bold text-green-900 mb-3">Kratki povzetek</h2>
          <ul className="text-green-800 text-sm space-y-2">
            <li>✓ <strong>Za otroke do 15 let zahtevamo starševsko privolitev</strong> — v skladu z GDPR (člen 8) in slovenskim ZVOP-2.</li>
            <li>✓ Ne prodajamo vaših podatkov tretjim osebam.</li>
            <li>✓ Otroških podatkov (e-pošta, naslov) ne zbiramo.</li>
            <li>✓ Podatke shranjujemo v EU in jih zavarujemo s šifriranjem.</li>
            <li>✓ Račun in vse podatke lahko kadar koli izbrišete.</li>
            <li>✓ Ne uporabljamo oglasnih piškotkov ali sledilnih orodij.</li>
          </ul>
        </div>
        {/* Legal compliance badge */}
        <div className="flex flex-wrap gap-2 mb-12">
          {["🇸🇮 ZVOP-2 skladen", "🇪🇺 GDPR (EU 2016/679)", "👨‍👩‍👧 Starševska privolitev &lt;15 let", "🔒 Podatki v EU"].map((label) => (
            <span
              key={label}
              className="px-3 py-1.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-200"
              dangerouslySetInnerHTML={{ __html: label }}
            />
          ))}
        </div>

        <div className="space-y-10">
          {SECTIONS.map((s) => (
            <section key={s.title}>
              <h2 className="text-xl font-bold text-gray-900 mb-3">{s.title}</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">{s.body}</p>
            </section>
          ))}
        </div>
      </main>

      <footer className="border-t bg-gray-50 py-8 px-6 mt-12">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-gray-400">
          <Link href="/" className="hover:text-gray-700">← Nazaj na domačo stran</Link>
          <div className="flex gap-4">
            <Link href="/terms" className="hover:text-gray-700">Pogoji uporabe</Link>
            <Link href="/faq" className="hover:text-gray-700">Pogosta vprašanja</Link>
          </div>
          <Link href="/auth/login" className="hover:text-gray-700">Prijava</Link>
        </div>
      </footer>
    </div>
  )
}
