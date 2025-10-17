import { z } from "zod"

export const childProfileSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(50, "Name must be less than 50 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Name can only contain letters, spaces, hyphens, and apostrophes"),
  age: z.number().int().min(3, "Age must be at least 3").max(18, "Age must be at most 18"),
  avatar_color: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, "Invalid color format")
    .optional(),
  learning_level: z.enum(["beginner", "intermediate", "advanced"]).optional(),
})

export const progressSchema = z.object({
  child_id: z.string().uuid("Invalid child ID"),
  activity_id: z.string().min(1, "Activity ID is required"),
  activity_type: z.enum(["game", "quiz", "story", "challenge"]),
  score: z.number().int().min(0).max(100).optional(),
  time_spent: z.number().int().min(0).optional(),
  completed: z.boolean(),
})

export const emailSchema = z.object({
  email: z.string().email("Invalid email address"),
})

export const passwordSchema = z.object({
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
})

export function sanitizeString(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, "") // Remove potential HTML tags
    .slice(0, 1000) // Limit length
}

export function sanitizeHtml(input: string): string {
  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;")
}

export function validateInput<T>(
  schema: z.ZodSchema<T>,
  data: unknown,
): { success: true; data: T } | { success: false; error: string } {
  try {
    const validated = schema.parse(data)
    return { success: true, data: validated }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0].message }
    }
    return { success: false, error: "Validation failed" }
  }
}
