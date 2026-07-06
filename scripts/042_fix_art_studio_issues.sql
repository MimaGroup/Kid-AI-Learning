-- Fix AI umetniški studio issues:
-- 1. Remove duplicate lesson 10 if exists (module_index 3, lesson_index 1)
-- 2. Fix key_concepts format (use "name" instead of "term")
-- 3. Update lessons_count in courses table

-- First, delete any duplicate lesson in module 4 (should only have 1 lesson)
DELETE FROM course_lessons
WHERE course_id = (SELECT id FROM courses WHERE slug = 'ai-art-studio')
  AND module_index = 3
  AND lesson_index > 0;

-- Update the courses table lessons_count to 9 (correct count)
UPDATE courses
SET lessons_count = 9,
    updated_at = NOW()
WHERE slug = 'ai-art-studio';

-- Fix key_concepts format for all AI Art Studio lessons
-- The UI expects { "name": "...", "explanation": "..." } not { "term": "...", "definition": "..." }

-- LESSON 1: Kaj je AI umetnost?
UPDATE course_lessons
SET key_concepts = '[
  {"name": "AI umetnost", "explanation": "AI umetnost = tvoja ideja + računalnikova pomoč. Skupaj ustvarita nekaj čarobnega, kar še ni obstajalo! 🎨🚀"},
  {"name": "Generativna umetnost", "explanation": "Generativna umetnost = umetnost, ki jo ustvari računalnik s pomočjo pravil in navodil. Ti določiš smer — računalnik pa ustvari čarobno! 🚀🎨"},
  {"name": "DALL·E", "explanation": "DALL·E = čarobni AI umetnik, ki pretvori tvoje besede v slike! Bolj natančen kot si pri opisu, lepša bo slika! 🎨🚀"},
  {"name": "Kreativnost", "explanation": "Kreativnost je tvoje najmočnejše orodje — bolj posebno kot katerikoli računalnik! AI ti pomaga uresničiti ideje, toda umetnik/ca si vedno TI! 🎨🚀"}
]'::jsonb,
    updated_at = NOW()
WHERE title = 'Kaj je AI umetnost?'
  AND course_id = (SELECT id FROM courses WHERE slug = 'ai-art-studio');

-- LESSON 2: Pisanje promptov za slike
UPDATE course_lessons
SET key_concepts = '[
  {"name": "Prompt", "explanation": "Prompt je kot recept. Pomisli na peko peciva. Če imaš dober recept, bo pecivo okusno in lepo. Prompt je torej tvoje navodilo računalniku. Bolj natančno kot mu opišeš svojo idejo, lepšo sliko bo ustvaril za tebe. 🎨"},
  {"name": "Opis", "explanation": "Opis je, ko z besedami poveš, kako nekaj izgleda. 📝 Zapri oči in pomisli na svojo najljubšo žival. Zdaj pa jo opiši — povej, kakšne barve je, kako je velika, kaj počne. To, kar si ravnokar naredil, je opis!"},
  {"name": "Ključne besede", "explanation": "Ključne besede so najpomembnejše besede v tvojem promptu — tiste, ki računalniku povejo, kaj je na sliki najbolj pomembno! 🗝️"},
  {"name": "Specifičnost", "explanation": "Specifičnost pomeni, da je nekaj posebno in drugačno od drugih stvari. Na primer, če imamo veliko slik, ki prikazujejo različne živali, potem je posebej zanimiva tista slika, ki prikazuje rdečo pando, ker je to žival, ki jo srečamo redko."}
]'::jsonb,
    updated_at = NOW()
WHERE title = 'Pisanje promptov za slike'
  AND course_id = (SELECT id FROM courses WHERE slug = 'ai-art-studio');

-- LESSON 3: Moja prva AI slika
UPDATE course_lessons
SET key_concepts = '[
  {"name": "Generiranje slik", "explanation": "Generiranje slik = ti napišeš prompt + računalnik ustvari sliko. Skupaj lahko ustvarita prave umetnine! ✨"},
  {"name": "Iteracija", "explanation": "Iteracija = poskusi + poglej + izboljšaj + ponovi! Bolj kot iteriraš, boljše slike boš ustvarjal/a! 🚀"},
  {"name": "Eksperimentiranje", "explanation": "Eksperimentiranje = poskusi + opazuj + izboljšaj! Več kot eksperimentiraš, bolj čudovite slike boš ustvarjal/a! 🚀"},
  {"name": "Shranjevanje", "explanation": "Shranjevanje = tvoje delo je varno in dostopno kadarkoli! Ne pozabi shraniti svoje slike, ko si z njo zadovoljen/na! 💾✨"}
]'::jsonb,
    updated_at = NOW()
