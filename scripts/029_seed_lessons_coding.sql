-- Seed lessons for "Programiranje z AI" (coding-with-ai) - 20 lessons
-- Module 1: Uvod v programiranje (5 lessons)
INSERT INTO course_lessons (course_id, module_index, lesson_index, title, slug, content_type, content, duration_minutes, activities)
SELECT c.id, 0, 0,
  'Kaj je programiranje?',
  'kaj-je-programiranje',
  'text',
  '# Kaj je programiranje?

Programiranje je kot pisanje recept za računalnik. Poveš mu natančno, kaj naj naredi, korak za korakom!

## Računalnik je kot kuhar
Predstavljaj si, da je računalnik kuhar, ti pa mu daješ recept:
1. Vzemi 2 jajci
2. Razbij jih v skledo
3. Dodaj moko
4. Mešaj 2 minuti
5. Daj v pečico

Računalnik sledi navodilom **natančno** tako, kot si napisal. Če pozabiš napisati "razbij jajca", bo dal cela jajca v skledo!

## Kaj je koda?
Koda je jezik, ki ga razume računalnik. Obstaja veliko programskih jezikov:
- **Scratch** - vizualni jezik s kockami (super za začetnike!)
- **Python** - preprost tekstovni jezik
- **JavaScript** - jezik za spletne strani

## Zakaj se učiti programiranja?
- Lahko narediš svojo igro
- Lahko narediš svojo spletno stran
- Naučiš se logično razmišljati
- Razumeš, kako deluje tehnologija okrog tebe

## Zanimivost
Prvo programerko v zgodovini je bila ženska - **Ada Lovelace**, ki je živela pred več kot 180 leti! Pisala je programe, še preden so obstajali pravi računalniki.',
  20,
  '[{"type": "quiz", "title": "Osnove programiranja", "description": "Preveri osnovno razumevanje programiranja"}, {"type": "activity", "title": "Recept za računalnik", "description": "Napiši natančna navodila za pripravo sendviča - kot da bi pisal za računalnik"}]'
FROM courses c WHERE c.slug = 'coding-with-ai';

INSERT INTO course_lessons (course_id, module_index, lesson_index, title, slug, content_type, content, duration_minutes, activities)
SELECT c.id, 0, 1,
  'Koraki in zaporedja',
  'koraki-in-zaporedja',
  'text',
  '# Koraki in zaporedja

Najpomembnejša stvar v programiranju: **vrstni red je pomemben!**

## Zaporedje ukazov
Računalnik izvaja ukaze enega za drugim, od zgoraj navzdol:
```
1. Vstani
2. Obleci se
3. Pojej zajtrk
4. Pojdi v šolo
```

Če zamenjamo vrstni red:
```
1. Pojdi v šolo
2. Vstani
3. Obleci se
4. Pojej zajtrk
```
To ne deluje! Ne moreš iti v šolo, preden vstaneš!

## Algoritmi
Zaporedje korakov, ki reši problem, se imenuje **algoritem**. Algoritme uporabljamo vsak dan:
- Recept za torto je algoritem
- Navodila za sestavljanje LEGO kocke so algoritem
- Pot do šole je algoritem

## Razmisli o svojem dnevu
Tvoj cel dan je pravzaprav en velik algoritem! Od jutra do večera slediš korakom v pravem vrstnem redu.

## Izziv
Kaj se zgodi, če spremenimo vrstni red? Včasih deluje (lahko najprej oblečeš hlače ali majico), včasih pa ne (ne moreš se obuti, preden oblečeš nogavice).',
  20,
  '[{"type": "quiz", "title": "Pravilni vrstni red", "description": "Razvrsti ukaze v pravilno zaporedje"}, {"type": "activity", "title": "Moj algoritem", "description": "Napiši algoritem za svojo najljubšo aktivnost (igro, šport, hobij)"}]'
FROM courses c WHERE c.slug = 'coding-with-ai';

INSERT INTO course_lessons (course_id, module_index, lesson_index, title, slug, content_type, content, duration_minutes, activities)
SELECT c.id, 0, 2,
  'Pogoji: Če ... potem',
  'pogoji-ce-potem',
  'text',
  '# Pogoji: Če ... potem

Včasih mora program sprejeti odločitev. Za to uporabimo pogoje!

## Pogoji v resničnem življenju
Vsak dan sprejemlješ odločitve na podlagi pogojev:
- **Če** dežuje → **potem** vzemi dežnik
- **Če** je vikend → **potem** spi dlje
- **Če** si lačen → **potem** pojej malico

## Pogoji v programiranju
V kodi to napišemo tako:
```
ČE temperatura < 10 POTEM
  obleci bundo
SICER
  obleci majico
```

## Večkratni pogoji
Lahko imamo tudi več možnosti:
```
ČE temperatura < 0 POTEM
  obleci zimsko bundo in rokavice
SICER ČE temperatura < 15 POTEM
  obleci jopico
SICER
  obleci majico s kratkimi rokavi
```

## Pogoji in AI
AI uporablja VELIKO pogojev! Glasovni pomočnik:
```
ČE slišim "predvajaj glasbo" POTEM
  predvajaj glasbo
SICER ČE slišim "kakšno je vreme" POTEM
  pokaži vreme
SICER
  reci "Ne razumem"
```

