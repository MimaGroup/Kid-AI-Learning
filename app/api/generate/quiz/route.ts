import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"
import { checkRateLimit, RATE_LIMITS, getRateLimitKey } from "@/lib/rate-limit"
import { validateAIResponse, sanitizeUserInput, createSafePrompt } from "@/lib/content-moderation"

const FALLBACK_QUESTIONS = [
  {
    question: "What does AI stand for?",
    options: ["Artificial Intelligence", "Automatic Information", "Advanced Internet", "Amazing Ideas"],
    correct: 0,
    explanation:
      "AI stands for Artificial Intelligence - computer systems that can perform tasks that typically require human intelligence!",
  },
  {
    question: "Which of these is an example of AI in everyday life?",
    options: ["A regular calculator", "Voice assistants like Siri or Alexa", "A paper book", "A bicycle"],
    correct: 1,
    explanation:
      "Voice assistants use AI to understand your speech and respond to your questions. They learn from interactions to get better over time!",
  },
  {
    question: "What can AI help us do?",
    options: ["Only play games", "Recognize faces in photos", "Make food taste better", "Change the weather"],
    correct: 1,
    explanation:
      "AI is great at recognizing patterns, like identifying faces in photos. This technology is used in cameras and social media apps!",
  },
  {
    question: "How does AI learn?",
    options: [
      "By reading books like humans",
      "By analyzing lots of examples and data",
      "By watching TV",
      "It doesn't learn, it knows everything",
    ],
    correct: 1,
    explanation:
      "AI learns by looking at many examples and finding patterns in data. The more examples it sees, the better it gets at its task!",
  },
  {
    question: "Which job might AI help with in the future?",
    options: [
      "Helping doctors diagnose diseases",
      "Eating lunch for you",
      "Doing your homework (cheating!)",
      "Making friends for you",
    ],
    correct: 0,
    explanation:
      "AI can help doctors by analyzing medical images and data to spot diseases early. But remember, AI is a tool to help humans, not replace them!",
  },
]

async function generateWithRetry(prompt: string, maxRetries = 2): Promise<string> {
  let lastError: Error | null = null

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const { text } = await generateText({
        model: groq("llama-3.1-8b-instant"),
        prompt,
      })
      return text
    } catch (error: any) {
      lastError = error

      if (error?.message?.includes("rate_limit_exceeded") || error?.message?.includes("429")) {
        const waitMatch = error.message.match(/try again in ([\d.]+)(ms|s)/)
        let waitTime = 3000 * Math.pow(2, attempt)

        if (waitMatch) {
          const value = Number.parseFloat(waitMatch[1])
          const unit = waitMatch[2]
          waitTime = Math.max(waitTime, unit === "s" ? value * 1000 : value)
          waitTime += 1000
        }

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
        message: `Too many requests! Please wait ${rateLimitResult.resetIn} seconds before generating new AI questions. Enjoy these pre-made questions in the meantime!`,
      })
    }

    try {
      console.log("[v0] Calling Groq API with retry logic...")

      const basePrompt = `Generate ${count} multiple choice quiz questions about ${sanitizedTopic} for kids aged 8-12 at ${difficulty} level.

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
- Questions should be age-appropriate and engaging
- Use simple, clear language
- Include fun facts in explanations
- Make sure the correct answer index (0-3) matches the options array
- Topics should be educational but fun

Return ONLY the JSON array, no additional text.`

      const safePrompt = createSafePrompt(basePrompt)

      const text = await generateWithRetry(safePrompt)

      console.log("[v0] Groq API response received, length:", text.length)

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
            message: "Using pre-made questions to ensure age-appropriate content!",
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
        message: "Using pre-made questions due to high demand. Try again in a minute for AI-generated questions!",
      })
    }
  } catch (error) {
    console.error("[v0] Error in quiz generation:", error)
    return NextResponse.json(
      {
        error: "Failed to generate quiz questions",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
