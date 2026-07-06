import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if user is admin
    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

    if (profile?.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const contentId = searchParams.get("contentId")

    let query = supabase.from("content_validations").select("*").order("validated_at", { ascending: false })

    if (contentId) {
      query = query.eq("content_id", contentId)
    }

    const { data: validations, error } = await query.limit(100)

    if (error) throw error

    return NextResponse.json({ validations })
  } catch (error) {
    console.error("Error fetching content validations:", error)
    return NextResponse.json({ error: "Failed to fetch content validations" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if user is admin
    const { data: profile } = await supabase.from("profiles").select("role, email").eq("id", user.id).single()

    if (profile?.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const body = await request.json()
    const {
      contentId,
      contentType,
      status,
      functionalityScore,
      educationalScore,
      technicalScore,
      uxScore,
      notes,
      issues,
    } = body

    const overallScore = Math.round((functionalityScore + educationalScore + technicalScore + uxScore) / 4)

    const { data: validation, error } = await supabase
      .from("content_validations")
      .insert({
        content_id: contentId,
        content_type: contentType,
        validator_email: profile.email,
        status,
        functionality_score: functionalityScore,
        educational_score: educationalScore,
        technical_score: technicalScore,
        ux_score: uxScore,
        overall_score: overallScore,
        notes,
        issues: issues || [],
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ validation })
  } catch (error) {
    console.error("Error creating content validation:", error)
    return NextResponse.json({ error: "Failed to create content validation" }, { status: 500 })
  }
}
