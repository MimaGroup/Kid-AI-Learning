// Force dynamic rendering for homepage - bypass edge cache
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
