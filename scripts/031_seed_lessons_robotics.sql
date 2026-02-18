-- Seed lessons for Robotika in AI (25 lessons, 5 modules x 5)
-- Module 1: Uvod v robotiko (5 lessons)
INSERT INTO course_lessons (course_id, module_index, lesson_index, title, content, content_type, duration_minutes, key_concepts)
SELECT c.id, 0, 0,
  'Kaj je robot?',
  E'# Kaj je robot?\n\nRobot je naprava, ki lahko **zazna** okolje, **razmišlja** o tem, kaj zazna, in **ukrepa** glede na svoje odločitve.\n\n## Trije deli vsakega robota\n\n### 1. Senzorji (čutila)\nSenzorji so kot robotova čutila. Kamere so njegove oči, mikrofoni so ušesa, senzorji pritiska so njegov dotik.\n\n### 2. Procesor (možgani)\nProcesor je robotov mozeg. Tu se izvaja program, ki sprejema odločitve na podlagi informacij iz senzorjev.\n\n### 3. Aktuatorji (mišice)\nAktuatorji so robotove mišice - motorji, ki premikajo roke, kolesa ali druge dele.\n\n## Primeri robotov\n\n- **Industrijski roboti** - sestavljajo avtomobile v tovarnah\n- **Kirurški roboti** - pomagajo zdravnikom pri operacijah\n- **Raziskovalni roboti** - kot rover na Marsu\n- **Domači roboti** - sesalniki kot Roomba\n\n## Razmisli\nAli je pametni telefon robot? Ima senzorje (kamero, mikrofon) in procesor, toda nima aktuatorjev za gibanje. Zato ni pravi robot, je pa **pameten** aparat!\n\n## Naloga\nNariši svojega sanjskega robota. Označi njegove senzorje, procesor in aktuatorje. Kakšno nalogo bi opravljal?',
  'text', 45,
  '["robot", "senzorji", "procesor", "aktuatorji", "dele robota"]'
FROM courses c WHERE c.slug = 'robotics-and-ai'
ON CONFLICT (course_id, module_index, lesson_index) DO NOTHING;

INSERT INTO course_lessons (course_id, module_index, lesson_index, title, content, content_type, duration_minutes, key_concepts)
SELECT c.id, 0, 1,
  'Zgodovina robotike',
  E'# Zgodovina robotike\n\nBeseda "robot" izvira iz češke besede **"robota"**, ki pomeni prisilno delo. Prvi jo je uporabil pisatelj Karel Čapek leta 1920.\n\n## Mejniki v zgodovini\n\n### Antika in srednji vek\n- Stari Grki so gradili **avtomatone** - mehanske figure, ki so se premikale\n- Leonardo da Vinci je zasnoval mehanskega viteza leta 1495\n\n### 20. stoletje\n- **1954** - George Devol izumi prvega industrijskega robota Unimate\n- **1966** - Shakey, prvi mobilni robot z AI, razume enostavne ukaze\n- **1997** - Robot Sojourner pristane na Marsu\n\n### 21. stoletje\n- **2000** - Honda predstavi ASIMO, humanoidnega robota\n- **2011** - IBM Watson zmaga v televizijskem kvizu Jeopardy\n- **2020+** - AI roboti se učijo hoditi, govoriti in pomagati ljudem\n\n## Slovenci in robotika\nAli si vedel, da ima Slovenija odlične inženirje robotike? Na Univerzi v Ljubljani in Mariboru razvijajo napredne robote za industrijo in medicino.\n\n## Aktivnost\nUstvari časovnico robotike z najmanj 5 mejniki. Kateri izum se ti zdi najpomembnejši in zakaj?',
  'text', 45,
  '["zgodovina robotike", "Karel Čapek", "Unimate", "ASIMO", "mejniki"]'
FROM courses c WHERE c.slug = 'robotics-and-ai'
ON CONFLICT (course_id, module_index, lesson_index) DO NOTHING;

INSERT INTO course_lessons (course_id, module_index, lesson_index, title, content, content_type, duration_minutes, key_concepts)
SELECT c.id, 0, 2,
  'Vrste robotov',
  E'# Vrste robotov\n\nRoboti prihajajo v vseh oblikah in velikostih. Spoznajmo glavne kategorije.\n\n## 1. Industrijski roboti\nTo so veliki robotski kraki v tovarnah. Opravljajo ponavljajoče naloge: varjenje, barvanje, sestavljanje.\n- **Prednost**: Hitri, natančni, ne potrebujejo počitka\n- **Primer**: ABB, KUKA roboti\n\n## 2. Mobilni roboti\nRoboti, ki se premikajo po prostoru.\n- **Na kolesih**: Dostavni roboti, Roomba\n- **Na nogah**: Boston Dynamics Spot (pes), Atlas (humanoid)\n- **Leteči**: Droni za dostavo, fotografijo\n\n## 3. Humanoidni roboti\nRoboti v obliki človeka. Imajo glavo, trup, roke in noge.\n- **Primer**: Tesla Optimus, Sophia\n- **Izziv**: Človekova hoja je izjemno težka za kopiranje!\n\n## 4. Sodelovalni roboti (coboti)\nManjši roboti, ki varno delajo skupaj z ljudmi.\n- Uporabljajo se v majhnih delavnicah\n- Imajo senzorje, da se ustavijo, če zaznajo človeka\n\n## 5. Mikro in nano roboti\nDrobceni roboti za medicino - nekoč bodo potovali po našem telesu in popravljali celice!\n\n## Naloga\nIzberi eno vrsto robota in napiši kratek esej (5-10 stavkov) o tem, kako bi ta robot lahko pomagal v tvoji šoli.',
  'text', 50,
  '["industrijski roboti", "mobilni roboti", "humanoidni roboti", "coboti", "droni"]'
FROM courses c WHERE c.slug = 'robotics-and-ai'
ON CONFLICT (course_id, module_index, lesson_index) DO NOTHING;

