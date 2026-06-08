'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Save, Check, AlertCircle, LogOut, Eye } from 'lucide-react'
import { createClient } from '@/lib/supabase'
import { DEFAULT_SITE_SETTINGS, type SiteSettings } from '@/lib/types'

type FieldKey = Exclude<keyof SiteSettings, 'id' | 'updated_at'>

const FIELD_GROUPS: {
  title: string
  description: string
  fields: { key: FieldKey; label: string; type?: 'text' | 'textarea'; hint?: string }[]
}[] = [
  {
    title: 'Company',
    description: 'How the business is presented across the site.',
    fields: [
      { key: 'company_name', label: 'Company Name' },
      { key: 'tagline', label: 'Tagline' },
    ],
  },
  {
    title: 'Director',
    description: 'Director information shown on the About page.',
    fields: [
      { key: 'director_name', label: 'Director Name' },
      { key: 'director_title', label: 'Director Title' },
      { key: 'director_initials', label: 'Initials (avatar)', hint: 'e.g. FT' },
      { key: 'director_quote', label: 'Director Quote', type: 'textarea' },
    ],
  },
  {
    title: 'Credentials',
    description: 'Licence and ABN/ACN numbers shown in the navbar, footer and About page.',
    fields: [
      { key: 'licence_number', label: "Builder's Licence Number" },
      { key: 'acn', label: 'ACN' },
    ],
  },
  {
    title: 'Contact',
    description: 'Public contact details. Leave the office phone blank to hide it everywhere.',
    fields: [
      { key: 'phone_office', label: 'Office Phone', hint: 'Leave blank to hide' },
      { key: 'phone_mobile', label: 'Mobile Phone' },
      { key: 'email', label: 'Email' },
      { key: 'address_short', label: 'Address (short)' },
      { key: 'address_service_area', label: 'Service Area Note' },
    ],
  },
  {
    title: 'Business Hours',
    description: 'Displayed on the Contact page.',
    fields: [
      { key: 'business_hours_weekday', label: 'Weekday Hours' },
      { key: 'business_hours_weekend', label: 'Weekend Hours' },
    ],
  },
]

export default function AdminSettingsPage() {
  const router = useRouter()
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SITE_SETTINGS)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .eq('id', 'main')
        .maybeSingle()

      if (error) {
        setErrorMsg(
          'Could not load settings. Make sure the site_settings table has been created in Supabase.'
        )
        setStatus('error')
      } else if (data) {
        setSettings({ ...DEFAULT_SITE_SETTINGS, ...data })
      }
      setLoading(false)
    }
    load()
  }, [])

  const handleChange = (key: FieldKey, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
    if (status !== 'idle') setStatus('idle')
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setStatus('idle')
    setErrorMsg('')

    const supabase = createClient()
    const { id, updated_at, ...patch } = settings
    void id
    void updated_at

    const { error } = await supabase
      .from('site_settings')
      .update(patch)
      .eq('id', 'main')

    if (error) {
      setErrorMsg(error.message || 'Failed to save settings.')
      setStatus('error')
    } else {
      setStatus('success')
      router.refresh()
      setTimeout(() => setStatus('idle'), 3000)
    }
    setSaving(false)
  }

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-1.5 text-gray-500 hover:text-gray-900 text-sm transition-colors"
            >
              <ArrowLeft size={15} /> Dashboard
            </Link>
            <span className="text-gray-300">|</span>
            <Image src="/logo.png" alt="Auzi Homes" width={120} height={32} className="h-8 w-auto" />
            <span className="text-xs bg-[#C0392B] text-white px-2 py-0.5 rounded font-semibold">
              Settings
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 text-gray-500 hover:text-gray-900 text-sm transition-colors"
            >
              <Eye size={15} /> View Site
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-gray-500 hover:text-red-600 text-sm transition-colors ml-2"
            >
              <LogOut size={15} /> Sign Out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-black font-heading text-gray-900">Site Settings</h1>
          <p className="text-gray-500 text-sm mt-1">
            These values appear across the whole website (navbar, footer, About, Contact, metadata).
          </p>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-44 bg-white rounded-xl animate-pulse" />
            ))}
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-6">
            {FIELD_GROUPS.map((group) => (
              <section
                key={group.title}
                className="bg-white rounded-xl border border-gray-200 p-6"
              >
                <div className="mb-5">
                  <h2 className="text-lg font-bold font-heading text-gray-900">
                    {group.title}
                  </h2>
                  <p className="text-gray-500 text-sm">{group.description}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {group.fields.map((field) => (
                    <div
                      key={field.key}
                      className={field.type === 'textarea' ? 'md:col-span-2' : ''}
                    >
                      <label htmlFor={field.key} className="label">
                        {field.label}
                      </label>
                      {field.type === 'textarea' ? (
                        <textarea
                          id={field.key}
                          rows={4}
                          value={String(settings[field.key] ?? '')}
                          onChange={(e) => handleChange(field.key, e.target.value)}
                          className="input-field resize-none"
                        />
                      ) : (
                        <input
                          id={field.key}
                          type="text"
                          value={String(settings[field.key] ?? '')}
                          onChange={(e) => handleChange(field.key, e.target.value)}
                          className="input-field"
                        />
                      )}
                      {field.hint && (
                        <p className="text-xs text-gray-400 mt-1">{field.hint}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            ))}

            {/* Status messages */}
            {status === 'success' && (
              <div className="flex items-center gap-2 text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-sm">
                <Check size={16} />
                Settings saved. Changes are live across the site.
              </div>
            )}
            {status === 'error' && (
              <div className="flex items-center gap-2 text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm">
                <AlertCircle size={16} />
                {errorMsg}
              </div>
            )}

            {/* Sticky save bar */}
            <div className="sticky bottom-4 flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="btn-primary text-base py-3 px-6 shadow-lg disabled:opacity-60"
              >
                {saving ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Saving...
                  </span>
                ) : (
                  <>
                    <Save size={16} /> Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
