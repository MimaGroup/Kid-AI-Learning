"use client"

import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Mail, MessageSquare, Send } from "lucide-react"
import { useState } from "react"
import { trackEvent } from "@/lib/analytics"

export default function ContactClient() {
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

    // Track contact form submission
    trackEvent("contact_form_submitted", {
      subject: formData.subject,
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
        throw new Error("Failed to send message")
      }

      setIsSubmitted(true)

      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({ name: "", email: "", subject: "", message: "" })
        setIsSubmitted(false)
      }, 3000)
    } catch (error) {
      console.error("[v0] Error submitting contact form:", error)
      alert("Failed to send message. Please try again.")
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <div className="text-center mb-12">
            <div className="text-5xl mb-4">💬</div>
            <h1 className="text-4xl font-bold mb-4 text-gray-900">Contact Us</h1>
            <p className="text-lg text-gray-600">
              We'd love to hear from you! Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-blue-50 p-6 rounded-lg">
              <Mail className="h-8 w-8 text-blue-600 mb-3" />
              <h3 className="font-bold text-lg mb-2">Email Support</h3>
              <p className="text-gray-700 text-sm mb-2">For general inquiries and support</p>
              <a href="mailto:support@kids-learning-ai.com" className="text-blue-600 hover:underline">
                support@kids-learning-ai.com
              </a>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg">
              <MessageSquare className="h-8 w-8 text-purple-600 mb-3" />
              <h3 className="font-bold text-lg mb-2">Response Time</h3>
              <p className="text-gray-700 text-sm mb-2">We typically respond within</p>
              <p className="font-semibold text-gray-900">24-48 hours</p>
              <p className="text-xs text-gray-600 mt-2">(Premium members get priority support)</p>
            </div>
          </div>

          {isSubmitted ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-2xl font-bold text-green-900 mb-2">Message Sent!</h3>
              <p className="text-green-700">Thank you for contacting us. We'll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="How can we help you?"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell us more about your question or concern..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  rows={6}
                  className="resize-none"
                />
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          )}

          <div className="mt-12 pt-8 border-t">
            <h3 className="font-bold text-lg mb-4 text-center">Other Ways to Reach Us</h3>
            <div className="grid md:grid-cols-3 gap-4 text-center text-sm">
              <div>
                <p className="font-semibold mb-1">General Inquiries</p>
                <a href="mailto:info@kids-learning-ai.com" className="text-blue-600 hover:underline">
                  info@kids-learning-ai.com
                </a>
              </div>
              <div>
                <p className="font-semibold mb-1">Privacy Concerns</p>
                <a href="mailto:privacy@kids-learning-ai.com" className="text-blue-600 hover:underline">
                  privacy@kids-learning-ai.com
                </a>
              </div>
              <div>
                <p className="font-semibold mb-1">Legal Matters</p>
                <a href="mailto:legal@kids-learning-ai.com" className="text-blue-600 hover:underline">
                  legal@kids-learning-ai.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
