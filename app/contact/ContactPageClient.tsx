'use client'

import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, AlertCircle, ArrowUpRight } from 'lucide-react'
import type { SiteSettings } from '@/lib/types'
import { telHref } from '@/lib/utils'
import Reveal from '@/components/Reveal'

const SERVICE_OPTIONS = [
  { value: '', label: 'Select a service' },
  { value: 'new_build', label: 'New Home Build' },
  { value: 'renovation', label: 'Renovation & Extension' },
  { value: 'knockdown_rebuild', label: 'Knockdown Rebuild' },
  { value: 'other', label: 'Other / General Enquiry' },
]

export default function ContactPageClient({ settings }: { settings: SiteSettings }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service_type: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', phone: '', service_type: '', message: '' })
      } else {
        const data = await res.json()
        setErrorMsg(data.error || 'Something went wrong. Please try again.')
        setStatus('error')
      }
    } catch {
      setErrorMsg('Network error. Please try again.')
      setStatus('error')
    }
  }

  const contactCards = [
    settings.phone_office && {
      icon: Phone, label: 'Office', value: settings.phone_office, href: telHref(settings.phone_office),
    },
    settings.phone_mobile && {
      icon: Phone, label: 'Mobile', value: settings.phone_mobile, href: telHref(settings.phone_mobile),
    },
    settings.email && {
      icon: Mail, label: 'Email', value: settings.email, href: `mailto:${settings.email}`,
    },
  ].filter(Boolean) as { icon: typeof Phone; label: string; value: string; href: string }[]

  return (
    <>
      {/* ============================== HERO ============================== */}
      <section className="relative overflow-hidden bg-brand-ink pt-[calc(var(--nav-h)+5rem)] pb-24 md:pb-28">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1C1210] via-[#2A0F0D] to-[#5C1212]" />
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="absolute -left-16 top-0 h-96 w-96 rounded-full bg-primary/25 blur-[120px] animate-float" />

        <div className="relative mx-auto max-w-content px-6">
          <p className="section-subtitle animate-fade-up !text-primary-300">Get in Touch</p>
          <h1 className="page-title animate-fade-up anim-delay-100">Contact Us</h1>
          <p className="animate-fade-up anim-delay-200 mt-6 max-w-xl text-lg leading-relaxed text-gray-300/90">
            Ready to build? Have a question? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* ============================== BODY ============================== */}
      <section className="bg-brand-paper py-16 md:py-24">
        <div className="mx-auto grid max-w-content grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:gap-12">
          {/* Info */}
          <Reveal dir="left" className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <p className="section-subtitle">Contact Details</p>
              <h2 className="font-heading text-2xl font-extrabold text-gray-900">Talk to our team</h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-500">
                Whether you&apos;re ready to start building or just exploring your options, our team is here to help.
              </p>

              <div className="mt-8 space-y-3">
                {contactCards.map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    className="group flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-soft transition-all duration-400 ease-out-expo hover:-translate-y-0.5 hover:border-primary-200 hover:shadow-lift"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-50 transition-all duration-400 group-hover:scale-105 group-hover:bg-primary">
                      <c.icon size={18} className="text-primary transition-colors duration-400 group-hover:text-white" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[11px] uppercase tracking-wider text-gray-400">{c.label}</span>
                      <span className="block truncate font-semibold text-gray-900">{c.value}</span>
                    </span>
                    <ArrowUpRight size={16} className="shrink-0 text-gray-300 transition-all duration-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
                  </a>
                ))}

                {settings.address_short && (
                  <div className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-soft">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-50">
                      <MapPin size={18} className="text-primary" />
                    </span>
                    <span>
                      <span className="block text-[11px] uppercase tracking-wider text-gray-400">Location</span>
                      <span className="block font-semibold text-gray-900">{settings.address_short}</span>
                      {settings.address_service_area && (
                        <span className="block text-sm text-gray-500">{settings.address_service_area}</span>
                      )}
                    </span>
                  </div>
                )}

                {(settings.business_hours_weekday || settings.business_hours_weekend) && (
                  <div className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-soft">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-50">
                      <Clock size={18} className="text-primary" />
                    </span>
                    <span>
                      <span className="block text-[11px] uppercase tracking-wider text-gray-400">Business Hours</span>
                      {settings.business_hours_weekday && (
                        <span className="block font-semibold text-gray-900">{settings.business_hours_weekday}</span>
                      )}
                      {settings.business_hours_weekend && (
                        <span className="block text-sm text-gray-500">{settings.business_hours_weekend}</span>
                      )}
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-6 rounded-2xl border border-primary-100 bg-primary-50/60 p-5">
                <p className="text-sm leading-relaxed text-gray-600">
                  <strong className="font-semibold text-gray-900">Licensed &amp; insured.</strong>{' '}
                  NSW Builder&apos;s Licence {settings.licence_number} · ACN {settings.acn}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal dir="right" delay={100} className="lg:col-span-8">
            <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-lift">
              <div className="border-b border-gray-100 bg-gradient-to-r from-brand-paper to-white px-8 py-7">
                <h2 className="font-heading text-2xl font-extrabold text-gray-900">Send an enquiry</h2>
                <p className="mt-1.5 text-sm text-gray-500">
                  Fill in the form and we&apos;ll get back to you within 24 hours.
                </p>
              </div>

              <div className="p-8">
                {status === 'success' ? (
                  <div className="animate-scale-in py-14 text-center">
                    <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-emerald-50">
                      <CheckCircle2 size={40} className="text-emerald-500" />
                    </div>
                    <h3 className="mt-6 font-heading text-2xl font-bold text-gray-900">Enquiry sent</h3>
                    <p className="mx-auto mt-2.5 max-w-sm text-gray-500">
                      Thanks for reaching out. Our team will be in touch shortly.
                    </p>
                    <button onClick={() => setStatus('idle')} className="btn-outline mt-8">
                      Send Another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="label">Full Name *</label>
                        <input
                          id="name" name="name" type="text" required
                          value={form.name} onChange={handleChange}
                          placeholder="John Smith" className="input-field"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="label">Email Address *</label>
                        <input
                          id="email" name="email" type="email" required
                          value={form.email} onChange={handleChange}
                          placeholder="john@email.com" className="input-field"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="phone" className="label">Phone Number</label>
                        <input
                          id="phone" name="phone" type="tel"
                          value={form.phone} onChange={handleChange}
                          placeholder="04XX XXX XXX" className="input-field"
                        />
                      </div>
                      <div>
                        <label htmlFor="service_type" className="label">Service Required</label>
                        <select
                          id="service_type" name="service_type"
                          value={form.service_type} onChange={handleChange}
                          className="input-field cursor-pointer"
                        >
                          {SERVICE_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="label">Message *</label>
                      <textarea
                        id="message" name="message" required rows={6}
                        value={form.message} onChange={handleChange}
                        placeholder="Tell us about your project – location, type of work, timeline, budget…"
                        className="input-field resize-none"
                      />
                    </div>

                    {status === 'error' && (
                      <div className="animate-fade-up flex items-start gap-2.5 rounded-xl border border-red-100 bg-red-50 px-4 py-3.5 text-sm text-red-700">
                        <AlertCircle size={17} className="mt-0.5 shrink-0" />
                        {errorMsg}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="btn-primary w-full py-4 text-base disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {status === 'loading' ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                          Sending…
                        </>
                      ) : (
                        <>
                          <Send size={17} /> Send Enquiry
                        </>
                      )}
                    </button>

                    <p className="text-center text-xs text-gray-400">
                      We typically respond within 24 business hours.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
