-- Comprehensive Slovenian grammar fix for ALL courses
-- Fixes: diacritics, declensions, incorrect words, punctuation

----------------------------------------------------------------------
-- COURSE 1: ai-basics-for-kids (AI osnove za otroke)
----------------------------------------------------------------------

-- Module 1, Lesson 0: Kaj sploh je umetna inteligenca?
-- Content and key_concepts with predefined explanations
UPDATE course_lessons
SET content = E'# Kaj sploh je umetna inteligenca?\n\nPredstavljaj si, da imaš pametnega pomočnika, ki se lahko uči novih stvari -- tako kot ti!\n\nUmetna inteligenca (ali krajše **AI**) je posebna vrsta računalniškega programa, ki se lahko uči iz podatkov in sprejema odločitve.\n\n---\n\n## Kako si lahko predstavljaš AI?\n\nPomisli na svojega hišnega ljubljenčka. Ko ga naučiš novega trika:\n\n- Pokažeš mu, kaj naj naredi (to so **podatki**).\n- Ponavljaš vajo (to je **učenje**).\n- Ko se nauči, to naredi sam (to je **inteligenca**).\n\nAI deluje zelo podobno! Računalnik dobi veliko primerov, se iz njih uči in potem lahko sam rešuje podobne naloge.\n\n---\n\n## Primeri AI v tvojem življenju\n\nAli si vedel/a, da AI že uporabljamo vsak dan?\n\n- **Glasovni pomočniki** (kot Siri ali Google Assistant) -- razumejo tvoj glas.\n- **Priporočila na YouTubu** -- AI ugane, kateri video ti bo všeč.\n- **Filtri na fotografijah** -- AI prepozna tvoj obraz in doda smešne učinke.\n\n---\n\n## Pomembno si zapomni\n\nAI ni živa. Ne razmišlja kot človek. Je zelo pameten program, ki sledi navodilom in se uči iz primerov.',
    key_concepts = '[{"name":"umetna inteligenca","explanation":"Spremljaj me!\nUmetna inteligenca je velika in zanimiva iznajdba, s katero ustvarjamo računalnike in druge naprave, da lahko pomagajo ljudem.\nTo je podobno kot gradnja igrišča -- tam se lahko igramo in zabavamo. Pri umetni inteligenci pa \"gradimo\" pametne računalnike, ki nam pomagajo pri različnih nalogah.\nRačunalnike lahko naučimo, da:\n- nam pomagajo računati,\n- poiščejo informacije,\n- odkrivajo nova znanja,\n- ali rešujejo zahtevne probleme.\nUmetna inteligenca torej pomaga ljudem, da hitreje in lažje opravimo svoje delo."},{"name":"podatki","explanation":"Podatki so kot majhni koščki informacij, ki jih shranjujemo -- podobno kot zaklad v svoji skrinji odkritij.\nNa primer: pametna ura ali športna zapestnica lahko meri, kako pogosto tečeš in kako hitro tečeš. To so podatki o tvojem gibanju.\nČe te hitrosti zapišemo in jih primerjamo, lahko ugotovimo, ali napreduješ ali tečeš hitreje kot prej. S temi podatki lahko ustvarimo nove izzive ali izboljšamo svoj trening.\nUmetna inteligenca uporablja podatke, da se iz njih uči in nam pomaga na različne načine -- na primer pri športu, učenju ali vsakdanjih opravilih."},{"name":"učenje","explanation":"Kaj je učenje?\nUčenje ni le pomnjenje ali branje iz knjig. Učenje pomeni, da postopoma razumemo svet okoli sebe in postajamo v nečem boljši.\nPredstavljaj si, da se učiš igrati rokomet. Na začetku ti morda ne gre najbolje. Z vajo pa postajaš vedno bolj spreten/a -- bolje podajaš žogo, natančneje mečeš in bolje sodeluješ s soigralci.\nZ učenjem ne pridobiš le novih spretnosti, ampak tudi samozavest. Igro lahko deliš s prijatelji in skupaj doživljate veselje ob uspehu.\nPodobno se uči tudi umetna inteligenca -- z veliko primeri in vajo postopoma postaja boljša pri svojem delu."},{"name":"inteligenca","explanation":"\"Inteligenca\" je zanimiv pojem!\nPomeni sposobnost razmišljanja, razumevanja in reševanja problemov. Ljudje uporabljamo inteligenco, ko se učimo novih stvari, iščemo rešitve ali sprejemamo odločitve.\nPri umetni inteligenci to pomeni, da računalniki izvajajo naloge, ki običajno zahtevajo človeško razmišljanje -- na primer prepoznavajo slike, razumejo govor ali predlagajo rešitve.\nČe želiš izvedeti več, lekcijo preberi še enkrat in razmisli o primerih iz svojega vsakdana."}]'::jsonb,
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
SET content = E'# Zgodba umetne inteligence\n\nAI ni nova stvar! Ljudje sanjajo o pametnih strojih že zelo dolgo. Pojdimo na potovanje skozi čas!\n\n---\n\n## Časovnica AI\n\n### 1950 -- Začetek\n\nZnanstvenik **Alan Turing** je vprašal: "Ali lahko stroji razmišljajo?" Napisal je pravila za testiranje, ali je stroj pameten -- to imenujemo **Turingov test**.\n\n### 1966 -- Prvi klepetalni robot\n\nNaredili so program z imenom **ELIZA**, ki se je lahko pogovarjal z ljudmi. Ni bil zelo pameten, ampak je bil zabaven!\n\n### 1997 -- Šahovski prvak\n\nRačunalnik **Deep Blue** je premagal svetovnega šahovskega prvaka. Prvič je stroj premagal najboljšega človeškega igralca!\n\n### 2011 -- Glasovni pomočniki\n\nApple je predstavil **Siri** -- pomočnika, ki razume tvoj glas.\n\n### 2023 -- ChatGPT in naprej\n\nAI je postala tako pametna, da lahko piše zgodbe, ustvarja slike in se pogovarja skoraj kot človek!\n\n---\n\n## Kaj pa prihodnost?\n\nNihče ne ve natanko, kaj bo AI zmogla v prihodnosti. Morda bo pomagala zdraviti bolezni, čistiti oceane ali nas odpeljala na Mars!\n\n---\n\n## Tvoja vloga\n\nVi, otroci, ste tisti, ki boste oblikovali prihodnost AI. Zato je tako pomembno, da se o njej učite že zdaj!',
    updated_at = NOW()
WHERE title = 'Zgodba umetne inteligence'
  AND course_id = (SELECT id FROM courses WHERE slug = 'ai-basics-for-kids');

-- Module 2, Lesson 0: AI v tvojem telefonu
UPDATE course_lessons
SET content = E'# AI v tvojem telefonu\n\nTvoj telefon (ali telefon tvojih staršev) je poln umetne inteligence! Poglejmo, kje vse se skriva.\n\n---\n\n## Kamera in fotografije\n\nKo narediš fotografijo, AI pomaga na več načinov:\n\n- **Prepoznavanje obrazov** -- telefon ve, kdo je na sliki.\n- **Nočni način** -- AI naredi temne slike svetlejše.\n- **Portretni način** -- AI zamegli ozadje.\n\n---\n\n## Tipkovnica\n\nKo pišeš sporočilo, AI predlaga naslednje besede! Poskusi -- začni pisati in poglej, kaj ti telefon predlaga.\n\n---\n\n## Zemljevidi\n\nKo telefon tvojih staršev pokaže pot do šole:\n\n- AI analizira promet v realnem času.\n- Predlaga najhitrejšo pot.\n- Napove, koliko časa bo trajala pot.\n\n---\n\n## Glasovni pomočnik\n\n"Hej Siri" ali "OK Google" -- to je AI, ki:\n\n1. **Posluša** tvoj glas.\n2. **Pretvori** zvok v besedilo.\n3. **Razume**, kaj si vprašal/a.\n4. **Najde** odgovor.\n5. **Odgovori** v razumljivem jeziku.\n\n---\n\n## Razmisli\n\nKoliko stvari na telefonu uporablja AI? Verjetno veliko več, kot si mislil/a!',
    updated_at = NOW()
WHERE title = 'AI v tvojem telefonu'
  AND course_id = (SELECT id FROM courses WHERE slug = 'ai-basics-for-kids');

