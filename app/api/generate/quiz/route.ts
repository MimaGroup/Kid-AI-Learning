import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { generateText } from "ai"

export async function POST(request: Request) {
  try {
    console.log("[v0] Generating quiz - start")
    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    console.log("[v0] Auth check:", { user: user?.id, error: authError?.message })

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    console.log("[v0] Quiz generation params:", body)
    const { topic = "artificial intelligence", difficulty = "beginner", count = 3 } = body

    console.log("[v0] Calling Groq API...")
    const { text } = await generateText({
      model: "groq/llama-3.3-70b-versatile",
      prompt: `Generate ${count} multiple choice quiz questions about ${topic} for kids aged 8-12 at ${difficulty} level.

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

Return ONLY the JSON array, no additional text.`,
    })

    console.log("[v0] Groq API response received, length:", text.length)

    const cleanedText = text
      .trim()
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")

    console.log("[v0] Cleaned text:", cleanedText.substring(0, 200))

    const questions = JSON.parse(cleanedText)
    console.log("[v0] Parsed questions count:", questions.length)

    return NextResponse.json({ questions })
  } catch (error) {
    console.error("[v0] Error generating quiz:", error)
    return NextResponse.json(
      {
        error: "Failed to generate quiz questions",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
