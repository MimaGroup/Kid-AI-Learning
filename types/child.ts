export interface Child {
  id: string
  parent_id: string
  name: string
  age: number
  avatar_color: string
  learning_level: "beginner" | "intermediate" | "advanced"
  created_at: string
  updated_at: string
}

export interface CreateChildInput {
  name: string
  age: number
  avatar_color?: string
  learning_level?: "beginner" | "intermediate" | "advanced"
}

export interface UpdateChildInput {
  name?: string
  age?: number
  avatar_color?: string
  learning_level?: "beginner" | "intermediate" | "advanced"
}
