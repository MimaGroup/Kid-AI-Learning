-- AI umetniški studio - Final content update with corrected Slovenian, emojis for kids
-- Updates: content, key_concepts (AI razlaga + quiz explanations)
-- Course: ai-art-studio (10 lessons)

-- =====================================================
-- LESSON 1: Kaj je AI umetnost?
-- =====================================================
UPDATE course_lessons
SET content = E'# Kaj je AI umetnost? 🎨\n\nUmetnost + tehnologija = nekaj čudovitega! ✨\n\nAI umetnost je sodoben način ustvarjanja, pri katerem sodelujeta človek in računalnik. Ti podaš idejo, umetna inteligenca pa ti pomaga ustvariti sliko.\n\n---\n\n## Kako AI ustvarja slike? 🤖\n\nUmetna inteligenca je »videla« milijone slik in se iz njih naučila:\n\n- katere barve se lepo ujemajo,\n- kako izgledajo različni slogi (akvarel, olje, risanka),\n- kako prepoznati predmete na slikah (drevo, hiša, oseba).\n\nKo ji rečeš: »Nariši sončen dan na plaži,« AI:\n\n1. razume tvoje besede,\n2. jih poveže z znanjem, ki ga je pridobila iz številnih primerov,\n3. ustvari novo sliko, ki prej še ni obstajala.\n\n---\n\n## Ali je to prava umetnost? 🤔\n\nRazmisli:\n\n- Umetnik izbere temo, barve in slog — ti izbereš, kaj naj AI ustvari.\n- Umetnik uporablja čopič — ti uporabljaš besede (t. i. poziv ali prompt).\n- Umetnik interpretira svet — ti interpretiraš rezultat, ki ga ustvari AI.\n\n**AI je orodje. Ustvarjalnost pa prihaja od tebe.**\n\n---\n\n## Znani primeri AI umetnosti 🌟\n\n- **DALL·E** — sistem, ki ustvarja slike iz besedila.\n- **Midjourney** — ustvarja izjemno podrobne in realistične slike.\n- **Stable Diffusion** — odprtokodno orodje za ustvarjanje slik z umetno inteligenco.\n\n---\n\n## Tvoja vloga 🎭\n\nTi si umetnik ali umetnica. AI je tvoj čopič.\n\nBrez tvoje ideje umetna inteligenca ne more ustvariti ničesar. ✨',
    key_concepts = '[
      {
        "term": "AI umetnost",
        "definition": "AI umetnost = tvoja ideja + računalnikova pomoč. Skupaj ustvarita nekaj čarobnega, kar še ni obstajalo! 🎨🚀"
      },
      {
        "term": "Generativna umetnost",
        "definition": "Generativna umetnost = umetnost, ki jo ustvari računalnik s pomočjo pravil in navodil. Ti določiš smer — računalnik pa ustvari čarobno! 🚀🎨"
      },
      {
        "term": "DALL·E",
        "definition": "DALL·E = čarobni AI umetnik, ki pretvori tvoje besede v slike! Bolj natančen kot si pri opisu, lepša bo slika! 🎨🚀"
      },
      {
        "term": "Kreativnost",
        "definition": "Kreativnost je tvoje najmočnejše orodje — bolj posebno kot katerikoli računalnik! AI ti pomaga uresničiti ideje, toda umetnik/ca si vedno TI! 🎨🚀"
      }
    ]'::jsonb,
    updated_at = NOW()
WHERE title = 'Kaj je AI umetnost?'
  AND course_id = (SELECT id FROM courses WHERE slug = 'ai-art-studio');

