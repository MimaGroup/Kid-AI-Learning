-- Update Coding with AI course content: add missing diacritics (č, š, ž), fix grammar, improve readability
-- Course: coding-with-ai (20 lessons)

-- Module 1, Lesson 0: Kaj je programiranje?
UPDATE course_lessons
SET content = E'# Kaj je programiranje?\n\nProgramiranje je kot pisanje recepta za računalnik. Poveš mu natančno, kaj naj naredi, korak za korakom!\n\n---\n\n## Računalnik je kot kuhar\n\nPredstavljaj si, da je računalnik kuhar, ti pa mu daješ recept:\n\n1. Vzemi 2 jajci.\n2. Razbij jih v skledo.\n3. Dodaj moko.\n4. Mešaj 2 minuti.\n5. Daj v pečico.\n\nRačunalnik sledi navodilom **natančno** tako, kot si napisal.\n\n---\n\n## Kaj je koda?\n\nKoda je jezik, ki ga razume računalnik. Obstaja veliko programskih jezikov:\n\n- **Scratch** -- vizualni jezik s kockami (odličen za začetnike!).\n- **Python** -- preprost tekstovni jezik.\n- **JavaScript** -- jezik za spletne strani.\n\n---\n\n## Zakaj se učiti programiranja?\n\n- Lahko narediš svojo igro.\n- Lahko narediš svojo spletno stran.\n- Naučiš se logično razmišljati.\n- Razumeš, kako deluje tehnologija okrog tebe.',
    updated_at = NOW()
WHERE title = 'Kaj je programiranje?'
  AND course_id = (SELECT id FROM courses WHERE slug = 'coding-with-ai');

-- Module 1, Lesson 1: Koraki in zaporedja
UPDATE course_lessons
SET content = E'# Koraki in zaporedja\n\nNajpomembnejša stvar v programiranju: **vrstni red je pomemben!**\n\n---\n\n## Zaporedje ukazov\n\nRačunalnik izvaja ukaze enega za drugim, od zgoraj navzdol.\n\nPredstavljaj si, da se oblačiš zjutraj:\n\n1. Obleci spodnje perilo.\n2. Obleci hlače.\n3. Obleci majico.\n4. Obuj copate.\n\nČe zamenjaš vrstni red, bo rezultat čudno izgledal!\n\n---\n\n## Poskusi sam\n\nNapiši 5 korakov za pripravo kosila. Bodi natančen -- računalnik ne zna ugibati!\n\n---\n\n## Algoritem\n\nKo napišeš zaporedje korakov za rešitev problema, se to imenuje **algoritem**. Vsak recept je algoritem!',
    updated_at = NOW()
WHERE title = 'Koraki in zaporedja'
  AND course_id = (SELECT id FROM courses WHERE slug = 'coding-with-ai');

-- Module 1, Lesson 2: Spoznaj Scratch
UPDATE course_lessons
SET content = E'# Spoznaj Scratch\n\nScratch je programski jezik, ki ga je naredil MIT posebej za otroke. Namesto pisanja kode uporabljamo barvne kocke, ki jih zlagamo skupaj!\n\n---\n\n## Kako deluje Scratch?\n\n- Odpri **scratch.mit.edu**.\n- Na levi so barvne kocke (ukazi).\n- Na sredini jih zlagaš skupaj.\n- Na desni vidiš rezultat.\n\n---\n\n## Tvoj prvi program\n\nPoskusi narediti ta program:\n\n1. Izberi kocko "ko klikneš zeleno zastavo".\n2. Dodaj kocko "premakni se 10 korakov".\n3. Dodaj kocko "obrni se 90 stopinj".\n4. Klikni zeleno zastavo!\n\n---\n\n## Kategorije kock\n\n- **Gibanje** (modre) -- premikanje likov.\n- **Videz** (vijolične) -- spreminjanje izgleda.\n- **Zvok** (rožne) -- predvajanje zvokov.\n- **Dogodki** (rumene) -- kdaj naj se kaj zgodi.\n- **Nadzor** (oranžne) -- ponavljanje in čakanje.',
    updated_at = NOW()
