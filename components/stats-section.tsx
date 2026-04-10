import { Gamepad2, BookOpen, Clock, Gift } from "lucide-react"

export function StatsSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#7C3AED]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          <div className="space-y-3">
            <div className="flex items-center justify-center">
              <Gamepad2 className="w-10 h-10 opacity-90" />
            </div>
            <div className="text-4xl md:text-5xl font-heading font-bold">8</div>
            <div className="text-base font-medium opacity-90">AI iger</div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-center">
              <BookOpen className="w-10 h-10 opacity-90" />
            </div>
            <div className="text-4xl md:text-5xl font-heading font-bold">5</div>
            <div className="text-base font-medium opacity-90">{"Tečajev na voljo"}</div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-center">
              <Clock className="w-10 h-10 opacity-90" />
            </div>
            <div className="text-4xl md:text-5xl font-heading font-bold">24/7</div>
            <div className="text-base font-medium opacity-90">Dostop do učenja</div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-center">
              <Gift className="w-10 h-10 opacity-90" />
            </div>
            <div className="text-4xl md:text-5xl font-heading font-bold">0 {"€"}</div>
            <div className="text-base font-medium opacity-90">{"Brezplačno za začetek"}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
