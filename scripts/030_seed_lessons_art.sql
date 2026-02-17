-- Seed lessons for "AI umetniški studio" (ai-art-studio) - 10 lessons
-- Module 1: Uvod v AI umetnost (3 lessons)
INSERT INTO course_lessons (course_id, module_index, lesson_index, title, content, content_type, duration_minutes, key_concepts)
SELECT c.id, 0, 0,
  'Kaj je AI umetnost?',
  E'# Kaj je AI umetnost?\n\nUmetnost + tehnologija = nekaj cudovitega! AI umetnost je nova oblika ustvarjanja, kjer ti in racunalnik sodelujeta.\n\n## Kako AI ustvarja slike?\nAI je videla MILIJONE slik in se naucila:\n- Kaksne barve gredo skupaj\n- Kako izgledajo razlicni stili (akvarel, olje, risanka)\n- Kaj so predmeti na slikah (drevo, hisa, oseba)\n\nKo ji reces "narisi soncen dan na plazi", ona:\n1. Razume besede\n2. Pomisli na vse plaze, ki jih je videla\n3. Ustvari NOVO sliko, ki ne obstaja nikjer drugje!\n\n## Ali je to prava umetnost?\nRazmisli:\n- Umetnik izbere temo, barve, slog - TI izberes, kaj AI narise\n- Umetnik uporabi copic - TI uporabis besede (prompt)\n- Umetnik interpretira svet - TI interpretiras rezultat AI\n\n## Slavni primeri AI umetnosti\n- **DALL-E** - sistem, ki ustvari slike iz besedila\n- **Midjourney** - ustvarja neverjetno realisticne slike\n- **Stable Diffusion** - brezplacno AI orodje za ustvarjanje\n\n## Tvoja vloga\nTI si umetnik. AI je tvoj copic. Brez tvoje ideje AI ne more ustvariti nicesar!',
  'text', 15,
  '["AI umetnost", "generativna umetnost", "DALL-E", "kreativnost"]'
FROM courses c WHERE c.slug = 'ai-art-studio'
ON CONFLICT (course_id, module_index, lesson_index) DO NOTHING;

INSERT INTO course_lessons (course_id, module_index, lesson_index, title, content, content_type, duration_minutes, key_concepts)
SELECT c.id, 0, 1,
  'Pisanje promptov za slike',
  E'# Pisanje promptov za slike\n\nPrompt je opis slike, ki jo zelis ustvariti. Boljsi ko je prompt, boljsa bo slika!\n\n## Anatomija dobrega prompta\nDober prompt ima 4 dele:\n\n### 1. Predmet (KAJ?)\nKaj je na sliki? "Macka", "grad", "vesoljska ladja"\n\n### 2. Podrobnosti (KAKSEN?)\nOpisi predmet: "puhasta oranzna macka z modrimi ocmi"\n\n### 3. Okolje (KJE?)\nKje se nahaja: "na drevesu v carobnem gozdu ponoci"\n\n### 4. Slog (KAKO?)\nKaksna naj bo slika: "v stilu akvarela, svetle barve"\n\n## Primeri\n**Slab prompt:** "Macka" - dobis osnovno sliko macke\n**Dober prompt:** "Puhasta oranzna macka z modrimi ocmi, sedi na drevesu v carobnem gozdu ponoci, svetlece gobe okrog nje, v stilu risanke Miyazaki, topli toni"\n\n## Carobne besede za prompte\n- **"podrobno"** - doda vec detajlov\n- **"svetle barve"** - vesele slike\n- **"dramaticna osvetlitev"** - napete slike\n- **"v stilu [umetnika]"** - posnemaj slog',
  'text', 20,
  '["prompt", "opis", "ključne besede", "specifičnost"]'
FROM courses c WHERE c.slug = 'ai-art-studio'
ON CONFLICT (course_id, module_index, lesson_index) DO NOTHING;