INSERT INTO course_lessons (course_id, module_index, lesson_index, title, content, content_type, duration_minutes, key_concepts)
SELECT c.id, 0, 3,
  'Robotika v Sloveniji',
  E'# Robotika v Sloveniji\n\nSlovenija je majhna država z velikimi dosežki v robotiki!\n\n## Univerza v Ljubljani\nFakulteta za elektrotehniko ima enega najmodernejših laboratorijev za robotiko v regiji. Razvijajo:\n- **Humanoidne robote** za pomoč starejšim\n- **Industrijske robote** za slovenska podjetja\n- **Medicinske robote** za rehabilitacijo\n\n## Slovenska podjetja\n\n### RoboticsX\nRazvija napredne algoritme za robotsko manipulacijo.\n\n### Yaskawa Slovenija\nV Kočevju proizvajajo industrijske robote za ves svet.\n\n## RoboLiga\nAli si vedel, da imamo v Sloveniji tekmovanja v robotiki za mlade? **RoboLiga** organizira tekmovanja, kjer ekipe učencev gradijo in programirajo robote za različne naloge.\n\n## Zakaj je robotika pomembna za Slovenijo?\n- Slovenija ima močno industrijo, ki potrebuje avtomatizacijo\n- Mladi inženirji robotike imajo odlične zaposlitvene možnosti\n- Robotika združuje znanje matematike, fizike, informatike in inženirstva\n\n## Projekt\nRazišči, ali v tvoji okolici obstaja robotski krožek ali tekmovanje. Napiši načrt, kako bi se pridružil ali ustanovil svojega.',
  'activity', 50,
  '["robotika v Sloveniji", "RoboLiga", "Yaskawa", "STEM kariere", "robotska tekmovanja"]'
FROM courses c WHERE c.slug = 'robotics-and-ai'
ON CONFLICT (course_id, module_index, lesson_index) DO NOTHING;

INSERT INTO course_lessons (course_id, module_index, lesson_index, title, content, content_type, duration_minutes, key_concepts)
SELECT c.id, 0, 4,
  'Moj prvi virtualni robot',
  E'# Moj prvi virtualni robot\n\nPreden gradimo fizičnega robota, se naučimo osnov z virtualnim!\n\n## Simulatorji robotov\nSimulator je program, ki posnema resničnega robota v virtualnem svetu. To je kot videoigra, le da se učiš resničnih konceptov.\n\n### Prednosti simulatorjev:\n- **Brezplačni** - ne rabiš dragih delov\n- **Varni** - ne moreš ničesar zlomiti\n- **Hitri** - poizkuse ponoviš v sekundah\n\n## Osnovni ukazi za robota\n\nVsak robot razume osnovne ukaze:\n\n```\nPREMIKNI_NAPREJ(koraki)\nZAVRTI_LEVO(stopinje)\nZAVRTI_DESNO(stopinje)\nPOBERI(predmet)\nODLOŽI(predmet)\nČAKAJ(sekunde)\n```\n\n## Primer programa\nNaš robot mora pobrati žogo in jo odnesti na cilj:\n\n```\nPREMIKNI_NAPREJ(3)\nZAVRTI_LEVO(90)\nPREMIKNI_NAPREJ(2)\nPOBERI(žoga)\nZAVRTI_DESNO(180)\nPREMIKNI_NAPREJ(5)\nODLOŽI(žoga)\n```\n\n## Tvoja naloga\nNapiši program za naslednji scenarij:\n1. Robot stoji na začetku labirinta\n2. Mora najti pot do izhoda\n3. Na poti mora pobrati 2 zvezdici\n\nNariši labirint in zapiši ukaze!',
  'project', 55,
  '["simulator robota", "robotski ukazi", "programiranje robota", "virtualni robot", "labirint"]'
FROM courses c WHERE c.slug = 'robotics-and-ai'
ON CONFLICT (course_id, module_index, lesson_index) DO NOTHING;

-- Module 2: Senzorji in okolje (5 lessons)
INSERT INTO course_lessons (course_id, module_index, lesson_index, title, content, content_type, duration_minutes, key_concepts)
SELECT c.id, 1, 0,
  'Kako robot vidi svet',
  E'# Kako robot vidi svet\n\nMi vidimo svet skozi oči. Robot "vidi" skozi **senzorje** - naprave, ki merijo različne lastnosti okolja.\n\n## Vrste senzorjev\n\n### Kamere (vid)\nKamere zajamejo slike, ki jih robot analizira z AI.\n- **RGB kamere** - vidijo barve kot mi\n- **Globinske kamere** - merijo razdaljo do objektov\n- **Infrardeče kamere** - vidijo v temi\n\n### Ultrazvočni senzorji (sluh)\nDelujejo kot netopirji - pošljejo zvočni val in merijo, kdaj se vrne.\n- Uporabljajo se za merjenje razdalje\n- Roomba jih uporablja za zaznavanje sten\n\n### Senzorji dotika\nRobot čuti pritisk, temperaturo in teksturo.\n- **Pritiskovni senzorji** - ali je robot trčil v steno?\n- **Temperaturni senzorji** - ali je predmet vroč?\n- **Silomer** - kako močno robot drži predmet?\n\n### Žiroskop in pospeškometer\nMerita nagib in pospešek robota - tako kot v tvojem telefonu!\n\n## Eksperiment\nVzemi telefon in odpri aplikacijo, ki prikazuje senzorske podatke (npr. Phyphox). Koliko senzorjev ima tvoj telefon? Katere robota bi lahko nadomestili?',
  'text', 50,
  '["senzorji", "kamere", "ultrazvok", "žiroskop", "zaznavanje okolja"]'
FROM courses c WHERE c.slug = 'robotics-and-ai'
ON CONFLICT (course_id, module_index, lesson_index) DO NOTHING;

INSERT INTO course_lessons (course_id, module_index, lesson_index, title, content, content_type, duration_minutes, key_concepts)
SELECT c.id, 1, 1,
  'Računalniški vid',
  E'# Računalniški vid\n\nRačunalniški vid je veja AI, ki uči računalnike **razumeti slike**.\n\n## Kako robot "vidi" sliko?\n\nZa nas je slika mačke očitna. Za robota je slika le mreža številk - vsak piksel ima vrednost za rdečo, zeleno in modro barvo.\n\n```\nSlika 3x3:\n[255,0,0]  [255,0,0]  [0,255,0]\n[255,0,0]  [0,0,0]    [0,255,0]\n[0,0,255]  [0,0,255]  [0,0,255]\n```\n\n## Koraki računalniškega vida\n\n### 1. Zajem slike\nKamera zajame sliko in jo pretvori v številke.\n\n### 2. Obdelava\n- **Filtriranje** - odstranjevanje šuma\n- **Robovi** - iskanje mej med objekti\n- **Barve** - ločevanje po barvah\n\n### 3. Prepoznavanje\nAI model analizira obdelano sliko in prepozna objekte.\n- "To je mačka z 95% verjetnostjo"\n- "Na sliki sta 2 osebi in 1 pes"\n\n## Uporaba v robotiki\n- **Samovozeči avtomobili** - prepoznavanje prometnih znakov\n- **Industrijski roboti** - kontrola kakovosti\n- **Droni** - sledenje objektom\n\n## Aktivnost\nVzemi 5 slik različnih predmetov. Kakšne značilnosti bi robot moral prepoznati, da bi jih ločil? Naredi tabelo značilnosti za vsak predmet.',
  'activity', 50,
  '["računalniški vid", "piksel", "prepoznavanje objektov", "obdelava slik", "RGB"]'