## Tvoja super moč
Tvoji možgani obdelujejo tisoče pogojev na dan, ne da bi sploh razmišljal o tem! Ko programiraš, moraš o vsakem pogoju razmisliti natačno.',
  25,
  '[{"type": "quiz", "title": "Pogoji kviz", "description": "Dopolni pogojne stavke s pravilnim rezultatom"}, {"type": "activity", "title": "Pogoji v igri", "description": "Načrtuj igro z vsaj 5 pogoji tipa ČE-POTEM"}]'
FROM courses c WHERE c.slug = 'coding-with-ai';

INSERT INTO course_lessons (course_id, module_index, lesson_index, title, slug, content_type, content, duration_minutes, activities)
SELECT c.id, 0, 3,
  'Ponavljanje: Zanke',
  'ponavljanje-zanke',
  'text',
  '# Ponavljanje: Zanke

Kaj pa če mora računalnik nekaj ponoviti večkrat? Za to imamo **zanke**!

## Brez zanke
```
Reci "Pozdravljen"
Reci "Pozdravljen"
Reci "Pozdravljen"
Reci "Pozdravljen"
Reci "Pozdravljen"
```
To je 5 vrstic za isto stvar! Kaj pa če bi hotel ponoviti 1000-krat?

## Z zanko
```
PONOVI 5-krat:
  Reci "Pozdravljen"
```
Veliko lepše! En ukaz namesto petih.

## Vrste zank

### Ponovi X-krat
```
PONOVI 10-krat:
  Skoči
```

### Ponavljaj dokler
```
PONAVLJAJ DOKLER nisi v šoli:
  Naredi korak naprej
```

### Za vsak element
```
ZA VSAK predmet v nahrbtniku:
  Položi na mizo
```

## Zanke v resničnem življenju
- **Tek**: ponavljaj korak leva, desna, leva, desna...
- **Glasba**: ponovitev refrena 3-krat
- **Dihanje**: ponavljaj vdih, izdih (za vedno!)

## Neskončna zanka
Kaj se zgodi, če zanka nima konca? Računalnik se "zatakne" in ponavlja za vedno! To imenujemo **neskončna zanka** in je pogosta napaka v programiranju.',
  25,
  '[{"type": "quiz", "title": "Zanke kviz", "description": "Koliko krat se bo ukaz ponovil?"}, {"type": "activity", "title": "Najdi zanke", "description": "Najdi 5 primerov zank v svojem vsakdanjem življenju"}]'
FROM courses c WHERE c.slug = 'coding-with-ai';

INSERT INTO course_lessons (course_id, module_index, lesson_index, title, slug, content_type, content, duration_minutes, activities)
SELECT c.id, 0, 4,
  'Spremenljivke: Shranjevanje podatkov',
  'spremenljivke',
  'text',
  '# Spremenljivke: Shranjevanje podatkov

Včasih mora program shraniti neko informacijo za pozneje. Za to uporabljamo **spremenljivke**!

## Kaj je spremenljivka?
Spremenljivka je kot škatla z imenom, v katero shranimo nekaj:
- Škatla "ime" → vsebuje "Ana"
- Škatla "starost" → vsebuje 9
- Škatla "najljubša_barva" → vsebuje "modra"

## Kako jih uporabljamo?
```
ime = "Ana"
starost = 9
RECI "Pozdravljena, " + ime + "!"
RECI "Stara si " + starost + " let."
```
Rezultat: "Pozdravljena, Ana! Stara si 9 let."

## Spremenljivke se spreminjajo
Zato se imenujejo SPREMENLJIVKE - njihova vrednost se lahko spremeni:
```
točke = 0
točke = točke + 10  → zdaj je 10
točke = točke + 5   → zdaj je 15
točke = točke + 20  → zdaj je 35
```

## Vrste podatkov
V škatlo lahko shranimo različne stvari:
- **Besedilo**: "Pozdravljen" (vedno v narekovajih)
- **Številke**: 42, 3.14
- **Da/Ne**: PRAV ali NAROBE (imenujemo jih boolean)

## Spremenljivke v igrah
Vsaka igra uporablja spremenljivke:
- `življenja = 3` (koliko življenj imaš)
- `nivo = 1` (kateri nivo igraš)
- `hitrost = 5` (kako hitro se premikaš)

Ko izgubiš življenje: `življenja = življenja - 1`
Ko zaključiš nivo: `nivo = nivo + 1`',
  25,
  '[{"type": "quiz", "title": "Spremenljivke kviz", "description": "Kaj je shranjeno v spremenljivki po vsakem koraku?"}, {"type": "activity", "title": "Moja igra s spremenljivkami", "description": "Načrtuj preprosto igro in zapiši vse spremenljivke, ki jih potrebuješ"}]'
FROM courses c WHERE c.slug = 'coding-with-ai';

-- Module 2: Vizualno programiranje (5 lessons)
INSERT INTO course_lessons (course_id, module_index, lesson_index, title, slug, content_type, content, duration_minutes, activities)
SELECT c.id, 1, 0,
  'Spoznaj Scratch',
  'spoznaj-scratch',
  'text',
  '# Spoznaj Scratch

Scratch je programski jezik, ki ga je ustvaril MIT (slavna univerza v Ameriki) posebej za otroke. Namesto pisanja kode, sestavljaš barvne kocke!

## Kaj je Scratch?
- Brezplačen vizualni programski jezik
- Deluješ v brskalniku na scratch.mit.edu
- Sestavljaš kocke kot LEGO
- Primeren za otroke od 8 let naprej

