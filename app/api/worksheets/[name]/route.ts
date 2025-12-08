import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: Promise<{ name: string }> }) {
  const { name } = await params

  const searchParams = request.nextUrl?.searchParams
  const difficulty = searchParams?.get("difficulty") || "Medium"

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
    "sorting-game": `
SORTING GAME
Difficulty: ${difficulty}
============

Instructions: Sort these items into the correct categories!

Items to Sort:
🍎 Apple    🚗 Car      📚 Book     🐕 Dog
🍌 Banana   ✈️ Plane    ✏️ Pencil   🐱 Cat
🍊 Orange   🚂 Train    📖 Novel    🐦 Bird

Category 1 - FRUITS:
_________________
_________________
_________________

Category 2 - VEHICLES:
_________________
_________________
_________________

Category 3 - SCHOOL SUPPLIES:
_________________
_________________
_________________

Category 4 - ANIMALS:
_________________
_________________
_________________

Bonus Challenge: Can you think of 2 more items for each category?

This is how AI learns to classify things!
`,
    "decision-tree-adventure": `
DECISION TREE ADVENTURE
Difficulty: ${difficulty}
=======================

Instructions: Follow the decision tree to find your adventure!

START: You find a mysterious door...

Do you open it?
├─ YES → You see a staircase
│   ├─ Go UP → You find a treasure chest! 🎁
│   └─ Go DOWN → You discover a secret library! 📚
│
└─ NO → You hear a sound
    ├─ Investigate → You meet a friendly robot! 🤖
    └─ Walk away → You find a beautiful garden! 🌸

Now create YOUR OWN decision tree:

START: _______________________

Choice 1: ___________________
├─ Option A → _______________
│   ├─ Next choice → _________
│   └─ Next choice → _________
│
└─ Option B → _______________
    ├─ Next choice → _________
    └─ Next choice → _________

Decision trees help AI make smart choices!
`,
    "data-collection-mission": `
DATA COLLECTION MISSION
Difficulty: ${difficulty}
=======================

Instructions: AI needs data to learn! Let's collect some data together.

Mission 1: Weather Data
Track the weather for 5 days:

Day 1: ☀️ ☁️ 🌧️ ❄️ (Circle one)
Day 2: ☀️ ☁️ 🌧️ ❄️ (Circle one)
Day 3: ☀️ ☁️ 🌧️ ❄️ (Circle one)
Day 4: ☀️ ☁️ 🌧️ ❄️ (Circle one)
Day 5: ☀️ ☁️ 🌧️ ❄️ (Circle one)

What pattern do you notice? ___________________

Mission 2: Favorite Colors Survey
Ask 5 people their favorite color:

Person 1: _______________
Person 2: _______________
Person 3: _______________
Person 4: _______________
Person 5: _______________

Most popular color: _______________

Mission 3: Pet Data
Count the pets in your neighborhood:

Dogs: _____
Cats: _____
Birds: _____
Other: _____

Total pets: _____

Great job collecting data! This is how AI learns about the world!
`,
    "if-then-logic-puzzles": `
IF-THEN LOGIC PUZZLES
Difficulty: ${difficulty}
=====================

Instructions: AI uses IF-THEN rules to make decisions. Let's practice!

Puzzle 1:
IF it is raining, THEN bring an umbrella.
It is raining today.
What should you do? ___________________

Puzzle 2:
IF you are hungry, THEN eat a snack.
You are hungry.
What should you do? ___________________

Puzzle 3:
IF the light is red, THEN stop.
IF the light is green, THEN go.
The light is green.
What should you do? ___________________

Now create your own IF-THEN rules:

Rule 1:
IF _________________________, THEN _________________________

Rule 2:
IF _________________________, THEN _________________________

Rule 3:
IF _________________________, THEN _________________________

Challenge: Write an IF-THEN rule for a robot helper!

IF _________________________, THEN _________________________

These rules help AI know what to do in different situations!
`,
    "training-your-ai-pet": `
TRAINING YOUR AI PET
Difficulty: ${difficulty}
====================

Instructions: Imagine you have an AI pet! Let's train it to learn tricks.

Your AI Pet's Name: ___________________

Draw your AI pet here:
[Space for drawing]

Training Session 1: Teaching "Sit"
Step 1: Say "Sit" → Pet sits → Give treat ✓
Step 2: Say "Sit" → Pet sits → Give treat ✓
Step 3: Say "Sit" → Pet sits → Give treat ✓

After 3 tries, your pet learned "Sit"! 🎉

Training Session 2: Teaching a New Trick
Choose a trick: ___________________

Step 1: Command → Action → Reward
Step 2: Command → Action → Reward
Step 3: Command → Action → Reward

Training Session 3: Design Your Own Trick!
Trick name: ___________________

What does your pet do? ___________________
___________________

How many times to practice? ___________________

Training Log:
Try 1: ⭐ ⭐ ⭐ ⭐ ⭐ (Circle stars for success)
Try 2: ⭐ ⭐ ⭐ ⭐ ⭐
Try 3: ⭐ ⭐ ⭐ ⭐ ⭐

This is called "training data" - it helps AI learn new things!
`,
    "ai-helper-scenarios": `
AI HELPER SCENARIOS
Difficulty: ${difficulty}
===================

Instructions: Think about how AI can help in different situations!

Scenario 1: Lost Toy
Problem: You can't find your favorite toy.
How could an AI helper assist?
___________________________________
___________________________________

Scenario 2: Homework Help
Problem: You don't understand a math problem.
How could an AI helper assist?
___________________________________
___________________________________

Scenario 3: Bedtime Story
Problem: You want to hear a new story.
How could an AI helper assist?
___________________________________
___________________________________

Scenario 4: Learning a New Language
Problem: You want to learn Spanish words.
How could an AI helper assist?
___________________________________
___________________________________

Scenario 5: Planning a Birthday Party
Problem: You need ideas for your party.
How could AI help? ___________________________________
___________________________________

Create Your Own Scenario:
Problem: ___________________________________
How could AI help? ___________________________________
___________________________________

Draw a picture of your AI helper:
[Space for drawing]

Remember: AI is a tool to help us, not replace our thinking!
`,
  }

  const worksheetKey = name.toLowerCase().replace(/ /g, "-")
  const content = worksheets[worksheetKey] || `Worksheet: ${name}\nDifficulty: ${difficulty}\n\nContent coming soon!`

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain",
      "Content-Disposition": `attachment; filename="${name.replace(/ /g, "-")}-${difficulty}.txt"`,
    },
  })
}
