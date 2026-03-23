-- =====================================================
-- AI umetniški studio - Comprehensive Slovenian Grammar Fix
-- Script: 044_fix_art_studio_slovenian_grammar.sql
-- Description: Fixes diacritics, declensions, and incorrect words
-- across all 9 lessons of AI Art Studio course
-- =====================================================

-- Update course description and metadata first
UPDATE courses
SET 
    title = 'AI umetniški studio',
    description = 'Kreativnost se sreča s tehnologijo v tem edinstvenem tečaju, kjer otroci odkrivajo, kako lahko umetna inteligenca pomaga pri ustvarjanju umetnosti.',
    long_description = 'Od ustvarjanja slik do glasbenega ustvarjanja – otroci bodo raziskovali, kako deluje umetna inteligenca ter kako lahko z njeno pomočjo izrazijo svoje ideje na nove in ustvarjalne načine. Tečaj spodbuja domišljijo, radovednost in kritično razmišljanje, hkrati pa otroci spoznavajo povezave med človeško ustvarjalnostjo in strojnim učenjem.',
    learning_outcomes = '[
        "Neomejen dostop.",
        "Ob zaključku prejmeš certifikat.",
        "Varno spletno plačilo (Stripe)."
    ]'::jsonb,
    updated_at = NOW()
WHERE slug = 'ai-art-studio';

-- =====================================================
-- LESSON 1: Kaj je AI umetnost?
-- =====================================================
UPDATE course_lessons
SET content = E'# Kaj je AI umetnost? 🎨

Umetnost + tehnologija = nekaj čudovitega!

AI umetnost je sodoben način ustvarjanja, pri katerem sodelujeta človek in računalnik. Ti podaš idejo, umetna inteligenca pa ti pomaga ustvariti sliko.

---

## Kako AI ustvarja slike? 🤖

Umetna inteligenca je »videla« milijone slik in se iz njih naučila:

- katere barve se lepo ujemajo,
- kako izgledajo različni slogi (akvarel, olje, risanka),
- kako prepoznati predmete na slikah (drevo, hiša, oseba).

Ko ji rečeš: »Nariši sončen dan na plaži,« AI:

1. razume tvoje besede,
2. jih poveže z znanjem, ki ga je pridobila iz številnih primerov,
3. ustvari novo sliko, ki prej še ni obstajala.

---

## Ali je to prava umetnost? 🤔

Razmisli:

- Umetnik izbere temo, barve in slog – ti izbereš, kaj naj AI ustvari.
- Umetnik uporablja čopič – ti uporabljaš besede (t. i. poziv ali prompt).
- Umetnik interpretira svet – ti interpretiraš rezultat, ki ga ustvari AI.

**AI je orodje. Ustvarjalnost pa prihaja od tebe.**

---

## Znani primeri AI umetnosti 🌟

- **DALL·E** – sistem, ki ustvarja slike iz besedila.
- **Midjourney** – ustvarja izjemno podrobne in realistične slike.
- **Stable Diffusion** – odprtokodno orodje za ustvarjanje slik z umetno inteligenco.

---

## Tvoja vloga 🎭

Ti si umetnik ali umetnica. AI je tvoj čopič.

Brez tvoje ideje umetna inteligenca ne more ustvariti ničesar. ✨',
    key_concepts = '[
        {"name": "AI umetnost", "explanation": "AI umetnost = tvoja ideja + računalnikova pomoč. Skupaj ustvarita nekaj čarobnega, kar še ni obstajalo! 🎨🚀"},
        {"name": "Generativna umetnost", "explanation": "Generativna umetnost = umetnost, ki jo ustvari računalnik s pomočjo pravil in navodil. Ti določiš smer — računalnik pa ustvari čarobno! 🚀🎨"},
        {"name": "DALL·E", "explanation": "DALL·E = čarobni AI umetnik, ki pretvori tvoje besede v slike! Bolj natančen kot si pri opisu, lepša bo slika! 🎨🚀"},
        {"name": "Kreativnost", "explanation": "Kreativnost je tvoje najmočnejše orodje — bolj posebno kot katerikoli računalnik! AI ti pomaga uresničiti ideje, toda umetnik/ca si vedno TI! 🎨🚀"}
    ]'::jsonb,
    quiz_questions = '[
        {
            "question": "Kaj je AI umetnost?",
            "options": ["Umetnost, ki jo ustvari samo računalnik", "Umetnost, kjer sodelujeta človek in računalnik", "Umetnost, ki je bila ustvarjena pred 100 leti", "Umetnost, ki jo lahko narediš samo s čopičem"],
            "correctAnswer": 1,
            "explanation": "AI umetnost je poseben način ustvarjanja, kjer sodelujeta ti in računalnik. Ti poveš, kaj želiš ustvariti, računalnik pa ti pri tem pomaga. Skupaj lahko ustvarita nekaj čisto novega! 🎨✨"
        },
        {
            "question": "Kako AI ustvari sliko?",
            "options": ["S čopičem in barvami", "Tako da posname fotografijo", "Iz tvojih besed ustvari sliko", "Tako da prekopira drugo sliko"],
            "correctAnswer": 2,
            "explanation": "AI ustvari slike iz tvojih besed — bolj natančen kot si pri opisu, lepša in edinstvena bo slika! 🎨🚀"
        },
        {
            "question": "Kaj je DALL·E?",
            "options": ["Računalniška igrica", "Program, ki ustvarja slike iz besedila", "Vrsta računalnika", "Ime znanega umetnika"],
            "correctAnswer": 1,
            "explanation": "DALL·E je poseben program, ki ustvarja slike. Ustvari lahko nove in edinstvene slike, ki prej niso obstajale. Dovolj je, da mu poveš, kaj želiš videti!"
        },
        {
            "question": "Kakšna je tvoja vloga pri ustvarjanju AI umetnosti?",
            "options": ["Samo gledaš, kaj računalnik naredi", "Izbereš temo, barve in slog ter podaš idejo", "Nič, računalnik naredi vse sam", "Samo pritisneš gumb"],
            "correctAnswer": 1,
            "explanation": "Ti lahko poveš računalniku, kaj želiš ustvariti. Izbereš lahko temo, barve in slog. AI ti nato pomaga ustvariti novo sliko po tvoji ideji. Ti si tisti, ki ima domišljijo! 🌟"
        }
    ]'::jsonb,
    updated_at = NOW()
