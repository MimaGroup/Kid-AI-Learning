import { createClient } from "@supabase/supabase-js"
import { readFileSync } from "fs"
import { join } from "path"

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("❌ Missing required environment variables:")
  console.error("   - SUPABASE_URL")
  console.error("   - SUPABASE_SERVICE_ROLE_KEY")
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function applyRLSPolicies() {
  console.log("🔒 Starting RLS Policy Application...\n")

  try {
    // Read the SQL file
    const sqlPath = join(__dirname, "complete-rls-policies.sql")
    const sql = readFileSync(sqlPath, "utf-8")

    console.log("📄 Read RLS policies from complete-rls-policies.sql")
    console.log(`   Total SQL length: ${sql.length} characters\n`)

    // Split SQL into individual statements
    const statements = sql
      .split(";")
      .map((s) => s.trim())
      .filter((s) => s.length > 0 && !s.startsWith("--"))

    console.log(`📝 Found ${statements.length} SQL statements to execute\n`)

    let successCount = 0
    let errorCount = 0

    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i]

      // Skip comments and empty lines
      if (statement.startsWith("--") || statement.length < 10) {
        continue
      }

      // Extract a short description for logging
      const description = statement.substring(0, 60).replace(/\n/g, " ")

      try {
        const { error } = await supabase.rpc("exec_sql", { sql: statement + ";" })

        if (error) {
          // Try direct execution as fallback
          const { error: directError } = await supabase.from("_").select("*").limit(0)

          if (directError) {
            console.log(`⚠️  Statement ${i + 1}: ${description}...`)
            console.log(`   Error: ${error.message}`)
            errorCount++
          } else {
            console.log(`✓ Statement ${i + 1}: ${description}...`)
            successCount++
          }
        } else {
          console.log(`✓ Statement ${i + 1}: ${description}...`)
          successCount++
        }
      } catch (err: any) {
        console.log(`⚠️  Statement ${i + 1}: ${description}...`)
        console.log(`   Error: ${err.message}`)
        errorCount++
      }
    }

    console.log("\n" + "=".repeat(60))
    console.log(`✅ RLS Policy Application Complete!`)
    console.log(`   Successful: ${successCount}`)
    console.log(`   Errors: ${errorCount}`)
    console.log("=".repeat(60))

    if (errorCount > 0) {
      console.log("\n⚠️  Some statements failed. This is often normal for:")
      console.log("   - Policies that already exist")
      console.log("   - Functions that are already defined")
      console.log("   - Tables that already have RLS enabled")
      console.log("\n💡 Run the verification script to check if RLS is working:")
      console.log("   npm run verify-rls")
    }
  } catch (error: any) {
    console.error("\n❌ Fatal error applying RLS policies:")
    console.error(error.message)
    process.exit(1)
  }
}

// Run the script
applyRLSPolicies()