INSERT INTO course_lessons (course_id, module_index, lesson_index, title, content, content_type, duration_minutes, key_concepts)
SELECT c.id, 0, 2,
  'Umetnostni slogi skozi zgodovino',
  E'# Umetnostni slogi skozi zgodovino\n\nDa bi ustvarjal boljso AI umetnost, je dobro poznati razlicne umetnostne sloge!\n\n## Impresionizem (1870)\nMehke poteze, svetle barve, prizori iz narave.\nUmetniki: Claude Monet, Renoir\nPrompt: "v stilu impresionizma, mehke poteze copica"\n\n## Kubizem (1900)\nGeometrijske oblike, vec zornih kotov hkrati.\nUmetniki: Pablo Picasso, Georges Braque\nPrompt: "v stilu kubizma, geometrijske oblike"\n\n## Pop art (1950)\nZive barve, ponavljajoci vzorci, popularna kultura.\nUmetniki: Andy Warhol, Roy Lichtenstein\nPrompt: "pop art slog, zive barve, pike"\n\n## Digitalna umetnost (danes)\nNeskoncne moznosti - od realisticnega do fantazijskega.\nPrompt: "digitalna umetnost, podrobno, svetlece barve"\n\n## Risanka / Anime\nVelike oci, poenostavljene oblike, izrazite barve.\nPrompt: "anime slog" ali "risanka slog"\n\n## Izziv\nIzberi isti predmet in ga ustvari v 5 razlicnih slogih. Primerjaj rezultate!',
  'text', 20,
  '["umetnostna zgodovina", "impresionizem", "kubizem", "pop art"]'
FROM courses c WHERE c.slug = 'ai-art-studio'
ON CONFLICT (course_id, module_index, lesson_index) DO NOTHING;

-- Module 2: Generiranje slik (3 lessons)
INSERT INTO course_lessons (course_id, module_index, lesson_index, title, content, content_type, duration_minutes, key_concepts)
SELECT c.id, 1, 0,
  'Moja prva AI slika',
  E'# Moja prva AI slika\n\nCas je, da ustvaris svojo prvo AI sliko!\n\n## Korak za korakom\n\n### 1. Izberi temo\nKaj te navdusuje? Zivali? Vesolje? Pravljice?\n\n### 2. Napisi prompt\nUporabi recept:\n- **Predmet**: pav\n- **Podrobnosti**: z zlatim perjem, razprostrt rep\n- **Okolje**: v carobnem vrtu s svetlecimi rozami\n- **Slog**: fantazijski, podrobno, svetle barve\n\nCeloten prompt: "Velicasten pav z zlatim perjem in razprostrtim repom, stoji v carobnem vrtu s svetlecimi rozami, fantazijski slog, podrobno, svetle barve, magicna atmosfera"\n\n### 3. Ustvari!\nUporabi AI orodje za ustvarjanje slik na nasi platformi.\n\n### 4. Oceni in izboljsaj\nPoglej rezultat:\n- Ali je to, kar si si zamislil?\n- Kaj bi spremenil?\n- Dodaj ali odstrani besede iz prompta\n\n## Nasveti\n- Daljsi prompt = bolj specificna slika\n- Poskusi razlicne sloge za isti predmet\n- Ce ti ni vsec, spremeni samo en del',
  'text', 25,
  '["generiranje slik", "iteracija", "eksperimentiranje", "shranjanje"]'
FROM courses c WHERE c.slug = 'ai-art-studio'
ON CONFLICT (course_id, module_index, lesson_index) DO NOTHING;

INSERT INTO course_lessons (course_id, module_index, lesson_index, title, content, content_type, duration_minutes, key_concepts)
SELECT c.id, 1, 1,
  'Zgodbe s slikami',
  E'# Zgodbe s slikami\n\nKaj ce bi ustvaril celotno slikovno zgodbo s pomocjo AI?\n\n## Slikovnica z AI\nSlikovnica je zgodba, ki jo spremlajajo slike. Z AI lahko ustvaris oboje!\n\n## Projekt: Moja AI slikovnica\n\n### Korak 1: Napisi zgodbo (5-8 stavkov)\nPrimer:\n1. Mala robotka Bip se je prebudila v svoji delavnici.\n2. Skozi okno je videla, da je padel sneg.\n3. Nikoli se ni videla snega! Sla je ven.\n4. Naredila je svojega prvega snezaka - sneznega robota!\n5. Od takrat ima Bip najljubsi letni cas - zimo.\n\n### Korak 2: Ustvari slike za vsak stavek\nZa vsak stavek napisi prompt z istim opisom lika!\n\n### Korak 3: Sestavi slikovnico\nZdruzi besedilo in slike v celoto!\n\n## Nasveti za konsistentnost\nProblem: AI lahko narise robota drugace na vsaki sliki!\nResitev: Uporabi cim bolj podoben opis lika v vsakem promptu:\n"Majhna srebrna robotka z modrimi ocmi in rdeco pentljo" - enako v vsakem promptu!',
  'text', 30,
  '["slikovnica", "zgodba", "konsistentnost", "liki"]'