## Vmesnik Scratch
Scratch ima 3 glavne dele:
1. **Oder** (desno) - tu se dogaja tvoj program
2. **Kocke** (levo) - tu so ukazi, ki jih lahko uporabiš
3. **Delovno območje** (sredina) - tu sestavljaš kocke

## Kategorije kock
Kocke so razvrščene po barvah:
- **Modre** = premikanje
- **Vijolične** = videz (kostumi, velikost)
- **Rumene** = pogoji in zanke
- **Oranžne** = spremenljivke
- **Zelene** = zvoki

## Tvoj prvi program v Scratch
```
Ko klikneš zeleno zastavico:
  Reci "Pozdravljen!" za 2 sekundi
  Premakni se 10 korakov
  Obrni se za 90 stopinj
  Premakni se 10 korakov
```

V Scratch to narediš tako, da povlečeš kocke eno pod drugo - kot sestavljanje sestavljanke!

## Zakaj Scratch?
Scratch ti pomaga razumeti programiranje BREZ da bi se učil zapletene kode. Ko razumeš koncepte, je prehod na "pravo" kodo veliko lažji.',
  25,
  '[{"type": "quiz", "title": "Scratch osnove", "description": "Preveri razumevanje Scratch vmesnika"}, {"type": "activity", "title": "Razišči Scratch", "description": "Obišči scratch.mit.edu in poglej 3 projekte drugih otrok"}]'
FROM courses c WHERE c.slug = 'coding-with-ai';

INSERT INTO course_lessons (course_id, module_index, lesson_index, title, slug, content_type, content, duration_minutes, activities)
SELECT c.id, 1, 1,
  'Animacije v Scratch',
  'animacije-scratch',
  'text',
  '# Animacije v Scratch

Zdaj ko poznaš osnove Scratch, naredimo nekaj, kar se premika!

## Kaj je animacija?
Animacija je hitro zaporedje slik, ki ustvari občutek gibanja. Filmi imajo 24 slik na sekundo!

## Premikanje figure
Naša figura (mačka) se lahko premika:
```
Ko klikneš zeleno zastavico:
  Za vedno ponavljaj:
    Premakni se 5 korakov
    Če si na robu, se odbij
```
Zdaj mačka skače po zaslonu!

## Kostumi
Vsaka figura ima lahko več kostumov (slik). Ko hitro menjaš med njimi, dobiš animacijo:
```
Za vedno ponavljaj:
  Naslednji kostum
  Čakaj 0.2 sekundi
```

## Odzivanje na tipke
Figura lahko reagira na tvoje tipke:
```
Ko pritisneš tipko "puščica desno":
  Obrni se v smeri 90
  Premakni se 10 korakov

Ko pritisneš tipko "puščica levo":
  Obrni se v smeri -90
  Premakni se 10 korakov
```

## Govoreča figura
```
Ko klikneš na figuro:
  Reci "Živjo! Jaz sem AI mačka!" za 3 sekunde
  Predvajaj zvok "Mijav"
```

## Tvoj izziv
Poskusi ustvariti animacijo, kjer se mačka premika po zaslonu in se odziva na tvoje klike!',
  30,
  '[{"type": "quiz", "title": "Animacija kviz", "description": "Kako delujejo animacije v Scratch?"}, {"type": "activity", "title": "Moja prva animacija", "description": "Ustvari animacijo v Scratch, kjer se figura premika in govori"}]'
FROM courses c WHERE c.slug = 'coding-with-ai';

INSERT INTO course_lessons (course_id, module_index, lesson_index, title, slug, content_type, content, duration_minutes, activities)
SELECT c.id, 1, 2,
  'Interaktivne zgodbe',
  'interaktivne-zgodbe',
  'text',
  '# Interaktivne zgodbe

S Scratch lahko narediš zgodbe, kjer gledalec izbira, kaj se zgodi naprej!

## Kaj je interaktivna zgodba?
Normalna zgodba: beri od začetka do konca.
Interaktivna zgodba: TI izbiraš, kaj se zgodi!

## Primer: Vesoljska pustolovščina
```
Mačka rece: "Pristali smo na skrivnostnem planetu!"
Mačka rece: "Vidim dve poti."
Vprašaj "Greš levo ali desno?" in čakaj

ČE odgovor = "levo" POTEM
  Zamenjaj ozadje na "jama"
  Mačka reče: "Našel si skrito zakladnico!"
SICER
  Zamenjaj ozadje na "gozd"
  Mačka reče: "Srečaš prijaznega vesoljca!"
```

## Elementi zgodbe
Za dobro interaktivno zgodbo potrebuješ:
- **Ozadja** - različni kraji, kamor zgodba poteka
- **Figure** - liki v zgodbi (vsaj 2-3)
- **Dialoge** - kaj liki govorijo
- **Izbire** - kje gledalec odloča

## Kako delujejo sporočila
Figure si lahko pošiljajo sporočila:
```
Figura 1: Pošlji sporočilo "začni sceno 2"
Figura 2: Ko prejmem sporočilo "začni sceno 2":
  Pokaži se
  Reci "Končno si prišel!"
```

