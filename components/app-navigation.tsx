"use client"

import Link from "next/link"
import { usePathname, useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { NotificationsDropdown } from "@/components/notifications-dropdown"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sparkles, Home, Gamepad2, LayoutDashboard, Settings, User, LogOut, Users } from 'lucide-react'
import { useAuth } from "@/hooks/use-auth"
import { cn } from "@/lib/utils"

export function AppNavigation() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuth()

  const handleSignOut = async () => {
    await logout()
    router.push("/auth/login")
  }

  const navItems = [
    {
      label: "Kids Learning",
      href: "/kids/home",
      icon: Home,
      active: pathname?.startsWith("/kids"),
    },
    {
      label: "AI Activities",
      href: "/kids/activities",
      icon: Gamepad2,
      active: pathname === "/kids/activities",
    },
    {
      label: "My Friends",
      href: "/friends",
      icon: Users,
      active: pathname === "/friends",
    },
    {
      label: "Parent Dashboard",
      mobileLabel: "Parent",
      href: "/parent/dashboard",
      icon: LayoutDashboard,
      active: pathname?.startsWith("/parent"),
    },
  ]

  if (!user) return null

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/kids/home" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Sparkles className="w-6 h-6 text-primary" />
            <span className="font-bold text-lg hidden sm:inline">AI Kids Learning</span>
          </Link>

          {/* Main Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={item.active ? "secondary" : "ghost"}
                    size="sm"
                    className={cn("gap-2", item.active && "bg-primary/10 text-primary hover:bg-primary/20")}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Button>
                </Link>
              )
            })}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            <NotificationsDropdown />

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10">
                  <User className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 bg-background border-2 shadow-lg" sideOffset={8}>
                <DropdownMenuLabel className="pb-3">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-semibold">My Account</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="cursor-pointer py-2.5">
                  <Link href="/parent/settings" className="flex items-center">
                    <Settings className="w-4 h-4 mr-3" />
                    <span className="font-medium">Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="cursor-pointer text-destructive focus:text-destructive py-2.5"
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  <span className="font-medium">Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center gap-2 pb-3 overflow-x-auto scrollbar-hide">
          {navItems.map((item) => {
            const Icon = item.icon
            const displayLabel = "mobileLabel" in item ? item.mobileLabel : item.label
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={item.active ? "secondary" : "ghost"}
                  size="sm"
                  className={cn(
                    "gap-2 whitespace-nowrap flex-shrink-0 text-xs sm:text-sm px-3 sm:px-4",
                    item.active && "bg-primary/10 text-primary",
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden xs:inline">{displayLabel}</span>
                </Button>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
