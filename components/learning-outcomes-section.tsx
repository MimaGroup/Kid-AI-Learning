import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Lightbulb, Puzzle, Code2, Eye, Users } from "lucide-react"

const outcomes = [
  {
    icon: Brain,
    title: "Osnove umetne inteligence",
    description: "Kaj je AI, kako deluje in kje ga srečamo v vsakdanjem življenju.",
    color: "#7C3AED",
    bg: "#F3E8FF",
    age: "5-12 let",
  },
  {
    icon: Lightbulb,
    title: "Kritično razmišljanje",
    description: "Otrok se nauči postavljati vprašanja, analizirati in reševati probleme.",
    color: "#F59E0B",
    bg: "#FEF3C7",
    age: "6-12 let",
  },
  {
    icon: Puzzle,
    title: "Prepoznavanje vzorcev",
    description: "Razumevanje vzorcev je temelj programiranja in strojnega učenja.",
    color: "#6CD4C3",
    bg: "#E0F2FE",
    age: "5-10 let",
  },
  {
    icon: Code2,
    title: "Osnove programiranja",
    description: "Skozi igre otrok spozna logiko, ki stoji za vsako aplikacijo.",
    color: "#10B981",
    bg: "#ECFDF5",
    age: "7-12 let",
  },
  {
    icon: Eye,
    title: "Digitalna pismenost",
    description: "Razumevanje kako varno in odgovorno uporabljati tehnologijo.",
    color: "#0EA5E9",
    bg: "#E0F2FE",
    age: "5-12 let",
  },
  {
    icon: Users,
    title: "Sodelovanje in ustvarjalnost",
    description: "AI izzivi spodbujajo ustvarjalno razmišljanje in timsko delo.",
    color: "#EF4444",
    bg: "#FEF2F2",
    age: "6-12 let",
  },
]

export function LearningOutcomesSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#F5F3FF] via-[#FAF5FF] to-[#F0FDFA]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <Badge variant="outline" className="mb-4 border-[#7C3AED] text-[#7C3AED]">
            {"Učni cilji"}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-[#2D2A3D]">
            Kaj se bo {"vaš"} otrok naučil
          </h2>
          <p className="text-lg text-[#64748B] max-w-2xl mx-auto">
            Vsaka igra in {"tečaj"} razvija konkretne veščine za prihodnost
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {outcomes.map((outcome) => (
            <Card
              key={outcome.title}
              className="p-8 rounded-3xl border-[#E2E8F0] hover:shadow-lg transition-all"
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                style={{ backgroundColor: outcome.bg }}
              >
                <outcome.icon className="w-7 h-7" style={{ color: outcome.color }} />
              </div>
              <h3 className="text-xl font-heading font-bold mb-2 text-[#2D2A3D]">
                {outcome.title}
              </h3>
              <p className="text-[#64748B] leading-relaxed mb-3">
                {outcome.description}
              </p>
              <span
                className="inline-block text-xs font-semibold px-3 py-1 rounded-full"
                style={{ backgroundColor: outcome.bg, color: outcome.color }}
              >
                {outcome.age}
              </span>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
