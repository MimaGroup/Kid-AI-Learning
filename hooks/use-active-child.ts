"use client"

import { useCallback, useEffect, useState } from "react"

const ACTIVE_CHILD_ID_KEY = "active_child_id"
const ACTIVE_CHILD_NAME_KEY = "active_child_name"
export const ACTIVE_CHILD_CHANGED_EVENT = "active-child-changed"

export function getActiveChildId(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem(ACTIVE_CHILD_ID_KEY)
}

export function useActiveChild() {
  const [activeChildId, setActiveChildId] = useState<string | null>(null)
  const [activeChildName, setActiveChildName] = useState<string | null>(null)

  useEffect(() => {
    setActiveChildId(localStorage.getItem(ACTIVE_CHILD_ID_KEY))
    setActiveChildName(localStorage.getItem(ACTIVE_CHILD_NAME_KEY))

    const onChange = () => {
      setActiveChildId(localStorage.getItem(ACTIVE_CHILD_ID_KEY))
      setActiveChildName(localStorage.getItem(ACTIVE_CHILD_NAME_KEY))
    }
    window.addEventListener(ACTIVE_CHILD_CHANGED_EVENT, onChange)
    return () => window.removeEventListener(ACTIVE_CHILD_CHANGED_EVENT, onChange)
  }, [])

  const setActiveChild = useCallback((id: string, name: string) => {
    localStorage.setItem(ACTIVE_CHILD_ID_KEY, id)
    localStorage.setItem(ACTIVE_CHILD_NAME_KEY, name)
    window.dispatchEvent(new Event(ACTIVE_CHILD_CHANGED_EVENT))
  }, [])

  const clearActiveChild = useCallback(() => {
    localStorage.removeItem(ACTIVE_CHILD_ID_KEY)
    localStorage.removeItem(ACTIVE_CHILD_NAME_KEY)
    window.dispatchEvent(new Event(ACTIVE_CHILD_CHANGED_EVENT))
  }, [])

  return { activeChildId, activeChildName, setActiveChild, clearActiveChild }
}
