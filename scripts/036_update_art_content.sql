-- Update AI Art Studio course content: fix diacritics, grammar, improve readability
-- Course: ai-art-studio (10 lessons)

-- Module 1, Lesson 0: Kaj je AI umetnost?
UPDATE course_lessons
SET content = E'# Kaj je AI umetnost?\n\nUmetnost + tehnologija = nekaj čudovitega! AI umetnost je nova oblika ustvarjanja, kjer ti in računalnik sodelujeta.\n\n---\n\n## Kako AI ustvarja slike?\n\nAI je videla MILIJONE slik in se naučila:\n\n- Kakšne barve gredo skupaj.\n- Kako izgledajo različni slogi (akvarel, olje, risanka).\n- Kaj so predmeti na slikah (drevo, hiša, oseba).\n\nKo ji rečeš "nariši sončen dan na plaži", ona:\n\n1. Razume besede.\n2. Pomisli na vse plaže, ki jih je videla.\n3. Ustvari NOVO sliko, ki ne obstaja nikjer drugje!\n\n---\n\n## Ali je to prava umetnost?\n\nRazmisli:\n\n- Umetnik izbere temo, barve, slog -- TI izbereš, kaj AI nariše.\n- Umetnik uporabi čopič -- TI uporabiš besede (prompt).\n- Umetnik interpretira svet -- TI interpretiraš rezultat AI.\n\n---\n\n## Slavni primeri AI umetnosti\n\n- **DALL-E** -- sistem, ki ustvari slike iz besedila.\n- **Midjourney** -- ustvarja neverjetno realistične slike.\n- **Stable Diffusion** -- brezplačno AI orodje za ustvarjanje.\n\n---\n\n## Tvoja vloga\n\nTI si umetnik. AI je tvoj čopič. Brez tvoje ideje AI ne more ustvariti ničesar!',
    updated_at = NOW()
WHERE title = 'Kaj je AI umetnost?'
  AND course_id = (SELECT id FROM courses WHERE slug = 'ai-art-studio');

-- Module 1, Lesson 1: Pisanje promptov za slike
UPDATE course_lessons
SET content = E'# Pisanje promptov za slike\n\nPrompt je opis slike, ki jo želiš ustvariti. Boljši kot je prompt, boljša bo slika!\n\n---\n\n## Anatomija dobrega prompta\n\nDober prompt ima 4 dele:\n\n### 1. Predmet (KAJ?)\n\nKaj je na sliki? "Mačka", "grad", "vesoljska ladja".\n\n### 2. Podrobnosti (KAKŠEN?)\n\nOpiši predmet: "puhasta oranžna mačka z modrimi očmi".\n\n### 3. Okolje (KJE?)\n\nKje se nahaja: "na drevesu v čarobnem gozdu ponoči".\n\n### 4. Slog (KAKO?)\n\nKakšna naj bo slika: "v slogu akvarela, svetle barve".\n\n---\n\n## Primeri\n\n**Slab prompt:** "Mačka" -- dobiš osnovno sliko mačke.\n\n**Dober prompt:** "Puhasta oranžna mačka z modrimi očmi, sedi na drevesu v čarobnem gozdu ponoči, svetleče gobe okrog nje, v slogu risanke Miyazaki, topli toni."\n\n---\n\n## Čarobne besede za prompte\n\n- **"podrobno"** -- doda več detajlov.\n- **"svetle barve"** -- vesele slike.\n- **"dramatična osvetlitev"** -- napete slike.\n- **"v slogu [umetnika]"** -- posnemaj slog.',
    updated_at = NOW()
WHERE title = 'Pisanje promptov za slike'
  AND course_id = (SELECT id FROM courses WHERE slug = 'ai-art-studio');

