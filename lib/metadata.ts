import type { Metadata } from "next"

const siteConfig = {
  name: "Kids Learning AI",
  description:
    "Kids Learning AI je vodilna slovenska AI učna platforma za otroke, stare 5–12 let. Interaktivne igre, osnove programiranja in osebni AI tutor Byte — v varnem okolju brez oglasov.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://kids-learning-ai.com",
  ogImage: "/og-image.jpg",
}

export function createMetadata({
  title,
  description,
  image = siteConfig.ogImage,
  path = "",
  noIndex = false,
}: {
  title: string
  description: string
  image?: string
  path?: string
  noIndex?: boolean
}): Metadata {
  const url = `${siteConfig.url}${path}`

  return {
    title: { absolute: title },
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "sl_SI",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
        },
  }
}

export function generateStructuredData(type: "Organization" | "Product" | "FAQPage" | "WebApplication", data: any) {
  const baseUrl = siteConfig.url

  const schemas = {
    Organization: {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: siteConfig.name,
      url: baseUrl,
      logo: `${baseUrl}/icon-512.jpg`,
      description: siteConfig.description,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "Customer Support",
        email: "support@kids-learning-ai.com",
      },
      sameAs: [
        // Add your social media URLs here
        // "https://twitter.com/yourusername",
        // "https://facebook.com/yourpage",
      ],
    },
    Product: {
      "@context": "https://schema.org",
      "@type": "Product",
      name: data?.name || "AI Kids Learning",
      description: data?.description || siteConfig.description,
      brand: {
        "@type": "Brand",
        name: siteConfig.name,
      },
      offers: {
        "@type": "Offer",
        price: data?.price || "7.90",
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
        url: `${baseUrl}/pricing`,
      },
    },
    FAQPage: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: (data?.questions || []).map((q: any) => ({
        "@type": "Question",
        name: q.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: q.answer,
        },
      })),
    },
    WebApplication: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: siteConfig.name,
      url: baseUrl,
      description: siteConfig.description,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Web Browser",
      offers: {
        "@type": "Offer",
        price: data?.price || "7.90",
        priceCurrency: "EUR",
      },
      audience: {
        "@type": "EducationalAudience",
        educationalRole: "student",
        audienceType: "Children ages 5-12",
      },
    },
  }

  return schemas[type]
}