-- Module 2, Lesson 1: AI v igrah in zabavi
UPDATE course_lessons
SET content = E'# AI v igrah in zabavi\n\nAli si vedel/a, da so videoigre eden najboljših primerov AI? Poglejmo, kako AI naredi igre bolj zabavne!\n\n---\n\n## AI nasprotniki\n\nKo igraš igro proti računalniku, igraš proti AI! Na primer:\n\n- V **šahu** AI razmišlja o najboljši potezi.\n- V **dirkalni igri** se AI avtomobili vozijo po progi.\n- V **Minecraftu** se pošasti premikajo in te iščejo.\n\n---\n\n## Kako AI v igri deluje?\n\nAI v igrah uporablja preprosta pravila:\n\n1. **Če** vidi igralca, **potem** ga napade.\n2. **Če** je igralec daleč, **potem** patrulira.\n3. **Če** ima malo življenja, **potem** se skrije.\n\nTo so kot navodila za igro!\n\n---\n\n## Priporočila\n\nKo gledaš YouTube ali Netflix:\n\n- AI si zapomni, kaj ti je všeč.\n- Primerja tvoj okus z drugimi otroki.\n- Predlaga videe, ki ti bodo verjetno všeč.\n\n---\n\n## Filtri na družbenih omrežjih\n\nTisti smešni filtri, ki ti dodajo mačja ušesa ali smešna očala? To je AI, ki:\n\n- Najde tvoj obraz na sliki.\n- Prepozna, kje so tvoje oči, nos in usta.\n- Doda filter na pravo mesto.\n\n---\n\n## Pomembno\n\nČeprav je AI v igrah zabavna, se spomni -- to je samo program, ne pravi nasprotnik!',
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
SET content = E'# Učenje iz primerov\n\nKako se AI nauči prepoznati mačko na sliki? Tako kot se ti učiš -- iz primerov!\n\n---\n\n## Tvoje učenje proti učenju AI\n\nKo si bil/a majhen/a, so ti starši pokazali mačko in rekli "mačka". Potem ko si videl/a VELIKO mačk, si se naučil/a, kaj je mačka -- velike, majhne, progaste, črne ...\n\nAI se uči **enako**:\n\n1. Pokažemo ji tisoče slik mačk.\n2. Pokažemo ji tisoče slik, ki NISO mačke.\n3. AI najde vzorce -- mačke imajo ušesa, brke, rep ...\n4. Ko vidi novo sliko, preveri, ali ustreza vzorcu.\n\n---\n\n## Kaj so podatki?\n\nPodatki so hrana za AI. Več kot jih ima, bolje se nauči!\n\n- Za prepoznavanje živali potrebuje tisoče slik živali.\n- Za razumevanje govora potrebuje tisoče posnetkov govora.\n- Za igranje iger potrebuje tisoče odigranih iger.\n\n---\n\n## Zabaven eksperiment\n\nPredstavljaj si, da bi te nekdo naučil, kaj je "zumba" (izmišljena stvar). Pokazal bi ti 5 slik zumbe in 5 slik, ki NISO zumba. Ali bi po 10 slikah vedel/a, kaj je zumba?\n\nMorda! AI potrebuje več primerov, ampak načelo je isto.',
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
SET content = E'# Ko se AI zmoti\n\nAI ni popolna -- včasih se zmoti! In to je povsem normalno.\n\n---\n\n## Zakaj se AI zmoti?\n\n### 1. Premalo primerov\n\nČe AI vidi samo bele mačke, morda ne prepozna črne mačke. Potrebuje RAZNOLIKE primere.\n\n### 2. Čudni primeri\n\nČe nekdo pokaže AI sliko torte v obliki mačke, se lahko zmede -- ali je to mačka ali torta?\n\n### 3. Nove situacije\n\nAI se težko znajde v situacijah, ki jih še ni videla. Ti se lahko hitro prilagodiš, AI pa ne vedno.\n\n---\n\n## Smešne napake AI\n\n- AI je enkrat mislila, da je **kip** pravi človek.\n- Prevajalnik je besedo "pasjanca" prevedel kot "bolezen psa".\n- AI za prepoznavanje hrane je mislila, da je **čivava** pravzaprav mafin (res sta si podobna!).\n\n---\n\n## Kaj se naučimo iz napak?\n\nTako kot ti se tudi AI uči iz napak:\n\n1. AI naredi napako.\n2. Ljudje jo popravijo.\n3. AI dobi nove primere.\n4. Naslednjič je boljša!\n\n---\n\n## Zakaj je to pomembno?\n\nKer ne smemo slepo zaupati AI! Vedno preveri:\n\n- Ali je odgovor smiseln?\n- Ali imam dovolj informacij?\n- Bi moral/a vprašati odraslega?\n\nKritično razmišljanje je tvoja supermoč, ki je AI nima!',
    updated_at = NOW()
WHERE title = 'Ko se AI zmoti'
  AND course_id = (SELECT id FROM courses WHERE slug = 'ai-basics-for-kids');

-- Module 4, Lesson 0: Pogovor z AI
UPDATE course_lessons
SET content = E'# Pogovor z AI\n\nZdaj ko veš, kaj je AI in kako se uči, je čas, da se pogovarjaš z njo!\n\n---\n\n## Kaj je klepetalni robot?\n\nKlepetalni robot (angleško chatbot) je AI program, s katerim se lahko pogovarjaš. Pišeš mu sporočila in ti odgovori!\n\n---\n\n## Kako pisati dobre ukaze (prompte)?\n\nUkaz ali **prompt** je to, kar napišeš AI. Boljši kot je ukaz, boljši bo odgovor!\n\n### Slabi ukazi:\n\n- "Povej mi nekaj." (preveč splošno!)\n- "asdjkfh" (AI ne razume nesmiselnega besedila)\n\n### Dobri ukazi:\n\n- "Razloži mi, kako deluje mavrica, kot da sem star/a 8 let."\n- "Napiši kratko zgodbo o psu, ki leti v vesolje."\n- "Kakšni dinozavri so živeli na območju današnje Slovenije?"\n\n---\n\n## Pravila za pogovor z AI\n\n1. **Bodi jasen/jasna** -- natančno povej, kaj želiš.\n2. **Bodi prijazen/prijazna** -- čeprav AI nima čustev, je dobra navada.\n3. **Preveri odgovore** -- AI se lahko zmoti.\n4. **Ne deli osebnih podatkov** -- nikoli ne povej AI svojega pravega imena, naslova ali šole.\n5. **Vprašaj starše** -- če nisi prepričan/a, vprašaj odraslega.\n\n---\n\n## Poskusi!\n\nNa naši platformi imaš AI prijatelja, s katerim se lahko pogovarjaš. Poskusi mu zastaviti zanimivo vprašanje!',
    updated_at = NOW()
WHERE title = 'Pogovor z AI'
  AND course_id = (SELECT id FROM courses WHERE slug = 'ai-basics-for-kids');

-- Module 4, Lesson 1: Ustvarjanje zgodb z AI
UPDATE course_lessons
SET content = E'# Ustvarjanje zgodb z AI\n\nEna najzabavnejših stvari, ki jih lahko narediš z AI, je ustvarjanje zgodb! AI ti lahko pomaga napisati zgodbe, ki si jih sam/a ne bi izmislil/a.\n\n---\n\n## Kako AI piše zgodbe?\n\nAI je prebrala MILIJONE zgodb in se naučila:\n\n- Kako se zgodbe začnejo.\n- Kakšni liki nastopajo.\n- Kako se zgodbe končajo.\n- Kakšen jezik uporabljajo.\n\n---\n\n## Ustvari svojo zgodbo!\n\nPoskusi ta recept za zgodbo:\n\n### Korak 1: Izberi lika\n\nKdo je v tvoji zgodbi? Robot? Princeska? Govoreča mačka?\n\n### Korak 2: Izberi kraj\n\nKje se zgodba dogaja? V vesolju? Pod morjem? V čarobnem gozdu?\n\n### Korak 3: Izberi problem\n\nKaj se zgodi? Se lik izgubi? Mora rešiti uganko? Najde skrivnostno karto?\n\n### Korak 4: Vprašaj AI\n\nZdaj vse skupaj povej AI:\n\n> "Napiši zgodbo o govoreči mački v vesolju, ki mora najti pot domov."\n\n---\n\n## Ti si avtor/ica!\n\nAI ti pomaga, ampak TI si pravi/a avtor/ica. Ti izbereš ideje, AI jih samo zapiše. Lahko spremeniš karkoli -- dodaš nove dele, odstraniš, kar ti ni všeč, ali nadaljuješ zgodbo po svoje.\n\n---\n\n## Pomembno\n\nZgodba, ki jo ustvariš z AI, je TVOJA zgodba. Ti si jo zamislil/a, AI je bila samo tvoj pomočnik pri pisanju.',
    updated_at = NOW()