-- =====================================================
-- LESSON 2: Pisanje promptov za slike
-- =====================================================
UPDATE course_lessons
SET content = E'# Pisanje promptov za slike ✍️\n\nPrompt je opis slike, ki jo želiš ustvariti. Bolj kot je opis natančen, bolj zanimiva in podrobna bo slika!\n\n---\n\n## Zgradba dobrega prompta 🏗️\n\nDober prompt ima 4 dele:\n\n### 1️⃣ Predmet (KAJ?)\n\nKaj želiš videti na sliki? Na primer: »mačka«, »grad«, »vesoljska ladja«.\n\n### 2️⃣ Podrobnosti (KAKŠEN?)\n\nOpiši predmet bolj natančno. Na primer: »puhasta oranžna mačka z modrimi očmi«.\n\n### 3️⃣ Okolje (KJE?)\n\nKje se predmet nahaja? Na primer: »na drevesu v čarobnem gozdu ponoči«.\n\n### 4️⃣ Slog (KAKO?)\n\nKako naj slika izgleda? Na primer: »v slogu akvarela, svetle barve«.\n\n---\n\n## Primeri 📝\n\n**Slab prompt:** »Mačka« → Dobiš preprosto sliko mačke.\n\n**Dober prompt:** »Puhasta oranžna mačka z modrimi očmi sedi na drevesu v čarobnem gozdu ponoči. Okoli nje rastejo svetleče gobe. Slika je v slogu risanke, v toplih tonih.« → Slika bo veliko bolj zanimiva in posebna!\n\n---\n\n## Čarobne besede za boljše prompte ✨\n\n- **»podrobno«** — doda več detajlov\n- **»svetle barve«** — ustvari veselo vzdušje\n- **»dramatična osvetlitev«** — naredi sliko bolj napeto\n- **»v slogu …«** — posnema določen umetniški slog',
    key_concepts = '[
      {
        "term": "Prompt",
        "definition": "Verjetno že veš, kaj je slika — to je fotografija ali risba, ki jo lahko pogledaš. Toda kaj pa, če bi rad ustvaril sliko nečesa, kar še ni bilo fotografirano ali narisano? Tu nastopijo prompti! 🎨\n\nPrompt je kot recept. Pomisli na peko peciva. Če imaš dober recept, bo pecivo okusno in lepo. Če pa imaš slab recept, bo pecivo žal razpadlo ali pa sploh ne bo dobro. Prompt je torej tvoje navodilo računalniku. Bolj natančno kot mu opišeš svojo idejo, lepšo sliko bo ustvaril za tebe."
      },
      {
        "term": "Opis",
        "definition": "Opis je, ko z besedami poveš, kako nekaj izgleda. 📝\n\nPomisli takole: Zapri oči in pomisli na svojo najljubšo žival. Zdaj pa jo opiši — povej, kakšne barve je, kako je velika, kaj počne. To, kar si ravnokar naredil, je opis!"
      },
      {
        "term": "Ključne besede",
        "definition": "Ključne besede so najpomembnejše besede v tvojem promptu — tiste, ki računalniku povejo, kaj je na sliki najbolj pomembno! 🗝️"
      },
      {
        "term": "Specifičnost",
        "definition": "Specifičnost pomeni, da je nekaj posebno in drugačno od drugih stvari. Na primer, če imamo veliko slik, ki prikazujejo različne živali, potem je posebej zanimiva tista slika, ki prikazuje rdečo pando, ker je to žival, ki jo srečamo redko."
      }
    ]'::jsonb,
    updated_at = NOW()
WHERE title = 'Pisanje promptov za slike'
  AND course_id = (SELECT id FROM courses WHERE slug = 'ai-art-studio');

