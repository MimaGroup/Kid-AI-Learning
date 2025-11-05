import { redirect } from "next/navigation"
import { createServerClient } from "@/lib/supabase/server"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MobileNav } from "@/components/mobile-nav"
import { Suspense, lazy } from "react"
import {
  Sparkles,
  Brain,
  Trophy,
  Shield,
  Zap,
  BookOpen,
  Gamepad2,
  Star,
  ArrowRight,
  Check,
  Users,
  Clock,
  Award,
  TrendingUp,
} from "lucide-react"

const TrustBadges = lazy(() => import("@/components/trust-badges").then((mod) => ({ default: mod.TrustBadges })))

export default async function HomePage() {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // If user is authenticated, check their role and redirect accordingly
  if (user) {
    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

    if (profile) {
      // Redirect based on user role
      if (profile.role === "parent") {
        redirect("/parent/dashboard")
      } else if (profile.role === "kid" || profile.role === "child") {
        redirect("/kids/home")
      } else {
        // Default to kids home if role is not set
        redirect("/kids/home")
      }
    } else {
      // If no profile exists, default to kids home
      redirect("/kids/home")
    }
  }

  // Only render marketing page for unauthenticated users
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-primary" />
              <span className="font-bold text-xl">AI Kids Learning</span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <Link
                href="/pricing"
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
              >
                Pricing
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
              >
                About
              </Link>
              <Link
                href="/faq"
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
              >
                FAQ
              </Link>
              <Link href="/auth/login">
                <Button variant="ghost" size="sm">
                  Log in
                </Button>
              </Link>
              <Link href="/getting-started">
                <Button size="sm" className="shadow-lg shadow-primary/20">
                  Get Started
                </Button>
              </Link>
            </div>
            <MobileNav />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Badge variant="secondary" className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                AI-Powered Learning for Kids Ages 5-12
              </Badge>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-balance leading-tight">
                Where Young Minds Meet{" "}
                <span className="text-primary bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Artificial Intelligence
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground text-pretty leading-relaxed">
                Empower your child's future with interactive AI learning experiences. Safe, educational, and designed to
                inspire curiosity.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/getting-started">
                  <Button
                    size="lg"
                    className="text-lg px-8 w-full sm:w-auto shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all"
                  >
                    Start Free Trial
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button size="lg" variant="outline" className="text-lg px-8 w-full sm:w-auto bg-transparent">
                    View Pricing
                  </Button>
                </Link>
              </div>
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground pt-4">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  <span>COPPA compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative bg-gradient-to-br from-primary/20 via-primary/10 to-transparent rounded-3xl p-8 border-2 border-primary/20 shadow-2xl">
                <div className="grid grid-cols-2 gap-4">
                  <Card className="p-6 bg-card hover:shadow-lg transition-shadow">
                    <Gamepad2 className="w-10 h-10 text-primary mb-3" />
                    <h3 className="font-semibold mb-1 text-lg">Interactive Games</h3>
                    <p className="text-sm text-muted-foreground">Learn through play</p>
                  </Card>
                  <Card className="p-6 bg-card hover:shadow-lg transition-shadow">
                    <Brain className="w-10 h-10 text-primary mb-3" />
                    <h3 className="font-semibold mb-1 text-lg">AI Concepts</h3>
                    <p className="text-sm text-muted-foreground">Age-appropriate</p>
                  </Card>
                  <Card className="p-6 bg-card hover:shadow-lg transition-shadow">
                    <Trophy className="w-10 h-10 text-primary mb-3" />
                    <h3 className="font-semibold mb-1 text-lg">Achievements</h3>
                    <p className="text-sm text-muted-foreground">Track progress</p>
                  </Card>
                  <Card className="p-6 bg-card hover:shadow-lg transition-shadow">
                    <Shield className="w-10 h-10 text-primary mb-3" />
                    <h3 className="font-semibold mb-1 text-lg">Safe & Secure</h3>
                    <p className="text-sm text-muted-foreground">Parent controls</p>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Logos Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-muted/20 border-y">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-sm text-muted-foreground mb-6">Trusted by leading educational institutions</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-60">
            <div className="text-2xl font-bold text-muted-foreground">EdTech Awards</div>
            <div className="text-2xl font-bold text-muted-foreground">Parent's Choice</div>
            <div className="text-2xl font-bold text-muted-foreground">COPPA Certified</div>
            <div className="text-2xl font-bold text-muted-foreground">Common Sense Media</div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">10K+</div>
              <div className="text-sm md:text-base opacity-90">Active Students</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">50+</div>
              <div className="text-sm md:text-base opacity-90">Learning Activities</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">98%</div>
              <div className="text-sm md:text-base opacity-90">Parent Satisfaction</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">24/7</div>
              <div className="text-sm md:text-base opacity-90">Learning Access</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Features
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Why Parents Choose Us</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
              A comprehensive platform designed with both education and safety in mind
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 hover:shadow-xl transition-shadow border-2 hover:border-primary/50">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <BookOpen className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Educational Content</h3>
              <p className="text-muted-foreground leading-relaxed">
                Curriculum-aligned lessons that introduce AI concepts through storytelling, puzzles, and creative
                activities designed by education experts.
              </p>
            </Card>
            <Card className="p-8 hover:shadow-xl transition-shadow border-2 hover:border-primary/50">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <Shield className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Safe Environment</h3>
              <p className="text-muted-foreground leading-relaxed">
                COPPA compliant with robust parental controls. Monitor your child's progress and ensure a safe, ad-free
                learning experience.
              </p>
            </Card>
            <Card className="p-8 hover:shadow-xl transition-shadow border-2 hover:border-primary/50">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <Zap className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Adaptive Learning</h3>
              <p className="text-muted-foreground leading-relaxed">
                AI-powered personalization adapts to your child's pace and learning style, ensuring optimal engagement
                and knowledge retention.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="outline" className="mb-4">
                Benefits
              </Badge>
              <h2 className="text-4xl font-bold mb-6 text-balance">Prepare Your Child for Tomorrow's World</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                In an AI-driven future, early exposure to technology and computational thinking gives children a
                significant advantage.
              </p>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Future-Ready Skills</h3>
                    <p className="text-muted-foreground">
                      Build critical thinking and problem-solving abilities essential for the AI age.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Learn at Their Pace</h3>
                    <p className="text-muted-foreground">
                      Self-paced learning that adapts to your child's unique learning style and speed.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Boost Confidence</h3>
                    <p className="text-muted-foreground">
                      Celebrate achievements and build confidence through gamified learning experiences.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <Card className="p-8 bg-gradient-to-br from-primary/10 to-accent/10 border-2">
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-background rounded-lg">
                    <span className="font-medium">AI Storytelling</span>
                    <Badge>Popular</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-background rounded-lg">
                    <span className="font-medium">Pattern Recognition</span>
                    <Badge variant="secondary">New</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-background rounded-lg">
                    <span className="font-medium">Creative Coding</span>
                    <Badge>Popular</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-background rounded-lg">
                    <span className="font-medium">Logic Puzzles</span>
                    <Badge variant="secondary">New</Badge>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Trust and Guarantee Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Risk-Free Learning Experience</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're committed to your child's success and your peace of mind
            </p>
          </div>
          <Suspense fallback={<div className="h-32 bg-muted animate-pulse rounded-lg" />}>
            <TrustBadges />
          </Suspense>
          <div className="mt-12 max-w-3xl mx-auto">
            <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20">
              <div className="text-center">
                <Award className="w-16 h-16 mx-auto mb-4 text-primary" />
                <h3 className="text-2xl font-bold mb-3">30-Day Money-Back Guarantee</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Try AI Kids Learning risk-free for 30 days. If you're not completely satisfied with your child's
                  learning experience, we'll refund your subscription—no questions asked. Your child's education is our
                  priority.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Testimonials
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Trusted by Parents Worldwide</h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of families preparing their children for the AI future
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 hover:shadow-xl transition-shadow">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                "My 8-year-old daughter loves the interactive stories! She's learning about AI without even realizing
                it. The parental dashboard is fantastic."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">Sarah M.</div>
                  <div className="text-sm text-muted-foreground">Parent of 2</div>
                </div>
              </div>
            </Card>
            <Card className="p-8 hover:shadow-xl transition-shadow">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                "As a teacher, I appreciate how well-designed the curriculum is. It's age-appropriate and genuinely
                educational. Highly recommend!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">Michael T.</div>
                  <div className="text-sm text-muted-foreground">Elementary Teacher</div>
                </div>
              </div>
            </Card>
            <Card className="p-8 hover:shadow-xl transition-shadow">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                "The games are engaging and my son actually asks to do his 'AI homework'. Great value for money and
                peace of mind with the safety features."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">Jennifer L.</div>
                  <div className="text-sm text-muted-foreground">Parent of 3</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary via-primary to-accent text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,black)] pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative">
          <Badge
            variant="secondary"
            className="mb-6 bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30"
          >
            Limited Time Offer
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Ready to Start Your Child's AI Journey?</h2>
          <p className="text-xl mb-10 opacity-90 text-balance max-w-2xl mx-auto">
            Join thousands of families giving their children a head start in the AI age. Start your free trial today—no
            credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/getting-started">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-10 w-full sm:w-auto shadow-2xl hover:scale-105 transition-transform"
              >
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-10 w-full sm:w-auto bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
              >
                View Plans
              </Button>
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm opacity-90">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5" />
              <span>COPPA compliant</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/30 border-t py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/getting-started"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Getting Started
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-of-service"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                    Email Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="font-semibold">AI Kids Learning</span>
            </div>
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} AI Kids Learning Platform. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
