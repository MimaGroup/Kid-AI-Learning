-- Seed lessons for "AI umetniški studio" (ai-art-studio) - 10 lessons
-- Module 1: Uvod v AI umetnost (3 lessons)
INSERT INTO course_lessons (course_id, module_index, lesson_index, title, slug, content_type, content, duration_minutes, activities)
SELECT c.id, 0, 0,
  'Kaj je AI umetnost?',
  'kaj-je-ai-umetnost',
  'text',
  '# Kaj je AI umetnost?

Umetnost + tehnologija = nekaj čudovitega! AI umetnost je nova oblika ustvarjanja, kjer ti in računalnik sodelujeta.

## Kako AI ustvarja slike?
AI je videla MILIJONE slik in se naučila:
- Kakšne barve gredo skupaj
- Kako izgledajo različni stili (akvarel, olje, risanka)
- Kaj so predmeti na slikah (drevo, hiša, oseba)

Ko ji rečeš "nariši sončen dan na plaži", ona:
1. Razume besede
2. Pomisli na vse plaže, ki jih je videla
3. Ustvari NOVO sliko, ki ne obstaja nikjer drugje!

## Ali je to prava umetnost?
To je veliko vprašanje! Razmisli:
- Umetnik izbere temo, barve, slog → TI izbereš, kaj AI nariše
- Umetnik uporabi čopič → TI uporabiš besede (prompt)
- Umetnik interpretira svet → TI interpretiraš rezultat AI

## Slavni primeri AI umetnosti
- **DALL-E** - Odprt AI sistem, ki ustvari slike iz besedila
- **Midjourney** - Ustvarja neverjetno realistične slike
- **Stable Diffusion** - Brezplačno AI orodje za ustvarjanje

## Tvoja vloga
TI si umetnik. AI je tvoj čopič. Brez tvoje ideje AI ne more ustvariti ničesar!',
  15,
  '[{"type": "quiz", "title": "AI umetnost kviz", "description": "Kaj je AI umetnost in kako deluje?"}, {"type": "activity", "title": "Razmisli o umetnosti", "description": "Napiši 5 idej za slike, ki bi jih rad ustvaril z AI"}]'
FROM courses c WHERE c.slug = 'ai-art-studio';

INSERT INTO course_lessons (course_id, module_index, lesson_index, title, slug, content_type, content, duration_minutes, activities)
SELECT c.id, 0, 1,
  'Pisanje promptov za slike',
  'pisanje-promptov-slike',
  'text',
  '# Pisanje promptov za slike

Prompt je opis slike, ki jo želiš ustvariti. Boljši ko je prompt, boljša bo slika!

## Anatomija dobrega prompta
Dober prompt ima 4 dele:

### 1. Predmet (KAJ?)
Kaj je na sliki? "Mačka", "grad", "vesoljska ladja"

### 2. Podrobnosti (KAKŠEN?)
Opisi predmet: "puhasta oranžna mačka z modrimi očmi"

### 3. Okolje (KJE?)
Kje se nahaja: "na drevesu v čarobnem gozdu ponoči"

### 4. Slog (KAKO?)
Kakšna naj bo slika: "v stilu akvarela, svetle barve"

## Primeri

### Slab prompt:
"Mačka" → Dobiš osnovno sliko mačke. Dolgočasno!

### Dober prompt:
"Puhasta oranžna mačka z modrimi očmi, sedi na drevesu v čarobnem gozdu ponoči, svetleče gobe okrog nje, v stilu risanke Miyazaki, topli toni"

## Čarobne besede za prompte
Te besede pogosto izboljšajo rezultat:
- **"podrobno"** - doda več detajlov
- **"svetle barve"** - vesele slike
- **"dramatična osvetlitev"** - napete slike
- **"v stilu [umetnika]"** - posnemaj slog (akvarel, olje, risanka)

## Poskusi!
Na naši platformi imaš AI orodje za ustvarjanje slik. Začni s preprostim promptom in ga izboljšuj!',
  20,
  '[{"type": "quiz", "title": "Prompt kviz", "description": "Kateri prompt bo dal boljšo sliko?"}, {"type": "activity", "title": "Moji prompti", "description": "Napiši 3 prompte (slab, dober, odličen) za isto temo in primerjaj rezultate"}]'