WHERE title = 'Kaj je AI umetnost?'
  AND course_id = (SELECT id FROM courses WHERE slug = 'ai-art-studio');

-- =====================================================
-- LESSON 2: Pisanje promptov za slike
-- =====================================================
UPDATE course_lessons
SET content = E'# Pisanje promptov za slike ✍️

Prompt je opis slike, ki jo želiš ustvariti. Bolj kot je opis natančen, bolj zanimiva in podrobna bo slika!

---

## Zgradba dobrega prompta 🏗️

Dober prompt ima 4 dele:

### 1️⃣ Predmet (KAJ?)

Kaj želiš videti na sliki? Na primer: »mačka«, »grad«, »vesoljska ladja«.

### 2️⃣ Podrobnosti (KAKŠEN?)

Opiši predmet bolj natančno. Na primer: »puhasta oranžna mačka z modrimi očmi«.

### 3️⃣ Okolje (KJE?)

Kje se predmet nahaja? Na primer: »na drevesu v čarobnem gozdu ponoči«.

### 4️⃣ Slog (KAKO?)

Kako naj slika izgleda? Na primer: »v slogu akvarela, svetle barve«.

---

## Primeri 📝

**Slab prompt:** »Mačka« → Dobiš preprosto sliko mačke.

**Dober prompt:** »Puhasta oranžna mačka z modrimi očmi sedi na drevesu v čarobnem gozdu ponoči. Okoli nje rastejo svetleče gobe. Slika je v slogu risanke, v toplih tonih.« → Slika bo veliko bolj zanimiva in posebna!

---

## Čarobne besede za boljše prompte ✨

- **»podrobno«** – doda več detajlov
- **»svetle barve«** – ustvari veselo vzdušje
- **»dramatična osvetlitev«** – naredi sliko bolj napeto
- **»v slogu …«** – posnema določen umetniški slog',
    key_concepts = '[
        {"name": "Prompt", "explanation": "Prompt je kot recept. Pomisli na peko peciva. Če imaš dober recept, bo pecivo okusno in lepo. Če pa imaš slab recept, bo pecivo žal razpadlo ali pa sploh ne bo dobro. Prompt je torej tvoje navodilo računalniku. Bolj natančno kot mu opišeš svojo idejo, lepšo sliko bo ustvaril za tebe. 🎨"},
        {"name": "Opis", "explanation": "Opis je, ko z besedami poveš, kako nekaj izgleda. 📝 Zapri oči in pomisli na svojo najljubšo žival. Zdaj pa jo opiši — povej, kakšne barve je, kako je velika, kaj počne. To, kar si ravnokar naredil, je opis!"},
        {"name": "Ključne besede", "explanation": "Ključne besede so najpomembnejše besede v tvojem promptu — tiste, ki računalniku povejo, kaj je na sliki najbolj pomembno! 🗝️"},
        {"name": "Specifičnost", "explanation": "Specifičnost pomeni, da je nekaj posebno in drugačno od drugih stvari. Na primer, če imamo veliko slik, ki prikazujejo različne živali, potem je posebej zanimiva tista slika, ki prikazuje rdečo pando, ker je to žival, ki jo srečamo redko."}
    ]'::jsonb,
    quiz_questions = '[
        {
            "question": "Kaj je prompt?",
            "options": ["Računalniški program", "Opis slike, ki jo želiš ustvariti", "Vrsta barve", "Ime AI orodja"],
            "correctAnswer": 1,
            "explanation": "Dober prompt = ključne besede + opis. Skupaj računalniku povesta vse, kar potrebuje, da ustvari tvojo popolno sliko! 🚀"
        },
        {
            "question": "Iz koliko delov je sestavljen dober prompt za sliko?",
            "options": ["2 dela", "3 dele", "4 dele", "5 delov"],
            "correctAnswer": 2,
            "explanation": "Dober prompt je sestavljen iz 4 delov: 🎯 Predmet — KAJ je na sliki, 🔍 Podrobnosti — KAKŠEN je, 🌍 Okolje — KJE se nahaja, 🎨 Slog — KAKO naj izgleda. Ko vključiš vse štiri dele, računalnik točno ve, kaj naj nariše — slika bo podrobna, zanimiva in točno takšna, kot si jo želiš! 🚀"
        },
        {
            "question": "Katero čarobno besedo dodaš v prompt, da bo slika bolj podrobna?",
            "options": ["»hitro«", "»podrobno«", "»preprosto«", "»majhno«"],
            "correctAnswer": 1,
            "explanation": "Kadar v prompt dodaš besedo »podrobno«, se na sliki pojavi veliko več zanimivih detajlov — slika postane bolj realistična in zanimiva!"
        },
        {
            "question": "Kako izgleda slab prompt za sliko?",
            "options": ["»Puhasta oranžna mačka z modrimi očmi v čarobnem gozdu«", "»Mačka«", "»Mačka v gozdu, anime slog, svetle barve«", "»Velika mačka, ki sedi na drevesu«"],
            "correctAnswer": 1,
            "explanation": "Slab prompt je prekratek ali premalo podroben — računalniku ne pove dovolj, da bi ustvaril zanimivo sliko."
        }
    ]'::jsonb,
    updated_at = NOW()
WHERE title = 'Pisanje promptov za slike'
  AND course_id = (SELECT id FROM courses WHERE slug = 'ai-art-studio');

-- =====================================================
-- LESSON 3: Umetnostni slogi skozi zgodovino
-- =====================================================
UPDATE course_lessons
SET content = E'# Umetnostni slogi skozi zgodovino 🎨

Da bi ustvarjal še boljšo AI umetnost, je koristno poznati različne umetnostne sloge. Vsak slog ima svoje posebnosti in čar!

---

## 🖌️ Impresionizem (1870)

Impresionizem prepoznaš po mehkih potezah čopiča, svetlih barvah in prizorih iz narave. Najznamenitejša umetnika sta bila Claude Monet in Renoir.

**Prompt:** »V slogu impresionizma, mehke poteze čopiča.«

---

## 📐 Kubizem (1900)

Kubizem prepoznaš po geometrijskih oblikah in predmetih, prikazanih iz več zornih kotov hkrati. Najpomembnejša umetnika sta bila Pablo Picasso in Georges Braque.

