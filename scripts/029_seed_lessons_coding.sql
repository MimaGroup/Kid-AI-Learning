-- Seed lessons for "Programiranje z AI" (coding-with-ai) - 20 lessons
-- Module 1: Uvod v programiranje (5 lessons)
INSERT INTO course_lessons (course_id, module_index, lesson_index, title, content, content_type, duration_minutes, key_concepts)
SELECT c.id, 0, 0,
  'Kaj je programiranje?',
  E'# Kaj je programiranje?\n\nProgramiranje je kot pisanje recept za racunalnik. Poves mu natancno, kaj naj naredi, korak za korakom!\n\n## Racunalnik je kot kuhar\nPredstavljaj si, da je racunalnik kuhar, ti pa mu dajes recept:\n1. Vzemi 2 jajci\n2. Razbij jih v skledo\n3. Dodaj moko\n4. Mesaj 2 minuti\n5. Daj v pecico\n\nRacunalnik sledi navodilom **natancno** tako, kot si napisal.\n\n## Kaj je koda?\nKoda je jezik, ki ga razume racunalnik. Obstaja veliko programskih jezikov:\n- **Scratch** - vizualni jezik s kockami (super za zacetnike!)\n- **Python** - preprost tekstovni jezik\n- **JavaScript** - jezik za spletne strani\n\n## Zakaj se uciti programiranja?\n- Lahko naredis svojo igro\n- Lahko naredis svojo spletno stran\n- Naucis se logicno razmisljati\n- Razumes, kako deluje tehnologija okrog tebe',
  'text', 20,
  '["programiranje", "koda", "programski jeziki", "Scratch"]'
FROM courses c WHERE c.slug = 'coding-with-ai'
ON CONFLICT (course_id, module_index, lesson_index) DO NOTHING;

INSERT INTO course_lessons (course_id, module_index, lesson_index, title, content, content_type, duration_minutes, key_concepts)
SELECT c.id, 0, 1,
  'Koraki in zaporedja',
  E'# Koraki in zaporedja\n\nNajpomembnejsa stvar v programiranju: **vrstni red je pomemben!**\n\n## Zaporedje ukazov\nRacunalnik izvaja ukaze enega za drugim, od zgoraj navzdol.\n\nPredstavljaj si, da se oblacis zjutraj:\n1. Obleci spodnje perilo\n2. Obleci hlace\n3. Obleci majico\n4. Obuj copate\n\nCe zamenjas vrstni red, bo rezultat cudno izgledal!\n\n## Poskusi sam\nNapisi 5 korakov za pripravo kosila. Bodi natancen - racunalnik ne zna ugibati!\n\n## Algoritem\nKo napises zaporedje korakov za resitev problema, se to imenuje **algoritem**. Vsak recept je algoritem!',
  'text', 20,
  '["zaporedje", "algoritem", "vrstni red", "ukazi"]'
FROM courses c WHERE c.slug = 'coding-with-ai'
ON CONFLICT (course_id, module_index, lesson_index) DO NOTHING;

INSERT INTO course_lessons (course_id, module_index, lesson_index, title, content, content_type, duration_minutes, key_concepts)
SELECT c.id, 0, 2,
  'Spoznaj Scratch',
  E'# Spoznaj Scratch\n\nScratch je programski jezik, ki ga je naredil MIT posebej za otroke. Namesto pisanja kode, uporabljamo barvne kocke, ki jih zlagamo skupaj!\n\n## Kako deluje Scratch?\n- Odpri scratch.mit.edu\n- Na levi so barvne kocke (ukazi)\n- Na sredini jih zlagas skupaj\n- Na desni vidis rezultat\n\n## Tvoj prvi program\nPoskusi narediti ta program:\n1. Izberi kocko "ko kliknes zeleno zastavo"\n2. Dodaj kocko "premakni se 10 korakov"\n3. Dodaj kocko "obrni se 90 stopinj"\n4. Klikni zeleno zastavo!\n\n## Kategorije kock\n- **Gibanje** (modre) - premikanje likov\n- **Videz** (vijolicne) - spreminjanje izgleda\n- **Zvok** (rozne) - predvajanje zvokov\n- **Dogodki** (rumene) - kdaj naj se kaj zgodi\n- **Nadzor** (oranzne) - ponavljanje in cakanje',
  'text', 25,
  '["Scratch", "bloki", "program", "MIT"]'
