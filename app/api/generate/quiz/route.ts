import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

const QUESTIONS = [
  {
    question: "Za kaj stoji kratica AI?",
    options: ["Umetna inteligenca", "Samodejne informacije", "Napredni internet", "Neverjetne ideje"],
    correct: 0,
    explanation:
      "AI pomeni umetna inteligenca — računalniški sistemi, ki opravljajo naloge, za katere je običajno potrebna človeška inteligenca!",
  },
  {
    question: "Kaj je primer AI v vsakdanjem življenju?",
    options: ["Navaden kalkulator", "Glasovni pomočniki, kot je Siri", "Papirnata knjiga", "Kolo"],
    correct: 1,
    explanation:
      "Glasovni pomočniki uporabljajo AI, da razumejo tvoj govor in odgovorijo na vprašanja. Z vsako interakcijo se učijo in postajajo boljši!",
  },
  {
    question: "Pri čem nam lahko pomaga AI?",
    options: ["Samo pri igranju iger", "Prepoznavanju obrazov na fotografijah", "Boljšem okusu hrane", "Spreminjanju vremena"],
    correct: 1,
    explanation:
      "AI je odličen pri prepoznavanju vzorcev, na primer obrazov na fotografijah. To tehnologijo uporabljajo kamere in aplikacije za družbena omrežja!",
  },
  {
    question: "Kako se AI uči?",
    options: [
      "Z branjem knjig, kot ljudje",
      "Z analizo množice primerov in podatkov",
      "Z gledanjem televizije",
      "Ne uči se, vse že ve",
    ],
    correct: 1,
    explanation:
      "AI se uči tako, da si ogleda veliko primerov in v podatkih poišče vzorce. Več primerov kot vidi, boljša postane pri svoji nalogi!",
  },
  {
    question: "Pri katerem poklicu bi AI lahko pomagala v prihodnosti?",
    options: [
      "Zdravnikom pri diagnosticiranju bolezni",
      "Jedla bi tvojo malico namesto tebe",
      "Delala bi tvojo domačo nalogo (goljufija!)",
      "Sklepala bi prijateljstva namesto tebe",
    ],
    correct: 0,
    explanation:
      "AI lahko pomaga zdravnikom z analizo medicinskih slik in podatkov, da bolezni odkrijejo zgodaj. A ne pozabi — AI je orodje, ki pomaga ljudem, ne pa njihova zamenjava!",
  },
  {
    question: "Kaj je robot?",
    options: [
      "Naprava, ki lahko zaznava okolico in izvaja naloge",
      "Vrsta hrane",
      "Igra na telefonu",
      "Risana serija",
    ],
    correct: 0,
    explanation:
      "Robot je naprava, ki z senzorji zazna svet okoli sebe in nato izvaja naloge, kot je premikanje ali prijemanje predmetov!",
  },
  {
    question: "Kaj pomeni, da se računalnik 'uči'?",
    options: [
      "Da bere knjige v šoli",
      "Da iz podatkov prepoznava vzorce in postaja boljši",
      "Da se pogovarja z učiteljem",
      "Da se igra z drugimi računalniki",
    ],
    correct: 1,
    explanation:
      "Računalnik se 'uči' tako, da analizira veliko podatkov in v njih najde vzorce, s pomočjo katerih postaja pri svoji nalogi vedno boljši!",
  },
  {
    question: "Kaj so podatki?",
    options: [
      "Koščki informacij, ki jih računalniki zbirajo in uporabljajo",
      "Igrače za otroke",
      "Vrsta glasbe",
      "Šolski predmet",
    ],
    correct: 0,
    explanation: "Podatki so informacije, kot so števila, besede ali slike, ki jih računalniki zbirajo, shranjujejo in analizirajo!",
  },
  {
    question: "Kaj naredi računalniški vid?",
    options: [
      "Pomaga računalnikom razumeti in prepoznavati slike",
      "Popravlja slab vid pri ljudeh",
      "Ustvarja risane filme",
      "Meri hitrost interneta",
    ],
    correct: 0,
    explanation: "Računalniški vid je veja umetne inteligence, ki računalnikom pomaga 'videti' in razumeti fotografije ter video posnetke!",
  },
  {
    question: "Kaj je algoritem?",
    options: ["Zaporedje korakov za rešitev problema", "Vrsta robota", "Ime za internet", "Igra na računalniku"],
    correct: 0,
    explanation:
      "Algoritem je niz jasnih korakov, ki povedo računalniku (ali tebi!), kako rešiti neko nalogo — podobno kot recept za kuhanje!",
  },
  {
    question: "Kaj je chatbot?",
    options: [
      "Program, s katerim se lahko pogovarjaš s pisanjem sporočil",
      "Vrsta igrače za male otroke",
      "Naprava za merjenje vremena",
      "Šolska knjiga",
    ],
    correct: 0,
    explanation: "Chatbot je AI program, ki prebere tvoje sporočilo, ga razume in ti nanj odgovori — kot bi se pogovarjal s prijateljem!",
  },
  {
    question: "Zakaj je pomembno, da svojih osebnih podatkov ne deliš z AI programi ali neznanci?",
    options: [
      "Ker to ni pomembno",
      "Da zaščitimo zasebnost in varnost",
      "Ker AI tega ne zna razumeti",
      "Ker je to prepovedano samo odraslim",
    ],
    correct: 1,
    explanation: "Varovanje osebnih podatkov, kot so ime, naslov ali telefonska številka, je zelo pomembno za zaščito zasebnosti in varnosti vsakogar!",
  },
  {
    question: "Kaj je pametni zvočnik (na primer Alexa ali Google Home)?",
    options: [
      "Naprava, ki z AI razume govorjene ukaze in odgovarja nanje",
      "Navaden radio",
      "Igrača za risanje",
      "Vrsta telefona brez zaslona",
    ],
    correct: 0,
    explanation: "Pametni zvočniki uporabljajo AI, da razumejo, kar jim rečeš, in ti pomagajo — na primer predvajajo glasbo ali odgovorijo na vprašanja!",
  },
  {
    question: "Kaj lahko naredi AI v bolnišnici?",
    options: [
      "Pomaga zdravnikom prepoznati bolezni na slikah",
      "Kuha kosila za paciente",
      "Čisti bolniške sobe",
      "Vozi reševalna vozila",
    ],
    correct: 0,
    explanation: "AI lahko pomaga zdravnikom analizirati rentgenske slike in druge preiskave, da hitreje odkrijejo bolezni!",
  },
  {
    question: "Kaj je pomembno, preden zaupamo odgovoru, ki ga da AI?",
    options: [
      "Vedno mu brezpogojno verjeti",
      "Preveriti, ali je informacija resnična in smiselna",
      "Odgovor takoj deliti z vsemi prijatelji",
      "Nič, AI se nikoli ne zmoti",
    ],
    correct: 1,
    explanation: "AI se lahko včasih zmoti, zato je pomembno, da odgovore preveriš in razmisliš, ali so smiselni, preden jim popolnoma zaupaš!",
  },
  {
    question: "Kaj je robotska roka v tovarni?",
    options: [
      "Stroj, ki opravlja ponavljajoča se opravila, kot je sestavljanje delov",
      "Igrača za otroke",
      "Vrsta računalniške miške",
      "Del video igre",
    ],
    correct: 0,
    explanation: "Robotske roke v tovarnah pomagajo sestavljati izdelke, kot so avtomobili, hitro in natančno, brez utrujenosti!",
  },
  {
    question: "Kako AI pomaga pri prevajanju jezikov?",
    options: [
      "Prepozna besede in stavke ter jih prevede v drug jezik",
      "Uči otroke peti",
      "Popravlja pravopisne napake v risankah",
      "Ustvarja nove jezike",
    ],
    correct: 0,
    explanation: "Prevajalniki, ki uporabljajo AI, analizirajo besedilo in ga prevedejo v drug jezik, tako da si ljudje iz različnih držav lahko lažje pomagajo!",
  },
  {
    question: "Kaj je pomembno pri uporabi interneta in AI orodij?",
    options: [
      "Da vedno prosiš starše ali skrbnike za dovoljenje in nasvet",
      "Da nikoli ne uporabljaš računalnika",
      "Da vse deliš z neznanci",
      "Da ignoriraš navodila staršev",
    ],
    correct: 0,
    explanation: "Starši in skrbniki ti lahko pomagajo varno uporabljati internet in AI orodja, zato jih vedno vprašaj, če nisi prepričan/a!",
  },
  {
    question: "Kaj so senzorji pri robotih?",
    options: [
      "Naprave, ki robotu pomagajo zaznavati okolico, kot so kamere ali mikrofoni",
      "Igrače za sestavljanje",
      "Vrsta baterije",
      "Del programske kode",
    ],
    correct: 0,
    explanation: "Senzorji so robotova 'čutila' — kamere mu pomagajo videti, mikrofoni pa slišati zvoke iz okolice!",
  },
  {
    question: "Zakaj pravimo, da je AI 'orodje', ne pa 'oseba'?",
    options: [
      "Ker AI nima lastnih čustev in misli tako kot ljudje",
      "Ker je AI narejen iz kovine",
      "Ker AI ne dela nič uporabnega",
      "Ker AI živi v računalniku kot žival",
    ],
    correct: 0,
    explanation: "AI je zelo pameten program, a nima čustev, misli ali zavesti kot ljudje — je orodje, ki nam pomaga, ne pa živo bitje!",
  },
]

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export async function POST(request: Request) {
  try {
    let count = 5
    try {
      const body = await request.json()
      if (typeof body?.count === "number" && body.count > 0) {
        count = body.count
      }
    } catch {
      // no body provided, use default count
    }

    const selectedQuestions = shuffle(QUESTIONS).slice(0, Math.min(count, QUESTIONS.length))

    return NextResponse.json({ questions: selectedQuestions })
  } catch (error) {
    console.error("[v0] Error in quiz selection:", error)
    return NextResponse.json({ questions: QUESTIONS.slice(0, 5) }, { status: 200 })
  }
}