## Nasvet
Najprej nariši svojo zgodbo na papir! Nariši, katere scene potrebuješ in kje so izbire. Potem jo pretvori v Scratch.',
  30,
  '[{"type": "quiz", "title": "Interaktivne zgodbe kviz", "description": "Kako delujejo izbire v interaktivnih zgodbah?"}, {"type": "activity", "title": "Moja zgodba", "description": "Načrtuj interaktivno zgodbo z vsaj 2 izbirama in jo ustvari v Scratch"}]'
FROM courses c WHERE c.slug = 'coding-with-ai';

INSERT INTO course_lessons (course_id, module_index, lesson_index, title, slug, content_type, content, duration_minutes, activities)
SELECT c.id, 1, 3,
  'Preproste igre',
  'preproste-igre',
  'text',
  '# Preproste igre

Čas je za najboljši del - naredimo igro!

## Igra: Ulovi zvezdice
Naredimo igro, kjer lovimo padajoče zvezdice.

### Igralec (mačka)
```
Ko klikneš zeleno zastavico:
  Pojdi na x: 0, y: -150
  Za vedno ponavljaj:
    Če tipka "puščica desno" pritisnjena:
      Spremeni x za 10
    Če tipka "puščica levo" pritisnjena:
      Spremeni x za -10
```

### Zvezdica
```
Ko klikneš zeleno zastavico:
  Za vedno ponavljaj:
    Pojdi na x: naključno(-200, 200), y: 180
    Drsi se 2 sekundi na x: x pozicija, y: -180
    Če se dotika "mačka":
      Spremeni točke za 1
      Predvajaj zvok "pling"
```

### Točke
```
Ko klikneš zeleno zastavico:
  Nastavi "točke" na 0
```

## Elementi vsake igre
1. **Igralec** - figura, ki jo kontroliraš
2. **Cilj** - kaj moraš narediti (uloviti zvezdice)
3. **Točke** - koliko si uspešen
4. **Izziv** - kaj igro naredi težjo (hitrejše zvezdice?)

## Izboljšave
Ko osnovna igra deluje, jo lahko izboljšaš:
- Dodaj ovire, ki jim se moraš izogniti
- Zvezdice padajo vedno hitreje
- Dodaj posebne bonuse
- Dodaj zvoke in glasbo',
  35,
  '[{"type": "quiz", "title": "Igre v Scratch", "description": "Kateri elementi so potrebni za igro?"}, {"type": "activity", "title": "Moja igra", "description": "Ustvari igro Ulovi zvezdice v Scratch (ali svojo različico!)"}]'
FROM courses c WHERE c.slug = 'coding-with-ai';

INSERT INTO course_lessons (course_id, module_index, lesson_index, title, slug, content_type, content, duration_minutes, activities)
SELECT c.id, 1, 4,
  'Kloni in napredne tehnike',
  'kloni-napredne-tehnike',
  'text',
  '# Kloni in napredne tehnike

Zdaj ko znaš narediti osnovno igro, se naučimo naprednejših trikov!

## Kaj so kloni?
Klon je kopija figure. Namesto da narediš 50 zvezdic, narediš 1 in jo kloniraš!
```
Za vedno ponavljaj:
  Ustvari klon sebe
  Čakaj 0.5 sekunde

Ko se začnem kot klon:
  Pojdi na x: naključno(-200, 200), y: 180
  Drsi se 3 sekundi na x: x pozicija, y: -180
  Izbriši ta klon
```

## Seznami
Seznam je kot vrsta škatel:
```
Dodaj "Ana" v seznam "igralci"
Dodaj "Bojan" v seznam "igralci"
Dodaj "Cvetka" v seznam "igralci"
```
Zdaj imaš seznam: ["Ana", "Bojan", "Cvetka"]

## Lastni bloki (funkcije)
Ko imaš kodo, ki jo uporabiš večkrat, jo daj v lasten blok:
```
Definiraj "skoči":
  Spremeni y za 50
  Čakaj 0.3 sekunde
  Spremeni y za -50
```
Zdaj kadarkoli napišeš "skoči", se izvede cel niz ukazov!

## Naključnost
Naključna števila naredijo igro nepredvidljivo:
- Naključna pozicija: `naključno(-200, 200)`
- Naključna barva: `naključno(1, 100)`
- Naključen čas: `čakaj naključno(1, 3) sekund`

## Tvoj naslednji korak
Ko obvladaš Scratch, si pripravljen na pravo kodo! V naslednjem modulu bomo začeli z AI projekti.',
  35,
  '[{"type": "quiz", "title": "Napredne tehnike", "description": "Preveri razumevanje klonov, seznamov in funkcij"}, {"type": "activity", "title": "Nadgradi igro", "description": "Dodaj klone in naključnost v svojo igro iz prejšnje lekcije"}]'
FROM courses c WHERE c.slug = 'coding-with-ai';

-- Module 3: AI projekti (5 lessons)
INSERT INTO course_lessons (course_id, module_index, lesson_index, title, slug, content_type, content, duration_minutes, activities)
SELECT c.id, 2, 0,
  'AI prepoznava vzorce',
  'ai-prepoznava-vzorce',
  'text',
  '# AI prepoznava vzorce

Zdaj ko znaš programirati, poglejmo, kako to povežemo z AI!

## Strojno učenje za otroke
Strojno učenje je del AI, kjer se računalnik uči iz primerov. Obstajajo orodja, ki to naredijo enostavno!

