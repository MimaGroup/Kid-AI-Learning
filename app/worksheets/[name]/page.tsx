import { WorksheetDisplay } from "@/components/worksheet-display"
import { notFound } from "next/navigation"

const worksheets: Record<string, { title: string; difficulty: string; content: string }> = {
  "pattern-recognition-puzzle": {
    title: "Pattern Recognition Puzzle",
    difficulty: "Medium",
    content: `Instructions: Look at the patterns below and fill in the missing items!

Pattern 1: 🔴 🔵 🔴 🔵 🔴 ___
Answer: 🔵

Pattern 2: 🐱 😺 🐱 😺 ___ 😺
Answer: 🐱

Pattern 3: 1, 2, 4, 8, 16, ___
Answer: 32

Pattern 4: A, B, C, D, ___
Answer: E

Challenge: Create your own pattern!
___ ___ ___ ___ ___

Great job! Patterns help AI learn and make predictions!`,
  },
  "build-your-own-algorithm": {
    title: "Build Your Own Algorithm",
    difficulty: "Easy",
    content: `Instructions: An algorithm is a set of steps to solve a problem!

Example: Making a Sandwich
Step 1: Get two slices of bread
Step 2: Add peanut butter to one slice
Step 3: Add jelly to the other slice
Step 4: Put the slices together
Step 5: Enjoy your sandwich! 🥪

Your Turn: Write an algorithm for brushing your teeth!
Step 1: _______________
Step 2: _______________
Step 3: _______________
Step 4: _______________

Remember: AI uses algorithms to make decisions!`,
  },
  "ai-word-search": {
    title: "AI Word Search",
    difficulty: "Easy",
    content: `Instructions: Find these AI-related words in the grid!

Words to find:
- ROBOT
- DATA
- LEARN
- SMART
- CODE

A L G O R I T H M
R O B O T X Y Z Q
D A T A W E R T Y
L E A R N M N O P
S M A R T C O D E

Challenge: Can you think of 3 more AI words?
1. _______________
2. _______________
3. _______________`,
  },
  "robot-design-challenge": {
    title: "Robot Design Challenge",
    difficulty: "Hard",
    content: `Instructions: Design your own helpful robot!

What will your robot do?
_______________________________________________

Draw your robot here:
[Space for drawing]

Robot Features:
□ Can talk
□ Can move
□ Can see
□ Can learn
□ Can help people

Special Abilities:
1. _______________
2. _______________
3. _______________

Why is your robot helpful?
_______________________________________________

Remember: Real AI robots are designed to help people!`,
  },
}

export default async function WorksheetPage({
  params,
}: {
  params: Promise<{ name: string }>
}) {
  const { name } = await params
  const worksheet = worksheets[name]

  if (!worksheet) {
    notFound()
  }

  return <WorksheetDisplay title={worksheet.title} difficulty={worksheet.difficulty} content={worksheet.content} />
}