**Prompt:** »V slogu kubizma, geometrijske oblike.«

---

## 🌈 Pop art (1950)

Pop art prepoznaš po živih barvah, ponavljajočih se vzorcih in motivih iz vsakdanjega življenja. Najbolj znana umetnika sta bila Andy Warhol in Roy Lichtenstein.

**Prompt:** »Pop art slog, žive barve, pike.«

---

## 💻 Digitalna umetnost (danes)

Digitalna umetnost ponuja neskončne možnosti — od zelo realističnih slik do čarobnih fantazijskih svetov.

**Prompt:** »Digitalna umetnost, podrobno, svetleče barve.«

---

## 🌸 Risanka in anime

Ta slog prepoznaš po velikih očeh, poenostavljenih oblikah in izrazitih, živahnih barvah.

**Prompt:** »Anime slog« ali »risanka slog.«

---

## 🏆 Izziv za tebe!

Izberi en predmet — na primer mačko, hišo ali drevo — in ga ustvari v vseh 5 različnih slogih. Nato primerjaj rezultate in poglej, kako drugačen je lahko isti predmet! 🚀',
    key_concepts = '[
        {"name": "Umetnostna zgodovina", "explanation": "Umetnostna zgodovina je zgodba o umetnosti skozi čas. Poznavanje različnih slogov ti pomaga, da računalniku natančno poveš, kakšno sliko želiš ustvariti! 🎨"},
        {"name": "Impresionizem", "explanation": "Impresionizem je slog z mehkimi potezami in svetlimi barvami, ki ujame lepoto trenutka v naravi. Popoln slog za čarobne in nežne slike! 🌸"},
        {"name": "Kubizem", "explanation": "Kubizem je slog, kjer so stvari narisane iz geometrijskih oblik in prikazane iz več strani hkrati. Ustvarja nenavadne, domišljijske slike, ki te naučijo gledati na svet povsem drugače! 🚀"},
        {"name": "Pop art", "explanation": "Pop art je veseli, pisani slog, ki navdih jemlje iz vsakdanjega življenja. Žive barve in ponavljajoči se vzorci naredijo vsako sliko zabavno in energično! 🎉"}
    ]'::jsonb,
    quiz_questions = '[
        {
            "question": "Za kateri umetnostni slog so značilne mehke poteze in svetle barve?",
            "options": ["Kubizem", "Pop art", "Impresionizem", "Digitalna umetnost"],
            "correctAnswer": 2,
            "explanation": "Impresionizem = mehke poteze + svetle barve + narava. Popoln slog za nežne in sanjske slike! 🎨"
        },
        {
            "question": "V katerem umetnostnem slogu so predmeti narisani iz geometrijskih oblik in prikazani iz več strani hkrati?",
            "options": ["Impresionizem", "Kubizem", "Anime", "Pop art"],
            "correctAnswer": 1,
            "explanation": "Kubizem = geometrijske oblike + več zornih kotov hkrati. Slog, ki ti pokaže svet na popolnoma nov in drugačen način! 🚀"
        },
        {
            "question": "Za kateri umetnostni slog so značilne žive barve in ponavljajoči se vzorci?",
            "options": ["Impresionizem", "Kubizem", "Pop art", "Digitalna umetnost"],
            "correctAnswer": 2,
            "explanation": "Pop art = žive barve + ponavljajoči se vzorci + vsakdanje življenje. Najbolj veseli in energični umetnostni slog! 🌈"
        },
        {
            "question": "V katerem umetnostnem slogu lahko ustvarjaš vse — od realističnih do fantazijskih slik?",
            "options": ["Impresionizem", "Kubizem", "Pop art", "Digitalna umetnost"],
            "correctAnswer": 3,
            "explanation": "Digitalna umetnost = računalnik + domišljija + neskončne možnosti. Sodoben slog, ki ti omogoča ustvarjanje vsega, o čemer sanjaš! 🎨✨"
        }
    ]'::jsonb,
    updated_at = NOW()
WHERE title = 'Umetnostni slogi skozi zgodovino'
  AND course_id = (SELECT id FROM courses WHERE slug = 'ai-art-studio');

-- =====================================================
-- LESSON 4: Moja prva AI slika
-- =====================================================
UPDATE course_lessons
SET content = E'# Moja prva AI slika 🎨

Čas je, da ustvariš svojo prvo AI sliko! Slediti moraš samo štirim preprostim korakom! 🚀

---

## Korak 1: Izberi temo 🌟

Najprej pomisli — kaj te navdušuje? Živali, vesolje, pravljice ali morda kaj drugega? Izberi temo, ki ti je najbolj pri srcu, in pojdimo naprej!

---

## Korak 2: Napiši prompt ✍️

Spomni se recepta za dober prompt — predmet, podrobnosti, okolje in slog:

- 🎯 **Predmet:** pav
- 🔍 **Podrobnosti:** z zlatim perjem, razprostrt rep
- 🌍 **Okolje:** v čarobnem vrtu s svetlečimi vrtnicami
- 🎨 **Slog:** fantazijski, podrobno, svetle barve

**Celoten prompt:**

> »Veličasten pav z zlatim perjem in razprostrtim repom stoji v čarobnem vrtu s svetlečimi vrtnicami, fantazijski slog, podrobno, svetle barve, čarobna atmosfera.«

---

## Korak 3: Ustvari! 🖥️

Zdaj vnesi svoj prompt v AI orodje za ustvarjanje slik na naši platformi in pritisni ustvari. Računalnik bo naredil vse ostalo! ✨

---

## Korak 4: Oceni in izboljšaj 🔍

Poglej rezultat in si zastavi vprašanja:

- Ali je slika takšna, kot si si jo zamislil/a?
- Kaj bi spremenil/a ali dodal/a?
- Kateri del prompta bi popravil/a?

Spremeni samo en del prompta naenkrat in poglej, kako se slika spremeni!

---

## 💡 Nasveti za boljše slike

- Daljši prompt = bolj natančna in podrobna slika
- Poskusi različne sloge za isti predmet — rezultati te bodo presenetili!
- Če ti slika ni všeč, spremeni samo en del prompta naenkrat

---

