import { redirect } from "next/navigation"

// Legacy route — the canonical Slovenian privacy policy lives at /privacy.
export default function PrivacyPolicyRedirectPage() {
  redirect("/privacy")
}