FROM courses c WHERE c.slug = 'coding-with-ai'
ON CONFLICT (course_id, module_index, lesson_index) DO NOTHING;

INSERT INTO course_lessons (course_id, module_index, lesson_index, title, content, content_type, duration_minutes, key_concepts)
SELECT c.id, 0, 3,
  'Spremenljivke - skatle za podatke',
  E'# Spremenljivke - skatle za podatke\n\nSpremenljivka je kot skatla, v katero shranis neko vrednost. Skatla ima ime, znotraj pa je lahko karkoli!\n\n## Primer\nPredstavljaj si, da imas tri skatle:\n- Skatla "ime" vsebuje: Ana\n- Skatla "starost" vsebuje: 10\n- Skatla "najljubsa_barva" vsebuje: modra\n\n## V Scratchu\n1. Pojdi na "Spremenljivke"\n2. Klikni "Ustvari spremenljivko"\n3. Poimenuj jo "tocke"\n4. Zdaj lahko spremenis vrednost z blokom "nastavi tocke na 0"\n\n## Zakaj so spremenljivke uporabne?\n- Shranjevanje rezultata v igri\n- Stampanje korakov\n- Pomnjenje uporabnikovega imena\n- Belezenje casa',
  'text', 20,
  '["spremenljivke", "vrednost", "podatki", "shranjevanje"]'
FROM courses c WHERE c.slug = 'coding-with-ai'
ON CONFLICT (course_id, module_index, lesson_index) DO NOTHING;

INSERT INTO course_lessons (course_id, module_index, lesson_index, title, content, content_type, duration_minutes, key_concepts)
SELECT c.id, 0, 4,
  'Pogoji - odlocitve v kodi',
  E'# Pogoji - odlocitve v kodi\n\nProgrami morajo sprejemati odlocitve. Za to uporabljamo pogoje - CE se nekaj zgodi, POTEM naredi to!\n\n## Pogoji v vsakdanjem zivljenju\n- CE dežuje, POTEM vzemi dežnik\n- CE je ura 8, POTEM pojdi v solo\n- CE imas glad, POTEM pojej malico\n\n## V Scratchu\nUporabimo blok "ce ... potem":\n```\nce <dotikam se roba?> potem\n  obrni se\nkonec\n```\n\n## Primerjave\n- Je vecje kot? (>)\n- Je manjse kot? (<)\n- Je enako? (=)\n\n## Poskusi\nNaredi program, kjer se macka premika. Ce se dotakne roba, naj se obrne!',
  'text', 25,
  '["pogoji", "ce-potem", "primerjave", "odlocitve"]'
FROM courses c WHERE c.slug = 'coding-with-ai'
ON CONFLICT (course_id, module_index, lesson_index) DO NOTHING;

-- Module 2: Programiranje z AI pomočnikom (5 lessons)
INSERT INTO course_lessons (course_id, module_index, lesson_index, title, content, content_type, duration_minutes, key_concepts)
SELECT c.id, 1, 0,
  'AI kot programerski pomočnik',
  E'# AI kot programerski pomočnik\n\nAI ne more samo pomagati z domaco nalogo - lahko ti pomaga tudi pri programiranju! AI pomočniki so kot izkusen programer, ki sedi zraven tebe.\n\n## Kaj lahko AI pomočnik naredi?\n- **Razloži kodo** - ne razumes, kaj koda naredi? Vprasaj AI!\n- **Popravi napake** - AI najde tezave v tvoji kodi\n- **Predlaga izboljsave** - AI predlaga boljse nacine\n- **Generira kodo** - povej mu, kaj zelis, in napisal bo kodo zate\n\n## Pomembno pravilo\nAI je pomočnik, ne pa nadomestilo za ucenje! Vedno poskusi najprej sam, potem pa vprasaj AI za pomoc.\n\n## Primer pogovora z AI\nTi: "Kako naredim, da se lik v Scratchu premika z puščicami?"\nAI: "Uporabi blok ko pritisnes tipko puščica desno in dodaj premakni se 10 korakov..."',
  'text', 20,
  '["AI pomočnik", "generiranje kode", "razhroščevanje", "učenje"]'
