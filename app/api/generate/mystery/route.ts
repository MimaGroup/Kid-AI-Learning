import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

const MYSTERIES = [
  {
    title: "Primer izginule malice",
    description:
      "Nekomu je iz jedilnice izginila malica! Sendvič je bil na mizi ob poldnevu, do 12.30 pa je izginil. Ali lahko ugotoviš, kaj se je zgodilo?",
    clues: [
      "Od mize za malico do vrat na igrišče vodijo drobtine",
      "Učenec je okoli 12.15 videl veverico blizu odprtega okna",
      "Vrečka za malico je bila najdena zunaj, prazna, a ne raztrgana",
    ],
    solution:
      "Prebrisana veverica je prišla skozi odprto okno in odnesla sendvič! Drobtine kažejo njeno pot, vrečko pa je previdno odprla, ne da bi jo poškodovala.",
  },
  {
    title: "Skrivnost zamenjanih nahrbtnikov",
    description:
      "Dva učenca sta pomotoma domov odnesla identična nahrbtnika drug drugega. Kako lahko ugotovimo, kateri nahrbtnik je čigav?",
    clues: [
      "V enem nahrbtniku je učbenik za matematiko z napisom 'Učilnica 204'",
      "V drugem nahrbtniku je dovolilnica, ki jo je podpisala 'ga. Kovač'",
      "Šolski imenik pokaže, da ga. Kovač poučuje v učilnici 204",
    ],
    solution:
      "Oba nahrbtnika pripadata učencema iz učilnice 204! S primerjavo razrednega seznama in imen na dovolilnici ter učbeniku lahko vsak nahrbtnik vrnemo pravemu lastniku.",
  },
  {
    title: "Uganka premečene knjižnice",
    description:
      "Šolska knjižničarka je prišla in ugotovila, da so vse knjige čez noč skrivnostno premečene. Kdo bi lahko to naredil in zakaj?",
    clues: [
      "Knjige so zdaj razvrščene po barvi namesto po predmetu",
      "Na mizi je bilo zahvalno voščilo, podpisano z 'Likovni krožek'",
      "Likovna učiteljica je omenila, da bi rada fotografirala pisane razstave knjig",
    ],
    solution:
      "Likovni krožek je knjige razvrstil po barvi, da bi za svoj fotografski projekt ustvaril čudovito mavrično razstavo! Pustili so voščilo z razlago in nameravali vse pospraviti nazaj.",
  },
  {
    title: "Skrivnost obrnjenih slik",
    description:
      "Vse slike na hodniku so bile čez noč obrnjene narobe, tako da so gledale steno namesto učencev. Kdo bi lahko to naredil in zakaj?",
    clues: [
      "Hišnik je zjutraj videl, da je bila lestev prislonjena ob steno hodnika",
      "V razredu 3. b so učenci prejšnji dan risali o tem, kako umetniki gledajo stvari z druge strani",
      "Učiteljica likovne vzgoje je povedala, da je učencem naročila nalogo: 'Poglej svet z druge perspektive'",
    ],
    solution:
      "Radovedni učenci iz 3. b so po pouku obrnili slike, da bi preizkusili, kako izgleda svet z druge strani, kot jim je naročila učiteljica. Niso hoteli nikomur škoditi, le raziskovali so svojo nalogo. Slike so nato skupaj obesili nazaj, kot je bilo prav.",
  },
  {
    title: "Uganka izginulih copatov",
    description: "V garderobi je zjutraj manjkal en par copatov. Kam so izginili in kdo jih je vzel?",
    clues: [
      "Hišnik je videl mokre stopinje, ki so vodile od garderobe do telovadnice",
      "V telovadnici je učiteljica športne vzgoje pripravljala tekmovanje v teku",
      "En učenec je povedal, da je pozabil svoje copate doma in si je izposodil par iz garderobe",
    ],
    solution:
      "Učenec, ki je pozabil svoje copate doma, si je brez vprašanja izposodil copate iz garderobe, da bi lahko sodeloval na tekmovanju v telovadnici. Po tekmovanju jih je vrnil nazaj, a je pozabil povedati, da si jih je izposodil. Ko je priznal, se je opravičil lastniku in obljubil, da bo naslednjič najprej vprašal.",
  },
  {
    title: "Skrivnost premaknjene mize",
    description: "Učiteljičina miza je bila nenadoma premaknjena na drugo stran razreda. Kdo in zakaj jo je premaknil?",
    clues: [
      "Hišnik je čistil tla v razredu prejšnji večer in omenil, da je moral vse mize premakniti",
      "Učiteljica je rekla, da sonce zjutraj preveč sveti naravnost v oči, ko sedi za mizo",
      "Razredniki so opazili, da je zdaj miza obrnjena stran od okna",
    ],
    solution:
      "Hišnik je učiteljičino mizo premaknil na njeno prošnjo, da sonce ne bi več motilo pri delu. Miza je zdaj obrnjena stran od okna, kjer je učiteljici bolj udobno. Vse je bilo dogovorjeno vnaprej, le učenci niso vedeli za spremembo!",
  },
  {
    title: "Uganka poslikane table",
    description: "Šolska tabla je bila zjutraj polna barvitih risb namesto navadnih zapiskov. Kdo je risal po tabli čez noč?",
    clues: [
      "Čistilka je povedala, da je prejšnji večer v razredu ostala skupina učencev likovnega krožka",
      "Na mizi je ležal urnik z napisom 'Priprave na razstavo'",
      "Risbe na tabli prikazujejo isto temo kot razstava likovnega krožka - živali in rastline",
    ],
    solution:
      "Učenci likovnega krožka so po pouku vadili risanje za prihajajočo razstavo in so za vajo uporabili tudi šolsko tablo. Nameravali so jo zjutraj pobrisati, a so pozabili zaradi hitenja domov. Učiteljica jim je prijazno povedala, naj bodo naslednjič bolj pozorni.",
  },
  {
    title: "Skrivnost zamenjanih dežnikov",
    description: "Po dežju so trije učenci ugotovili, da imajo napačne dežnike. Kako so se dežniki zamenjali?",
    clues: [
      "Vsi trije dežniki so bili iste modre barve in podobne velikosti",
      "Učenci so jih pustili skupaj v stojalu za dežnike pred vhodom v šolo",
      "Ko je deževalo, so si učenci v naglici vzeli prvi dežnik, ki so ga videli",
    ],
    solution:
      "Ker so bili vsi trije dežniki videti skoraj enaki, so si učenci v naglici, ko je začelo deževati, pomotoma vzeli napačne dežnike. Ko so se pogovorili, so hitro ugotovili, kateri dežnik pripada komu, in si jih zamenjali nazaj.",
  },
  {
    title: "Uganka izginulih nalepk",
    description: "Iz učilnice je izginila cela škatla nalepk za nagrajevanje učencev. Kam so izginile?",
    clues: [
      "Učiteljica je zadnjič uporabila nalepke v petek popoldne za pohvalo najboljših risb",
      "V omari za pripomočke je bila najdena prazna škatla",
      "Hišnik je povedal, da je v soboto čistil omaro in premaknil vse škatle na višjo polico",
    ],
    solution:
      "Hišnik je med sobotnim čiščenjem po pomoti premaknil škatlo z nalepkami na najvišjo polico omare, kamor učiteljica ni pogledala. Ko so skupaj preiskali omaro, so škatlo hitro našli - nalepke niso bile izgubljene, le postavljene previsoko!",
  },
  {
    title: "Skrivnost čudnega vonja v jedilnici",
    description:
      "V šolski jedilnici je nekega jutra dišalo po sveže pečenem kruhu, čeprav kruha tisti dan ni bilo na jedilniku. Od kod je prihajal vonj?",
    clues: [
      "Kuharica je povedala, da je zjutraj pekla kruh za naslednji teden in ga zamrznila",
      "Vonj je prihajal iz kuhinje, ki meji na jedilnico",
      "Na urniku kuhinje je pisalo 'priprava kruha za teden dni vnaprej'",
    ],
    solution:
      "Kuharica je zjutraj pekla in zamrzovala kruh za prihodnji teden, zato je vonj sveže pečenega kruha napolnil jedilnico, čeprav tistega dne kruha niso postregli. Skrivnost je bila rešena, ko so učenci obiskali kuhinjo in videli sveže hlebce, pripravljene za zamrzovanje.",
  },
  {
    title: "Skrivnost izgubljene rokavice",
    description: "Na igrišču je bila najdena ena sama rokavica, a nihče ni vedel, čigava je. Kako bomo našli lastnika?",
    clues: [
      "Rokavica je rdeče barve z vezenim imenom, ki pa je bilo zbledelo in skoraj nečitljivo",
      "V razredu 2. a je en učenec tisti dan nosil samo eno rokavico",
      "Učenec je povedal, da mu je druga rokavica padla iz žepa med igro na igrišču",
    ],
    solution:
      "Rokavica je pripadala učencu iz 2. a, ki mu je med igro na igrišču nehote padla iz žepa. Ime na rokavici je bilo zbledelo, zato je bilo težko prebrati, a s pomočjo opisa in barve so hitro našli pravega lastnika.",
  },
  {
    title: "Skrivnost prestavljene ure",
    description: "Šolska ura na hodniku je nenadoma kazala napačen čas. Zakaj je ura prehitevala za eno uro?",
    clues: [
      "Hišnik je prejšnji teden zamenjal baterijo v uri",
      "Nihče od takrat ni preveril, ali ura kaže pravilen čas",
      "Na uri je bil majhen gumb za nastavitev časa, ki ga je nekdo nehote pritisnil",
    ],
    solution:
      "Ko je hišnik zamenjal baterijo, je pri tem nehote pritisnil gumb za nastavitev časa, zato je ura začela kazati napačen čas. Ko so uro ponovno nastavili, je spet pravilno kazala pravi čas.",
  },
  {
    title: "Uganka poslikanih oken",
    description: "Okna v jedilnici so bila nenadoma poslikana s sončnicami in metulji. Kdo je poslikal okna in zakaj?",
    clues: [
      "Bližal se je konec šolskega leta in praznovanje pomladi",
      "Učenci likovnega krožka so uporabljali posebne barve, ki se dajo oprati z okna",
      "Ravnateljica je prosila za lepšo okrasitev jedilnice ob prazniku pomladi",
    ],
    solution:
      "Ravnateljica je učence likovnega krožka prosila, naj polepšajo jedilnico za praznik pomladi. Uporabili so posebne barve za steklo, ki se dajo enostavno oprati, in poslikali okna s sončnicami in metulji, da bi vsem polepšali dan.",
  },
  {
    title: "Skrivnost tihega zvonca",
    description: "Nekega jutra šolski zvonec ni zazvonil, čeprav je bil čas za začetek pouka. Kaj se je zgodilo z zvoncem?",
    clues: [
      "Hišnik je prejšnji dan popravljal električno napeljavo v pisarni",
      "Zvonec je povezan na isto stikalo kot luči v zbornici",
      "Ko je hišnik po nesreči izklopil stikalo, se to ni takoj opazilo",
    ],
    solution:
      "Med popravilom električne napeljave je hišnik po nesreči izklopil stikalo, ki napaja tudi šolski zvonec. Ko je stikalo znova vklopil, je zvonec spet začel normalno delovati, in učenci so ta dan slišali zvonec malo kasneje kot ponavadi.",
  },
  {
    title: "Uganka razsutih kock",
    description:
      "V igralnici so bile vse škatle s kockami razsute po tleh, čeprav so bile prejšnji dan lepo pospravljene. Kaj se je zgodilo ponoči?",
    clues: [
      "Čistilka je zjutraj videla odprto okno v igralnici",
      "Zunaj je bil močan veter, ki je pihal vso noč",
      "Škatle s kockami so bile postavljene tik ob polici blizu okna",
    ],
    solution:
      "Močan veter je ponoči skozi odprto okno podrl škatle s kockami, ki so stale blizu police. Ko so zjutraj zaprli okno in pospravili kocke, je bila skrivnost hitro rešena - šlo je le za vremenski nagajivec, ne za nikogaršnjo krivdo.",
  },
]

export async function POST(request: Request) {
  try {
    let previousTitle: string | undefined
    try {
      const body = await request.json()
      previousTitle = body?.previousTitle
    } catch {
      // no body provided, that's fine
    }

    let pool = MYSTERIES
    if (previousTitle && MYSTERIES.length > 1) {
      pool = MYSTERIES.filter((m) => m.title !== previousTitle)
    }

    const mystery = pool[Math.floor(Math.random() * pool.length)]

    return NextResponse.json({ mystery })
  } catch (error) {
    console.error("[v0] Error in mystery selection:", error)
    return NextResponse.json({ mystery: MYSTERIES[0] }, { status: 200 })
  }
}
