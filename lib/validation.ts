import { z } from "zod"

export const childProfileSchema = z.object({
  name: z.string().min(1, "Name is required").max(50, "Name must be less than 50 characters"),
  age: z.number().int().min(3, "Age must be at least 3").max(18, "Age must be less than 18"),
  avatar_color: z.string().optional(),
  learning_level: z.enum(["beginner", "intermediate", "advanced"]).optional(),
})

export type ChildProfileInput = z.infer<typeof childProfileSchema>

export function validateInput<T>(
  schema: z.ZodSchema<T>,
  data: unknown,
): { success: true; data: T } | { success: false; error: string } {
  try {
    const validated = schema.parse(data)
    return { success: true, data: validated }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstError = error.issues[0]
      return { success: false, error: firstError.message }
    }
    return { success: false, error: "Validation failed" }
  }
}

export function sanitizeString(input: string): string {
  if (typeof input !== "string") return ""

  // Remove any HTML tags
  let sanitized = input.replace(/<[^>]*>/g, "")

  // Remove any script tags and their content
  sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")

  // Trim whitespace
  sanitized = sanitized.trim()

  return sanitized
}