-- Module 1, Lesson 2: Umetnostni slogi skozi zgodovino
UPDATE course_lessons
SET content = E'# Umetnostni slogi skozi zgodovino\n\nDa bi ustvarjal boljšo AI umetnost, je dobro poznati različne umetnostne sloge!\n\n---\n\n## Impresionizem (1870)\n\nMehke poteze, svetle barve, prizori iz narave.\n\n- **Umetniki:** Claude Monet, Renoir\n- **Prompt:** "v slogu impresionizma, mehke poteze čopiča"\n\n---\n\n## Kubizem (1900)\n\nGeometrijske oblike, več zornih kotov hkrati.\n\n- **Umetniki:** Pablo Picasso, Georges Braque\n- **Prompt:** "v slogu kubizma, geometrijske oblike"\n\n---\n\n## Pop art (1950)\n\nŽive barve, ponavljajoči vzorci, popularna kultura.\n\n- **Umetniki:** Andy Warhol, Roy Lichtenstein\n- **Prompt:** "pop art slog, žive barve, pike"\n\n---\n\n## Digitalna umetnost (danes)\n\nNeskončne možnosti -- od realističnega do fantazijskega.\n\n- **Prompt:** "digitalna umetnost, podrobno, svetleče barve"\n\n---\n\n## Risanka / Anime\n\nVelike oči, poenostavljene oblike, izrazite barve.\n\n- **Prompt:** "anime slog" ali "risanka slog"\n\n---\n\n## Izziv\n\nIzberi isti predmet in ga ustvari v 5 različnih slogih. Primerjaj rezultate!',
    updated_at = NOW()
WHERE title = 'Umetnostni slogi skozi zgodovino'
  AND course_id = (SELECT id FROM courses WHERE slug = 'ai-art-studio');

-- Module 2, Lesson 0: Moja prva AI slika
UPDATE course_lessons
SET content = E'# Moja prva AI slika\n\nČas je, da ustvariš svojo prvo AI sliko!\n\n---\n\n## Korak za korakom\n\n### 1. Izberi temo\n\nKaj te navdušuje? Živali? Vesolje? Pravljice?\n\n### 2. Napiši prompt\n\nUporabi recept:\n\n- **Predmet:** pav\n- **Podrobnosti:** z zlatim perjem, razprostrt rep\n- **Okolje:** v čarobnem vrtu s svetlečimi rožami\n- **Slog:** fantazijski, podrobno, svetle barve\n\nCeloten prompt:\n\n> "Veličasten pav z zlatim perjem in razprostrtim repom, stoji v čarobnem vrtu s svetlečimi rožami, fantazijski slog, podrobno, svetle barve, magična atmosfera."\n\n### 3. Ustvari!\n\nUporabi AI orodje za ustvarjanje slik na naši platformi.\n\n### 4. Oceni in izboljšaj\n\nPoglej rezultat:\n\n- Ali je to, kar si si zamislil?\n- Kaj bi spremenil?\n- Dodaj ali odstrani besede iz prompta.\n\n---\n\n## Nasveti\n\n- Daljši prompt = bolj specifična slika.\n- Poskusi različne sloge za isti predmet.\n- Če ti ni všeč, spremeni samo en del.',
    updated_at = NOW()
WHERE title = 'Moja prva AI slika'
  AND course_id = (SELECT id FROM courses WHERE slug = 'ai-art-studio');

-- Module 2, Lesson 1: Zgodbe s slikami
UPDATE course_lessons
SET content = E'# Zgodbe s slikami\n\nKaj če bi ustvaril celotno slikovno zgodbo s pomočjo AI?\n\n---\n\n## Slikovnica z AI\n\nSlikovnica je zgodba, ki jo spremljajo slike. Z AI lahko ustvariš oboje!\n\n---\n\n## Projekt: Moja AI slikovnica\n\n### Korak 1: Napiši zgodbo (5--8 stavkov)\n\nPrimer:\n\n1. Mala robotka Bip se je prebudila v svoji delavnici.\n2. Skozi okno je videla, da je padel sneg.\n3. Nikoli še ni videla snega! Šla je ven.\n4. Naredila je svojega prvega snežaka -- snežnega robota!\n5. Od takrat ima Bip najljubši letni čas -- zimo.\n\n### Korak 2: Ustvari slike za vsak stavek\n\nZa vsak stavek napiši prompt z istim opisom lika!\n\n### Korak 3: Sestavi slikovnico\n\nZdruži besedilo in slike v celoto!\n\n---\n\n## Nasveti za doslednost\n\n**Problem:** AI lahko nariše robota drugače na vsaki sliki!\n\n**Rešitev:** Uporabi čim bolj podoben opis lika v vsakem promptu:\n\n> "Majhna srebrna robotka z modrimi očmi in rdečo pentljo" -- enako v vsakem promptu!',
    updated_at = NOW()
