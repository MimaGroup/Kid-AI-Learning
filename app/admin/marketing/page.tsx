"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Copy, ExternalLink, Facebook, Instagram, ArrowLeft } from "lucide-react"
import Link from "next/link"

const adCreatives = [
  {
    id: "hero-byte",
    title: "Byte z aplikacijo",
    description: "Glavni oglas - Byte maskota s prikazom iger na telefonu. Idealen za prvi vtis.",
    src: "/marketing/ad-hero-byte.jpg",
    format: "1200x628",
    bestFor: ["Facebook Feed", "Facebook Marketplace"],
    suggestedCopy: {
      headline: "Vas otrok se uci AI - skozi igro!",
      body: "KidsLearnAI - 8 interaktivnih AI iger za otroke od 6 do 12 let. Kvizi, uganke, vzorci in vec. Brezplacno za zacetek!",
      cta: "Preizkusi brezplacno"
    }
  },
  {
    id: "games-showcase",
    title: "Otrok igra kviz",
    description: "Oglas z otrokom, ki igra AI kviz na tablici. Prikazuje dejanski gameplay.",
    src: "/marketing/ad-games-showcase.jpg",
    format: "1200x628",
    bestFor: ["Facebook Feed", "Audience Network"],
    suggestedCopy: {
      headline: "AI ucenje, ki je zabavno!",
      body: "Otroci se ucijo o umetni inteligenci skozi igro. Kvizi, spomin, besede, vzorci - vse prilagojeno njihovi starosti.",
      cta: "Zacni brezplacno"
    }
  },
  {
    id: "badges-rewards",
    title: "Dosezki in nagrade",
    description: "Prikaz sistema nagrad in napredka. Motivira starse z gamifikacijo.",
    src: "/marketing/ad-badges-rewards.jpg",
    format: "1200x628",
    bestFor: ["Facebook Feed", "Instagram Feed"],
    suggestedCopy: {
      headline: "Nagrade za vsak korak ucenja",
      body: "Vas otrok osvaja znacke, napreduje po nivojih in se zabava med ucenjem o AI. Pridruzi se KidsLearnAI!",
      cta: "Preizkusi brezplacno"
    }
  },
  {
    id: "square-family",
    title: "Druzina z tablico",
    description: "Starsi in otrok skupaj raziskujeta aplikacijo. Topel, druzinski obcutek.",
    src: "/marketing/ad-square-family.jpg",
    format: "1080x1080",
    bestFor: ["Instagram Feed", "Instagram Stories", "Facebook Stories"],
    suggestedCopy: {
      headline: "Skupaj odkrivajta svet AI",
      body: "KidsLearnAI - platforma, kjer se otroci ucijo o umetni inteligenci skozi igro. Starsi spremljajo napredek.",
      cta: "Zacni brezplacno"
    }
  }
]

export default function MarketingAssetsPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const downloadImage = (src: string, filename: string) => {
    const link = document.createElement("a")
    link.href = src
    link.download = filename
    link.click()
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-8">
          <Link href="/admin" className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Nazaj na Admin
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Marketinski materiali</h1>
          <p className="mt-2 text-muted-foreground">
            Pripravljeni oglasi za Facebook in Instagram. Prenesi slike in kopiraj predlagano besedilo.
          </p>
        </div>

        {/* Quick tips */}
        <Card className="mb-8 border-primary/20 bg-primary/5">
          <CardContent className="pt-6">
            <h3 className="mb-2 font-semibold text-foreground">Nasveti za Facebook oglase</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>{"- Objavljaj ob torkih ali sredah za najboljso vidnost"}</li>
              <li>{"- Ciljaj starse otrok 6-12 let v Sloveniji"}</li>
              <li>{"- Interesi: izobrazevanje, tehnologija, programiranje za otroke"}</li>
              <li>{"- Ustavi prvi oglas (0.25/rezultat) in preusmeri budget na drugega (0.07/rezultat)"}</li>
              <li>{"- Dodaj Pixel za sledenje konverzij od klika do registracije"}</li>
            </ul>
          </CardContent>
        </Card>

        {/* Ad Creatives Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {adCreatives.map((ad) => (
            <Card key={ad.id} className="overflow-hidden">
              <div className="relative aspect-video w-full overflow-hidden bg-muted">
                <Image
                  src={ad.src}
                  alt={ad.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{ad.title}</CardTitle>
                    <CardDescription className="mt-1">{ad.description}</CardDescription>
                  </div>
                  <Badge variant="outline" className="shrink-0 text-xs">
                    {ad.format}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {ad.bestFor.map((platform) => (
                    <Badge key={platform} variant="secondary" className="text-xs">
                      {platform.includes("Instagram") ? (
                        <Instagram className="mr-1 h-3 w-3" />
                      ) : (
                        <Facebook className="mr-1 h-3 w-3" />
                      )}
                      {platform}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Suggested copy */}
                <div className="rounded-lg bg-muted/50 p-3">
                  <p className="mb-1 text-xs font-medium text-muted-foreground">Predlagan naslov:</p>
                  <p className="text-sm font-semibold text-foreground">{ad.suggestedCopy.headline}</p>
                  <p className="mb-1 mt-2 text-xs font-medium text-muted-foreground">Predlagano besedilo:</p>
                  <p className="text-sm text-foreground">{ad.suggestedCopy.body}</p>
                  <p className="mb-1 mt-2 text-xs font-medium text-muted-foreground">CTA gumb:</p>
                  <p className="text-sm font-medium text-primary">{ad.suggestedCopy.cta}</p>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => downloadImage(ad.src, `kidslearnai-${ad.id}.jpg`)}
                    className="flex-1"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Prenesi sliko
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(
                      `${ad.suggestedCopy.headline}\n\n${ad.suggestedCopy.body}`,
                      ad.id
                    )}
                    className="flex-1"
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    {copiedId === ad.id ? "Kopirano!" : "Kopiraj besedilo"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Landing page link suggestion */}
        <Card className="mt-8">
          <CardContent className="pt-6">
            <h3 className="mb-2 font-semibold text-foreground">Povezava za oglase</h3>
            <p className="mb-3 text-sm text-muted-foreground">
              Uporabi to povezavo kot destinacijo oglasa. Vodi na pristajalno stran z brezplacno demo igro.
            </p>
            <div className="flex items-center gap-2 rounded-lg bg-muted p-3">
              <code className="flex-1 text-sm text-foreground">
                {typeof window !== "undefined" ? window.location.origin : "https://kidslearnai.com"}
              </code>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.origin)
                  setCopiedId("url")
                }}
              >
                {copiedId === "url" ? "Kopirano!" : <Copy className="h-4 w-4" />}
              </Button>
              <Button size="sm" variant="outline" asChild>
                <Link href="/" target="_blank">
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
