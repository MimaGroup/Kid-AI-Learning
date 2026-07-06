"use client"

interface LoadingOverlayProps {
  message?: string
  fullScreen?: boolean
}

export function LoadingOverlay({ message = "Nalaganje...", fullScreen = false }: LoadingOverlayProps) {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center"
        style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}>
        <div className="flex flex-col items-center gap-4 px-8 py-7 rounded-3xl"
          style={{ background: "rgba(8,8,30,0.95)", border: "1px solid rgba(168,85,247,0.3)", boxShadow: "0 0 48px rgba(168,85,247,0.15)" }}>
          <div className="w-9 h-9 rounded-full animate-spin"
            style={{ border: "3px solid rgba(168,85,247,0.2)", borderTopColor: "#a855f7" }} />
          <p className="text-white/80 font-medium text-sm">{message}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center rounded-3xl"
      style={{ background: "rgba(8,8,30,0.75)", backdropFilter: "blur(4px)" }}>
      <div className="flex flex-col items-center gap-3">
        <div className="w-7 h-7 rounded-full animate-spin"
          style={{ border: "3px solid rgba(168,85,247,0.2)", borderTopColor: "#a855f7" }} />
        <p className="text-white/60 text-sm">{message}</p>
      </div>
    </div>
  )
}