FROM courses c WHERE c.slug = 'robotics-and-ai'
ON CONFLICT (course_id, module_index, lesson_index) DO NOTHING;

INSERT INTO course_lessons (course_id, module_index, lesson_index, title, content, content_type, duration_minutes, key_concepts)
SELECT c.id, 1, 2,
  'Senzorji za navigacijo',
  E'# Senzorji za navigacijo\n\nKako robot ve, kje je in kam mora iti?\n\n## GPS - Globalni pozicijski sistem\n- Deluje s pomočjo satelitov v orbiti\n- Natančnost: 2-5 metrov na prostem\n- **Problem**: Ne deluje v zaprtih prostorih!\n\n## LIDAR - Lasersko merjenje razdalje\nLIDAR je kot 3D skener okolja:\n1. Pošlje laserski žarek\n2. Meri čas, da se žarek vrne\n3. Ustvari 3D zemljevid okolja\n\nSamovozeči avtomobili uporabljajo LIDAR za "videnje" ceste.\n\n## SLAM - Simultano lociranje in kartiranje\nSLAM je tehnika, s katero robot **hkrati** ugotavlja, kje je, in gradi zemljevid okolja.\n\nPredstavljaj si, da te nekdo pusti v temen labirint:\n1. Tipasz stene okrog sebe\n2. Zapomnisz si, kje si že bil\n3. Postopoma gradisz zemljevid v glavi\n\nTo je SLAM za robote!\n\n## Senzor odometrije\nMeri, koliko so se kolesa zavrtela. Iz tega izračuna, koliko daleč je robot šel.\n- **Problem**: Napake se kopičijo! Kolesa drsijo.\n\n## Naloga\nNačrtuj navigacijski sistem za robota, ki dostavlja pakete v tvojem mestu. Katere senzorje bi uporabil? Nariši shemo.',
  'text', 50,
  '["GPS", "LIDAR", "SLAM", "navigacija", "odometrija", "kartiranje"]'
FROM courses c WHERE c.slug = 'robotics-and-ai'
ON CONFLICT (course_id, module_index, lesson_index) DO NOTHING;

INSERT INTO course_lessons (course_id, module_index, lesson_index, title, content, content_type, duration_minutes, key_concepts)
SELECT c.id, 1, 3,
  'Zbiranje in analiza podatkov',
  E'# Zbiranje in analiza podatkov\n\nSenzorji zbirajo ogromne količine podatkov. Kako jih robot razume?\n\n## Vrste podatkov\n\n### Številčni podatki\n- Temperatura: 23.5°C\n- Razdalja: 1.82m\n- Hitrost: 0.5 m/s\n\n### Slikovni podatki\n- Slike iz kamere (milijone pikslov)\n- Video posnetki (30 slik na sekundo!)\n\n### Zvočni podatki\n- Glasovni ukazi\n- Zvoki okolja\n\n## Filtriranje šuma\nSenzorji niso popolni - včasih dajo napačne podatke (šum).\n\n**Primer**: Temperaturni senzor v eni sekundi:\n```\n23.5, 23.6, 99.1, 23.4, 23.5\n```\nVrednost 99.1 je očitno napaka! Robot mora znati filtrirati šum.\n\n### Tehnike filtriranja:\n- **Povprečenje** - vzameš povprečje zadnjih N meritev\n- **Mediana** - vzameš srednjo vrednost (ignorira ekstreme)\n- **Kalmanov filter** - napredna tehnika, ki upošteva fizikalne zakone\n\n## Fuzija senzorjev\nKombiniranje podatkov iz več senzorjev za boljšo sliko:\n- GPS + odometrija = boljša lokacija\n- Kamera + LIDAR = boljše zaznavanje objektov\n\n## Naloga\nDobi 10 meritev temperature v svoji sobi (vsako minuto). Izračunaj povprečje in mediano. Ali se razlikujeta? Zakaj?',
  'activity', 55,
  '["podatki senzorjev", "šum", "filtriranje", "Kalmanov filter", "fuzija senzorjev"]'
FROM courses c WHERE c.slug = 'robotics-and-ai'
ON CONFLICT (course_id, module_index, lesson_index) DO NOTHING;

INSERT INTO course_lessons (course_id, module_index, lesson_index, title, content, content_type, duration_minutes, key_concepts)
SELECT c.id, 1, 4,
  'Projekt: Senzorska mreža',
  E'# Projekt: Senzorska mreža\n\nV tem projektu boš načrtoval senzorsko mrežo za pameten dom.\n\n## Scenarij\nTvoja družina želi pameten dom. Načrtuj sistem, ki:\n- Meri temperaturo in vlažnost v vsaki sobi\n- Zaznava gibanje (varnost)\n- Nadzoruje porabo električne energije\n- Opozori, če nekdo pozabi zapreti okno, ko pada dež\n\n## Korak 1: Načrt senzorjev\nZa vsako sobo določi:\n| Soba | Senzorji | Zakaj |\n|------|----------|-------|\n| Dnevna soba | Temp, gibanje, svetloba | Udobje, varnost |\n| Kuhinja | Temp, dim, plin | Varnost |\n| Spalnica | Temp, svetloba, zvok | Udobje, spanje |\n\n## Korak 2: Povezovanje\nKako bodo senzorji komunicirali?\n- **WiFi** - za senzorje blizu usmerjevalnika\n- **Bluetooth** - za bližnje naprave\n- **Zigbee** - za senzorje z majhno porabo\n\n## Korak 3: Pravila\nNapiši pravila za svoj pametni dom:\n```\nČE temperatura > 25°C IN okno = zaprto\n  POTEM pošlji obvestilo "Odpri okno!"\n\nČE gibanje = zaznano IN čas > 23:00 IN nihče_doma = true\n  POTEM vklopi alarm\n```\n\n## Korak 4: Vizualizacija\nNariši tloris doma in označi, kje bi postavil katere senzorje. Dodaj legendo z barvami za vsako vrsto senzorja.\n\n## Bonus\nKateri podatki bi lahko izboljšali delovanje tvojega sistema, če bi dodal AI? Npr.: AI se nauči, kdaj se družina vrne domov in vnaprej uravna temperaturo.',
  'project', 60,
  '["pametni dom", "senzorska mreža", "IoT", "avtomatizacija", "WiFi", "Zigbee"]'
FROM courses c WHERE c.slug = 'robotics-and-ai'
ON CONFLICT (course_id, module_index, lesson_index) DO NOTHING;