WHERE title = 'Zgodbe s slikami'
  AND course_id = (SELECT id FROM courses WHERE slug = 'ai-art-studio');

-- Module 2, Lesson 2: Napredne tehnike generiranja
UPDATE course_lessons
SET content = E'# Napredne tehnike generiranja\n\nKo obvladaš osnove, je čas za naprednejše trike!\n\n---\n\n## Tehnika 1: Negativni prompt\n\nPovej AI, česa NE želiš:\n\n- "Brez besedila na sliki."\n- "Brez ljudi."\n- "Brez temnih barv."\n\n---\n\n## Tehnika 2: Mešanje slogov\n\nKombiniraj dva sloga:\n\n- "V slogu anime + akvarel" -- edinstvena kombinacija!\n- "Steampunk + narava" -- mehanska narava.\n- "Retro + vesolje" -- vintage vesoljska pustolovščina.\n\n---\n\n## Tehnika 3: Razpoloženje in atmosfera\n\nDodaj čustvene opise:\n\n- **Veselo:** svetlo, barvito, sončno, toplo.\n- **Skrivnostno:** megleno, temno, skrivnostno, luna.\n- **Epsko:** dramatično, veličastno, zlato, mogočno.\n\n---\n\n## Tehnika 4: Perspektiva\n\nSpremeni zorni kot:\n\n- "Od zgoraj" (ptičja perspektiva).\n- "Od spodaj" (žabja perspektiva).\n- "Bližnji posnetek" (detajl).\n- "Širok pogled" (panorama).\n\n---\n\n## Tehnika 5: Osvetlitev\n\n- **"Zlata ura"** -- topla svetloba sončnega zahoda.\n- **"Neonske luči"** -- futuristična, mestna.\n- **"Sveča"** -- intimno, toplo.\n- **"Severni sij"** -- magično, barvito.',
    updated_at = NOW()
WHERE title = 'Napredne tehnike generiranja'
  AND course_id = (SELECT id FROM courses WHERE slug = 'ai-art-studio');

-- Module 3, Lesson 0: Kako AI ustvarja glasbo
UPDATE course_lessons
SET content = E'# Kako AI ustvarja glasbo\n\nAI ne ustvarja samo slik -- ustvarja tudi glasbo!\n\n---\n\n## Glasba je matematika\n\nTo je skrivnost glasbe -- je polna vzorcev in pravil:\n\n- **Ritem:** ponavljajoč vzorec udarcev.\n- **Melodija:** zaporedje not, ki sledijo pravilom.\n- **Harmonija:** kombinacija not, ki zvenijo dobro skupaj.\n\nAI se lahko nauči teh pravil!\n\n---\n\n## Kako AI ustvari pesem?\n\n1. AI posluša tisoče pesmi.\n2. Najde vzorce: "po akordu C pogosto pride G."\n3. Ustvari novo melodijo, ki sledi tem vzorcem.\n4. Rezultat je nova pesem, ki nikoli prej ni obstajala!\n\n---\n\n## AI glasbena orodja\n\n- **Chrome Music Lab** -- brezplačno, zabavno eksperimentiranje.\n- **AIVA** -- AI skladatelj za klasično glasbo.\n- **Boomy** -- ustvari pesem v sekundah.\n\n---\n\n## Eksperiment z Music Lab\n\nObišči **musiclab.chromeexperiments.com** in poskusi:\n\n- **Song Maker** -- ustvari melodijo s kliki.\n- **Rhythm** -- eksperimentiraj z ritmi.\n- **Kandinsky** -- pretvori risbo v glasbo!\n\n---\n\n## Zanimivost\n\nNekatere AI pesmi so tako dobre, da jih ljudje ne morejo ločiti od pesmi, ki jih je napisal človek!',
    updated_at = NOW()