FROM courses c WHERE c.slug = 'coding-with-ai'
ON CONFLICT (course_id, module_index, lesson_index) DO NOTHING;

INSERT INTO course_lessons (course_id, module_index, lesson_index, title, content, content_type, duration_minutes, key_concepts)
SELECT c.id, 1, 1,
  'Zanke - ponavljanje',
  E'# Zanke - ponavljanje\n\nZanke so nacin, da racunalniku poves: "ponovi to veckrat!"\n\n## Zakaj zanke?\nBrez zank bi morali napisati vsak korak posebej:\n- Premakni se\n- Premakni se\n- Premakni se\n- ... (100x)\n\nZ zanko: "Ponovi 100x: premakni se"\n\n## Vrste zank v Scratchu\n1. **Ponovi N-krat** - tocno doloci, kolikokrat\n2. **Za vedno** - ponavljaj brez konca\n3. **Ponavljaj dokler ne** - ponavljaj, dokler ni pogoj izpolnjen\n\n## Prakticni primer\nNaredi program, kjer macka hodi v krogu:\n```\nponovi 36-krat\n  premakni se 10 korakov\n  obrni se 10 stopinj\nkonec\n```\nTo naredi krog!',
  'text', 25,
  '["zanke", "ponavljanje", "ponovi", "za vedno"]'
FROM courses c WHERE c.slug = 'coding-with-ai'
ON CONFLICT (course_id, module_index, lesson_index) DO NOTHING;

INSERT INTO course_lessons (course_id, module_index, lesson_index, title, content, content_type, duration_minutes, key_concepts)
SELECT c.id, 1, 2,
  'Dogodki in interakcija',
  E'# Dogodki in interakcija\n\nDogodki so stvari, ki se zgodijo - klik miske, pritisk tipke, ali zacetek programa. Program se odziva na te dogodke!\n\n## Vrste dogodkov\n- **Ko kliknes zeleno zastavo** - zacetek programa\n- **Ko pritisnes tipko** - uporabnikov vnos\n- **Ko kliknes ta lik** - interakcija z likom\n- **Ko sprejmem sporocilo** - komunikacija med liki\n\n## Naredi interaktivno zgodbo\n1. Dodaj dva lika (macko in psa)\n2. Ko kliknes macko, naj rece "Miau!"\n3. Ko kliknes psa, naj rece "Hov!"\n4. Ko pritisnes preslednico, naj oba skocita\n\n## Sporočila\nLiki si lahko posiljajo sporocila:\n- Macka poslje sporocilo "pozdravi"\n- Pes sprejme sporocilo in odgovori',
  'text', 25,
  '["dogodki", "interakcija", "sporočila", "tipke"]'
FROM courses c WHERE c.slug = 'coding-with-ai'
ON CONFLICT (course_id, module_index, lesson_index) DO NOTHING;

INSERT INTO course_lessons (course_id, module_index, lesson_index, title, content, content_type, duration_minutes, key_concepts)
SELECT c.id, 1, 3,
  'Pisanje navodil za AI',
  E'# Pisanje navodil za AI\n\nCe zelis, da ti AI dobro pomaga pri programiranju, mu moras dati dobra navodila. To se imenuje **prompt engineering**!\n\n## Slaba navodila vs. dobra navodila\n\n**Slabo:** "Naredi igro"\n**Dobro:** "Naredi igro v Scratchu, kjer macka lovi misko. Macka se premika s puscicami, miska se premika nakljucno. Ko macka ujame misko, dobi tocko."\n\n## 5 pravil za dobra navodila\n1. **Bodi specificen** - povej tocno, kaj zelis\n2. **Razlozi kontekst** - povej, kaj ze imas\n3. **Razdeli na korake** - vprasaj za eno stvar naenkrat\n4. **Daj primere** - pokazi, kaj pricakujes\n5. **Vprasaj za razlago** - reci "razlozi mi zakaj"\n\n## Vaja\nNapisi tri razlicne nacine, kako bi AI prosil za pomoc pri izdelavi kviza v Scratchu.',
  'text', 20,
  '["prompt engineering", "navodila", "specifičnost", "kontekst"]'
FROM courses c WHERE c.slug = 'coding-with-ai'
ON CONFLICT (course_id, module_index, lesson_index) DO NOTHING;

