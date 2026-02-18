import { type NextRequest, NextResponse } from "next/server"
import { createServiceRoleClient, createServerClient } from "@/lib/supabase/server"
import { generateText } from "ai"
import { checkRateLimit, RATE_LIMITS, getRateLimitKey } from "@/lib/rate-limit"
import { validateAIResponse, createSafePrompt } from "@/lib/content-moderation"

async function generateWithRetry(prompt: string, maxRetries = 2): Promise<string> {
  let lastError: Error | null = null
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const { text } = await generateText({
        model: "groq/llama-3.1-8b-instant",
        prompt,
      })
      return text
    } catch (error: any) {
      lastError = error
      if (error?.message?.includes("rate_limit_exceeded") || error?.message?.includes("429")) {
        const waitTime = 3000 * Math.pow(2, attempt)
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

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string; lessonId: string }> }
) {
  try {
    const { slug, lessonId } = await params
    const supabase = await createServiceRoleClient()

    // Check auth
    let userId = "anonymous"
    try {
      const userSupabase = await createServerClient()
      const { data: { user } } = await userSupabase.auth.getUser()
      if (user) userId = user.id
    } catch {
      // anonymous
    }

    // Rate limit
    const rateLimitKey = getRateLimitKey(userId, "lesson-quiz")
    const rateLimitResult = await checkRateLimit(rateLimitKey, RATE_LIMITS.aiGeneration)
    if (!rateLimitResult.allowed) {
      return NextResponse.json({
        questions: getFallbackQuestions(),
        fallback: true,
        message: `Preveč zahtev! Počakajte ${rateLimitResult.resetIn} sekund. Medtem uživajte v teh vprašanjih!`,
      })
    }

    // Get the lesson and course
    const { data: lesson } = await supabase
      .from("course_lessons")
      .select("title, key_concepts, content, module_index")
      .eq("id", lessonId)
      .single()

    if (!lesson) {
      return NextResponse.json({ error: "Lesson not found" }, { status: 404 })
    }

    const { data: course } = await supabase
      .from("courses")
      .select("title, age_min, age_max")
      .eq("slug", slug)
      .single()

    const ageRange = course ? `${course.age_min}-${course.age_max}` : "8-12"
    const keyConcepts = (lesson.key_concepts as string[]) || []

    try {
      const basePrompt = `Generate 4 multiple choice quiz questions about the lesson "${lesson.title}" from the course "${course?.title || "AI for Kids"}".

The lesson covers these key concepts: ${keyConcepts.join(", ")}.

Here is a summary of the lesson content for context:
${lesson.content.substring(0, 800)}

Format the response as a JSON array with this exact structure:
[
  {
    "question": "Question in Slovenian?",
    "options": ["Možnost A", "Možnost B", "Možnost C", "Možnost D"],
    "correct": 0,
    "explanation": "Kid-friendly explanation in Slovenian"
  }
]

Requirements:
- ALL questions and answers MUST be in grammatically correct SLOVENIAN language.
- Use gender-neutral phrasing where possible (e.g. "naučil/a" instead of just "naučil" or "naučila").
- CRITICAL Slovenian grammar rules you MUST follow:
  - Always use correct declension: "stvar" (not "stvarico"), "žival" (not "živalo"), "očala" (not "očarlja").
  - Always use correct verb forms: "zdijo" (not "zdelajo"), "igralec" (not "igranec").
  - Always use proper diacritics: č, š, ž, where needed. For example: "računalnik" (not "racunalnik"), "učenje" (not "ucenje"), "različen" (not "razlicen").
  - Use correct prepositions and cases: "s pomočjo" (instrumental), "brez" + genitive, etc.
  - Do not invent words. Use only real Slovenian words.
- Questions should be appropriate for children aged ${ageRange}.
- Test understanding of the key concepts from this specific lesson.
- Use simple, encouraging language.
- Include fun facts in explanations.
- Make sure the correct answer index (0-3) matches the options array.
- Double-check every word is a real Slovenian word before outputting.

Return ONLY the JSON array, no additional text.`

      const safePrompt = createSafePrompt(basePrompt, ageRange)
      const text = await generateWithRetry(safePrompt)

      const cleanedText = text
        .trim()
        .replace(/```json\n?/g, "")
        .replace(/```\n?/g, "")

      const questions = JSON.parse(cleanedText)

      // Validate content
      for (const question of questions) {
        const contentToCheck = `${question.question} ${question.options.join(" ")} ${question.explanation}`
        const moderation = await validateAIResponse(contentToCheck, "lesson-quiz")
        if (!moderation.isAppropriate) {
          return NextResponse.json({
            questions: getFallbackQuestions(),
            fallback: true,
            message: "Uporabljamo vnaprej pripravljena vprašanja za varnost vsebine!",
          })
        }
      }

      return NextResponse.json({ questions, lessonTitle: lesson.title })
    } catch (error: any) {
      console.error("Error generating lesson quiz:", error.message)
      return NextResponse.json({
        questions: getFallbackQuestions(),
        fallback: true,
        message: "Uporabljamo vnaprej pripravljena vprašanja. Poskusite znova čez minuto za AI vprašanja!",
      })
    }
  } catch (error) {
    console.error("Error in lesson quiz API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

function getFallbackQuestions() {
  return [
    {
      question: "Kaj je umetna inteligenca (AI)?",
      options: [
        "Računalniški program, ki se lahko uči",
        "Vrsta videoigre",
        "Novo družbeno omrežje",
        "Aplikacija za risanje",
      ],
      correct: 0,
      explanation: "Umetna inteligenca je računalniški program, ki se lahko uči iz podatkov in opravlja naloge, ki običajno zahtevajo človeško razmišljanje!",
    },
    {
      question: "Kako se AI uči novih stvari?",
      options: [
        "Z gledanjem televizije",
        "Z analiziranjem velikega števila primerov in podatkov",
        "Z branjem knjig tako kot ljudje",
        "AI se ne more učiti",
      ],
      correct: 1,
      explanation: "AI se uči z analiziranjem velikih količin podatkov in iskanjem vzorcev. Več primerov kot vidi, boljša postane!",
    },
    {
      question: "Kateri je primer AI v vsakdanjem življenju?",
      options: [
        "Navaden kalkulator",
        "Papirna knjiga",
        "Glasovni pomočniki, kot sta Siri ali Alexa",
        "Kolo",
      ],
      correct: 2,
      explanation: "Glasovni pomočniki uporabljajo AI za razumevanje govora in odgovarjanje na vprašanja!",
    },
    {
      question: "Kaj je najpomembnejše pri uporabi AI?",
      options: [
        "Da je čim hitrejša",
        "Da je varna in odgovorna",
        "Da je brezplačna",
        "Da je zabavna",
      ],
      correct: 1,
      explanation: "Varnost in odgovornost sta ključnega pomena pri uporabi AI, še posebej za mlade uporabnike!",
    },
  ]
}
