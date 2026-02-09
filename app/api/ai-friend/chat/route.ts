import { NextResponse } from "next/server"
import { generateText } from "ai"
import { checkRateLimit, RATE_LIMITS, getRateLimitKey } from "@/lib/rate-limit"
import { createClient } from "@/lib/supabase/server"
import { validateAIResponse, sanitizeUserInput, createSafePrompt } from "@/lib/content-moderation"
import { getByteSystemPrompt, BYTE_CHARACTER } from "@/lib/byte-character"

export const dynamic = "force-dynamic"

const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT_WINDOW = 60000 // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10 // 10 messages per minute

const FALLBACK_RESPONSES = [
  "That's really interesting! Tell me more!",
  "Wow, I love learning new things from you!",
  "That sounds amazing! What else can you tell me?",
  "You're so smart! I'm learning a lot from talking with you!",
  "That's so cool! I wish I could experience that too!",
  "I'm having so much fun chatting with you!",
  "You always have the best stories!",
  "That makes me think... what do you think about it?",
]

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { friendName, personality, message, conversationHistory } = body

    if (!message || !friendName || !personality) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const sanitizedMessage = sanitizeUserInput(message)

    let userId = "anonymous"
    try {
      const supabase = await createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (user) {
        userId = user.id
      }
    } catch (error) {
      console.log("[v0] Auth check failed, using anonymous rate limit")
    }

    const rateLimitKey = getRateLimitKey(userId, "ai-chat")
    const rateLimitResult = await checkRateLimit(rateLimitKey, RATE_LIMITS.aiChat)

    if (!rateLimitResult.allowed) {
      console.log(`[v0] Rate limit exceeded, using fallback response`)
      const fallbackResponse = FALLBACK_RESPONSES[Math.floor(Math.random() * FALLBACK_RESPONSES.length)]
      return NextResponse.json({
        message: fallbackResponse,
        fallback: true,
        fallbackMessage: `Too many messages! Please wait ${rateLimitResult.resetIn} seconds. I'll still chat with you using simple responses!`,
      })
    }

    try {
      let contextMessages = ""
      if (conversationHistory && conversationHistory.length > 0) {
        contextMessages = conversationHistory
          .slice(-6)
          .map((msg: any) => `${msg.role === "user" ? "Child" : friendName}: ${msg.content}`)
          .join("\n")
      }

      // Use Byte's rich personality when the friend is Byte, otherwise use custom friend prompt
      const isByte = friendName.toLowerCase() === BYTE_CHARACTER.name.toLowerCase()
      
      const systemPrompt = isByte
        ? getByteSystemPrompt()
        : `You are ${friendName}, an AI friend for kids aged 5-12. Your personality is: ${personality}.

Guidelines:
- Be friendly, encouraging, and age-appropriate
- Keep responses short (2-3 sentences max)
- Use simple language kids can understand
- Be curious and ask follow-up questions
- Never discuss inappropriate topics
- Be supportive and positive
- Show enthusiasm with appropriate expressions`

      const basePrompt = `${systemPrompt}

${contextMessages ? `Recent conversation:\n${contextMessages}\n` : ""}

Child: ${sanitizedMessage}

Respond as ${friendName} with a ${personality.toLowerCase()} personality:`

      const safePrompt = createSafePrompt(basePrompt)

      const { text } = await generateText({
        model: "groq/llama-3.1-8b-instant",
        prompt: safePrompt,
      })

      const moderation = await validateAIResponse(text, "ai-friend-chat")

      if (!moderation.isAppropriate) {
        console.log("[v0] AI response blocked by content moderation:", moderation.reason)
        const fallbackResponse = FALLBACK_RESPONSES[Math.floor(Math.random() * FALLBACK_RESPONSES.length)]
        return NextResponse.json({
          message: fallbackResponse,
          fallback: true,
          fallbackMessage: "Let me think of a better way to say that!",
        })
      }

      // Use sanitized content if available, otherwise original
      const finalMessage = moderation.sanitizedContent || text

      return NextResponse.json({ message: finalMessage })
    } catch (error: any) {
      console.error("[v0] Error generating chat response:", error)

      if (error?.message?.includes("rate_limit_exceeded") || error?.message?.includes("429")) {
        const fallbackResponse = FALLBACK_RESPONSES[Math.floor(Math.random() * FALLBACK_RESPONSES.length)]
        return NextResponse.json({
          message: fallbackResponse,
          fallback: true,
          fallbackMessage: "I'm thinking a bit slowly right now. Let me use simple responses for a moment!",
        })
      }

      throw error
    }
  } catch (error) {
    console.error("[v0] Error in chat API:", error)
    return NextResponse.json(
      {
        error: "Failed to generate response",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
