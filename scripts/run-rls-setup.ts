// Script to execute all RLS policy setup scripts
// This will run all the SQL scripts we created to secure the database

import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function runRLSSetup() {
  console.log("[v0] Starting RLS setup...")

  try {
    // Step 1: Enable RLS on all tables
    console.log("[v0] Step 1: Enabling RLS on all tables...")
    const { error: enableError } = await supabase.rpc("exec_sql", {
      sql: `
        ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
        ALTER TABLE children ENABLE ROW LEVEL SECURITY;
        ALTER TABLE ai_friends ENABLE ROW LEVEL SECURITY;
        ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
        ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
      `,
    })
    if (enableError) {
      console.error("[v0] Error enabling RLS:", enableError)
    } else {
      console.log("[v0] ✓ RLS enabled on all tables")
    }

    // Step 2: Create profiles policies
    console.log("[v0] Step 2: Creating profiles policies...")
    const { error: profilesError } = await supabase.rpc("exec_sql", {
      sql: `
        CREATE POLICY IF NOT EXISTS "Users can view own profile"
        ON profiles FOR SELECT USING (auth.uid() = id);
        
        CREATE POLICY IF NOT EXISTS "Users can insert own profile"
        ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
        
        CREATE POLICY IF NOT EXISTS "Users can update own profile"
        ON profiles FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
      `,
    })
    if (profilesError) {
      console.error("[v0] Error creating profiles policies:", profilesError)
    } else {
      console.log("[v0] ✓ Profiles policies created")
    }

    // Step 3: Create children policies
    console.log("[v0] Step 3: Creating children policies...")
    const { error: childrenError } = await supabase.rpc("exec_sql", {
      sql: `
        CREATE POLICY IF NOT EXISTS "Parents can view own children"
        ON children FOR SELECT USING (auth.uid() = parent_id);
        
        CREATE POLICY IF NOT EXISTS "Parents can create children"
        ON children FOR INSERT WITH CHECK (auth.uid() = parent_id);
        
        CREATE POLICY IF NOT EXISTS "Parents can update own children"
        ON children FOR UPDATE USING (auth.uid() = parent_id) WITH CHECK (auth.uid() = parent_id);
        
        CREATE POLICY IF NOT EXISTS "Parents can delete own children"
        ON children FOR DELETE USING (auth.uid() = parent_id);
      `,
    })
    if (childrenError) {
      console.error("[v0] Error creating children policies:", childrenError)
    } else {
      console.log("[v0] ✓ Children policies created")
    }

    // Step 4: Create ai_friends policies
    console.log("[v0] Step 4: Creating AI friends policies...")
    const { error: aiFriendsError } = await supabase.rpc("exec_sql", {
      sql: `
        CREATE POLICY IF NOT EXISTS "Users can view own AI friends"
        ON ai_friends FOR SELECT USING (auth.uid() = user_id);
        
        CREATE POLICY IF NOT EXISTS "Users can create AI friends"
        ON ai_friends FOR INSERT WITH CHECK (auth.uid() = user_id);
        
        CREATE POLICY IF NOT EXISTS "Users can update own AI friends"
        ON ai_friends FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
        
        CREATE POLICY IF NOT EXISTS "Users can delete own AI friends"
        ON ai_friends FOR DELETE USING (auth.uid() = user_id);
      `,
    })
    if (aiFriendsError) {
      console.error("[v0] Error creating AI friends policies:", aiFriendsError)
    } else {
      console.log("[v0] ✓ AI friends policies created")
    }

    // Step 5: Create user_progress policies
    console.log("[v0] Step 5: Creating user progress policies...")
    const { error: progressError } = await supabase.rpc("exec_sql", {
      sql: `
        CREATE POLICY IF NOT EXISTS "Users can view own progress"
        ON user_progress FOR SELECT USING (auth.uid() = user_id);
        
        CREATE POLICY IF NOT EXISTS "Users can create progress records"
        ON user_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
        
        CREATE POLICY IF NOT EXISTS "Users can update own progress"
        ON user_progress FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
      `,
    })
    if (progressError) {
      console.error("[v0] Error creating progress policies:", progressError)
    } else {
      console.log("[v0] ✓ User progress policies created")
    }

    // Step 6: Create achievements policies
    console.log("[v0] Step 6: Creating achievements policies...")
    const { error: achievementsError } = await supabase.rpc("exec_sql", {
      sql: `
        CREATE POLICY IF NOT EXISTS "Users can view own achievements"
        ON achievements FOR SELECT USING (auth.uid() = user_id);
        
        CREATE POLICY IF NOT EXISTS "Users can earn achievements"
        ON achievements FOR INSERT WITH CHECK (auth.uid() = user_id);
      `,
    })
    if (achievementsError) {
      console.error("[v0] Error creating achievements policies:", achievementsError)
    } else {
      console.log("[v0] ✓ Achievements policies created")
    }

    // Step 7: Create profile trigger
    console.log("[v0] Step 7: Creating profile auto-creation trigger...")
    const { error: triggerError } = await supabase.rpc("exec_sql", {
      sql: `
        CREATE OR REPLACE FUNCTION public.handle_new_user()
        RETURNS trigger AS $$
        BEGIN
          INSERT INTO public.profiles (id, email, display_name, role, created_at, updated_at)
          VALUES (
            new.id,
            new.email,
            COALESCE(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)),
            COALESCE(new.raw_user_meta_data->>'role', 'parent'),
            now(),
            now()
          );
          RETURN new;
        END;
        $$ LANGUAGE plpgsql SECURITY DEFINER;

        DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
        CREATE TRIGGER on_auth_user_created
          AFTER INSERT ON auth.users
          FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
      `,
    })
    if (triggerError) {
      console.error("[v0] Error creating trigger:", triggerError)
    } else {
      console.log("[v0] ✓ Profile auto-creation trigger created")
    }

    console.log("[v0] ✅ RLS setup complete!")
    console.log("[v0] All tables are now secured with Row Level Security policies")
  } catch (error) {
    console.error("[v0] Fatal error during RLS setup:", error)
    throw error
  }
}

runRLSSetup()
