"use client"

import { Spinner } from "@/components/ui/spinner"

interface LoadingOverlayProps {
  message?: string
  fullScreen?: boolean
}

export function LoadingOverlay({ message = "Loading...", fullScreen = false }: LoadingOverlayProps) {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-8 shadow-2xl flex flex-col items-center gap-4">
          <Spinner className="h-8 w-8" />
          <p className="text-gray-700 font-medium">{message}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="absolute inset-0 bg-white/80 z-10 flex items-center justify-center rounded-lg">
      <div className="flex flex-col items-center gap-3">
        <Spinner className="h-6 w-6" />
        <p className="text-sm text-gray-600">{message}</p>
      </div>
    </div>
  )
}