## Teachable Machine
Google Teachable Machine (teachablemachine.withgoogle.com) je brezplačno orodje, kjer:
1. Pokažeš kameri primere (npr. roko gor, roko dol)
2. AI se nauči razlikovati med njimi
3. Uporabiš to v svojem projektu!

## Projekt: Kamen, škarje, papir
Naučimo AI igrati kamen, škarje, papir!

### Korak 1: Zberi podatke
- Pokaži kameri pest (kamen) - 20 slik
- Pokaži kameri odprto dlan (papir) - 20 slik
- Pokaži kameri 2 prsta (škarje) - 20 slik

### Korak 2: Nauči AI
- Klikni "Train Model"
- Počakaj, da se AI nauči (par sekund!)

### Korak 3: Testiraj
- Pokaži kameri roko in poglej, ali pravilno prepozna!

## Kako to deluje?
AI poišče vzorce v slikah:
- Pest = vse skupaj, okrogla oblika
- Dlan = razprti prsti, velika površina
- Škarje = 2 prsta gor, ostalo skupaj

## Pomembno
Več primerov ko daš AI, bolje se nauči! Poskusi dati primere iz različnih kotov in razdalj.',
  30,
  '[{"type": "quiz", "title": "Strojno učenje", "description": "Kako AI prepoznava vzorce na slikah?"}, {"type": "activity", "title": "Moj Teachable Machine", "description": "Uporabi Teachable Machine in nauči AI prepoznati 3 različne predmete"}]'
FROM courses c WHERE c.slug = 'coding-with-ai';

INSERT INTO course_lessons (course_id, module_index, lesson_index, title, slug, content_type, content, duration_minutes, activities)
SELECT c.id, 2, 1,
  'AI klasifikator slik',
  'ai-klasifikator-slik',
  'text',
  '# AI klasifikator slik

V tej lekciji bomo naredili AI, ki prepoznava različne predmete!

## Kaj je klasifikacija?
Klasifikacija pomeni razvrščanje v kategorije:
- Je to mačka ali pes?
- Je to jabolko ali hruška?
- Je to vesel ali žalosten obraz?

## Projekt: Razvrščalec smeti
Naredimo AI, ki prepozna, v kateri koš spada smet!

### Kategorije:
1. **Papir** - časopis, karton, pisma
2. **Plastika** - steklenice, vrečke
3. **Bio** - hrana, listi
4. **Steklo** - kozarci, steklenice

### Kako narediti?
1. Za vsako kategorijo poslikaj 15-20 primerov
2. Uporabi Teachable Machine za učenje
3. Testiraj z novimi predmeti

## Točnost AI
Po učenju boš videl odstotek zaupanja:
- **95% papir, 3% plastika, 2% bio** = AI je precej prepričana!
- **40% papir, 35% plastika, 25% bio** = AI ni prepričana

## Kdaj se AI zmoti?
- Ko je predmet med kategorijami (plastificiran papir?)
- Ko je slaba osvetlitev
- Ko predmeta ni nikoli videla

## Zakaj je to uporabno?
Takšno AI se že uporablja v resničnem svetu:
- Sortiranje pošte (prepoznavanje naslovov)
- Pregled kakovosti v tovarnah
- Medicinske slike (iskanje bolezni)',
  30,
  '[{"type": "quiz", "title": "Klasifikacija kviz", "description": "Kaj pomeni klasifikacija in kako deluje?"}, {"type": "activity", "title": "Moj klasifikator", "description": "Ustvari AI klasifikator za 3 vrste predmetov iz svoje sobe"}]'
FROM courses c WHERE c.slug = 'coding-with-ai';

INSERT INTO course_lessons (course_id, module_index, lesson_index, title, slug, content_type, content, duration_minutes, activities)
SELECT c.id, 2, 2,
  'AI razume besedilo',
  'ai-razume-besedilo',
  'text',
  '# AI razume besedilo

AI ne razume samo slik - razume tudi besedilo! Poglejmo, kako.

## NLP - Naravna obdelava jezika
NLP (Natural Language Processing) je del AI, ki se ukvarja z jezikom. Pomaga računalniku razumeti, kaj pišeš ali govoriš.

## Kako AI bere?
Ko ti bereš "Mačka spi na postelji", razumeš pomen. AI to naredi v korakih:
1. **Razdeli** stavek na besede: [Mačka] [spi] [na] [postelji]
2. **Analizira** vsako besedo: mačka=žival, spi=dejanje, postelji=kraj
3. **Razume** povezavo: žival izvaja dejanje na kraju

## Analiza čustev
AI lahko ugane, ali je stavek pozitiven ali negativen:
- "Ta film je super!" → **POZITIVNO** 😊
- "Danes je grozno vreme" → **NEGATIVNO** 😞
- "Danes grem v šolo" → **NEVTRALNO** 😐

## Projekt: Razpoloženje detektor
Naredimo program, ki analizira razpoloženje:
```
VPRAŠAJ "Kako se danes počutiš? Opiši v enem stavku."
ČE odgovor vsebuje "vesel" ALI "super" ALI "odlično":
  RECI "Veseli me, da se dobro počutiš!"
SICER ČE odgovor vsebuje "žalosten" ALI "slabo" ALI "grozno":
  RECI "Ojoj, upam da bo jutri bolje!"
SICER:
  RECI "Hvala, da si delil z mano!"
```

