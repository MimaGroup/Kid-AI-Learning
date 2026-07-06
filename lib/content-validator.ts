export interface ValidationResult {
  passed: boolean
  errors: string[]
  warnings: string[]
  score: number
}

export interface ContentItem {
  id: string
  type: "game" | "activity" | "lesson" | "story"
  title: string
  path: string
  status: "not_tested" | "testing" | "passed" | "failed"
  lastTested?: Date
  validationResult?: ValidationResult
}

export const contentInventory: ContentItem[] = [
  // Games
  {
    id: "ai-detective",
    type: "game",
    title: "AI Detective Game",
    path: "/kids/games/ai-detective",
    status: "not_tested",
  },
  { id: "ai-quiz", type: "game", title: "AI Quiz Challenge", path: "/kids/games/ai-quiz", status: "not_tested" },
  {
    id: "coding-basics",
    type: "game",
    title: "Coding Basics",
    path: "/kids/games/coding-basics",
    status: "not_tested",
  },
  {
    id: "math-adventure",
    type: "game",
    title: "Math Adventure",
    path: "/kids/games/math-adventure",
    status: "not_tested",
  },
  { id: "memory-match", type: "game", title: "Memory Match", path: "/kids/games/memory-match", status: "not_tested" },
  {
    id: "pattern-training",
    type: "game",
    title: "Pattern Training",
    path: "/kids/games/pattern-training",
    status: "not_tested",
  },
  { id: "science-lab", type: "game", title: "Science Lab", path: "/kids/games/science-lab", status: "not_tested" },
  { id: "word-builder", type: "game", title: "Word Builder", path: "/kids/games/word-builder", status: "not_tested" },

  // Activities
  { id: "ai-friend", type: "activity", title: "AI Friend Chat", path: "/kids/ai-friend", status: "not_tested" },
  { id: "library", type: "activity", title: "Story Library", path: "/kids/library", status: "not_tested" },
  {
    id: "learning-paths",
    type: "activity",
    title: "Learning Paths",
    path: "/kids/learning-paths",
    status: "not_tested",
  },
  { id: "badges", type: "activity", title: "Badges & Achievements", path: "/kids/badges", status: "not_tested" },
]

export const validationChecklist = {
  functionality: [
    "Game loads without errors",
    "All buttons and interactions work",
    "Game can be completed successfully",
    "Score/progress tracking works",
    "Reset/restart functionality works",
    "Navigation works correctly",
  ],
  educational: [
    "Content is age-appropriate",
    "Learning objectives are clear",
    "Instructions are easy to understand",
    "Feedback is constructive and encouraging",
    "Difficulty progression is appropriate",
  ],
  technical: [
    "No console errors",
    "Responsive on mobile devices",
    "Performance is acceptable (no lag)",
    "Images and assets load properly",
    "API calls work correctly",
  ],
  ux: [
    "Visual design is appealing to kids",
    "Text is readable and clear",
    "Colors are vibrant and engaging",
    "Animations are smooth",
    "Sound effects work (if applicable)",
  ],
}

export function calculateContentScore(results: Record<string, boolean>): number {
  const total = Object.keys(results).length
  const passed = Object.values(results).filter(Boolean).length
  return Math.round((passed / total) * 100)
}

export function getContentStats() {
  const total = contentInventory.length
  const tested = contentInventory.filter((item) => item.status !== "not_tested").length
  const passed = contentInventory.filter((item) => item.status === "passed").length
  const failed = contentInventory.filter((item) => item.status === "failed").length

  return {
    total,
    tested,
    passed,
    failed,
    notTested: total - tested,
    passRate: tested > 0 ? Math.round((passed / tested) * 100) : 0,
  }
}
