import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { generateText } from "ai"

export async function POST(request: Request) {
  try {
    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { topic = "artificial intelligence", difficulty = "beginner", count = 3 } = body

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

    // Parse the AI response
    const cleanedText = text
      .trim()
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
    const questions = JSON.parse(cleanedText)

    return NextResponse.json({ questions })
  } catch (error) {
    console.error("Error generating quiz:", error)
    return NextResponse.json({ error: "Failed to generate quiz questions" }, { status: 500 })
  }
}
