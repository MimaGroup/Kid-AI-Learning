import { LanguageLearningFlow } from "@/components/language-learning-flow"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: { absolute: "AI učenje jezikov | Kids Learning AI" },
  description: "Učenje jezikov z interaktivnimi lekcijami, zgodbami in igrami s pomočjo umetne inteligence, zasnovanimi za otroke, stare 5–12 let.",
}

export default function LanguageLearningPage() {
  return <LanguageLearningFlow />
}
