-- Seed lessons for "AI osnove za otroke" (ai-basics-for-kids) - 12 lessons
-- Module 1: Kaj je AI? (3 lessons)
INSERT INTO course_lessons (course_id, module_index, lesson_index, title, slug, content_type, content, duration_minutes, activities)
SELECT c.id, 0, 0,
  'Kaj sploh je umetna inteligenca?',
  'kaj-je-ai',
  'text',
  '# Kaj sploh je umetna inteligenca?

Predstavljaj si, da imas pametnega pomočnika, ki se lahko uči novih stvari - tako kot ti! Umetna inteligenca (ali krajše **AI**) je posebna vrsta računalniškega programa, ki se lahko uči iz podatkov in sprejema odločitve.

## Kako si lahko predstavljaš AI?

Pomisli na svojega hišnega ljubljenčka. Ko ga naučiš novega trika:
- Pokažeš mu, kaj naj naredi (to so **podatki**)
- Ponavljaš vajo (to je **učenje**)  
- Ko se nauči, to naredi sam (to je **inteligenca**)

AI deluje zelo podobno! Računalnik dobi veliko primerov, se iz njih uči in potem lahko sam rešuje podobne naloge.

## Primeri AI v tvojem življenju

Ali si vedel, da AI že uporabljamo vsak dan?
- **Glasovni pomočniki** (kot Siri ali Google Assistant) - razumejo tvoj glas
- **Priporočila na YouTubu** - AI ugane, kateri video ti bo všeč
- **Filtri na fotografijah** - AI prepozna tvoj obraz in doda smešne učinke

## Pomembno si zapomni
AI ni živa. Ne razmišlja kot človek. Je zelo pameten program, ki sledi navodilom in se uči iz primerov.',
  15,
  '[{"type": "quiz", "title": "Preveri svoje znanje", "description": "Odgovori na 3 vprašanja o tem, kaj je AI"}, {"type": "activity", "title": "AI ali ne AI?", "description": "Razvrsti naprave in programe - kateri uporabljajo AI in kateri ne?"}]'
FROM courses c WHERE c.slug = 'ai-basics-for-kids';

INSERT INTO course_lessons (course_id, module_index, lesson_index, title, slug, content_type, content, duration_minutes, activities)
SELECT c.id, 0, 1,
  'Kako računalnik razmišlja?',
  'kako-racunalnik-razmislja',
  'text',
  '# Kako računalnik razmišlja?

Računalniki ne razmišljajo tako kot mi. Nimajo možganov, ampak imajo nekaj drugega - **procesor**, ki je kot zelo, zelo hiter kalkulator.

## Človek vs. Računalnik

| Človek | Računalnik |
|--------|-----------|
| Ima možgane | Ima procesor |
| Se uči iz izkušenj | Se uči iz podatkov |
| Ima čustva | Nima čustev |
| Lahko je kreativen | Sledi pravilom |
| Je počasen pri matematiki | Je super hiter pri matematiki |

## Kako računalnik "vidi" stvari?

Ko ti vidiš mačko, tvoji možgani takoj vedo - to je mačka! Ampak računalnik vidi samo številke. Vsaka slika je za računalnik tabela števil, ki predstavljajo barve.

Zato je AI tako posebna - naučili smo računalnike, da iz teh števil prepoznajo, kaj je na sliki!

## Zabavno dejstvo
Tvoji možgani imajo približno 86 milijard nevronov (to so majhne celice, ki razmišljajo). Najboljši računalniki poskušajo posnemati te nevrone z nečim, čemur rečemo **nevronska mreža**.',
  15,
  '[{"type": "quiz", "title": "Človek ali računalnik?", "description": "Kdo je boljši pri čem? Razvrsti naloge!"}, {"type": "activity", "title": "Piksli in barve", "description": "Poglej, kako računalnik vidi tvojo fotografijo - kot mrežo številk!"}]'
FROM courses c WHERE c.slug = 'ai-basics-for-kids';

INSERT INTO course_lessons (course_id, module_index, lesson_index, title, slug, content_type, content, duration_minutes, activities)
SELECT c.id, 0, 2,
  'Zgodba umetne inteligence',
  'zgodba-ai',
  'text',
  '# Zgodba umetne inteligence

