'use server'

import { createServerClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

class RedisClient {
  private baseUrl: string
  private token: string

  constructor() {
    const url = process.env['UPSTASH-KV_KV_REST_API_URL']
    const token = process.env['UPSTASH-KV_KV_REST_API_TOKEN']
    
    if (!url || !token) {
      throw new Error('Redis credentials not configured')
    }
    
    this.baseUrl = url
    this.token = token
  }

  private async execute(command: string[]) {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(command),
    })

    if (!response.ok) {
      throw new Error(`Redis command failed: ${response.statusText}`)
    }

    const data = await response.json()
    return data.result
  }

  async hgetall(key: string) {
    const result = await this.execute(['HGETALL', key])
    if (!result || result.length === 0) return null
    
    const obj: Record<string, string> = {}
    for (let i = 0; i < result.length; i += 2) {
      obj[result[i]] = result[i + 1]
    }
    return obj
  }

  async hset(key: string, data: Record<string, string>) {
    const args = [key]
    for (const [field, value] of Object.entries(data)) {
      args.push(field, value)
    }
    return await this.execute(['HSET', ...args])
  }

  async set(key: string, value: string) {
    return await this.execute(['SET', key, value])
  }

  async get(key: string) {
    return await this.execute(['GET', key])
  }

  async sadd(key: string, ...members: string[]) {
    return await this.execute(['SADD', key, ...members])
  }

  async srem(key: string, ...members: string[]) {
    return await this.execute(['SREM', key, ...members])
  }

  async smembers(key: string) {
    return await this.execute(['SMEMBERS', key])
  }

  async sismember(key: string, member: string) {
    const result = await this.execute(['SISMEMBER', key, member])
    return result === 1
  }
}

// Helper to generate a secret key
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

    const redis = new RedisClient()
    const profileKey = `user:${user.id}:profile`
    let profile = await redis.hgetall(profileKey)
    
    // If not in Redis, create it
    if (!profile || Object.keys(profile).length === 0) {
      const secretKey = generateSecretKey()
      profile = {
        id: user.id,
        email: user.email || '',
        display_name: user.email?.split('@')[0] || 'User',
        secret_key: secretKey
      }
      
      await redis.hset(profileKey, profile)
      // Also index the secret key for lookups
      await redis.set(`secretkey:${secretKey}`, user.id)
    }
    
    return {
      id: profile.id as string,
      email: profile.email as string,
      display_name: profile.display_name as string,
      secret_key: profile.secret_key as string
    }
  } catch (error) {
    console.error('[v0] getUserProfile: Error', error)
    throw error
  }
}

export async function getUserFriends() {
  try {
    const supabase = await createServerClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return []
    }

    const redis = new RedisClient()
    const friendsKey = `user:${user.id}:friends`
    const friendIds = await redis.smembers(friendsKey) || []
    
    if (friendIds.length === 0) {
      return []
    }

    // Get each friend's profile
    const friends = await Promise.all(
      friendIds.map(async (friendId: any) => {
        const friendProfileKey = `user:${friendId}:profile`
        const friendProfile = await redis.hgetall(friendProfileKey)
        return friendProfile && Object.keys(friendProfile).length > 0 ? {
          id: `${user.id}-${friendId}`,
          created_at: new Date().toISOString(),
          status: 'accepted',
          friend: {
            id: friendProfile.id,
            email: friendProfile.email,
            display_name: friendProfile.display_name,
            secret_key: friendProfile.secret_key
          }
        } : null
      })
    )

    return friends.filter(f => f !== null)
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
      return { success: false, error: 'Not authenticated' }
    }
    
    const redis = new RedisClient()
    const friendUserId = await redis.get(`secretkey:${secretKey.toUpperCase()}`)

    if (!friendUserId) {
      return { success: false, error: 'Invalid secret key' }
    }
    
    if (friendUserId === user.id) {
      return { success: false, error: 'You cannot add yourself as a friend' }
    }

    // Check if already friends
    const myFriendsKey = `user:${user.id}:friends`
    const isFriend = await redis.sismember(myFriendsKey, friendUserId)
    
    if (isFriend) {
      return { success: false, error: 'Already friends with this user' }
    }

    // Get friend's name
    const friendProfileKey = `user:${friendUserId}:profile`
    const friendProfile = await redis.hgetall(friendProfileKey)
    const friendName = friendProfile?.display_name as string || 'User'

    // Add to both users' friend lists
    await redis.sadd(myFriendsKey, friendUserId as string)
    await redis.sadd(`user:${friendUserId}:friends`, user.id)

    revalidatePath('/friends')
    return { success: true, error: null, friendName }
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
      return { success: false, error: 'Not authenticated' }
    }
    
    const friendId = friendshipId.split('-')[1]
    
    if (!friendId) {
      return { success: false, error: 'Invalid friendship ID' }
    }

    const redis = new RedisClient()
    await redis.srem(`user:${user.id}:friends`, friendId)
    await redis.srem(`user:${friendId}:friends`, user.id)

    revalidatePath('/friends')
    return { success: true, error: null }
  } catch (error: any) {
    console.error('[v0] removeFriend: Error', error)
    return { success: false, error: error.message }
  }
}
