-- Seed lessons for "AI osnove za otroke" (ai-basics-for-kids) - 12 lessons
-- Module 1: Kaj je AI? (3 lessons)
INSERT INTO course_lessons (course_id, module_index, lesson_index, title, content, content_type, duration_minutes, key_concepts)
SELECT c.id, 0, 0,
  'Kaj sploh je umetna inteligenca?',
  E'# Kaj sploh je umetna inteligenca?\n\nPredstavljaj si, da imas pametnega pomočnika, ki se lahko uči novih stvari - tako kot ti! Umetna inteligenca (ali krajše **AI**) je posebna vrsta računalniškega programa, ki se lahko uči iz podatkov in sprejema odločitve.\n\n## Kako si lahko predstavljaš AI?\n\nPomisli na svojega hišnega ljubljenčka. Ko ga naučiš novega trika:\n- Pokažeš mu, kaj naj naredi (to so **podatki**)\n- Ponavljaš vajo (to je **učenje**)\n- Ko se nauči, to naredi sam (to je **inteligenca**)\n\nAI deluje zelo podobno! Računalnik dobi veliko primerov, se iz njih uči in potem lahko sam rešuje podobne naloge.\n\n## Primeri AI v tvojem življenju\n\nAli si vedel, da AI že uporabljamo vsak dan?\n- **Glasovni pomočniki** (kot Siri ali Google Assistant) - razumejo tvoj glas\n- **Priporočila na YouTubu** - AI ugane, kateri video ti bo všeč\n- **Filtri na fotografijah** - AI prepozna tvoj obraz in doda smešne učinke\n\n## Pomembno si zapomni\nAI ni živa. Ne razmišlja kot človek. Je zelo pameten program, ki sledi navodilom in se uči iz primerov.',
  'text', 15,
  '["umetna inteligenca", "podatki", "učenje", "inteligenca"]'
FROM courses c WHERE c.slug = 'ai-basics-for-kids'
ON CONFLICT (course_id, module_index, lesson_index) DO NOTHING;

INSERT INTO course_lessons (course_id, module_index, lesson_index, title, content, content_type, duration_minutes, key_concepts)
SELECT c.id, 0, 1,
  'Kako računalnik razmišlja?',
  E'# Kako računalnik razmišlja?\n\nRačunalniki ne razmišljajo tako kot mi. Nimajo možganov, ampak imajo nekaj drugega - **procesor**, ki je kot zelo, zelo hiter kalkulator.\n\n## Človek vs. Računalnik\n\n| Človek | Računalnik |\n|--------|------------|\n| Ima možgane | Ima procesor |\n| Se uči iz izkušenj | Se uči iz podatkov |\n| Ima čustva | Nima čustev |\n| Lahko je kreativen | Sledi pravilom |\n| Je počasen pri matematiki | Je super hiter pri matematiki |\n\n## Kako računalnik "vidi" stvari?\n\nKo ti vidiš mačko, tvoji možgani takoj vedo - to je mačka! Ampak računalnik vidi samo številke. Vsaka slika je za računalnik tabela števil, ki predstavljajo barve.\n\nZato je AI tako posebna - naučili smo računalnike, da iz teh števil prepoznajo, kaj je na sliki!\n\n## Zabavno dejstvo\nTvoji možgani imajo približno 86 milijard nevronov (to so majhne celice, ki razmišljajo). Najboljši računalniki poskušajo posnemati te nevrone z nečim, čemur rečemo **nevronska mreža**.',
  'text', 15,
  '["procesor", "nevronska mreža", "nevroni", "piksli"]'
FROM courses c WHERE c.slug = 'ai-basics-for-kids'
ON CONFLICT (course_id, module_index, lesson_index) DO NOTHING;