WHERE title = 'Ustvarjanje zgodb z AI'
  AND course_id = (SELECT id FROM courses WHERE slug = 'ai-basics-for-kids');

-- Module 4, Lesson 2: Kaj sem se naučil o AI
UPDATE course_lessons
SET content = E'# Kaj sem se naučil/a o AI\n\nČestitke! Prišel/a si do zadnje lekcije tečaja "AI osnove za otroke"! Poglejmo, kaj vse si se naučil/a.\n\n---\n\n## Povzetek tvojega znanja\n\n### Modul 1: Kaj je AI?\n\n- AI je računalniški program, ki se uči iz podatkov.\n- Računalniki razmišljajo drugače kot ljudje.\n- AI ima zanimivo zgodovino, ki se je začela leta 1950.\n\n### Modul 2: AI okrog nas\n\n- AI je v telefonih, igrah in doma.\n- Pomaga nam vsak dan na načine, ki jih niti ne opazimo.\n- Vse tehnologije niso AI -- nekatere naprave so preproste.\n\n### Modul 3: Kako se AI uči\n\n- AI se uči iz primerov, tako kot ti.\n- Išče vzorce v podatkih.\n- Včasih se zmoti -- in to je v redu!\n\n### Modul 4: Ustvarjajmo z AI\n\n- Naučil/a si se pisati dobre ukaze (prompte).\n- Ustvarjal/a si zgodbe skupaj z AI.\n- Spoznal/a si, da si TI avtor/ica, AI pa le pomočnik.\n\n---\n\n## Tvoja AI diploma\n\nZdaj uradno veš več o AI kot večina odraslih! Lahko se ponosno imenuješ **AI raziskovalec/ka**.\n\n---\n\n## Kaj naprej?\n\nČe te AI zanima še bolj, poskusi naše druge tečaje:\n\n- **Programiranje z AI** -- nauči se kodirati s pomočjo AI.\n- **AI umetniški studio** -- ustvarjaj umetnost z AI.\n- **AI varnost in etika** -- nauči se odgovorne uporabe AI.\n\nHvala, da si se učil/a z nami! Tvoja AI pustolovščina se šele začenja!',
    updated_at = NOW()
WHERE title = 'Kaj sem se naučil o AI'
  AND course_id = (SELECT id FROM courses WHERE slug = 'ai-basics-for-kids');

----------------------------------------------------------------------
-- COURSE 2: coding-with-ai (Programiranje z AI)
----------------------------------------------------------------------

-- Module 1, Lesson 0
UPDATE course_lessons
SET content = E'# Kaj je programiranje?\n\nProgramiranje je kot pisanje recepta za računalnik. Poveš mu natančno, kaj naj naredi, korak za korakom!\n\n## Računalnik je kot kuhar\nPredstavljaj si, da je računalnik kuhar, ti pa mu daješ recept:\n1. Vzemi 2 jajci.\n2. Razbij ju v skledo.\n3. Dodaj moko.\n4. Mešaj 2 minuti.\n5. Daj v pečico.\n\nRačunalnik sledi navodilom **natančno** tako, kot si napisal/a.\n\n## Kaj je koda?\nKoda je jezik, ki ga razume računalnik. Obstaja veliko programskih jezikov:\n- **Scratch** -- vizualni jezik s kockami (odličen za začetnike!)\n- **Python** -- preprost tekstovni jezik\n- **JavaScript** -- jezik za spletne strani\n\n## Zakaj se učiti programiranja?\n- Lahko narediš svojo igro.\n- Lahko narediš svojo spletno stran.\n- Naučiš se logično razmišljati.\n- Razumeš, kako deluje tehnologija okrog tebe.',
    updated_at = NOW()
WHERE title = 'Kaj je programiranje?'
  AND course_id = (SELECT id FROM courses WHERE slug = 'coding-with-ai');

-- Module 1, Lesson 1
UPDATE course_lessons
SET content = E'# Koraki in zaporedja\n\nNajpomembnejša stvar v programiranju: **vrstni red je pomemben!**\n\n## Zaporedje ukazov\nRačunalnik izvaja ukaze enega za drugim, od zgoraj navzdol.\n\nPredstavljaj si, da se oblačiš zjutraj:\n1. Obleci spodnje perilo.\n2. Obleci hlače.\n3. Obleci majico.\n4. Obuj copate.\n\nČe zamenjamo vrstni red, bo rezultat čuden!\n\n## Poskusi sam/a\nNapiši 5 korakov za pripravo kosila. Bodi natančen/na -- računalnik ne zna ugibati!\n\n## Algoritem\nKo napišeš zaporedje korakov za rešitev problema, se to imenuje **algoritem**. Vsak recept je algoritem!',
    updated_at = NOW()
WHERE title = 'Koraki in zaporedja'
  AND course_id = (SELECT id FROM courses WHERE slug = 'coding-with-ai');

-- Module 1, Lesson 2
UPDATE course_lessons
SET content = E'# Spoznaj Scratch\n\nScratch je programski jezik, ki ga je naredil MIT posebej za otroke. Namesto pisanja kode uporabljamo barvne kocke, ki jih zlagamo skupaj!\n\n## Kako deluje Scratch?\n- Odpri scratch.mit.edu.\n- Na levi so barvne kocke (ukazi).\n- Na sredini jih zlagaš skupaj.\n- Na desni vidiš rezultat.\n\n## Tvoj prvi program\nPoskusi narediti ta program:\n1. Izberi kocko "ko klikneš zeleno zastavo".\n2. Dodaj kocko "premakni se 10 korakov".\n3. Dodaj kocko "obrni se 90 stopinj".\n4. Klikni zeleno zastavo!\n\n## Kategorije kock\n- **Gibanje** (modre) -- premikanje likov.\n- **Videz** (vijolične) -- spreminjanje izgleda.\n- **Zvok** (rožnate) -- predvajanje zvokov.\n- **Dogodki** (rumene) -- kdaj naj se kaj zgodi.\n- **Nadzor** (oranžne) -- ponavljanje in čakanje.',
    updated_at = NOW()
WHERE title = 'Spoznaj Scratch'
  AND course_id = (SELECT id FROM courses WHERE slug = 'coding-with-ai');

-- Module 1, Lesson 3
UPDATE course_lessons
SET content = E'# Spremenljivke -- škatle za podatke\n\nSpremenljivka je kot škatla, v katero shraniš neko vrednost. Škatla ima ime, znotraj pa je lahko karkoli!\n\n## Primer\nPredstavljaj si, da imaš tri škatle:\n- Škatla "ime" vsebuje: Ana\n- Škatla "starost" vsebuje: 10\n- Škatla "najljubša barva" vsebuje: modra\n\n## V Scratchu\n1. Pojdi na "Spremenljivke".\n2. Klikni "Ustvari spremenljivko".\n3. Poimenuj jo "točke".\n4. Zdaj lahko spremeniš vrednost z blokom "nastavi točke na 0".\n\n## Zakaj so spremenljivke uporabne?\n- Shranjevanje rezultata v igri.\n- Štetje korakov.\n- Pomnjenje uporabnikovega imena.\n- Beleženje časa.',
    updated_at = NOW()
WHERE title = 'Spremenljivke - skatle za podatke'
  AND course_id = (SELECT id FROM courses WHERE slug = 'coding-with-ai');

-- Module 1, Lesson 4
UPDATE course_lessons
SET content = E'# Pogoji -- odločitve v kodi\n\nProgrami morajo sprejemati odločitve. Za to uporabljamo pogoje -- ČE se nekaj zgodi, POTEM naredi to!\n\n## Pogoji v vsakdanjem življenju\n- ČE dežuje, POTEM vzemi dežnik.\n- ČE je ura 8, POTEM pojdi v šolo.\n- ČE si lačen/a, POTEM pojej malico.\n\n## V Scratchu\nUporabimo blok "če ... potem":\n```\nče <dotikam se roba?> potem\n  obrni se\nkonec\n```\n\n## Primerjave\n- Je večje kot? (>)\n- Je manjše kot? (<)\n- Je enako? (=)\n\n## Poskusi\nNaredi program, kjer se mačka premika. Če se dotakne roba, naj se obrne!',
    updated_at = NOW()
WHERE title = 'Pogoji - odlocitve v kodi'
  AND course_id = (SELECT id FROM courses WHERE slug = 'coding-with-ai');

