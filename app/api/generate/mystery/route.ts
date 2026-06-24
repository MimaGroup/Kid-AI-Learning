import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

const MYSTERIES = [
  {
    title: "The Missing Robot",
    description: "The classroom robot has disappeared overnight! The principal needs your help to figure out where it went before the big science fair tomorrow.",
    clues: [
      "The robot was last seen near the art room during afternoon break.",
      "There are paint smudges on the storage closet door handle.",
      "The art teacher mentioned she needed help demonstrating movement for the mural project.",
    ],
    solution: "The art teacher borrowed the robot to help students trace movement patterns for the mural. She forgot to leave a note and returned it early next morning!",
  },
  {
    title: "The Vanishing Lunch",
    description: "Someone has been taking snacks from the school fridge every Friday. The lunch monitor is baffled — can you crack the case?",
    clues: [
      "The missing snacks are always the ones on the bottom shelf.",
      "A small muddy footprint was found near the fridge door.",
      "The school's stray cat has been spotted inside the building on Fridays when the back door is left open for deliveries.",
    ],
    solution: "The school's friendly stray cat sneaks in through the back door on delivery day and helps itself to the lowest shelf. The lunch monitor started leaving a little bowl outside instead!",
  },
  {
    title: "The Broken Trophy",
    description: "The chess club trophy has been knocked off its shelf and cracked. Everyone in the club says they didn't do it — but someone knows the truth!",
    clues: [
      "The trophy fell sometime between 3 PM and 4 PM when the room was supposedly empty.",
      "A window latch near the trophy shelf was found unhooked.",
      "A pigeon feather was discovered on the windowsill right next to the broken trophy.",
    ],
    solution: "A pigeon flew in through the unlatched window and knocked the trophy off the shelf while looking for a perch. No one was to blame — just an unexpected visitor!",
  },
  {
    title: "The Invisible Ink Message",
    description: "A mysterious note appeared on the school notice board written in invisible ink. Only part of it is readable. What secret is it hiding?",
    clues: [
      "The visible part reads: 'Meet at the… after the bell… bring a torch.'",
      "The school science club had a session on invisible ink the day before.",
      "The note smells faintly of lemon juice — a common invisible ink ingredient.",
    ],
    solution: "A science club student left a treasure-hunt clue for their friends using lemon-juice invisible ink. The full message revealed the location of a hidden prize in the library!",
  },
  {
    title: "The Playground Puddle Mystery",
    description: "Every morning the playground has a giant puddle — even on dry days! The caretaker can't figure out where the water is coming from.",
    clues: [
      "The puddle always appears in the same corner near the oak tree.",
      "It never appears on weekends.",
      "The sprinkler system timer box is hidden behind the tree and shows a 6 AM weekday schedule.",
    ],
    solution: "A sprinkler head was accidentally pointing at the playground instead of the flower bed. The caretaker adjusted the sprinkler head and the mysterious puddle never came back!",
  },
  {
    title: "The Humming Computer",
    description: "The computer lab computers keep turning on by themselves at midnight, making strange humming sounds. The night security guard is spooked!",
    clues: [
      "The computers always wake up at exactly 12:05 AM.",
      "All affected computers have a green light blinking on their power strips.",
      "The IT teacher recently set up automatic software updates to run overnight.",
    ],
    solution: "The IT teacher scheduled automatic updates for midnight to avoid disrupting lessons. The humming was just the fans spinning up — totally normal and very helpful!",
  },
  {
    title: "The Disappearing Chalk",
    description: "The teachers' chalk keeps going missing from the classrooms. No one is buying it, but it keeps running out!",
    clues: [
      "Chalk only disappears from ground-floor classrooms.",
      "Small white paw prints were spotted on the windowsill of Room 3.",
      "A crow's nest nearby has been spotted decorated with shiny and white objects.",
    ],
    solution: "A clever crow had been collecting chalk pieces from open windowsills to decorate its nest. The teachers started closing their windows and the chalk thefts stopped immediately!",
  },
  {
    title: "The Locked Library Book",
    description: "A very old book in the school library has a tiny padlock on it. Nobody knows where the key is — or what's inside!",
    clues: [
      "The book is titled 'Secrets of Room 7' and was donated 30 years ago.",
      "The librarian found an old envelope tucked behind the bookshelves with the initials 'M.T.' on it.",
      "Room 7 used to be the old headteacher's office, now converted into the art room.",
    ],
    solution: "The envelope contained a key left by the retired headteacher Mr. Thompson. Inside the book were hand-drawn maps and stories about the school's history — a wonderful time capsule!",
  },
  {
    title: "The Moving Scarecrow",
    description: "The scarecrow in the school garden has been found in a different position every morning for a week. Is it alive?!",
    clues: [
      "The scarecrow is always moved sometime between 7 PM and 7 AM.",
      "Tiny wheel tracks in the mud lead to the garden shed.",
      "The garden club built a remote-controlled base for the scarecrow as a tech project.",
    ],
    solution: "The garden club students were testing their remote-control contraption after school — they forgot to tell the teachers! The moving scarecrow was actually a brilliant engineering project.",
  },
  {
    title: "The Singing Lockers",
    description: "Students keep hearing a faint melody coming from the school lockers. It sounds like a familiar nursery rhyme — but lockers don't sing!",
    clues: [
      "The music is only heard near locker 42.",
      "The sound is loudest in the morning and fades by lunchtime.",
      "A student admits they left their music box inside locker 42 after show-and-tell.",
    ],
    solution: "A wind-up music box left in locker 42 plays a tune when the locker temperature changes as the school heats up each morning. The student retrieved it — mystery solved!",
  },
]

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const mystery = MYSTERIES[Math.floor(Math.random() * MYSTERIES.length)]
    return NextResponse.json({ mystery })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load mystery case" },
      { status: 500 }
    )
  }
}