FROM courses c WHERE c.slug = 'ai-art-studio';

INSERT INTO course_lessons (course_id, module_index, lesson_index, title, slug, content_type, content, duration_minutes, activities)
SELECT c.id, 0, 2,
  'Umetnostni slogi skozi zgodovino',
  'umetnostni-slogi',
  'text',
  '# Umetnostni slogi skozi zgodovino

Da bi ustvarjal boljšo AI umetnost, je dobro poznati različne umetnostne sloge!

## Slog 1: Impresionizem
- **Kdaj**: 1870-ih
- **Kako izgleda**: mehke poteze, svetle barve, prizori iz narave
- **Slavni umetniki**: Claude Monet, Pierre-Auguste Renoir
- **Za prompt**: "v stilu impresionizma, mehke poteze čopiča"

## Slog 2: Kubizem
- **Kdaj**: 1900-ih
- **Kako izgleda**: geometrijske oblike, več zornih kotov hkrati
- **Slavni umetniki**: Pablo Picasso, Georges Braque
- **Za prompt**: "v stilu kubizma, geometrijske oblike"

## Slog 3: Pop art
- **Kdaj**: 1950-ih
- **Kako izgleda**: žive barve, ponavljajoči vzorci, iz popularne kulture
- **Slavni umetniki**: Andy Warhol, Roy Lichtenstein
- **Za prompt**: "pop art slog, žive barve, pike"

## Slog 4: Digitalna umetnost
- **Kdaj**: danes!
- **Kako izgleda**: neskončne možnosti - od realističnega do fantazijskega
- **Za prompt**: "digitalna umetnost, podrobno, svetleče barve"

## Slog 5: Risanka / Anime
- **Kdaj**: ves 20. in 21. stoletje
- **Kako izgleda**: velike oči, poenostavljene oblike, izrazite barve
- **Za prompt**: "anime slog" ali "risanka slog"

## Izziv
Izberi isti predmet (npr. mačko) in jo ustvari v 5 različnih slogih. Primerjaj rezultate!',
  20,
  '[{"type": "quiz", "title": "Umetnostni slogi", "description": "Prepoznaj različne umetnostne sloge"}, {"type": "activity", "title": "5 slogov, 1 predmet", "description": "Ustvari isto stvar v 5 različnih slogih z AI"}]'
FROM courses c WHERE c.slug = 'ai-art-studio';

-- Module 2: Generiranje slik (3 lessons)
INSERT INTO course_lessons (course_id, module_index, lesson_index, title, slug, content_type, content, duration_minutes, activities)
SELECT c.id, 1, 0,
  'Moja prva AI slika',
  'moja-prva-ai-slika',
  'text',
  '# Moja prva AI slika

Čas je, da ustvariš svojo prvo AI sliko!

## Korak za korakom

### 1. Izberi temo
Kaj te navdušuje? Živali? Vesolje? Pravljice? Izberi nekaj, kar ti je všeč!

### 2. Napiši prompt
Uporabi recept iz prejšnje lekcije:
- **Predmet**: pav
- **Podrobnosti**: z zlatim perjem, razprostrt rep
- **Okolje**: v čarobnem vrtu s svetlečimi rožami
- **Slog**: fantazijski, podrobno, svetle barve

Celoten prompt: "Veličasten pav z zlatim perjem in razprostrtim repom, stoji v čarobnem vrtu s svetlečimi rožami, fantazijski slog, podrobno, svetle barve, magična atmosfera"

### 3. Ustvari!
Uporabi AI orodje za ustvarjanje slik na naši platformi in vnesi svoj prompt.

### 4. Oceni in izboljšaj
Poglej rezultat:
- Ali je to, kar si si zamislil?
- Kaj bi spremenil?
- Dodaj ali odstrani besede iz prompta

## Nasveti za boljše rezultate
- Daljši prompt = bolj specifična slika
- Poskusi različne sloge za isti predmet
- Če ti ni všeč, ne spremeni vsega - spremenij samo en del

## Tvoja umetniška zbirka
Shrani svoje najboljše slike! Začni graditi svojo AI umetniško zbirko.',
  25,
  '[{"type": "quiz", "title": "Ustvarjanje slik", "description": "Kaj naredi prompt boljši?"}, {"type": "activity", "title": "3 slike", "description": "Ustvari 3 AI slike na različne teme in izberi svojo najljubšo"}]'