🏆 **Zapomni si:** Vsaka slika je korak naprej! Več kot ustvarjaš, boljši/a boš. Pogumno in ustvarjaj! 🎨',
    key_concepts = '[
        {"name": "Generiranje slik", "explanation": "Generiranje slik = ti napišeš prompt + računalnik ustvari sliko. Skupaj lahko ustvarita prave umetnine! ✨"},
        {"name": "Iteracija", "explanation": "Iteracija = poskusi + poglej + izboljšaj + ponovi! Bolj kot iteriraš, boljše slike boš ustvarjal/a! 🚀"},
        {"name": "Eksperimentiranje", "explanation": "Eksperimentiranje = poskusi + opazuj + izboljšaj! Več kot eksperimentiraš, bolj čudovite slike boš ustvarjal/a! 🚀"},
        {"name": "Spraviti na varno", "explanation": "Spraviti na varno = tvoje delo je varno in dostopno kadarkoli! Ne pozabi shraniti svoje slike, ko si z njo zadovoljen/na! 💾✨"}
    ]'::jsonb,
    quiz_questions = '[
        {
            "question": "Kateri je prvi korak na poti do tvoje prve AI slike?",
            "options": ["Napiši prompt", "Izberi temo", "Pritisni gumb", "Oceni rezultat"],
            "correctAnswer": 1,
            "explanation": "Prvi korak pri ustvarjanju AI slike je, da izbereš temo, ki te navdušuje. To je kot izbira pustolovščine, ki jo želiš doživeti! 🗺️"
        },
        {
            "question": "Kaj lahko storiš, da bo tvoja AI slika še lepša?",
            "options": ["Nič, slika je vedno popolna", "Oceni rezultat in popravi prompt", "Počakaš en dan in poskusiš znova", "Izbereš drugo temo"],
            "correctAnswer": 1,
            "explanation": "Zapomni si: Oceni, popravi in poskusi znova — vsaka iteracija te pripelje bližje do slike svojih sanj! 🚀✨"
        },
        {
            "question": "Kako ti iteracija pomaga ustvariti boljšo AI sliko?",
            "options": ["Z iteracijo hitro izdelaš veliko slik", "Z iteracijo poskušaš, gledaš in izboljšuješ sliko", "Iteracija ti pomaga izbrati barve", "Iteracija ti pove, kaj je narobe"],
            "correctAnswer": 1,
            "explanation": "Zapomni si: Iteracija = ponavljaj in izboljšuj! Vsak poskus te pripelje bližje do popolne slike! 🎨✨"
        },
        {
            "question": "Zakaj moraš svojo AI sliko spraviti na varno?",
            "options": ["Da jo lahko prodaš", "Da bo tvoje delo varno in dostopno kadarkoli", "Da jo računalnik ne izbriše", "Da jo lahko spreminjaš"],
            "correctAnswer": 1,
            "explanation": "Zapomni si: Vedno spravi svojo AI sliko na varno — tako bo tvoje umetniško delo varno in dostopno kadarkoli! 💾✨"
        }
    ]'::jsonb,
    updated_at = NOW()
WHERE title = 'Moja prva AI slika'
  AND course_id = (SELECT id FROM courses WHERE slug = 'ai-art-studio');

-- =====================================================
-- LESSON 5: Zgodbe s slikami
-- =====================================================
UPDATE course_lessons
SET content = E'# Zgodbe s slikami 📖

Kaj pa, če bi ustvaril/a svojo celotno slikovno zgodbo s pomočjo AI? Zdaj je to mogoče — in zelo zabavno! 🚀

---

## Kaj je slikanica?

Slikanica je zgodba, ki jo spremljajo čudovite slike. Z AI lahko ustvariš oboje — tako besedilo kot slike! 🎨

---

## Projekt: Moja AI slikanica 🏆

### Korak 1: Napiši zgodbo ✍️

Napiši kratko zgodbo s 5 do 8 stavki. Vsak stavek bo kasneje dobil svojo sliko!

**Primer zgodbe:**

1. Mala robotka Bip se je prebudila v svoji delavnici.
2. Skozi okno je videla, da je padel sneg.
3. Nikoli še ni videla snega — takoj je stekla ven!
4. Naredila je svojega prvega snežaka — snežnega robota!
5. Od takrat je Bipin najljubši letni čas zima. ❄️

### Korak 2: Ustvari slike za vsak stavek 🖼️

Za vsak stavek zgodbe napiši prompt z istim opisom glavnega lika — tako bo lik na vsaki sliki izgledal enako!

### Korak 3: Sestavi slikanico 📚

Ko imaš vse slike, jih združi z besedilom in tvoja slikanica je končana!

---

## 💡 Nasvet za doslednost

**Problem:** AI lahko nariše lika nekoliko drugače na vsaki sliki! 😟

**Rešitev:** V vsakem promptu uporabi popolnoma enak opis lika. Na primer:

> »Majhna srebrna robotka z modrimi očmi in rdečo pentljo...«

Ta opis uporabi v vsakem promptu — tako bo tvoja robotka Bip na vsaki sliki izgledala enako! 🌟

---

