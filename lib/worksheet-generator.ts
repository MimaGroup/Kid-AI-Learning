export interface Worksheet {
  name: string
  difficulty: string
  content: string
}

export function generateWorksheetPDF(worksheet: Worksheet): void {
  console.log("[v0] generateWorksheetPDF called with:", worksheet)

  const content = `
AI KIDS LEARNING - ACTIVITY WORKSHEET
=====================================

Activity: ${worksheet.name}
Difficulty: ${worksheet.difficulty}
Date: ${new Date().toLocaleDateString()}

${getWorksheetContent(worksheet.name)}

---
Visit www.kids-learning-ai.com for more fun activities!
  `.trim()

  console.log("[v0] Creating blob with content length:", content.length)

  const blob = new Blob([content], { type: "text/plain" })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = `${worksheet.name.toLowerCase().replace(/\s+/g, "-")}.txt`
  document.body.appendChild(a)

  console.log("[v0] Triggering download for:", a.download)
  a.click()

  window.URL.revokeObjectURL(url)
  document.body.removeChild(a)
  console.log("[v0] Download complete")
}

function getWorksheetContent(name: string): string {
  const worksheets: Record<string, string> = {
    "Pattern Recognition Puzzle": `
INSTRUCTIONS:
Look at the patterns below and fill in the missing items!

1. 🔴 🔵 🔴 🔵 🔴 ___
2. 🌟 🌟 ⭐ 🌟 🌟 ___
3. 🐶 🐱 🐶 🐱 🐶 ___
4. 1️⃣ 2️⃣ 3️⃣ 1️⃣ 2️⃣ ___

CHALLENGE:
Create your own pattern using shapes or numbers!

My Pattern: ___ ___ ___ ___ ___ ___
    `,
    "Build Your Own Algorithm": `
INSTRUCTIONS:
An algorithm is a set of steps to solve a problem. Let's create one!

EXAMPLE: Making a Sandwich
1. Get two slices of bread
2. Spread peanut butter on one slice
3. Spread jelly on the other slice
4. Put the slices together
5. Enjoy your sandwich!

YOUR TURN:
Write an algorithm for brushing your teeth:

Step 1: ___________________________________
Step 2: ___________________________________
Step 3: ___________________________________
Step 4: ___________________________________
Step 5: ___________________________________

BONUS: Write an algorithm for your morning routine!
    `,
    "AI Word Search": `
INSTRUCTIONS:
Find these AI-related words in the grid below!

Words to find:
- ROBOT
- DATA
- LEARN
- SMART
- CODE

R O B O T X Y Z
A D A T A L M N
S M A R T E P Q
C O D E F A G H
L E A R N R I J
K L M N O N P Q

Circle each word when you find it!
    `,
    "Robot Design Challenge": `
INSTRUCTIONS:
Design your own AI robot! Draw and describe your robot below.

MY ROBOT'S NAME: _______________________

WHAT MY ROBOT CAN DO:
1. ___________________________________
2. ___________________________________
3. ___________________________________

SPECIAL FEATURES:
- ___________________________________
- ___________________________________
- ___________________________________

DRAW YOUR ROBOT HERE:
[Large space for drawing]

HOW MY ROBOT HELPS PEOPLE:
_________________________________________
_________________________________________
_________________________________________
    `,
  }

  return worksheets[name] || "Worksheet content coming soon!"
}
