"use client"

import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function StoryPage() {
  const params = useParams()
  const router = useRouter()
  const storyId = params.id as string

  const stories = {
    "1": {
      title: "The Friendly AI Robot",
      icon: "🤖",
      content: [
        "Once upon a time, in a bright and colorful town, there lived a small robot named Chip. Chip was different from other robots - he wanted to learn how to be a good friend.",
        "Every day, Chip would watch the children playing in the park. He noticed how they shared their toys, helped each other, and laughed together. Chip wanted to do these things too!",
        "One day, a little girl named Emma dropped her ice cream. She started to cry. Chip rolled over and said, 'Don't be sad! I can help you.' He used his special sensors to find the ice cream shop and bought Emma a new cone.",
        "Emma smiled and said, 'Thank you, Chip! You're a great friend!' From that day on, Chip learned that being a good friend means helping others when they need it.",
        "Chip continued to learn more about friendship. He learned to listen when friends talked, to share his battery charger (like sharing toys!), and to always be kind.",
        "The children in the town loved Chip. He showed everyone that even robots can be wonderful friends when they learn and care about others.",
      ],
      questions: [
        { q: "What was special about Chip?", a: "He wanted to learn how to be a good friend" },
        { q: "How did Chip help Emma?", a: "He bought her a new ice cream cone" },
        { q: "What did Chip learn about friendship?", a: "Being a good friend means helping others" },
      ],
    },
    "2": {
      title: "The Smart Home Helper",
      icon: "🏠",
      content: [
        "In the Johnson family's house, there was a special helper named Alexa. She wasn't a person, but she could talk and help with many things.",
        "Every morning, Alexa would wake up the family with their favorite music. 'Good morning, Johnson family!' she would say cheerfully.",
        "Little Tommy asked, 'Alexa, how do you know so much?' Alexa explained, 'I use artificial intelligence! That means I can learn from information and help answer questions.'",
        "Alexa helped the family in many ways. She could tell them the weather, play their favorite songs, set timers for cooking, and even tell jokes!",
        "One day, Tommy's mom asked, 'Alexa, what's AI?' Alexa replied, 'AI is like a very smart helper that learns from information to do tasks and answer questions. I use AI to understand what you say and help you!'",
        "The Johnson family was grateful for their smart home helper. They learned that AI can make life easier and more fun when used in helpful ways.",
      ],
      questions: [
        { q: "What was the helper's name?", a: "Alexa" },
        { q: "What is AI according to Alexa?", a: "A smart helper that learns from information" },
        { q: "How did Alexa help the family?", a: "Weather, music, timers, and jokes" },
      ],
    },
    "3": {
      title: "The Pattern Detective",
      icon: "🔍",
      content: [
        "Detective Maya had a special skill - she could spot patterns that others missed. One day, she got a mysterious case.",
        "Someone had been leaving colorful drawings all around the city. The drawings appeared every Tuesday and Thursday, always near schools.",
        "Maya looked at all the clues. 'I see a pattern!' she exclaimed. 'The drawings appear on school days, and they're always near playgrounds.'",
        "She used her pattern-finding skills, just like how AI uses patterns to solve problems. Maya predicted where the next drawing would appear.",
        "On Thursday morning, Maya waited near Lincoln Elementary's playground. Sure enough, a young artist named Sam arrived with colorful chalk.",
        "Sam wasn't doing anything wrong - he just loved making art for kids to enjoy! Maya smiled and said, 'Your art makes people happy. That's wonderful! Just like AI finds patterns to help people, you found a pattern of making others smile.'",
        "Maya taught everyone that finding patterns, whether you're a detective or a computer, can help solve mysteries and make the world better.",
      ],
      questions: [
        { q: "What was Maya's special skill?", a: "Spotting patterns" },
        { q: "What pattern did Maya find?", a: "Drawings on Tuesdays and Thursdays near schools" },
        { q: "Who was making the drawings?", a: "A young artist named Sam" },
      ],
    },
  }

  const story = stories[storyId as keyof typeof stories]

  if (!story) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Story not found</h2>
          <Button onClick={() => router.push("/kids/library")}>Back to Library</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Button variant="ghost" onClick={() => router.push("/kids/library")}>
            ← Back to Library
          </Button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="p-8 mb-6">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">{story.icon}</div>
            <h1 className="text-3xl font-bold text-gray-900">{story.title}</h1>
          </div>

          <div className="prose prose-lg max-w-none space-y-6">
            {story.content.map((paragraph, idx) => (
              <p key={idx} className="text-gray-700 leading-relaxed text-lg">
                {paragraph}
              </p>
            ))}
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50">
          <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
            <span>🤔</span>
            <span>Comprehension Questions</span>
          </h3>
          <div className="space-y-4">
            {story.questions.map((item, idx) => (
              <div key={idx} className="bg-white p-4 rounded-lg">
                <div className="font-semibold text-gray-900 mb-2">
                  {idx + 1}. {item.q}
                </div>
                <details className="text-gray-600">
                  <summary className="cursor-pointer text-blue-600 hover:text-blue-800">Show Answer</summary>
                  <div className="mt-2 pl-4 border-l-2 border-blue-300">{item.a}</div>
                </details>
              </div>
            ))}
          </div>
        </Card>

        <div className="mt-6 text-center">
          <Button onClick={() => router.push("/kids/library")} size="lg">
            Read Another Story
          </Button>
        </div>
      </div>
    </div>
  )
}