-- Module 2, Lesson 0
UPDATE course_lessons
SET content = E'# AI kot programerski pomočnik\n\nAI ne more samo pomagati z domačo nalogo -- lahko ti pomaga tudi pri programiranju! AI pomočniki so kot izkušen programer, ki sedi zraven tebe.\n\n## Kaj lahko AI pomočnik naredi?\n- **Razloži kodo** -- ne razumeš, kaj koda naredi? Vprašaj AI!\n- **Popravi napake** -- AI najde težave v tvoji kodi.\n- **Predlaga izboljšave** -- AI predlaga boljše načine.\n- **Napiše kodo** -- povej mu, kaj želiš, in napisal bo kodo zate.\n\n## Pomembno pravilo\nAI je pomočnik, ne pa nadomestilo za učenje! Vedno poskusi najprej sam/a, potem pa vprašaj AI za pomoč.\n\n## Primer pogovora z AI\nTi: "Kako naredim, da se lik v Scratchu premika s puščicami?"\nAI: "Uporabi blok \'ko pritisneš tipko puščica desno\' in dodaj \'premakni se 10 korakov\' ..."',
    updated_at = NOW()
WHERE title = 'AI kot programerski pomočnik'
  AND course_id = (SELECT id FROM courses WHERE slug = 'coding-with-ai');

-- Module 2, Lesson 1
UPDATE course_lessons
SET content = E'# Zanke -- ponavljanje\n\nZanke so način, da računalniku poveš: "ponovi to večkrat!"\n\n## Zakaj zanke?\nBrez zank bi morali napisati vsak korak posebej:\n- Premakni se.\n- Premakni se.\n- Premakni se.\n- ... (100-krat)\n\nZ zanko: "Ponovi 100-krat: premakni se."\n\n## Vrste zank v Scratchu\n1. **Ponovi N-krat** -- natančno določi, kolikokrat.\n2. **Za vedno** -- ponavljaj brez konca.\n3. **Ponavljaj, dokler ne** -- ponavljaj, dokler ni pogoj izpolnjen.\n\n## Praktični primer\nNaredi program, kjer mačka hodi v krogu:\n```\nponovi 36-krat\n  premakni se 10 korakov\n  obrni se 10 stopinj\nkonec\n```\nTo nariše krog!',
    updated_at = NOW()
WHERE title = 'Zanke - ponavljanje'
  AND course_id = (SELECT id FROM courses WHERE slug = 'coding-with-ai');

-- Module 2, Lesson 2
UPDATE course_lessons
SET content = E'# Dogodki in interakcija\n\nDogodki so stvari, ki se zgodijo -- klik miške, pritisk tipke ali začetek programa. Program se odziva na te dogodke!\n\n## Vrste dogodkov\n- **Ko klikneš zeleno zastavo** -- začetek programa.\n- **Ko pritisneš tipko** -- uporabnikov vnos.\n- **Ko klikneš ta lik** -- interakcija z likom.\n- **Ko sprejmem sporočilo** -- komunikacija med liki.\n\n## Naredi interaktivno zgodbo\n1. Dodaj dva lika (mačko in psa).\n2. Ko klikneš mačko, naj reče "Mijav!"\n3. Ko klikneš psa, naj reče "Hov!"\n4. Ko pritisneš preslednico, naj oba skočita.\n\n## Sporočila\nLiki si lahko pošiljajo sporočila:\n- Mačka pošlje sporočilo "pozdravi".\n- Pes sprejme sporočilo in odgovori.',
    updated_at = NOW()
WHERE title = 'Dogodki in interakcija'
  AND course_id = (SELECT id FROM courses WHERE slug = 'coding-with-ai');

-- Module 2, Lesson 3
UPDATE course_lessons
SET content = E'# Pisanje navodil za AI\n\nČe želiš, da ti AI dobro pomaga pri programiranju, mu moraš dati dobra navodila. To se imenuje **prompt engineering**!\n\n## Slaba navodila in dobra navodila\n\n**Slabo:** "Naredi igro."\n**Dobro:** "Naredi igro v Scratchu, kjer mačka lovi miško. Mačka se premika s puščicami, miška se premika naključno. Ko mačka ujame miško, dobi točko."\n\n## 5 pravil za dobra navodila\n1. **Bodi natančen/na** -- povej točno, kaj želiš.\n2. **Razloži kontekst** -- povej, kaj že imaš.\n3. **Razdeli na korake** -- vprašaj za eno stvar naenkrat.\n4. **Daj primere** -- pokaži, kaj pričakuješ.\n5. **Vprašaj za razlago** -- reci "razloži mi, zakaj".\n\n## Vaja\nNapiši tri različne načine, kako bi AI prosil/a za pomoč pri izdelavi kviza v Scratchu.',
    updated_at = NOW()
WHERE title = 'Pisanje navodil za AI'
  AND course_id = (SELECT id FROM courses WHERE slug = 'coding-with-ai');

-- Module 2, Lesson 4
UPDATE course_lessons
SET content = E'# Razhroščevanje s pomočjo AI\n\nRazhroščevanje (angleško debugging) pomeni iskanje in popravljanje napak v kodi. AI je pri tem odličen pomočnik!\n\n## Pogoste napake\n1. **Sintaksne napake** -- napačno napisana koda.\n2. **Logične napake** -- koda deluje, ampak ne tako, kot želiš.\n3. **Neskončne zanke** -- program se nikoli ne ustavi.\n\n## Kako AI pomaga?\nKopiraj svojo kodo in vprašaj AI:\n- "Zakaj moj program ne deluje?"\n- "Kaj je narobe s to kodo?"\n- "Kako popravim to napako?"\n\n## Postopek razhroščevanja\n1. **Preberi napako** -- kaj računalnik pravi, da je narobe?\n2. **Poišči vzrok** -- kje v kodi je težava?\n3. **Vprašaj AI** -- kopiraj kodo in napako.\n4. **Razumi popravek** -- ne samo kopiraj, razumi!\n5. **Testiraj** -- preveri, ali zdaj deluje.\n\n## Vaja\nNamerno naredi napako v Scratch programu in jo poskusi popraviti s pomočjo AI.',
    updated_at = NOW()
WHERE title = 'Razhroščevanje s pomočjo AI'
  AND course_id = (SELECT id FROM courses WHERE slug = 'coding-with-ai');

-- Module 3, Lesson 0
UPDATE course_lessons
SET content = E'# Načrtovanje projekta\n\nPreden začneš programirati, moraš načrtovati! Najboljši programerji vedno najprej razmislijo, potem pa pišejo kodo.\n\n## 4 koraki načrtovanja\n1. **Ideja** -- kaj želiš narediti?\n2. **Načrt** -- kako bo izgledalo? Nariši!\n3. **Koraki** -- kaj moraš narediti po vrsti?\n4. **Testiranje** -- kako veš, da deluje?\n\n## Primer načrtovanja igre\n**Ideja:** Igra, kjer lovimo sadje.\n**Načrt:**\n- Sadje padajo od zgoraj.\n- Košara se premika levo-desno.\n- Točke za vsak ujet sadež.\n- 3 življenja.\n\n**Koraki:**\n1. Nariši košaro in sadje.\n2. Sprogramiraj padanje.\n3. Sprogramiraj lovljenje.\n4. Dodaj točke.\n5. Dodaj življenja.\n\n## Vaja\nNačrtuj svojo igro! Nariši, kako bo izgledala, in napiši korake.',
    updated_at = NOW()
WHERE title = 'Načrtovanje projekta'
  AND course_id = (SELECT id FROM courses WHERE slug = 'coding-with-ai');

-- Module 3, Lesson 1
UPDATE course_lessons
SET content = E'# Naredimo igro -- 1. del\n\nDanes začnemo graditi pravo igro v Scratchu! Naredili bomo igro **Lovi sadje**.\n\n## Korak 1: Priprava\n- Odpri Scratch.\n- Izbriši mačko.\n- Dodaj ozadje (npr. modro nebo).\n\n## Korak 2: Košara\n- Nariši košaro (ali jo najdi v knjižnici).\n- Dodaj kodo za premikanje:\n```\nza vedno\n  če <tipka puščica desno pritisnjena?> potem\n    spremeni x za 10\n  konec\n  če <tipka puščica levo pritisnjena?> potem\n    spremeni x za -10\n  konec\nkonec\n```\n\n## Korak 3: Sadje\n- Nariši jabolko.\n- Dodaj kodo za padanje:\n```\nko klikneš zeleno zastavo\nza vedno\n  pojdi na x: (naključno od -200 do 200) y: 180\n  drsi se v 3 sekundah na x: (x pozicija) y: -180\nkonec\n```\n\n## Domača naloga\nDodaj še eno vrsto sadja (npr. banano)!',
    updated_at = NOW()
