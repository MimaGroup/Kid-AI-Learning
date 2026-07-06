import { type NextRequest, NextResponse } from "next/server"
import { createServiceRoleClient, createServerClient } from "@/lib/supabase/server"
import { generateText } from "ai"
import { createGroq } from "@ai-sdk/groq"
import { checkRateLimit, RATE_LIMITS, getRateLimitKey } from "@/lib/rate-limit"
import { validateAIResponse, createSafePrompt, sanitizeUserInput } from "@/lib/content-moderation"

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
})

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

    // Get lesson context including full content for better fallbacks
    const { data: lesson } = await supabase
      .from("course_lessons")
      .select("title, key_concepts, content")
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

    // Extract relevant context from the lesson content about this concept
    const lessonContent = lesson?.content || ""
    let conceptContext = ""
    if (lessonContent) {
      // Find paragraphs that mention the concept
      const paragraphs = lessonContent.split(/\n\n+/)
      const relevant = paragraphs.filter((p: string) =>
        p.toLowerCase().includes(sanitizedConcept.toLowerCase())
      )
      if (relevant.length > 0) {
        conceptContext = relevant.slice(0, 3).join("\n\n")
      }
    }

    try {
      const basePrompt = `Razloži pojem "${sanitizedConcept}" otroku staremu ${ageRange} let v slovenščini.

Kontekst: To je iz lekcije z naslovom "${lesson?.title || "AI lekcija"}".
${conceptContext ? `\nV lekciji je o tem pojmu napisano:\n${conceptContext}\n` : ""}
Zahteve:
- Piši v pravilni SLOVENŠČINI z vsemi diakritičnimi znaki (č, š, ž).
- Uporabi zelo preproste besede, ki jih razume otrok star ${ageRange} let.
- Uporabi zabavno primerjavo ali primer iz resničnega življenja.
- Napiši 3-4 kratke odstavke (vsak odstavek 1-2 stavka).
- Bodi vzpodbuden/a in pozitiven/a.
- Ne uporabljaj strokovnih izrazov brez razlage.
- KRITIČNA slovnična pravila:
  - Pravilne sklanjatve: "stvar" (ne "stvarico"), "žival" (ne "živalo").
  - Pravilne glagolske oblike.
  - Spolno nevtralne oblike: uporabi "naučil/a", "vedel/a" ipd.
  - Ne izmišljuj besed -- uporabi samo obstoječe slovenske besede.

Vrni SAMO razlago, brez ničesar drugega.`

      const safePrompt = createSafePrompt(basePrompt, ageRange)

      const { text } = await generateText({
        model: groq("llama-3.3-70b-versatile"),
        prompt: safePrompt,
      })

      // Validate
      const moderation = await validateAIResponse(text, "lesson-explain")
      if (!moderation.isAppropriate) {
        return NextResponse.json({
          explanation: generateFallbackExplanation(sanitizedConcept, lessonContent, lesson?.title || ""),
        })
      }

      return NextResponse.json({ explanation: text.trim() })
    } catch (error: any) {
      console.error("Error generating explanation:", error.message || error)
      // Generate a concept-specific fallback from the lesson content
      return NextResponse.json({
        explanation: generateFallbackExplanation(sanitizedConcept, lessonContent, lesson?.title || ""),
      })
    }
  } catch (error) {
    console.error("Error in explain API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

/**
 * Generate a meaningful fallback explanation from the lesson content
 * when AI generation fails. Extracts relevant sentences about the concept.
 */
function generateFallbackExplanation(concept: string, lessonContent: string, lessonTitle: string): string {
  const conceptLower = concept.toLowerCase()

  if (lessonContent) {
    // Strip markdown formatting
    const plainText = lessonContent
      .replace(/#{1,6}\s/g, "")
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/\*(.*?)\*/g, "$1")
      .replace(/\[.*?\]\(.*?\)/g, "")
      .replace(/^\s*[-*]\s/gm, "")
      .replace(/\|.*\|/g, "")
      .replace(/---+/g, "")

    // Split into sentences
    const sentences = plainText
      .split(/(?<=[.!?])\s+/)
      .map(s => s.trim())
      .filter(s => s.length > 10 && s.length < 300)

    // Find sentences that mention the concept
    const relevant = sentences.filter(s =>
      s.toLowerCase().includes(conceptLower)
    )

    if (relevant.length >= 2) {
      return `Kaj je "${concept}"?\n\n${relevant.slice(0, 3).join("\n\n")}\n\nPreberi lekcijo "${lessonTitle}" za več podrobnosti!`
    }

    if (relevant.length === 1) {
      return `Kaj je "${concept}"?\n\n${relevant[0]}\n\nTo je pomemben pojem iz lekcije "${lessonTitle}". Preberi lekcijo še enkrat, da izveš več!`
    }
  }

  // Concept-specific fallbacks based on common AI terms
  const conceptFallbacks: Record<string, string> = {
    "umetna inteligenca": `Kaj je umetna inteligenca?\n\nUmetna inteligenca (AI) je posebna vrsta računalniškega programa, ki se lahko uči iz podatkov in sprejema odločitve.\n\nPredstavljaj si pametnega pomočnika, ki se uči novih stvari -- tako kot ti! Ko vidi veliko primerov, se nauči prepoznavati vzorce.\n\nAI uporabljamo vsak dan -- v telefonih, igrah in na internetu.`,
    "podatki": `Kaj so podatki?\n\nPodatki so koščki informacij, ki jih zbiramo in shranjujemo.\n\nPredstavljaj si, da šteješ, koliko ptičkov vidiš vsak dan. Te številke so podatki! Računalniki uporabljajo podatke, da se učijo in delajo pametne stvari.\n\nVeč podatkov ko ima AI, bolje se nauči.`,
    "učenje": `Kaj je učenje?\n\nUčenje pomeni, da postopoma razumeš svet okoli sebe in postajaš v nečem boljši.\n\nPredstavljaj si, da se učiš igrati rokomet. Na začetku ti morda ne gre najbolje, ampak z vajo postajaš vedno boljši.\n\nPodobno se uči tudi umetna inteligenca -- z veliko primeri in vajo postopoma postaja boljša pri svojem delu.`,
    "inteligenca": `Kaj je inteligenca?\n\nInteligenca pomeni sposobnost razmišljanja, razumevanja in reševanja problemov.\n\nKo se učiš novih stvari, iščeš rešitve ali sprejemaš odločitve -- vse to je inteligenca!\n\nPri umetni inteligenci to pomeni, da računalniki izvajajo naloge, ki običajno zahtevajo človeško razmišljanje.`,
    "procesor": `Kaj je procesor?\n\nProcesor je "možgan" računalnika. Je čip, ki izvaja vse računske operacije.\n\nPredstavljaj si ga kot zelo, zelo hitrega računovodjo, ki lahko v eni sekundi naredi milijarde izračunov!\n\nBrez procesorja računalnik ne bi mogel delovati.`,
    "nevronska mreža": `Kaj je nevronska mreža?\n\nNevronska mreža je poseben računalniški program, ki posnema delovanje človeških možganov.\n\nTako kot tvoji možgani imajo nevrone (majhne celice), ki si pošiljajo sporočila, ima nevronska mreža umetne nevrone, ki skupaj rešujejo naloge.\n\nTo je eden najpomembnejših delov umetne inteligence!`,
    "strojno učenje": `Kaj je strojno učenje?\n\nStrojno učenje pomeni, da se računalnik uči sam iz primerov, brez da bi mu natančno povedali, kaj naj naredi.\n\nPredstavljaj si, da bi ti pokazali 100 slik mačk in 100 slik psov. Po ogledu vseh slik bi znal prepoznati, ali je na novi sliki mačka ali pes. Računalnik se uči na enak način!\n\nTo je kot čarovnija, ampak je pravzaprav matematika.`,
    "chatbot": `Kaj je chatbot?\n\nChatbot je AI program, s katerim se lahko pogovarjaš tako, da mu pišeš sporočila.\n\nPredstavljaj si dopisovanje s prijateljem, samo da je ta prijatelj računalniški program! Chatbot prebere tvoje sporočilo, ga razume in ti odgovori.\n\nChatboti so povsod -- na spletnih straneh, v aplikacijah in v pametnih zvočnikih.`,
    "prompt": `Kaj je prompt?\n\nPrompt je besedilo ali vprašanje, ki ga napišeš umetni inteligenci, da ji poveš, kaj želiš.\n\nPredstavljaj si, da naročaš v restavraciji -- bolj natančno ko poveš, kaj želiš, boljšo hrano dobiš. Enako velja za prompte!\n\nDober prompt je jasen, natančen in pove AI točno, kaj pričakuješ.`,
    "vzorci": `Kaj so vzorci?\n\nVzorci so stvari, ki se ponavljajo ali sledijo nekemu pravilu.\n\nPomisli na zebro -- njene črte so vzorec! Ali pa na uro -- minutni kazalec se vedno premika na enak način.\n\nAI je zelo dobra pri iskanju vzorcev v velikih količinah podatkov, kar ji pomaga napovedovati in razumeti stvari.`,
    "klasifikacija": `Kaj je klasifikacija?\n\nKlasifikacija pomeni razvrščanje stvari v skupine.\n\nPredstavljaj si, da imaš polno košaro sadja in ga razvrščaš: jabolka v eno skupino, banane v drugo, jagode v tretjo. To je klasifikacija!\n\nAI dela isto s podatki -- fotografije razvrsti po vsebini, sporočila razvrsti po jeziku in podobno.`,
  }

  if (conceptFallbacks[conceptLower]) {
    return conceptFallbacks[conceptLower]
  }

  // Generic but better structured fallback
  return `Kaj je "${concept}"?\n\nTo je pomemben pojem, ki ga spoznavaš v lekciji "${lessonTitle}".\n\n"${concept}" je del sveta umetne inteligence in ti pomaga razumeti, kako delujejo pametni računalniški programi.\n\nPreberi lekcijo še enkrat in bodi pozoren/na na dele, kjer je omenjen ta pojem!`
}