AI ni nova stvar! Ljudje sanjajo o pametnih strojih že zelo dolgo. Pojdimo na potovanje skozi čas!

## Časovnica AI

### 1950 - Začetek
Znanstvenik **Alan Turing** je vprašal: "Ali lahko stroji razmišljajo?" Napisal je pravila za testiranje, ali je stroj pameten - to imenujemo **Turingov test**.

### 1966 - Prvi chatbot
Naredili so program imenovan **ELIZA**, ki se je lahko pogovarjal z ljudmi. Ni bil zelo pameten, ampak je bil zabaven!

### 1997 - Šahovski prvak
Računalnik **Deep Blue** je premagal svetovnega šahovskega prvaka. Prvič je stroj premagal najboljšega človeškega igralca!

### 2011 - Glasovni pomočniki
Apple je predstavil **Siri** - pomočnika, ki razume tvoj glas. Zdaj imamo tudi Alexa, Google Assistant in druge.

### 2023 - ChatGPT in naprej
AI je postala tako pametna, da lahko piše zgodbe, ustvarja slike in se pogovarja skoraj kot človek!

## Kaj pa prihodnost?
Nihče ne ve natančno, kaj bo AI zmogla v prihodnosti. Morda bo pomagala zdraviti bolezni, čistiti oceane ali nas odpeljala na Mars!

## Tvoja vloga
Vi, otroci, ste tisti, ki boste oblikovali prihodnost AI. Zato je tako pomembno, da se o njej učite že zdaj!',
  15,
  '[{"type": "quiz", "title": "Časovnica kviz", "description": "Razvrsti dogodke v pravilnem vrstnem redu!"}, {"type": "activity", "title": "Moja AI prihodnost", "description": "Nariši ali opiši, kakšno AI bi ti rad izumil"}]'
FROM courses c WHERE c.slug = 'ai-basics-for-kids';

-- Module 2: AI okrog nas (3 lessons)
INSERT INTO course_lessons (course_id, module_index, lesson_index, title, slug, content_type, content, duration_minutes, activities)
SELECT c.id, 1, 0,
  'AI v tvojem telefonu',
  'ai-v-telefonu',
  'text',
  '# AI v tvojem telefonu

Tvoj telefon (ali telefon tvojih staršev) je poln umetne inteligence! Poglejmo, kje vse se skriva.

## Kamera in fotografije
Ko naredis fotografijo, AI pomaga na več načinov:
- **Prepoznava obrazov** - telefon ve, kdo je na sliki
- **Nočni način** - AI naredi temne slike svetlejše
- **Portretni način** - AI zamegli ozadje, da izgleda profesionalno

## Tipkovnica
Ko pišeš sporočilo, AI predlaga naslednje besede! Poskusi - začni pisati in poglej, kaj ti telefon predlaga.

## Zemljevidi
Ko staršev telefon pokaže pot do šole:
- AI analizira promet v realnem času
- Predlaga najhitrejšo pot
- Napove, koliko časa bo trajala pot

## Glasovni pomočnik
"Hej Siri" ali "OK Google" - to je AI, ki:
1. **Posluša** tvoj glas
2. **Pretvori** zvok v besedilo
3. **Razume**, kaj si vprašal
4. **Najde** odgovor
5. **Odgovori** v razumljivem jeziku

## Razmisli
Koliko stvari na telefonu uporablja AI? Verjetno veliko več, kot si mislil!',
  15,
  '[{"type": "quiz", "title": "Najdi AI", "description": "Koliko AI funkcij v telefonu lahko najdeš?"}, {"type": "activity", "title": "AI detektiv", "description": "Skupaj s starši preglejta telefon in najdita vse AI funkcije"}]'
FROM courses c WHERE c.slug = 'ai-basics-for-kids';

INSERT INTO course_lessons (course_id, module_index, lesson_index, title, slug, content_type, content, duration_minutes, activities)
SELECT c.id, 1, 1,
  'AI v igrah in zabavi',
  'ai-v-igrah',
  'text',
  '# AI v igrah in zabavi