WHERE title = 'Spoznaj Scratch'
  AND course_id = (SELECT id FROM courses WHERE slug = 'coding-with-ai');

-- Module 1, Lesson 3: Spremenljivke
UPDATE course_lessons
SET content = E'# Spremenljivke -- škatle za podatke\n\nSpremenljivka je kot škatla, v katero shraniš neko vrednost. Škatla ima ime, znotraj pa je lahko karkoli!\n\n---\n\n## Primer\n\nPredstavljaj si, da imaš tri škatle:\n\n- Škatla **"ime"** vsebuje: Ana\n- Škatla **"starost"** vsebuje: 10\n- Škatla **"najljubša_barva"** vsebuje: modra\n\n---\n\n## V Scratchu\n\n1. Pojdi na "Spremenljivke".\n2. Klikni "Ustvari spremenljivko".\n3. Poimenuj jo "točke".\n4. Zdaj lahko spremeniš vrednost z blokom "nastavi točke na 0".\n\n---\n\n## Zakaj so spremenljivke uporabne?\n\n- Shranjevanje rezultata v igri.\n- Štetje korakov.\n- Pomnjenje uporabnikovega imena.\n- Beleženje časa.',
    updated_at = NOW()
WHERE title = 'Spremenljivke - skatle za podatke'
  AND course_id = (SELECT id FROM courses WHERE slug = 'coding-with-ai');

-- Module 1, Lesson 4: Pogoji
UPDATE course_lessons
SET content = E'# Pogoji -- odločitve v kodi\n\nProgrami morajo sprejemati odločitve. Za to uporabljamo pogoje -- ČE se nekaj zgodi, POTEM naredi to!\n\n---\n\n## Pogoji v vsakdanjem življenju\n\n- ČE dežuje, POTEM vzemi dežnik.\n- ČE je ura 8, POTEM pojdi v šolo.\n- ČE si lačen, POTEM pojej malico.\n\n---\n\n## V Scratchu\n\nUporabimo blok "če ... potem":\n\n```\nče <dotikam se roba?> potem\n  obrni se\nkonec\n```\n\n---\n\n## Primerjave\n\n- Je večje kot? (>)\n- Je manjše kot? (<)\n- Je enako? (=)\n\n---\n\n## Poskusi\n\nNaredi program, kjer se mačka premika. Če se dotakne roba, naj se obrne!',
    updated_at = NOW()
WHERE title = 'Pogoji - odlocitve v kodi'
  AND course_id = (SELECT id FROM courses WHERE slug = 'coding-with-ai');

-- Module 2, Lesson 0: AI kot programerski pomočnik
UPDATE course_lessons
SET content = E'# AI kot programerski pomočnik\n\nAI ne more samo pomagati z domačo nalogo -- lahko ti pomaga tudi pri programiranju! AI pomočniki so kot izkušen programer, ki sedi zraven tebe.\n\n---\n\n## Kaj lahko AI pomočnik naredi?\n\n- **Razloži kodo** -- ne razumeš, kaj koda naredi? Vprašaj AI!\n- **Popravi napake** -- AI najde težave v tvoji kodi.\n- **Predlaga izboljšave** -- AI predlaga boljše načine.\n- **Generira kodo** -- povej mu, kaj želiš, in napisal bo kodo zate.\n\n---\n\n## Pomembno pravilo\n\nAI je pomočnik, ne pa nadomestilo za učenje! Vedno poskusi najprej sam, potem pa vprašaj AI za pomoč.\n\n---\n\n## Primer pogovora z AI\n\n> **Ti:** "Kako naredim, da se lik v Scratchu premika s puščicami?"\n>\n> **AI:** "Uporabi blok \'ko pritisneš tipko puščica desno\' in dodaj \'premakni se 10 korakov\' ..."',
    updated_at = NOW()
WHERE title = 'AI kot programerski pomočnik'
  AND course_id = (SELECT id FROM courses WHERE slug = 'coding-with-ai');

