import { LanguageLearningFlow } from "@/components/language-learning-flow"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI Language Learning - Interactive Language Education for Kids",
  description: "Learn languages with AI-powered interactive lessons, stories, and games designed for children ages 5-12.",
}

export default function LanguageLearningPage() {
  return <LanguageLearningFlow />
}
