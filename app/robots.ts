import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kids-learning-ai.com"

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/parent/dashboard", "/parent/subscription", "/kids/", "/payment/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