-- =====================================================
-- LESSON 3: Moja prva AI slika
-- =====================================================
UPDATE course_lessons
SET content = E'# Moja prva AI slika 🎨\n\nČas je, da ustvariš svojo prvo AI sliko! Slediti moraš samo štirim preprostim korakom! 🚀\n\n---\n\n## Korak 1: Izberi temo 🌟\n\nNajprej pomisli — kaj te navdušuje? Živali, vesolje, pravljice ali morda kaj drugega? Izberi temo, ki ti je najbolj pri srcu, in pojdimo naprej!\n\n---\n\n## Korak 2: Napiši prompt ✍️\n\nSpomni se recepta za dober prompt — predmet, podrobnosti, okolje in slog:\n\n- 🎯 **Predmet:** pav\n- 🔍 **Podrobnosti:** z zlatim perjem, razprostrt rep\n- 🌍 **Okolje:** v čarobnem vrtu s svetlečimi vrtnicami\n- 🎨 **Slog:** fantazijski, podrobno, svetle barve\n\n**Celoten prompt:**\n\n> »Veličasten pav z zlatim perjem in razprostrtim repom stoji v čarobnem vrtu s svetlečimi vrtnicami, fantazijski slog, podrobno, svetle barve, čarobna atmosfera.«\n\n---\n\n## Korak 3: Ustvari! 🖥️\n\nZdaj vnesi svoj prompt v AI orodje za ustvarjanje slik na naši platformi in pritisni ustvari. Računalnik bo naredil vse ostalo! ✨\n\n---\n\n## Korak 4: Oceni in izboljšaj 🔍\n\nPoglej rezultat in si zastavi vprašanja:\n\n- Ali je slika takšna, kot si si jo zamislil/a?\n- Kaj bi spremenil/a ali dodal/a?\n- Kateri del prompta bi popravil/a?\n\nSpremeni samo en del prompta naenkrat in poglej, kako se slika spremeni!\n\n---\n\n## 💡 Nasveti za boljše slike\n\n- Daljši prompt = bolj natančna in podrobna slika\n- Poskusi različne sloge za isti predmet — rezultati te bodo presenetili!\n- Če ti slika ni všeč, spremeni samo en del prompta naenkrat\n\n---\n\n🏆 **Zapomni si:** Vsaka slika je korak naprej! Več kot ustvarjaš, boljši/a boš. Pogumno in ustvarjaj! 🎨',
    key_concepts = '[
      {
        "term": "Generiranje slik",
        "definition": "Generiranje slik = ti napišeš prompt + računalnik ustvari sliko. Skupaj lahko ustvarita prave umetnine! ✨"
      },
      {
        "term": "Iteracija",
        "definition": "Iteracija = poskusi + poglej + izboljšaj + ponovi! Bolj kot iteriraš, boljše slike boš ustvarjal/a! 🚀"
      },
      {
        "term": "Eksperimentiranje",
        "definition": "Eksperimentiranje = poskusi + opazuj + izboljšaj! Več kot eksperimentiraš, bolj čudovite slike boš ustvarjal/a! 🚀"
      },
      {
        "term": "Spraviti na varno",
        "definition": "Spraviti na varno = tvoje delo je varno in dostopno kadarkoli! Ne pozabi shraniti svoje slike, ko si z njo zadovoljen/na! 💾✨"
      }
    ]'::jsonb,
    updated_at = NOW()
WHERE title = 'Moja prva AI slika'
  AND course_id = (SELECT id FROM courses WHERE slug = 'ai-art-studio');

-- =====================================================
-- LESSON 4: Umetnostni slogi skozi zgodovino
-- =====================================================
UPDATE course_lessons
SET content = E'# Umetnostni slogi skozi zgodovino 🎨\n\nDa bi ustvarjal še boljšo AI umetnost, je koristno poznati različne umetnostne sloge. Vsak slog ima svoje posebnosti in čar!\n\n---\n\n## 🖌️ Impresionizem (1870)\n\nImpresionizem prepoznaš po mehkih potezah čopiča, svetlih barvah in prizorih iz narave. Najznamenitejša umetnika sta bila Claude Monet in Renoir.\n\n**Prompt:** »V slogu impresionizma, mehke poteze čopiča.«\n\n---\n\n## 📐 Kubizem (1900)\n\nKubizem prepoznaš po geometrijskih oblikah in predmetih, prikazanih iz več zornih kotov hkrati. Najpomembnejša umetnika sta bila Pablo Picasso in Georges Braque.\n\n**Prompt:** »V slogu kubizma, geometrijske oblike.«\n\n---\n\n## 🌈 Pop art (1950)\n\nPop art prepoznaš po živih barvah, ponavljajočih se vzorcih in motivih iz vsakdanjega življenja. Najbolj znana umetnika sta bila Andy Warhol in Roy Lichtenstein.\n\n**Prompt:** »Pop art slog, žive barve, pike.«\n\n---\n\n## 💻 Digitalna umetnost (danes)\n\nDigitalna umetnost ponuja neskončne možnosti — od zelo realističnih slik do čarobnih fantazijskih svetov.\n\n**Prompt:** »Digitalna umetnost, podrobno, svetleče barve.«\n\n---\n\n## 🌸 Risanka in anime\n\nTa slog prepoznaš po velikih očeh, poenostavljenih oblikah in izrazitih, živahnih barvah.\n\n**Prompt:** »Anime slog« ali »risanka slog.«\n\n---\n\n## 🏆 Izziv za tebe!\n\nIzberi en predmet — na primer mačko, hišo ali drevo — in ga ustvari v vseh 5 različnih slogih. Nato primerjaj rezultate in poglej, kako drugačen je lahko isti predmet! 🚀',
    key_concepts = '[
      {
        "term": "Umetnostna zgodovina",
        "definition": "Umetnostna zgodovina je zgodba o umetnosti skozi čas. Poznavanje različnih slogov ti pomaga, da računalniku natančno poveš, kakšno sliko želiš ustvariti! 🎨"
      },
      {
        "term": "Impresionizem",
        "definition": "Impresionizem je slog z mehkimi potezami in svetlimi barvami, ki ujame lepoto trenutka v naravi. Popoln slog za čarobne in nežne slike! 🌸"
      },
      {
        "term": "Kubizem",
        "definition": "Kubizem je slog, kjer so stvari narisane iz geometrijskih oblik in prikazane iz več strani hkrati. Ustvarja nenavadne, domišljijske slike, ki te naučijo gledati na svet povsem drugače! 🚀"
      },
      {
        "term": "Pop art",
        "definition": "Pop art je veseli, pisani slog, ki navdih jemlje iz vsakdanjega življenja. Žive barve in ponavljajoči se vzorci naredijo vsako sliko zabavno in energično! 🎉"
      }
    ]'::jsonb,
    updated_at = NOW()
