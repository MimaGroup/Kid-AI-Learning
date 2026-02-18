-- Update AI Basics course content: fix Slovenian grammar + improve readability
-- Course: ai-basics-for-kids (12 lessons)

-- Module 1, Lesson 0: Kaj sploh je umetna inteligenca?
UPDATE course_lessons
SET content = E'# Kaj sploh je umetna inteligenca?\n\nPredstavljaj si, da imaš pametnega pomočnika, ki se lahko uči novih stvari -- tako kot ti!\n\nUmetna inteligenca (ali krajše **AI**) je posebna vrsta računalniškega programa, ki se lahko uči iz podatkov in sprejema odločitve.\n\n---\n\n## Kako si lahko predstavljaš AI?\n\nPomisli na svojega hišnega ljubljenčka. Ko ga naučiš novega trika:\n\n- Pokažeš mu, kaj naj naredi (to so **podatki**).\n- Ponavljaš vajo (to je **učenje**).\n- Ko se nauči, to naredi sam (to je **inteligenca**).\n\nAI deluje zelo podobno! Računalnik dobi veliko primerov, se iz njih uči in potem lahko sam rešuje podobne naloge.\n\n---\n\n## Primeri AI v tvojem življenju\n\nAli si vedel, da AI že uporabljamo vsak dan?\n\n- **Glasovni pomočniki** (kot Siri ali Google Assistant) -- razumejo tvoj glas.\n- **Priporočila na YouTubu** -- AI ugane, kateri video ti bo všeč.\n- **Filtri na fotografijah** -- AI prepozna tvoj obraz in doda smešne učinke.\n\n---\n\n## Pomembno si zapomni\n\nAI ni živa. Ne razmišlja kot človek. Je zelo pameten program, ki sledi navodilom in se uči iz primerov.',
    updated_at = NOW()
WHERE title = 'Kaj sploh je umetna inteligenca?'
  AND course_id = (SELECT id FROM courses WHERE slug = 'ai-basics-for-kids');

-- Module 1, Lesson 1: Kako računalnik razmišlja?
UPDATE course_lessons
SET content = E'# Kako računalnik razmišlja?\n\nRačunalniki ne razmišljajo tako kot mi. Nimajo možganov, ampak imajo nekaj drugega -- **procesor**, ki je kot zelo, zelo hiter kalkulator.\n\n---\n\n## Človek proti računalniku\n\n| Človek | Računalnik |\n|--------|------------|\n| Ima možgane | Ima procesor |\n| Se uči iz izkušenj | Se uči iz podatkov |\n| Ima čustva | Nima čustev |\n| Lahko je ustvarjalen | Sledi pravilom |\n| Je počasen pri matematiki | Je izjemno hiter pri matematiki |\n\n---\n\n## Kako računalnik "vidi" stvari?\n\nKo ti vidiš mačko, tvoji možgani takoj vedo -- to je mačka! Ampak računalnik vidi samo številke.\n\nVsaka slika je za računalnik tabela števil, ki predstavljajo barve.\n\nZato je AI tako posebna -- naučili smo računalnike, da iz teh števil prepoznajo, kaj je na sliki!\n\n---\n\n## Zabavno dejstvo\n\nTvoji možgani imajo približno 86 milijard nevronov (to so majhne celice, ki razmišljajo). Najboljši računalniki poskušajo posnemati te nevrone z nečim, čemur rečemo **nevronska mreža**.',
    updated_at = NOW()
WHERE title = 'Kako računalnik razmišlja?'
  AND course_id = (SELECT id FROM courses WHERE slug = 'ai-basics-for-kids');

-- Module 1, Lesson 2: Zgodba umetne inteligence
UPDATE course_lessons
SET content = E'# Zgodba umetne inteligence\n\nAI ni nova stvar! Ljudje sanjajo o pametnih strojih že zelo dolgo. Pojdimo na potovanje skozi čas!\n\n---\n\n## Časovnica AI\n\n### 1950 -- Začetek\n\nZnanstvenik **Alan Turing** je vprašal: "Ali lahko stroji razmišljajo?" Napisal je pravila za testiranje, ali je stroj pameten -- to imenujemo **Turingov test**.\n\n### 1966 -- Prvi klepetalni robot\n\nNaredili so program z imenom **ELIZA**, ki se je lahko pogovarjal z ljudmi. Ni bil zelo pameten, ampak je bil zabaven!\n\n### 1997 -- Šahovski prvak\n\nRačunalnik **Deep Blue** je premagal svetovnega šahovskega prvaka. Prvič je stroj premagal najboljšega človeškega igralca!\n\n### 2011 -- Glasovni pomočniki\n\nApple je predstavil **Siri** -- pomočnika, ki razume tvoj glas.\n\n### 2023 -- ChatGPT in naprej\n\nAI je postala tako pametna, da lahko piše zgodbe, ustvarja slike in se pogovarja skoraj kot človek!\n\n---\n\n## Kaj pa prihodnost?\n\nNihče ne ve natančno, kaj bo AI zmogla v prihodnosti. Morda bo pomagala zdraviti bolezni, čistiti oceane ali nas odpeljala na Mars!\n\n---\n\n## Tvoja vloga\n\nVi, otroci, ste tisti, ki boste oblikovali prihodnost AI. Zato je tako pomembno, da se o njej učite že zdaj!',
    updated_at = NOW()
