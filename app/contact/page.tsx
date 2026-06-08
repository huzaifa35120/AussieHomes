import { getSiteSettings } from '@/lib/settings'
import ContactPageClient from './ContactPageClient'

export default async function ContactPage() {
  const settings = await getSiteSettings()
  return <ContactPageClient settings={settings} />
}