INSERT INTO course_lessons (course_id, module_index, lesson_index, title, content, content_type, duration_minutes, key_concepts)
SELECT c.id, 1, 4,
  'Razhroščevanje s pomočjo AI',
  E'# Razhroscevanje s pomocjo AI\n\nRazhroscevanje (debugging) pomeni iskanje in popravljanje napak v kodi. AI je pri tem odlicen pomočnik!\n\n## Pogoste napake\n1. **Sintaksne napake** - napacno napisana koda\n2. **Logicne napake** - koda deluje, ampak ne tako kot zelis\n3. **Neskoncne zanke** - program se nikoli ne ustavi\n\n## Kako AI pomaga?\nKopiraj svojo kodo in vprasaj AI:\n- "Zakaj moj program ne deluje?"\n- "Kaj je narobe s to kodo?"\n- "Kako popravim to napako?"\n\n## Postopek razhroscevanja\n1. **Preberi napako** - kaj racunalnik pravi, da je narobe?\n2. **Poisci vzrok** - kje v kodi je tezava?\n3. **Vprasaj AI** - kopiraj kodo in napako\n4. **Razumi popravek** - ne samo kopiraj, razumi!\n5. **Testiraj** - preveri, ali zdaj deluje\n\n## Vaja\nNamerno naredi napako v Scratch programu in jo poskusi popraviti z AI pomocjo.',
  'text', 25,
  '["razhroščevanje", "napake", "debugging", "testiranje"]'
FROM courses c WHERE c.slug = 'coding-with-ai'
ON CONFLICT (course_id, module_index, lesson_index) DO NOTHING;

-- Module 3: Ustvarjanje projektov (5 lessons)
INSERT INTO course_lessons (course_id, module_index, lesson_index, title, content, content_type, duration_minutes, key_concepts)
SELECT c.id, 2, 0,
  'Načrtovanje projekta',
  E'# Nacrtovanje projekta\n\nPreden zacnes programirati, moras nacrtovati! Najboljsi programerji vedno najprej razmislijo, potem pa pisejo kodo.\n\n## 4 koraki nacrtovanja\n1. **Ideja** - kaj zelis narediti?\n2. **Nacrt** - kako bo izgledalo? Narisi!\n3. **Koraki** - kaj moras narediti po vrsti?\n4. **Testiranje** - kako ves, da deluje?\n\n## Primer nacrtovanja igre\n**Ideja:** Igra, kjer lovimo sadje\n**Nacrt:**\n- Sadje padajo od zgoraj\n- Kosara se premika levo-desno\n- Tocke za vsak ujet sadez\n- 3 zivljenja\n\n**Koraki:**\n1. Narisi kosaro in sadje\n2. Sprogramiraj padanje\n3. Sprogramiraj lovljenje\n4. Dodaj tocke\n5. Dodaj zivljenja\n\n## Vaja\nNacrtuj svojo igro! Narisi, kako bo izgledala, in napisi korake.',
  'text', 20,
  '["načrtovanje", "koraki", "ideja", "testiranje"]'
FROM courses c WHERE c.slug = 'coding-with-ai'
ON CONFLICT (course_id, module_index, lesson_index) DO NOTHING;

INSERT INTO course_lessons (course_id, module_index, lesson_index, title, content, content_type, duration_minutes, key_concepts)
SELECT c.id, 2, 1,
  'Naredimo igro - 1. del',
  E'# Naredimo igro - 1. del\n\nDanes zacnemo graditi pravo igro v Scratchu! Naredili bomo igro **Lovi sadje**.\n\n## Korak 1: Priprava\n- Odpri Scratch\n- Izbrisi macko\n- Dodaj ozadje (npr. modro nebo)\n\n## Korak 2: Kosara\n- Narisi kosaro (ali jo najdi v knjiznici)\n- Dodaj kodo za premikanje:\n```\nza vedno\n  ce <tipka puscica desno pritisnjena?> potem\n    spremeni x za 10\n  konec\n  ce <tipka puscica levo pritisnjena?> potem\n    spremeni x za -10\n  konec\nkonec\n```\n\n## Korak 3: Sadje\n- Narisi jabolko\n- Dodaj kodo za padanje:\n```\nko kliknes zeleno zastavo\nza vedno\n  pojdi na x: (nakljucno od -200 do 200) y: 180\n  drsi se v 3 sekundah na x: (x pozicija) y: -180\nkonec\n```\n\n## Domaca naloga\nDodaj se eno vrsto sadja (npr. banano)!',
  'text', 30,
  '["igra", "Scratch projekt", "premikanje", "padanje"]'
