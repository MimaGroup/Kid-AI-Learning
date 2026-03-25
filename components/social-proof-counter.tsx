import { Rocket } from "lucide-react"

export function SocialProofCounter() {
  return (
    <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/90 backdrop-blur-sm rounded-full border border-[#E2E8F0] shadow-lg">
      <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-[#7C3AED] to-[#6CD4C3] rounded-full">
        <Rocket className="w-5 h-5 text-white" />
      </div>
      <div className="flex flex-col">
        <div className="text-sm font-bold text-[#2D2A3D]">
          Prva AI učna platforma v Sloveniji
        </div>
        <div className="text-xs text-[#64748B]">
          Bodi med prvimi starši, ki dajo svojemu otroku prednost pred ostalimi
        </div>
      </div>
    </div>
  )
}
