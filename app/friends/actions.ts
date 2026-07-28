'use server'

import { createServerClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

function generateSecretKey(): string {
  return Array.from({ length: 8 }, () =>
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'[Math.floor(Math.random() * 36)]
  ).join('')
}

export async function getUserProfile() {
  try {
    const supabase = await createServerClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return null
    }

    const { data: profile, error } = await supabase
      .from('profiles')
      .select('id, email, display_name, secret_key')
      .eq('id', user.id)
      .maybeSingle()

    if (error || !profile) {
      console.error('[v0] getUserProfile: Error', error)
      return null
    }

    // secret_key is normally auto-set by a DB trigger on profile creation;
    // fall back to generating one here for older rows that predate it.
    if (!profile.secret_key) {
      const secretKey = generateSecretKey()
      await supabase.from('profiles').update({ secret_key: secretKey }).eq('id', user.id)
      return { ...profile, secret_key: secretKey }
    }

    return profile
  } catch (error) {
    console.error('[v0] getUserProfile: Error', error)
    return null
  }
}

export async function getUserFriends() {
  try {
    const supabase = await createServerClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return []
    }

    const { data: friendships, error } = await supabase
      .from('friendships')
      .select('id, friend_id, status, created_at')
      .eq('user_id', user.id)
      .eq('status', 'accepted')
      .order('created_at', { ascending: false })

    if (error || !friendships || friendships.length === 0) {
      if (error) console.error('[v0] getUserFriends: Error', error)
      return []
    }

    const { data: friendProfiles } = await supabase
      .from('profiles')
      .select('id, display_name, email, secret_key')
      .in('id', friendships.map((f) => f.friend_id))

    const profileById = new Map((friendProfiles || []).map((p) => [p.id, p]))

    return friendships
      .map((f) => ({
        id: f.id,
        status: f.status,
        created_at: f.created_at,
        friend: profileById.get(f.friend_id),
      }))
      .filter((f): f is typeof f & { friend: NonNullable<typeof f.friend> } => f.friend !== undefined)
  } catch (error) {
    console.error('[v0] getUserFriends: Error', error)
    return []
  }
}

export async function addFriendBySecretKey(secretKey: string) {
  try {
    const supabase = await createServerClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return { success: false, error: 'Niste prijavljeni' }
    }

    const { data: friendProfile, error: friendError } = await supabase
      .from('profiles')
      .select('id, display_name, email')
      .eq('secret_key', secretKey.toUpperCase())
      .maybeSingle()

    if (friendError || !friendProfile) {
      return { success: false, error: 'Neveljaven skrivni ključ' }
    }

    if (friendProfile.id === user.id) {
      return { success: false, error: 'Ne moreš dodati samega sebe kot prijatelja' }
    }

    const { data: existingFriendship } = await supabase
      .from('friendships')
      .select('id')
      .eq('user_id', user.id)
      .eq('friend_id', friendProfile.id)
      .maybeSingle()

    if (existingFriendship) {
      return { success: false, error: 'S tem uporabnikom si že prijatelj' }
    }

    const { error: insertError } = await supabase.from('friendships').insert({
      user_id: user.id,
      friend_id: friendProfile.id,
      status: 'accepted',
    })

    if (insertError) {
      console.error('[v0] addFriendBySecretKey: Error creating friendship', insertError)
      return { success: false, error: 'Dodajanje prijatelja ni uspelo' }
    }

    // Reciprocal friendship so both sides see each other in their list.
    await supabase.from('friendships').insert({
      user_id: friendProfile.id,
      friend_id: user.id,
      status: 'accepted',
    })

    revalidatePath('/friends')
    return { success: true, error: null, friendName: friendProfile.display_name || friendProfile.email }
  } catch (error: any) {
    console.error('[v0] addFriendBySecretKey: Error', error)
    return { success: false, error: error.message }
  }
}

export async function removeFriend(friendshipId: string) {
  try {
    const supabase = await createServerClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return { success: false, error: 'Niste prijavljeni' }
    }

    const { data: friendship } = await supabase
      .from('friendships')
      .select('friend_id')
      .eq('id', friendshipId)
      .eq('user_id', user.id)
      .maybeSingle()

    if (!friendship) {
      return { success: false, error: 'Prijateljstvo ni bilo najdeno' }
    }

    const { error: deleteError } = await supabase
      .from('friendships')
      .delete()
      .eq('id', friendshipId)
      .eq('user_id', user.id)

    if (deleteError) {
      console.error('[v0] removeFriend: Error deleting friendship', deleteError)
      return { success: false, error: 'Odstranjevanje prijatelja ni uspelo' }
    }

    // Delete the reciprocal friendship too.
    await supabase
      .from('friendships')
      .delete()
      .eq('user_id', friendship.friend_id)
      .eq('friend_id', user.id)

    revalidatePath('/friends')
    return { success: true, error: null }
  } catch (error: any) {
    console.error('[v0] removeFriend: Error', error)
    return { success: false, error: error.message }
  }
}
