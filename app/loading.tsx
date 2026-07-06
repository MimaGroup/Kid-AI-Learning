export default function Loading() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "radial-gradient(ellipse at 40% 30%, #1a1060 0%, #0a0a1a 75%)" }}
    >
      <div className="text-center">
        <div
          className="inline-block w-12 h-12 rounded-full mb-4 animate-spin"
          style={{ border: "3px solid rgba(168,85,247,0.2)", borderTopColor: "#a855f7" }}
        />
        <p className="text-purple-300 font-semibold text-sm">Nalaganje...</p>
      </div>
    </div>
  )
}
