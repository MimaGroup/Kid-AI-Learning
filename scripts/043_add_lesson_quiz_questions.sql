-- Add quiz_questions column to course_lessons table
-- This stores lesson-specific quiz questions as fallback when AI generation fails

ALTER TABLE course_lessons 
ADD COLUMN IF NOT EXISTS quiz_questions JSONB DEFAULT '[]'::jsonb;

COMMENT ON COLUMN course_lessons.quiz_questions IS 'Lesson-specific quiz questions in JSON format';

-- Update AI umetniski studio course lessons with lesson-specific quiz questions

-- Lesson 1: Kaj je AI umetnost?
UPDATE course_lessons SET quiz_questions = '[
  {
    "question": "Kaj je AI umetnost?",
    "options": ["Umetnost, ki jo ustvari samo clovek", "Umetnost, ki jo ustvari racunalnik s pomocjo umetne inteligence", "Umetnost, ki jo najdemo samo v muzejih", "Umetnost, ki obstaja samo na papirju"],
    "correct": 1,
    "explanation": "AI umetnost je umetnost, ki jo ustvari racunalnik s pomocjo umetne inteligence - program se uci iz tisocih slik in nato ustvarja nove!"
  },
  {
    "question": "Kako AI ustvarja slike?",
    "options": ["Tako da kopira obstojece slike", "Tako da se uci iz velikega stevila slik in ustvarja nove vzorce", "Tako da fotokopira umetnine", "AI ne more ustvarjati slik"],
    "correct": 1,
    "explanation": "AI se uci iz tisocih slik - opazuje barve, oblike in vzorce, nato pa ustvarja povsem nove slike!"
  },
  {
    "question": "Kdo je umetnik pri AI umetnosti?",
    "options": ["Samo racunalnik", "Samo clovek", "Clovek in racunalnik skupaj", "Nihce"],
    "correct": 2,
    "explanation": "Pri AI umetnosti sodelujeta clovek in racunalnik - clovek da idejo in navodila, AI pa pomaga ustvariti koncno delo!"
  },
  {
    "question": "Kaj potrebuje AI, da ustvari sliko?",
    "options": ["Copice in barve", "Besedni opis ali prompt", "Fotoaparat", "Skeniranje"],
    "correct": 1,
    "explanation": "AI potrebuje besedni opis - temu recemo prompt. Na primer: macka na luni pomeni, da AI ustvari sliko macke na luni!"
  }
]'::jsonb
WHERE title = 'Kaj je AI umetnost?';

-- Lesson 2: Pisanje promptov za slike
UPDATE course_lessons SET quiz_questions = '[
  {
    "question": "Kaj je prompt?",
    "options": ["Vrsta slike", "Besedni opis, ki pove AI, kaj naj ustvari", "Ime za AI program", "Posebna barva"],
    "correct": 1,
    "explanation": "Prompt je besedni opis ali navodilo, ki pove AI, kaj naj ustvari. Boljsi kot je prompt, boljsa bo slika!"
  },
  {
    "question": "Kateri prompt bo ustvaril boljso sliko?",
    "options": ["Macka", "Puhasta oranzna macka spi na modri blazini v soncnem prostoru", "Zival", "Nekaj lepega"],
    "correct": 1,
    "explanation": "Podroben prompt z barvami, teksturami in okoljem pomaga AI ustvariti natancnejso sliko, ki si jo predstavljas!"
  },
  {
    "question": "Kaj je dobro vkljuciti v prompt?",
    "options": ["Samo eno besedo", "Barve, velikost, okolje in razpolozenje", "Samo ime zivali", "Nicesar posebnega"],
    "correct": 1,
    "explanation": "Dober prompt vkljucuje barve, velikost, okolje in razpolozenje - tako AI tocno ve, kaj si zelis!"
  },
  {
    "question": "Ce zelis veselo sliko, kaj dodas v prompt?",
    "options": ["Temne barve", "Svetle barve, nasmehe, sonce", "Crno-belo", "Nicesar"],
    "correct": 1,
    "explanation": "Za veselo sliko dodaj svetle barve, nasmehe in sonce - razpolozenje je pomemben del prompta!"
  }
]'::jsonb
WHERE title = 'Pisanje promptov za slike';