Ali si vedel, da so videoigre eden od najboljših primerov AI? Poglejmo, kako AI naredi igre bolj zabavne!

## AI nasprotniki
Ko igraš igro proti računalniku, igraš proti AI! Na primer:
- V **šahu** AI razmišlja o najboljši potezi
- V **dirkalni igri** AI avtomobili vozijo po progi
- V **Minecraftu** se pošasti premikajo in te iščejo

## Kako AI v igri deluje?
AI v igrah uporablja preprosta pravila:
1. **Če** vidi igralca → **potem** ga napade
2. **Če** je igralec daleč → **potem** patrulira
3. **Če** ima malo življenja → **potem** se skrije

To so kot navodila za igro!

## Priporočila
Ko gledaš YouTube ali Netflix:
- AI si zapomni, kaj ti je všeč
- Primerja tvoj okus z drugimi otroki
- Predlaga videe, ki ti bodo verjetno všeč

## Filtri na družbenih omrežjih
Tisti smešni filtri, ki ti dodajo mačja ušesa ali smešne očala? To je AI, ki:
- Najde tvoj obraz na sliki
- Prepozna, kje so tvoje oči, nos in usta
- Doda filter na pravo mesto

## Pomembno
Čeprav je AI v igrah zabavna, se spomni - to je samo program, ne pravi nasprotnik!',
  15,
  '[{"type": "quiz", "title": "AI v igrah kviz", "description": "Preveri, kaj si se naučil o AI v videoigrah"}, {"type": "activity", "title": "Načrtuj AI pravila", "description": "Napiši 5 pravil za AI v svoji najljubši igri"}]'
FROM courses c WHERE c.slug = 'ai-basics-for-kids';

INSERT INTO course_lessons (course_id, module_index, lesson_index, title, slug, content_type, content, duration_minutes, activities)
SELECT c.id, 1, 2,
  'AI v šoli in doma',
  'ai-v-soli',
  'text',
  '# AI v šoli in doma

AI ni samo v telefonih in igrah - je tudi v šoli in doma! Poglejmo, kje jo najdemo.

## AI v šoli
- **Prevajalniki** (kot Google Translate) - pomagajo pri učenju jezikov
- **Iskanje na internetu** - ko googlaš za domačo nalogo, AI pomaga najti najboljše rezultate
- **Učne aplikacije** - nekatere aplikacije se prilagodijo tvoji hitrosti učenja

## AI doma
- **Pametni zvočniki** - Alexa, Google Home predvajajo glasbo, odgovarjajo na vprašanja
- **Robotski sesalnik** - AI mu pomaga, da ne trči v pohištvo
- **Pametni termostat** - se nauči, kdaj ste doma, in uravnava temperaturo

## AI in hrana
Tudi v kuhinji je AI:
- Aplikacije, ki prepoznajo hrano na fotografiji
- Pametni hladilniki, ki vedo, kaj je notri
- Priporočila receptov glede na sestavine, ki jih imaš

## Ali je AI povsod?
Skoraj! Ampak ne pozabi - ne vse naprave uporabljajo AI. Navadna žarnica, stikalo za luč ali vodni pip - to so preproste naprave brez AI.

## Ključna razlika
Naprava z AI se **uči in prilagaja**. Navadna naprava vedno dela **isto stvar** na isti način.',
  15,
  '[{"type": "quiz", "title": "AI ali ne?", "description": "Razvrsti naprave - katera uporablja AI?"}, {"type": "activity", "title": "AI lov po hiši", "description": "Sprehodi se po svoji hiši in zapiši vse naprave, ki po tvojem mnenju uporabljajo AI"}]'
FROM courses c WHERE c.slug = 'ai-basics-for-kids';

-- Module 3: Kako se AI uči (3 lessons)
INSERT INTO course_lessons (course_id, module_index, lesson_index, title, slug, content_type, content, duration_minutes, activities)
SELECT c.id, 2, 0,
  'Učenje iz primerov',
  'ucenje-iz-primerov',
  'text',
  '# Učenje iz primerov

Kako se AI nauči prepoznati mačko na sliki? Tako kot se ti učiš - iz primerov!