-- Module 3: AI za robote (5 lessons)
INSERT INTO course_lessons (course_id, module_index, lesson_index, title, content, content_type, duration_minutes, key_concepts)
SELECT c.id, 2, 0,
  'Strojno učenje za robote',
  E'# Strojno učenje za robote\n\nNamesto da robotu povemo vsako pravilo, ga lahko **naučimo** iz izkušenj.\n\n## Tradicionalno programiranje vs. strojno učenje\n\n**Tradicionalno:**\n```\nČE ovira_pred_teboj POTEM zavij_levo\nČE pot_prosta POTEM pojdi_naprej\n```\nProblem: Ne moreš predvideti vsake situacije!\n\n**Strojno učenje:**\n```\nPokaži robotu 10.000 primerov:\n- Slika ceste → pravilna akcija\nRobot se sam nauči pravil!\n```\n\n## Vrste strojnega učenja\n\n### Nadzorovano učenje\nRobotu pokažeš primere z pravilnimi odgovori.\n- "Ta slika = mačka, ta slika = pes"\n- Robot se nauči razlikovati\n\n### Nenadzorovano učenje\nRobot sam najde vzorce v podatkih.\n- "Razvrsti te predmete v skupine"\n- Robot ugotovi, da so nekateri predmeti podobni\n\n### Spodbujevano učenje (Reinforcement Learning)\nRobot se uči s poskušanjem:\n1. Poskusi akcijo\n2. Dobi nagrado (dobro) ali kazen (slabo)\n3. Sčasoma se nauči najboljše strategije\n\nTo je kot učenje vožnje s kolesom - padeš, vstanesz, poskusisz znova!\n\n## Primer\nRobot se uči hoditi:\n- Narada: korak naprej = +1 točka\n- Kazen: padec = -10 točk\n- Po 1000 poskusih se nauči hoditi!\n\n## Razmisli\nKatero vrsto učenja bi uporabil za robota, ki:\n1. Sortira smeti? (nadzorovano)\n2. Igra šah? (spodbujevano)\n3. Organizira skladišče? (nenadzorovano)',
  'text', 50,
  '["strojno učenje", "nadzorovano učenje", "nenadzorovano učenje", "spodbujevano učenje", "reinforcement learning"]'
FROM courses c WHERE c.slug = 'robotics-and-ai'
ON CONFLICT (course_id, module_index, lesson_index) DO NOTHING;

INSERT INTO course_lessons (course_id, module_index, lesson_index, title, content, content_type, duration_minutes, key_concepts)
SELECT c.id, 2, 1,
  'Nevronske mreže',
  E'# Nevronske mreže\n\nNevronske mreže so inspiriane z delovanjem človeških **možganov**.\n\n## Kako delujejo možgani?\nMožgani imajo ~86 milijard nevronov (živčnih celic).\n- Vsak nevron sprejme signale od drugih nevronov\n- Če je signal dovolj močan, pošlje svoj signal naprej\n- Povezave med nevroni se krepijo z vajo\n\n## Umetne nevronske mreže\nUmetna nevronska mreža posnema ta princip:\n\n```\nVhod → [Nevron 1] → [Nevron 2] → [Nevron 3] → Izhod\n         ↕              ↕              ↕\n       [Nevron 4] → [Nevron 5] → [Nevron 6]\n```\n\n### Plasti:\n1. **Vhodna plast** - sprejme podatke (sliko, besedilo...)\n2. **Skrite plasti** - procesirajo podatke, iščejo vzorce\n3. **Izhodna plast** - dá končni odgovor\n\n## Učenje nevronske mreže\n1. Mreža dobi vhodni podatek\n2. Izračuna odgovor\n3. Primerja s pravilnim odgovorom\n4. Popravi povezave (uteži) - to je "učenje"!\n5. Ponovi 1000-krat\n\n## Globoko učenje (Deep Learning)\nKo ima mreža veliko skritih plasti, govorimo o **globokem učenju**. To je tehnologija za:\n- Prepoznavanje obrazov\n- Samovozeče avtomobile\n- ChatGPT in podobne modele\n\n## Aktivnost\nZ 3 prijatelji simulirajte nevronsko mrežo: en je vhod, dva sta skrita plast, en je izhod. Pošiljajte si številke in opazujte, kako se "odgovor" spreminja.',
  'activity', 50,
  '["nevronske mreže", "nevroni", "globoko učenje", "deep learning", "uteži", "plasti"]'
FROM courses c WHERE c.slug = 'robotics-and-ai'
ON CONFLICT (course_id, module_index, lesson_index) DO NOTHING;

INSERT INTO course_lessons (course_id, module_index, lesson_index, title, content, content_type, duration_minutes, key_concepts)
SELECT c.id, 2, 2,
  'Načrtovanje poti',
  E'# Načrtovanje poti\n\nKako robot najde najboljšo pot od točke A do točke B?\n\n## Problem\nRobot mora:\n- Priti od starta do cilja\n- Se izogniti oviram\n- Najti **najkrajšo** ali **najhitrejšo** pot\n\n## Algoritem A* (A-zvezdica)\nNajbolj popularen algoritem za načrtovanje poti.\n\n### Kako deluje:\n1. Začni na startnem polju\n2. Poglej vsa sosednja polja\n3. Za vsako polje izračunaj:\n   - g = razdalja od starta\n   - h = ocenjena razdalja do cilja\n   - f = g + h\n4. Premakni se na polje z najnižjim f\n5. Ponavljaj, dokler ne prideš do cilja\n\n### Primer na mreži:\n```\nS . . . .\n. X X . .\n. . X . .\n. . . . C\n\nS = start, C = cilj, X = ovira\n```\n\nRobot ne gre skozi X polja, ampak jih obide.\n\n## Dijkstrov algoritem\nPodobno kot A*, ampak brez ocene h.\n- Bolj počasen, toda vedno najde optimalno pot\n\n## Roboti v resničnem svetu\n- **Amazon skladišča**: Tisoči robotov se premikajo med policami\n- **Samovozeči avti**: Načrtujejo pot skozi promet v realnem času\n\n## Naloga\nNa mrežastem papirju (10x10) nariši labirint. Nato ročno izvedi A* algoritem, da najdeš pot. Zapiši korake!',
  'activity', 55,
  '["načrtovanje poti", "A* algoritem", "Dijkstrov algoritem", "navigacija", "ovire"]'
FROM courses c WHERE c.slug = 'robotics-and-ai'
ON CONFLICT (course_id, module_index, lesson_index) DO NOTHING;