WHERE title = 'Naredimo igro - 1. del'
  AND course_id = (SELECT id FROM courses WHERE slug = 'coding-with-ai');

-- Module 3, Lesson 2
UPDATE course_lessons
SET content = E'# Naredimo igro -- 2. del\n\nNadaljujemo z našo igro Lovi sadje! Danes dodamo točke in življenja.\n\n## Korak 4: Točke\n- Ustvari spremenljivko "točke".\n- Ko se sadež dotakne košare:\n```\nče <dotikam se košare?> potem\n  spremeni točke za 1\n  predvajaj zvok pop\n  pojdi na x: (naključno) y: 180\nkonec\n```\n\n## Korak 5: Življenja\n- Ustvari spremenljivko "življenja" (začni s 3).\n- Ko sadež pade na tla:\n```\nče <y pozicija < -170> potem\n  spremeni življenja za -1\n  pojdi na x: (naključno) y: 180\nkonec\n```\n\n## Korak 6: Konec igre\n```\nče <življenja = 0> potem\n  reci "Konec igre! Tvoje točke: " & točke\n  ustavi vse\nkonec\n```\n\n## Izziv\nDodaj težavnostne stopnje -- sadje padajo hitreje, ko zbereš več točk!',
    updated_at = NOW()
WHERE title = 'Naredimo igro - 2. del'
  AND course_id = (SELECT id FROM courses WHERE slug = 'coding-with-ai');

-- Module 3, Lesson 3
UPDATE course_lessons
SET content = E'# Uvod v Python\n\nPython je eden najpopularnejših programskih jezikov na svetu. Je preprost, eleganten in odličen za začetnike!\n\n## Zakaj Python?\n- Najpopularnejši jezik za AI in podatkovno znanost.\n- Preprost za branje in pisanje.\n- Ogromna skupnost in veliko virov za učenje.\n- Uporaben za igre, spletne strani, znanost ...\n\n## Tvoj prvi Python program\n```python\nprint("Pozdravljen, svet!")\n```\n\n## Spremenljivke v Pythonu\n```python\nime = "Ana"\nstarost = 10\nprint("Moje ime je " + ime)\nprint("Star/a sem " + str(starost) + " let")\n```\n\n## Pogoji v Pythonu\n```python\nstarost = 10\nif starost >= 10:\n    print("Lahko greš na vlakec smrti!")\nelse:\n    print("Še eno leto počakaj.")\n```\n\n## Vaja\nNapiši Python program, ki vpraša za tvoje ime in te pozdravi!',
    updated_at = NOW()
WHERE title = 'Uvod v Python'
  AND course_id = (SELECT id FROM courses WHERE slug = 'coding-with-ai');

-- Module 3, Lesson 4
UPDATE course_lessons
SET content = E'# Python in AI -- tvoj prvi AI program\n\nZdaj ko poznaš osnove Pythona, lahko naredimo tvoj prvi AI program!\n\n## Preprost AI klepetalni robot\n```python\nodgovori = {\n    "kako si": "Jaz sem AI, vedno sem super!",\n    "kaj znaš": "Znam odgovarjati na vprašanja!",\n    "koliko je 2+2": "To je 4!",\n    "adijo": "Nasvidenje! Lep dan ti želim!"\n}\n\nprint("Pozdravljeni! Sem preprost klepetalni robot.")\nwhile True:\n    vprasanje = input("Ti: ").lower()\n    if vprasanje == "adijo":\n        print("Bot: Nasvidenje!")\n        break\n    elif vprasanje in odgovori:\n        print("Bot:", odgovori[vprasanje])\n    else:\n        print("Bot: Hmm, tega ne razumem. Poskusi kaj drugega!")\n```\n\n## Kako to deluje?\n1. Imamo **slovar** odgovorov.\n2. Uporabnik vnese vprašanje.\n3. Program poišče odgovor v slovarju.\n4. Če ga ne najde, reče, da ne razume.\n\n## To je osnova klepetalnih robotov!\nPravi klepetalni roboti (kot ChatGPT) delujejo po istem načelu, ampak s tisoči primeri in nevronskimi mrežami.\n\n## Zaključni projekt\nDodaj svojemu klepetalnemu robotu še 10 novih vprašanj in odgovorov na temo, ki te zanima!',
    updated_at = NOW()
WHERE title = 'Python in AI - tvoj prvi AI program'
  AND course_id = (SELECT id FROM courses WHERE slug = 'coding-with-ai');

-- Module 4, Lesson 0
UPDATE course_lessons
SET content = E'# Funkcije -- lastni ukazi\n\nFunkcije so kot tvoji lastni ukazi. Namesto da vsako stvar pišeš znova in znova, jo zapakiraš v funkcijo!\n\n## Primer brez funkcije\n```python\nprint("*****")\nprint("Pozdravljen Ana!")\nprint("*****")\nprint("*****")\nprint("Pozdravljen Mark!")\nprint("*****")\n```\n\n## Primer s funkcijo\n```python\ndef pozdravi(ime):\n    print("*****")\n    print("Pozdravljen " + ime + "!")\n    print("*****")\n\npozdravi("Ana")\npozdravi("Mark")\npozdravi("Luka")\n```\n\nVidiš? Veliko krajše in preglednejše!\n\n## Funkcije vračajo rezultate\n```python\ndef seštej(a, b):\n    return a + b\n\nrezultat = seštej(5, 3)\nprint(rezultat)  # 8\n```\n\n## Vaja\nNapiši funkcijo, ki izračuna povprečje treh števil!',
    updated_at = NOW()
WHERE title = 'Funkcije - lastni ukazi'
  AND course_id = (SELECT id FROM courses WHERE slug = 'coding-with-ai');

-- Module 4, Lesson 1
UPDATE course_lessons
SET content = E'# Seznami in podatki\n\nSeznami (angleško lists) so način za shranjevanje več podatkov skupaj. Kot nakupovalni seznam!\n\n## Ustvarjanje seznama\n```python\nsadja = ["jabolko", "banana", "češnja", "kivi"]\nocene = [5, 4, 5, 3, 5, 4]\n```\n\n## Delo s seznami\n```python\n# Dodaj element\nsadja.append("ananas")\n\n# Dolžina seznama\nprint(len(sadja))  # 5\n\n# Zanka čez seznam\nfor sadje in sadja:\n    print("Rad imam " + sadje)\n```\n\n## AI in podatki\nAI se uči iz podatkov. Več podatkov ima, bolje se nauči!\n\nPredstavljaj si, da učiš AI prepoznavati sadje:\n- 100 slik jabolk.\n- 100 slik banan.\n- 100 slik češenj.\n\nAI pogleda vse slike in se nauči razlik med njimi.\n\n## Vaja\nNaredi seznam svojih 5 najljubših filmov in napiši program, ki naključno izbere film za večerni ogled!',
    updated_at = NOW()
WHERE title = 'Seznami in podatki'
  AND course_id = (SELECT id FROM courses WHERE slug = 'coding-with-ai');

-- Module 4, Lesson 2
UPDATE course_lessons
SET content = E'# Spletne strani z AI\n\nHTML in CSS sta jezika za izdelavo spletnih strani. S pomočjo AI jih lahko narediš zelo hitro!\n\n## HTML -- struktura\nHTML določa, KAJ je na strani:\n```html\n<h1>Moja spletna stran</h1>\n<p>Pozdravljen, svet!</p>\n<img src="slika.jpg">\n<button>Klikni me</button>\n```\n\n## CSS -- izgled\nCSS določa, KAKO izgleda:\n```css\nh1 {\n  color: blue;\n  font-size: 24px;\n}\nbutton {\n  background: green;\n  color: white;\n  padding: 10px;\n}\n```\n\n## AI pomaga pri spletnih straneh\nLahko AI vprašaš:\n- "Naredi mi HTML za predstavitev o dinozavrih."\n- "Dodaj lep CSS oblikovanje z modrimi barvami."\n- "Naredi navigacijski meni."\n\n## Vaja\nS pomočjo AI naredi preprosto spletno stran o svoji najljubši živali!',
    updated_at = NOW()
WHERE title = 'Spletne strani z AI'
  AND course_id = (SELECT id FROM courses WHERE slug = 'coding-with-ai');