-- Module 2, Lesson 1: Zanke - ponavljanje
UPDATE course_lessons
SET content = E'# Zanke -- ponavljanje\n\nZanke so način, da računalniku poveš: "ponovi to večkrat!"\n\n---\n\n## Zakaj zanke?\n\nBrez zank bi morali napisati vsak korak posebej:\n\n- Premakni se.\n- Premakni se.\n- Premakni se.\n- ... (100-krat)\n\nZ zanko pa preprosto: **"Ponovi 100-krat: premakni se."**\n\n---\n\n## Vrste zank v Scratchu\n\n1. **Ponovi N-krat** -- natančno določi, kolikokrat.\n2. **Za vedno** -- ponavljaj brez konca.\n3. **Ponavljaj, dokler ne ...** -- ponavljaj, dokler ni pogoj izpolnjen.\n\n---\n\n## Praktični primer\n\nNaredi program, kjer mačka hodi v krogu:\n\n```\nponovi 36-krat\n  premakni se 10 korakov\n  obrni se 10 stopinj\nkonec\n```\n\nTo nariše krog!',
    updated_at = NOW()
WHERE title = 'Zanke - ponavljanje'
  AND course_id = (SELECT id FROM courses WHERE slug = 'coding-with-ai');

-- Module 2, Lesson 2: Dogodki in interakcija
UPDATE course_lessons
SET content = E'# Dogodki in interakcija\n\nDogodki so stvari, ki se zgodijo -- klik miške, pritisk tipke ali začetek programa. Program se odziva na te dogodke!\n\n---\n\n## Vrste dogodkov\n\n- **Ko klikneš zeleno zastavo** -- začetek programa.\n- **Ko pritisneš tipko** -- uporabnikov vnos.\n- **Ko klikneš ta lik** -- interakcija z likom.\n- **Ko sprejmem sporočilo** -- komunikacija med liki.\n\n---\n\n## Naredi interaktivno zgodbo\n\n1. Dodaj dva lika (mačko in psa).\n2. Ko klikneš mačko, naj reče "Mijav!".\n3. Ko klikneš psa, naj reče "Hov!".\n4. Ko pritisneš preslednico, naj oba skočita.\n\n---\n\n## Sporočila\n\nLiki si lahko pošiljajo sporočila:\n\n- Mačka pošlje sporočilo "pozdravi".\n- Pes sprejme sporočilo in odgovori.',
    updated_at = NOW()
WHERE title = 'Dogodki in interakcija'
  AND course_id = (SELECT id FROM courses WHERE slug = 'coding-with-ai');

-- Module 2, Lesson 3: Pisanje navodil za AI
UPDATE course_lessons
SET content = E'# Pisanje navodil za AI\n\nČe želiš, da ti AI dobro pomaga pri programiranju, mu moraš dati dobra navodila. To se imenuje **prompt engineering**!\n\n---\n\n## Slaba navodila proti dobrim\n\n**Slabo:** "Naredi igro."\n\n**Dobro:** "Naredi igro v Scratchu, kjer mačka lovi miško. Mačka se premika s puščicami, miška se premika naključno. Ko mačka ujame miško, dobi točko."\n\n---\n\n## 5 pravil za dobra navodila\n\n1. **Bodi natančen** -- povej točno, kaj želiš.\n2. **Razloži kontekst** -- povej, kaj že imaš.\n3. **Razdeli na korake** -- vprašaj za eno stvar naenkrat.\n4. **Daj primere** -- pokaži, kaj pričakuješ.\n5. **Vprašaj za razlago** -- reci "razloži mi, zakaj".\n\n---\n\n## Vaja\n\nNapiši tri različne načine, kako bi AI prosil za pomoč pri izdelavi kviza v Scratchu.',
    updated_at = NOW()
WHERE title = 'Pisanje navodil za AI'
  AND course_id = (SELECT id FROM courses WHERE slug = 'coding-with-ai');