INSERT INTO course_lessons (course_id, module_index, lesson_index, title, content, content_type, duration_minutes, key_concepts)
SELECT c.id, 2, 3,
  'Odločanje robota',
  E'# Odločanje robota\n\nKako se robot odloči, kaj narediti?\n\n## Odločitvena drevesa\nNajenostavnejši način za odločanje:\n\n```\nAli je pred mano ovira?\n├── DA → Ali je levo prosto?\n│   ├── DA → Zavij levo\n│   └── NE → Zavij desno\n└── NE → Pojdi naprej\n```\n\n## Končni avtomati (State Machines)\nRobot je vedno v enem od **stanj** in prehaja med njimi:\n\n```\n[RAZISKUJ] --najdi predmet--> [POBERI]\n[POBERI] --uspeh--> [ODNESI]\n[POBERI] --neuspeh--> [RAZISKUJ]\n[ODNESI] --cilj dosežen--> [RAZISKUJ]\n```\n\nTo je kot igra, kjer ima lik različne "mode" (hoja, tek, boj).\n\n## Verjetnostno odločanje\nVčasih robot ni 100% prepričan:\n- "80% verjetnost, da je to mačka"\n- "20% verjetnost, da je to pes"\n\nRobot izračuna **pričakovano vrednost** vsake akcije:\n- Akcija A: 80% × 10 točk = 8 točk\n- Akcija B: 50% × 20 točk = 10 točk\n- Izbere B, ker ima višjo pričakovano vrednost!\n\n## Multi-agentno odločanje\nKo več robotov dela skupaj, se morajo usklajevati:\n- Kdo gre kam?\n- Kako se izognejo trkom?\n- Kako si razdelijo naloge?\n\n## Naloga\nNariši odločitveno drevo za robota, ki dostavlja pice. Upoštevaj: vreme, promet, pravo naslova, stanje pice.',
  'text', 50,
  '["odločanje", "odločitvena drevesa", "končni avtomati", "verjetnost", "multi-agentni sistemi"]'
FROM courses c WHERE c.slug = 'robotics-and-ai'
ON CONFLICT (course_id, module_index, lesson_index) DO NOTHING;

INSERT INTO course_lessons (course_id, module_index, lesson_index, title, content, content_type, duration_minutes, key_concepts)
SELECT c.id, 2, 4,
  'Projekt: AI agent v igri',
  E'# Projekt: AI agent v igri\n\nZgradimo AI agenta, ki igra enostavno igro!\n\n## Igra: Robot zbira diamante\n\nPravila:\n- Robot je na mreži 5x5\n- Na mreži so 3 diamanti in 2 pasti\n- Robot mora pobrati vse diamante in se izogniti pastim\n- Za vsak diamant dobi +10 točk, za past -20 točk\n\n## Načrtovanje AI agenta\n\n### Strategija 1: Naključno\n```\nVsak korak: izberi naključno smer\nProstost: enostavno\nUčinkovitost: slaba\n```\n\n### Strategija 2: Požrešna (Greedy)\n```\nVsak korak: pojdi proti najbližjemu diamantu\nIzogni se pastim, ki so na poti\nProstost: srednja\nUčinkovitost: dobra\n```\n\n### Strategija 3: Načrtovana\n```\n1. Najdi vse diamante\n2. Izračunaj najkrajšo pot, ki obišče vse\n3. Izogni se vsem pastim\nProstost: težka\nUčinkovitost: odlična\n```\n\n## Tvoja naloga\n\n1. Na papirju nariši mrežo 5x5\n2. Postavi 3 diamante (D) in 2 pasti (P)\n3. Postavi robota na začetno polje\n4. Izvedi vse 3 strategije ročno\n5. Za vsako strategijo zapiši:\n   - Koliko korakov je rabil robot?\n   - Koliko točk je dobil?\n   - Ali je padel v past?\n\n## Bonus\nDodaj novo pravilo: robot ima le 15 korakov. Katera strategija zdaj zmaga? Zakaj?',
  'project', 60,
  '["AI agent", "strategija", "požrešni algoritem", "načrtovanje", "optimizacija"]'
FROM courses c WHERE c.slug = 'robotics-and-ai'
ON CONFLICT (course_id, module_index, lesson_index) DO NOTHING;

-- Module 4: Avtonomni roboti (5 lessons)
INSERT INTO course_lessons (course_id, module_index, lesson_index, title, content, content_type, duration_minutes, key_concepts)
SELECT c.id, 3, 0,
  'Kaj pomeni avtonomnost?',
  E'# Kaj pomeni avtonomnost?\n\n**Avtonomni robot** je robot, ki deluje sam, brez človeškega nadzora.\n\n## Stopnje avtonomnosti\n\n### Stopnja 1: Daljinsko vodenje\nČlovek kontrolira vsako gibanje robota.\n- Primer: Dron s kontrolerjem\n- Robot sam ne sprejema odločitev\n\n### Stopnja 2: Pol-avtonomno\nRobot izvaja naloge sam, človek nadzoruje.\n- Primer: Tempomat v avtu\n- Robot sledi pravilom, človek prevzame v nujnih primerih\n\n### Stopnja 3: Pogojno avtonomno\nRobot sam vozi v določenih razmerah.\n- Primer: Tesla Autopilot na avtocesti\n- Človek mora biti pripravljen prevzeti\n\n### Stopnja 4: Visoka avtonomnost\nRobot sam obvladuje skoraj vse situacije.\n- Primer: Waymo taxi v določenih mestih\n- Človek ni potreben, toda robot deluje le v znanih okoljih\n\n### Stopnja 5: Polna avtonomnost\nRobot sam deluje v vseh situacijah.\n- To še ne obstaja za avtomobile!\n- Morda v prihodnosti?\n\n## Ključni izzivi avtonomnosti\n1. **Zaznavanje** - Robot mora razumeti okolje\n2. **Načrtovanje** - Robot mora imeti cilj in pot\n3. **Izvedba** - Robot mora natančno izvesti načrt\n4. **Prilagajanje** - Robot mora reagirati na nepričakovano\n\n## Razmisli\nNa kateri stopnji avtonomnosti je:\n- Roomba sesalnik?\n- Mars rover?\n- Industrijski robotski krak?',
  'text', 45,
  '["avtonomnost", "stopnje avtonomnosti", "samovozeči avti", "daljinsko vodenje", "Waymo"]'
FROM courses c WHERE c.slug = 'robotics-and-ai'
ON CONFLICT (course_id, module_index, lesson_index) DO NOTHING;

