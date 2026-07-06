import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { sendSequenceEmail, getNextSendTime, type EmailStep } from "@/lib/email/sequence"

export const dynamic = "force-dynamic"
export const maxDuration = 60 // Allow up to 60 seconds for processing

// Create Supabase client with service role for cron job
function getSupabaseAdmin() {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Missing Supabase environment variables")
  }
  
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

export async function GET(request: NextRequest) {
  // Verify the request is from Vercel Cron
  const authHeader = request.headers.get("authorization")
  const cronSecret = process.env.CRON_SECRET
  
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    console.error("[v0] Unauthorized cron request")
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  
  try {
    const supabase = getSupabaseAdmin()
    const now = new Date()
    
    // Query users where next_send_at <= now and completed = false
    const { data: pendingEmails, error: fetchError } = await supabase
      .from("email_sequence")
      .select("*")
      .lte("next_send_at", now.toISOString())
      .eq("completed", false)
      .order("next_send_at", { ascending: true })
      .limit(100) // Process max 100 per run to avoid timeouts
    
    if (fetchError) {
      console.error("[v0] Error fetching pending emails:", fetchError)
      return NextResponse.json({ error: "Database error", details: fetchError.message }, { status: 500 })
    }
    
    if (!pendingEmails || pendingEmails.length === 0) {
      return NextResponse.json({ 
        success: true, 
        message: "No emails to send", 
        processed: 0 
      })
    }
    
    console.log(`[v0] Processing ${pendingEmails.length} pending email(s)`)
    
    let successCount = 0
    let failCount = 0
    const results: Array<{ email: string; step: number; status: string }> = []
    
    for (const record of pendingEmails) {
      const nextStep = (record.last_email_sent + 1) as EmailStep
      
      // Validate step is within range
      if (nextStep < 1 || nextStep > 5) {
        console.error(`[v0] Invalid step ${nextStep} for user ${record.email}`)
        failCount++
        results.push({ email: record.email, step: nextStep, status: "invalid_step" })
        continue
      }
      
      // Send the email
      const trialStartedAt = new Date(record.trial_started_at)
      const sendResult = await sendSequenceEmail(record.email, nextStep, trialStartedAt)
      
      if (sendResult.success) {
        successCount++
        results.push({ email: record.email, step: nextStep, status: "sent" })
        
        // Determine if sequence is completed
        const isCompleted = nextStep >= 5
        
        // Calculate next send time (if not completed)
        let nextSendAt: Date | null = null
        if (!isCompleted) {
          const futureStep = (nextStep + 1) as EmailStep
          nextSendAt = getNextSendTime(futureStep, trialStartedAt)
        }
        
        // Update the record
        const { error: updateError } = await supabase
          .from("email_sequence")
          .update({
            last_email_sent: nextStep,
            next_send_at: nextSendAt?.toISOString() || null,
            completed: isCompleted,
          })
          .eq("id", record.id)
        
        if (updateError) {
          console.error(`[v0] Error updating record for ${record.email}:`, updateError)
        }
        
        // Log to email_log table (best effort)
        try {
          await supabase.from("email_log").insert({
            user_id: record.user_id,
            email_type: `trial_sequence_${nextStep}`,
            recipient_email: record.email,
            subject: `Trial Sequence Email ${nextStep}`,
            status: "sent",
            metadata: {
              sequence_id: record.id,
              step: nextStep,
              trial_started_at: record.trial_started_at,
              sent_at: now.toISOString(),
            },
          })
        } catch {
          // email_log insert is best-effort
        }
      } else {
        failCount++
        results.push({ email: record.email, step: nextStep, status: "failed" })
        console.error(`[v0] Failed to send email ${nextStep} to ${record.email}:`, sendResult.error)
      }
    }
    
    console.log(`[v0] Email sequence cron completed: ${successCount} sent, ${failCount} failed`)
    
    return NextResponse.json({
      success: true,
      summary: {
        processed: pendingEmails.length,
        sent: successCount,
        failed: failCount,
      },
      results,
    })
  } catch (error) {
    console.error("[v0] Email sequence cron error:", error)
    return NextResponse.json({ 
      error: "Internal server error",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
}