FROM courses c WHERE c.slug = 'coding-with-ai'
ON CONFLICT (course_id, module_index, lesson_index) DO NOTHING;

INSERT INTO course_lessons (course_id, module_index, lesson_index, title, content, content_type, duration_minutes, key_concepts)
SELECT c.id, 2, 2,
  'Naredimo igro - 2. del',
  E'# Naredimo igro - 2. del\n\nNadaljujemo z naso igro Lovi sadje! Danes dodamo tocke in zivljenja.\n\n## Korak 4: Tocke\n- Ustvari spremenljivko "tocke"\n- Ko se sadez dotakne kosare:\n```\nce <dotikam se kosara?> potem\n  spremeni tocke za 1\n  predvajaj zvok pop\n  pojdi na x: (nakljucno) y: 180\nkonec\n```\n\n## Korak 5: Zivljenja\n- Ustvari spremenljivko "zivljenja" (zacni s 3)\n- Ko sadez pade na tla:\n```\nce <y pozicija < -170> potem\n  spremeni zivljenja za -1\n  pojdi na x: (nakljucno) y: 180\nkonec\n```\n\n## Korak 6: Konec igre\n```\nce <zivljenja = 0> potem\n  reci "Konec igre! Tvoje tocke: " & tocke\n  ustavi vse\nkonec\n```\n\n## Izziv\nDodaj tezavnostne stopnje - sadje padajo hitreje ko zberes vec tock!',
  'text', 30,
  '["točke", "življenja", "konec igre", "dotik"]'
FROM courses c WHERE c.slug = 'coding-with-ai'
ON CONFLICT (course_id, module_index, lesson_index) DO NOTHING;

INSERT INTO course_lessons (course_id, module_index, lesson_index, title, content, content_type, duration_minutes, key_concepts)
SELECT c.id, 2, 3,
  'Uvod v Python',
  E'# Uvod v Python\n\nPython je eden najpopularnejsih programskih jezikov na svetu. Je preprost, eleganten in odlicen za zacetnike!\n\n## Zakaj Python?\n- Najpopularnejsi jezik za AI in podatkovno znanost\n- Preprost za branje in pisanje\n- Ogromna skupnost in veliko virov za ucenje\n- Uporaben za igre, spletne strani, znanost...\n\n## Tvoj prvi Python program\n```python\nprint("Pozdravljen, svet!")\n```\n\n## Spremenljivke v Pythonu\n```python\nime = "Ana"\nstarost = 10\nprint("Moje ime je " + ime)\nprint("Star/a sem " + str(starost) + " let")\n```\n\n## Pogoji v Pythonu\n```python\nstarost = 10\nif starost >= 10:\n    print("Lahko gres na vlakec smrti!")\nelse:\n    print("Se eno leto pocakaj.")\n```\n\n## Vaja\nNapisi Python program, ki vprase za tvoje ime in te pozdravi!',
  'text', 25,
  '["Python", "print", "spremenljivke", "pogoji"]'
FROM courses c WHERE c.slug = 'coding-with-ai'
ON CONFLICT (course_id, module_index, lesson_index) DO NOTHING;

INSERT INTO course_lessons (course_id, module_index, lesson_index, title, content, content_type, duration_minutes, key_concepts)
SELECT c.id, 2, 4,
  'Python in AI - tvoj prvi AI program',
  E'# Python in AI - tvoj prvi AI program\n\nZdaj ko poznas osnove Pythona, lahko naredimo tvoj prvi AI program!\n\n## Preprost AI chatbot\n```python\nodgovori = {\n    "kako si": "Jaz sem AI, vedno sem super!",\n    "kaj znas": "Znam odgovarjati na vprasanja!",\n    "koliko je 2+2": "To je 4!",\n    "adijo": "Nasvidenje! Lep dan ti zelim!"\n}\n\nprint("Pozdravljeni! Sem preprost chatbot.")\nwhile True:\n    vprasanje = input("Ti: ").lower()\n    if vprasanje == "adijo":\n        print("Bot: Nasvidenje!")\n        break\n    elif vprasanje in odgovori:\n        print("Bot:", odgovori[vprasanje])\n    else:\n        print("Bot: Hmm, tega ne razumem. Poskusi kaj drugega!")\n```\n\n## Kako to deluje?\n1. Imamo **slovar** odgovorov\n2. Uporabnik vnese vprasanje\n3. Program poisce odgovor v slovarju\n4. Ce ga ne najde, rece da ne razume\n\n## To je osnova AI chatbotov!\nPravi chatboti (kot ChatGPT) delujejo na istem principu, ampak s tisoci primeri in nevronskimi mrezami.\n\n## Zakljucni projekt\nDodaj svojemu chatbotu se 10 novih vprasanj in odgovorov na temo, ki te zanima!',
  'text', 30,
  '["chatbot", "slovar", "vnos", "Python AI"]'
