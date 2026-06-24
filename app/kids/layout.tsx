import { KidsNavBar } from "../../components/kids-nav-bar"

export default function KidsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <KidsNavBar />
    </>
  )
}