INSERT INTO course_lessons (course_id, module_index, lesson_index, title, content, content_type, duration_minutes, key_concepts)
SELECT c.id, 0, 2,
  'Zgodba umetne inteligence',
  E'# Zgodba umetne inteligence\n\nAI ni nova stvar! Ljudje sanjajo o pametnih strojih že zelo dolgo. Pojdimo na potovanje skozi čas!\n\n## Časovnica AI\n\n### 1950 - Začetek\nZnanstvenik **Alan Turing** je vprašal: "Ali lahko stroji razmišljajo?" Napisal je pravila za testiranje, ali je stroj pameten - to imenujemo **Turingov test**.\n\n### 1966 - Prvi chatbot\nNaredili so program imenovan **ELIZA**, ki se je lahko pogovarjal z ljudmi. Ni bil zelo pameten, ampak je bil zabaven!\n\n### 1997 - Šahovski prvak\nRačunalnik **Deep Blue** je premagal svetovnega šahovskega prvaka. Prvič je stroj premagal najboljšega človeškega igralca!\n\n### 2011 - Glasovni pomočniki\nApple je predstavil **Siri** - pomočnika, ki razume tvoj glas.\n\n### 2023 - ChatGPT in naprej\nAI je postala tako pametna, da lahko piše zgodbe, ustvarja slike in se pogovarja skoraj kot človek!\n\n## Kaj pa prihodnost?\nNihče ne ve natančno, kaj bo AI zmogla v prihodnosti. Morda bo pomagala zdraviti bolezni, čistiti oceane ali nas odpeljala na Mars!\n\n## Tvoja vloga\nVi, otroci, ste tisti, ki boste oblikovali prihodnost AI. Zato je tako pomembno, da se o njej učite že zdaj!',
  'text', 15,
  '["Alan Turing", "Turingov test", "ELIZA", "Deep Blue", "časovnica AI"]'
FROM courses c WHERE c.slug = 'ai-basics-for-kids'
ON CONFLICT (course_id, module_index, lesson_index) DO NOTHING;

-- Module 2: AI okrog nas (3 lessons)
INSERT INTO course_lessons (course_id, module_index, lesson_index, title, content, content_type, duration_minutes, key_concepts)
SELECT c.id, 1, 0,
  'AI v tvojem telefonu',
  E'# AI v tvojem telefonu\n\nTvoj telefon (ali telefon tvojih staršev) je poln umetne inteligence! Poglejmo, kje vse se skriva.\n\n## Kamera in fotografije\nKo naredis fotografijo, AI pomaga na več načinov:\n- **Prepoznava obrazov** - telefon ve, kdo je na sliki\n- **Nočni način** - AI naredi temne slike svetlejše\n- **Portretni način** - AI zamegli ozadje\n\n## Tipkovnica\nKo pišeš sporočilo, AI predlaga naslednje besede! Poskusi - začni pisati in poglej, kaj ti telefon predlaga.\n\n## Zemljevidi\nKo staršev telefon pokaže pot do šole:\n- AI analizira promet v realnem času\n- Predlaga najhitrejšo pot\n- Napove, koliko časa bo trajala pot\n\n## Glasovni pomočnik\n"Hej Siri" ali "OK Google" - to je AI, ki:\n1. **Posluša** tvoj glas\n2. **Pretvori** zvok v besedilo\n3. **Razume**, kaj si vprašal\n4. **Najde** odgovor\n5. **Odgovori** v razumljivem jeziku\n\n## Razmisli\nKoliko stvari na telefonu uporablja AI? Verjetno veliko več, kot si mislil!',
  'text', 15,
  '["prepoznava obrazov", "glasovni pomočnik", "priporočilni sistem", "navigacija"]'
FROM courses c WHERE c.slug = 'ai-basics-for-kids'
ON CONFLICT (course_id, module_index, lesson_index) DO NOTHING;