FROM courses c WHERE c.slug = 'coding-with-ai'
ON CONFLICT (course_id, module_index, lesson_index) DO NOTHING;

-- Module 4: Napredne teme (5 lessons)
INSERT INTO course_lessons (course_id, module_index, lesson_index, title, content, content_type, duration_minutes, key_concepts)
SELECT c.id, 3, 0,
  'Funkcije - lastni ukazi',
  E'# Funkcije - lastni ukazi\n\nFunkcije so kot tvoji lastni ukazi. Namesto da vsako stvar pisemo znova in znova, jo zapakiramo v funkcijo!\n\n## Primer brez funkcije\n```python\nprint("*****")\nprint("Pozdravljen Ana!")\nprint("*****")\nprint("*****")\nprint("Pozdravljen Mark!")\nprint("*****")\n```\n\n## Primer s funkcijo\n```python\ndef pozdravi(ime):\n    print("*****")\n    print("Pozdravljen " + ime + "!")\n    print("*****")\n\npozdravi("Ana")\npozdravi("Mark")\npozdravi("Luka")\n```\n\nVidel? Veliko krajse in preglednejse!\n\n## Funkcije vracajo rezultate\n```python\ndef sestej(a, b):\n    return a + b\n\nrezultat = sestej(5, 3)\nprint(rezultat)  # 8\n```\n\n## Vaja\nNapisi funkcijo ki izracuna povprecje treh stevil!',
  'text', 25,
  '["funkcije", "parametri", "return", "ponovna uporaba"]'
FROM courses c WHERE c.slug = 'coding-with-ai'
ON CONFLICT (course_id, module_index, lesson_index) DO NOTHING;

INSERT INTO course_lessons (course_id, module_index, lesson_index, title, content, content_type, duration_minutes, key_concepts)
SELECT c.id, 3, 1,
  'Seznami in podatki',
  E'# Seznami in podatki\n\nSeznami (lists) so nacin za shranjevanje vec podatkov skupaj. Kot nakupovalni seznam!\n\n## Ustvarjanje seznama\n```python\nsadja = ["jabolko", "banana", "cesnja", "kivi"]\nocene = [5, 4, 5, 3, 5, 4]\n```\n\n## Delo s seznami\n```python\n# Dodaj element\nsadja.append("ananas")\n\n# Dolzina seznama\nprint(len(sadja))  # 5\n\n## Zanka cez seznam\nfor sadje in sadja:\n    print("Rad imam " + sadje)\n```\n\n## AI in podatki\nAI se uci iz podatkov. Vec podatkov ima, boljse se nauci!\n\nPredstavljaj si, da uces AI prepoznavati sadje:\n- 100 slik jabolk\n- 100 slik banan\n- 100 slik cesanj\n\nAI pogleda vse slike in se nauci razlik med njimi.\n\n## Vaja\nNaredi seznam svojih 5 najljubsih filmov in napisi program, ki nakljucno izbere film za vecerni ogled!',
  'text', 25,
  '["seznami", "podatki", "for zanka", "append"]'
FROM courses c WHERE c.slug = 'coding-with-ai'
ON CONFLICT (course_id, module_index, lesson_index) DO NOTHING;

