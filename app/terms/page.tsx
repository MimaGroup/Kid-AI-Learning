import Link from "next/link"

export const metadata = {
  title: "Pogoji uporabe — Kids Learning AI",
}

const SECTIONS = [
  {
    title: "1. Sprejem pogojev",
    body: `Z ustvarjanjem računa ali uporabo platforme Kids Learning AI (»Storitev«) se strinjate s temi pogoji uporabe. Če se ne strinjate, prosimo, ne uporabljajte Storitve. Ti pogoji so urejeni z zakonodajo Republike Slovenije in Evropske unije.`,
  },
  {
    title: "2. Opis storitve",
    body: `Kids Learning AI je izobraževalna platforma, ki ponuja interaktivne dejavnosti za učenje umetne inteligence za otroke v starosti od 5 do 12 let. Starši ali zakoniti skrbniki ustvarjajo in upravljajo račune v imenu svojih otrok.`,
  },
  {
    title: "3. Upravičenost",
    body: `Za ustvaritev računa morate imeti vsaj 18 let. Profile otrok lahko ustvarjajo in upravljajo izključno starši ali zakoniti skrbniki. Z registracijo potrjujete, da imate zakonito pooblastilo za sprejem teh pogojev v imenu vsakega otroškega profila, ki ga ustvarite.`,
  },
  {
    title: "4. Brezplačno preskusno obdobje",
    body: `Novi računi prejmejo 14-dnevno brezplačno preskusno obdobje s polnim dostopom do vseh funkcij. Za začetek preskusa plačilni podatki niso potrebni. Po izteku preskusnega obdobja je za nadaljnji dostop potrebna aktivna plačana naročnina.`,
  },
  {
    title: "5. Naročnina in zaračunavanje",
    body: `Po brezplačnem preskusu se Storitev zaračunava po €7,90 na mesec za en družinski račun. Vse cene so v evrih (EUR) in vključujejo DDV, kjer to zahteva zakonodaja EU. Zaračunavanje poteka na isti dan v mesecu. Cene se lahko spremenijo z 30-dnevnim obvestilom; nadaljnja uporaba po obvestilu pomeni sprejem nove cene.`,
  },
  {
    title: "6. Preklic in vračila",
    body: `Naročnino lahko kadarkoli prekličete v nastavitvah računa. Preklic začne veljati ob koncu trenutnega obračunskega obdobja — dostop ohranite do tega datuma. V skladu z zakonodajo EU o pravicah potrošnikov (Direktiva 2011/83/EU) ponujamo popolno povračilo v 14 dneh od prvega plačila, če niste zadovoljni.`,
  },
  {
    title: "7. Plačilo",
    body: `Plačila varno obdeluje naš ponudnik plačilnih storitev. Podatkov o kartici ne shranjujemo na naših strežnikih. Vse transakcije se zaračunajo v EUR. Za morebitne bančne provizije ali stroške pretvorbe valut, ki jih naloži vaša banka, ste odgovorni sami.`,
  },
  {
    title: "8. Sprejemljiva uporaba",
    body: `Soglašate, da ne boste: (a) delili podatkov za prijavo z drugimi; (b) poskušali dekompilirati ali strgati vsebine Storitve; (c) nalagali škodljive, nezakonite ali starostno neprimerne vsebine; (d) uporabljali Storitve v komercialne namene brez pisnega dovoljenja.`,
  },
  {
    title: "9. Zasebnost in otroški podatki",
    body: `Zasebnost otrok jemljemo resno. Zbiramo le podatke, potrebne za zagotavljanje Storitve. Osebnih podatkov ne prodajamo. Profili otrok vsebujejo le ime in stopnjo znanja — e-poštnega naslova ali kontaktnih podatkov otrok ne shranjujemo. Podrobnosti so v naši Politiki zasebnosti.`,
  },
  {
    title: "10. Intelektualna lastnina",
    body: `Vse vsebine na platformi — vključno z dejavnostmi, vprašanji, besedili, grafikami in programsko opremo — so v lasti podjetja Podjetniške in poslovne storitve, Danijel Milovanović s.p. (platforma Kids Learning AI) ali licencirane njemu. Brez pisnega soglasja jih ne smete reproducirati ali distribuirati.`,
  },
  {
    title: "11. Omejitev odgovornosti",
    body: `Storitev je zagotovljena »takšna kot je«. Ne jamčimo za neprekinjen ali brezhibni dostop. V največji meri, ki jo dopušča veljavna zakonodaja, ne odgovarjamo za posredne, naključne ali posledične škode, nastale z uporabo Storitve.`,
  },
  {
    title: "12. Spremembe pogojev",
    body: `Pogoje lahko občasno posodobimo. O bistvenih spremembah vas bomo obvestili po e-pošti vsaj 14 dni pred začetkom veljavnosti. Nadaljnja uporaba Storitve po tem datumu pomeni sprejem sprememb.`,
  },
  {
    title: "13. Stik z nami",
    body: `Vprašanja o teh pogojih? Pišite nam na support@kids-learning-ai.com. Trudimo se odgovoriti v 2 delovnih dneh.`,
  },
]

export default function TermsPage() {
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

      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Pogoji uporabe</h1>
        <p className="text-gray-500 mb-12">Zadnja posodobitev: junij 2026 &nbsp;·&nbsp; Vse cene v EUR</p>

        <div className="space-y-10">
          {SECTIONS.map((s) => (
            <section key={s.title}>
              <h2 className="text-xl font-bold text-gray-900 mb-3">{s.title}</h2>
              <p className="text-gray-600 leading-relaxed">{s.body}</p>
            </section>
          ))}
        </div>

        {/* Pricing summary box */}
        <div className="mt-16 bg-purple-50 border border-purple-200 rounded-2xl p-6">
          <h3 className="font-bold text-purple-900 mb-3">Povzetek cen</h3>
          <table className="w-full text-sm">
            <tbody className="divide-y divide-purple-100">
              {[
                ["Brezplačno preskusno obdobje", "14 dni, plačilo ni potrebno"],
                ["Mesečna naročnina", "€7,90 / mesec"],
                ["Valuta", "Evro (EUR)"],
                ["DDV", "Vključen, kjer zahteva zakonodaja EU"],
                ["Rok za vračilo", "14 dni od prvega plačila"],
                ["Preklic", "Kadarkoli, začne veljati ob koncu obračunskega obdobja"],
              ].map(([label, value]) => (
                <tr key={label}>
                  <td className="py-2 text-purple-700 font-medium w-48">{label}</td>
                  <td className="py-2 text-gray-700">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <footer className="border-t bg-gray-50 py-8 px-6 mt-12">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-gray-400">
          <Link href="/" className="hover:text-gray-700">← Nazaj na domačo stran</Link>
          <span>© {new Date().getFullYear()} Podjetniške in poslovne storitve, Danijel Milovanović s.p. · Kids Learning AI · Vse cene v EUR</span>
          <Link href="/auth/login" className="hover:text-gray-700">Prijava</Link>
        </div>
      </footer>
    </div>
  )
}