## Tvoje učenje vs AI učenje

Ko si bil majhen, so ti starši pokazali mačko in rekli "mačka". Po tem, ko si videl VELIKO mačk, si se naučil, kaj je mačka - velike, majhne, črtaste, črne...

AI se uči **enako**:
1. Pokažemo ji tisoče slik mačk
2. Pokažemo ji tisoče slik, ki NISO mačke
3. AI najde vzorce - mačke imajo ušesa, brke, rep...
4. Ko vidi novo sliko, preveri ali ustreza vzorcu

## Kaj so podatki?

Podatki so hrana za AI. Več ko jih ima, bolje se nauči!
- Za prepoznavanje živali → potrebuje tisoče slik živali
- Za razumevanje govora → potrebuje tisoče posnetkov govora
- Za igranje iger → potrebuje tisoče odigranih iger

## Zabaven eksperiment
Predstavljaj si, da bi te nekdo naučil, kaj je "zumba" (izmišljena stvar). Pokazal bi ti 5 slik zumbe in 5 slik, ki NISO zumba. Ali bi po 10 slikah vedel, kaj je zumba? Morda! AI potrebuje več primerov, ampak princip je isti.',
  20,
  '[{"type": "quiz", "title": "Kako se AI uči?", "description": "Preveri razumevanje strojnega učenja"}, {"type": "activity", "title": "Nauči prijatelja", "description": "Nariši 5 primerov izmišljenega bitja in poglej, ali ga prijatelj prepozna"}]'
FROM courses c WHERE c.slug = 'ai-basics-for-kids';

INSERT INTO course_lessons (course_id, module_index, lesson_index, title, slug, content_type, content, duration_minutes, activities)
SELECT c.id, 2, 1,
  'Vzorci povsod',
  'vzorci-povsod',
  'text',
  '# Vzorci povsod

AI je mojster iskanja vzorcev! Ampak kaj sploh so vzorci?

## Kaj je vzorec?
Vzorec je nekaj, kar se ponavlja ali ima pravilo. Na primer:
- 🔴🔵🔴🔵🔴🔵 - to je vzorec barv!
- 2, 4, 6, 8, __ - to je vzorec števil! (naslednje je 10)
- Vsako jutro vstaneš, zajtrkuješ, greš v šolo - to je vzorec dneva!

## Kako AI najde vzorce?
AI pregleda OGROMNO podatkov in poišče, kaj se ponavlja:

### Vzorci v besedah
- Po besedi "dobro" pogosto pride "jutro"
- Po besedi "hvala" pogosto pride "lepa"
- AI se to nauči in zato lahko predlaga besede!

### Vzorci v slikah
- Mačke imajo vedno: 2 ušesi, brke, rep
- Avtomobili imajo vedno: 4 kolesa, okna, luči
- AI prepozna te skupne lastnosti

### Vzorci v glasbi
- Pesmi imajo ritem, ki se ponavlja
- Melodije sledijo pravilom
- AI se nauči teh pravil in lahko ustvari novo glasbo!

## Tvoji možgani so super!
Tvoji možgani so pravzaprav BOLJŠI od AI pri iskanju vzorcev! Potrebuješ samo par primerov, AI pa tisoče. Ampak AI je hitrejša pri pregledovanju velikih količin podatkov.',
  20,
  '[{"type": "quiz", "title": "Najdi vzorec", "description": "Dopolni vzorce in ugani pravilo"}, {"type": "activity", "title": "Vzorci okrog mene", "description": "Najdi 5 vzorcev v svoji sobi ali na poti v šolo"}]'
FROM courses c WHERE c.slug = 'ai-basics-for-kids';

INSERT INTO course_lessons (course_id, module_index, lesson_index, title, slug, content_type, content, duration_minutes, activities)
SELECT c.id, 2, 2,
  'Ko se AI zmoti',
  'ko-se-ai-zmoti',
  'text',
  '# Ko se AI zmoti

AI ni popolna - včasih se zmoti! In to je povsem normalno.

## Zakaj se AI zmoti?

