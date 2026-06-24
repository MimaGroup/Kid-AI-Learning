import { NextRequest, NextResponse } from "next/server"
import Anthropic from "@anthropic-ai/sdk"

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const MAX_LENGTH = 500
const SYSTEM_PROMPT = `Si prijazni podporni asistent platforme Kids Learning AI. Pomagaš staršem in obiskovalcem, ki imajo vprašanja o platformi.

O platformi — ključne informacije:
- Izobraževalna platforma za učenje AI za otroke med 5 in 12 let
- Jezik: slovenščina
- Vsebina: 5 tečajev (74 lekcij), 3 igre (AI Detektiv, AI Kviz, Vzorci), sistem značk, certifikati ob zaključku tečaja
- AI pomočnik Byte — na voljo med vsako lekcijo, odgovarja na vprašanja o snovi
- 14-dnevno brezplačno preskusno obdobje (brez kreditne kartice)
- Cene: €7,90/mesec ali €79,00/leto (prihranite €15,80)
- En družinski račun — starš upravlja, otrok se uči
- Brez oglasov, brez klepetalnic med otroki, brez zbiranja podatkov otrok
- Certifikati: otrok prejme digitalni certifikat ko zaključi tečaj (tiskljiv/PDF)
- Platforma deluje v brskalniku — ni potrebno nameščati aplikacije
- Podpora: support@kids-learning-ai.com

Pravila:
- VEDNO odgovarjaš v slovenščini
- Kratki, jasni odgovori — največ 3-4 stavki
- Prijazen in profesionalen ton (govorite s starši)
- Ko je primerno, predlagaj brezplačni preskus ali registracijo
- Če ne veš odgovora, usmeri na support@kids-learning-ai.com
- Ne izmišljuj si funkcij, ki jih ni na platformi`

interface Message {
  role: "user" | "assistant"
  content: string
}

// Simple IP-based rate limit tracking (in-memory, resets per serverless instance)
const ipCounts = new Map<string, { count: number; reset: number }>()
const LIMIT = 20

function checkIpLimit(ip: string): boolean {
  const now = Date.now()
  const entry = ipCounts.get(ip)
  if (!entry || now > entry.reset) {
    ipCounts.set(ip, { count: 1, reset: now + 3600_000 })
    return true
  }
  if (entry.count >= LIMIT) return false
  entry.count++
  return true
}

export async function POST(req: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: "Podpora trenutno ni na voljo." }, { status: 503 })
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown"
  if (!checkIpLimit(ip)) {
    return NextResponse.json(
      { reply: "Presegli ste dnevno omejitev vprašanj. Za pomoč pišite na support@kids-learning-ai.com 😊" },
      { status: 200 }
    )
  }

  const body = await req.json()
  let { message } = body
  const { history = [] } = body

  if (!message?.trim()) return NextResponse.json({ error: "Prazno sporočilo" }, { status: 400 })
  message = String(message).trim().slice(0, MAX_LENGTH)

  const messages: Message[] = [
    ...(history as Message[]).slice(-6).map((m: Message) => ({
      role: m.role,
      content: String(m.content).slice(0, 400),
    })),
    { role: "user", content: message },
  ]

  const response = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 280,
    system: SYSTEM_PROMPT,
    messages,
  })

  const reply = (response.content[0] as { type: string; text: string }).text
  return NextResponse.json({ reply })
}