## Pravi AI prevajalnik
Google Translate je NLP AI, ki razume en jezik in ga pretvori v drugega. Zna več kot 100 jezikov!',
  30,
  '[{"type": "quiz", "title": "NLP kviz", "description": "Kako AI razume besedilo?"}, {"type": "activity", "title": "Razpoloženje detektor", "description": "Napiši program (v pseudokodi ali Scratch), ki analizira razpoloženje stavkov"}]'
FROM courses c WHERE c.slug = 'coding-with-ai';

INSERT INTO course_lessons (course_id, module_index, lesson_index, title, slug, content_type, content, duration_minutes, activities)
SELECT c.id, 2, 3,
  'AI ustvarja glasbo',
  'ai-ustvarja-glasbo',
  'text',
  '# AI ustvarja glasbo

Verjeli ali ne, AI lahko ustvari glasbo! In ti ji lahko pomagaš.

## Kako AI naredi glasbo?
AI se je naučila iz tisoč pesmi:
- Kakšni akordi gredo skupaj
- Kakšni ritmi so prijetni za poslušanje
- Kako se melodija razvija

## Orodja za AI glasbo
Obstaja več brezplačnih orodij:
- **Chrome Music Lab** (musiclab.chromeexperiments.com) - Googlovo orodje za eksperimentiranje z glasbo
- **Soundtrap** - spletni studijo za ustvarjanje glasbe

## Projekt: Moja AI melodija
### Korak 1: Izberi razpoloženje
- Veselo? Uporabi hitre note in dur tonaliteto
- Žalostno? Uporabi počasne note in mol tonaliteto
- Napeto? Uporabi ponavljajoče se vzorce

### Korak 2: Ustvari ritem
V Scratch lahko predvajaš note:
```
Predvajaj noto 60 za 0.5 sekunde
Predvajaj noto 62 za 0.5 sekunde
Predvajaj noto 64 za 0.5 sekunde
Predvajaj noto 65 za 1 sekundo
```

### Korak 3: Dodaj naključnost
```
PONOVI 8-krat:
  Predvajaj noto naključno(60, 72) za 0.25 sekunde
```
AI glasba pogosto deluje na podoben način - kombinira pravila z naključnostjo!

## Zabavno dejstvo
Nekatere pesmi, ki jih slišiš na radiu, so bile delno ustvarjene z AI! AI pomaga pri melodijah, aranžmajih in celo besedilih.',
  30,
  '[{"type": "quiz", "title": "AI glasba kviz", "description": "Kako AI ustvarja glasbo?"}, {"type": "activity", "title": "Moja melodija", "description": "Ustvari kratko melodijo v Scratch ali Chrome Music Lab"}]'
FROM courses c WHERE c.slug = 'coding-with-ai';

INSERT INTO course_lessons (course_id, module_index, lesson_index, title, slug, content_type, content, duration_minutes, activities)
SELECT c.id, 2, 4,
  'AI in podatki',
  'ai-in-podatki',
  'text',
  '# AI in podatki

Podatki so gorivo za AI. Brez podatkov AI ne more delovati!

## Kaj so podatki?
Podatki so informacije, ki jih zberemo:
- Temperature zadnjih 30 dni
- Tvoje ocene v šoli
- Koliko korakov narediš na dan
- Kateri videi ti so všeč

## Vizualizacija podatkov
Ko imaš podatke, jih je lažje razumeti, če jih narišeš:
- **Stolpični grafikon** - primerjava vrednosti
- **Črtni grafikon** - spremembe čez čas
- **Tortni grafikon** - deleži celote

## Projekt: Vremenski podatki
Zberi podatke o vremenu za 7 dni:
```
Ponedeljek: 15°C, sončno
Torek: 12°C, oblačno
Sreda: 8°C, dežuje
Četrtek: 10°C, oblačno
Petek: 14°C, sončno
Sobota: 16°C, sončno
Nedelja: 13°C, oblačno
```

Zdaj lahko AI najde vzorce:
- Kdaj je običajno najtopleje?
- Ali je po dežju vedno hladneje?
- Kakšno bo vreme naslednji teden?

## Zasebnost podatkov
**ZELO POMEMBNO**: podatki so močni, zato moramo biti previdni:
- Ne deli osebnih podatkov z neznanci
- Vprašaj starše, preden karkoli vpišeš na internet
- Vedi, da spletne strani zbirajo podatke o tebi

## AI in odgovornost
Kdor ima podatke, ima moč. Zato je pomembno, da se o tem pogovarjaš s starši.',
  25,
  '[{"type": "quiz", "title": "Podatki in AI kviz", "description": "Kaj so podatki in zakaj jih AI potrebuje?"}, {"type": "activity", "title": "Moji podatki", "description": "Zberi podatke o nečem v svojem življenju za 5 dni in jih nariši na graf"}]'
FROM courses c WHERE c.slug = 'coding-with-ai';

-- Module 4: Moj prvi chatbot (5 lessons)
INSERT INTO course_lessons (course_id, module_index, lesson_index, title, slug, content_type, content, duration_minutes, activities)
SELECT c.id, 3, 0,
  'Kaj je chatbot?',
  'kaj-je-chatbot',
  'text',
  '# Kaj je chatbot?

Chatbot je program, ki se pogovarja s teboj. Zdaj bomo naredili svojega!

