import { NextResponse } from "next/server"
import { Resend } from "resend"
import { Redis } from "@upstash/redis"
import { getWelcomeEmail } from "@/lib/emails/welcome-sequence"
import { getScheduledTime, type WelcomeEmailStep, type EmailSequenceJob } from "@/lib/email-sequences"

// Lazy initialization to avoid build-time errors when env vars aren't available
let resendInstance: Resend | null = null
function getResend() {
  if (!resendInstance) {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      throw new Error("RESEND_API_KEY environment variable is not set")
    }
    resendInstance = new Resend(apiKey)
  }
  return resendInstance
}

// Lazy initialization for Redis
let redisInstance: Redis | null = null
function getRedis() {
  if (!redisInstance) {
    redisInstance = new Redis({
      url: process.env["UPSTASH-KV_KV_REST_API_URL"] || "",
      token: process.env["UPSTASH-KV_KV_REST_API_TOKEN"] || "",
    })
  }
  return redisInstance
}

const EMAIL_QUEUE_KEY = "email:welcome:queue"
const FROM_EMAIL = "KidsLearnAI <hello@kids-learning-ai.com>"

export async function POST(request: Request) {
  try {
    const { email, firstName } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    const name = firstName || "starš"
    const registrationTime = Date.now()

    // Send Email 1 immediately
    const email1 = getWelcomeEmail(1)
    const resend = getResend()
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [email],
      subject: email1.subject,
      html: email1.html,
    })

    if (error) {
      console.error("[v0] Failed to send welcome email 1:", error)
      return NextResponse.json({ error: "Failed to send welcome email" }, { status: 500 })
    }

    console.log(`[v0] Welcome email 1 sent to ${email}, messageId: ${data?.id}`)

    // Schedule emails 2-5 in Redis
    const emailSteps: WelcomeEmailStep[] = [2, 3, 4, 5]
    const redis = getRedis()
    
    for (const step of emailSteps) {
      const scheduledFor = getScheduledTime(step, registrationTime)
      const job: EmailSequenceJob = {
        email,
        firstName: name,
        step,
        scheduledFor,
      }

      // Store in Redis sorted set with score = scheduledFor timestamp
      await redis.zadd(EMAIL_QUEUE_KEY, {
        score: scheduledFor,
        member: JSON.stringify(job),
      })

      console.log(`[v0] Scheduled welcome email ${step} for ${email} at ${new Date(scheduledFor).toISOString()}`)
    }

    return NextResponse.json({
      success: true,
      message: "Welcome sequence started",
      email1MessageId: data?.id,
      scheduledEmails: [2, 3, 4, 5],
    })
  } catch (error) {
    console.error("[v0] Welcome email API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// GET endpoint to process scheduled emails (called by cron job)
export async function GET(request: Request) {
  // Verify this is a cron request (optional security check)
  const authHeader = request.headers.get("authorization")
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    // Allow in development or if no CRON_SECRET is set
    if (process.env.NODE_ENV === "production" && process.env.CRON_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
  }

  try {
    const now = Date.now()
    const redis = getRedis()
    const resend = getResend()
    
    // Get all emails that should be sent now (score <= now)
    const jobs = await redis.zrangebyscore(EMAIL_QUEUE_KEY, 0, now) as string[]

    if (jobs.length === 0) {
      return NextResponse.json({ message: "No emails to send", processed: 0 })
    }

    let successCount = 0
    let failCount = 0

    for (const jobStr of jobs) {
      try {
        const job: EmailSequenceJob = JSON.parse(jobStr)
        const emailContent = getWelcomeEmail(job.step)

        const { data, error } = await resend.emails.send({
          from: FROM_EMAIL,
          to: [job.email],
          subject: emailContent.subject,
          html: emailContent.html,
        })

        if (error) {
          console.error(`[v0] Failed to send email ${job.step} to ${job.email}:`, error)
          failCount++
        } else {
          console.log(`[v0] Sent welcome email ${job.step} to ${job.email}, messageId: ${data?.id}`)
          successCount++
        }

        // Remove from queue regardless of success/failure to prevent infinite retries
        await redis.zrem(EMAIL_QUEUE_KEY, jobStr)
      } catch (parseError) {
        console.error("[v0] Failed to parse job:", parseError)
        // Remove invalid job
        await redis.zrem(EMAIL_QUEUE_KEY, jobStr)
        failCount++
      }
    }

    return NextResponse.json({
      message: "Email processing complete",
      processed: jobs.length,
      success: successCount,
      failed: failCount,
    })
  } catch (error) {
    console.error("[v0] Email cron error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
