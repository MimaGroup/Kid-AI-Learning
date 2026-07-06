import Link from "next/link"

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: "radial-gradient(ellipse at 40% 30%, #1a1060 0%, #0a0a1a 75%)" }}
    >
      <div
        className="max-w-md w-full text-center rounded-3xl p-10"
        style={{ background: "rgba(8,8,30,0.88)", border: "1px solid rgba(168,85,247,0.25)", boxShadow: "0 0 40px rgba(168,85,247,0.1)" }}
      >
        <div className="text-7xl mb-5">🚀</div>
        <h1 className="text-3xl font-bold text-white mb-3">Stran ni najdena</h1>
        <p className="text-white/50 text-sm mb-8">Stran, ki jo iščete, ne obstaja ali je bila premaknjena.</p>
        <Link
          href="/"
          className="inline-block px-6 py-3 rounded-2xl font-bold text-white text-sm transition-all active:scale-95"
          style={{ background: "linear-gradient(135deg, #7C3AED, #a855f7)", boxShadow: "0 2px 16px rgba(168,85,247,0.35)" }}
        >
          Na začetno stran
        </Link>
      </div>
    </div>
  )
}
