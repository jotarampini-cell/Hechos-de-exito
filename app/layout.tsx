import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { ErrorBoundary } from "@/components/error-boundary"
import { ThemeProvider } from "@/contexts/theme-context"
import "./globals.css"

export const metadata: Metadata = {
  title: "Hechos de Éxito - Empresarios Curiosos",
  description: "Descubre sucesos empresariales de éxito que ocurrieron en esta fecha",
  generator: "v0.app",
  keywords: ["empresarios", "éxito", "motivación", "emprendimiento", "negocios"],
  authors: [{ name: "Rampini Enterprises" }],
  creator: "Rampini Enterprises",
  publisher: "Rampini Enterprises",
  robots: "index, follow",
  openGraph: {
    title: "Hechos de Éxito - Empresarios Curiosos",
    description: "Descubre sucesos empresariales de éxito que ocurrieron en esta fecha",
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hechos de Éxito - Empresarios Curiosos",
    description: "Descubre sucesos empresariales de éxito que ocurrieron en esta fecha",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <ThemeProvider>
          <ErrorBoundary>
            <Suspense fallback={
              <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            }>
              {children}
            </Suspense>
          </ErrorBoundary>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