WHERE title = 'Umetnostni slogi skozi zgodovino'
  AND course_id = (SELECT id FROM courses WHERE slug = 'ai-art-studio');

-- =====================================================
-- LESSON 5: Napredne tehnike generiranja slik
-- =====================================================
UPDATE course_lessons
SET content = E'# Napredne tehnike generiranja slik 🚀\n\nKo obvladaš osnove, je čas za naprednejše trike, ki bodo tvoje slike dvignili na višjo raven! ✨\n\n---\n\n## 🚫 Tehnika 1: Negativni prompt\n\nRačunalniku povej, česa ne želiš na sliki:\n\n- »Brez besedila na sliki.«\n- »Brez ljudi.«\n- »Brez temnih barv.«\n\nTako bo slika točno takšna, kot si jo zamislil/a — brez nepotrebnih stvari! 👍\n\n---\n\n## 🎨 Tehnika 2: Mešanje slogov\n\nKombiniraj dva različna sloga in ustvari nekaj popolnoma edinstvenega:\n\n- »Anime + akvarel« — nežna risanka z mehkimi barvami\n- »Steampunk + narava« — mehanska narava z zobniki in rastlinami\n- »Retro + vesolje« — starinska vesoljska pustolovščina\n\n---\n\n## 😊 Tehnika 3: Razpoloženje in atmosfera\n\nDodaj čustvene opise, da slika izrazi pravo razpoloženje:\n\n- 🌞 **Veselo:** svetlo, barvito, sončno, toplo\n- 🌙 **Skrivnostno:** megleno, temno, skrivnostno, luna\n- ⚡ **Epsko:** dramatično, veličastno, zlato, mogočno\n\n---\n\n## 📷 Tehnika 4: Perspektiva\n\nSpremeni zorni kot in slika bo takoj drugačna:\n\n- 🦅 »Od zgoraj« — ptičja perspektiva\n- 🐸 »Od spodaj« — žabja perspektiva\n- 🔍 »Bližnji posnetek« — pokaže vse podrobnosti\n- 🌅 »Širok pogled« — panorama celotnega prizora\n\n---\n\n## 💡 Tehnika 5: Osvetlitev\n\nDodaj posebno svetlobo in slika bo dobila čarobno vzdušje:\n\n- 🌅 »Zlata ura« — topla in nežna svetloba sončnega zahoda\n- 🌆 »Neonske luči« — futuristična, barvita mestna svetloba\n- 🕯️ »Sveča« — intimno in toplo vzdušje\n- 🌌 »Severni sij« — čarobna, barvita nočna svetloba\n\n---\n\n💡 **Zapomni si:** Napredne tehnike = boljše slike! Poskusi kombinirati več tehnik hkrati in ustvari svojo popolno, edinstveno sliko! 🎨🏆',
    key_concepts = '[
      {
        "term": "Negativni prompt",
        "definition": "Negativni prompt = povej računalniku, česa ne želiš. Tako bo slika še bolj točno takšna, kot si jo zamislil/a! 🎨🚀"
      },
      {
        "term": "Mešanje slogov",
        "definition": "Mešanje slogov = dva sloga + ena edinstvena slika! Poskusi različne kombinacije in ustvari svoj popolnoma nov slog! 🚀🏆"
      },
      {
        "term": "Perspektiva",
        "definition": "Perspektiva = zorni kot, od koder gledaš. Spremeni perspektivo in ista stvar bo videti popolnoma drugače — kot da jo vidiš prvič! 🚀🎨"
      },
      {
        "term": "Osvetlitev",
        "definition": "Osvetlitev = svetloba, ki dá sliki posebno vzdušje. Prava osvetlitev spremeni vsako sliko v pravo umetnino! 🎨🚀"
      }
    ]'::jsonb,
    updated_at = NOW()