💡 **Zapomni si:** Dobra AI slikanica = zanimiva zgodba + dosledni prompti + čudovite slike. Ustvari svojo zgodbo in postani pravi/a pisatelj/ica in umetnik/ca hkrati! 🎨📖',
    key_concepts = '[
        {"name": "Slikanica", "explanation": "Slikanica = tvoja zgodba + tvoje slike. Z AI lahko postaneš pravi/a pisatelj/ica in umetnik/ca hkrati! 🎨📖"},
        {"name": "Zgodba", "explanation": "Zgodba = domišljija + pustolovščina + novi prijatelji. Vzemi svojo škatlo barvic in začni ustvarjati svojo lastno zgodbo! 🎨📖"},
        {"name": "Doslednost", "explanation": "Doslednost = vsakič enako! Pri AI slikanici pomeni, da tvoj junak na vsaki sliki izgleda enako — tako ga bralci vedno prepoznajo! 🎨🚀"},
        {"name": "Liki", "explanation": "Liki so junaki tvoje zgodbe. Bolj natančno kot jih opišeš v promptu, bolj dosledni bodo na vsaki sliki! 🎨🚀"}
    ]'::jsonb,
    quiz_questions = '[
        {
            "question": "Kaj je slikanica?",
            "options": ["Samo slike brez besedila", "Zgodba, ki jo spremljajo čudovite slike", "Zbirka fotografij", "Računalniška igra"],
            "correctAnswer": 1,
            "explanation": "Slikanica = tvoja zgodba + tvoje slike. Z AI postaneš pravi/a pisatelj/ica in umetnik/ca hkrati! 🚀✨"
        },
        {
            "question": "Kako ustvarimo slikanico z AI?",
            "options": ["Samo napišemo zgodbo", "Napišemo zgodbo, ustvarimo slike in vse skupaj združimo", "Samo narišemo slike", "Poiščemo slike na spletu"],
            "correctAnswer": 1,
            "explanation": "AI slikanica = zgodba + slike + združitev v celoto. Tri preprosti koraki do tvojega lastnega umetniškega dela! 🏆✨"
        },
        {
            "question": "Zakaj je pomembna doslednost pri ustvarjanju slikanice?",
            "options": ["Da je zgodba daljša", "Da lik izgleda enako na vsaki sliki", "Da so slike bolj barvite", "Da je slikanica hitro končana"],
            "correctAnswer": 1,
            "explanation": "Doslednost = lik izgleda enako na vsaki sliki. Tako bralec vedno ve, kdo je kdo — in zgodba je jasna ter zabavna! 🎨📖"
        },
        {
            "question": "Kako zagotoviš, da bo tvoj lik v AI slikanici na vsaki sliki izgledal enako?",
            "options": ["Uporabiš različne opise lika", "Uporabiš enak opis lika v vsakem promptu", "Narišeš lika ročno", "Preskočiš nekatere slike"],
            "correctAnswer": 1,
            "explanation": "Enak opis lika v vsakem promptu = dosleden junak na vsaki sliki. Tako je zgodbo lahko slediti in še bolj zabavno brati! 🎨📖"
        }
    ]'::jsonb,
    updated_at = NOW()
WHERE title = 'Zgodbe s slikami'
  AND course_id = (SELECT id FROM courses WHERE slug = 'ai-art-studio');

-- =====================================================
-- LESSON 6: Napredne tehnike generiranja slik
-- =====================================================
UPDATE course_lessons
SET content = E'# Napredne tehnike generiranja slik 🚀

Ko obvladaš osnove, je čas za naprednejše trike, ki bodo tvoje slike dvignili na višjo raven! ✨

---

## 🚫 Tehnika 1: Negativni prompt

Računalniku povej, česa ne želiš na sliki:

- »Brez besedila na sliki.«
- »Brez ljudi.«
- »Brez temnih barv.«

Tako bo slika točno takšna, kot si jo zamislil/a — brez nepotrebnih stvari! 👍

---

## 🎨 Tehnika 2: Mešanje slogov

Kombiniraj dva različna sloga in ustvari nekaj popolnoma edinstvenega:

- »Anime + akvarel« — nežna risanka z mehkimi barvami
- »Steampunk + narava« — mehanska narava z zobniki in rastlinami
- »Retro + vesolje« — starinska vesoljska pustolovščina

---

## 😊 Tehnika 3: Razpoloženje in atmosfera

Dodaj čustvene opise, da slika izrazi pravo razpoloženje:

- 🌞 **Veselo:** svetlo, barvito, sončno, toplo
- 🌙 **Skrivnostno:** megleno, temno, skrivnostno, luna
- ⚡ **Epsko:** dramatično, veličastno, zlato, mogočno

---

## 📷 Tehnika 4: Perspektiva

Spremeni zorni kot in slika bo takoj drugačna:

- 🦅 »Od zgoraj« — ptičja perspektiva
- 🐸 »Od spodaj« — žabja perspektiva
- 🔍 »Bližnji posnetek« — pokaže vse podrobnosti
- 🌅 »Širok pogled« — panorama celotnega prizora

---

## 💡 Tehnika 5: Osvetlitev

Dodaj posebno svetlobo in slika bo dobila čarobno vzdušje:

- 🌅 »Zlata ura« — topla in nežna svetloba sončnega zahoda
- 🌆 »Neonske luči« — futuristična, barvita mestna svetloba
- 🕯️ »Sveča« — intimno in toplo vzdušje
- 🌌 »Severni sij« — čarobna, barvita nočna svetloba

---

💡 **Zapomni si:** Napredne tehnike = boljše slike! Poskusi kombinirati več tehnik hkrati in ustvari svojo popolno, edinstveno sliko! 🎨🏆',
    key_concepts = '[
        {"name": "Negativni prompt", "explanation": "Negativni prompt = povej računalniku, česa ne želiš. Tako bo slika še bolj točno takšna, kot si jo zamislil/a! 🎨🚀"},
        {"name": "Mešanje slogov", "explanation": "Mešanje slogov = dva sloga + ena edinstvena slika! Poskusi različne kombinacije in ustvari svoj popolnoma nov slog! 🚀🏆"},
        {"name": "Perspektiva", "explanation": "Perspektiva = zorni kot, od koder gledaš. Spremeni perspektivo in ista stvar bo videti popolnoma drugače — kot da jo vidiš prvič! 🚀🎨"},
        {"name": "Osvetlitev", "explanation": "Osvetlitev = svetloba, ki dá sliki posebno vzdušje. Prava osvetlitev spremeni vsako sliko v pravo umetnino! 🎨🚀"}
    ]'::jsonb,
    quiz_questions = '[
        {
            "question": "Kako računalniku poveš, česa NE želiš na svoji sliki?",
            "options": ["Z dolgim promptom", "Z negativnim promptom", "Z barvami", "Z velikostjo slike"],
            "correctAnswer": 1,
            "explanation": "Negativni prompt = povej računalniku, česa NE želiš! Tako bo tvoja slika še bolj popolna in točno takšna, kot si jo sanjal/a! 🎨🚀"
        },
        {
            "question": "Kaj nastane, ko združiš dva različna umetnostna sloga, na primer anime in akvarel?",
            "options": ["Zmeda", "Edinstvena kombinacija slogov", "Napaka", "Prazna slika"],
            "correctAnswer": 1,
            "explanation": "Mešanje slogov = dva sloga + ena edinstvena slika! Poskusi različne kombinacije in ustvari svoj popolnoma nov slog! 🚀🏆"
        },
        {
            "question": "Katere besede uporabiš, da bo tvoja slika vesela, skrivnostna ali epska?",
            "options": ["Samo barve", "Čustvene opise razpoloženja", "Samo velikost", "Imena mest"],
            "correctAnswer": 1,
            "explanation": "Prave besede = pravo razpoloženje! Samo ena beseda lahko tvojo sliko popolnoma spremeni! 🎨🚀"
        },
        {
            "question": "Kaj je ptičja perspektiva?",
            "options": ["Pogled od spodaj", "Pogled od zgoraj", "Bližnji posnetek", "Širok pogled"],
            "correctAnswer": 1,
            "explanation": "Ptičja perspektiva = pogled od zgoraj, kot ptica! Tvoje slike bodo takoj bolj veličastne in dramatične! 🎨🚀"
        }
    ]'::jsonb,
    updated_at = NOW()