-- Lesson 3: Moja prva AI slika
UPDATE course_lessons SET quiz_questions = '[
  {
    "question": "Kaj je prvi korak pri ustvarjanju AI slike?",
    "options": ["Takoj kliknemo Generiraj", "Najprej si zamislimo, kaj zelimo ustvariti", "Izberemo nakljucne barve", "Prepisemo tuj prompt"],
    "correct": 1,
    "explanation": "Prvi korak je, da si zamislimo, kaj zelimo ustvariti - dobra ideja je temelj za odlicno AI sliko!"
  },
  {
    "question": "Kaj naredimo, ce nam prva slika ni vsec?",
    "options": ["Obupamo", "Spremenimo prompt in poskusimo znova", "Nikoli ne spreminjamo", "Zbrisemo vse"],
    "correct": 1,
    "explanation": "Ce nam slika ni vsec, spremenimo prompt - dodamo vec podrobnosti ali spremenimo besede. Poskusanje je del zabave!"
  },
  {
    "question": "Zakaj je pomembno shraniti svoje AI slike?",
    "options": ["Ni pomembno", "Da lahko vidimo svoj napredek in delimo z drugimi", "Samo zato, ker moramo", "Da jih zbrisemo kasneje"],
    "correct": 1,
    "explanation": "Shranjevanje slik ti omogoca, da vidis svoj napredek, delis z druzino in prijatelji ter gradis svoj portfolio!"
  },
  {
    "question": "Kaj je iteracija pri ustvarjanju AI slik?",
    "options": ["Vrsta slike", "Postopek izboljsevanja slike z vec poskusi", "Ime za AI orodje", "Koncna slika"],
    "correct": 1,
    "explanation": "Iteracija pomeni, da sliko izboljsujemo z vec poskusi - vsak nov prompt nas pribliza zeleni sliki!"
  }
]'::jsonb
WHERE title = 'Moja prva AI slika';

-- Lesson 4: Umetnostni slogi skozi zgodovino
UPDATE course_lessons SET quiz_questions = '[
  {
    "question": "Kaj je impresionizem?",
    "options": ["Umetnostni slog z ostrimi linijami", "Umetnostni slog z mehkimi potezami in igro svetlobe", "Samo crno-bela umetnost", "Sodobna digitalna umetnost"],
    "correct": 1,
    "explanation": "Impresionizem uporablja mehke poteze in cudovito igro svetlobe - kot da bi ujeli trenutek v casu!"
  },
  {
    "question": "Kdo je bil znan po zvezdni noci in mocnih barvah?",
    "options": ["Pablo Picasso", "Claude Monet", "Vincent van Gogh", "Leonardo da Vinci"],
    "correct": 2,
    "explanation": "Vincent van Gogh je znan po Zvezdni noci in svojih mocnih, vrtincih barvah!"
  },
  {
    "question": "Kako lahko v promptu zahtevamo dolocen umetnostni slog?",
    "options": ["Ne moremo", "Dodamo v slogu impresionizma ali v slogu Van Gogha", "Samo z barvami", "Z risanjem"],
    "correct": 1,
    "explanation": "V prompt dodamo v slogu impresionizma ali v slogu Van Gogha - tako AI ustvari sliko v zeleni tehniki!"
  },
  {
    "question": "Kaj je znacilno za kubizem?",
    "options": ["Okrogle oblike", "Geometrijske oblike in vec zornih kotov hkrati", "Samo pokrajine", "Fotografski realizem"],
    "correct": 1,
    "explanation": "Kubizem uporablja geometrijske oblike in prikaze vec zornih kotov hkrati - kot da vidis objekt z vseh strani!"
  }
]'::jsonb
WHERE title LIKE 'Umetnostni slogi%' OR title LIKE 'Umetniški slogi%';

