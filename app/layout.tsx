import type React from "react"
import type { Metadata } from "next"
import { Fredoka, Poppins } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "../hooks/use-auth"
import { ErrorBoundary } from "@/components/error-boundary"
import { PWAInstallPrompt } from "@/components/pwa-install-prompt"
import { OfflineIndicator } from "@/components/offline-indicator"
import Script from "next/script"

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-fredoka",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://kids-learning-ai.com"),
  title: {
    default: "AI Kids Learning Platform - Where Young Minds Meet Artificial Intelligence",
    template: "%s | AI Kids Learning",
  },
  description:
    "Empower your child's future with AI-powered learning. Interactive games, coding lessons, and personalized education for kids ages 5-12. Start learning today!",
  keywords: [
    "AI learning for kids",
    "children education",
    "STEM learning",
    "coding for kids",
    "interactive learning",
    "AI games",
    "educational technology",
    "online learning platform",
  ],
  authors: [{ name: "AI Kids Learning Platform" }],
  creator: "AI Kids Learning Platform",
  publisher: "AI Kids Learning Platform",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  generator: "v0.app",
  manifest: "/manifest.json",
  themeColor: "#8b5cf6",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "AI Kids Learning",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://kids-learning-ai.com",
    title: "AI Kids Learning Platform - Where Young Minds Meet Artificial Intelligence",
    description:
      "Empower your child's future with AI-powered learning. Interactive games, coding lessons, and personalized education for kids ages 5-12.",
    siteName: "AI Kids Learning Platform",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AI Kids Learning Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Kids Learning Platform - Where Young Minds Meet Artificial Intelligence",
    description:
      "Empower your child's future with AI-powered learning. Interactive games, coding lessons, and personalized education for kids ages 5-12.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your verification codes here after claiming your site
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#8b5cf6" />
        <link rel="apple-touch-icon" href="/icon-192.jpg" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="AI Kids Learning" />
      </head>
      <body className={`${fredoka.variable} ${poppins.variable}`}>
        <ErrorBoundary>
          <AuthProvider>
            {children}
            <PWAInstallPrompt />
            <OfflineIndicator />
          </AuthProvider>
        </ErrorBoundary>
        <Script id="register-sw" strategy="afterInteractive">
          {`
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', () => {
                navigator.serviceWorker.register('/service-worker.js')
                  .then((registration) => {
                    console.log('[v0] Service Worker registered:', registration.scope);
                  })
                  .catch((error) => {
                    console.log('[v0] Service Worker registration failed:', error);
                  });
              });
            }
          `}
        </Script>
        <Script id="error-monitoring" strategy="afterInteractive">
          {`
            // Setup global error handling
            window.addEventListener('error', (event) => {
              console.error('[v0] Global error:', event.error);
            });
            
            window.addEventListener('unhandledrejection', (event) => {
              console.error('[v0] Unhandled promise rejection:', event.reason);
            });
          `}
        </Script>
      </body>
    </html>
  )
}