WHERE title = 'Napredne tehnike generiranja'
  AND course_id = (SELECT id FROM courses WHERE slug = 'ai-art-studio');

-- =====================================================
-- LESSON 7: Kako AI ustvarja glasbo
-- =====================================================
UPDATE course_lessons
SET content = E'# Kako AI ustvarja glasbo? 🎵

AI ne ustvarja samo slik — ustvarja tudi glasbo! In to glasbo, ki je še nihče ni slišal! 🎶✨

---

## Glasba je matematika! 🔢

To je velika skrivnost glasbe — je polna vzorcev in pravil:

- 🥁 **Ritem** — ponavljajoč se vzorec udarcev, ki dá glasbi energijo
- 🎵 **Melodija** — zaporedje not, ki sledijo posebnim pravilom
- 🎹 **Harmonija** — kombinacija not, ki skupaj zvenijo lepo in prijetno

AI se lahko nauči vseh teh pravil — in jih uporabi za ustvarjanje glasbe! 🤖

---

## Kako AI ustvari pesem? 🎼

AI ustvari pesem v štirih korakih:

1. 👂 AI posluša tisoče pesmi in se uči iz njih
2. 🔍 Najde vzorce — na primer: »po akordu C pogosto pride G«
3. 🎵 Ustvari novo melodijo, ki sledi tem vzorcem
4. 🌟 Rezultat je popolnoma nova pesem, ki nikoli prej ni obstajala!

---

## AI glasbena orodja 🎹

Preizkusi ta brezplačna orodja:

- 🎵 **Chrome Music Lab** — brezplačno in zabavno eksperimentiranje z glasbo
- 🎻 **AIVA** — AI skladatelj za klasično glasbo
- 🎤 **Boomy** — ustvari svojo pesem v samo nekaj sekundah

---

## Eksperiment z Music Lab! 🔬

Obišči **musiclab.chromeexperiments.com** in preizkusi:

- 🎼 **Song Maker** — ustvari svojo melodijo s preprostimi kliki
- 🥁 **Rhythm** — eksperimentiraj z različnimi ritmi
- 🎨 **Kandinsky** — pretvori svojo risbo v glasbo!

---

## 🌟 Zanimivost

Nekatere AI pesmi so tako dobre, da jih ljudje ne morejo ločiti od pesmi, ki jih je napisal človek! Si ti zmogel/la? 🤔

---

💡 **Zapomni si:** AI ustvarja glasbo tako, da se uči vzorcev iz tisoče pesmi — in potem ustvari svojo, popolnoma novo! Glasba + matematika + AI = čarobna kombinacija! 🎵🚀',
    key_concepts = '[
        {"name": "AI glasba", "explanation": "AI glasba = glasba, ki jo ustvari računalnik! Uči se iz tisoče pesmi in ustvari svojo — popolnoma novo in edinstveno! 🎵🚀"},
        {"name": "Melodija", "explanation": "Melodija je tisti čarobni del glasbe, ki se ti zapije v glavo. Ko se naučiš ustvarjati melodije, boš ustvaril/a glasbo, ki bo popolnoma tvoja! 🎵🚀"},
        {"name": "Ritem", "explanation": "Ritem je srce glasbe — brez njega glasba ne bi živela! Ko razumeš ritem, lahko ustvariš glasbo, ki bo zabavna, energična in popolnoma tvoja! 🎵🚀"},
        {"name": "Harmonija", "explanation": "Harmonija je kombinacija not, ki skupaj zvenijo lepo in prijetno. Je kot ekipa not, ki skupaj ustvarjajo čudovite zvoke! 🎹✨"}
    ]'::jsonb,
    quiz_questions = '[
        {
            "question": "Zakaj je ritem kot srce glasbe?",
            "options": ["Ker je najglasnejši", "Ker dá glasbi energijo in življenje", "Ker je najhitrejši", "Ker je najlažji za učenje"],
            "correctAnswer": 1,
            "explanation": "Ritem je srce glasbe — brez njega glasba ne bi živela! Računalnik se nauči ritma iz tisoče pesmi in ga uporabi za ustvarjanje nove, edinstvene glasbe! 🎵🚀"
        },
        {
            "question": "Kako ti AI glasbena orodja pomagajo ustvariti svojo pesem?",
            "options": ["Ti pojejo pesem", "Ti omogočajo eksperimentiranje z glasbo", "Ti povedo, kaj je narobe", "Ti pokažejo, kako igrati inštrument"],
            "correctAnswer": 1,
            "explanation": "AI glasbena orodja, kot je Chrome Music Lab, so zelo zabavna! Pomagajo ljudem eksperimentirati z glasbo in ustvarjati novo. To je kot igra, ki jo lahko igrajo vsi, ki so zainteresirani za glasbo."
        },
        {
            "question": "Zakaj je melodija tisti del glasbe, ki ga poješ celi dan?",
            "options": ["Ker je najglasnejši", "Ker je zaporedje not, ki se ti zapije v glavo", "Ker je najhitrejši", "Ker ga igra največ inštrumentov"],
            "correctAnswer": 1,
            "explanation": "Melodija je kot zgodba, ki jo pripovedujemo z notami — je zaporedje not, ki sledijo posebnim pravilom in skupaj ustvarijo tisti čarobni del pesmi, ki se ti zapije v glavo! 🎶✨"
        },
        {
            "question": "Kaj naredi računalnik, da ustvari pesem, ki še nikoli ni obstajala?",
            "options": ["Prekopira obstoječo pesem", "Se uči iz tisoče pesmi in poišče vzorce", "Vpraša človeka za pomoč", "Izbere naključne note"],
            "correctAnswer": 1,
            "explanation": "AI ustvari novo glasbo tako, da se uči iz tisoče pesmi in poišče vzorce. Je kot zelo marljiv učenec, ki postane pravi skladatelj! 🎵🚀"
        }
    ]'::jsonb,
    updated_at = NOW()
