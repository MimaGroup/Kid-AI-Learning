"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Child, UpdateChildInput } from "@/types/child"

interface EditChildDialogProps {
  child: Child | null
  onClose: () => void
  onSave: (id: string, input: UpdateChildInput) => Promise<void>
}

const AVATAR_COLORS = [
  { value: "#4F46E5", label: "Indigo" },
  { value: "#EC4899", label: "Roza" },
  { value: "#10B981", label: "Zelena" },
  { value: "#F59E0B", label: "Oranžna" },
  { value: "#8B5CF6", label: "Vijolična" },
  { value: "#06B6D4", label: "Cian" },
]

export function EditChildDialog({ child, onClose, onSave }: EditChildDialogProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    avatar_color: "#4F46E5",
    learning_level: "beginner" as "beginner" | "intermediate" | "advanced",
  })

  useEffect(() => {
    if (child) {
      setFormData({
        name: child.name,
        age: String(child.age),
        avatar_color: child.avatar_color,
        learning_level: child.learning_level,
      })
    }
  }, [child])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!child || !formData.name || !formData.age) return

    setLoading(true)
    try {
      await onSave(child.id, {
        name: formData.name,
        age: Number.parseInt(formData.age),
        avatar_color: formData.avatar_color,
        learning_level: formData.learning_level,
      })
      onClose()
    } catch (error) {
      alert(`Posodobitev profila ni uspela: ${error instanceof Error ? error.message : "Neznana napaka"}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={!!child} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Uredi profil otroka</DialogTitle>
            <DialogDescription>Posodobite podatke otrokovega učnega profila.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Ime</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ime otroka"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-age">Starost</Label>
              <Input
                id="edit-age"
                type="number"
                min="5"
                max="12"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                placeholder="Vnesite starost (5–12)"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-avatar_color">Barva avatarja</Label>
              <Select
                value={formData.avatar_color}
                onValueChange={(value) => setFormData({ ...formData, avatar_color: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {AVATAR_COLORS.map((color) => (
                    <SelectItem key={color.value} value={color.value}>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: color.value }} />
                        {color.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-learning_level">Stopnja znanja</Label>
              <Select
                value={formData.learning_level}
                onValueChange={(value: any) => setFormData({ ...formData, learning_level: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Začetnik</SelectItem>
                  <SelectItem value="intermediate">Srednji</SelectItem>
                  <SelectItem value="advanced">Napredni</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Shranjevanje..." : "Shrani spremembe"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
