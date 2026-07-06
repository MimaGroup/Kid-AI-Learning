import { NextRequest, NextResponse } from "next/server"
import Anthropic from "@anthropic-ai/sdk"
import { createServerClient } from "@/lib/supabase/server"
import { sanitizeUserInput, moderateContent, validateAIResponse } from "@/lib/content-moderation"

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

export async function POST(req: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ reply: "Byte trenutno ni na voljo. Poskusi kasneje!" }, { status: 200 })
  }

  // Auth check using getUser() — more reliable than getSession() server-side
  let userId = ""
  try {
    const supabase = await createServerClient()
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    userId = user.id
  } catch (err) {
    console.error("Auth check failed:", err)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  let body: any
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Neveljavna zahteva" }, { status: 400 })
  }

  const { lessonTitle, lessonContent, history = [] } = body
  let { message } = body

  if (!message?.trim()) {
    return NextResponse.json({ error: "Prazno sporočilo" }, { status: 400 })
  }

  // Sanitize and moderate input
  message = sanitizeUserInput(String(message).trim().slice(0, MAX_MESSAGE_LENGTH))
  try {
    const inputCheck = await moderateContent(message)
    if (!inputCheck.isAppropriate) {
      return NextResponse.json(
        { reply: "Tega vprašanja ne morem obdelati. Za pomoč vprašaj starše ali učitelja! 🤖" },
        { status: 200 }
      )
    }
  } catch {
    // If moderation fails, allow the request through
  }

  // Rate limit check — skip if table doesn't exist
  try {
    const supabase = await createServerClient()
    const today = new Date().toISOString().split("T")[0]
    const key = `byte_${userId}_${today}`
    const { data } = await supabase.from("byte_rate_limit").select("count").eq("key", key).maybeSingle()

    if (data && data.count >= DAILY_LIMIT) {
      return NextResponse.json(
        { reply: "Danes si me že veliko vprašal/a! 🤖 Vrni se jutri za več odgovorov. Nadaljuj z lekcijami — znaš!" },
        { status: 200 }
      )
    }

    // Increment usage (fire-and-forget, don't block the response)
    if (data) {
      supabase.from("byte_rate_limit").update({ count: data.count + 1 }).eq("key", key).then(() => {})
    } else {
      supabase.from("byte_rate_limit").insert({ key, user_id: userId, count: 1, date: today }).then(() => {})
    }
  } catch {
    // Table doesn't exist yet — allow request
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

  try {
    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 280,
      system: SYSTEM_PROMPT + contextBlock,
      messages,
    })

    const rawReply = (response.content[0] as { type: string; text: string }).text

    // Validate AI response — if validation fails, still return the raw reply
    try {
      const validated = await validateAIResponse(rawReply, "byte-chat")
      const reply = validated.isAppropriate
        ? (validated.sanitizedContent ?? rawReply)
        : "Za to temo prosim vprašaj starše. 🤖"
      return NextResponse.json({ reply })
    } catch {
      return NextResponse.json({ reply: rawReply })
    }
  } catch (err) {
    console.error("Anthropic API error:", err)
    return NextResponse.json(
      { reply: "Ups, prišlo je do napake. Poskusi znova čez trenutek! 🔧" },
      { status: 200 }
    )
  }
}