WHERE title = 'Kako AI ustvarja glasbo'
  AND course_id = (SELECT id FROM courses WHERE slug = 'ai-art-studio');

-- Module 3, Lesson 1: Zvočna pokrajina
UPDATE course_lessons
SET content = E'# Zvočna pokrajina\n\nZvočna pokrajina je zbirka zvokov, ki ustvarijo atmosfero.\n\n---\n\n## Kaj je zvočna pokrajina?\n\n- **Gozd:** ptičje petje, šelestenje listja, potok.\n- **Morje:** valovi, galeb, veter.\n- **Mesto:** avtomobili, ljudje, glasba iz lokalov.\n- **Vesolje:** tišina ... ali sci-fi zvoki!\n\n---\n\n## AI in zvoki\n\nAI lahko ustvari zvoke, ki ne obstajajo:\n\n- Kako zveni planet iz drugega osončja?\n- Kako zveni barva modra?\n- Kako zveni vonj po rožah?\n\n---\n\n## Projekt: Moja zvočna zgodba\n\nZdruži slike IN zvoke v multimedijsko izkušnjo:\n\n1. **Ustvari 3 AI slike** za svojo zgodbo.\n2. **Ustvari zvočno pokrajino** za vsako sceno.\n3. **Združi** v predstavitev.\n\n### Primer:\n\n- **Scena 1: Gozd** -- ptičje petje, nežna melodija.\n- **Scena 2: Nevihta** -- grmenje, dež, dramatična glasba.\n- **Scena 3: Mavrica** -- tihi zvonci, vesela melodija.\n\n---\n\n## Sinestezija\n\nSinestezija je, ko en čut sproži drugega:\n\n- Slišiš barvo.\n- Vidiš glasbo.\n- Okusiš obliko.\n\nAI nam pomaga izkusiti sinestezijo -- pretvori slike v glasbo ali glasbo v slike!',
    updated_at = NOW()
WHERE title = 'Zvočna pokrajina'
  AND course_id = (SELECT id FROM courses WHERE slug = 'ai-art-studio');

-- Module 4, Lesson 0: Zaključna razstava
UPDATE course_lessons
SET content = E'# Zaključna razstava -- moj AI portfolio\n\nČestitke! Si na zadnji lekciji AI umetniškega studia! Čas je za tvojo zaključno razstavo.\n\n---\n\n## Zaključni projekt: AI razstava\n\nUstvari mini umetniško razstavo s 5 deli:\n\n### 1. Portret (oseba ali žival)\n\nUstvari podroben portret v izbranem slogu.\n\n### 2. Pokrajina (narava ali mesto)\n\nUstvari čudovito pokrajino z naprednimi tehnikami osvetlitve.\n\n### 3. Fantazija (izmišljeni svet)\n\nPusti domišljiji prosto pot in ustvari svet, ki ne obstaja!\n\n### 4. Zgodba v sliki\n\nEna sama slika, ki pripoveduje celotno zgodbo.\n\n### 5. Tvoja izbira\n\nKarkoli želiš -- to je tvoj prosti prostor za ustvarjanje!\n\n---\n\n## Za vsako delo napiši:\n\n1. **Naslov** -- ime tvojega dela.\n2. **Prompt** -- kaj si napisal AI.\n3. **Razmišljanje** -- zakaj si izbral to temo ali slog.\n4. **Kaj sem se naučil** -- kaj si se naučil pri ustvarjanju.\n\n---\n\n## Umetnik si TI\n\nSkozi ta tečaj si spoznal:\n\n- AI je orodje, tako kot čopič ali svinčnik.\n- TVOJA ustvarjalnost je tista, ki naredi umetnost posebno.\n- Dober prompt je umetnost sam po sebi.\n- Različni slogi in tehnike dajejo različne rezultate.\n\nHvala, da si bil del AI umetniškega studia! Tvoja ustvarjalnost nima meja.',
    updated_at = NOW()
WHERE title = 'Zaključna razstava - moj AI portfolio'
  AND course_id = (SELECT id FROM courses WHERE slug = 'ai-art-studio');