### 1. Premalo primerov
Če AI vidi samo bele mačke, morda ne prepozna črne mačke. Potrebuje RAZNOLIKE primere.

### 2. Čudni primeri
Če nekdo pokaže AI sliko torte v obliki mačke, se lahko zmede - ali je to mačka ali torta?

### 3. Nove situacije
AI se težko znajde v situacijah, ki jih še ni videla. Ti se lahko hitro prilagodiš, AI pa ne vedno.

## Smešne napake AI
- AI je enkrat mislila, da je **kip** pravi človek
- Prevajalnik je besedo "pasjanca" prevedel kot "bolezen psa"
- AI za prepoznavanje hrane je mislila, da je **čihuahua** pravzaprav muffin (res sta si podobna!)

## Kaj se naučimo iz napak?
Tako kot ti, se tudi AI uči iz napak:
1. AI naredi napako
2. Ljudje jo popravijo
3. AI dobi nove primere
4. Naslednjič je boljša!

## Zakaj je to pomembno?
Ker ne smemo slepo zaupati AI! Vedno preveri:
- Ali je odgovor smiselen?
- Ali imam dovolj informacij?
- Bi moral vprašati odraslega?

Kritično razmišljanje je tvoja super moč, ki je AI nima!',
  20,
  '[{"type": "quiz", "title": "Res ali ne?", "description": "Ali je AI odgovor pravilen? Preveri sam!"}, {"type": "activity", "title": "Preveri AI", "description": "Vprašaj glasovnega pomočnika nekaj in preveri, ali je odgovor pravilen"}]'
FROM courses c WHERE c.slug = 'ai-basics-for-kids';

-- Module 4: Ustvarjajmo z AI (3 lessons)
INSERT INTO course_lessons (course_id, module_index, lesson_index, title, slug, content_type, content, duration_minutes, activities)
SELECT c.id, 3, 0,
  'Pogovor z AI',
  'pogovor-z-ai',
  'text',
  '# Pogovor z AI

Zdaj ko veš, kaj je AI in kako se uči, je čas, da se pogovarjaš z njo!

## Kaj je chatbot?
Chatbot je AI program, s katerim se lahko pogovarjaš. Pišeš mu sporočila in ti odgovori!

## Kako pisati dobre ukaze (prompte)?
Ukaz ali **prompt** je to, kar napišeš AI. Boljši ko je ukaz, boljši bo odgovor!

### Slabi ukazi:
- "Povej mi nekaj" (preveč splošno!)
- "asdjkfh" (AI ne razume nesmiselnega besedila)

### Dobri ukazi:
- "Razloži mi, kako deluje mavrica, kot da sem star 8 let"
- "Napiši kratko zgodbo o psu, ki leti v vesolje"
- "Kakšni dinozavri so živeli v Sloveniji?"

## Pravila za pogovor z AI
1. **Bodi jasen** - povej natančno, kaj želiš
2. **Bodi prijazen** - čeprav AI nima čustev, je dobra navada
3. **Preveri odgovore** - AI se lahko zmoti
4. **Ne deli osebnih podatkov** - nikoli ne povej AI svojega pravega imena, naslova ali šole
5. **Vprašaj starše** - če nisi prepričan, vprašaj odraslega

## Poskusi!
Na naši platformi imaš AI prijatelja, s katerim se lahko pogovarjaš. Poskusi mu zastaviti zanimivo vprašanje!',
  20,
  '[{"type": "quiz", "title": "Dober ali slab prompt?", "description": "Razvrsti ukaze na dobre in slabe"}, {"type": "activity", "title": "Moj prvi pogovor", "description": "Zapiši 3 vprašanja, ki bi jih rad vprašal AI, in jih preizkusi"}]'
FROM courses c WHERE c.slug = 'ai-basics-for-kids';

INSERT INTO course_lessons (course_id, module_index, lesson_index, title, slug, content_type, content, duration_minutes, activities)
SELECT c.id, 3, 1,
  'Ustvarjanje zgodb z AI',
  'ustvarjanje-zgodb',
  'text',
  '# Ustvarjanje zgodb z AI