WHERE title = 'Napredne tehnike generiranja'
  AND course_id = (SELECT id FROM courses WHERE slug = 'ai-art-studio');

-- =====================================================
-- LESSON 6: Zgodbe s slikami
-- =====================================================
UPDATE course_lessons
SET content = E'# Zgodbe s slikami 📖\n\nKaj pa, če bi ustvaril/a svojo celotno slikovno zgodbo s pomočjo AI? Zdaj je to mogoče — in zelo zabavno! 🚀\n\n---\n\n## Kaj je slikanica?\n\nSlikanica je zgodba, ki jo spremljajo čudovite slike. Z AI lahko ustvariš oboje — tako besedilo kot slike! 🎨\n\n---\n\n## Projekt: Moja AI slikanica 🏆\n\n### Korak 1: Napiši zgodbo ✍️\n\nNapiši kratko zgodbo s 5 do 8 stavki. Vsak stavek bo kasneje dobil svojo sliko!\n\n**Primer zgodbe:**\n\n1. Mala robotka Bip se je prebudila v svoji delavnici.\n2. Skozi okno je videla, da je padel sneg.\n3. Nikoli še ni videla snega — takoj je stekla ven!\n4. Naredila je svojega prvega snežaka — snežnega robota!\n5. Od takrat je Bipin najljubši letni čas zima. ❄️\n\n### Korak 2: Ustvari slike za vsak stavek 🖼️\n\nZa vsak stavek zgodbe napiši prompt z istim opisom glavnega lika — tako bo lik na vsaki sliki izgledal enako!\n\n### Korak 3: Sestavi slikanico 📚\n\nKo imaš vse slike, jih združi z besedilom in tvoja slikanica je končana!\n\n---\n\n## 💡 Nasvet za doslednost\n\n**Problem:** AI lahko nariše lika nekoliko drugače na vsaki sliki! 😟\n\n**Rešitev:** V vsakem promptu uporabi popolnoma enak opis lika. Na primer:\n\n> »Majhna srebrna robotka z modrimi očmi in rdečo pentljo...«\n\nTa opis uporabi v vsakem promptu — tako bo tvoja robotka Bip na vsaki sliki izgledala enako! 🌟\n\n---\n\n💡 **Zapomni si:** Dobra AI slikanica = zanimiva zgodba + dosledni prompti + čudovite slike. Ustvari svojo zgodbo in postani pravi/a pisatelj/ica in umetnik/ca hkrati! 🎨📖',
    key_concepts = '[
      {
        "term": "Slikanica",
        "definition": "Slikanica = tvoja zgodba + tvoje slike. Z AI lahko postaneš pravi/a pisatelj/ica in umetnik/ca hkrati! 🎨📖"
      },
      {
        "term": "Zgodba",
        "definition": "Zgodba = domišljija + pustolovščina + novi prijatelji. Vzemi svojo škatlo barvic in začni ustvarjati svojo lastno zgodbo! 🎨📖"
      },
      {
        "term": "Doslednost",
        "definition": "Doslednost = vsakič enako! Pri AI slikanici pomeni, da tvoj junak na vsaki sliki izgleda enako — tako ga bralci vedno prepoznajo! 🎨🚀"
      },
      {
        "term": "Liki",
        "definition": "Liki so junaki tvoje zgodbe. Bolj natančno kot jih opišeš v promptu, bolj dosledni bodo na vsaki sliki! 🎨🚀"
      }
    ]'::jsonb,
    updated_at = NOW()
