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
        <DropdownMenuContent
          align="end"
          className="w-56 bg-white border-2 shadow-xl z-50"
          style={{ backgroundColor: "white" }}
        >
          <DropdownMenuLabel className="bg-white text-gray-900">My Account</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-gray-200" />
          <DropdownMenuItem className="text-sm text-gray-500 break-all bg-white hover:bg-gray-100">
            {user.email}
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-gray-200" />
          <DropdownMenuItem
            onClick={handleSignOut}
            className="bg-white hover:bg-red-50 text-red-600 focus:text-red-600 focus:bg-red-50"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
