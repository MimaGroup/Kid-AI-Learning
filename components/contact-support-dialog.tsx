"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Send } from "lucide-react"
import { trackEvent } from "@/lib/analytics"

export function ContactSupportDialog() {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    trackEvent("contact_form_submitted", {
      subject: formData.subject,
      source: "subscription_page",
    })

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Pošiljanje sporočila ni uspelo")
      }

      setIsSubmitted(true)

      // Reset form and close dialog after 2 seconds
      setTimeout(() => {
        setFormData({ name: "", email: "", subject: "", message: "" })
        setIsSubmitted(false)
        setOpen(false)
      }, 2000)
    } catch (error) {
      console.error("Error submitting contact form:", error)
      const errorMessage = error instanceof Error ? error.message : "Pošiljanje sporočila ni uspelo. Poskusite znova."
      alert(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 bg-transparent">
          <Mail className="w-4 h-4" />
          Kontaktiraj podporo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Kontaktiraj podporo</DialogTitle>
          <DialogDescription>
            Pošljite nam sporočilo in odgovorili bomo v roku 24–48 ur. Premium naročniki imajo prednostno podporo.
          </DialogDescription>
        </DialogHeader>

        {isSubmitted ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <div className="text-4xl mb-3">✅</div>
            <h3 className="text-lg font-bold text-green-900 mb-2">Sporočilo poslano!</h3>
            <p className="text-green-700 text-sm">Hvala, ker ste nas kontaktirali. Kmalu se vam bomo oglasili.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Vaše ime *</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Janez Novak"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-poštni naslov *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="janez@primer.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Zadeva *</Label>
              <Input
                id="subject"
                name="subject"
                type="text"
                placeholder="Kako vam lahko pomagamo?"
                value={formData.subject}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Sporočilo *</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Povejte nam več o svojem vprašanju ali težavi ..."
                value={formData.message}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                rows={5}
                className="resize-none"
              />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <span className="animate-spin mr-2">⏳</span>
                  Pošiljanje ...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Pošlji sporočilo
                </>
              )}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