## Zgodovina chatbotov
- **1966 ELIZA** - prvi chatbot, ki se je pretvarjal, da je terapevt
- **2001 SmarterChild** - chatbot na AOL Instant Messenger
- **2011 Siri** - Applov glasovni pomočnik
- **2023 ChatGPT** - napredni chatbot, ki zna skoraj vse

## Kako chatbot deluje?
Preprost chatbot ima pravila:
```
ČE uporabnik reče "zdravo":
  Odgovori "Živjo! Kako si?"
ČE uporabnik reče "kako si":
  Odgovori "Jaz sem robot, nimam čustev, ampak hvala!"
ČE uporabnik reče "adijo":
  Odgovori "Nasvidenje! Lep dan ti želim!"
SICER:
  Odgovori "Hmm, ne razumem. Lahko ponoviš?"
```

## Pametnejši chatbot
Napredni chatboti (kot ChatGPT) ne uporabljajo samo pravil. Namesto tega:
1. Analizirajo **pomen** tvojega stavka
2. Pregledajo OGROMNO besedila, ki so ga prebrali
3. Generirajo **nov** odgovor, ki je smiselen

## Naš projekt
V naslednjih lekcijah bomo naredili chatbota, ki:
- Se odziva na pozdrave
- Odgovarja na vprašanja o AI
- Ima svojo osebnost
- Uporablja AI za pametnejše odgovore',
  25,
  '[{"type": "quiz", "title": "Chatbot osnove", "description": "Kako deluje chatbot?"}, {"type": "activity", "title": "Chatbot na papirju", "description": "Napiši 10 pravil za chatbota na temo, ki te zanima"}]'
FROM courses c WHERE c.slug = 'coding-with-ai';

INSERT INTO course_lessons (course_id, module_index, lesson_index, title, slug, content_type, content, duration_minutes, activities)
SELECT c.id, 3, 1,
  'Načrtujemo chatbota',
  'nacrtujemo-chatbota',
  'text',
  '# Načrtujemo chatbota

Preden začnemo kodirati, moramo načrtovati!

## Korak 1: Določi temo
Naš chatbot bo AI učitelj, ki odgovarja na vprašanja o umetni inteligenci. Imenujmo ga **AIko**!

## Korak 2: Osebnost
AIko je:
- Prijazen in potrpežljiv
- Rad razlaga zapletene stvari preprosto
- Ima smisel za humor
- Vedno spodbuja učenje

## Korak 3: Kategorije pogovorov
AIko mora znati odgovarjati na:

### Pozdravi
- "Živjo" → "Zdravo! Jaz sem AIko, tvoj AI učitelj!"
- "Kako si?" → "Odlično! Pripravljen sem te učiti o AI!"

### Vprašanja o AI
- "Kaj je AI?" → razlaga o AI
- "Kje se AI uporablja?" → primeri iz življenja
- "Ali je AI nevarna?" → uravnotežen odgovor

### Zabava
- "Povej vic" → vic o AI ali programiranju
- "Kaj je tvoja najljubša barva?" → zabaven odgovor

### Neznano
- Karkoli drugega → "Zanimivo vprašanje! O tem se še učim."

## Korak 4: Diagram poteka
Nariši diagram, kako chatbot odloča:
```
Uporabnik napiše →
  Ali je pozdrav? → DA → Pozdravi nazaj
                  → NE → Ali je vprašanje o AI? → DA → Odgovori
                                                  → NE → Ali je zabava? → DA → Zabaven odgovor
                                                                          → NE → Privzeti odgovor
```',
  25,
  '[{"type": "quiz", "title": "Načrtovanje chatbota", "description": "Kateri koraki so potrebni za načrtovanje chatbota?"}, {"type": "activity", "title": "Moj chatbot načrt", "description": "Načrtuj chatbota na svojo temo - določi osebnost, kategorije in vsaj 15 pravil"}]'
FROM courses c WHERE c.slug = 'coding-with-ai';

INSERT INTO course_lessons (course_id, module_index, lesson_index, title, slug, content_type, content, duration_minutes, activities)
SELECT c.id, 3, 2,
  'Gradimo chatbota v Scratch',
  'gradimo-chatbota-scratch',
  'text',
  '# Gradimo chatbota v Scratch

Čas je za kodiranje! Naredimo AIka v Scratch!

## Priprava
1. Odpri Scratch in ustvari nov projekt
2. Izbriši mačko in dodaj robotsko figuro
3. Dodaj lepo ozadje (vesolje ali laboratorij)

## Osnovna struktura
```
Ko klikneš zeleno zastavico:
  Reci "Živjo! Jaz sem AIko! Vprašaj me karkoli o AI!" za 3 sekunde
  Za vedno ponavljaj:
    Vprašaj "Kaj bi rad vedel?" in čakaj
    ČE odgovor vsebuje "zdravo" ALI odgovor vsebuje "živjo":
      Reci "Zdravo prijatelj! Kako ti lahko pomagam?" za 2 sekundi
    SICER ČE odgovor vsebuje "kaj je ai":
      Reci "AI je umetna inteligenca - računalnik, ki se uči!" za 3 sekunde
    SICER ČE odgovor vsebuje "primeri":
      Reci "AI najdeš v telefonih, igrah in avtomobilih!" za 3 sekunde
    SICER ČE odgovor vsebuje "vic":
      Reci "Zakaj je programer nosil očala? Ker ni videl C#!" za 3 sekunde
    SICER:
      Reci "Zanimivo! O tem se še učim. Vprašaj me o AI!" za 2 sekundi
```

