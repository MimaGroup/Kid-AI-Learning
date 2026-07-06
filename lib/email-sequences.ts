// Welcome email sequence timing (in milliseconds)
export const WELCOME_SEQUENCE_DELAYS = {
  email1: 0, // immediately on signup
  email2: 3 * 24 * 60 * 60 * 1000, // day 3
  email3: 5 * 24 * 60 * 60 * 1000, // day 5
  email4: 6 * 24 * 60 * 60 * 1000, // day 6
  email5: 7 * 24 * 60 * 60 * 1000, // day 7
} as const

// Email sequence types
export type WelcomeEmailStep = 1 | 2 | 3 | 4 | 5

export interface EmailSequenceJob {
  email: string
  firstName: string
  step: WelcomeEmailStep
  scheduledFor: number // timestamp
  userId?: string
}

// Calculate scheduled time for each email
export function getScheduledTime(step: WelcomeEmailStep, registrationTime: number = Date.now()): number {
  const delays: Record<WelcomeEmailStep, number> = {
    1: WELCOME_SEQUENCE_DELAYS.email1,
    2: WELCOME_SEQUENCE_DELAYS.email2,
    3: WELCOME_SEQUENCE_DELAYS.email3,
    4: WELCOME_SEQUENCE_DELAYS.email4,
    5: WELCOME_SEQUENCE_DELAYS.email5,
  }
  return registrationTime + delays[step]
}
