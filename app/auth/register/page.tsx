import { redirect } from "next/navigation"

// Legacy route — the live registration flow lives at /auth/sign-up.
export default async function RegisterRedirectPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>
}) {
  const { ref } = await searchParams
  redirect(ref ? `/auth/sign-up?ref=${encodeURIComponent(ref)}` : "/auth/sign-up")
}
