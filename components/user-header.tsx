"use client"

import { useAuth } from "@/hooks/use-auth"
import { User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function UserHeader() {
  const { user, logout } = useAuth()
  const router = useRouter()

  if (!user) return null

  const handleSignOut = async () => {
    await logout()
    router.push("/auth/login")
  }

  const emailUsername = user.email?.split("@")[0] || user.email

  return (
    <div className="flex items-center gap-3">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-2 h-10 px-3">
            <User className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm font-medium">{emailUsername}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 bg-white z-50">
          <DropdownMenuLabel className="bg-white">My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-sm text-muted-foreground break-all bg-white hover:bg-gray-50">
            {user.email}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut} className="text-destructive bg-white hover:bg-gray-50">
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