-- Module 4, Lesson 3
UPDATE course_lessons
SET content = E'# Igre z AI logiko\n\nNaredi igro, kjer računalniški nasprotnik uporablja preprosto AI logiko!\n\n## Kamen, škarje, papir z AI\n```python\nimport random\n\nmožnosti = ["kamen", "škarje", "papir"]\n\nwhile True:\n    igralec = input("Izberi (kamen/škarje/papir): ").lower()\n    if igralec == "konec":\n        break\n    \n    ai = random.choice(možnosti)\n    print("AI je izbral: " + ai)\n    \n    if igralec == ai:\n        print("Izenačeno!")\n    elif (igralec == "kamen" and ai == "škarje") or \\\n         (igralec == "škarje" and ai == "papir") or \\\n         (igralec == "papir" and ai == "kamen"):\n        print("Zmagal/a si!")\n    else:\n        print("AI je zmagal!")\n```\n\n## Pametnejša AI\nLahko naredimo AI pametnejšo -- naj si zapomni, kaj pogosto izbiraš, in se prilagodi!\n\n## Izziv\nDodaj števec zmag in porazov ter prikaži rezultat na koncu!',
    updated_at = NOW()
WHERE title = 'Igre z AI logiko'
  AND course_id = (SELECT id FROM courses WHERE slug = 'coding-with-ai');

-- Module 4, Lesson 4
UPDATE course_lessons
SET content = E'# Zaključni projekt -- moj AI program\n\nČas je za tvoj zaključni projekt! Uporabi vse, kar si se naučil/a, in naredi nekaj svojega.\n\n## Ideje za projekte\n1. **AI kviz** -- program, ki postavlja vprašanja in preverja odgovore.\n2. **Priporočilni sistem** -- vprašaj uporabnika, kaj ima rad, in mu priporoči film ali knjigo.\n3. **Preprosta igra z AI** -- igra, kjer računalnik igra proti tebi.\n4. **Generator zgodb** -- AI, ki ustvari naključne zgodbe.\n5. **Kalkulator za domačo nalogo** -- pomaga pri matematiki.\n\n## Koraki za projekt\n1. Izberi idejo.\n2. Načrtuj na papirju.\n3. Napiši kodo po korakih.\n4. Testiraj in popravi napake.\n5. Pokaži prijateljem in družini!\n\n## Predstavitev\nPripravi kratko predstavitev:\n- Kaj program dela?\n- Kako si ga naredil/a?\n- Kaj si se naučil/a?\n- Kaj bi izboljšal/a?\n\nČestitke, zdaj si pravi/a mladi/a programer/ka! Nadaljuj z učenjem in ustvarjanjem!',
    updated_at = NOW()
WHERE title = 'Zaključni projekt - moj AI program'
  AND course_id = (SELECT id FROM courses WHERE slug = 'coding-with-ai');

----------------------------------------------------------------------
-- COURSE 3: ai-art-studio (AI umetniški studio)
----------------------------------------------------------------------

-- Module 1, Lesson 0
UPDATE course_lessons
SET content = E'# Kaj je AI umetnost?\n\nUmetnost + tehnologija = nekaj čudovitega! AI umetnost je nova oblika ustvarjanja, kjer ti in računalnik sodelujeta.\n\n## Kako AI ustvarja slike?\nAI je videla MILIJONE slik in se naučila:\n- Kakšne barve gredo skupaj.\n- Kako izgledajo različni slogi (akvarel, olje, risanka).\n- Kaj so predmeti na slikah (drevo, hiša, oseba).\n\nKo ji rečeš "nariši sončen dan na plaži", ona:\n1. Razume besede.\n2. Pomisli na vse plaže, ki jih je videla.\n3. Ustvari NOVO sliko, ki ne obstaja nikjer drugje!\n\n## Ali je to prava umetnost?\nRazmisli:\n- Umetnik izbere temo, barve, slog -- TI izbereš, kaj AI nariše.\n- Umetnik uporabi čopič -- TI uporabiš besede (prompt).\n- Umetnik interpretira svet -- TI interpretiraš rezultat AI.\n\n## Slavni primeri AI umetnosti\n- **DALL-E** -- sistem, ki ustvari slike iz besedila.\n- **Midjourney** -- ustvarja neverjetno realistične slike.\n- **Stable Diffusion** -- brezplačno AI orodje za ustvarjanje.\n\n## Tvoja vloga\nTI si umetnik/ca. AI je tvoj čopič. Brez tvoje ideje AI ne more ustvariti ničesar!',
    updated_at = NOW()
WHERE title = 'Kaj je AI umetnost?'
  AND course_id = (SELECT id FROM courses WHERE slug = 'ai-art-studio');

-- Module 1, Lesson 1
UPDATE course_lessons
SET content = E'# Pisanje promptov za slike\n\nPrompt je opis slike, ki jo želiš ustvariti. Boljši kot je prompt, boljša bo slika!\n\n## Zgradba dobrega prompta\nDober prompt ima 4 dele:\n\n### 1. Predmet (KAJ?)\nKaj je na sliki? "Mačka", "grad", "vesoljska ladja."\n\n### 2. Podrobnosti (KAKŠEN?)\nOpiši predmet: "puhasta oranžna mačka z modrimi očmi."\n\n### 3. Okolje (KJE?)\nKje se nahaja: "na drevesu v čarobnem gozdu ponoči."\n\n### 4. Slog (KAKO?)\nKakšna naj bo slika: "v slogu akvarela, svetle barve."\n\n## Primeri\n**Slab prompt:** "Mačka" -- dobiš osnovno sliko mačke.\n**Dober prompt:** "Puhasta oranžna mačka z modrimi očmi, sedi na drevesu v čarobnem gozdu ponoči, svetleče gobe okrog nje, v slogu risanke Miyazaki, topli toni."\n\n## Čarobne besede za prompte\n- **"podrobno"** -- doda več detajlov.\n- **"svetle barve"** -- vesele slike.\n- **"dramatična osvetlitev"** -- napete slike.\n- **"v slogu [umetnika]"** -- posnemaj slog.',
    updated_at = NOW()
WHERE title = 'Pisanje promptov za slike'
  AND course_id = (SELECT id FROM courses WHERE slug = 'ai-art-studio');

-- Module 1, Lesson 2
UPDATE course_lessons
SET content = E'# Umetnostni slogi skozi zgodovino\n\nDa bi ustvarjal/a boljšo AI umetnost, je dobro poznati različne umetnostne sloge!\n\n## Impresionizem (1870)\nMehke poteze, svetle barve, prizori iz narave.\nUmetniki: Claude Monet, Renoir.\nPrompt: "v slogu impresionizma, mehke poteze čopiča."\n\n## Kubizem (1900)\nGeometrijske oblike, več zornih kotov hkrati.\nUmetniki: Pablo Picasso, Georges Braque.\nPrompt: "v slogu kubizma, geometrijske oblike."\n\n## Pop art (1950)\nŽive barve, ponavljajoči se vzorci, popularna kultura.\nUmetniki: Andy Warhol, Roy Lichtenstein.\nPrompt: "pop art slog, žive barve, pike."\n\n## Digitalna umetnost (danes)\nNeskončne možnosti -- od realističnega do fantazijskega.\nPrompt: "digitalna umetnost, podrobno, svetleče barve."\n\n## Risanka / Anime\nVelike oči, poenostavljene oblike, izrazite barve.\nPrompt: "anime slog" ali "risanka slog."\n\n## Izziv\nIzberi isti predmet in ga ustvari v 5 različnih slogih. Primerjaj rezultate!',
    updated_at = NOW()
WHERE title = 'Umetnostni slogi skozi zgodovino'
  AND course_id = (SELECT id FROM courses WHERE slug = 'ai-art-studio');

-- Module 2, Lesson 0
UPDATE course_lessons
SET content = E'# Moja prva AI slika\n\nČas je, da ustvariš svojo prvo AI sliko!\n\n## Korak za korakom\n\n### 1. Izberi temo\nKaj te navdušuje? Živali? Vesolje? Pravljice?\n\n### 2. Napiši prompt\nUporabi recept:\n- **Predmet**: pav.\n- **Podrobnosti**: z zlatim perjem, razprostrt rep.\n- **Okolje**: v čarobnem vrtu s svetlečimi vrtnicami.\n- **Slog**: fantazijski, podrobno, svetle barve.\n\nCeloten prompt: "Veličasten pav z zlatim perjem in razprostrtim repom, stoji v čarobnem vrtu s svetlečimi vrtnicami, fantazijski slog, podrobno, svetle barve, čarobna atmosfera."\n\n### 3. Ustvari!\nUporabi AI orodje za ustvarjanje slik na naši platformi.\n\n### 4. Oceni in izboljšaj\nPoglej rezultat:\n- Ali je to, kar si si zamislil/a?\n- Kaj bi spremenil/a?\n- Dodaj ali odstrani besede iz prompta.\n\n## Nasveti\n- Daljši prompt = bolj natančna slika.\n- Poskusi različne sloge za isti predmet.\n- Če ti ni všeč, spremeni samo en del.',
    updated_at = NOW()
