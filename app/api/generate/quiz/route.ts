import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import Anthropic from "@anthropic-ai/sdk"
import { checkRateLimit, RATE_LIMITS, getRateLimitKey } from "@/lib/rate-limit"
import { validateAIResponse, sanitizeUserInput, createSafePrompt } from "@/lib/content-moderation"

export const dynamic = "force-dynamic"

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const FALLBACK_QUESTIONS = [
  {
    question: "Za kaj stoji kratica AI?",
    options: ["Umetna inteligenca", "Samodejne informacije", "Napredni internet", "Neverjetne ideje"],
    correct: 0,
    explanation:
      "AI pomeni umetna inteligenca — računalniški sistemi, ki opravljajo naloge, za katere je običajno potrebna človeška inteligenca!",
  },
  {
    question: "Kaj je primer AI v vsakdanjem življenju?",
    options: ["Navaden kalkulator", "Glasovni pomočniki, kot je Siri", "Papirnata knjiga", "Kolo"],
    correct: 1,
    explanation:
      "Glasovni pomočniki uporabljajo AI, da razumejo tvoj govor in odgovorijo na vprašanja. Z vsako interakcijo se učijo in postajajo boljši!",
  },
  {
    question: "Pri čem nam lahko pomaga AI?",
    options: ["Samo pri igranju iger", "Prepoznavanju obrazov na fotografijah", "Boljšem okusu hrane", "Spreminjanju vremena"],
    correct: 1,
    explanation:
      "AI je odličen pri prepoznavanju vzorcev, na primer obrazov na fotografijah. To tehnologijo uporabljajo kamere in aplikacije za družbena omrežja!",
  },
  {
    question: "Kako se AI uči?",
    options: [
      "Z branjem knjig, kot ljudje",
      "Z analizo množice primerov in podatkov",
      "Z gledanjem televizije",
      "Ne uči se, vse že ve",
    ],
    correct: 1,
    explanation:
      "AI se uči tako, da si ogleda veliko primerov in v podatkih poišče vzorce. Več primerov kot vidi, boljša postane pri svoji nalogi!",
  },
  {
    question: "Pri katerem poklicu bi AI lahko pomagala v prihodnosti?",
    options: [
      "Zdravnikom pri diagnosticiranju bolezni",
      "Jedla bi tvojo malico namesto tebe",
      "Delala bi tvojo domačo nalogo (goljufija!)",
      "Sklepala bi prijateljstva namesto tebe",
    ],
    correct: 0,
    explanation:
      "AI lahko pomaga zdravnikom z analizo medicinskih slik in podatkov, da bolezni odkrijejo zgodaj. A ne pozabi — AI je orodje, ki pomaga ljudem, ne pa njihova zamenjava!",
  },
]

async function generateWithRetry(prompt: string, maxRetries = 2): Promise<string> {
  let lastError: Error | null = null

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await anthropic.messages.create({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1200,
        messages: [{ role: "user", content: prompt }],
      })
      return (response.content[0] as { type: string; text: string }).text
    } catch (error: any) {
      lastError = error

      if (error?.status === 429) {
        const waitTime = 3000 * Math.pow(2, attempt)

        console.log(`[v0] Rate limited, waiting ${waitTime}ms before retry ${attempt + 1}/${maxRetries}`)

        if (attempt < maxRetries - 1) {
          await new Promise((resolve) => setTimeout(resolve, waitTime))
          continue
        }
      }

      throw error
    }
  }

  throw lastError || new Error("Failed to generate after retries")
}

