"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Quote } from "lucide-react"

interface Testimonial {
  name: string
  role: string
  location: string
  quote: string
  rating: number
  childAge: string
  avatar: string
}

const testimonials: Testimonial[] = [
  {
    name: "Maja K.",
    role: "Mama dveh otrok",
    location: "Ljubljana",
    quote: "Končno platforma, kjer lahko brez skrbi pustim otroke pred zaslonom. Moj 7-letnik se igra in hkrati uči o AI - to je prihodnost izobraževanja!",
    rating: 5,
    childAge: "7 in 9 let",
    avatar: "M"
  },
  {
    name: "Gregor T.",
    role: "Oče",
    location: "Maribor",
    quote: "Naša hči je bila prej samo na TikToku. Zdaj z veseljem rešuje AI uganke in se pogovarja z AI prijateljem. Opazili smo velik napredek v njenem razmišljanju.",
    rating: 5,
    childAge: "10 let",
    avatar: "G"
  },
  {
    name: "Ana P.",
    role: "Učiteljica in mama",
    location: "Celje",
    quote: "Kot učiteljica vem, kako pomembno je, da se otroci naučijo kritičnega razmišljanja. KidsLearnAI to dela na zabaven način. Priporočam vsem staršem!",
    rating: 5,
    childAge: "6 let",
    avatar: "A"
  }
]

export function TestimonialsSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-[#7C3AED] text-[#7C3AED]">
            Mnenja staršev
          </Badge>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-[#2D2A3D]">
            Kaj pravijo starši
          </h2>
          <p className="text-xl text-[#64748B] max-w-3xl mx-auto">
            Resnične zgodbe družin, ki uporabljajo KidsLearnAI
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="p-8 border-[#E2E8F0] hover:shadow-xl transition-all hover:scale-[1.02] rounded-3xl relative overflow-hidden"
            >
              {/* Quote icon */}
              <div className="absolute top-6 right-6 opacity-10">
                <Quote className="w-16 h-16 text-[#7C3AED]" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#FCD34D] text-[#FCD34D]" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-[#64748B] leading-relaxed mb-6 text-lg italic">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-4 border-t border-[#E2E8F0]">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#6CD4C3] flex items-center justify-center text-white font-bold text-lg">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-[#2D2A3D]">{testimonial.name}</div>
                  <div className="text-sm text-[#64748B]">{testimonial.role}, {testimonial.location}</div>
                  <div className="text-xs text-[#7C3AED] font-medium">Otroci: {testimonial.childAge}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
