import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { createClient as createAdminClient } from "@supabase/supabase-js"
import { sendSequenceEmail, getNextSendTime, type EmailStep } from "@/lib/email/sequence"

export const dynamic = "force-dynamic"

// Create Supabase admin client for inserting records
function getSupabaseAdmin() {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Missing Supabase environment variables")
  }
  
  return createAdminClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    
    // Parse request body (optional - can include additional data)
    let body: { email?: string } = {}
    try {
      body = await request.json()
    } catch {
      // Body is optional
    }
    
    const email = body.email || user.email
    
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }
    
    const supabaseAdmin = getSupabaseAdmin()
    const now = new Date()
    
    // Check if user already has an active email sequence
    const { data: existingSequence, error: checkError } = await supabaseAdmin
      .from("email_sequence")
      .select("id, completed")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .single()
    
    if (checkError && checkError.code !== "PGRST116") {
      // PGRST116 = no rows returned (which is fine)
      console.error("[v0] Error checking existing sequence:", checkError)
    }
    
    if (existingSequence && !existingSequence.completed) {
      return NextResponse.json({ 
        success: true, 
        message: "Email sequence already active",
        sequenceId: existingSequence.id,
      })
    }
    
    // Calculate next send time for email 2 (email 1 is sent immediately)
    const nextSendAt = getNextSendTime(2, now)
    
    // Insert new email sequence record
    const { data: newSequence, error: insertError } = await supabaseAdmin
      .from("email_sequence")
      .insert({
        user_id: user.id,
        email: email,
        trial_started_at: now.toISOString(),
        last_email_sent: 0, // Will be updated to 1 after sending
        next_send_at: now.toISOString(), // Email 1 sends immediately
        completed: false,
      })
      .select()
      .single()
    
    if (insertError) {
      console.error("[v0] Error inserting email sequence:", insertError)
      return NextResponse.json({ 
        error: "Failed to start email sequence",
        details: insertError.message,
      }, { status: 500 })
    }
    
    // Send Email 1 immediately
    const sendResult = await sendSequenceEmail(email, 1)
    
    if (sendResult.success) {
      // Update record to reflect email 1 was sent and set next send time for email 2
      await supabaseAdmin
        .from("email_sequence")
        .update({
          last_email_sent: 1,
          next_send_at: nextSendAt.toISOString(),
        })
        .eq("id", newSequence.id)
      
      // Log to email_log (best effort)
      try {
        await supabaseAdmin.from("email_log").insert({
          user_id: user.id,
          email_type: "trial_sequence_1",
          recipient_email: email,
          subject: "Dobrodošli v KidsLearnAI!",
          status: "sent",
          metadata: {
            sequence_id: newSequence.id,
            step: 1,
            trial_started_at: now.toISOString(),
            sent_at: now.toISOString(),
          },
        })
      } catch {
        // Best effort logging
      }
      
      console.log(`[v0] Trial started for ${email}, email 1 sent, sequence ID: ${newSequence.id}`)
      
      return NextResponse.json({
        success: true,
        message: "Trial started, welcome email sent",
        sequenceId: newSequence.id,
        nextEmailAt: nextSendAt.toISOString(),
      })
    } else {
      console.error(`[v0] Failed to send welcome email to ${email}:`, sendResult.error)
      
      // Still return success - the sequence is created, cron will retry
      return NextResponse.json({
        success: true,
        message: "Trial started, welcome email pending",
        sequenceId: newSequence.id,
        warning: "Initial email could not be sent, will be retried by cron",
      })
    }
  } catch (error) {
    console.error("[v0] Trial start error:", error)
    return NextResponse.json({ 
      error: "Internal server error",
      details: error instanceof Error ? error.message : "Unknown error",
    }, { status: 500 })
  }
}

// GET endpoint to check trial status
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    
    const supabaseAdmin = getSupabaseAdmin()
    
    const { data: sequence, error: fetchError } = await supabaseAdmin
      .from("email_sequence")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .single()
    
    if (fetchError) {
      if (fetchError.code === "PGRST116") {
        return NextResponse.json({ hasActiveTrial: false })
      }
      console.error("[v0] Error fetching trial status:", fetchError)
      return NextResponse.json({ error: "Database error" }, { status: 500 })
    }
    
    const trialStartedAt = new Date(sequence.trial_started_at)
    const trialEndDate = new Date(trialStartedAt.getTime() + 7 * 24 * 60 * 60 * 1000)
    const now = new Date()
    const isTrialActive = now < trialEndDate
    
    return NextResponse.json({
      hasActiveTrial: isTrialActive && !sequence.completed,
      trialStartedAt: sequence.trial_started_at,
      trialEndsAt: trialEndDate.toISOString(),
      emailStep: sequence.last_email_sent,
      sequenceCompleted: sequence.completed,
    })
  } catch (error) {
    console.error("[v0] Trial status error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