INSERT INTO course_lessons (course_id, module_index, lesson_index, title, content, content_type, duration_minutes, key_concepts)
SELECT c.id, 1, 1,
  'AI v igrah in zabavi',
  E'# AI v igrah in zabavi\n\nAli si vedel, da so videoigre eden od najboljših primerov AI? Poglejmo, kako AI naredi igre bolj zabavne!\n\n## AI nasprotniki\nKo igraš igro proti računalniku, igraš proti AI! Na primer:\n- V **šahu** AI razmišlja o najboljši potezi\n- V **dirkalni igri** AI avtomobili vozijo po progi\n- V **Minecraftu** se pošasti premikajo in te iščejo\n\n## Kako AI v igri deluje?\nAI v igrah uporablja preprosta pravila:\n1. **Če** vidi igralca → **potem** ga napade\n2. **Če** je igralec daleč → **potem** patrulira\n3. **Če** ima malo življenja → **potem** se skrije\n\nTo so kot navodila za igro!\n\n## Priporočila\nKo gledaš YouTube ali Netflix:\n- AI si zapomni, kaj ti je všeč\n- Primerja tvoj okus z drugimi otroki\n- Predlaga videe, ki ti bodo verjetno všeč\n\n## Filtri na družbenih omrežjih\nTisti smešni filtri, ki ti dodajo mačja ušesa ali smešne očala? To je AI, ki:\n- Najde tvoj obraz na sliki\n- Prepozna, kje so tvoje oči, nos in usta\n- Doda filter na pravo mesto\n\n## Pomembno\nČeprav je AI v igrah zabavna, se spomni - to je samo program, ne pravi nasprotnik!',
  'text', 15,
  '["AI nasprotniki", "pravila vedenja", "priporočilni sistem", "prepoznava obrazov"]'
FROM courses c WHERE c.slug = 'ai-basics-for-kids'
ON CONFLICT (course_id, module_index, lesson_index) DO NOTHING;

INSERT INTO course_lessons (course_id, module_index, lesson_index, title, content, content_type, duration_minutes, key_concepts)
SELECT c.id, 1, 2,
  'AI v šoli in doma',
  E'# AI v šoli in doma\n\nAI ni samo v telefonih in igrah - je tudi v šoli in doma! Poglejmo, kje jo najdemo.\n\n## AI v šoli\n- **Prevajalniki** (kot Google Translate) - pomagajo pri učenju jezikov\n- **Iskanje na internetu** - ko googlaš za domačo nalogo, AI pomaga najti najboljše rezultate\n- **Učne aplikacije** - nekatere aplikacije se prilagodijo tvoji hitrosti učenja\n\n## AI doma\n- **Pametni zvočniki** - Alexa, Google Home predvajajo glasbo, odgovarjajo na vprašanja\n- **Robotski sesalnik** - AI mu pomaga, da ne trči v pohištvo\n- **Pametni termostat** - se nauči, kdaj ste doma, in uravnava temperaturo\n\n## AI in hrana\nTudi v kuhinji je AI:\n- Aplikacije, ki prepoznajo hrano na fotografiji\n- Pametni hladilniki, ki vedo, kaj je notri\n- Priporočila receptov glede na sestavine, ki jih imaš\n\n## Ali je AI povsod?\nSkoraj! Ampak ne pozabi - ne vse naprave uporabljajo AI. Navadna žarnica, stikalo za luč ali vodni pip - to so preproste naprave brez AI.\n\n## Ključna razlika\nNaprava z AI se **uči in prilagaja**. Navadna naprava vedno dela **isto stvar** na isti način.',
  'text', 15,
  '["pametne naprave", "prevajalnik", "prilagodljivo učenje", "AI vs navadna naprava"]'
FROM courses c WHERE c.slug = 'ai-basics-for-kids'
ON CONFLICT (course_id, module_index, lesson_index) DO NOTHING;