WHERE title = 'Kako AI ustvarja glasbo'
  AND course_id = (SELECT id FROM courses WHERE slug = 'ai-art-studio');

-- =====================================================
-- LESSON 8: Zvočna pokrajina
-- =====================================================
UPDATE course_lessons
SET content = E'# Zvočna pokrajina 🎵

Zvočna pokrajina je zbirka zvokov, ki skupaj ustvarijo posebno atmosfero in vzdušje — kot da bi zaprl/a oči in se preselil/a v drug svet! 🌍✨

---

## Primeri zvočnih pokrajin

- 🌲 **Gozd** — ptičje petje, šelestenje listja, žuborenje potoka
- 🌊 **Morje** — valovi, krik galebov, piš vetra
- 🏙️ **Mesto** — hrup avtomobilov, glasovi ljudi, glasba iz lokalov
- 🚀 **Vesolje** — popolna tišina... ali čarobni fantastični zvoki!

---

## Kaj zmore AI? 🤖

AI lahko ustvari zvoke, ki v resnici ne obstajajo. Na primer:

- 🪐 Kako zveni planet iz drugega osončja?
- 🔵 Kako zveni barva modra?
- 🌹 Kako zveni vonj po vrtnicah?

To so vprašanja, na katera samo AI zna odgovoriti! 🌟

---

## Projekt: Moja zvočna zgodba 🎬

Združi slike in zvoke v svojo lastno multimedijsko izkušnjo:

1. 🖼️ Ustvari 3 AI slike za svojo zgodbo
2. 🎵 Ustvari zvočno pokrajino za vsako sceno
3. 📽️ Združi vse skupaj v predstavitev

**Primer:**

- 🌲 Scena 1: Gozd — ptičje petje, nežna melodija
- ⛈️ Scena 2: Nevihta — grmenje, dež, dramatična glasba
- 🌈 Scena 3: Mavrica — tihi zvonci, vesela melodija

---

## Kaj je sinestezija? 🌈

Sinestezija je čaroben pojav, ko en čut sproži drugega:

- 👁️ Slišiš barvo
- 👂 Vidiš glasbo
- 👅 Okusiš obliko

AI nam pomaga izkusiti sinestezijo — pretvori slike v glasbo ali glasbo v slike! 🎨🎵

---

💡 **Zapomni si:** Zvočna pokrajina = zvoki, ki ustvarijo posebno vzdušje. Z AI lahko ustvariš zvočno zgodbo, ki bo gledalce prenesla v popolnoma nov svet! 🚀✨',
    key_concepts = '[
        {"name": "Zvočna pokrajina", "explanation": "Vsaka pokrajina ima svoje posebne zvoke, ki jo naredijo edinstveno. Zvočna pokrajina je kot glasbena slika kraja — zapri oči in takoj veš, kje si! 🎵🚀"},
        {"name": "Sinestezija", "explanation": "Sinestezija je čaroben pojav, ko en čut sproži drugega. Je kot čarobna vez med tvojimi čutili — in AI ti pomaga to izkusiti! 🚀✨"},
        {"name": "Multimedija", "explanation": "Multimedija = slike + zvoki + besedilo — vse skupaj v eni čarobni izkušnji! Z AI lahko ustvariš svojo lastno multimedijsko zgodbo! 🚀🎨🎵"},
        {"name": "Atmosfera", "explanation": "Atmosfera je vzdušje, ki ga čutiš. S pravimi zvoki lahko ustvariš katerokoli atmosfero — veselo, skrivnostno, mirno ali napeto! 🌟"}
    ]'::jsonb,
    quiz_questions = '[
        {
            "question": "Kaj je zvočna pokrajina?",
            "options": ["Slika pokrajine", "Zbirka zvokov, ki ustvarijo atmosfero kraja", "Glasba iz radia", "Govor ljudi"],
            "correctAnswer": 1,
            "explanation": "Zvočna pokrajina = zbirka zvokov, ki ustvarijo atmosfero kraja. Zapri oči, poslušaj — in takoj boš vedel/a, kje si! 🎵🚀"
        },
        {
            "question": "Kako AI ustvari zvoke, ki jih v resnici ne moremo slišati?",
            "options": ["Jih posname v naravi", "Jih ustvari iz svoje domišljije", "Jih prekopira", "Jih ne more ustvariti"],
            "correctAnswer": 1,
            "explanation": "AI lahko ustvari zvoke, ki jih v resničnem svetu ne moremo slišati. Je kot čarobni izumitelj zvokov — njegova domišljija nima meja! 🚀🎵"
        },
        {
            "question": "Kaj ustvariš pri projektu Moja zvočna zgodba?",
            "options": ["Samo slike", "Samo zvoke", "Slike in zvoke, združene v multimedijsko izkušnjo", "Samo besedilo"],
            "correctAnswer": 2,
            "explanation": "Moja zvočna zgodba = slike + zvoki + besedilo. Vse skupaj ustvari čarobno multimedijsko izkušnjo, ki bo navdušila vsakogar! 🚀🌟"
        },
        {
            "question": "Kako se imenuje posebna izkušnja, ko na primer slišiš barvo ali vidiš glasbo?",
            "options": ["Melodija", "Harmonija", "Sinestezija", "Atmosfera"],
            "correctAnswer": 2,
            "explanation": "Sinestezija = ko en čut sproži drugega. Je čaroben pojav, ki ga AI posnema, ko pretvarja slike v glasbo ali glasbo v slike! 🎨🎵🚀"
        }
    ]'::jsonb,
    updated_at = NOW()
WHERE title = 'Zvočna pokrajina'
  AND course_id = (SELECT id FROM courses WHERE slug = 'ai-art-studio');

-- =====================================================
-- LESSON 9: Zaključna razstava - moj AI portfolio
-- =====================================================
UPDATE course_lessons
SET content = E'# Zaključna razstava — moj AI portfolio 🎨🏆