WHERE title = 'Zgodba umetne inteligence'
  AND course_id = (SELECT id FROM courses WHERE slug = 'ai-basics-for-kids');

-- Module 2, Lesson 0: AI v tvojem telefonu
UPDATE course_lessons
SET content = E'# AI v tvojem telefonu\n\nTvoj telefon (ali telefon tvojih staršev) je poln umetne inteligence! Poglejmo, kje vse se skriva.\n\n---\n\n## Kamera in fotografije\n\nKo narediš fotografijo, AI pomaga na več načinov:\n\n- **Prepoznavanje obrazov** -- telefon ve, kdo je na sliki.\n- **Nočni način** -- AI naredi temne slike svetlejše.\n- **Portretni način** -- AI zamegli ozadje.\n\n---\n\n## Tipkovnica\n\nKo pišeš sporočilo, AI predlaga naslednje besede! Poskusi -- začni pisati in poglej, kaj ti telefon predlaga.\n\n---\n\n## Zemljevidi\n\nKo starševski telefon pokaže pot do šole:\n\n- AI analizira promet v realnem času.\n- Predlaga najhitrejšo pot.\n- Napove, koliko časa bo trajala pot.\n\n---\n\n## Glasovni pomočnik\n\n"Hej Siri" ali "OK Google" -- to je AI, ki:\n\n1. **Posluša** tvoj glas.\n2. **Pretvori** zvok v besedilo.\n3. **Razume**, kaj si vprašal.\n4. **Najde** odgovor.\n5. **Odgovori** v razumljivem jeziku.\n\n---\n\n## Razmisli\n\nKoliko stvari na telefonu uporablja AI? Verjetno veliko več, kot si mislil!',
    updated_at = NOW()
WHERE title = 'AI v tvojem telefonu'
  AND course_id = (SELECT id FROM courses WHERE slug = 'ai-basics-for-kids');

-- Module 2, Lesson 1: AI v igrah in zabavi
UPDATE course_lessons
SET content = E'# AI v igrah in zabavi\n\nAli si vedel, da so videoigre eden najboljših primerov AI? Poglejmo, kako AI naredi igre bolj zabavne!\n\n---\n\n## AI nasprotniki\n\nKo igraš igro proti računalniku, igraš proti AI! Na primer:\n\n- V **šahu** AI razmišlja o najboljši potezi.\n- V **dirkalni igri** AI avtomobili vozijo po progi.\n- V **Minecraftu** se pošasti premikajo in te iščejo.\n\n---\n\n## Kako AI v igri deluje?\n\nAI v igrah uporablja preprosta pravila:\n\n1. **Če** vidi igralca, **potem** ga napade.\n2. **Če** je igralec daleč, **potem** patrulira.\n3. **Če** ima malo življenja, **potem** se skrije.\n\nTo so kot navodila za igro!\n\n---\n\n## Priporočila\n\nKo gledaš YouTube ali Netflix:\n\n- AI si zapomni, kaj ti je všeč.\n- Primerja tvoj okus z drugimi otroki.\n- Predlaga videe, ki ti bodo verjetno všeč.\n\n---\n\n## Filtri na družbenih omrežjih\n\nTisti smešni filtri, ki ti dodajo mačja ušesa ali smešna očala? To je AI, ki:\n\n- Najde tvoj obraz na sliki.\n- Prepozna, kje so tvoje oči, nos in usta.\n- Doda filter na pravo mesto.\n\n---\n\n## Pomembno\n\nČeprav je AI v igrah zabavna, se spomni -- to je samo program, ne pravi nasprotnik!',
    updated_at = NOW()
WHERE title = 'AI v igrah in zabavi'
  AND course_id = (SELECT id FROM courses WHERE slug = 'ai-basics-for-kids');

