import { createServiceRoleClient } from "@/lib/supabase/server"

// Inappropriate content patterns for children's platform
const INAPPROPRIATE_PATTERNS = [
  // Violence and weapons
  /\b(kill|murder|weapon|gun|knife|blood|violence|attack|fight|hurt|harm)\b/gi,
  // Adult content
  /\b(sex|sexual|porn|nude|naked|adult)\b/gi,
  // Drugs and alcohol
  /\b(drug|alcohol|beer|wine|cigarette|smoke|vape|marijuana|weed)\b/gi,
  // Profanity (basic list - expand as needed)
  /\b(damn|hell|crap|stupid|idiot|dumb|hate)\b/gi,
  // Personal information requests
  /\b(address|phone number|credit card|password|social security)\b/gi,
  // Bullying and negative content
  /\b(bully|loser|ugly|fat|stupid|worthless)\b/gi,
]

// Age-appropriate replacement suggestions
const CONTENT_REPLACEMENTS: Record<string, string> = {
  kill: "stop",
  murder: "mystery",
  weapon: "tool",
  fight: "compete",
  hurt: "challenge",
  stupid: "silly",
  idiot: "friend",
  dumb: "confused",
  hate: "dislike",
  loser: "learner",
}

export interface ModerationResult {
  isAppropriate: boolean
  flaggedContent: string[]
  sanitizedContent?: string
  severity: "safe" | "warning" | "blocked"
  reason?: string
}

/**
 * Moderates content for age-appropriateness (8-12 years old)
 */
export async function moderateContent(content: string, context?: string): Promise<ModerationResult> {
  const flaggedContent: string[] = []
  let sanitizedContent = content
  let severity: "safe" | "warning" | "blocked" = "safe"

  // Check for inappropriate patterns
  for (const pattern of INAPPROPRIATE_PATTERNS) {
    const matches = content.match(pattern)
    if (matches) {
      flaggedContent.push(...matches)

      // Try to sanitize by replacing with appropriate alternatives
      for (const match of matches) {
        const lowerMatch = match.toLowerCase()
        if (CONTENT_REPLACEMENTS[lowerMatch]) {
          sanitizedContent = sanitizedContent.replace(new RegExp(match, "gi"), CONTENT_REPLACEMENTS[lowerMatch])
          severity = "warning"
        } else {
          severity = "blocked"
        }
      }
    }
  }

  // Log flagged content for review
  if (flaggedContent.length > 0) {
    await logContentFlag(content, flaggedContent, context)
  }

  return {
    isAppropriate: severity !== "blocked",
    flaggedContent: [...new Set(flaggedContent)], // Remove duplicates
    sanitizedContent: severity === "warning" ? sanitizedContent : undefined,
    severity,
    reason: severity === "blocked" ? "Content contains inappropriate language for children" : undefined,
  }
}

/**
 * Validates AI-generated content before sending to users
 */
export async function validateAIResponse(response: string, endpoint: string): Promise<ModerationResult> {
  const moderation = await moderateContent(response, `AI Response from ${endpoint}`)

  // Additional checks for AI responses
  if (response.length > 1000) {
    return {
      isAppropriate: false,
      flaggedContent: ["Response too long"],
      severity: "blocked",
      reason: "AI response exceeds maximum length for children",
    }
  }

  // Check for personal information patterns
  const personalInfoPatterns = [
    /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g, // Phone numbers
    /\b\d{3}[-]?\d{2}[-]?\d{4}\b/g, // SSN
    /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, // Email
  ]

  for (const pattern of personalInfoPatterns) {
    if (pattern.test(response)) {
      return {
        isAppropriate: false,
        flaggedContent: ["Personal information detected"],
        severity: "blocked",
        reason: "AI response contains personal information patterns",
      }
    }
  }

  return moderation
}

/**
 * Logs flagged content to database for admin review
 */
async function logContentFlag(content: string, flaggedWords: string[], context?: string) {
  try {
    const supabase = await createServiceRoleClient()

    await supabase.from("content_validations").insert({
      content_type: "ai_generated",
      content: content.substring(0, 500), // Store first 500 chars
      validation_status: "flagged",
      flagged_reasons: flaggedWords,
      context: context || "Unknown",
      reviewed: false,
    })

    console.log("[v0] Content flagged for review:", flaggedWords.join(", "))
  } catch (error) {
    console.error("[v0] Error logging content flag:", error)
    // Don't throw - logging failure shouldn't break the app
  }
}

/**
 * Enhanced prompt wrapper that adds safety instructions
 */
export function createSafePrompt(userPrompt: string, ageRange = "8-12"): string {
  return `${userPrompt}

CRITICAL SAFETY REQUIREMENTS:
- Content MUST be appropriate for children aged ${ageRange}
- Use simple, positive, encouraging language
- NO violence, weapons, scary content, or adult themes
- NO personal information requests (address, phone, etc.)
- NO negative or bullying language
- Focus on education, creativity, and fun
- Be supportive and build confidence
- If unsure, err on the side of being more child-friendly

Remember: This content will be shown to children. Safety is the top priority.`
}

/**
 * Sanitizes user input before sending to AI
 */
export function sanitizeUserInput(input: string): string {
  // Remove potential prompt injection attempts
  let sanitized = input
    .replace(/system:|assistant:|user:/gi, "") // Remove role markers
    .replace(/```/g, "") // Remove code blocks
    .replace(/<script>/gi, "") // Remove script tags
    .trim()

  // Limit length
  if (sanitized.length > 500) {
    sanitized = sanitized.substring(0, 500)
  }

  return sanitized
}