WHERE title = 'Moja prva AI slika'
  AND course_id = (SELECT id FROM courses WHERE slug = 'ai-art-studio');

-- Module 2, Lesson 1
UPDATE course_lessons
SET content = E'# Zgodbe s slikami\n\nKaj če bi ustvaril/a celotno slikovno zgodbo s pomočjo AI?\n\n## Slikovnica z AI\nSlikovnica je zgodba, ki jo spremljajo slike. Z AI lahko ustvariš oboje!\n\n## Projekt: Moja AI slikovnica\n\n### Korak 1: Napiši zgodbo (5--8 stavkov)\nPrimer:\n1. Mala robotka Bip se je prebudila v svoji delavnici.\n2. Skozi okno je videla, da je padel sneg.\n3. Nikoli še ni videla snega! Šla je ven.\n4. Naredila je svojega prvega snežaka -- snežnega robota!\n5. Od takrat je Bip najljubši letni čas zima.\n\n### Korak 2: Ustvari slike za vsak stavek\nZa vsak stavek napiši prompt z istim opisom lika!\n\n### Korak 3: Sestavi slikovnico\nZdruži besedilo in slike v celoto!\n\n## Nasveti za doslednost\nProblem: AI lahko nariše robota drugače na vsaki sliki!\nRešitev: Uporabi čim bolj podoben opis lika v vsakem promptu:\n"Majhna srebrna robotka z modrimi očmi in rdečo pentljo" -- enako v vsakem promptu!',
    updated_at = NOW()
WHERE title = 'Zgodbe s slikami'
  AND course_id = (SELECT id FROM courses WHERE slug = 'ai-art-studio');

-- Module 2, Lesson 2
UPDATE course_lessons
SET content = E'# Napredne tehnike generiranja\n\nKo obvladaš osnove, je čas za naprednejše trike!\n\n## Tehnika 1: Negativni prompt\nPovej AI, česa NE želiš:\n- "Brez besedila na sliki."\n- "Brez ljudi."\n- "Brez temnih barv."\n\n## Tehnika 2: Mešanje slogov\nKombiniraj dva sloga:\n- "V slogu anime + akvarel" -- edinstvena kombinacija!\n- "Steampunk + narava" -- mehanska narava.\n- "Retro + vesolje" -- starinska vesoljska pustolovščina.\n\n## Tehnika 3: Razpoloženje in atmosfera\nDodaj čustvene opise:\n- **Veselo**: svetlo, barvito, sončno, toplo.\n- **Skrivnostno**: megleno, temno, skrivnostno, luna.\n- **Epsko**: dramatično, veličastno, zlato, mogočno.\n\n## Tehnika 4: Perspektiva\nSpremeni zorni kot:\n- "Od zgoraj" (ptičja perspektiva).\n- "Od spodaj" (žabja perspektiva).\n- "Bližnji posnetek" (detajl).\n- "Širok pogled" (panorama).\n\n## Tehnika 5: Osvetlitev\n- "Zlata ura" -- topla svetloba sončnega zahoda.\n- "Neonske luči" -- futuristična, mestna.\n- "Sveča" -- intimno, toplo.\n- "Severni sij" -- čarobno, barvito.',
    updated_at = NOW()
WHERE title = 'Napredne tehnike generiranja'
  AND course_id = (SELECT id FROM courses WHERE slug = 'ai-art-studio');

-- Module 3, Lesson 0
UPDATE course_lessons
SET content = E'# Kako AI ustvarja glasbo\n\nAI ne ustvarja samo slik -- ustvarja tudi glasbo!\n\n## Glasba je matematika\nTo je skrivnost glasbe -- je polna vzorcev in pravil:\n- **Ritem**: ponavljajoč se vzorec udarcev.\n- **Melodija**: zaporedje not, ki sledijo pravilom.\n- **Harmonija**: kombinacija not, ki zvenijo dobro skupaj.\n\nAI se lahko nauči teh pravil!\n\n## Kako AI ustvari pesem?\n1. AI posluša tisoče pesmi.\n2. Najde vzorce: "po akordu C pogosto pride G."\n3. Ustvari novo melodijo, ki sledi tem vzorcem.\n4. Rezultat je nova pesem, ki nikoli prej ni obstajala!\n\n## AI glasbena orodja\n- **Chrome Music Lab** -- brezplačno, zabavno eksperimentiranje.\n- **AIVA** -- AI skladatelj za klasično glasbo.\n- **Boomy** -- ustvari pesem v sekundah.\n\n## Eksperiment z Music Lab\nObišči musiclab.chromeexperiments.com in poskusi:\n- **Song Maker** -- ustvari melodijo s kliki.\n- **Rhythm** -- eksperimentiraj z ritmi.\n- **Kandinsky** -- pretvori risbo v glasbo!\n\n## Zanimivost\nNekatere AI pesmi so tako dobre, da jih ljudje ne morejo ločiti od pesmi, ki jih je napisal človek!',
    updated_at = NOW()
WHERE title = 'Kako AI ustvarja glasbo'
  AND course_id = (SELECT id FROM courses WHERE slug = 'ai-art-studio');

-- Module 3, Lesson 1
UPDATE course_lessons
SET content = E'# Zvočna pokrajina\n\nZvočna pokrajina je zbirka zvokov, ki ustvarijo atmosfero.\n\n## Kaj je zvočna pokrajina?\n- **Gozd**: ptičje petje, šelestenje listja, potok.\n- **Morje**: valovi, galeb, veter.\n- **Mesto**: avtomobili, ljudje, glasba iz lokalov.\n- **Vesolje**: tišina ... ali fantastični zvoki!\n\n## AI in zvoki\nAI lahko ustvari zvoke, ki ne obstajajo:\n- Kako zveni planet iz drugega osončja?\n- Kako zveni barva modra?\n- Kako zveni vonj po vrtnicah?\n\n## Projekt: Moja zvočna zgodba\nZdruži slike IN zvoke v multimedijsko izkušnjo:\n1. **Ustvari 3 AI slike** za svojo zgodbo.\n2. **Ustvari zvočno pokrajino** za vsako sceno.\n3. **Združi** v predstavitev.\n\n### Primer:\nScena 1: Gozd -- ptičje petje, nežna melodija.\nScena 2: Nevihta -- grmenje, dež, dramatična glasba.\nScena 3: Mavrica -- tihi zvonci, vesela melodija.\n\n## Sinestezija\nSinestezija je pojav, ko en čut sproži drugega:\n- Slišiš barvo.\n- Vidiš glasbo.\n- Okusiš obliko.\n\nAI nam pomaga izkusiti sinestezijo -- pretvori slike v glasbo ali glasbo v slike!',
    updated_at = NOW()
WHERE title = 'Zvočna pokrajina'
  AND course_id = (SELECT id FROM courses WHERE slug = 'ai-art-studio');

-- Module 4, Lesson 0
UPDATE course_lessons
SET content = E'# Zaključna razstava -- moj AI portfolio\n\nČestitke! Si na zadnji lekciji AI umetniškega studia! Čas je za tvojo zaključno razstavo.\n\n## Zaključni projekt: AI razstava\nUstvari mini umetniško razstavo s 5 deli:\n\n### 1. Portret (oseba ali žival)\nUstvari podroben portret v izbranem slogu.\n\n### 2. Pokrajina (narava ali mesto)\nUstvari čudovito pokrajino z naprednimi tehnikami osvetlitve.\n\n### 3. Fantazija (izmišljeni svet)\nPusti domišljiji prosto pot in ustvari svet, ki ne obstaja!\n\n### 4. Zgodba v sliki\nEna sama slika, ki pripoveduje celotno zgodbo.\n\n### 5. Tvoja izbira\nKarkoli želiš -- to je tvoj prosti prostor za ustvarjanje!\n\n## Za vsako delo napiši:\n1. **Naslov** -- ime tvojega dela.\n2. **Prompt** -- kaj si napisal/a AI.\n3. **Razmišljanje** -- zakaj si izbral/a to temo oziroma slog.\n4. **Kaj sem se naučil/a** -- kaj si se naučil/a pri ustvarjanju.\n\n## Umetnik/ca si TI\nSkozi ta tečaj si spoznal/a:\n- AI je orodje, tako kot čopič ali svinčnik.\n- TVOJA ustvarjalnost je tista, ki naredi umetnost posebno.\n- Dober prompt je umetnost sam po sebi.\n- Različni slogi in tehnike dajejo različne rezultate.\n\nHvala, da si bil/a del AI umetniškega studia! Tvoja ustvarjalnost nima meja.',
    updated_at = NOW()
