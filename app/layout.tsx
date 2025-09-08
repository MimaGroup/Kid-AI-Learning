import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '../hooks/use-auth'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Kids Learning Platform',
  description: 'Interactive learning platform for children powered by AI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