-- Module 3: Kako se AI uči (3 lessons)
INSERT INTO course_lessons (course_id, module_index, lesson_index, title, content, content_type, duration_minutes, key_concepts)
SELECT c.id, 2, 0,
  'Učenje iz primerov',
  E'# Učenje iz primerov\n\nKako se AI nauči prepoznati mačko na sliki? Tako kot se ti učiš - iz primerov!\n\n## Tvoje učenje vs AI učenje\n\nKo si bil majhen, so ti starši pokazali mačko in rekli "mačka". Po tem, ko si videl VELIKO mačk, si se naučil, kaj je mačka - velike, majhne, črtaste, črne...\n\nAI se uči **enako**:\n1. Pokažemo ji tisoče slik mačk\n2. Pokažemo ji tisoče slik, ki NISO mačke\n3. AI najde vzorce - mačke imajo ušesa, brke, rep...\n4. Ko vidi novo sliko, preveri ali ustreza vzorcu\n\n## Kaj so podatki?\n\nPodatki so hrana za AI. Več ko jih ima, bolje se nauči!\n- Za prepoznavanje živali → potrebuje tisoče slik živali\n- Za razumevanje govora → potrebuje tisoče posnetkov govora\n- Za igranje iger → potrebuje tisoče odigranih iger\n\n## Zabaven eksperiment\nPredstavljaj si, da bi te nekdo naučil, kaj je "zumba" (izmišljena stvar). Pokazal bi ti 5 slik zumbe in 5 slik, ki NISO zumba. Ali bi po 10 slikah vedel, kaj je zumba? Morda! AI potrebuje več primerov, ampak princip je isti.',
  'text', 20,
  '["strojno učenje", "podatki", "vzorci", "klasifikacija"]'
FROM courses c WHERE c.slug = 'ai-basics-for-kids'
ON CONFLICT (course_id, module_index, lesson_index) DO NOTHING;

INSERT INTO course_lessons (course_id, module_index, lesson_index, title, content, content_type, duration_minutes, key_concepts)
SELECT c.id, 2, 1,
  'Vzorci povsod',
  E'# Vzorci povsod\n\nAI je mojster iskanja vzorcev! Ampak kaj sploh so vzorci?\n\n## Kaj je vzorec?\nVzorec je nekaj, kar se ponavlja ali ima pravilo. Na primer:\n- Rdeča, modra, rdeča, modra - to je vzorec barv!\n- 2, 4, 6, 8, __ - to je vzorec števil! (naslednje je 10)\n- Vsako jutro vstaneš, zajtrkuješ, greš v šolo - to je vzorec dneva!\n\n## Kako AI najde vzorce?\nAI pregleda OGROMNO podatkov in poišče, kaj se ponavlja:\n\n### Vzorci v besedah\n- Po besedi "dobro" pogosto pride "jutro"\n- Po besedi "hvala" pogosto pride "lepa"\n- AI se to nauči in zato lahko predlaga besede!\n\n### Vzorci v slikah\n- Mačke imajo vedno: 2 ušesi, brke, rep\n- Avtomobili imajo vedno: 4 kolesa, okna, luči\n- AI prepozna te skupne lastnosti\n\n### Vzorci v glasbi\n- Pesmi imajo ritem, ki se ponavlja\n- Melodije sledijo pravilom\n- AI se nauči teh pravil in lahko ustvari novo glasbo!\n\n## Tvoji možgani so super!\nTvoji možgani so pravzaprav BOLJŠI od AI pri iskanju vzorcev! Potrebuješ samo par primerov, AI pa tisoče. Ampak AI je hitrejša pri pregledovanju velikih količin podatkov.',
  'text', 20,
  '["vzorci", "prepoznavanje vzorcev", "napovedovanje", "podatkovne strukture"]'
FROM courses c WHERE c.slug = 'ai-basics-for-kids'
ON CONFLICT (course_id, module_index, lesson_index) DO NOTHING;