INSERT INTO course_lessons (course_id, module_index, lesson_index, title, content, content_type, duration_minutes, key_concepts)
SELECT c.id, 3, 1,
  'Samovozeči avtomobili',
  E'# Samovozeči avtomobili\n\nSamovozeči avtomobili so eden najvidnejših primerov avtonomnih robotov.\n\n## Kako delujejo?\n\n### Senzorji\n- **8+ kamer** - 360° pogled\n- **LIDAR** - 3D zemljevid okolice\n- **Radar** - zaznava objektov v slabem vremenu\n- **Ultrazvok** - bližnji objekti pri parkiranju\n\n### AI možgani\n1. Senzorji zajamejo podatke\n2. AI prepozna: cesto, avtomobile, pešce, znake\n3. AI načrtuje pot in hitrost\n4. Izvede vožnjo skozi aktuatorje (volan, plin, zavore)\n\nVse to se zgodi **30-krat na sekundo**!\n\n## Ključni igralci\n\n| Podjetje | Pristop | Status |\n|----------|---------|--------|\n| Waymo (Google) | LIDAR + kamere | Taxi v Phoenixu, SF |\n| Tesla | Samo kamere | Autopilot, FSD beta |\n| Cruise (GM) | LIDAR + kamere | Začasno ustavljeno |\n| Baidu Apollo | LIDAR + kamere | Taxi na Kitajskem |\n\n## Etilne dileme\nSamovozeči avto mora sprejemati težke odločitve:\n- Zavij levo (udari steno) ali desno (udari drevo)?\n- Zaustavi se nenadoma (potnike trese) ali nadaljuje?\n\nTo so vprašanja, ki jih morajo rešiti inženirji IN etiki skupaj.\n\n## Aktivnost\nOblači mesto s 5 ulicami na papirju. Nariši pot samovozečega avtomobila in označi vse, kar mora zaznati (znake, pešce, luči, ovire).',
  'activity', 50,
  '["samovozeči avtomobili", "Tesla", "Waymo", "LIDAR", "etične dileme", "avtonomna vožnja"]'
FROM courses c WHERE c.slug = 'robotics-and-ai'
ON CONFLICT (course_id, module_index, lesson_index) DO NOTHING;

INSERT INTO course_lessons (course_id, module_index, lesson_index, title, content, content_type, duration_minutes, key_concepts)
SELECT c.id, 3, 2,
  'Roboti v vesolju',
  E'# Roboti v vesolju\n\nVesolje je nevarno za ljudi, toda odlično za robote!\n\n## Mars roverji\n\n### Curiosity (2012-danes)\n- Velikost avtomobila\n- Jedrski vir energije\n- Raziskuje površje Marsa, analizira kamenje\n- Komunikacija z Zemljo traja 4-24 minut!\n\n### Perseverance (2021-danes)\n- Iskal znake preteklega življenja\n- S seboj pripeljal **Ingenuity** - prvi helikopter na drugem planetu!\n- Zbira vzorce za kasnejši transport na Zemljo\n\n## Zakaj roboti in ne ljudje?\n1. **Sevanje** - vesolje je polno smrtonosnega sevanja\n2. **Zrak** - ni kisika za dihanje\n3. **Čas** - potovanje do Marsa traja 7 mesecev\n4. **Stroški** - robot je 100x cenejši od človeške misije\n\n## Izziv: Zakasnitev komunikacije\nSignal od Zemlje do Marsa potuje 4-24 minut.\n- Ne moreš "voziti" roverja v realnem času\n- Rover mora biti delno **avtonomnem** - sam se izogiba nevarnostim\n- Ukaze pošljemo enkrat na dan, rover jih izvede sam\n\n## Prihodnost\n- **Robotski gradbeniki** - bodo gradili baze na Luni in Marsu pred prihodom ljudi\n- **Robotski rudarji** - bodo kopali minerale na asteroidih\n- **Vesoljski teleskopi** - robotski sistemi, ki sami popravljajo napake\n\n## Naloga\nNačrtuj robota za raziskovanje Jupitrovega meseca Evrope (pokrit z ledom, pod njim ocean). Kakšne senzorje in sposobnosti bi rabil?',
  'text', 50,
  '["Mars rover", "Curiosity", "Perseverance", "vesoljska robotika", "avtonomnost v vesolju"]'
FROM courses c WHERE c.slug = 'robotics-and-ai'
ON CONFLICT (course_id, module_index, lesson_index) DO NOTHING;

INSERT INTO course_lessons (course_id, module_index, lesson_index, title, content, content_type, duration_minutes, key_concepts)
SELECT c.id, 3, 3,
  'Roji robotov (Swarm Robotics)',
  E'# Roji robotov (Swarm Robotics)\n\nNamesto enega velikega robota - tisoč majhnih, ki delajo skupaj!\n\n## Navdih iz narave\n\n### Mravlje\n- Posamezna mravljica je preprosta\n- Skupaj gradijo kompleksne kolonije\n- Komunicirajo s feromoni (kemičnimi sledmi)\n\n### Čebele\n- Izvidnice najdejo cvetlice\n- S plesom povedo drugim, kje je hrana\n- Skupaj se odločijo za najboljši vir\n\n### Ribe\n- Plavanje v jati za zaščito pred plenilci\n- Nobena riba ni "vodja" - vse sledijo enostavnim pravilom\n\n## Pravila za roj robotov\n\nVsak robot sledi 3 enostavnim pravilom:\n1. **Separacija** - ne pridi preblizu drugim\n2. **Poravnava** - premikaj se v isti smeri kot sosedje\n3. **Kohezija** - ostani blizu skupine\n\nIz teh 3 pravil nastane kompleksno skupinsko vedenje!\n\n## Uporabe\n\n### Iskanje in reševanje\n- 100 majhnih dronov preišče ruševine po potresu\n- Vsak pregleda majhno območje\n- Ko eden najde osebo, pokliče ostale\n\n### Kmetijstvo\n- Roji majhnih robotov sadijo, škropijo, žanjejo\n- Vsak robot skrbi za svoj del polja\n\n### Gradbeništvo\n- Majhni roboti skupaj gradijo strukture\n- Kot termiti, ki gradijo termitnjake\n\n## Aktivnost\nZ razredom simulirajte roj: vsak učenec je "robot" in sledi 3 pravila. Opazujte, kaj se zgodi po 5 minutah premikanja po dvorani!',
  'activity', 50,
  '["roji robotov", "swarm robotics", "mravlje", "emergentno vedenje", "kolektivna inteligenca"]'
FROM courses c WHERE c.slug = 'robotics-and-ai'
ON CONFLICT (course_id, module_index, lesson_index) DO NOTHING;

