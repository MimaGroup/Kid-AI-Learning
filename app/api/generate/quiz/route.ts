import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

const QUESTION_POOL = [
  {
    question: "What does AI stand for?",
    options: ["Artificial Intelligence", "Automatic Information", "Advanced Internet", "Amazing Ideas"],
    correct: 0,
    explanation: "AI stands for Artificial Intelligence — computer systems that can do things that normally need human thinking, like recognising faces or understanding speech!",
  },
  {
    question: "Which of these is an example of AI in everyday life?",
    options: ["A light switch", "A voice assistant like Siri", "A bicycle", "A glass of water"],
    correct: 1,
    explanation: "Voice assistants like Siri use AI to understand what you say and give you helpful answers. They get smarter the more people use them!",
  },
  {
    question: "How do computers learn in machine learning?",
    options: ["By reading books", "By watching TV", "By looking at lots of examples and data", "By asking humans every question"],
    correct: 2,
    explanation: "Machine learning works by showing a computer thousands of examples. It finds patterns in those examples and uses them to make predictions — just like how you learn from practice!",
  },
  {
    question: "What is a robot?",
    options: ["A human in a costume", "A machine that can do tasks automatically", "A type of video game", "A special kind of plant"],
    correct: 1,
    explanation: "Robots are machines programmed to carry out tasks automatically. Some robots use AI to make decisions on their own, like robot vacuum cleaners!",
  },
  {
    question: "What can AI NOT do on its own?",
    options: ["Play chess", "Recognise photos", "Feel emotions like happiness or sadness", "Translate languages"],
    correct: 2,
    explanation: "AI can be very clever at tasks, but it doesn't actually feel emotions. It can pretend to be friendly, but it has no real feelings — that's a very human thing!",
  },
  {
    question: "Which animal were early neural networks inspired by?",
    options: ["Fish", "Humans (the human brain)", "Dogs", "Elephants"],
    correct: 1,
    explanation: "Neural networks were inspired by the way the human brain works, using connected 'neurons' that pass signals to each other to learn and make decisions!",
  },
  {
    question: "What is the internet?",
    options: ["A giant library of books", "A worldwide network that connects computers together", "A special type of television", "A robot brain"],
    correct: 1,
    explanation: "The internet is a massive network connecting billions of computers around the world. It lets us share information, play games, and talk to people everywhere!",
  },
  {
    question: "What does a self-driving car use to 'see' the road?",
    options: ["Human drivers in a hidden seat", "Cameras and sensors", "Magic mirrors", "Satellite TV dishes"],
    correct: 1,
    explanation: "Self-driving cars use cameras, radar, and special sensors called LiDAR to 'see' everything around them. AI processes all that information to steer safely!",
  },
  {
    question: "What is a 'bug' in computer programming?",
    options: ["An insect that lives in computers", "A mistake or error in the code", "A very fast computer chip", "A secret cheat code"],
    correct: 1,
    explanation: "A 'bug' is a mistake in the code that makes the program behave unexpectedly. Fixing bugs is called 'debugging' — legend says the name came from a real moth found in an early computer!",
  },
  {
    question: "Which of these jobs uses AI to help doctors?",
    options: ["Cooking lunch", "Analysing medical scans to spot diseases", "Driving the school bus", "Painting pictures"],
    correct: 1,
    explanation: "AI can study thousands of medical scans and learn to spot signs of illness that humans might miss. It helps doctors make better and faster diagnoses!",
  },
  {
    question: "What is a chatbot?",
    options: ["A robot that plays football", "A computer program that can have a conversation with you", "A special type of telephone", "An AI that paints pictures"],
    correct: 1,
    explanation: "A chatbot is a program that talks to you through text or voice. Companies use chatbots to answer questions and help customers any time of day!",
  },
  {
    question: "What does 'data' mean in computing?",
    options: ["A type of pasta", "Information stored or processed by a computer", "The speed of the internet", "A computer's power cable"],
    correct: 1,
    explanation: "Data is information — it can be numbers, words, images, or sounds. Computers store and process huge amounts of data to do useful things!",
  },
  {
    question: "Which of these is an input device for a computer?",
    options: ["Monitor (screen)", "Speakers", "Keyboard", "Printer"],
    correct: 2,
    explanation: "A keyboard is an input device because it sends information INTO the computer. Monitors, speakers, and printers are output devices — they send information OUT from the computer.",
  },
  {
    question: "What does a spam filter use AI for?",
    options: ["Making your email prettier", "Spotting and blocking unwanted emails", "Sending emails faster", "Translating emails into other languages"],
    correct: 1,
    explanation: "Spam filters use AI to learn what junk emails look like and block them before they reach your inbox. They get smarter over time by learning from new examples!",
  },
  {
    question: "What is virtual reality (VR)?",
    options: ["A very fast computer", "A technology that puts you inside a simulated 3D world", "A type of video call", "A robot that copies your movements"],
    correct: 1,
    explanation: "VR uses special headsets to make you feel like you're inside a completely different world. It tricks your eyes and ears into believing you're somewhere else!",
  },
  {
    question: "What do we call it when a computer program learns from its mistakes and gets better over time?",
    options: ["Downloading", "Machine learning", "Copy-pasting", "Rebooting"],
    correct: 1,
    explanation: "Machine learning is when a computer improves by practising — just like you get better at a sport the more you play. The computer adjusts itself each time it makes a mistake!",
  },
  {
    question: "Which of these is NOT a use of AI?",
    options: ["Recommending songs on a music app", "Filling a glass with water", "Translating text to another language", "Detecting faces in photos"],
    correct: 1,
    explanation: "Filling a glass with water is a simple physical task that doesn't need AI — it's just gravity! All the other options need AI to analyse, understand, or predict something.",
  },
  {
    question: "What is a password used for?",
    options: ["Making your computer run faster", "Keeping your accounts safe from others", "Connecting to the internet", "Saving files on a computer"],
    correct: 1,
    explanation: "A password is a secret code that protects your accounts. Always use a mix of letters, numbers, and symbols to create a strong password — and never share it!",
  },
  {
    question: "Which famous scientist is known as the father of computer science?",
    options: ["Albert Einstein", "Alan Turing", "Isaac Newton", "Marie Curie"],
    correct: 1,
    explanation: "Alan Turing is considered the father of computer science. He invented the idea of a universal computing machine and helped crack secret codes in World War II!",
  },
  {
    question: "What does GPS stand for?",
    options: ["General Power System", "Global Positioning System", "Giant Phone Screen", "Guided Path Satellite"],
    correct: 1,
    explanation: "GPS stands for Global Positioning System. It uses signals from satellites orbiting Earth to pinpoint exactly where you are — accurate to just a few metres!",
  },
]

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const count = Math.min(Number(body.count) || 5, QUESTION_POOL.length)
    const questions = shuffle(QUESTION_POOL).slice(0, count)

    return NextResponse.json({ questions })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load quiz questions" },
      { status: 500 }
    )
  }
}