-- Lesson 5: Napredne tehnike generiranja
UPDATE course_lessons SET quiz_questions = '[
  {
    "question": "Kaj je negativni prompt?",
    "options": ["Slabi prompt", "Navodilo, kaj naj AI NE vkljuci v sliko", "Crno-beli prompt", "Prompt brez besed"],
    "correct": 1,
    "explanation": "Negativni prompt pove AI, cesa naj NE vkljuci - na primer brez besedila ali brez ljudi!"
  },
  {
    "question": "Kaj pomeni visja locljivost slike?",
    "options": ["Manjsa slika", "Vecja in ostrejsa slika z vec podrobnostmi", "Hitrejse ustvarjanje", "Manj barv"],
    "correct": 1,
    "explanation": "Visja locljivost pomeni vec pik, kar naredi sliko vecjo in ostrejso z vec podrobnostmi!"
  },
  {
    "question": "Kaj je img2img tehnika?",
    "options": ["Ustvarjanje slike iz bese", "Spreminjanje obstojece slike z AI", "Kopiranje slik", "Brisanje slik"],
    "correct": 1,
    "explanation": "Img2img pomeni, da AI vzame obstojeco sliko in jo spremeni glede na tvoje navodila!"
  },
  {
    "question": "Kako dobimo bolj unikatne rezultate?",
    "options": ["Vedno uporabljamo iste promte", "Kombiniramo razlicne sloge in eksperimentiramo", "Nikoli ne spreminjamo nastavitev", "Kopiramo druge"],
    "correct": 1,
    "explanation": "Unikatne rezultate dobimo z eksperimentiranjem - kombiniramo razlicne sloge, barve in ideje!"
  }
]'::jsonb
WHERE title LIKE 'Napredne tehnike%';

-- Lesson 6: Zgodbe s slikami
UPDATE course_lessons SET quiz_questions = '[
  {
    "question": "Kaj je vizualno pripovedovanje zgodb?",
    "options": ["Samo branje knjig", "Pripovedovanje zgodbe s pomocjo slik", "Risanje brez pomena", "Samo pisanje"],
    "correct": 1,
    "explanation": "Vizualno pripovedovanje je umetnost pripovedovanja zgodb s pomocjo slik - vsaka slika pove del zgodbe!"
  },
  {
    "question": "Koliko slik potrebujemo za kratko AI zgodbo?",
    "options": ["Samo eno", "3-5 slik za zacetek, sredino in konec", "100 slik", "Slik ne potrebujemo"],
    "correct": 1,
    "explanation": "Za kratko zgodbo potrebujemo 3-5 slik - zacetek, sredino in konec, tako kot prava zgodba!"
  },
  {
    "question": "Kaj je pomembno pri ustvarjanju serije slik za zgodbo?",
    "options": ["Da so vse popolnoma razlicne", "Da ohranimo iste like in slog skozi vse slike", "Da nimamo likov", "Da so nakljucne"],
    "correct": 1,
    "explanation": "Pomembno je, da ohranimo iste like in slog - tako gledalec prepozna, da gre za isto zgodbo!"
  },
  {
    "question": "Kako AI pomaga pri ustvarjanju slikanic?",
    "options": ["Ne pomaga", "Hitro ustvari ilustracije za naso zgodbo", "Samo pise besedilo", "Samo tiska knjige"],
    "correct": 1,
    "explanation": "AI hitro ustvari ilustracije za tvojo zgodbo - ti napises zgodbo, AI pa pomaga z vizualnim delom!"
  }
]'::jsonb
WHERE title LIKE 'Zgodbe s slikami%';

-- Lesson 7: Kako AI ustvarja glasbo
UPDATE course_lessons SET quiz_questions = '[
  {
    "question": "Kako AI ustvarja glasbo?",
    "options": ["Snema prave instrumente", "Uci se iz tisocih skladb in ustvarja nove melodije", "Kopira obstojece pesmi", "Ne more ustvarjati glasbe"],
    "correct": 1,
    "explanation": "AI se uci iz tisocih skladb - opazuje ritme, melodije in harmonije, nato ustvarja povsem nove pesmi!"
  },
  {
    "question": "Kaj je MIDI v glasbi?",
    "options": ["Vrsta instrumenta", "Digitalni zapis glasbe, ki ga razume racunalnik", "Ime za AI program", "Zvocnik"],
    "correct": 1,
    "explanation": "MIDI je digitalni zapis glasbe - kot note za racunalnik, ki jih lahko predvaja z razlicnimi zvoki!"
  },
  {
    "question": "Kaj lahko naredimo z AI-generirano glasbo?",
    "options": ["Nicesar", "Uporabimo jo v videih, igrah ali kot ozadje", "Samo poslusamo enkrat", "Moramo jo izbrisati"],
    "correct": 1,
    "explanation": "AI glasbo lahko uporabimo v videih, igrah, kot ozadje za ucenje ali samo za uzivanje!"
  },
  {
    "question": "Ali AI popolnoma nadomesti glasbenike?",
    "options": ["Da, popolnoma", "Ne, AI je orodje, ki pomaga glasbenikom", "Glasbeniki ne potrebujejo AI", "AI je boljsi od vseh glasbenikov"],
    "correct": 1,
    "explanation": "AI je orodje, ki pomaga glasbenikom - ljudje se vedno prinasajo ustvarjalnost, custva in edinstvene ideje!"
  }
]'::jsonb
WHERE title LIKE 'Kako AI ustvarja glasbo%';

