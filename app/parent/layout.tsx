import { SupportChat } from "@/components/support-chat"

export default function ParentLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <SupportChat />
    </>
  )
}