-- Module 2, Lesson 4: Razhroščevanje s pomočjo AI
UPDATE course_lessons
SET content = E'# Razhroščevanje s pomočjo AI\n\nRazhroščevanje (debugging) pomeni iskanje in popravljanje napak v kodi. AI je pri tem odličen pomočnik!\n\n---\n\n## Pogoste napake\n\n1. **Sintaksne napake** -- napačno napisana koda.\n2. **Logične napake** -- koda deluje, ampak ne tako, kot želiš.\n3. **Neskončne zanke** -- program se nikoli ne ustavi.\n\n---\n\n## Kako AI pomaga?\n\nKopiraj svojo kodo in vprašaj AI:\n\n- "Zakaj moj program ne deluje?"\n- "Kaj je narobe s to kodo?"\n- "Kako popravim to napako?"\n\n---\n\n## Postopek razhroščevanja\n\n1. **Preberi napako** -- kaj računalnik pravi, da je narobe?\n2. **Poišči vzrok** -- kje v kodi je težava?\n3. **Vprašaj AI** -- kopiraj kodo in napako.\n4. **Razumi popravek** -- ne samo kopiraj, razumi!\n5. **Testiraj** -- preveri, ali zdaj deluje.\n\n---\n\n## Vaja\n\nNamerno naredi napako v Scratch programu in jo poskusi popraviti s pomočjo AI.',
    updated_at = NOW()
WHERE title = 'Razhroščevanje s pomočjo AI'
  AND course_id = (SELECT id FROM courses WHERE slug = 'coding-with-ai');

-- Module 3, Lesson 0: Načrtovanje projekta
UPDATE course_lessons
SET content = E'# Načrtovanje projekta\n\nPreden začneš programirati, moraš načrtovati! Najboljši programerji vedno najprej razmislijo, potem pa pišejo kodo.\n\n---\n\n## 4 koraki načrtovanja\n\n1. **Ideja** -- kaj želiš narediti?\n2. **Načrt** -- kako bo izgledalo? Nariši!\n3. **Koraki** -- kaj moraš narediti po vrsti?\n4. **Testiranje** -- kako veš, da deluje?\n\n---\n\n## Primer načrtovanja igre\n\n**Ideja:** Igra, kjer lovimo sadje.\n\n**Načrt:**\n- Sadje padajo od zgoraj.\n- Košara se premika levo-desno.\n- Točke za vsak ujet sadež.\n- 3 življenja.\n\n**Koraki:**\n1. Nariši košaro in sadje.\n2. Sprogramiraj padanje.\n3. Sprogramiraj lovljenje.\n4. Dodaj točke.\n5. Dodaj življenja.\n\n---\n\n## Vaja\n\nNačrtuj svojo igro! Nariši, kako bo izgledala, in napiši korake.',
    updated_at = NOW()
WHERE title = 'Načrtovanje projekta'
  AND course_id = (SELECT id FROM courses WHERE slug = 'coding-with-ai');

-- Module 3, Lesson 1: Naredimo igro - 1. del
UPDATE course_lessons
SET content = E'# Naredimo igro -- 1. del\n\nDanes začnemo graditi pravo igro v Scratchu! Naredili bomo igro **Lovi sadje**.\n\n---\n\n## Korak 1: Priprava\n\n- Odpri Scratch.\n- Izbriši mačko.\n- Dodaj ozadje (npr. modro nebo).\n\n---\n\n## Korak 2: Košara\n\n- Nariši košaro (ali jo najdi v knjižnici).\n- Dodaj kodo za premikanje:\n\n```\nza vedno\n  če <tipka puščica desno pritisnjena?> potem\n    spremeni x za 10\n  konec\n  če <tipka puščica levo pritisnjena?> potem\n    spremeni x za -10\n  konec\nkonec\n```\n\n---\n\n## Korak 3: Sadje\n\n- Nariši jabolko.\n- Dodaj kodo za padanje:\n\n```\nko klikneš zeleno zastavo\nza vedno\n  pojdi na x: (naključno od -200 do 200) y: 180\n  drsi se v 3 sekundah na x: (x pozicija) y: -180\nkonec\n```\n\n---\n\n## Domača naloga\n\nDodaj še eno vrsto sadja (npr. banano)!',
    updated_at = NOW()
