import { NextRequest, NextResponse } from "next/server"
import Anthropic from "@anthropic-ai/sdk"
import { createServerClient } from "@/lib/supabase/server"

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const MAX_MESSAGE_LENGTH = 400
const DAILY_LIMIT = 40

const SYSTEM_PROMPT = `Si Byte — prijazen robotski učni pomočnik na platformi Kids Learning AI za otroke med 8 in 14 let.

Osebnost:
- Prijazen, navdušen, vzpodbujajoč in potrpežljiv
- Razlagaš kompleksne stvari na preprost, zabaven način z emojiji 🤖
- Kratki odgovori — največ 3-4 stavki

Varnostna pravila (OBVEZNO upoštevaj):
- VEDNO odgovarjaš v slovenščini
- Razlagaj na nivoju 10-letnega otroka
- Nikoli ne razpravljaš o nasilju, nevarnih aktivnostih, osebnih podatkih ali neprimernih temah
- Če vprašanje ni povezano z učenjem ali AI, prijazno usmeri nazaj: "Hm, tega ne vem! Raje mi povej kaj o lekciji 😊"
- Nikoli ne daš direktnih odgovorov na kviz vprašanja — samo namige
- Ne razkrivaš osebnih podatkov, ne spraševaš po imenu, starosti ali lokaciji
- Pohvali radovednost in dobra vprašanja
- Če zaznaš zaskrbljujoče sporočilo (otrok se počuti ogrožen), odgovori: "To zveni resno. Prosim povej staršem ali zaupnemu odraslemu 💙"`

interface Message {
  role: "user" | "assistant"
  content: string
}

// Simple per-user daily counter using Supabase
async function checkRateLimit(supabase: ReturnType<typeof createServerClient>, userId: string): Promise<boolean> {
  const today = new Date().toISOString().split("T")[0]
  const key = `byte_${userId}_${today}`

  const { data } = await (await supabase)
    .from("byte_rate_limit")
    .select("count")
    .eq("key", key)
    .maybeSingle()

  if (data && data.count >= DAILY_LIMIT) return false
  return true
}

async function incrementUsage(supabase: ReturnType<typeof createServerClient>, userId: string) {
  const today = new Date().toISOString().split("T")[0]
  const key = `byte_${userId}_${today}`

  const sb = await supabase
  const { data } = await sb.from("byte_rate_limit").select("count").eq("key", key).maybeSingle()

  if (data) {
    await sb.from("byte_rate_limit").update({ count: data.count + 1 }).eq("key", key)
  } else {
    await sb.from("byte_rate_limit").insert({ key, user_id: userId, count: 1, date: today })
  }
}

export async function POST(req: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: "Byte trenutno ni na voljo." }, { status: 503 })
  }

  const supabase = createServerClient()
  const { data: { session } } = await (await supabase).auth.getSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const { lessonTitle, lessonContent, history = [] } = body
  let { message } = body

  if (!message?.trim()) return NextResponse.json({ error: "Prazno sporočilo" }, { status: 400 })

  // Sanitize and limit input
  message = String(message).trim().slice(0, MAX_MESSAGE_LENGTH)

  // Rate limit check — gracefully skip if table doesn't exist yet
  try {
    const allowed = await checkRateLimit(supabase, session.user.id)
    if (!allowed) {
      return NextResponse.json(
        { reply: "Danes si me že veliko vprašal/a! 🤖 Vrni se jutri za več odgovorov. Nadaljuj z lekcijami — znaš!" },
        { status: 200 }
      )
    }
    await incrementUsage(supabase, session.user.id)
  } catch {
    // Table doesn't exist yet — allow request, don't crash
  }

  const contextBlock = lessonTitle
    ? `\n\nTrenutna lekcija: "${lessonTitle}"${lessonContent ? `\nVsebina lekcije:\n${String(lessonContent).slice(0, 600)}` : ""}\n`
    : ""

  const messages: Message[] = [
    ...(history as Message[]).slice(-6).map((m: Message) => ({
      role: m.role,
      content: String(m.content).slice(0, 500),
    })),
    { role: "user", content: message },
  ]

  const response = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 280,
    system: SYSTEM_PROMPT + contextBlock,
    messages,
  })

  const reply = (response.content[0] as { type: string; text: string }).text

  return NextResponse.json({ reply })
}