WHERE title = 'Zgodbe s slikami'
  AND course_id = (SELECT id FROM courses WHERE slug = 'ai-art-studio');

-- =====================================================
-- LESSON 7: Kako AI ustvarja glasbo?
-- =====================================================
UPDATE course_lessons
SET content = E'# Kako AI ustvarja glasbo? 🎵\n\nAI ne ustvarja samo slik — ustvarja tudi glasbo! In to glasbo, ki je še nihče ni slišal! 🎶✨\n\n---\n\n## Glasba je matematika! 🔢\n\nTo je velika skrivnost glasbe — je polna vzorcev in pravil:\n\n- 🥁 **Ritem** — ponavljajoč se vzorec udarcev, ki dá glasbi energijo\n- 🎵 **Melodija** — zaporedje not, ki sledijo posebnim pravilom\n- 🎹 **Harmonija** — kombinacija not, ki skupaj zvenijo lepo in prijetno\n\nAI se lahko nauči vseh teh pravil — in jih uporabi za ustvarjanje glasbe! 🤖\n\n---\n\n## Kako AI ustvari pesem? 🎼\n\nAI ustvari pesem v štirih korakih:\n\n1. 👂 AI posluša tisoče pesmi in se uči iz njih\n2. 🔍 Najde vzorce — na primer: »po akordu C pogosto pride G«\n3. 🎵 Ustvari novo melodijo, ki sledi tem vzorcem\n4. 🌟 Rezultat je popolnoma nova pesem, ki nikoli prej ni obstajala!\n\n---\n\n## AI glasbena orodja 🎹\n\nPreizkusi ta brezplačna orodja:\n\n- 🎵 **Chrome Music Lab** — brezplačno in zabavno eksperimentiranje z glasbo\n- 🎻 **AIVA** — AI skladatelj za klasično glasbo\n- 🎤 **Boomy** — ustvari svojo pesem v samo nekaj sekundah\n\n---\n\n## Eksperiment z Music Lab! 🔬\n\nObišči **musiclab.chromeexperiments.com** in preizkusi:\n\n- 🎼 **Song Maker** — ustvari svojo melodijo s preprostimi kliki\n- 🥁 **Rhythm** — eksperimentiraj z različnimi ritmi\n- 🎨 **Kandinsky** — pretvori svojo risbo v glasbo!\n\n---\n\n## 🌟 Zanimivost\n\nNekatere AI pesmi so tako dobre, da jih ljudje ne morejo ločiti od pesmi, ki jih je napisal človek! Si ti zmogel/la? 🤔\n\n---\n\n💡 **Zapomni si:** AI ustvarja glasbo tako, da se uči vzorcev iz tisoče pesmi — in potem ustvari svojo, popolnoma novo! Glasba + matematika + AI = čarobna kombinacija! 🎵🚀',
    key_concepts = '[
      {
        "term": "AI glasba",
        "definition": "AI glasba = glasba, ki jo ustvari računalnik! Uči se iz tisoče pesmi in ustvari svojo — popolnoma novo in edinstveno! 🎵🚀"
      },
      {
        "term": "Melodija",
        "definition": "Melodija je tisti čarobni del glasbe, ki se ti zapije v glavo. Ko se naučiš ustvarjati melodije, boš ustvaril/a glasbo, ki bo popolnoma tvoja! 🎵🚀"
      },
      {
        "term": "Ritem",
        "definition": "Ritem je srce glasbe — brez njega glasba ne bi živela! Ko razumeš ritem, lahko ustvariš glasbo, ki bo zabavna, energična in popolnoma tvoja! 🎵🚀"
      },
      {
        "term": "Harmonija",
        "definition": "Harmonija je kombinacija not, ki skupaj zvenijo lepo in prijetno. Je kot ekipa not, ki skupaj ustvarjajo čudovite zvoke! 🎹✨"
      }
    ]'::jsonb,
    updated_at = NOW()