WHERE title = 'Naredimo igro - 1. del'
  AND course_id = (SELECT id FROM courses WHERE slug = 'coding-with-ai');

-- Module 3, Lesson 2: Naredimo igro - 2. del
UPDATE course_lessons
SET content = E'# Naredimo igro -- 2. del\n\nNadaljujemo z našo igro "Lovi sadje"! Danes dodamo točke in življenja.\n\n---\n\n## Korak 4: Točke\n\n- Ustvari spremenljivko "točke".\n- Ko se sadež dotakne košare:\n\n```\nče <dotikam se košare?> potem\n  spremeni točke za 1\n  predvajaj zvok pop\n  pojdi na x: (naključno) y: 180\nkonec\n```\n\n---\n\n## Korak 5: Življenja\n\n- Ustvari spremenljivko "življenja" (začni s 3).\n- Ko sadež pade na tla:\n\n```\nče <y pozicija < -170> potem\n  spremeni življenja za -1\n  pojdi na x: (naključno) y: 180\nkonec\n```\n\n---\n\n## Korak 6: Konec igre\n\n```\nče <življenja = 0> potem\n  reci "Konec igre! Tvoje točke: " in točke\n  ustavi vse\nkonec\n```\n\n---\n\n## Izziv\n\nDodaj težavnostne stopnje -- sadje padajo hitreje, ko zbereš več točk!',
    updated_at = NOW()
WHERE title = 'Naredimo igro - 2. del'
  AND course_id = (SELECT id FROM courses WHERE slug = 'coding-with-ai');

-- Module 3, Lesson 3: Uvod v Python
UPDATE course_lessons
SET content = E'# Uvod v Python\n\nPython je eden najpopularnejših programskih jezikov na svetu. Je preprost, eleganten in odličen za začetnike!\n\n---\n\n## Zakaj Python?\n\n- Najpopularnejši jezik za AI in podatkovno znanost.\n- Preprost za branje in pisanje.\n- Ogromna skupnost in veliko virov za učenje.\n- Uporaben za igre, spletne strani, znanost ...\n\n---\n\n## Tvoj prvi Python program\n\n```python\nprint("Pozdravljen, svet!")\n```\n\n---\n\n## Spremenljivke v Pythonu\n\n```python\nime = "Ana"\nstarost = 10\nprint("Moje ime je " + ime)\nprint("Star/a sem " + str(starost) + " let")\n```\n\n---\n\n## Pogoji v Pythonu\n\n```python\nstarost = 10\nif starost >= 10:\n    print("Lahko greš na vlakec smrti!")\nelse:\n    print("Še eno leto počakaj.")\n```\n\n---\n\n## Vaja\n\nNapiši Python program, ki vpraša za tvoje ime in te pozdravi!',
    updated_at = NOW()
WHERE title = 'Uvod v Python'
  AND course_id = (SELECT id FROM courses WHERE slug = 'coding-with-ai');

-- Module 3, Lesson 4: Python in AI - tvoj prvi AI program
UPDATE course_lessons
SET content = E'# Python in AI -- tvoj prvi AI program\n\nZdaj ko poznaš osnove Pythona, lahko naredimo tvoj prvi AI program!\n\n---\n\n## Preprost AI klepetalni robot\n\n```python\nodgovori = {\n    "kako si": "Jaz sem AI, vedno sem super!",\n    "kaj znaš": "Znam odgovarjati na vprašanja!",\n    "koliko je 2+2": "To je 4!",\n    "adijo": "Nasvidenje! Lep dan ti želim!"\n}\n\nprint("Pozdravljeni! Sem preprost klepetalni robot.")\nwhile True:\n    vprašanje = input("Ti: ").lower()\n    if vprašanje == "adijo":\n        print("Bot: Nasvidenje!")\n        break\n    elif vprašanje in odgovori:\n        print("Bot:", odgovori[vprašanje])\n    else:\n        print("Bot: Hmm, tega ne razumem. Poskusi kaj drugega!")\n```\n\n---\n\n## Kako to deluje?\n\n1. Imamo **slovar** odgovorov.\n2. Uporabnik vnese vprašanje.\n3. Program poišče odgovor v slovarju.\n4. Če ga ne najde, reče, da ne razume.\n\n---\n\n## To je osnova AI klepetalnih robotov!\n\nPravi klepetalni roboti (kot ChatGPT) delujejo na istem načelu, ampak s tisoči primeri in nevronskimi mrežami.\n\n---\n\n## Zaključni projekt\n\nDodaj svojemu klepetalnem robotu še 10 novih vprašanj in odgovorov na temo, ki te zanima!',
    updated_at = NOW()