Ena od najzabavnejših stvari, ki jih lahko narediš z AI, je ustvarjanje zgodb! AI ti lahko pomaga napisati zgodbe, ki si jih sam ne bi izmislil.

## Kako AI piše zgodbe?
AI je prebrala MILIJONE zgodb in se naučila:
- Kako se zgodbe začnejo
- Kakšni liki nastopajo
- Kako se zgodbe končajo
- Kakšen jezik uporabljajo

## Ustvari svojo zgodbo!
Poskusi ta recept za zgodbo:

### Korak 1: Izberi lika
Kdo je v tvoji zgodbi? Robot? Princeska? Govoreča mačka?

### Korak 2: Izberi kraj
Kje se zgodba dogaja? V vesolju? Pod morjem? V čarobnem gozdu?

### Korak 3: Izberi problem
Kaj se zgodi? Se lik izgubi? Mora rešiti uganko? Najde skrivnostno karto?

### Korak 4: Vprašaj AI
Zdaj vse skupaj povej AI: "Napiši zgodbo o govoreči mački v vesolju, ki mora najti pot domov."

## Ti si avtor!
AI ti pomaga, ampak TI si pravi avtor. Ti izbereš ideje, AI jih samo zapiše. Lahko spremeniš karkoli - dodaš nove dele, odstraniš kar ti ni všeč, ali nadaljuješ zgodbo po svoje.

## Pomembno
Zgodba, ki jo ustvariš z AI, je TVOJA zgodba. Ti si jo zamislil, AI je bila samo tvoj pomočnik pri pisanju.',
  20,
  '[{"type": "quiz", "title": "Zgodba kviz", "description": "Odgovori na vprašanja o ustvarjanju z AI"}, {"type": "activity", "title": "Moja AI zgodba", "description": "Uporabi AI prijatelja na platformi in ustvari svojo kratko zgodbo"}]'
FROM courses c WHERE c.slug = 'ai-basics-for-kids';

INSERT INTO course_lessons (course_id, module_index, lesson_index, title, slug, content_type, content, duration_minutes, activities)
SELECT c.id, 3, 2,
  'Kaj sem se naučil o AI',
  'kaj-sem-se-naucil',
  'text',
  '# Kaj sem se naučil o AI

Čestitke! Prišel si do zadnje lekcije tečaja AI osnove! Poglejmo, kaj vse si se naučil.

## Povzetek tvojega znanja

### Modul 1: Kaj je AI?
- AI je računalniški program, ki se uči iz podatkov
- Računalniki razmišljajo drugače kot ljudje
- AI ima zanimivo zgodbo, ki se je začela leta 1950

### Modul 2: AI okrog nas
- AI je v telefonih, igrah in doma
- Pomaga nam vsak dan na načine, ki jih niti ne opazimo
- Ni vse tehnologije AI - nekatere naprave so preproste

### Modul 3: Kako se AI uči
- AI se uči iz primerov, tako kot ti
- Išče vzorce v podatkih
- Včasih se zmoti - in to je OK!

### Modul 4: Ustvarjajmo z AI
- Naučil si se pisati dobre ukaze (prompte)
- Ustvarjal si zgodbe skupaj z AI
- Spoznal si, da si TI avtor, AI je pomočnik

## Tvoj AI diplom
Zdaj uradno veš več o AI kot večina odraslih! Lahko se ponosno imenuješ **AI raziskovalec**.

## Kaj naprej?
Če te AI zanima še bolj, poskusi naše druge tečaje:
- **Programiranje z AI** - nauči se kodirati s pomočjo AI
- **AI umetniški studio** - ustvarjaj umetnost z AI
- **AI varnost in etika** - nauči se odgovorne uporabe AI

Hvala, da si se učil z nami! Tvoja AI pustolovščina se šele začenja!',
  15,
  '[{"type": "quiz", "title": "Veliki končni kviz", "description": "Preveri vse, kar si se naučil v celotnem tečaju!"}, {"type": "activity", "title": "Moja AI predstavitev", "description": "Pripravi kratko predstavitev (3 stavke) o tem, kaj je AI, za svoje prijatelje ali družino"}]'
FROM courses c WHERE c.slug = 'ai-basics-for-kids';
