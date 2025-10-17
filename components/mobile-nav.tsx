"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Sparkles } from "lucide-react"

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="w-6 h-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <nav className="flex flex-col gap-4 mt-8">
          <Link href="/" className="flex items-center gap-2 mb-4" onClick={() => setOpen(false)}>
            <Sparkles className="w-6 h-6 text-primary" />
            <span className="font-bold text-xl">AI Kids Learning</span>
          </Link>
          <Link
            href="/pricing"
            className="text-lg font-medium hover:text-primary transition-colors py-2"
            onClick={() => setOpen(false)}
          >
            Pricing
          </Link>
          <Link
            href="/about"
            className="text-lg font-medium hover:text-primary transition-colors py-2"
            onClick={() => setOpen(false)}
          >
            About
          </Link>
          <Link
            href="/faq"
            className="text-lg font-medium hover:text-primary transition-colors py-2"
            onClick={() => setOpen(false)}
          >
            FAQ
          </Link>
          <Link
            href="/contact"
            className="text-lg font-medium hover:text-primary transition-colors py-2"
            onClick={() => setOpen(false)}
          >
            Contact
          </Link>
          <div className="border-t pt-4 mt-4 space-y-3">
            <Link href="/auth/login" onClick={() => setOpen(false)}>
              <Button variant="outline" className="w-full bg-transparent">
                Log in
              </Button>
            </Link>
            <Link href="/getting-started" onClick={() => setOpen(false)}>
              <Button className="w-full">Get Started</Button>
            </Link>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