export async function POST(request: Request) {
  try {
    console.log("[v0] Generating quiz - start")

    let userId = "anonymous"
    try {
      const supabase = await createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        userId = user.id
        console.log("[v0] Authenticated user:", userId)
      } else {
        console.log("[v0] Anonymous user - quiz will work without auth")
      }
    } catch (authError) {
      console.log("[v0] Auth check failed, continuing as anonymous:", authError)
    }

    const body = await request.json()
    console.log("[v0] Quiz generation params:", body)
    const { topic = "artificial intelligence", difficulty = "beginner", count = 5 } = body

    const sanitizedTopic = sanitizeUserInput(topic)

    const rateLimitKey = getRateLimitKey(userId, "ai-generation")
    const rateLimitResult = await checkRateLimit(rateLimitKey, RATE_LIMITS.aiGeneration)

    if (!rateLimitResult.allowed) {
      console.log(`[v0] Rate limit exceeded for user ${userId}, using fallback questions`)
      const shuffled = [...FALLBACK_QUESTIONS].sort(() => Math.random() - 0.5)
      const selectedQuestions = shuffled.slice(0, Math.min(count, FALLBACK_QUESTIONS.length))

      return NextResponse.json({
        questions: selectedQuestions,
        fallback: true,
        message: `Preveč zahtev! Počakaj ${rateLimitResult.resetIn} sekund, preden ustvariš nova AI vprašanja. Medtem uživaj v teh vnaprej pripravljenih vprašanjih!`,
      })
    }

    try {
      console.log("[v0] Calling Anthropic API with retry logic...")

      const basePrompt = `Generate ${count} multiple choice quiz questions about ${sanitizedTopic} for kids aged 5-12 at ${difficulty} level.

Format the response as a JSON array with this exact structure:
[
  {
    "question": "Question text here?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correct": 0,
    "explanation": "Kid-friendly explanation of why this is correct"
  }
]

Requirements:
- Write ALL text (questions, options, explanations) in Slovenian language — this is mandatory
- Questions should be age-appropriate and engaging
- Use simple, clear language
- Include fun facts in explanations
- Make sure the correct answer index (0-3) matches the options array
- Topics should be educational but fun

Return ONLY the JSON array, no additional text.`

      const safePrompt = createSafePrompt(basePrompt)

      const text = await generateWithRetry(safePrompt)

      console.log("[v0] Anthropic API response received, length:", text.length)

      const cleanedText = text
        .trim()
        .replace(/```json\n?/g, "")
        .replace(/```\n?/g, "")

      console.log("[v0] Cleaned text:", cleanedText.substring(0, 200))

      const questions = JSON.parse(cleanedText)
      console.log("[v0] Parsed questions count:", questions.length)

      for (const question of questions) {
        const contentToCheck = `${question.question} ${question.options.join(" ")} ${question.explanation}`
        const moderation = await validateAIResponse(contentToCheck, "quiz-generation")

        if (!moderation.isAppropriate) {
          console.log("[v0] Quiz question blocked by content moderation, using fallback")
          const shuffled = [...FALLBACK_QUESTIONS].sort(() => Math.random() - 0.5)
          const selectedQuestions = shuffled.slice(0, Math.min(count, FALLBACK_QUESTIONS.length))

          return NextResponse.json({
            questions: selectedQuestions,
            fallback: true,
            message: "Uporabljamo vnaprej pripravljena vprašanja, da zagotovimo starosti primerno vsebino!",
          })
        }
      }

      return NextResponse.json({ questions })
    } catch (error: any) {
      console.error("[v0] Error generating quiz, using fallback questions:", error.message)

      const shuffled = [...FALLBACK_QUESTIONS].sort(() => Math.random() - 0.5)
      const selectedQuestions = shuffled.slice(0, Math.min(count, FALLBACK_QUESTIONS.length))

      return NextResponse.json({
        questions: selectedQuestions,
        fallback: true,
        message: "Zaradi velikega povpraševanja uporabljamo vnaprej pripravljena vprašanja. Poskusi znova čez minuto za vprašanja, ustvarjena z AI!",
      })
    }
  } catch (error) {
    console.error("[v0] Error in quiz generation:", error)
    return NextResponse.json(
      { error: "Failed to load quiz questions" },
      { status: 500 }
    )
  }
}