FROM courses c WHERE c.slug = 'ai-art-studio'
ON CONFLICT (course_id, module_index, lesson_index) DO NOTHING;

INSERT INTO course_lessons (course_id, module_index, lesson_index, title, content, content_type, duration_minutes, key_concepts)
SELECT c.id, 1, 2,
  'Napredne tehnike generiranja',
  E'# Napredne tehnike generiranja\n\nKo obvladas osnove, je cas za naprednejse trike!\n\n## Tehnika 1: Negativni prompt\nPovej AI, cesa NE zelis:\n- "Brez besedila na sliki"\n- "Brez ljudi"\n- "Brez temnih barv"\n\n## Tehnika 2: Mesanje slogov\nKombiniraj dva sloga:\n- "V stilu anime + akvarel" - edinstvena kombinacija!\n- "Steampunk + narava" - mehanicna narava\n- "Retro + vesolje" - vintage vesoljska pustolovscina\n\n## Tehnika 3: Razpolozenje in atmosfera\nDodaj custvene opise:\n- **Veselo**: svetlo, barvito, soncno, toplo\n- **Skrivnostno**: megleno, temno, skrivnostno, luna\n- **Epsko**: dramaticno, velicastno, zlato, mogocno\n\n## Tehnika 4: Perspektiva\nSpremeni zorni kot:\n- "Od zgoraj" (pticja perspektiva)\n- "Od spodaj" (zabja perspektiva)\n- "Bliznji posnetek" (detajl)\n- "Sirok pogled" (panorama)\n\n## Tehnika 5: Osvetlitev\n- "Zlata ura" - topla svetloba soncnega zahoda\n- "Neonske luci" - futuristicna, mestna\n- "Sveca" - intimno, toplo\n- "Severni sij" - magicno, barvito',
  'text', 25,
  '["negativni prompt", "mešanje slogov", "perspektiva", "osvetlitev"]'
FROM courses c WHERE c.slug = 'ai-art-studio'
ON CONFLICT (course_id, module_index, lesson_index) DO NOTHING;

-- Module 3: Glasba in AI (2 lessons)
INSERT INTO course_lessons (course_id, module_index, lesson_index, title, content, content_type, duration_minutes, key_concepts)
SELECT c.id, 2, 0,
  'Kako AI ustvarja glasbo',
  E'# Kako AI ustvarja glasbo\n\nAI ne ustvarja samo slik - ustvarja tudi glasbo!\n\n## Glasba je matematika\nTo je skrivnost glasbe - je polna vzorcev in pravil:\n- **Ritem**: ponavljajoc vzorec udarcev\n- **Melodija**: zaporedje not, ki sledijo pravilom\n- **Harmonija**: kombinacija not, ki zvenijo dobro skupaj\n\nAI se lahko nauci teh pravil!\n\n## Kako AI ustvari pesem?\n1. AI poslusa tisocke pesmi\n2. Najde vzorce: "po akordu C pogosto pride G"\n3. Ustvari novo melodijo, ki sledi tem vzorcem\n4. Rezultat je nova pesem, ki nikoli prej ni obstajala!\n\n## AI glasba orodja\n- **Chrome Music Lab** - brezplacno, zabavno eksperimentiranje\n- **AIVA** - AI komponist za klasicno glasbo\n- **Boomy** - ustvari pesem v sekundah\n\n## Eksperiment z Music Lab\nObisci musiclab.chromeexperiments.com in poskusi:\n- **Song Maker** - ustvari melodijo s kliki\n- **Rhythm** - eksperimentiraj z ritmi\n- **Kandinsky** - pretvori risbo v glasbo!\n\n## Zanimivost\nNekatere AI pesmi so tako dobre, da jih ljudje ne morejo lociti od pesmi, ki jih je napisal clovek!',
  'text', 20,
  '["AI glasba", "melodija", "ritem", "Chrome Music Lab"]'