INSERT INTO course_lessons (course_id, module_index, lesson_index, title, content, content_type, duration_minutes, key_concepts)
SELECT c.id, 2, 2,
  'Ko se AI zmoti',
  E'# Ko se AI zmoti\n\nAI ni popolna - včasih se zmoti! In to je povsem normalno.\n\n## Zakaj se AI zmoti?\n\n### 1. Premalo primerov\nČe AI vidi samo bele mačke, morda ne prepozna črne mačke. Potrebuje RAZNOLIKE primere.\n\n### 2. Čudni primeri\nČe nekdo pokaže AI sliko torte v obliki mačke, se lahko zmede - ali je to mačka ali torta?\n\n### 3. Nove situacije\nAI se težko znajde v situacijah, ki jih še ni videla. Ti se lahko hitro prilagodiš, AI pa ne vedno.\n\n## Smešne napake AI\n- AI je enkrat mislila, da je **kip** pravi človek\n- Prevajalnik je besedo "pasjanca" prevedel kot "bolezen psa"\n- AI za prepoznavanje hrane je mislila, da je **čihuahua** pravzaprav muffin (res sta si podobna!)\n\n## Kaj se naučimo iz napak?\nTako kot ti, se tudi AI uči iz napak:\n1. AI naredi napako\n2. Ljudje jo popravijo\n3. AI dobi nove primere\n4. Naslednjič je boljša!\n\n## Zakaj je to pomembno?\nKer ne smemo slepo zaupati AI! Vedno preveri:\n- Ali je odgovor smiselen?\n- Ali imam dovolj informacij?\n- Bi moral vprašati odraslega?\n\nKritično razmišljanje je tvoja super moč, ki je AI nima!',
  'text', 20,
  '["napake AI", "pristranskost", "kritično razmišljanje", "učenje iz napak"]'
FROM courses c WHERE c.slug = 'ai-basics-for-kids'
ON CONFLICT (course_id, module_index, lesson_index) DO NOTHING;

-- Module 4: Ustvarjajmo z AI (3 lessons)
INSERT INTO course_lessons (course_id, module_index, lesson_index, title, content, content_type, duration_minutes, key_concepts)
SELECT c.id, 3, 0,
  'Pogovor z AI',
  E'# Pogovor z AI\n\nZdaj ko veš, kaj je AI in kako se uči, je čas, da se pogovarjaš z njo!\n\n## Kaj je chatbot?\nChatbot je AI program, s katerim se lahko pogovarjaš. Pišeš mu sporočila in ti odgovori!\n\n## Kako pisati dobre ukaze (prompte)?\nUkaz ali **prompt** je to, kar napišeš AI. Boljši ko je ukaz, boljši bo odgovor!\n\n### Slabi ukazi:\n- "Povej mi nekaj" (preveč splošno!)\n- "asdjkfh" (AI ne razume nesmiselnega besedila)\n\n### Dobri ukazi:\n- "Razloži mi, kako deluje mavrica, kot da sem star 8 let"\n- "Napiši kratko zgodbo o psu, ki leti v vesolje"\n- "Kakšni dinozavri so živeli v Sloveniji?"\n\n## Pravila za pogovor z AI\n1. **Bodi jasen** - povej natančno, kaj želiš\n2. **Bodi prijazen** - čeprav AI nima čustev, je dobra navada\n3. **Preveri odgovore** - AI se lahko zmoti\n4. **Ne deli osebnih podatkov** - nikoli ne povej AI svojega pravega imena, naslova ali šole\n5. **Vprašaj starše** - če nisi prepričan, vprašaj odraslega\n\n## Poskusi!\nNa naši platformi imaš AI prijatelja, s katerim se lahko pogovarjaš. Poskusi mu zastaviti zanimivo vprašanje!',
  'text', 20,
  '["chatbot", "prompt", "ukazi", "varnost", "osebni podatki"]'
FROM courses c WHERE c.slug = 'ai-basics-for-kids'
ON CONFLICT (course_id, module_index, lesson_index) DO NOTHING;

