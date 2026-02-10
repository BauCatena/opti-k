import React from "react"
import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const openSans = Open_Sans({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: 'Opti-K | Miradas que Destacan',
  description: 'Óptica Opti-K - Tu destino para lentes de sol y lectura de alta calidad. Miradas que destacan.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/logo2.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${openSans.className} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