## Dodajmo več inteligence
Uporabimo spremenljivke za sledenje pogovoru:
```
Nastavi "vprašanja" na 0

Po vsakem odgovoru:
  Spremeni "vprašanja" za 1
  ČE vprašanja = 5:
    Reci "Že 5 vprašanj! Si pravi AI raziskovalec!" za 3 sekunde
```

## Vizualne izboljšave
- Dodaj animacijo govora (menjaj kostume)
- Dodaj zvočne učinke
- Spreminjaj barvo ozadja glede na temo',
  35,
  '[{"type": "quiz", "title": "Scratch chatbot kviz", "description": "Kako deluje chatbot v Scratch?"}, {"type": "activity", "title": "Zgradi AIka", "description": "Sledi navodilom in ustvari AIka v Scratch z vsaj 8 različnimi odgovori"}]'
FROM courses c WHERE c.slug = 'coding-with-ai';

INSERT INTO course_lessons (course_id, module_index, lesson_index, title, slug, content_type, content, duration_minutes, activities)
SELECT c.id, 3, 3,
  'Pametnejši chatbot z AI',
  'pametnejsi-chatbot',
  'text',
  '# Pametnejši chatbot z AI

Naš Scratch chatbot ima omejeno število odgovorov. Pravi AI chatboti so veliko pametnejši!

## Razlika med pravilnim in AI chatbotom

### Pravilni chatbot (naš v Scratch):
- Ima seznam vnaprej določenih odgovorov
- Če ne najde ujemanja, ne ve odgovora
- Vedno odgovori isto na isto vprašanje

### AI chatbot (kot ChatGPT):
- Razume pomen vprašanja
- Generira nov, unikaten odgovor
- Se prilagaja kontekstu pogovora

## Kako narediti chatbota pametnejšega?
Na naši platformi lahko uporabiš **AI prijatelja**, ki je pravi AI chatbot. On:
1. Razume slovenščino
2. Se prilagodi tvoji starosti
3. Odgovarja na vprašanja o AI
4. Pomaga pri učenju

## Primerjaj!
Isti vprašanje, dva chatbota:

**Vprašanje:** "Zakaj je nebo modro?"

**Scratch chatbot:** "Hmm, ne razumem. Vprašaj me o AI!"

**AI chatbot:** "Nebo je modro, ker sončna svetloba potuje skozi Zemljino atmosfero. Atmosfera razbije svetlobo na barve, in modra svetloba se razprši v vse smeri, zato vidimo modro nebo. To se imenuje Rayleighjev razpršitev!"

## Kaj smo se naučili?
- Preprosti chatboti sledijo pravilom
- AI chatboti razumejo jezik
- Oba imata svoje prednosti!',
  25,
  '[{"type": "quiz", "title": "AI vs pravila", "description": "Kaj je razlika med pravilnim in AI chatbotom?"}, {"type": "activity", "title": "Primerjava", "description": "Postavi isto vprašanje Scratch chatbotu in AI prijatelju na platformi - primerjaj odgovore"}]'
FROM courses c WHERE c.slug = 'coding-with-ai';

INSERT INTO course_lessons (course_id, module_index, lesson_index, title, slug, content_type, content, duration_minutes, activities)
SELECT c.id, 3, 4,
  'Zaključni projekt',
  'zakljucni-projekt',
  'text',
  '# Zaključni projekt: Moj AI svet

Čestitke! Prišel si do konca tečaja Programiranje z AI! Čas je za tvoj zaključni projekt.

## Kaj si se naučil?
- **Osnove programiranja**: koraki, pogoji, zanke, spremenljivke
- **Vizualno programiranje**: Scratch, animacije, igre
- **AI koncepti**: strojno učenje, klasifikacija, NLP
- **Chatbot**: načrtovanje in gradnja chatbota

## Zaključni projekt
Izberi enega od treh projektov (ali izmisli svojega!):

### Projekt A: AI kviz igra
Naredi kviz igro v Scratch o AI z vsaj 10 vprašanji, točkami in različnimi težavnostmi.

### Projekt B: AI prepoznavalec
Uporabi Teachable Machine in Scratch, da narediš program, ki prepoznava predmete ali geste.

### Projekt C: Super chatbot
Nadgradi AIka z vsaj 20 različnimi odgovori, sledenjem pogovora in zabavnimi elementi.

## Kriteriji za odlično oceno
- Program deluje brez napak
- Ima jasna navodila za uporabnika
- Vizualno je privlačen
- Uporablja vsaj 3 koncepte iz tečaja

## Deli svoj projekt!
Ko končaš, deli svoj Scratch projekt z drugimi! Na Scratch platformi ga lahko objaviš in drugi otroci ga lahko preizkusijo.

## Tvoja pot naprej
Zdaj ko obvladaš osnove, lahko nadaljuješ z:
- **Python** programiranjem
- **Naprednejšimi AI projekti**
- **Robotiko in AI** (naš napredni tečaj!)

Ponosen sem nate! Programiranje z AI je super moč prihodnosti.',
  40,
  '[{"type": "quiz", "title": "Veliki končni kviz", "description": "Preveri celotno znanje iz tečaja!"}, {"type": "activity", "title": "Zaključni projekt", "description": "Izberi in izdela enega od treh zaključnih projektov"}]'
FROM courses c WHERE c.slug = 'coding-with-ai';