WHERE title = 'Kako AI ustvarja glasbo'
  AND course_id = (SELECT id FROM courses WHERE slug = 'ai-art-studio');

-- =====================================================
-- LESSON 8: Zvočna pokrajina
-- =====================================================
UPDATE course_lessons
SET content = E'# Zvočna pokrajina 🎵\n\nZvočna pokrajina je zbirka zvokov, ki skupaj ustvarijo posebno atmosfero in vzdušje — kot da bi zaprl/a oči in se preselil/a v drug svet! 🌍✨\n\n---\n\n## Primeri zvočnih pokrajin\n\n- 🌲 **Gozd** — ptičje petje, šelestenje listja, žuborenje potoka\n- 🌊 **Morje** — valovi, krik galebov, piš vetra\n- 🏙️ **Mesto** — hrup avtomobilov, glasovi ljudi, glasba iz lokalov\n- 🚀 **Vesolje** — popolna tišina... ali čarobni fantastični zvoki!\n\n---\n\n## Kaj zmore AI? 🤖\n\nAI lahko ustvari zvoke, ki v resnici ne obstajajo. Na primer:\n\n- 🪐 Kako zveni planet iz drugega osončja?\n- 🔵 Kako zveni barva modra?\n- 🌹 Kako zveni vonj po vrtnicah?\n\nTo so vprašanja, na katera samo AI zna odgovoriti! 🌟\n\n---\n\n## Projekt: Moja zvočna zgodba 🎬\n\nZdruži slike in zvoke v svojo lastno multimedijsko izkušnjo:\n\n1. 🖼️ Ustvari 3 AI slike za svojo zgodbo\n2. 🎵 Ustvari zvočno pokrajino za vsako sceno\n3. 📽️ Združi vse skupaj v predstavitev\n\n**Primer:**\n\n- 🌲 **Scena 1: Gozd** — ptičje petje, nežna melodija\n- ⛈️ **Scena 2: Nevihta** — grmenje, dež, dramatična glasba\n- 🌈 **Scena 3: Mavrica** — tihi zvonci, vesela melodija\n\n---\n\n## Kaj je sinestezija? 🌈\n\nSinestezija je čaroben pojav, ko en čut sproži drugega:\n\n- 👁️ Slišiš barvo\n- 👂 Vidiš glasbo\n- 👅 Okusiš obliko\n\nAI nam pomaga izkusiti sinestezijo — pretvori slike v glasbo ali glasbo v slike! 🎨🎵\n\n---\n\n💡 **Zapomni si:** Zvočna pokrajina = zvoki, ki ustvarijo posebno vzdušje. Z AI lahko ustvariš zvočno zgodbo, ki bo gledalce prenesla v popolnoma nov svet! 🚀✨',
    key_concepts = '[
      {
        "term": "Zvočna pokrajina",
        "definition": "Vsaka pokrajina ima svoje posebne zvoke, ki jo naredijo edinstveno. Zvočna pokrajina je kot glasbena slika kraja — zapri oči in takoj veš, kje si! 🎵🚀"
      },
      {
        "term": "Sinestezija",
        "definition": "Sinestezija je čaroben pojav, ko en čut sproži drugega. Je kot čarobna vez med tvojimi čutili — in AI ti pomaga to izkusiti! 🚀✨"
      },
      {
        "term": "Multimedija",
        "definition": "Multimedija = slike + zvoki + besedilo — vse skupaj v eni čarobni izkušnji! Z AI lahko ustvariš svojo lastno multimedijsko zgodbo! 🚀🎨🎵"
      },
      {
        "term": "Atmosfera",
        "definition": "Atmosfera je nevidni zaščitni ovoj Zemlje, ki nam omogoča dihanje in prenašanje zvokov. Brez nje ne bi slišali nobene zvočne pokrajine! 🌍🎵"
      }
    ]'::jsonb,
    updated_at = NOW()