-- Module 2, Lesson 2: AI v šoli in doma
UPDATE course_lessons
SET content = E'# AI v šoli in doma\n\nAI ni samo v telefonih in igrah -- je tudi v šoli in doma! Poglejmo, kje jo najdemo.\n\n---\n\n## AI v šoli\n\n- **Prevajalniki** (kot Google Translate) -- pomagajo pri učenju jezikov.\n- **Iskanje na internetu** -- ko googlaš za domačo nalogo, AI pomaga najti najboljše rezultate.\n- **Učne aplikacije** -- nekatere aplikacije se prilagodijo tvoji hitrosti učenja.\n\n---\n\n## AI doma\n\n- **Pametni zvočniki** -- Alexa in Google Home predvajata glasbo ter odgovarjata na vprašanja.\n- **Robotski sesalnik** -- AI mu pomaga, da ne trči v pohištvo.\n- **Pametni termostat** -- se nauči, kdaj ste doma, in uravnava temperaturo.\n\n---\n\n## AI in hrana\n\nTudi v kuhinji je AI:\n\n- Aplikacije, ki prepoznajo hrano na fotografiji.\n- Pametni hladilniki, ki vedo, kaj je notri.\n- Priporočila receptov glede na sestavine, ki jih imaš.\n\n---\n\n## Ali je AI povsod?\n\nSkoraj! Ampak ne pozabi -- vse naprave ne uporabljajo AI. Navadna žarnica, stikalo za luč ali vodna pipa -- to so preproste naprave brez AI.\n\n---\n\n## Ključna razlika\n\nNaprava z AI se **uči in prilagaja**. Navadna naprava pa vedno dela **isto stvar** na isti način.',
    updated_at = NOW()
WHERE title = 'AI v šoli in doma'
  AND course_id = (SELECT id FROM courses WHERE slug = 'ai-basics-for-kids');

-- Module 3, Lesson 0: Učenje iz primerov
UPDATE course_lessons
SET content = E'# Učenje iz primerov\n\nKako se AI nauči prepoznati mačko na sliki? Tako kot se ti učiš -- iz primerov!\n\n---\n\n## Tvoje učenje proti AI učenju\n\nKo si bil majhen, so ti starši pokazali mačko in rekli "mačka". Potem ko si videl VELIKO mačk, si se naučil, kaj je mačka -- velike, majhne, črtaste, črne ...\n\nAI se uči **enako**:\n\n1. Pokažemo ji tisoče slik mačk.\n2. Pokažemo ji tisoče slik, ki NISO mačke.\n3. AI najde vzorce -- mačke imajo ušesa, brke, rep ...\n4. Ko vidi novo sliko, preveri, ali ustreza vzorcu.\n\n---\n\n## Kaj so podatki?\n\nPodatki so hrana za AI. Več kot jih ima, bolje se nauči!\n\n- Za prepoznavanje živali potrebuje tisoče slik živali.\n- Za razumevanje govora potrebuje tisoče posnetkov govora.\n- Za igranje iger potrebuje tisoče odigranih iger.\n\n---\n\n## Zabaven eksperiment\n\nPredstavljaj si, da bi te nekdo naučil, kaj je "zumba" (izmišljena stvar). Pokazal bi ti 5 slik zumbe in 5 slik, ki NISO zumba. Ali bi po 10 slikah vedel, kaj je zumba?\n\nMorda! AI potrebuje več primerov, ampak načelo je isto.',
    updated_at = NOW()
WHERE title = 'Učenje iz primerov'
  AND course_id = (SELECT id FROM courses WHERE slug = 'ai-basics-for-kids');

-- Module 3, Lesson 1: Vzorci povsod
UPDATE course_lessons
SET content = E'# Vzorci povsod\n\nAI je mojster iskanja vzorcev! Ampak kaj sploh so vzorci?\n\n---\n\n## Kaj je vzorec?\n\nVzorec je nekaj, kar se ponavlja ali ima pravilo. Na primer:\n\n- Rdeča, modra, rdeča, modra -- to je vzorec barv!\n- 2, 4, 6, 8, __ -- to je vzorec števil! (naslednje je 10)\n- Vsako jutro vstaneš, zajtrkuješ, greš v šolo -- to je vzorec dneva!\n\n---\n\n## Kako AI najde vzorce?\n\nAI pregleda OGROMNO podatkov in poišče, kaj se ponavlja.\n\n### Vzorci v besedah\n\n- Po besedi "dobro" pogosto pride "jutro".\n- Po besedi "hvala" pogosto pride "lepa".\n- AI se to nauči in zato lahko predlaga besede!\n\n### Vzorci v slikah\n\n- Mačke imajo vedno: 2 ušesi, brke, rep.\n- Avtomobili imajo vedno: 4 kolesa, okna, luči.\n- AI prepozna te skupne lastnosti.\n\n### Vzorci v glasbi\n\n- Pesmi imajo ritem, ki se ponavlja.\n- Melodije sledijo pravilom.\n- AI se nauči teh pravil in lahko ustvari novo glasbo!\n\n---\n\n## Tvoji možgani so izjemni!\n\nTvoji možgani so pravzaprav BOLJŠI od AI pri iskanju vzorcev! Potrebuješ samo nekaj primerov, AI pa tisoče. Ampak AI je hitrejša pri pregledovanju velikih količin podatkov.',
    updated_at = NOW()