Čestitke! Prišel/la si do zadnje lekcije AI umetniškega studia! Čas je, da pokažeš vse, kar si se naučil/a — tvoja lastna umetniška razstava te čaka! 🌟✨

---

## Zaključni projekt: Moja AI razstava 🖼️

Ustvari mini umetniško razstavo s 5 umetniškimi deli:

### 1. 👤 Portret — oseba ali žival

Ustvari podroben portret v svojem najljubšem umetnostnem slogu!

### 2. 🌄 Pokrajina — narava ali mesto

Ustvari čudovito pokrajino z naprednimi tehnikami osvetlitve!

### 3. 🧚 Fantazija — izmišljeni svet

Pusti domišljiji prosto pot in ustvari svet, ki še ne obstaja! 🚀

### 4. 📖 Zgodba v sliki

Ustvari eno samo sliko, ki pripoveduje celotno zgodbo!

### 5. 🌟 Tvoja izbira

Karkoli želiš — to je tvoj prosti prostor za ustvarjanje!

---

## Za vsako delo napiši 📝

- 🏷️ **Naslov** — ime tvojega umetniškega dela
- ✍️ **Prompt** — kaj si napisal/a AI
- 💭 **Razmišljanje** — zakaj si izbral/a to temo ali slog
- 🧠 **Kaj sem se naučil/a** — kaj si odkril/a pri ustvarjanju

---

## Umetnik/ca si TI! 🎨

Skozi ta tečaj si spoznal/a štiri pomembne resnice:

- 🖌️ AI je orodje — tako kot čopič ali svinčnik
- 💡 TVOJA ustvarjalnost je tista, ki naredi umetnost posebno
- ✍️ Dober prompt je umetnost sam po sebi
- 🎭 Različni slogi in tehnike dajejo popolnoma različne rezultate

---

💡 **Hvala, da si bil/a del AI umetniškega studia!** Pokazal/a si pogum, ustvarjalnost in radovednost — lastnosti vsakega pravega umetnika! Tvoja ustvarjalnost nima meja — nadaljuj z ustvarjanjem! 🚀🌈',
    key_concepts = '[
        {"name": "Portfolio", "explanation": "Portfolio = zbirka tvojih najboljših del! Ko ga odpreš, vidiš vse, kar si ustvaril/a — in kako zelo si napredoval/a! 🚀🌟"},
        {"name": "Razstava", "explanation": "Razstava = prostor, kjer deliš svojo ustvarjalnost z drugimi. Tvoja AI razstava bo pokazala vse, kar si se naučil/a — in kako daleč si prišel/la! 🚀🎨"},
        {"name": "Predstavitev", "explanation": "Predstavitev = praznik tvojega znanja in ustvarjalnosti! Pokaži svetu, kaj zmoreš — ker si to res zaslužil/a! 🚀🎨"},
        {"name": "Kreativnost", "explanation": "Kreativnost je tista čarobna iskrica, ki naredi tvojo AI umetnost posebno in edinstveno. AI je samo orodje — umetnik/ca si TI! 🎨🚀"}
    ]'::jsonb,
    quiz_questions = '[
        {
            "question": "Kaj ustvariš pri zaključnem projektu AI umetniškega studia?",
            "options": ["Eno sliko", "Mini umetniško razstavo s 5 deli", "Samo prompt", "Zgodbo brez slik"],
            "correctAnswer": 1,
            "explanation": "Zaključni projekt = 5 umetniških del + tvoja kreativnost + vse znanje, ki si ga pridobil/a! Čas je, da pokažeš svetu, kakšen/kakšna umetnik/ca si postal/a! 🚀"
        },
        {
            "question": "Koliko delov ima tvoj zaključni projekt?",
            "options": ["3 dele", "4 dele", "5 delov", "10 delov"],
            "correctAnswer": 2,
            "explanation": "Zaključni projekt = 5 umetniških del! Pet priložnosti, da pokažeš svojo kreativnost in vse, kar si se naučil/a v AI umetniškem studiu! 🚀🎨"
        },
        {
            "question": "Kaj je portret in kaj ustvariš pri prvem delu zaključnega projekta?",
            "options": ["Pokrajino", "Podrobno sliko osebe ali živali", "Abstraktno sliko", "Zgodbo"],
            "correctAnswer": 1,
            "explanation": "Portret = podrobna slika osebe ali živali. Je prvi del tvoje zaključne razstave — pokaži vsem, koga ali kaj si izbral/a za svojega junaka! 🚀🎨"
        },
        {
            "question": "Zakaj je »Tvoja izbira« najbolj svoboden del zaključnega projekta?",
            "options": ["Ker je najlažji", "Ker lahko ustvariš karkoli želiš", "Ker ni potrebno pisati prompta", "Ker ni potrebno izbrati sloga"],
            "correctAnswer": 1,
            "explanation": "»Tvoja izbira« je tvoj prosti prostor za ustvarjanje — karkoli želiš! Tu ni pravil — samo tvoja domišljija in kreativnost! 🚀🌟"
        }
    ]'::jsonb,
    updated_at = NOW()
WHERE title = 'Zaključna razstava - moj AI portfolio'
  AND course_id = (SELECT id FROM courses WHERE slug = 'ai-art-studio');

-- =====================================================
-- Update lessons_count and curriculum in courses table
-- =====================================================
UPDATE courses
SET lessons_count = 9,
    curriculum = '[
        {"module": "Uvod v AI umetnost", "lessons": ["Kaj je AI umetnost?", "Pisanje promptov za slike", "Umetnostni slogi skozi zgodovino"]},
        {"module": "Generiranje slik", "lessons": ["Moja prva AI slika", "Zgodbe s slikami", "Napredne tehnike generiranja"]},
        {"module": "Glasba in AI", "lessons": ["Kako AI ustvarja glasbo", "Zvočna pokrajina"]},
        {"module": "Moj AI portfolio", "lessons": ["Zaključna razstava - moj AI portfolio"]}
    ]'::jsonb,
    updated_at = NOW()
WHERE slug = 'ai-art-studio';

-- =====================================================
-- Verification query (run to check updates)
-- =====================================================
-- SELECT title, module_index, lesson_index, updated_at 
-- FROM course_lessons 
-- WHERE course_id = (SELECT id FROM courses WHERE slug = 'ai-art-studio')
-- ORDER BY module_index, lesson_index;