INSERT INTO course_lessons (course_id, module_index, lesson_index, title, content, content_type, duration_minutes, key_concepts)
SELECT c.id, 3, 4,
  'Projekt: Načrtuj avtonomno misijo',
  E'# Projekt: Načrtuj avtonomno misijo\n\nČas je za velik projekt! Načrtuj celotno avtonomno robotsko misijo.\n\n## Izberi scenarij\n\nIzberi ENEGA:\n\n### A) Podvodna raziskava\nRobot raziskuje morsko dno pri Piranu.\n- Kartira morsko dno\n- Fotografira morsko življenje\n- Zbira vzorce vode\n\n### B) Mestna dostava\nRobot dostavlja pakete po Ljubljani.\n- Navigira po pločnikih\n- Se izogiba pešcem\n- Najde pravi naslov\n\n### C) Gozdni nadzor\nRobot patruljira po slovenskem gozdu.\n- Zaznava gozdne požare\n- Spremlja divje živali\n- Poroča o stanju dreves\n\n## Za vsak scenarij opiši:\n\n### 1. Senzorji (2-3 strani)\n- Katere senzorje bo imel robot?\n- Zakaj prav te?\n\n### 2. AI sistemi (2-3 strani)\n- Kako bo robot sprejemal odločitve?\n- Katero vrsto strojnega učenja bo uporabil?\n\n### 3. Navigacija (1-2 strani)\n- Kako bo robot vedel, kje je?\n- Kako bo načrtoval pot?\n\n### 4. Komunikacija (1 stran)\n- Kako bo robot poročal človeku?\n- Kaj, če izgubi signal?\n\n### 5. Varnost (1 stran)\n- Kaj, če se robot pokvari?\n- Kako zaščitimo okolje pred robotom?\n\n## Oddaj\nNapiši poročilo (5-10 strani) z risbami in diagrami. Bonus: naredi predstavitev za razred!',
  'project', 75,
  '["načrtovanje misije", "avtonomni sistem", "zahteve", "inženirski proces", "dokumentacija"]'
FROM courses c WHERE c.slug = 'robotics-and-ai'
ON CONFLICT (course_id, module_index, lesson_index) DO NOTHING;

-- Module 5: Moj robot projekt (5 lessons)
INSERT INTO course_lessons (course_id, module_index, lesson_index, title, content, content_type, duration_minutes, key_concepts)
SELECT c.id, 4, 0,
  'Inženirski proces',
  E'# Inženirski proces\n\nPravi inženirji sledijo strukturiranemu procesu pri razvoju robotov.\n\n## 5 korakov inženirskega procesa\n\n### 1. Definiraj problem\n- Kakšno nalogo mora robot opravljati?\n- Kdo bo robota uporabljal?\n- Kakšne so omejitve (velikost, cena, energija)?\n\n### 2. Raziskuj\n- Ali že obstajajo podobni roboti?\n- Kakšne tehnologije so na voljo?\n- Kaj pravi znanost o problemu?\n\n### 3. Načrtuj\n- Nariši načrte robota\n- Izberi komponente (senzorje, motorje, procesor)\n- Načrtuj programsko opremo\n- Izračunaj stroške\n\n### 4. Zgradi in testiraj\n- Sestavi prototip\n- Testiraj v kontroliranem okolju\n- Zapiši rezultate\n- Popravi napake\n\n### 5. Izboljšaj\n- Analiziraj testne rezultate\n- Kaj deluje dobro? Kaj ne?\n- Naredi spremembe\n- Testiraj znova!\n\n## Iteracija\nInženirski proces ni linearen - je **krožen**. Vedno se vračamo na prejšnje korake in izboljšujemo.\n\n```\nDefiniraj → Raziskuj → Načrtuj → Zgradi → Testiraj\n    ↑                                         ↓\n    ←←←←←←←← Izboljšaj ←←←←←←←←←←←\n```\n\n## Naloga\nZa svoj končni projekt zapiši:\n1. Problem, ki ga rešujesz\n2. 3 obstoječe rešitve (raziskava)\n3. Prednosti tvojega pristopa',
  'text', 45,
  '["inženirski proces", "prototipiranje", "iteracija", "načrtovanje", "testiranje"]'
FROM courses c WHERE c.slug = 'robotics-and-ai'
ON CONFLICT (course_id, module_index, lesson_index) DO NOTHING;

INSERT INTO course_lessons (course_id, module_index, lesson_index, title, content, content_type, duration_minutes, key_concepts)
SELECT c.id, 4, 1,
  'Načrtovanje mojega robota',
  E'# Načrtovanje mojega robota\n\nČas za načrtovanje tvojega lastnega robota!\n\n## Korak 1: Izberi nalogo\nTvoj robot mora rešiti **resnični problem**. Nekaj idej:\n- Robot, ki pomaga starim staršem prinesti stvari\n- Robot, ki čisti smetnjak\n- Robot, ki pomaga pri učenju matematike\n- Robot, ki skrbi za vrt, ko si na počitnicah\n\n## Korak 2: Zahteve\nZa vsako nalogo zapiši zahteve:\n\n| Zahteva | Opis | Prioriteta |\n|---------|------|------------|\n| Velikost | Max 50cm x 50cm | Visoka |\n| Teža | Max 5kg | Srednja |\n| Energija | Baterija za 2 uri | Visoka |\n| Hitrost | 0.5 m/s | Nizka |\n\n## Korak 3: Skica\nNariši robota iz 3 pogledov:\n- Spredaj\n- S strani\n- Od zgoraj\n\nOznači vse dele:\n- Kje so senzorji?\n- Kje je procesor?\n- Kje so motorji/kolesa?\n- Kje je baterija?\n\n## Korak 4: Seznam komponent\n\n```\n1x Arduino Mega (procesor)       - 25€\n2x DC motor z gumijastimi kolesi - 8€\n1x Ultrazvočni senzor HC-SR04    - 3€\n1x Kamera modul                   - 15€\n1x Li-Po baterija 7.4V           - 12€\n1x Robotsko šasijo (3D tisk)     - 10€\n─────────────────────────────────\nSKUPAJ:                            73€\n```\n\n## Naloga\nIzpolni vse 4 korake za TVOJEGA robota. Oddaj načrt z risbami in seznamom komponent.',
  'project', 60,
  '["načrtovanje robota", "zahteve", "komponente", "Arduino", "proračun"]'
FROM courses c WHERE c.slug = 'robotics-and-ai'
ON CONFLICT (course_id, module_index, lesson_index) DO NOTHING;