WHERE title = 'Zaključna razstava - moj AI portfolio'
  AND course_id = (SELECT id FROM courses WHERE slug = 'ai-art-studio');

----------------------------------------------------------------------
-- COURSE 4: robotics-and-ai (Robotika in AI) -- key fixes
----------------------------------------------------------------------

-- Fix "inspiriane" -> "navdihnjene", "hkrati" -> "hkrati" (OK, means simultaneously), "toda" -> "vendar"
-- Fix "mozeg" -> "možgani", "natančno" -> "natančno" (OK)

UPDATE course_lessons
SET content = E'# Nevronske mreže\n\nNevronske mreže so navdihnjene z delovanjem človeških **možganov**.\n\n## Kako delujejo možgani?\nMožgani imajo ~86 milijard nevronov (živčnih celic).\n- Vsak nevron sprejme signale od drugih nevronov.\n- Če je signal dovolj močan, pošlje svoj signal naprej.\n- Povezave med nevroni se krepijo z vajo.\n\n## Umetne nevronske mreže\nUmetna nevronska mreža posnema ta princip:\n\n```\nVhod → [Nevron 1] → [Nevron 2] → [Nevron 3] → Izhod\n         ↕              ↕              ↕\n       [Nevron 4] → [Nevron 5] → [Nevron 6]\n```\n\n### Plasti:\n1. **Vhodna plast** -- sprejme podatke (sliko, besedilo ...).\n2. **Skrite plasti** -- obdelajo podatke, iščejo vzorce.\n3. **Izhodna plast** -- da končni odgovor.\n\n## Učenje nevronske mreže\n1. Mreža dobi vhodni podatek.\n2. Izračuna odgovor.\n3. Primerja s pravilnim odgovorom.\n4. Popravi povezave (uteži) -- to je "učenje"!\n5. Ponovi 1000-krat.\n\n## Globoko učenje (Deep Learning)\nKo ima mreža veliko skritih plasti, govorimo o **globokem učenju**. To je tehnologija za:\n- Prepoznavanje obrazov.\n- Samovozeče avtomobile.\n- ChatGPT in podobne modele.\n\n## Aktivnost\nS 3 prijatelji simulirajte nevronsko mrežo: eden je vhod, dva sta skrita plast, eden je izhod. Pošiljajte si številke in opazujte, kako se "odgovor" spreminja.',
    updated_at = NOW()
WHERE title = 'Nevronske mreže'
  AND course_id = (SELECT id FROM courses WHERE slug = 'robotics-and-ai');

-- Fix "toda" -> "vendar" in robotics
UPDATE course_lessons
SET content = REPLACE(content, 'toda nima', 'vendar nima'),
    updated_at = NOW()
WHERE title = 'Kaj je robot?'
  AND course_id = (SELECT id FROM courses WHERE slug = 'robotics-and-ai');

UPDATE course_lessons
SET content = REPLACE(content, 'toda vedno', 'vendar vedno'),
    updated_at = NOW()
WHERE title = 'Načrtovanje poti'
  AND course_id = (SELECT id FROM courses WHERE slug = 'robotics-and-ai');

-- Fix "Tipasz", "Zapomnisz", "gradisz" in SLAM lesson
UPDATE course_lessons
SET content = REPLACE(REPLACE(REPLACE(REPLACE(content, 'Tipasz', 'Tipaš'), 'Zapomnisz', 'Zapomniš'), 'gradisz', 'gradiš'), 'poskusisz', 'poskusiš'),
    updated_at = NOW()
WHERE title = 'Senzorji za navigacijo'
  AND course_id = (SELECT id FROM courses WHERE slug = 'robotics-and-ai');

-- Fix "vstanesz, poskusisz" in strojno ucenje lesson  
UPDATE course_lessons
SET content = REPLACE(REPLACE(content, 'vstanesz', 'vstaneš'), 'poskusisz', 'poskusiš'),
    updated_at = NOW()
WHERE title = 'Strojno učenje za robote'
  AND course_id = (SELECT id FROM courses WHERE slug = 'robotics-and-ai');

-- Fix "Narada" -> "Nagrada"
UPDATE course_lessons
SET content = REPLACE(content, 'Narada:', 'Nagrada:'),
    updated_at = NOW()
WHERE title = 'Strojno učenje za robote'
  AND course_id = (SELECT id FROM courses WHERE slug = 'robotics-and-ai');

-- Fix "nekoč" -> "nekoč" is fine (colloquial), "mozeg" -> "možgani"  
UPDATE course_lessons
SET content = REPLACE(content, 'mozeg', 'možgani'),
    updated_at = NOW()
WHERE title = 'Kaj je robot?'
  AND course_id = (SELECT id FROM courses WHERE slug = 'robotics-and-ai');

-- Fix "starejšim" -> "starejšim" is OK, but "dosežki" -> "dosežki" is OK
-- Fix "nekoč" -> "nekoč" keep as is

----------------------------------------------------------------------
-- COURSE 5: ai-safety-ethics (AI varnost in etika)
----------------------------------------------------------------------

-- Fix "nate" -> "na te" 
UPDATE course_lessons
SET content = REPLACE(content, 'nanašajo nate', 'nanašajo na te'),
    updated_at = NOW()
WHERE title = 'Kaj so osebni podatki?'
  AND course_id = (SELECT id FROM courses WHERE slug = 'ai-safety-ethics');

-- Fix "pristransko" -> "pristranski" and "pristanska" -> "pristranska"
UPDATE course_lessons
SET content = REPLACE(REPLACE(content, 'podatki **pristransko**', 'podatki **pristranski**'), 'AI pristanska', 'AI pristranska'),
    updated_at = NOW()
WHERE title = 'Kaj je pristranskost v AI?'
  AND course_id = (SELECT id FROM courses WHERE slug = 'ai-safety-ethics');

-- Fix "Pristransko podatki" -> "Pristranski podatki"
UPDATE course_lessons
SET content = REPLACE(content, 'Pristransko podatki', 'Pristranski podatki'),
    updated_at = NOW()
WHERE title = 'Kaj je pristranskost v AI?'
  AND course_id = (SELECT id FROM courses WHERE slug = 'ai-safety-ethics');

-- Fix "smesz" -> "smeš" and "smesz" -> "smeš"  
UPDATE course_lessons
SET content = REPLACE(REPLACE(content, 'smesz', 'smeš'), 'Česa NE smesz', 'Česar NE smeš'),
    updated_at = NOW()
WHERE title = 'Varna uporaba AI orodij'
  AND course_id = (SELECT id FROM courses WHERE slug = 'ai-safety-ethics');

-- Fix "toda" -> "vendar" in safety course
UPDATE course_lessons
SET content = REPLACE(content, 'toda aplikacija', 'vendar aplikacija'),
    updated_at = NOW()
WHERE title = 'Kako zaščitim svojo zasebnost'
  AND course_id = (SELECT id FROM courses WHERE slug = 'ai-safety-ethics');

UPDATE course_lessons
SET content = REPLACE(content, 'toda jih moramo', 'vendar jih moramo'),
    updated_at = NOW()
WHERE title = 'Varna uporaba AI orodij'
  AND course_id = (SELECT id FROM courses WHERE slug = 'ai-safety-ethics');

UPDATE course_lessons
SET content = REPLACE(content, 'toda brez osebnosti', 'vendar brez osebnosti'),
    updated_at = NOW()
WHERE title = 'AI in dezinformacije'
  AND course_id = (SELECT id FROM courses WHERE slug = 'ai-safety-ethics');

-- Fix "samovozeci" -> "samovozeči"
UPDATE course_lessons
SET content = REPLACE(content, 'samovozeci', 'samovozeči'),
    updated_at = NOW()
WHERE course_id = (SELECT id FROM courses WHERE slug = 'ai-safety-ethics');

----------------------------------------------------------------------
-- Fix course descriptions in courses table
----------------------------------------------------------------------
UPDATE courses
SET description = REPLACE(description, 'racunalniske', 'računalniške')
WHERE description LIKE '%racunalniske%';

UPDATE courses
SET description = REPLACE(description, 'varnosti', 'varnosti')
WHERE slug = 'ai-safety-ethics';
