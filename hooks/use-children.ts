"use client"

import { useState, useEffect } from "react"
import type { Child, CreateChildInput, UpdateChildInput } from "@/types/child"

export function useChildren() {
  const [children, setChildren] = useState<Child[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchChildren = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch("/api/children")
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch children")
      }

      setChildren(data.children || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const createChild = async (input: CreateChildInput & { email: string; password: string }) => {
    try {
      setError(null)

      const response = await fetch("/api/children", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to create child")
      }

      await fetchChildren()
      return data.child
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred"
      setError(errorMessage)
      throw new Error(errorMessage)
    }
  }

  const updateChild = async (id: string, input: UpdateChildInput) => {
    try {
      setError(null)

      const response = await fetch(`/api/children/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to update child")
      }

      await fetchChildren()
      return data.child
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred"
      setError(errorMessage)
      throw new Error(errorMessage)
    }
  }

  const deleteChild = async (id: string) => {
    try {
      setError(null)

      const response = await fetch(`/api/children/${id}`, {
        method: "DELETE",
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete child")
      }

      await fetchChildren()
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred"
      setError(errorMessage)
      throw new Error(errorMessage)
    }
  }

  useEffect(() => {
    fetchChildren()
  }, [])

  return {
    children,
    loading,
    error,
    createChild,
    updateChild,
    deleteChild,
    refetch: fetchChildren,
  }
}
