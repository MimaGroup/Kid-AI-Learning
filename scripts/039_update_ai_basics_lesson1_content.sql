-- Update Module 1, Lesson 0 ("Kaj sploh je umetna inteligenca?")
-- 1) Update lesson content to new text
-- 2) Update key_concepts to include predefined explanations

UPDATE course_lessons
SET content = E'**Kaj sploh je umetna inteligenca?**\nPredstavljaj si, da imaš pametnega pomočnika, ki se lahko uči novih stvari -- tako kot ti!\n\nUmetna inteligenca (ali krajše **AI**) je posebna vrsta računalniškega programa, ki se lahko uči iz podatkov in sprejema odločitve.\n\n---\n\n**Kako si lahko predstavljaš AI?**\nPomisli na svojega hišnega ljubljenčka. Ko ga naučiš novega trika:\n\nPokažeš mu, kaj naj naredi (to so **podatki**).\n\nPonavljaš vajo (to je **učenje**).\n\nKo se nauči, to naredi sam (to je **inteligenca**).\n\nAI deluje zelo podobno! Računalnik dobi veliko primerov, se iz njih uči in potem lahko sam rešuje podobne naloge.\n\n---\n\n**Primeri AI v tvojem življenju**\nAli si vedel, da AI že uporabljamo vsak dan?\n\n**Glasovni pomočniki** (kot Siri ali Google Assistant) -- razumejo tvoj glas.\n\n**Priporočila na YouTubu** -- AI ugane, kateri video ti bo všeč.\n\n**Filtri na fotografijah** -- AI prepozna tvoj obraz in doda smešne učinke.\n\n---\n\n**Pomembno si zapomni**\nAI ni živa. Ne razmišlja kot človek. Je zelo pameten program, ki sledi navodilom in se uči iz primerov.',
    key_concepts = '[
      {
        "name": "umetna inteligenca",
        "explanation": "AI razlaga: Umetna inteligenca\nSpremljaj me!\nUmetna inteligenca je velika in zanimiva iznajdba, s katero ustvarjamo računalnike in druge naprave, da lahko pomagajo ljudem.\nTo je podobno kot gradnja igrišča – tam se lahko igramo in zabavamo. Pri umetni inteligenci pa »gradimo« pametne računalnike, ki nam pomagajo pri različnih nalogah.\nRačunalnike lahko naučimo, da:\nnam pomagajo računati,\npoiščejo informacije,\nodkrivajo nova znanja,\nali rešujejo zahtevne probleme.\nUmetna inteligenca torej pomaga ljudem, da hitreje in lažje opravimo svoje delo."
      },
      {
        "name": "podatki",
        "explanation": "AI razlaga: Podatki\nPodatki so kot majhni koščki informacij, ki jih shranjujemo – podobno kot zaklade v svoji skrinji odkritij.\nNa primer: pametna ura ali športna zapestnica lahko meri, kako pogosto tečeš in kako hitro tečeš. To so podatki o tvojem gibanju.\nČe te hitrosti zapišemo in jih primerjamo, lahko ugotovimo, ali napreduješ, ali tečeš hitreje kot prej. S temi podatki lahko ustvarimo nove izzive ali izboljšamo svoj trening.\nUmetna inteligenca uporablja podatke, da se iz njih uči in nam pomaga na različne načine – na primer pri športu, učenju ali vsakdanjih opravilih."
      },
      {
        "name": "učenje",
        "explanation": "AI razlaga: Učenje\nKaj je učenje?\nUčenje ni le pomnjenje ali branje iz knjig. Učenje pomeni, da postopoma razumemo svet okoli sebe in postajamo v nečem boljši.\nPredstavljaj si, da se učiš igrati rokomet. Na začetku ti morda ne gre najbolje. Z vajo pa postajaš vedno bolj spreten – bolje podajaš žogo, natančneje mečeš in bolje sodeluješ s soigralci.\nZ učenjem ne pridobiš le novih spretnosti, ampak tudi samozavest. Igro lahko deliš s prijatelji in skupaj doživljate veselje ob uspehu.\nPodobno se uči tudi umetna inteligenca – z veliko primeri in vajo postopoma postaja boljša pri svojem delu."
      },
      {
        "name": "inteligenca",
        "explanation": "AI razlaga: Inteligenca\n»Inteligenca« je zanimiv pojem!\nPomeni sposobnost razmišljanja, razumevanja in reševanja problemov. Ljudje uporabljamo inteligenco, ko se učimo novih stvari, iščemo rešitve ali sprejemamo odločitve.\nPri umetni inteligenci to pomeni, da računalniki izvajajo naloge, ki običajno zahtevajo človeško razmišljanje – na primer prepoznavajo slike, razumejo govor ali predlagajo rešitve.\nČe želiš izvedeti več, lekcijo preberi še enkrat in razmisli o primerih iz svojega vsakdana."
      }
    ]'::jsonb,
    updated_at = NOW()
WHERE title = 'Kaj sploh je umetna inteligenca?'
  AND course_id = (SELECT id FROM courses WHERE slug = 'ai-basics-for-kids');
