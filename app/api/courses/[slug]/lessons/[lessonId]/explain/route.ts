import { type NextRequest, NextResponse } from "next/server"
import { createServiceRoleClient, createServerClient } from "@/lib/supabase/server"
import { generateText } from "ai"
import { checkRateLimit, RATE_LIMITS, getRateLimitKey } from "@/lib/rate-limit"
import { validateAIResponse, createSafePrompt, sanitizeUserInput } from "@/lib/content-moderation"

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
    const rateLimitKey = getRateLimitKey(userId, "lesson-explain")
    const rateLimitResult = await checkRateLimit(rateLimitKey, RATE_LIMITS.aiGeneration)
    if (!rateLimitResult.allowed) {
      return NextResponse.json({
        error: `Preveč zahtev! Počakajte ${rateLimitResult.resetIn} sekund in poskusite znova.`,
      }, { status: 429 })
    }

    const body = await request.json()
    const { concept } = body

    if (!concept || typeof concept !== "string") {
      return NextResponse.json({ error: "Concept is required" }, { status: 400 })
    }

    const sanitizedConcept = sanitizeUserInput(concept)

    // Get lesson context
    const { data: lesson } = await supabase
      .from("course_lessons")
      .select("title, key_concepts")
      .eq("id", lessonId)
      .single()

    const { data: course } = await supabase
      .from("courses")
      .select("age_min, age_max")
      .eq("slug", slug)
      .single()

    const ageRange = course ? `${course.age_min}-${course.age_max}` : "8-12"

    try {
      const basePrompt = `Explain the concept "${sanitizedConcept}" to a child aged ${ageRange} in Slovenian language.

Context: This is from a lesson called "${lesson?.title || "AI lesson"}".

Requirements:
- Write in SLOVENIAN language
- Use very simple words a child aged ${ageRange} would understand
- Use a fun analogy or real-world example
- Keep it to 3-4 short sentences maximum
- Be encouraging and positive
- Do not use any technical jargon without explaining it

Return ONLY the explanation text, nothing else.`

      const safePrompt = createSafePrompt(basePrompt, ageRange)

      const { text } = await generateText({
        model: "groq/llama-3.1-8b-instant",
        prompt: safePrompt,
      })

      // Validate
      const moderation = await validateAIResponse(text, "lesson-explain")
      if (!moderation.isAppropriate) {
        return NextResponse.json({
          explanation: `"${sanitizedConcept}" je pomemben pojem v svetu umetne inteligence. Pomeni, da se računalnik nauči nečesa novega iz podatkov, podobno kot se ti učiš iz knjig in izkušenj!`,
        })
      }

      return NextResponse.json({ explanation: text.trim() })
    } catch (error: any) {
      console.error("Error generating explanation:", error.message)
      return NextResponse.json({
        explanation: `"${sanitizedConcept}" je zanimiv pojem! To pomeni, da računalniki lahko delajo pametne stvari, podobno kot ljudje. Če želiš izvedeti več, preberi lekcijo še enkrat!`,
      })
    }
  } catch (error) {
    console.error("Error in explain API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
