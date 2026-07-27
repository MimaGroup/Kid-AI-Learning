import { WorksheetDisplay } from "@/components/worksheet-display"
import { notFound } from "next/navigation"

const worksheets: Record<string, { title: string; difficulty: string; content: string }> = {
  "pattern-recognition-puzzle": {
    title: "Uganka prepoznavanja vzorcev",
    difficulty: "Srednje",
    content: `Navodila: Poglej vzorce spodaj in dopolni manjkajoče elemente!

Vzorec 1: 🔴 🔵 🔴 🔵 🔴 ___
Odgovor: 🔵

Vzorec 2: 🐱 😺 🐱 😺 ___ 😺
Odgovor: 🐱

Vzorec 3: 1, 2, 4, 8, 16, ___
Odgovor: 32

Vzorec 4: A, B, C, D, ___
Odgovor: E

Izziv: Ustvari svoj lasten vzorec!
___ ___ ___ ___ ___

Odlično opravljeno! Vzorci pomagajo AI, da se uči in napoveduje!`,
  },
  "build-your-own-algorithm": {
    title: "Ustvari svoj algoritem",
    difficulty: "Lahko",
    content: `Navodila: Algoritem je zaporedje korakov za rešitev problema!

Primer: Priprava sendviča
Korak 1: Vzemi dve rezini kruha
Korak 2: Namaži arašidovo maslo na eno rezino
Korak 3: Namaži marmelado na drugo rezino
Korak 4: Sestavi rezini skupaj
Korak 5: Uživaj v sendviču! 🥪

Zdaj ti: Napiši algoritem za umivanje zob!
Korak 1: _______________
Korak 2: _______________
Korak 3: _______________
Korak 4: _______________

Zapomni si: AI uporablja algoritme za sprejemanje odločitev!`,
  },
  "ai-word-search": {
    title: "Iskanje besed o AI",
    difficulty: "Lahko",
    content: `Navodila: Poišči te besede, povezane z umetno inteligenco, v mreži!

Besede za iskanje:
- ROBOT
- PODATKI
- UČENJE
- PAMETEN
- KODA

A L G O R I T E M
R O B O T X Y Z Q
P O D A T K I R T
U Č E N J E N O P
P A M E T E N O D

Izziv: Se ti lahko domisliš še 3 besed, povezanih z AI?
1. _______________
2. _______________
3. _______________`,
  },
  "robot-design-challenge": {
    title: "Izziv oblikovanja robota",
    difficulty: "Težko",
    content: `Navodila: Zasnuj svojega lastnega koristnega robota!

Kaj bo tvoj robot počel?
_______________________________________________

Nariši svojega robota tukaj:
[Prostor za risanje]

Lastnosti robota:
□ Zna govoriti
□ Se zna premikati
□ Vidi
□ Se zna učiti
□ Pomaga ljudem

Posebne sposobnosti:
1. _______________
2. _______________
3. _______________

Zakaj je tvoj robot koristen?
_______________________________________________

Zapomni si: Pravi AI roboti so zasnovani, da pomagajo ljudem!`,
  },
}

export default async function WorksheetPage({
  params,
}: {
  params: Promise<{ name: string }>
}) {
  const { name } = await params
  const worksheet = worksheets[name]

  if (!worksheet) {
    notFound()
  }

  return <WorksheetDisplay title={worksheet.title} difficulty={worksheet.difficulty} content={worksheet.content} />
}