INSERT INTO course_lessons (course_id, module_index, lesson_index, title, content, content_type, duration_minutes, key_concepts)
SELECT c.id, 3, 2,
  'Spletne strani z AI',
  E'# Spletne strani z AI\n\nHTML in CSS sta jezika za izdelavo spletnih strani. Z AI pomocjo jih lahko naredis super hitro!\n\n## HTML - struktura\nHTML doloca, KAJ je na strani:\n```html\n<h1>Moja spletna stran</h1>\n<p>Pozdravljen, svet!</p>\n<img src="slika.jpg">\n<button>Klikni me</button>\n```\n\n## CSS - izgled\nCSS doloca, KAKO izgleda:\n```css\nh1 {\n  color: blue;\n  font-size: 24px;\n}\nbutton {\n  background: green;\n  color: white;\n  padding: 10px;\n}\n```\n\n## AI pomaga pri spletnih straneh\nLahko AI vprasas:\n- "Naredi mi HTML za predstavitev o dinozavrih"\n- "Dodaj lep CSS design z modrimi barvami"\n- "Naredi navigacijski meni"\n\n## Vaja\nS pomocjo AI naredi preprosto spletno stran o svoji najljubsi zivali!',
  'text', 30,
  '["HTML", "CSS", "spletne strani", "design"]'
FROM courses c WHERE c.slug = 'coding-with-ai'
ON CONFLICT (course_id, module_index, lesson_index) DO NOTHING;

INSERT INTO course_lessons (course_id, module_index, lesson_index, title, content, content_type, duration_minutes, key_concepts)
SELECT c.id, 3, 3,
  'Igre z AI logiko',
  E'# Igre z AI logiko\n\nNaredi igro, kjer racunalniski nasprotnik uporablja preprosto AI logiko!\n\n## Kamen, skarje, papir z AI\n```python\nimport random\n\nmoznosti = ["kamen", "skarje", "papir"]\n\nwhile True:\n    igralec = input("Izberi (kamen/skarje/papir): ").lower()\n    if igralec == "konec":\n        break\n    \n    ai = random.choice(moznosti)\n    print("AI je izbral: " + ai)\n    \n    if igralec == ai:\n        print("Izenaceno!")\n    elif (igralec == "kamen" and ai == "skarje") or \\\n         (igralec == "skarje" and ai == "papir") or \\\n         (igralec == "papir" and ai == "kamen"):\n        print("Zmagal si!")\n    else:\n        print("AI je zmagal!")\n```\n\n## Pametnejsa AI\nLahko naredimo AI pametnejso - naj si zapomni, kaj pogosto izbiras, in se prilagodi!\n\n## Izziv\nDodaj stevec zmag in porazov ter prikazi rezultat na koncu!',
  'text', 30,
  '["igre", "AI logika", "naključnost", "strategija"]'
FROM courses c WHERE c.slug = 'coding-with-ai'
ON CONFLICT (course_id, module_index, lesson_index) DO NOTHING;

INSERT INTO course_lessons (course_id, module_index, lesson_index, title, content, content_type, duration_minutes, key_concepts)
SELECT c.id, 3, 4,
  'Zaključni projekt - moj AI program',
  E'# Zakljucni projekt - moj AI program\n\nCas je za tvoj zakljucni projekt! Uporabi vse, kar si se naucil, in naredi nekaj svojega.\n\n## Ideje za projekte\n1. **AI kviz** - program, ki sprasi vprasanja in preverja odgovore\n2. **Priporocilni sistem** - vprasaj uporabnika, kaj ima rad, in mu priporoci film/knjigo\n3. **Preprosta igra z AI** - igra, kjer racunalnik igra proti tebi\n4. **Zgodba generator** - AI, ki ustvari nakljucne zgodbe\n5. **Kalkulator za domaco nalogo** - pomaga pri matematiki\n\n## Koraki za projekt\n1. Izberi idejo\n2. Nacrtuj na papirju\n3. Napisi kodo po korakih\n4. Testiraj in popravi napake\n5. Pokazi prijateljem in druzini!\n\n## Predstavitev\nPripravi kratko predstavitev:\n- Kaj program dela?\n- Kako si ga naredil?\n- Kaj si se naucil?\n- Kaj bi se izboljsal?\n\nCestitke, zdaj si pravi mladi programer! Nadaljuj z ucenjem in ustvarjanjem!',
  'text', 30,
  '["projekt", "načrtovanje", "predstavitev", "kreativnost"]'
FROM courses c WHERE c.slug = 'coding-with-ai'
ON CONFLICT (course_id, module_index, lesson_index) DO NOTHING;
