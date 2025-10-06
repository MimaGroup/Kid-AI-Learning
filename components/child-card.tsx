"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Child } from "@/types/child"
import { Trash2, Edit } from "lucide-react"

interface ChildCardProps {
  child: Child
  onDelete: (id: string) => Promise<void>
  onEdit: (child: Child) => void
}

export function ChildCard({ child, onDelete, onEdit }: ChildCardProps) {
  const [deleting, setDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete ${child.name}'s profile?`)) {
      return
    }

    setDeleting(true)
    try {
      await onDelete(child.id)
    } catch (error) {
      console.error("Failed to delete child:", error)
    } finally {
      setDeleting(false)
    }
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-bold"
            style={{ backgroundColor: child.avatar_color }}
          >
            {child.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{child.name}</h3>
            <p className="text-sm text-muted-foreground">{child.age} years old</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="flex gap-2">
          <Badge variant="secondary" className="capitalize">
            {child.learning_level}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 pt-4 border-t">
        <Button variant="outline" size="sm" onClick={() => onEdit(child)} className="flex-1">
          <Edit className="w-4 h-4 mr-2" />
          Edit
        </Button>
        <Button variant="destructive" size="sm" onClick={handleDelete} disabled={deleting} className="flex-1">
          <Trash2 className="w-4 h-4 mr-2" />
          {deleting ? "Deleting..." : "Delete"}
        </Button>
      </CardFooter>
    </Card>
  )
}
