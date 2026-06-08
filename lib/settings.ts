import { createServerSupabaseClient } from '@/lib/supabase-server'
import { DEFAULT_SITE_SETTINGS, type SiteSettings } from '@/lib/types'

/**
 * Fetch the singleton site_settings row from Supabase.
 * Falls back to hard-coded defaults if the table is missing,
 * the network call fails, or the row hasn't been seeded yet.
 *
 * Server-only: depends on next/headers via supabase-server.
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .eq('id', 'main')
      .maybeSingle()

    if (error || !data) return DEFAULT_SITE_SETTINGS

    return {
      ...DEFAULT_SITE_SETTINGS,
      ...Object.fromEntries(
        Object.entries(data).filter(([, v]) => v !== null && v !== undefined)
      ),
    } as SiteSettings
  } catch {
    return DEFAULT_SITE_SETTINGS
  }
}
