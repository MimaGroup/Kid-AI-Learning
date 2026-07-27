import { KidsNavBar } from "../../components/kids-nav-bar"
import { ActiveChildGuard } from "../../components/active-child-guard"

export default function KidsLayout({ children }: { children: React.ReactNode }) {
  return (
    <ActiveChildGuard>
      {children}
      <KidsNavBar />
    </ActiveChildGuard>
  )
}
