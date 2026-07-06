import { Metadata } from "next"
import CanvasClient from "./canvas-client"

export const metadata: Metadata = {
  title: "Business Canvas | KidsLearnAI Admin",
}

export default function CanvasPage() {
  return <CanvasClient />
}
