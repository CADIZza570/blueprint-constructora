import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "@/components/LanguageProvider"

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" })

export const metadata: Metadata = {
  title: "Ventura Construcciones — Columbus, Ohio",
  description: "Expert home remodeling in Columbus, Ohio. Kitchens, bathrooms, basements and full renovations. Remodelaciones de hogar en Columbus, Ohio.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${geist.variable} antialiased`}>
      <body className="min-h-full flex flex-col">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
