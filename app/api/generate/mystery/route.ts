import { NextResponse } from "next/server"
import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"
import { checkRateLimit, RATE_LIMITS, getRateLimitKey } from "@/lib/rate-limit"
import { createClient } from "@/lib/supabase/server"
import { validateAIResponse, sanitizeUserInput, createSafePrompt } from "@/lib/content-moderation"

export const dynamic = "force-dynamic"

const FALLBACK_MYSTERIES = [
  {
    title: "The Case of the Missing Lunch",
    description:
      "Someone's lunch has disappeared from the cafeteria! The sandwich was there at noon, but by 12:30 it was gone. Can you figure out what happened?",
    clues: [
      "There are crumbs leading from the lunch table to the playground door",
      "A student saw a squirrel near the open window around 12:15",
      "The lunch bag was found outside, empty but not torn",
    ],
    solution:
      "A clever squirrel came through the open window and took the sandwich! The crumbs show its path, and it carefully removed the sandwich without damaging the bag.",
  },
  {
    title: "The Mystery of the Switched Backpacks",
    description:
      "Two students accidentally took each other's identical backpacks home. How can we figure out whose backpack is whose?",
    clues: [
      "One backpack has a math book with 'Room 204' written inside",
      "The other backpack contains a permission slip signed by 'Mrs. Johnson'",
      "The school directory shows Mrs. Johnson teaches in Room 204",
    ],
    solution:
      "Both backpacks belong to students in Room 204! By checking the class roster and matching the names on the permission slip and math book, we can return each backpack to its owner.",
  },
  {
    title: "The Puzzle of the Rearranged Library",
    description:
      "The school librarian arrived to find all the books mysteriously rearranged overnight. Who could have done this and why?",
    clues: [
      "The books are now organized by color instead of by subject",
      "A thank-you note was left on the desk signed 'The Art Club'",
      "The art teacher mentioned wanting to photograph colorful book displays",
    ],
    solution:
      "The Art Club rearranged the books by color to create a beautiful rainbow display for their photography project! They left a note to explain and planned to help put everything back.",
  },
]

export async function POST(request: Request) {
  try {
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

    const body = await request.json()
    const { theme = "school", difficulty = "easy" } = body

    const sanitizedTheme = sanitizeUserInput(theme)

    const rateLimitKey = getRateLimitKey(userId, "ai-generation")
    const rateLimitResult = await checkRateLimit(rateLimitKey, RATE_LIMITS.aiGeneration)

    if (!rateLimitResult.allowed) {
      console.log(`[v0] Rate limit exceeded for user ${userId}, using fallback mystery`)
      const randomMystery = FALLBACK_MYSTERIES[Math.floor(Math.random() * FALLBACK_MYSTERIES.length)]
      return NextResponse.json({
        mystery: randomMystery,
        fallback: true,
        message: `Too many requests! Please wait ${rateLimitResult.resetIn} seconds before generating new mysteries. Enjoy this pre-made mystery in the meantime!`,
      })
    }

    let retryCount = 0
    const maxRetries = 2

    while (retryCount < maxRetries) {
      try {
        const basePrompt = `Create a fun detective mystery case for kids aged 8-12 with a ${sanitizedTheme} theme at ${difficulty} difficulty.

Format the response as JSON with this exact structure:
{
  "title": "Mystery title",
  "description": "Brief description of the mystery (2-3 sentences)",
  "clues": [
    "First clue that helps solve the mystery",
    "Second clue with more information",
    "Third clue that leads to the solution"
  ],
  "solution": "The complete solution explaining what happened and why"
}

Requirements:
- Mystery should be age-appropriate and non-scary
- Clues should progressively reveal the solution
- Solution should be logical and satisfying
- Use kid-friendly language
- Make it educational but fun
- No violence or scary content

Return ONLY the JSON object, no additional text.`

        const safePrompt = createSafePrompt(basePrompt)

        const { text } = await generateText({
          model: groq("llama-3.1-8b-instant"),
          prompt: safePrompt,
          maxRetries: 0,
        })

        const cleanedText = text
          .trim()
          .replace(/```json\n?/g, "")
          .replace(/```\n?/g, "")

        const mystery = JSON.parse(cleanedText)

        const contentToCheck = `${mystery.title} ${mystery.description} ${mystery.clues.join(" ")} ${mystery.solution}`
        const moderation = await validateAIResponse(contentToCheck, "mystery-generation")

        if (!moderation.isAppropriate) {
          console.log("[v0] Mystery blocked by content moderation, using fallback")
          const randomMystery = FALLBACK_MYSTERIES[Math.floor(Math.random() * FALLBACK_MYSTERIES.length)]
          return NextResponse.json({
            mystery: randomMystery,
            fallback: true,
            message: "Using a pre-made mystery to ensure age-appropriate content!",
          })
        }

        return NextResponse.json({ mystery })
      } catch (aiError: any) {
        if (aiError?.message?.includes("rate_limit_exceeded") && retryCount < maxRetries - 1) {
          console.log(`[v0] Rate limited, waiting before retry ${retryCount + 1}/${maxRetries}`)
          await new Promise((resolve) => setTimeout(resolve, 2000))
          retryCount++
          continue
        }

        console.log("[v0] AI generation failed, using fallback mystery:", aiError?.message)
        break
      }
    }

    const randomMystery = FALLBACK_MYSTERIES[Math.floor(Math.random() * FALLBACK_MYSTERIES.length)]
    return NextResponse.json({ mystery: randomMystery })
  } catch (error) {
    console.error("[v0] Error in mystery generation:", error)
    const randomMystery = FALLBACK_MYSTERIES[0]
    return NextResponse.json({ mystery: randomMystery }, { status: 200 })
  }
}