FROM courses c WHERE c.slug = 'ai-art-studio'
ON CONFLICT (course_id, module_index, lesson_index) DO NOTHING;

INSERT INTO course_lessons (course_id, module_index, lesson_index, title, content, content_type, duration_minutes, key_concepts)
SELECT c.id, 2, 1,
  'Zvočna pokrajina',
  E'# Zvocna pokrajina\n\nZvocna pokrajina je zbirka zvokov, ki ustvarijo atmosfero.\n\n## Kaj je zvocna pokrajina?\n- **Gozd**: pticje petje, selestenje listja, potok\n- **Morje**: valovi, galeb, veter\n- **Mesto**: avtomobili, ljudje, glasba iz lokalov\n- **Vesolje**: tisina... ali sci-fi zvoki!\n\n## AI in zvoki\nAI lahko ustvari zvoke, ki ne obstajajo:\n- Kako zveni planeta iz drugega osoncja?\n- Kako zveni barva modra?\n- Kako zveni vonj po rozah?\n\n## Projekt: Moja zvocna zgodba\nZdruzi slike IN zvoke v multimedijsko izkusnjo:\n1. **Ustvari 3 AI slike** za svojo zgodbo\n2. **Ustvari zvocno pokrajino** za vsako sceno\n3. **Zdruzi** v predstavitev\n\n### Primer:\nScena 1: Gozd - pticje petje, nezna melodija\nScena 2: Nevihta - grmenje, dez, dramaticna glasba\nScena 3: Mavrica - tihi zvonci, vesela melodija\n\n## Sinestezija\nSinestezija je ko en cut sprozi drugega:\n- Slisis barvo\n- Vidis glasbo\n- Okusis obliko\n\nAI nam pomaga izkusiti sinestezijo - pretvori slike v glasbo ali glasbo v slike!',
  'text', 25,
  '["zvočna pokrajina", "sinestezija", "multimedija", "atmosfera"]'
FROM courses c WHERE c.slug = 'ai-art-studio'
ON CONFLICT (course_id, module_index, lesson_index) DO NOTHING;

-- Module 4: Moj AI portfolio (1 lesson - zaključni projekt)
INSERT INTO course_lessons (course_id, module_index, lesson_index, title, content, content_type, duration_minutes, key_concepts)
SELECT c.id, 3, 0,
  'Zaključna razstava - moj AI portfolio',
  E'# Zakljucna razstava - moj AI portfolio\n\nCestitke! Si na zadnji lekciji AI umetnisskega studia! Cas je za tvojo zakljucno razstavo.\n\n## Zakljucni projekt: AI razstava\nUstvari mini umetniisko razstavo s 5 deli:\n\n### 1. Portret (oseba ali zival)\nUstvari podroben portret v izbranem slogu.\n\n### 2. Pokrajina (narava ali mesto)\nUstvari cudovito pokrajino z naprednimi tehnikami osvetlitve.\n\n### 3. Fantazija (izmisljeni svet)\nPusti domisljiji prosto pot in ustvari svet, ki ne obstaja!\n\n### 4. Zgodba v sliki\nEna sama slika, ki pripoveduje celotno zgodbo.\n\n### 5. Tvoja izbira\nKarkoli zelis - to je tvoj prosti prostor za ustvarjanje!\n\n## Za vsako delo napisi:\n1. **Naslov** - ime tvojega dela\n2. **Prompt** - kaj si napisal AI\n3. **Razmisljanje** - zakaj si izbral to temo/slog\n4. **Kaj sem se naucil** - kaj si se naucil pri ustvarjanju\n\n## Umetnik si TI\nSkozi ta tecaj si spoznal:\n- AI je orodje, tako kot copic ali svincnik\n- TVOJA kreativnost je tista, ki naredi umetnost posebno\n- Dober prompt je umetnost sam po sebi\n- Razlicni slogi in tehnike dajejo razlicne rezultate\n\nHvala, da si bil del AI umetnisskega studia! Tvoja kreativnost nima meja.',
  'text', 30,
  '["portfolio", "razstava", "predstavitev", "kreativnost"]'
FROM courses c WHERE c.slug = 'ai-art-studio'
ON CONFLICT (course_id, module_index, lesson_index) DO NOTHING;
