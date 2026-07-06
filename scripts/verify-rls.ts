import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("❌ Missing required environment variables")
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function verifyRLS() {
  console.log("🔍 Verifying RLS Configuration...\n")

  try {
    // Check RLS is enabled on all tables
    const { data: tables, error: tablesError } = await supabase
      .from("pg_tables")
      .select("tablename, rowsecurity")
      .eq("schemaname", "public")
      .order("tablename")

    if (tablesError) {
      console.error("❌ Error checking tables:", tablesError.message)
      return
    }

    console.log("📊 RLS Status by Table:")
    console.log("─".repeat(60))

    let enabledCount = 0
    let disabledCount = 0

    tables?.forEach((table: any) => {
      const status = table.rowsecurity ? "✓ Enabled" : "✗ DISABLED"
      const icon = table.rowsecurity ? "🟢" : "🔴"
      console.log(`${icon} ${table.tablename.padEnd(30)} ${status}`)

      if (table.rowsecurity) {
        enabledCount++
      } else {
        disabledCount++
      }
    })

    console.log("─".repeat(60))
    console.log(`Total: ${enabledCount} enabled, ${disabledCount} disabled\n`)

    // Count policies per table
    const { data: policies, error: policiesError } = await supabase
      .from("pg_policies")
      .select("tablename, policyname")
      .eq("schemaname", "public")

    if (policiesError) {
      console.error("❌ Error checking policies:", policiesError.message)
      return
    }

    const policyCount = new Map<string, number>()
    policies?.forEach((policy: any) => {
      policyCount.set(policy.tablename, (policyCount.get(policy.tablename) || 0) + 1)
    })

    console.log("📋 Policy Count by Table:")
    console.log("─".repeat(60))

    let totalPolicies = 0
    Array.from(policyCount.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .forEach(([table, count]) => {
        console.log(`   ${table.padEnd(30)} ${count} policies`)
        totalPolicies += count
      })

    console.log("─".repeat(60))
    console.log(`Total: ${totalPolicies} policies across ${policyCount.size} tables\n`)

    // Summary
    console.log("=".repeat(60))
    if (disabledCount === 0 && totalPolicies > 50) {
      console.log("✅ RLS Configuration looks good!")
      console.log("   All tables have RLS enabled")
      console.log(`   ${totalPolicies} policies are in place`)
    } else {
      console.log("⚠️  RLS Configuration needs attention:")
      if (disabledCount > 0) {
        console.log(`   - ${disabledCount} tables still need RLS enabled`)
      }
      if (totalPolicies < 50) {
        console.log(`   - Only ${totalPolicies} policies found (expected 60+)`)
      }
    }
    console.log("=".repeat(60))
  } catch (error: any) {
    console.error("\n❌ Error verifying RLS:")
    console.error(error.message)
  }
}

verifyRLS()
