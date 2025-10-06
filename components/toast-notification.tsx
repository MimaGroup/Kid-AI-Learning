"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "./ui/card"

export type ToastType = "success" | "error" | "info" | "warning"

interface ToastProps {
  message: string
  type?: ToastType
  duration?: number
  onClose: () => void
}

export function Toast({ message, type = "info", duration = 3000, onClose }: ToastProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      setTimeout(onClose, 300)
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  const bgColors = {
    success: "bg-green-100 border-green-400",
    error: "bg-red-100 border-red-400",
    info: "bg-blue-100 border-blue-400",
    warning: "bg-yellow-100 border-yellow-400",
  }

  const textColors = {
    success: "text-green-800",
    error: "text-red-800",
    info: "text-blue-800",
    warning: "text-yellow-800",
  }

  const icons = {
    success: "✓",
    error: "✕",
    info: "ℹ",
    warning: "⚠",
  }

  if (!visible) return null

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right">
      <Card className={`${bgColors[type]} border`}>
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <div className={`text-xl ${textColors[type]}`}>{icons[type]}</div>
            <p className={textColors[type]}>{message}</p>
            <button onClick={() => setVisible(false)} className={`ml-4 ${textColors[type]} font-bold`}>
              ×
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

interface ToastContainerProps {
  toasts: Array<{ id: string; message: string; type: ToastType }>
  onRemove: (id: string) => void
}

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  return (
    <>
      {toasts.map((toast) => (
        <Toast key={toast.id} message={toast.message} type={toast.type} onClose={() => onRemove(toast.id)} />
      ))}
    </>
  )
}