WHERE title = 'Python in AI - tvoj prvi AI program'
  AND course_id = (SELECT id FROM courses WHERE slug = 'coding-with-ai');

-- Module 4, Lesson 0: Funkcije - lastni ukazi
UPDATE course_lessons
SET content = E'# Funkcije -- lastni ukazi\n\nFunkcije so kot tvoji lastni ukazi. Namesto da vsako stvar pišemo znova in znova, jo zapakiramo v funkcijo!\n\n---\n\n## Primer brez funkcije\n\n```python\nprint("*****")\nprint("Pozdravljen Ana!")\nprint("*****")\nprint("*****")\nprint("Pozdravljen Mark!")\nprint("*****")\n```\n\n---\n\n## Primer s funkcijo\n\n```python\ndef pozdravi(ime):\n    print("*****")\n    print("Pozdravljen " + ime + "!")\n    print("*****")\n\npozdravi("Ana")\npozdravi("Mark")\npozdravi("Luka")\n```\n\nVidiš? Veliko krajše in preglednejše!\n\n---\n\n## Funkcije vračajo rezultate\n\n```python\ndef seštej(a, b):\n    return a + b\n\nrezultat = seštej(5, 3)\nprint(rezultat)  # 8\n```\n\n---\n\n## Vaja\n\nNapiši funkcijo, ki izračuna povprečje treh števil!',
    updated_at = NOW()
WHERE title = 'Funkcije - lastni ukazi'
  AND course_id = (SELECT id FROM courses WHERE slug = 'coding-with-ai');

-- Module 4, Lesson 1: Seznami in podatki
UPDATE course_lessons
SET content = E'# Seznami in podatki\n\nSeznami (lists) so način za shranjevanje več podatkov skupaj. Kot nakupovalni seznam!\n\n---\n\n## Ustvarjanje seznama\n\n```python\nsadja = ["jabolko", "banana", "češnja", "kivi"]\nocene = [5, 4, 5, 3, 5, 4]\n```\n\n---\n\n## Delo s seznami\n\n```python\n# Dodaj element\nsadja.append("ananas")\n\n# Dolžina seznama\nprint(len(sadja))  # 5\n\n# Zanka čez seznam\nfor sadje in sadja:\n    print("Rad imam " + sadje)\n```\n\n---\n\n## AI in podatki\n\nAI se uči iz podatkov. Več podatkov ima, bolje se nauči!\n\nPredstavljaj si, da učiš AI prepoznavati sadje:\n\n- 100 slik jabolk.\n- 100 slik banan.\n- 100 slik češenj.\n\nAI pogleda vse slike in se nauči razlik med njimi.\n\n---\n\n## Vaja\n\nNaredi seznam svojih 5 najljubših filmov in napiši program, ki naključno izbere film za večerni ogled!',
    updated_at = NOW()
WHERE title = 'Seznami in podatki'
  AND course_id = (SELECT id FROM courses WHERE slug = 'coding-with-ai');

