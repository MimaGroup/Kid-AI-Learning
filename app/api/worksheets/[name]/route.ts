import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: Promise<{ name: string }> }) {
  const { name } = await params
  const searchParams = request.nextUrl.searchParams
  const difficulty = searchParams.get("difficulty") || "Medium"

  // Generate worksheet content based on name
  const worksheets: Record<string, string> = {
    "pattern-recognition-puzzle": `
PATTERN RECOGNITION PUZZLE
Difficulty: ${difficulty}
=========================

Instructions: Look at the patterns below and fill in the missing items!

Pattern 1: 🔴 🔵 🔴 🔵 🔴 ___
Answer: 🔵

Pattern 2: 🐶 🐱 🐶 🐱 ___ 🐱
Answer: 🐶

Pattern 3: 1, 2, 4, 8, 16, ___
Answer: 32

Pattern 4: A, B, C, D, ___
Answer: E

Challenge: Create your own pattern!
___ ___ ___ ___ ___

Great job! Patterns help AI learn and make predictions!
`,
    "build-your-own-algorithm": `
BUILD YOUR OWN ALGORITHM
Difficulty: ${difficulty}
========================

Instructions: An algorithm is a set of steps to solve a problem. Let's create one!

Example: Making a Sandwich Algorithm
1. Get two slices of bread
2. Spread peanut butter on one slice
3. Spread jelly on the other slice
4. Put the slices together
5. Enjoy your sandwich!

Now you try! Write an algorithm for:

Brushing Your Teeth:
1. ___________________________
2. ___________________________
3. ___________________________
4. ___________________________
5. ___________________________

Getting Ready for School:
1. ___________________________
2. ___________________________
3. ___________________________
4. ___________________________
5. ___________________________

Remember: Algorithms need to be in the right order!
`,
    "ai-word-search": `
AI WORD SEARCH
Difficulty: ${difficulty}
==============

Find these AI words in the grid below:

ROBOT    DATA    LEARN    CODE    SMART
BRAIN    THINK   HELPER   FUTURE  TECH

R O B O T D A T A X
S M A R T H I N K Y
L E A R N C O D E Z
B R A I N F U T U R
H E L P E R T E C H

Circle the words you find!

Bonus: Can you use each word in a sentence about AI?
`,
    "robot-design-challenge": `
ROBOT DESIGN CHALLENGE
Difficulty: ${difficulty}
======================

Instructions: Design your own AI robot!

1. Draw your robot in the space below:

   [Large empty space for drawing]

2. What is your robot's name? _______________

3. What can your robot do? (Check all that apply)
   [ ] Help with homework
   [ ] Clean the house
   [ ] Play games
   [ ] Cook food
   [ ] Tell jokes
   [ ] Other: _______________

4. What makes your robot special?
   _________________________________
   _________________________________

5. How does your robot use AI?
   _________________________________
   _________________________________

Share your robot design with friends and family!
`,
  }

  const worksheetKey = name.toLowerCase().replace(/ /g, "-")
  const content = worksheets[worksheetKey] || `Worksheet: ${name}\nDifficulty: ${difficulty}\n\nContent coming soon!`

  // Return as downloadable text file
  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain",
      "Content-Disposition": `attachment; filename="${name.replace(/ /g, "-")}-${difficulty}.txt"`,
    },
  })
}
