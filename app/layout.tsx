import type React from "react"
import type { Metadata } from "next"
import { Fredoka, Poppins } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "../hooks/use-auth"
import { ErrorBoundary } from "@/components/error-boundary"
import { PWAInstallPrompt } from "@/components/pwa-install-prompt"
import { OfflineIndicator } from "@/components/offline-indicator"
import { CoppaConsentBanner } from "@/components/coppa-consent-banner"
import { CookieConsentBanner } from "@/components/cookie-consent-banner"
import Script from "next/script"
import { Analytics } from "@vercel/analytics/react"
import { generateStructuredData } from "@/lib/metadata"
import { StructuredData } from "@/components/structured-data"
import { Suspense } from "react"
import { FacebookPixel } from "@/components/facebook-pixel"

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
    default: "Kids Learning AI - Vodilna slovenska AI učna platforma za otroke",
    template: "%s | Kids Learning AI",
  },
  description:
    "Kids Learning AI je vodilna slovenska AI učna platforma za otroke, stare 5–12 let. Interaktivne igre, osnove programiranja in osebni AI tutor Byte — v varnem okolju brez oglasov. Prvih 7 dni brezplačno!",
  keywords: [
    "AI učenje za otroke",
    "izobraževanje otrok",
    "učenje programiranja za otroke",
    "interaktivno učenje",
    "AI igre za otroke",
    "izobraževalna tehnologija",
    "spletna učna platforma",
    "slovenska AI platforma",
  ],
  authors: [{ name: "Kids Learning AI" }],
  creator: "Kids Learning AI",
  publisher: "Kids Learning AI",
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
    title: "Kids Learning AI",
  },
  openGraph: {
    type: "website",
    locale: "sl_SI",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://kids-learning-ai.com",
    title: "Kids Learning AI - Vodilna slovenska AI učna platforma za otroke",
    description:
      "Kids Learning AI je vodilna slovenska AI učna platforma za otroke, stare 5–12 let. Interaktivne igre, osnove programiranja in osebni AI tutor Byte — v varnem okolju brez oglasov.",
    siteName: "Kids Learning AI",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kids Learning AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kids Learning AI - Vodilna slovenska AI učna platforma za otroke",
    description:
      "Kids Learning AI je vodilna slovenska AI učna platforma za otroke, stare 5–12 let. Interaktivne igre, osnove programiranja in osebni AI tutor Byte — v varnem okolju brez oglasov.",
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
        <meta name="facebook-domain-verification" content="v077xiu3yrtnmim6nz97d791fnuf3v" />
        <StructuredData data={organizationSchema} />
      </head>
      <body className={`${fredoka.variable} ${poppins.variable}`}>
        <ErrorBoundary>
          <AuthProvider>
            {children}
            <PWAInstallPrompt />
            <OfflineIndicator />
            <CoppaConsentBanner />
            <CookieConsentBanner />
          </AuthProvider>
        </ErrorBoundary>
        <Analytics />
        <Suspense fallback={null}>
          <FacebookPixel />
        </Suspense>

        <Script id="init-monitoring" strategy="afterInteractive">
          {`
            // Initialize Sentry if DSN is configured
            if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
              // Sentry is initialized via instrumentation.ts
              console.log('[v0] Sentry monitoring active');
            }
            
            // Initialize global error handling (fallback for non-Sentry environments)
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
                // Unregister ALL service workers to clear cache
                navigator.serviceWorker.getRegistrations().then((registrations) => {
                  registrations.forEach((registration) => {
                    console.log('[v0] Unregistering service worker to force fresh content');
                    registration.unregister();
                  });
                });
                
                // Clear all caches
                if ('caches' in window) {
                  caches.keys().then((names) => {
                    names.forEach((name) => {
                      console.log('[v0] Deleting cache:', name);
                      caches.delete(name);
                    });
                  });
                }
                
                console.log('[v0] Service worker disabled - serving fresh content');
              });
            }
          `}
        </Script>
      </body>
    </html>
  )
}
