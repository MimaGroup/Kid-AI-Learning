import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MobileNav } from "@/components/mobile-nav"
import { Suspense, lazy } from "react"
import { Sparkles, Brain, Trophy, Shield, Zap, BookOpen, Gamepad2, Star, ArrowRight, Check, Users, Clock, Award, TrendingUp, Lock, CheckCircle2 } from 'lucide-react'

const TrustBadges = lazy(() => import("@/components/trust-badges").then((mod) => ({ default: mod.TrustBadges })))

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background overflow-x-hidden">
      <nav className="border-b border-border/40 bg-white/95 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center gap-3 hover:scale-105 transition-transform">
              <div className="w-12 h-12 rounded-2xl bg-gradient-purple-blue flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="font-heading font-bold text-2xl bg-gradient-to-r from-[#7C3AED] to-[#6CD4C3] bg-clip-text text-transparent">AI Kids Learning</span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link
                href="/pricing"
                className="text-base font-medium text-foreground/70 hover:text-foreground transition-colors"
              >
                Pricing
              </Link>
              <Link
                href="/about"
                className="text-base font-medium text-foreground/70 hover:text-foreground transition-colors"
              >
                About
              </Link>
              <Link
                href="/faq"
                className="text-base font-medium text-foreground/70 hover:text-foreground transition-colors"
              >
                FAQ
              </Link>
              <Link href="/auth/login">
                <Button variant="ghost" size="lg" className="rounded-full font-medium">
                  Log in
                </Button>
              </Link>
              <Link href="/getting-started">
                <Button
                  size="lg"
                  className="rounded-full font-medium soft-shadow-lg hover:scale-105 transition-all bg-[#7C3AED] hover:bg-[#6B2FD6] text-white"
                >
                  Start Free
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
            <MobileNav />
          </div>
        </div>
      </nav>

      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-[#F5F3FF] via-white to-[#F0FDFA] min-h-[90vh]">
        {/* Decorative background circles */}
        <div className="absolute top-0 right-[10%] w-[500px] h-[500px] bg-gradient-to-br from-[#7C3AED]/10 to-[#6CD4C3]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-[10%] w-[600px] h-[600px] bg-gradient-to-br from-[#FFB5DA]/10 to-[#FCD34D]/10 rounded-full blur-3xl" />
        
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left column - Hero content */}
            <div className="space-y-8">
              <Badge className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-full bg-[#FCD34D] text-[#8B6914] border-0 hover:scale-105 transition-transform">
                <Sparkles className="w-4 h-4" />
                AI-Powered Learning for Kids Ages 5-12
              </Badge>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-heading font-bold text-balance leading-[1.1] tracking-tight">
                <span className="text-[#2D2A3D]">Where Young<br />Minds Meet</span><br />
                <span className="bg-gradient-to-r from-[#A78BFA] via-[#7C3AED] to-[#60A5FA] bg-clip-text text-transparent">Artificial<br />Intelligence</span>
              </h1>
              
              <p className="text-xl md:text-2xl leading-relaxed text-[#64748B] max-w-xl">
                Empower your child's future with interactive AI learning experiences. Safe, educational, and designed to inspire curiosity.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/getting-started">
                  <Button
                    size="lg"
                    className="text-lg px-10 py-7 w-full sm:w-auto rounded-full soft-shadow-lg hover:scale-105 transition-all bg-[#7C3AED] hover:bg-[#6B2FD6] text-white"
                  >
                    Start Free Trial →
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button
                    size="lg"
                    className="text-lg px-10 py-7 w-full sm:w-auto rounded-full soft-shadow-lg hover:scale-105 transition-all bg-white hover:bg-gray-50 text-[#7C3AED] font-semibold"
                  >
                    View Pricing
                  </Button>
                </Link>
              </div>
              
              {/* Trust badges */}
              <div className="flex flex-wrap items-center gap-6 pt-4">
                <div className="flex items-center gap-2 text-sm text-[#64748B]">
                  <Check className="w-5 h-5 text-[#7C3AED]" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#64748B]">
                  <Check className="w-5 h-5 text-[#7C3AED]" />
                  <span>COPPA compliant</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#64748B]">
                  <Check className="w-5 h-5 text-[#7C3AED]" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>
            
            {/* Right column - Features grid */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-6 bg-white/80 backdrop-blur border-[#E2E8F0] hover:shadow-lg transition-all hover:scale-105 rounded-2xl">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#A78BFA] to-[#7C3AED] flex items-center justify-center mb-4">
                  <Gamepad2 className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-heading font-bold text-lg mb-2 text-[#2D2A3D]">Interactive Games</h3>
                <p className="text-sm text-[#64748B]">Learn through play</p>
              </Card>
              
              <Card className="p-6 bg-white/80 backdrop-blur border-[#E2E8F0] hover:shadow-lg transition-all hover:scale-105 rounded-2xl">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#6CD4C3] to-[#4FACAB] flex items-center justify-center mb-4">
                  <Brain className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-heading font-bold text-lg mb-2 text-[#2D2A3D]">AI Concepts</h3>
                <p className="text-sm text-[#64748B]">Age-appropriate</p>
              </Card>
              
              <Card className="p-6 bg-white/80 backdrop-blur border-[#E2E8F0] hover:shadow-lg transition-all hover:scale-105 rounded-2xl">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#FCD34D] to-[#F59E0B] flex items-center justify-center mb-4">
                  <Trophy className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-heading font-bold text-lg mb-2 text-[#2D2A3D]">Achievements</h3>
                <p className="text-sm text-[#64748B]">Track progress</p>
              </Card>
              
              <Card className="p-6 bg-white/80 backdrop-blur border-[#E2E8F0] hover:shadow-lg transition-all hover:scale-105 rounded-2xl">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#FF9980] to-[#EF4444] flex items-center justify-center mb-4">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-heading font-bold text-lg mb-2 text-[#2D2A3D]">Safe & Secure</h3>
                <p className="text-sm text-[#64748B]">Parent controls</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#7C3AED]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div className="space-y-2">
              <div className="text-5xl md:text-6xl font-heading font-bold">10K+</div>
              <div className="text-lg font-medium opacity-90">Active Students</div>
            </div>
            <div className="space-y-2">
              <div className="text-5xl md:text-6xl font-heading font-bold">50+</div>
              <div className="text-lg font-medium opacity-90">Learning Activities</div>
            </div>
            <div className="space-y-2">
              <div className="text-5xl md:text-6xl font-heading font-bold">98%</div>
              <div className="text-lg font-medium opacity-90">Parent Satisfaction</div>
            </div>
            <div className="space-y-2">
              <div className="text-5xl md:text-6xl font-heading font-bold">24/7</div>
              <div className="text-lg font-medium opacity-90">Learning Access</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 border-[#7C3AED] text-[#7C3AED]">
              Features
            </Badge>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-[#2D2A3D]">Why Parents Choose Us</h2>
            <p className="text-xl text-[#64748B] max-w-3xl mx-auto">
              A comprehensive platform designed with both education and safety in mind
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-10 border-[#E2E8F0] hover:shadow-xl transition-all hover:scale-105 rounded-3xl">
              <div className="w-16 h-16 rounded-2xl bg-[#F3E8FF] flex items-center justify-center mb-6">
                <BookOpen className="w-8 h-8 text-[#7C3AED]" />
              </div>
              <h3 className="text-2xl font-heading font-bold mb-4 text-[#2D2A3D]">Educational Content</h3>
              <p className="text-[#64748B] leading-relaxed">
                Curriculum-aligned lessons that introduce AI concepts through engaging, age-appropriate activities and storytelling.
              </p>
            </Card>
            
            <Card className="p-10 border-[#E2E8F0] hover:shadow-xl transition-all hover:scale-105 rounded-3xl">
              <div className="w-16 h-16 rounded-2xl bg-[#E0F2FE] flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-[#0EA5E9]" />
              </div>
              <h3 className="text-2xl font-heading font-bold mb-4 text-[#2D2A3D]">Safe Environment</h3>
              <p className="text-[#64748B] leading-relaxed">
                COPPA compliant with robust parental controls, content filtering, and real-time monitoring for complete peace of mind.
              </p>
            </Card>
            
            <Card className="p-10 border-[#E2E8F0] hover:shadow-xl transition-all hover:scale-105 rounded-3xl">
              <div className="w-16 h-16 rounded-2xl bg-[#FEF3C7] flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-[#F59E0B]" />
              </div>
              <h3 className="text-2xl font-heading font-bold mb-4 text-[#2D2A3D]">Adaptive Learning</h3>
              <p className="text-[#64748B] leading-relaxed">
                AI-powered personalization adapts to your child's pace and learning style for optimal engagement and progress.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#F5F3FF] to-[#F0FDFA]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left column - Benefits */}
            <div className="space-y-8">
              <div>
                <Badge variant="outline" className="mb-4 border-[#7C3AED] text-[#7C3AED]">
                  Benefits
                </Badge>
                <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-[#2D2A3D]">
                  Prepare Your Child<br />for Tomorrow's World
                </h2>
                <p className="text-xl text-[#64748B] leading-relaxed">
                  In an AI-driven future, early exposure to technology and computational thinking gives children a significant advantage.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-xl bg-[#F3E8FF] flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-[#7C3AED]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-bold mb-2 text-[#2D2A3D]">Future-Ready Skills</h3>
                    <p className="text-[#64748B]">Build critical thinking and problem-solving abilities essential for the AI age.</p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-xl bg-[#E0F2FE] flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-[#0EA5E9]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-bold mb-2 text-[#2D2A3D]">Learn at Their Pace</h3>
                    <p className="text-[#64748B]">Self-paced learning that adapts to your child's unique learning style and speed.</p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-xl bg-[#FEF3C7] flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-[#F59E0B]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-bold mb-2 text-[#2D2A3D]">Boost Confidence</h3>
                    <p className="text-[#64748B]">Celebrate achievements and build confidence through gamified learning experiences.</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right column - Activities */}
            <div className="space-y-4">
              <Card className="p-6 border-[#E2E8F0] hover:shadow-lg transition-all rounded-2xl bg-white">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-heading font-bold text-[#2D2A3D]">AI Storytelling</h3>
                  <Badge className="bg-[#7C3AED] text-white">Popular</Badge>
                </div>
              </Card>
              
              <Card className="p-6 border-[#E2E8F0] hover:shadow-lg transition-all rounded-2xl bg-white">
                <Link href="/learn/language" className="flex items-center justify-between">
                  <h3 className="text-xl font-heading font-bold text-[#2D2A3D]">AI Language Learning</h3>
                  <Badge className="bg-[#FCD34D] text-[#8B6914]">New</Badge>
                </Link>
              </Card>
              
              <Card className="p-6 border-[#E2E8F0] hover:shadow-lg transition-all rounded-2xl bg-white">
                <Link href="/friends" className="flex items-center justify-between">
                  <h3 className="text-xl font-heading font-bold text-[#2D2A3D]">Play with Friends</h3>
                  <Badge className="bg-[#FCD34D] text-[#8B6914]">New</Badge>
                </Link>
              </Card>
              
              <Card className="p-6 border-[#E2E8F0] hover:shadow-lg transition-all rounded-2xl bg-white">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-heading font-bold text-[#2D2A3D]">Pattern Recognition</h3>
                  <Badge className="bg-[#FCD34D] text-[#8B6914]">New</Badge>
                </div>
              </Card>
              
              <Card className="p-6 border-[#E2E8F0] hover:shadow-lg transition-all rounded-2xl bg-white">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-heading font-bold text-[#2D2A3D]">Creative Coding</h3>
                  <Badge className="bg-[#7C3AED] text-white">Popular</Badge>
                </div>
              </Card>
              
              <Card className="p-6 border-[#E2E8F0] hover:shadow-lg transition-all rounded-2xl bg-white">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-heading font-bold text-[#2D2A3D]">Logic Puzzles</h3>
                  <Badge className="bg-[#FCD34D] text-[#8B6914]">New</Badge>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-[#2D2A3D]">Risk-Free Learning Experience</h2>
            <p className="text-xl text-[#64748B]">We're committed to your child's success and your peace of mind</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            <Card className="p-8 text-center border-[#E2E8F0] hover:shadow-lg transition-all rounded-2xl">
              <div className="w-16 h-16 rounded-full bg-[#F3E8FF] flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-[#7C3AED]" />
              </div>
              <h3 className="font-heading font-bold text-lg mb-2 text-[#2D2A3D]">COPPA Compliant</h3>
              <p className="text-sm text-[#64748B]">Child safety certified</p>
            </Card>
            
            <Card className="p-8 text-center border-[#E2E8F0] hover:shadow-lg transition-all rounded-2xl">
              <div className="w-16 h-16 rounded-full bg-[#E0F2FE] flex items-center justify-center mx-auto mb-6">
                <Lock className="w-8 h-8 text-[#0EA5E9]" />
              </div>
              <h3 className="font-heading font-bold text-lg mb-2 text-[#2D2A3D]">Secure Payments</h3>
              <p className="text-sm text-[#64748B]">256-bit SSL encryption</p>
            </Card>
            
            <Card className="p-8 text-center border-[#E2E8F0] hover:shadow-lg transition-all rounded-2xl">
              <div className="w-16 h-16 rounded-full bg-[#FEF3C7] flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-[#F59E0B]" />
              </div>
              <h3 className="font-heading font-bold text-lg mb-2 text-[#2D2A3D]">Money-Back Guarantee</h3>
              <p className="text-sm text-[#64748B]">30-day full refund</p>
            </Card>
            
            <Card className="p-8 text-center border-[#E2E8F0] hover:shadow-lg transition-all rounded-2xl">
              <div className="w-16 h-16 rounded-full bg-[#DCFCE7] flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8 text-[#22C55E]" />
              </div>
              <h3 className="font-heading font-bold text-lg mb-2 text-[#2D2A3D]">No Commitment</h3>
              <p className="text-sm text-[#64748B]">Cancel anytime</p>
            </Card>
          </div>
          
          <Card className="p-12 bg-gradient-to-br from-[#F5F3FF] to-[#F0FDFA] border-[#E2E8F0] rounded-3xl text-center max-w-4xl mx-auto">
            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mx-auto mb-6 soft-shadow">
              <Award className="w-10 h-10 text-[#7C3AED]" />
            </div>
            <h3 className="text-3xl font-heading font-bold mb-4 text-[#2D2A3D]">30-Day Money-Back Guarantee</h3>
            <p className="text-lg text-[#64748B] leading-relaxed max-w-2xl mx-auto">
              Try AI Kids Learning risk-free for 30 days. If you're not completely satisfied with your child's learning experience, we'll refund your subscription—no questions asked. Your child's education is our priority.
            </p>
          </Card>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 border-[#7C3AED] text-[#7C3AED]">
              Testimonials
            </Badge>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-[#2D2A3D]">Trusted by Parents Worldwide</h2>
            <p className="text-xl text-[#64748B]">
              Join thousands of families preparing their children for the AI future
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 hover:shadow-xl transition-shadow border-[#E2E8F0] rounded-2xl">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#7C3AED] text-[#7C3AED]" />
                ))}
              </div>
              <p className="text-[#64748B] mb-6 leading-relaxed">
                "My 8-year-old daughter loves the interactive stories! She's learning about AI without even realizing
                it. The parental dashboard is fantastic."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#F3E8FF] flex items-center justify-center">
                  <Users className="w-6 h-6 text-[#7C3AED]" />
                </div>
                <div>
                  <div className="font-semibold text-[#2D2A3D]">Sarah M.</div>
                  <div className="text-sm text-[#64748B]">Parent of 2</div>
                </div>
              </div>
            </Card>
            <Card className="p-8 hover:shadow-xl transition-shadow border-[#E2E8F0] rounded-2xl">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#7C3AED] text-[#7C3AED]" />
                ))}
              </div>
              <p className="text-[#64748B] mb-6 leading-relaxed">
                "As a teacher, I appreciate how well-designed the curriculum is. It's age-appropriate and genuinely
                educational. Highly recommend!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#F3E8FF] flex items-center justify-center">
                  <Users className="w-6 h-6 text-[#7C3AED]" />
                </div>
                <div>
                  <div className="font-semibold text-[#2D2A3D]">Michael T.</div>
                  <div className="text-sm text-[#64748B]">Elementary Teacher</div>
                </div>
              </div>
            </Card>
            <Card className="p-8 hover:shadow-xl transition-shadow border-[#E2E8F0] rounded-2xl">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#7C3AED] text-[#7C3AED]" />
                ))}
              </div>
              <p className="text-[#64748B] mb-6 leading-relaxed">
                "The games are engaging and my son actually asks to do his 'AI homework'. Great value for money and
                peace of mind with the safety features."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#F3E8FF] flex items-center justify-center">
                  <Users className="w-6 h-6 text-[#7C3AED]" />
                </div>
                <div>
                  <div className="font-semibold text-[#2D2A3D]">Jennifer L.</div>
                  <div className="text-sm text-[#64748B]">Parent of 3</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-purple-blue text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED] to-[#6366F1]" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Badge className="mb-6 bg-white/20 text-white border-white/30 px-6 py-3 rounded-full font-semibold">
            Limited Time Offer
          </Badge>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">Ready to Start Your Child's AI Journey?</h2>
          <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">
            Join thousands of families giving their children a head start in the AI age. Start your free trial today—no
            credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/getting-started">
              <Button
                size="lg"
                className="text-lg px-10 py-7 w-full sm:w-auto rounded-full soft-shadow-lg hover:scale-105 transition-all bg-white text-[#7C3AED] hover:bg-gray-100"
              >
                Start Free Trial
                <span className="ml-2">→</span>
              </Button>
            </Link>
            <Link href="/pricing">
              <Button
                size="lg"
                className="text-lg px-10 py-7 w-full sm:w-auto rounded-full soft-shadow-lg hover:scale-105 transition-all bg-white hover:bg-gray-50 text-[#7C3AED]"
              >
                View Plans
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-[#2D2A3D] text-white py-12 px-4 sm:px-6 lg:px-8">
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
              <span className="font-heading font-bold text-2xl text-foreground">AI Kids Learning</span>
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