FROM courses c WHERE c.slug = 'ai-art-studio';

INSERT INTO course_lessons (course_id, module_index, lesson_index, title, slug, content_type, content, duration_minutes, activities)
SELECT c.id, 1, 1,
  'Zgodbe s slikami',
  'zgodbe-s-slikami',
  'text',
  '# Zgodbe s slikami

Kaj če bi ustvaril celotno slikovno zgodbo s pomočjo AI?

## Slikovnica z AI
Slikovnica je zgodba, ki jo spremlajajo slike. Z AI lahko ustvariš oboje!

## Projekt: Moja AI slikovnica

### Korak 1: Napiši zgodbo (5-8 stavkov)
Primer:
1. "Mala robotka Bip se je prebudila v svoji delavnici."
2. "Skozi okno je videla, da je padel sneg."
3. "Nikoli še ni videla snega! Šla je ven."
4. "Naredila je svojega prvega snežaka - snežnega robota!"
5. "Od takrat ima Bip najljubši letni čas - zimo."

### Korak 2: Ustvari slike za vsak stavek
Za vsak stavek napiši prompt:
1. "Majhna simpatična robotka z modrimi očmi, se prebuja v udobni delavnici polni orodij, topla svetloba, stil otroške knjige"
2. "Pogled skozi okno delavnice na zasneženo pokrajino, čudovit zimski dan, stil otroške knjige"
...

### Korak 3: Sestavi slikovnico
Združi besedilo in slike v celoto!

## Nasveti za konsistentnost
Problem: AI lahko nariše robota drugače na vsaki sliki!
Rešitev: Uporabi čim bolj podoben opis lika v vsakem promptu:
"Majhna srebrna robotka z modrimi očmi in rdečo pentljo" - enako v vsakem promptu!',
  30,
  '[{"type": "quiz", "title": "Slikovnica kviz", "description": "Kako ustvariš konsistentno AI slikovnico?"}, {"type": "activity", "title": "Moja slikovnica", "description": "Napiši kratko zgodbo (5 stavkov) in ustvari AI sliko za vsak stavek"}]'
FROM courses c WHERE c.slug = 'ai-art-studio';

INSERT INTO course_lessons (course_id, module_index, lesson_index, title, slug, content_type, content, duration_minutes, activities)
SELECT c.id, 1, 2,
  'Napredne tehnike generiranja',
  'napredne-tehnike-generiranja',
  'text',
  '# Napredne tehnike generiranja

Ko obvladaš osnove, je čas za naprednejše trike!

## Tehnika 1: Negativni prompt
Povej AI, česa NE želiš:
- "Brez besedila na sliki"
- "Brez ljudi"
- "Brez temnih barv"

## Tehnika 2: Mešanje slogov
Kombiniraj dva sloga:
- "V stilu anime + akvarel" → edinstvena kombinacija!
- "Steampunk + narava" → mehanična narava
- "Retro + vesolje" → vintage vesoljska pustolovščina

## Tehnika 3: Razpoloženje in atmosfera
Dodaj čustvene opise:
- **Veselo**: "svetlo, barvito, sončno, toplo"
- **Skrivnostno**: "megleno, temno, skrivnostno, luna"
- **Epsko**: "dramatično, veličastno, zlato, mogočno"

## Tehnika 4: Perspektiva
Spremeni zorni kot:
- "Od zgoraj" (ptičja perspektiva)
- "Od spodaj" (žabja perspektiva)
- "Bližnji posnetek" (detajl)
- "Širok pogled" (panorama)

## Tehnika 5: Osvetlitev
Svetloba spremeni vse!
- "Zlata ura" - topla svetloba sončnega zahoda
- "Neonske luči" - futuristična, mestna
- "Sveča" - intimno, toplo
- "Severni sij" - magično, barvito

## Izziv
Ustvari 4 verzije iste scene z različno osvetlitvijo in primerjaj, kako se spremeni razpoloženje!',
  25,
  '[{"type": "quiz", "title": "Napredne tehnike", "description": "Katere napredne tehnike izboljšajo AI slike?"}, {"type": "activity", "title": "Eksperiment", "description": "Ustvari 4 verzije iste scene z različnimi tehnikami"}]'
