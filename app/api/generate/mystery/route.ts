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
    const { theme = "school", difficulty = "easy" } = body

    const { text } = await generateText({
      model: "groq/llama-3.3-70b-versatile",
      prompt: `Create a fun detective mystery case for kids aged 8-12 with a ${theme} theme at ${difficulty} difficulty.

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

Return ONLY the JSON object, no additional text.`,
    })

    // Parse the AI response
    const cleanedText = text
      .trim()
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
    const mystery = JSON.parse(cleanedText)

    return NextResponse.json({ mystery })
  } catch (error) {
    console.error("Error generating mystery:", error)
    return NextResponse.json({ error: "Failed to generate mystery case" }, { status: 500 })
  }
}
