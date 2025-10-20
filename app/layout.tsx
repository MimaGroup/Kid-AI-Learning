import type React from "react"
import type { Metadata } from "next"
import { Fredoka, Poppins } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "../hooks/use-auth"
import { ErrorBoundary } from "@/components/error-boundary"
import { PWAInstallPrompt } from "@/components/pwa-install-prompt"
import { OfflineIndicator } from "@/components/offline-indicator"
import { CoppaConsentBanner } from "@/components/coppa-consent-banner"
import Script from "next/script"
import { Analytics } from "@vercel/analytics/react"
import { generateStructuredData } from "@/lib/metadata"
import { StructuredData } from "@/components/structured-data"

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-fredoka",
  display: "swap",
  preload: true,
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-poppins",
  display: "swap",
  preload: true,
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
  const organizationSchema = generateStructuredData("Organization", {})

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://vercel.live" />

        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#8b5cf6" />
        <link rel="apple-touch-icon" href="/icon-192.jpg" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="AI Kids Learning" />
        <StructuredData data={organizationSchema} />
      </head>
      <body className={`${fredoka.variable} ${poppins.variable}`}>
        <ErrorBoundary>
          <AuthProvider>
            {children}
            <PWAInstallPrompt />
            <OfflineIndicator />
            <CoppaConsentBanner />
          </AuthProvider>
        </ErrorBoundary>
        <Analytics />

        <Script id="init-monitoring" strategy="afterInteractive">
          {`
            // Initialize global error handling
            if (typeof window !== 'undefined') {
              // Catch unhandled promise rejections
              window.addEventListener('unhandledrejection', (event) => {
                console.error('[v0] Unhandled promise rejection:', event.reason);
                
                fetch('/api/admin/monitoring/log-error', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    error_type: 'unhandled_rejection',
                    error_message: event.reason?.message || String(event.reason),
                    stack_trace: event.reason?.stack,
                    severity: 'high',
                    source: 'client',
                  }),
                }).catch(err => console.error('[v0] Failed to log error:', err));
              });

              // Catch global errors
              window.addEventListener('error', (event) => {
                console.error('[v0] Global error:', event.error);
                
                fetch('/api/admin/monitoring/log-error', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    error_type: 'global_error',
                    error_message: event.error?.message || event.message,
                    stack_trace: event.error?.stack,
                    severity: 'high',
                    source: 'client',
                    metadata: {
                      filename: event.filename,
                      lineno: event.lineno,
                      colno: event.colno,
                    },
                  }),
                }).catch(err => console.error('[v0] Failed to log error:', err));
              });
            }
          `}
        </Script>

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
      </body>
    </html>
  )
}