FROM courses c WHERE c.slug = 'ai-art-studio';

-- Module 3: Glasba in AI (2 lessons)
INSERT INTO course_lessons (course_id, module_index, lesson_index, title, slug, content_type, content, duration_minutes, activities)
SELECT c.id, 2, 0,
  'Kako AI ustvarja glasbo',
  'kako-ai-ustvarja-glasbo',
  'text',
  '# Kako AI ustvarja glasbo

AI ne ustvarja samo slik - ustvarja tudi glasbo! Poglejmo, kako.

## Glasba je matematika
To je skrivnost glasbe - je polna vzorcev in pravil:
- **Ritem**: ponavljajoč vzorec udarcev
- **Melodija**: zaporedje not, ki sledijo pravilom
- **Harmonija**: kombinacija not, ki zvenijo dobro skupaj

AI se lahko nauči teh pravil!

## Kako AI ustvari pesem?
1. AI posluša tisoče pesmi
2. Najde vzorce: "po akordu C pogosto pride G"
3. Ustvari novo melodijo, ki sledi tem vzorcem
4. Rezultat je nova pesem, ki nikoli prej ni obstajala!

## AI glasba orodja
- **Chrome Music Lab** - brezplačno, zabavno eksperimentiranje
- **AIVA** - AI komponist, ki ustvari klasično glasbo
- **Boomy** - ustvari pesem v sekundah

## Eksperiment z Music Lab
Obišči musiclab.chromeexperiments.com in poskusi:
- **Song Maker** - ustvari melodijo s kliki
- **Rhythm** - eksperimentiraj z ritmi
- **Kandinsky** - pretvori risbo v glasbo!

## Zanimivost
Nekatere AI pesmi so tako dobre, da jih ljudje ne morejo ločiti od pesmi, ki jih je napisal človek! Na tekmovanjih v glasbi so AI skladbe že zmagale proti človeškim.',
  20,
  '[{"type": "quiz", "title": "AI glasba kviz", "description": "Kako AI ustvarja glasbo?"}, {"type": "activity", "title": "Moja melodija", "description": "Ustvari kratko melodijo v Chrome Music Lab Song Maker"}]'
FROM courses c WHERE c.slug = 'ai-art-studio';

INSERT INTO course_lessons (course_id, module_index, lesson_index, title, slug, content_type, content, duration_minutes, activities)
SELECT c.id, 2, 1,
  'Zvočna pokrajina',
  'zvocna-pokrajina',
  'text',
  '# Zvočna pokrajina

Zvočna pokrajina je zbirka zvokov, ki ustvarijo atmosfero. Predstavljaj si zvoke gozda, morja ali mesta!

## Kaj je zvočna pokrajina?
- **Gozd**: ptičje petje, šelestenje listja, potok
- **Morje**: valovi, galeb, veter
- **Mesto**: avtomobili, ljudje, glasba iz lokalov
- **Vesolje**: tišina... ali sci-fi zvoki!

## AI in zvoki
AI lahko ustvari zvoke, ki ne obstajajo:
- Kako zveni planeta iz drugega osončja?
- Kako zveni barva modra?
- Kako zveni vonj po rožah?

## Projekt: Moja zvočna zgodba
Združi slike IN zvoke v multimedijsko izkušnjo:
1. **Ustvari 3 AI slike** za svojo zgodbo
2. **Ustvari zvočno pokrajino** za vsako sceno
3. **Združi** v predstavitev

### Primer:
Scena 1: Gozd - ptičje petje, nežna melodija
Scena 2: Nevihta - grmenje, dež, dramatična glasba
Scena 3: Mavrica - tihi zvonci, vesela melodija

## Sinestezija
Sinestezija je ko en čut sproži drugega:
- Slišiš barvo
- Vidiš glasbo
- Okušaš obliko

AI nam pomaga izkusiti sinestezijo - pretvori slike v glasbo ali glasbo v slike!',
  25,
  '[{"type": "quiz", "title": "Zvočna pokrajina kviz", "description": "Kaj je zvočna pokrajina?"}, {"type": "activity", "title": "Moja zvočna scena", "description": "Ustvari AI sliko in opiši, kakšna zvočna pokrajina bi jo spremljala"}]'
FROM courses c WHERE c.slug = 'ai-art-studio';