-- Lesson 8: Zvocna pokrajina
UPDATE course_lessons SET quiz_questions = '[
  {
    "question": "Kaj je zvocna pokrajina?",
    "options": ["Slika pokrajine", "Zbirka zvokov, ki ustvarijo doloceno vzdusje", "Vrsta instrumenta", "Ime za AI program"],
    "correct": 1,
    "explanation": "Zvocna pokrajina je zbirka zvokov, ki skupaj ustvarijo doloceno vzdusje - kot zvoki gozda ali mesta!"
  },
  {
    "question": "Kje lahko uporabimo zvocne pokrajine?",
    "options": ["Nikjer", "V videih, igrah, za sprostitev ali ucenje", "Samo v kinu", "Samo na koncertih"],
    "correct": 1,
    "explanation": "Zvocne pokrajine uporabimo v videih, igrah, za sprostitev, meditacijo ali kot ozadje za ucenje!"
  },
  {
    "question": "Kaj je ambient glasba?",
    "options": ["Glasna rock glasba", "Umirjena glasba za vzdusje in ozadje", "Samo bobni", "Samo petje"],
    "correct": 1,
    "explanation": "Ambient glasba je umirjena glasba, ki ustvarja vzdusje - odlicna za sprostitev ali koncentracijo!"
  },
  {
    "question": "Kako AI pomaga pri ustvarjanju zvocnih pokrajin?",
    "options": ["Ne pomaga", "Kombinira razlicne zvoke in ustvarja nova vzdusja", "Samo predvaja obstojece posnetke", "Samo povecuje glasnost"],
    "correct": 1,
    "explanation": "AI kombinira razlicne zvoke - ptice, veter, vodo, glasbo - in ustvarja edinstvene zvocne pokrajine!"
  }
]'::jsonb
WHERE title LIKE 'Zvocna pokrajina%' OR title LIKE 'Zvočna pokrajina%';

-- Lesson 9: Zakljucna razstava - moj AI portfolio
UPDATE course_lessons SET quiz_questions = '[
  {
    "question": "Kaj je portfolio?",
    "options": ["Vrsta slike", "Zbirka tvojih najboljsih del", "Ime za AI program", "Racunalniska igra"],
    "correct": 1,
    "explanation": "Portfolio je zbirka tvojih najboljsih del - pokaze tvoj napredek in ustvarjalnost!"
  },
  {
    "question": "Zakaj je pomembno imeti AI umetniski portfolio?",
    "options": ["Ni pomembno", "Pokaze tvoj napredek in edinstveni slog", "Samo za ucitelje", "Samo za odrasle"],
    "correct": 1,
    "explanation": "Portfolio pokaze tvoj napredek, edinstveni slog in vse cudovite stvari, ki si jih ustvaril z AI!"
  },
  {
    "question": "Kaj vkljucimo v portfolio?",
    "options": ["Samo eno sliko", "Najboljsa dela, razlicne sloge in opis procesa", "Samo napake", "Nicesar posebnega"],
    "correct": 1,
    "explanation": "V portfolio vkljucimo najboljsa dela, razlicne sloge, eksperimente in opis, kako smo ustvarjali!"
  },
  {
    "question": "Kako lahko delimo svoj AI portfolio?",
    "options": ["Ne moremo ga deliti", "Z druzino, prijatelji, na spletu ali v soli", "Samo sami si ga ogledamo", "Ga moramo skriti"],
    "correct": 1,
    "explanation": "Portfolio lahko delimo z druzino, prijatelji, na spletu ali v soli - tako drugi vidijo tvojo ustvarjalnost!"
  }
]'::jsonb
WHERE title LIKE 'Zaključna razstava%' OR title LIKE 'Zakljucna razstava%';