INSERT INTO course_lessons (course_id, module_index, lesson_index, title, content, content_type, duration_minutes, key_concepts)
SELECT c.id, 4, 2,
  'Programiranje robota',
  E'# Programiranje robota\n\nSedaj, ko imamo načrt, napišimo program za robota!\n\n## Pseudokoda\nPreden pišemo pravi program, napišemo **pseudokodo** - program v navadnem jeziku.\n\n### Primer: Robot čistilec\n```\nPROGRAM robot_čistilec:\n\n  PONAVLJAJ:\n    slika = zajemi_sliko()\n    smeti = najdi_smeti(slika)\n    \n    ČE smeti.najdene:\n      pot = izračunaj_pot(moja_lokacija, smeti.lokacija)\n      premikaj_se(pot)\n      poberi(smeti)\n      pot_do_koša = izračunaj_pot(moja_lokacija, koš)\n      premikaj_se(pot_do_koša)\n      odloži(smeti)\n    SICER:\n      premikaj_se_naključno()\n    \n    ČE baterija < 20%:\n      pot_domov = izračunaj_pot(moja_lokacija, polnilnica)\n      premikaj_se(pot_domov)\n      polni_se()\n  KONEC_PONAVLJAJ\n```\n\n## Moduli programa\n\nRazdeli program na module:\n\n### Modul zaznave\n- Bere podatke iz senzorjev\n- Procesira slike\n- Vrne informacije o okolju\n\n### Modul načrtovanja\n- Sprejema odločitve\n- Računa pot\n- Upravlja z nalogami\n\n### Modul gibanja\n- Kontrolira motorje\n- Upravlja s hitrostjo\n- Izvaja zavoje\n\n### Modul varnosti\n- Preverjia baterijo\n- Zaznava trke\n- Zasilna ustavitev\n\n## Naloga\nNapiši pseudokodo za TVOJEGA robota. Razdeli jo na vsaj 3 module.',
  'activity', 55,
  '["pseudokoda", "programski moduli", "robotski program", "zaznava", "načrtovanje gibanja"]'
FROM courses c WHERE c.slug = 'robotics-and-ai'
ON CONFLICT (course_id, module_index, lesson_index) DO NOTHING;

INSERT INTO course_lessons (course_id, module_index, lesson_index, title, content, content_type, duration_minutes, key_concepts)
SELECT c.id, 4, 3,
  'Testiranje in odpravljanje napak',
  E'# Testiranje in odpravljanje napak\n\nNobeden robot ne deluje perfektno od začetka. Testiranje je ključno!\n\n## Vrste testov\n\n### Enotski testi\nTestiramo posamezne dele:\n- Ali motor pravilno zavrti kolesa?\n- Ali senzor pravilno meri razdaljo?\n- Ali kamera zajame sliko?\n\n### Integracijski testi\nTestiramo, kako deli delujejo skupaj:\n- Ali robot zavije, ko senzor zazna oviro?\n- Ali pobere predmet, ko ga kamera prepozna?\n\n### Sistemski testi\nTestiramo celotnega robota v resničnem okolju:\n- Ali robot opravi nalogo od začetka do konca?\n- Koliko časa potrebuje?\n- Ali se pravilno obnaša v nepričakovanih situacijah?\n\n## Pogosti problemi\n\n### Mehanski problemi\n- Kolesa drsijo → dodaj gumijaste obroče\n- Robot se prevrne → znižaj težišče\n- Gripper ne prime → prilagodi pritisk\n\n### Programski problemi (bugi)\n- Robot se vrti v krogu → preveri smer motorjev\n- Robot se zaleti v steno → senzor ne deluje pravilno\n- Robot se ustavi brez razloga → preveri baterijo\n\n### AI problemi\n- Robot ne prepozna predmetov → potrebuje več učnih podatkov\n- Robot se odloča prepočasi → optimiziraj algoritem\n\n## Dnevnik testiranja\n\n| Test | Pričakovano | Dejansko | Status | Popravek |\n|------|-------------|----------|--------|-----------|\n| Vožnja 1m naravnost | 1.00m | 0.95m | OK | / |\n| Obrat 90° | 90° | 105° | NAPAKA | Zmanjšaj čas motorja |\n\n## Naloga\nSestavi načrt testiranja za svojega robota: 5 enotskih, 3 integracijske in 2 sistemska testa.',
  'text', 55,
  '["testiranje", "odpravljanje napak", "debugging", "enotski testi", "integracijski testi"]'
FROM courses c WHERE c.slug = 'robotics-and-ai'
ON CONFLICT (course_id, module_index, lesson_index) DO NOTHING;

INSERT INTO course_lessons (course_id, module_index, lesson_index, title, content, content_type, duration_minutes, key_concepts)
SELECT c.id, 4, 4,
  'Končni projekt: Predstavitev',
  E'# Končni projekt: Predstavitev\n\nČestitke! Prišel si do konca tečaja! Čas je za končno predstavitev.\n\n## Kaj moraš oddati\n\n### 1. Pisno poročilo (8-12 strani)\n\n**Uvod** (1 stran)\n- Kakšen problem rešujesz?\n- Zakaj je ta problem pomemben?\n\n**Načrt robota** (3-4 strani)\n- Skica robota z oznakami\n- Seznam komponent s cenami\n- Razlaga izbire vsakega dela\n\n**AI in programiranje** (2-3 strani)\n- Pseudokoda programa\n- Razlaga AI algoritmov, ki jih uporabljaš\n- Kako se robot uči/odloča?\n\n**Testni načrt** (1-2 strani)\n- Tabela testov\n- Pričakovani rezultati\n- Kako bi popravil napake?\n\n**Zaključek** (1 stran)\n- Kaj si se naučil?\n- Kaj bi izboljšal, če bi imel več časa?\n- Kako vidiš prihodnost tvojega robota?\n\n### 2. Predstavitev (5-10 minut)\n- Pripravi diapozitive (8-12)\n- Predstavi problem, rešitev in rezultate\n- Odgovori na vprašanja publike\n\n### 3. Demo (opcijsko)\n- Če si zgradil prototip ali simulacijo, jo pokaži!\n- Tudi papirni model ali risba je odlična\n\n## Ocenjevanje\n\n| Kriterij | Točke |\n|----------|-------|\n| Kreativnost problema | 20 |\n| Kakovost načrta | 25 |\n| Uporaba AI konceptov | 25 |\n| Predstavitev | 20 |\n| Testni načrt | 10 |\n| **SKUPAJ** | **100** |\n\n## Nasveti\n- Bodi navdušen nad svojim projektom!\n- Razloži kompleksne koncepte enostavno\n- Uporabi slike in diagrame\n- Vadbi predstavitev pred ogledalom\n\n**Srečno in zabavaj se! Robotika je prihodnost!**',
  'project', 90,
  '["končni projekt", "predstavitev", "dokumentacija", "inženirsko poročilo", "javno nastopanje"]'
FROM courses c WHERE c.slug = 'robotics-and-ai'
ON CONFLICT (course_id, module_index, lesson_index) DO NOTHING;
