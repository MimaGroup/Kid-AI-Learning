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

    // Check for predefined explanation in key_concepts
    if (lesson?.key_concepts && Array.isArray(lesson.key_concepts)) {
      const conceptObj = lesson.key_concepts.find(
        (c: any) => typeof c === "object" && c.name === sanitizedConcept && c.explanation
      )
      if (conceptObj) {
        return NextResponse.json({ explanation: conceptObj.explanation })
      }
    }

    const ageRange = course ? `${course.age_min}-${course.age_max}` : "8-12"

    try {
      const basePrompt = `Razloži pojem "${sanitizedConcept}" otroku staremu ${ageRange} let v slovenščini.

Kontekst: To je iz lekcije z naslovom "${lesson?.title || "AI lekcija"}".

Zahteve:
- Piši v pravilni SLOVENŠČINI z vsemi diakritičnimi znaki (č, š, ž).
- Uporabi zelo preproste besede, ki jih razume otrok star ${ageRange} let.
- Uporabi zabavno primerjavo ali primer iz resničnega življenja.
- Napiši 3--4 kratke stavke.
- Bodi vzpodbuden/a in pozitiven/a.
- Ne uporabljaj strokovnih izrazov brez razlage.
- KRITIČNA slovnična pravila:
  - Pravilne sklanjatve: "stvar" (ne "stvarico"), "žival" (ne "živalo"), "očala" (ne "očarlja").
  - Pravilne glagolske oblike: "zdijo" (ne "zdelajo"), "igralec" (ne "igranec").
  - Spolno nevtralne oblike: uporabi "naučil/a", "vedel/a" ipd.
  - Ne izmišljuj besed -- uporabi samo obstoječe slovenske besede.

Vrni SAMO razlago, brez ničesar drugega.`

      const safePrompt = createSafePrompt(basePrompt, ageRange)

      const { text } = await generateText({
        model: "groq/llama-3.1-8b-instant",
        prompt: safePrompt,
      })

      // Validate
      const moderation = await validateAIResponse(text, "lesson-explain")
      if (!moderation.isAppropriate) {
        return NextResponse.json({
          explanation: `"${sanitizedConcept}" je pomemben pojem v svetu umetne inteligence. Pomeni, da se računalnik nauči nečesa novega iz podatkov, podobno kot se ti učiš iz knjig in izkušenj.`,
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