-- Module 4: Moj AI portfolio (2 lessons)
INSERT INTO course_lessons (course_id, module_index, lesson_index, title, slug, content_type, content, duration_minutes, activities)
SELECT c.id, 3, 0,
  'Ustvarjam svoj portfolio',
  'ustvarjam-portfolio',
  'text',
  '# Ustvarjam svoj portfolio

Portfolio je zbirka tvojih najboljših del. Čas je, da ustvariš svojega!

## Kaj je umetniški portfolio?
Portfolio je kot muzej tvojih najboljših stvaritev. Pravi umetniki imajo portfolie, da pokažejo svoje delo drugim.

## Tvoj AI portfolio
Zberi svoja najboljša dela iz tečaja:

### Kategorija 1: Slike
- Najboljša slika iz "Moja prva AI slika"
- Najboljša slika iz eksperimentov s slogi
- Najboljša slika iz naprednih tehnik

### Kategorija 2: Zgodbe
- Tvoja AI slikovnica
- Besedilo zgodbe

### Kategorija 3: Glasba
- Tvoja melodija iz Music Lab
- Opis zvočne pokrajine

## Kako predstaviti portfolio
Za vsako delo napiši:
1. **Naslov** - ime tvojega dela
2. **Prompt** - kaj si napisal AI
3. **Razmišljanje** - zakaj si izbral to temo/slog
4. **Kaj sem se naučil** - kaj si se naučil pri ustvarjanju

## Primer:
**Naslov**: "Čarobni gozd"
**Prompt**: "Gost čarobni gozd s svetlečimi gobami in svetluškami, megla med drevesi, fantazijski slog, topli toni, magična atmosfera"
**Razmišljanje**: "Rad imam gozd in rad si predstavljam, da je čaroben"
**Naučil sem se**: "Da z dodajanjem podrobnosti o osvetlitvi in atmosferi dobimo veliko boljšo sliko"',
  25,
  '[{"type": "quiz", "title": "Portfolio kviz", "description": "Kaj mora vsebovati dober portfolio?"}, {"type": "activity", "title": "Moj portfolio", "description": "Zberi svoja 3 najboljša dela in za vsako napiši opis"}]'
FROM courses c WHERE c.slug = 'ai-art-studio';

INSERT INTO course_lessons (course_id, module_index, lesson_index, title, slug, content_type, content, duration_minutes, activities)
SELECT c.id, 3, 1,
  'Zaključna razstava',
  'zakljucna-razstava',
  'text',
  '# Zaključna razstava

Čestitke! Si na zadnji lekciji AI umetniškega studia! Čas je za tvojo zaključno razstavo.

## Zaključni projekt: AI razstava
Ustvari mini umetniško razstavo s 5 deli:

### 1. Portret (oseba ali žival)
Ustvari podroben portret v izbranem slogu.

### 2. Pokrajina (narava ali mesto)
Ustvari čudovito pokrajino z naprednimi tehnikami osvetlitve.

### 3. Fantazija (izmišljeni svet)
Pusti domišljiji prosto pot in ustvari svet, ki ne obstaja!

### 4. Zgodba v sliki
Ena sama slika, ki pripoveduje celotno zgodbo.

### 5. Tvoja izbira
Karkoli želiš - to je tvoj prosti prostor za ustvarjanje!

## Umetnik si TI
Skozi ta tečaj si spoznal:
- AI je orodje, tako kot čopič ali svinčnik
- TVOJA kreativnost je tista, ki naredi umetnost posebno
- Dober prompt je umetnost sam po sebi
- Različni slogi in tehnike dajejo različne rezultate

## Kaj naprej?
- Nadaljuj z ustvarjanjem! Več ko vadiš, boljši boš
- Eksperimentiraj z novimi slogi
- Deli svoja dela s prijatelji in družino
- Poskusi naše druge tečaje za več znanja

Hvala, da si bil del AI umetniškega studia! Tvoja kreativnost nima meja.',
  30,
  '[{"type": "quiz", "title": "Veliki končni kviz", "description": "Preveri vse znanje iz tečaja AI umetnosti!"}, {"type": "activity", "title": "Moja razstava", "description": "Ustvari 5 AI slik za svojo razstavo in jih predstavi družini"}]'
FROM courses c WHERE c.slug = 'ai-art-studio';