WHERE title = 'Moja prva AI slika'
  AND course_id = (SELECT id FROM courses WHERE slug = 'ai-art-studio');

-- LESSON 4: Umetnostni slogi skozi zgodovino
UPDATE course_lessons
SET key_concepts = '[
  {"name": "Umetnostna zgodovina", "explanation": "Umetnostna zgodovina je zgodba o umetnosti skozi čas. Poznavanje različnih slogov ti pomaga, da računalniku natančno poveš, kakšno sliko želiš ustvariti! 🎨"},
  {"name": "Impresionizem", "explanation": "Impresionizem je slog z mehkimi potezami in svetlimi barvami, ki ujame lepoto trenutka v naravi. Popoln slog za čarobne in nežne slike! 🌸"},
  {"name": "Kubizem", "explanation": "Kubizem je slog, kjer so stvari narisane iz geometrijskih oblik in prikazane iz več strani hkrati. Ustvarja nenavadne, domišljijske slike! 🚀"},
  {"name": "Pop art", "explanation": "Pop art je veseli, pisani slog, ki navdih jemlje iz vsakdanjega življenja. Žive barve in ponavljajoči se vzorci naredijo vsako sliko zabavno in energično! 🎉"}
]'::jsonb,
    updated_at = NOW()
WHERE title = 'Umetnostni slogi skozi zgodovino'
  AND course_id = (SELECT id FROM courses WHERE slug = 'ai-art-studio');

-- LESSON 5: Napredne tehnike generiranja
UPDATE course_lessons
SET key_concepts = '[
  {"name": "Negativni prompt", "explanation": "Negativni prompt = povej računalniku, česa ne želiš. Tako bo slika še bolj točno takšna, kot si jo zamislil/a! 🎨🚀"},
  {"name": "Mešanje slogov", "explanation": "Mešanje slogov = dva sloga + ena edinstvena slika! Poskusi različne kombinacije in ustvari svoj popolnoma nov slog! 🚀🏆"},
  {"name": "Perspektiva", "explanation": "Perspektiva = zorni kot, od koder gledaš. Spremeni perspektivo in ista stvar bo videti popolnoma drugače — kot da jo vidiš prvič! 🚀🎨"},
  {"name": "Osvetlitev", "explanation": "Osvetlitev = svetloba, ki dá sliki posebno vzdušje. Prava osvetlitev spremeni vsako sliko v pravo umetnino! 🎨🚀"}
]'::jsonb,
    updated_at = NOW()
WHERE title = 'Napredne tehnike generiranja'
  AND course_id = (SELECT id FROM courses WHERE slug = 'ai-art-studio');

-- LESSON 6: Zgodbe s slikami
UPDATE course_lessons
SET key_concepts = '[
  {"name": "Slikanica", "explanation": "Slikanica = tvoja zgodba + tvoje slike. Z AI lahko postaneš pravi/a pisatelj/ica in umetnik/ca hkrati! 🎨📖"},
  {"name": "Zgodba", "explanation": "Zgodba = domišljija + pustolovščina + novi prijatelji. Vzemi svojo škatlo barvic in začni ustvarjati svojo lastno zgodbo! 🎨📖"},
  {"name": "Doslednost", "explanation": "Doslednost = vsakič enako! Pri AI slikanici pomeni, da tvoj junak na vsaki sliki izgleda enako — tako ga bralci vedno prepoznajo! 🎨🚀"},
  {"name": "Liki", "explanation": "Liki so junaki tvoje zgodbe. Bolj natančno kot jih opišeš v promptu, bolj dosledni bodo na vsaki sliki! 🎨🚀"}
]'::jsonb,
    updated_at = NOW()
WHERE title = 'Zgodbe s slikami'
  AND course_id = (SELECT id FROM courses WHERE slug = 'ai-art-studio');