WHERE title = 'Zvočna pokrajina'
  AND course_id = (SELECT id FROM courses WHERE slug = 'ai-art-studio');

-- =====================================================
-- LESSON 10: Zaključna razstava - moj AI portfolio
-- =====================================================
UPDATE course_lessons
SET content = E'# Zaključna razstava — moj AI portfolio 🎨🏆\n\nČestitke! Prišel/la si do zadnje lekcije AI umetniškega studia! Čas je, da pokažeš vse, kar si se naučil/a — tvoja lastna umetniška razstava te čaka! 🌟✨\n\n---\n\n## Zaključni projekt: Moja AI razstava 🖼️\n\nUstvari mini umetniško razstavo s 5 umetniškimi deli:\n\n### 1. 👤 Portret — oseba ali žival\n\nUstvari podroben portret v svojem najljubšem umetnostnem slogu!\n\n### 2. 🌄 Pokrajina — narava ali mesto\n\nUstvari čudovito pokrajino z naprednimi tehnikami osvetlitve!\n\n### 3. 🧚 Fantazija — izmišljeni svet\n\nPusti domišljiji prosto pot in ustvari svet, ki še ne obstaja! 🚀\n\n### 4. 📖 Zgodba v sliki\n\nUstvari eno samo sliko, ki pripoveduje celotno zgodbo!\n\n### 5. 🌟 Tvoja izbira\n\nKarkoli želiš — to je tvoj prosti prostor za ustvarjanje!\n\n---\n\n## Za vsako delo napiši 📝\n\n- 🏷️ **Naslov** — ime tvojega umetniškega dela\n- ✍️ **Prompt** — kaj si napisal/a AI\n- 💭 **Razmišljanje** — zakaj si izbral/a to temo ali slog\n- 🧠 **Kaj sem se naučil/a** — kaj si odkril/a pri ustvarjanju\n\n---\n\n## Umetnik/ca si TI! 🎨\n\nSkozi ta tečaj si spoznal/a štiri pomembne resnice:\n\n- 🖌️ AI je orodje — tako kot čopič ali svinčnik\n- 💡 TVOJA ustvarjalnost je tista, ki naredi umetnost posebno\n- ✍️ Dober prompt je umetnost sam po sebi\n- 🎭 Različni slogi in tehnike dajejo popolnoma različne rezultate\n\n---\n\n💡 **Hvala, da si bil/a del AI umetniškega studia!** Pokazal/a si pogum, ustvarjalnost in radovednost — lastnosti vsakega pravega umetnika! Tvoja ustvarjalnost nima meja — nadaljuj z ustvarjanjem! 🚀🌈',
    key_concepts = '[
      {
        "term": "Portfolio",
        "definition": "Portfolio = zbirka tvojih najboljših del! Ko ga odpreš, vidiš vse, kar si ustvaril/a — in kako zelo si napredoval/a! 🚀🌟"
      },
      {
        "term": "Razstava",
        "definition": "Razstava = prostor, kjer deliš svojo ustvarjalnost z drugimi. Tvoja AI razstava bo pokazala vse, kar si se naučil/a — in kako daleč si prišel/la! 🚀🎨"
      },
      {
        "term": "Predstavitev",
        "definition": "Predstavitev = praznik tvojega znanja in ustvarjalnosti! Pokaži svetu, kaj zmoreš — ker si to res zaslužil/a! 🚀🎨"
      },
      {
        "term": "Kreativnost",
        "definition": "Kreativnost je tista čarobna iskrica, ki naredi tvojo AI umetnost posebno in edinstveno. AI je samo orodje — umetnik/ca si TI! 🎨🚀"
      }
    ]'::jsonb,
    updated_at = NOW()
WHERE title = 'Zaključna razstava - moj AI portfolio'
  AND course_id = (SELECT id FROM courses WHERE slug = 'ai-art-studio');

-- Verify updates
SELECT title, updated_at 
FROM course_lessons 
WHERE course_id = (SELECT id FROM courses WHERE slug = 'ai-art-studio')
ORDER BY module_index, lesson_index;