WHERE title = 'Vzorci povsod'
  AND course_id = (SELECT id FROM courses WHERE slug = 'ai-basics-for-kids');

-- Module 3, Lesson 2: Ko se AI zmoti
UPDATE course_lessons
SET content = E'# Ko se AI zmoti\n\nAI ni popolna -- včasih se zmoti! In to je povsem normalno.\n\n---\n\n## Zakaj se AI zmoti?\n\n### 1. Premalo primerov\n\nČe AI vidi samo bele mačke, morda ne prepozna črne mačke. Potrebuje RAZNOLIKE primere.\n\n### 2. Čudni primeri\n\nČe nekdo pokaže AI sliko torte v obliki mačke, se lahko zmede -- ali je to mačka ali torta?\n\n### 3. Nove situacije\n\nAI se težko znajde v situacijah, ki jih še ni videla. Ti se lahko hitro prilagodiš, AI pa ne vedno.\n\n---\n\n## Smešne napake AI\n\n- AI je enkrat mislila, da je **kip** pravi človek.\n- Prevajalnik je besedo "pasjanca" prevedel kot "bolezen psa".\n- AI za prepoznavanje hrane je mislila, da je **čivava** pravzaprav muffin (res sta si podobna!).\n\n---\n\n## Kaj se naučimo iz napak?\n\nTako kot ti, se tudi AI uči iz napak:\n\n1. AI naredi napako.\n2. Ljudje jo popravijo.\n3. AI dobi nove primere.\n4. Naslednjič je boljša!\n\n---\n\n## Zakaj je to pomembno?\n\nKer ne smemo slepo zaupati AI! Vedno preveri:\n\n- Ali je odgovor smiseln?\n- Ali imam dovolj informacij?\n- Bi moral vprašati odraslega?\n\nKritično razmišljanje je tvoja super moč, ki je AI nima!',
    updated_at = NOW()
WHERE title = 'Ko se AI zmoti'
  AND course_id = (SELECT id FROM courses WHERE slug = 'ai-basics-for-kids');

-- Module 4, Lesson 0: Pogovor z AI
UPDATE course_lessons
SET content = E'# Pogovor z AI\n\nZdaj ko veš, kaj je AI in kako se uči, je čas, da se pogovarjaš z njo!\n\n---\n\n## Kaj je klepetalni robot?\n\nKlepetalni robot (ali chatbot) je AI program, s katerim se lahko pogovarjaš. Pišeš mu sporočila in ti odgovori!\n\n---\n\n## Kako pisati dobre ukaze (prompte)?\n\nUkaz ali **prompt** je to, kar napišeš AI. Boljši kot je ukaz, boljši bo odgovor!\n\n### Slabi ukazi:\n\n- "Povej mi nekaj." (preveč splošno!)\n- "asdjkfh" (AI ne razume nesmiselnega besedila)\n\n### Dobri ukazi:\n\n- "Razloži mi, kako deluje mavrica, kot da sem star 8 let."\n- "Napiši kratko zgodbo o psu, ki leti v vesolje."\n- "Kakšni dinozavri so živeli na območju današnje Slovenije?"\n\n---\n\n## Pravila za pogovor z AI\n\n1. **Bodi jasen** -- povej natančno, kaj želiš.\n2. **Bodi prijazen** -- čeprav AI nima čustev, je dobra navada.\n3. **Preveri odgovore** -- AI se lahko zmoti.\n4. **Ne deli osebnih podatkov** -- nikoli ne povej AI svojega pravega imena, naslova ali šole.\n5. **Vprašaj starše** -- če nisi prepričan, vprašaj odraslega.\n\n---\n\n## Poskusi!\n\nNa naši platformi imaš AI prijatelja, s katerim se lahko pogovarjaš. Poskusi mu zastaviti zanimivo vprašanje!',
    updated_at = NOW()
