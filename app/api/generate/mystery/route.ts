import { NextResponse } from "next/server"
import Anthropic from "@anthropic-ai/sdk"
import { checkRateLimit, RATE_LIMITS, getRateLimitKey } from "@/lib/rate-limit"
import { createClient } from "@/lib/supabase/server"
import { validateAIResponse, sanitizeUserInput, createSafePrompt } from "@/lib/content-moderation"

export const dynamic = "force-dynamic"

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const FALLBACK_MYSTERIES = [
  {
    title: "Primer izginule malice",
    description:
      "Nekomu je iz jedilnice izginila malica! Sendvič je bil na mizi ob poldnevu, do 12.30 pa je izginil. Ali lahko ugotoviš, kaj se je zgodilo?",
    clues: [
      "Od mize za malico do vrat na igrišče vodijo drobtine",
      "Učenec je okoli 12.15 videl veverico blizu odprtega okna",
      "Vrečka za malico je bila najdena zunaj, prazna, a ne raztrgana",
    ],
    solution:
      "Prebrisana veverica je prišla skozi odprto okno in odnesla sendvič! Drobtine kažejo njeno pot, vrečko pa je previdno odprla, ne da bi jo poškodovala.",
  },
  {
    title: "Skrivnost zamenjanih nahrbtnikov",
    description:
      "Dva učenca sta pomotoma domov odnesla identična nahrbtnika drug drugega. Kako lahko ugotovimo, kateri nahrbtnik je čigav?",
    clues: [
      "V enem nahrbtniku je učbenik za matematiko z napisom 'Učilnica 204'",
      "V drugem nahrbtniku je dovolilnica, ki jo je podpisala 'ga. Kovač'",
      "Šolski imenik pokaže, da ga. Kovač poučuje v učilnici 204",
    ],
    solution:
      "Oba nahrbtnika pripadata učencema iz učilnice 204! S primerjavo razrednega seznama in imen na dovolilnici ter učbeniku lahko vsak nahrbtnik vrnemo pravemu lastniku.",
  },
  {
    title: "Uganka premečene knjižnice",
    description:
      "Šolska knjižničarka je prišla in ugotovila, da so vse knjige čez noč skrivnostno premečene. Kdo bi lahko to naredil in zakaj?",
    clues: [
      "Knjige so zdaj razvrščene po barvi namesto po predmetu",
      "Na mizi je bilo zahvalno voščilo, podpisano z 'Likovni krožek'",
      "Likovna učiteljica je omenila, da bi rada fotografirala pisane razstave knjig",
    ],
    solution:
      "Likovni krožek je knjige razvrstil po barvi, da bi za svoj fotografski projekt ustvaril čudovito mavrično razstavo! Pustili so voščilo z razlago in nameravali vse pospraviti nazaj.",
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
        message: `Preveč zahtev! Počakaj ${rateLimitResult.resetIn} sekund, preden ustvariš nove skrivnosti. Medtem uživaj v tej vnaprej pripravljeni skrivnosti!`,
      })
    }

    let retryCount = 0
    const maxRetries = 2

    while (retryCount < maxRetries) {
      try {
        const basePrompt = `Create a fun detective mystery case for kids aged 5-12 with a ${sanitizedTheme} theme at ${difficulty} difficulty.

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
- Write ALL text (title, description, clues, solution) in Slovenian language — this is mandatory
- Mystery should be age-appropriate and non-scary
- Clues should progressively reveal the solution
- Solution should be logical and satisfying
- Use kid-friendly language
- Make it educational but fun
- No violence or scary content

Return ONLY the JSON object, no additional text.`

        const safePrompt = createSafePrompt(basePrompt)

        const response = await anthropic.messages.create({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 800,
          messages: [{ role: "user", content: safePrompt }],
        })

        const text = (response.content[0] as { type: string; text: string }).text

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
            message: "Uporabljamo vnaprej pripravljeno skrivnost, da zagotovimo starosti primerno vsebino!",
          })
        }

        return NextResponse.json({ mystery })
      } catch (aiError: any) {
        if (aiError?.status === 429 && retryCount < maxRetries - 1) {
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