-- Module 4, Lesson 2: Spletne strani z AI
UPDATE course_lessons
SET content = E'# Spletne strani z AI\n\nHTML in CSS sta jezika za izdelavo spletnih strani. S pomočjo AI jih lahko narediš izjemno hitro!\n\n---\n\n## HTML -- struktura\n\nHTML določa, KAJ je na strani:\n\n```html\n<h1>Moja spletna stran</h1>\n<p>Pozdravljen, svet!</p>\n<img src="slika.jpg">\n<button>Klikni me</button>\n```\n\n---\n\n## CSS -- izgled\n\nCSS določa, KAKO izgleda:\n\n```css\nh1 {\n  color: blue;\n  font-size: 24px;\n}\nbutton {\n  background: green;\n  color: white;\n  padding: 10px;\n}\n```\n\n---\n\n## AI pomaga pri spletnih straneh\n\nLahko AI vprašaš:\n\n- "Naredi mi HTML za predstavitev o dinozavrih."\n- "Dodaj lep CSS dizajn z modrimi barvami."\n- "Naredi navigacijski meni."\n\n---\n\n## Vaja\n\nS pomočjo AI naredi preprosto spletno stran o svoji najljubši živali!',
    updated_at = NOW()
WHERE title = 'Spletne strani z AI'
  AND course_id = (SELECT id FROM courses WHERE slug = 'coding-with-ai');

-- Module 4, Lesson 3: Igre z AI logiko
UPDATE course_lessons
SET content = E'# Igre z AI logiko\n\nNaredi igro, kjer računalniški nasprotnik uporablja preprosto AI logiko!\n\n---\n\n## Kamen, škarje, papir z AI\n\n```python\nimport random\n\nmožnosti = ["kamen", "škarje", "papir"]\n\nwhile True:\n    igralec = input("Izberi (kamen/škarje/papir): ").lower()\n    if igralec == "konec":\n        break\n\n    ai = random.choice(možnosti)\n    print("AI je izbral: " + ai)\n\n    if igralec == ai:\n        print("Izenačeno!")\n    elif (igralec == "kamen" and ai == "škarje") or \\\n         (igralec == "škarje" and ai == "papir") or \\\n         (igralec == "papir" and ai == "kamen"):\n        print("Zmagal si!")\n    else:\n        print("AI je zmagal!")\n```\n\n---\n\n## Pametnejša AI\n\nLahko naredimo AI pametnejšo -- naj si zapomni, kaj pogosto izbiraš, in se prilagodi!\n\n---\n\n## Izziv\n\nDodaj števec zmag in porazov ter prikaži rezultat na koncu!',
    updated_at = NOW()
WHERE title = 'Igre z AI logiko'
  AND course_id = (SELECT id FROM courses WHERE slug = 'coding-with-ai');

-- Module 4, Lesson 4: Zaključni projekt
UPDATE course_lessons
SET content = E'# Zaključni projekt -- moj AI program\n\nČas je za tvoj zaključni projekt! Uporabi vse, kar si se naučil, in naredi nekaj svojega.\n\n---\n\n## Ideje za projekte\n\n1. **AI kviz** -- program, ki sprašuje vprašanja in preverja odgovore.\n2. **Priporočilni sistem** -- vprašaj uporabnika, kaj ima rad, in mu priporoči film ali knjigo.\n3. **Preprosta igra z AI** -- igra, kjer računalnik igra proti tebi.\n4. **Generator zgodb** -- AI, ki ustvari naključne zgodbe.\n5. **Kalkulator za domačo nalogo** -- pomaga pri matematiki.\n\n---\n\n## Koraki za projekt\n\n1. Izberi idejo.\n2. Načrtuj na papirju.\n3. Napiši kodo po korakih.\n4. Testiraj in popravi napake.\n5. Pokaži prijateljem in družini!\n\n---\n\n## Predstavitev\n\nPripravi kratko predstavitev:\n\n- Kaj program dela?\n- Kako si ga naredil?\n- Kaj si se naučil?\n- Kaj bi izboljšal?\n\n---\n\nČestitke, zdaj si pravi mladi programer! Nadaljuj z učenjem in ustvarjanjem!',
    updated_at = NOW()
WHERE title = 'Zaključni projekt - moj AI program'
  AND course_id = (SELECT id FROM courses WHERE slug = 'coding-with-ai');
