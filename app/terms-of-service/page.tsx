import { redirect } from "next/navigation"

// Legacy route — the canonical Slovenian terms live at /terms.
export default function TermsOfServiceRedirectPage() {
  redirect("/terms")
}