INSERT INTO course_lessons (course_id, module_index, lesson_index, title, content, content_type, duration_minutes, key_concepts)
SELECT c.id, 3, 1,
  'Ustvarjanje zgodb z AI',
  E'# Ustvarjanje zgodb z AI\n\nEna od najzabavnejših stvari, ki jih lahko narediš z AI, je ustvarjanje zgodb! AI ti lahko pomaga napisati zgodbe, ki si jih sam ne bi izmislil.\n\n## Kako AI piše zgodbe?\nAI je prebrala MILIJONE zgodb in se naučila:\n- Kako se zgodbe začnejo\n- Kakšni liki nastopajo\n- Kako se zgodbe končajo\n- Kakšen jezik uporabljajo\n\n## Ustvari svojo zgodbo!\nPoskusi ta recept za zgodbo:\n\n### Korak 1: Izberi lika\nKdo je v tvoji zgodbi? Robot? Princeska? Govoreča mačka?\n\n### Korak 2: Izberi kraj\nKje se zgodba dogaja? V vesolju? Pod morjem? V čarobnem gozdu?\n\n### Korak 3: Izberi problem\nKaj se zgodi? Se lik izgubi? Mora rešiti uganko? Najde skrivnostno karto?\n\n### Korak 4: Vprašaj AI\nZdaj vse skupaj povej AI: "Napiši zgodbo o govoreči mački v vesolju, ki mora najti pot domov."\n\n## Ti si avtor!\nAI ti pomaga, ampak TI si pravi avtor. Ti izbereš ideje, AI jih samo zapiše. Lahko spremeniš karkoli - dodaš nove dele, odstraniš kar ti ni všeč, ali nadaljuješ zgodbo po svoje.\n\n## Pomembno\nZgodba, ki jo ustvariš z AI, je TVOJA zgodba. Ti si jo zamislil, AI je bila samo tvoj pomočnik pri pisanju.',
  'text', 20,
  '["ustvarjalnost", "pisanje zgodb", "prompt engineering", "soavtorstvo"]'
FROM courses c WHERE c.slug = 'ai-basics-for-kids'
ON CONFLICT (course_id, module_index, lesson_index) DO NOTHING;

INSERT INTO course_lessons (course_id, module_index, lesson_index, title, content, content_type, duration_minutes, key_concepts)
SELECT c.id, 3, 2,
  'Kaj sem se naučil o AI',
  E'# Kaj sem se naučil o AI\n\nČestitke! Prišel si do zadnje lekcije tečaja AI osnove! Poglejmo, kaj vse si se naučil.\n\n## Povzetek tvojega znanja\n\n### Modul 1: Kaj je AI?\n- AI je računalniški program, ki se uči iz podatkov\n- Računalniki razmišljajo drugače kot ljudje\n- AI ima zanimivo zgodbo, ki se je začela leta 1950\n\n### Modul 2: AI okrog nas\n- AI je v telefonih, igrah in doma\n- Pomaga nam vsak dan na načine, ki jih niti ne opazimo\n- Ni vse tehnologije AI - nekatere naprave so preproste\n\n### Modul 3: Kako se AI uči\n- AI se uči iz primerov, tako kot ti\n- Išče vzorce v podatkih\n- Včasih se zmoti - in to je OK!\n\n### Modul 4: Ustvarjajmo z AI\n- Naučil si se pisati dobre ukaze (prompte)\n- Ustvarjal si zgodbe skupaj z AI\n- Spoznal si, da si TI avtor, AI je pomočnik\n\n## Tvoj AI diplom\nZdaj uradno veš več o AI kot večina odraslih! Lahko se ponosno imenuješ **AI raziskovalec**.\n\n## Kaj naprej?\nČe te AI zanima še bolj, poskusi naše druge tečaje:\n- **Programiranje z AI** - nauči se kodirati s pomočjo AI\n- **AI umetniški studio** - ustvarjaj umetnost z AI\n- **AI varnost in etika** - nauči se odgovorne uporabe AI\n\nHvala, da si se učil z nami! Tvoja AI pustolovščina se šele začenja!',
  'text', 15,
  '["povzetek", "AI raziskovalec", "naslednji koraki"]'
FROM courses c WHERE c.slug = 'ai-basics-for-kids'
ON CONFLICT (course_id, module_index, lesson_index) DO NOTHING;