-- LESSON 7: Kako AI ustvarja glasbo
UPDATE course_lessons
SET key_concepts = '[
  {"name": "AI glasba", "explanation": "AI glasba = glasba, ki jo ustvari računalnik! Uči se iz tisoče pesmi in ustvari svojo — popolnoma novo in edinstveno! 🎵🚀"},
  {"name": "Melodija", "explanation": "Melodija je tisti čarobni del glasbe, ki se ti zapije v glavo. Ko se naučiš ustvarjati melodije, boš ustvaril/a glasbo, ki bo popolnoma tvoja! 🎵🚀"},
  {"name": "Ritem", "explanation": "Ritem je srce glasbe — brez njega glasba ne bi živela! Ko razumeš ritem, lahko ustvariš glasbo, ki bo zabavna, energična in popolnoma tvoja! 🎵🚀"},
  {"name": "Harmonija", "explanation": "Harmonija je kombinacija not, ki skupaj zvenijo lepo in prijetno. Je kot ekipa not, ki skupaj ustvarjajo čudovite zvoke! 🎹✨"}
]'::jsonb,
    updated_at = NOW()
WHERE title = 'Kako AI ustvarja glasbo'
  AND course_id = (SELECT id FROM courses WHERE slug = 'ai-art-studio');

-- LESSON 8: Zvočna pokrajina
UPDATE course_lessons
SET key_concepts = '[
  {"name": "Zvočna pokrajina", "explanation": "Zvočna pokrajina je zbirka zvokov, ki skupaj ustvarijo posebno atmosfero — kot da bi zaprl/a oči in se preselil/a v drug svet! 🌍✨"},
  {"name": "Sinestezija", "explanation": "Sinestezija je čarobna sposobnost, ko en čut sproži drugega — na primer, ko slišiš barve ali vidiš glasbo! AI ti pomaga izkusiti to čarovnijo! 🎨🎵"},
  {"name": "Multimedija", "explanation": "Multimedija = slike + zvoki + glasba = popolna zgodba! Ko združiš več medijev, tvoja zgodba oživi! 🎬✨"},
  {"name": "Atmosfera", "explanation": "Atmosfera je vzdušje, ki ga čutiš. S pravimi zvoki lahko ustvariš katerokoli atmosfero — veselo, skrivnostno, mirno ali napeto! 🌟"}
]'::jsonb,
    updated_at = NOW()
WHERE title = 'Zvočna pokrajina'
  AND course_id = (SELECT id FROM courses WHERE slug = 'ai-art-studio');

-- LESSON 9: Zaključna razstava - moj AI portfolio
UPDATE course_lessons
SET key_concepts = '[
  {"name": "Portfolio", "explanation": "Portfolio je zbirka tvojih najboljših del. Kot galerija, ki pokaže, kaj vse znaš in zmoreš ustvariti! 🖼️✨"},
  {"name": "Razstava", "explanation": "Razstava je prostor, kjer drugi lahko občudujejo tvojo umetnost. Tvoja mini galerija, kjer sijejo tvoje najboljše stvaritve! 🎨🏆"},
  {"name": "Predstavitev", "explanation": "Predstavitev je, ko poveš zgodbo za svojim delom — zakaj si ga ustvaril/a, kaj pomeni zate in kaj si se naučil/a! 🎤✨"},
  {"name": "Kreativnost", "explanation": "Kreativnost je tvoja supermoč! Skozi ta tečaj si dokazal/a, da lahko s pomočjo AI ustvariš neverjetne stvari. Ti si umetnik/ca! 🚀🎨"}
]'::jsonb,
    updated_at = NOW()
WHERE title = 'Zaključna razstava - moj AI portfolio'
  AND course_id = (SELECT id FROM courses WHERE slug = 'ai-art-studio');

-- Also update the curriculum in courses table to reflect 9 lessons in 4 modules
UPDATE courses
SET curriculum = '[
  {"module": "Uvod v AI umetnost", "lessons": ["Kaj je AI umetnost?", "Pisanje promptov za slike", "Umetnostni slogi skozi zgodovino"]},
  {"module": "Generiranje slik", "lessons": ["Moja prva AI slika", "Zgodbe s slikami", "Napredne tehnike generiranja"]},
  {"module": "Glasba in AI", "lessons": ["Kako AI ustvarja glasbo", "Zvočna pokrajina"]},
  {"module": "Moj AI portfolio", "lessons": ["Zaključna razstava - moj AI portfolio"]}
]'::jsonb,
    updated_at = NOW()
WHERE slug = 'ai-art-studio';
