import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { getSiteSettings } from '@/lib/settings'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  return {
    title: {
      default: `${settings.company_name} | ${settings.tagline}`,
      template: `%s | ${settings.company_name}`,
    },
    description: `${settings.company_name} – Sydney's trusted construction company specialising in new home builds, renovations, and knockdown rebuilds. Licensed builder LIC: ${settings.licence_number}.`,
    keywords: ['construction', 'home builder', 'Sydney', 'new builds', 'renovations', 'knockdown rebuild', settings.company_name],
    openGraph: {
      type: 'website',
      locale: 'en_AU',
      url: 'https://auzihomes.com.au',
      siteName: settings.company_name,
    },
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const settings = await getSiteSettings()

  return (
    <html lang="en">
      <body>
        <Navbar settings={settings} />
        <main>{children}</main>
        <Footer settings={settings} />
      </body>
    </html>
  )
}
