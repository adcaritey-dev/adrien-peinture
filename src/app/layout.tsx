import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import './globals.css'

export const metadata: Metadata = {
  title: 'Adrien Peinture - Portfolio Artistique',
  description: 'Découvrez les œuvres de peinture artistique d\'Adrien. Galerie d\'art minimaliste, épurée et moderne.',
  keywords: 'peinture, art, galerie, portfolio, artistique',
  authors: [{ name: 'Adrien Peinture' }],
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://adrien.peinture.com',
    siteName: 'Adrien Peinture',
    title: 'Adrien Peinture - Portfolio Artistique',
    description: 'Découvrez les œuvres de peinture artistique d\'Adrien',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Adrien Peinture - Portfolio Artistique',
    description: 'Découvrez les œuvres de peinture artistique d\'Adrien',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#2E7D32" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-secondary text-text-dark">
        <Navigation />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