WHERE title = 'Pogovor z AI'
  AND course_id = (SELECT id FROM courses WHERE slug = 'ai-basics-for-kids');

-- Module 4, Lesson 1: Ustvarjanje zgodb z AI
UPDATE course_lessons
SET content = E'# Ustvarjanje zgodb z AI\n\nEna najzabavnejših stvari, ki jih lahko narediš z AI, je ustvarjanje zgodb! AI ti lahko pomaga napisati zgodbe, ki si jih sam ne bi izmislil.\n\n---\n\n## Kako AI piše zgodbe?\n\nAI je prebrala MILIJONE zgodb in se naučila:\n\n- Kako se zgodbe začnejo.\n- Kakšni liki nastopajo.\n- Kako se zgodbe končajo.\n- Kakšen jezik uporabljajo.\n\n---\n\n## Ustvari svojo zgodbo!\n\nPoskusi ta recept za zgodbo:\n\n### Korak 1: Izberi lika\n\nKdo je v tvoji zgodbi? Robot? Princeska? Govoreča mačka?\n\n### Korak 2: Izberi kraj\n\nKje se zgodba dogaja? V vesolju? Pod morjem? V čarobnem gozdu?\n\n### Korak 3: Izberi problem\n\nKaj se zgodi? Se lik izgubi? Mora rešiti uganko? Najde skrivnostno karto?\n\n### Korak 4: Vprašaj AI\n\nZdaj vse skupaj povej AI:\n\n> "Napiši zgodbo o govoreči mački v vesolju, ki mora najti pot domov."\n\n---\n\n## Ti si avtor!\n\nAI ti pomaga, ampak TI si pravi avtor. Ti izbereš ideje, AI jih samo zapiše. Lahko spremeniš karkoli -- dodaš nove dele, odstraniš, kar ti ni všeč, ali nadaljuješ zgodbo po svoje.\n\n---\n\n## Pomembno\n\nZgodba, ki jo ustvariš z AI, je TVOJA zgodba. Ti si jo zamislil, AI je bila samo tvoj pomočnik pri pisanju.',
    updated_at = NOW()
WHERE title = 'Ustvarjanje zgodb z AI'
  AND course_id = (SELECT id FROM courses WHERE slug = 'ai-basics-for-kids');

-- Module 4, Lesson 2: Kaj sem se naučil o AI
UPDATE course_lessons
SET content = E'# Kaj sem se naučil o AI\n\nČestitke! Prišel si do zadnje lekcije tečaja "AI osnove za otroke"! Poglejmo, kaj vse si se naučil.\n\n---\n\n## Povzetek tvojega znanja\n\n### Modul 1: Kaj je AI?\n\n- AI je računalniški program, ki se uči iz podatkov.\n- Računalniki razmišljajo drugače kot ljudje.\n- AI ima zanimivo zgodovino, ki se je začela leta 1950.\n\n### Modul 2: AI okrog nas\n\n- AI je v telefonih, igrah in doma.\n- Pomaga nam vsak dan na načine, ki jih niti ne opazimo.\n- Vse tehnologije niso AI -- nekatere naprave so preproste.\n\n### Modul 3: Kako se AI uči\n\n- AI se uči iz primerov, tako kot ti.\n- Išče vzorce v podatkih.\n- Včasih se zmoti -- in to je v redu!\n\n### Modul 4: Ustvarjajmo z AI\n\n- Naučil si se pisati dobre ukaze (prompte).\n- Ustvarjal si zgodbe skupaj z AI.\n- Spoznal si, da si TI avtor, AI pa le pomočnik.\n\n---\n\n## Tvoj AI diplom\n\nZdaj uradno veš več o AI kot večina odraslih! Lahko se ponosno imenuješ **AI raziskovalec**.\n\n---\n\n## Kaj naprej?\n\nČe te AI zanima še bolj, poskusi naše druge tečaje:\n\n- **Programiranje z AI** -- nauči se kodirati s pomočjo AI.\n- **AI umetniški studio** -- ustvarjaj umetnost z AI.\n- **AI varnost in etika** -- nauči se odgovorne uporabe AI.\n\nHvala, da si se učil z nami! Tvoja AI pustolovščina se šele začenja!',
    updated_at = NOW()
WHERE title = 'Kaj sem se naučil o AI'
  AND course_id = (SELECT id FROM courses WHERE slug = 'ai-basics-for-kids');
