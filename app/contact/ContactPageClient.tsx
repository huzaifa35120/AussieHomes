'use client'

import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react'
import type { SiteSettings } from '@/lib/types'
import { telHref } from '@/lib/utils'

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-r from-gray-900 to-[#7B1818] text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <p className="section-subtitle text-red-300">Get in Touch</p>
          <h1 className="text-4xl md:text-6xl font-black font-heading mb-4">Contact Us</h1>
          <p className="text-gray-300 text-xl max-w-xl">
            Ready to build? Have a question? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact Info */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold font-heading mb-2">Talk to Our Team</h2>
              <p className="text-gray-500 text-sm">
                Whether you&apos;re ready to start building or just exploring your options, our team is here to help.
              </p>
            </div>

            <div className="space-y-4">
              {settings.phone_office && (
                <a
                  href={telHref(settings.phone_office)}
                  className="flex items-start gap-4 bg-white rounded-xl p-4 border border-gray-200 hover:border-[#C0392B] transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center shrink-0 group-hover:bg-[#C0392B] transition-colors">
                    <Phone size={18} className="text-[#C0392B] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Office</p>
                    <p className="font-semibold text-gray-900">{settings.phone_office}</p>
                  </div>
                </a>
              )}

              {settings.phone_mobile && (
                <a
                  href={telHref(settings.phone_mobile)}
                  className="flex items-start gap-4 bg-white rounded-xl p-4 border border-gray-200 hover:border-[#C0392B] transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center shrink-0 group-hover:bg-[#C0392B] transition-colors">
                    <Phone size={18} className="text-[#C0392B] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Mobile</p>
                    <p className="font-semibold text-gray-900">{settings.phone_mobile}</p>
                  </div>
                </a>
              )}

              {settings.email && (
                <a
                  href={`mailto:${settings.email}`}
                  className="flex items-start gap-4 bg-white rounded-xl p-4 border border-gray-200 hover:border-[#C0392B] transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center shrink-0 group-hover:bg-[#C0392B] transition-colors">
                    <Mail size={18} className="text-[#C0392B] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Email</p>
                    <p className="font-semibold text-gray-900">{settings.email}</p>
                  </div>
                </a>
              )}

              {settings.address_short && (
                <div className="flex items-start gap-4 bg-white rounded-xl p-4 border border-gray-200">
                  <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
                    <MapPin size={18} className="text-[#C0392B]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Location</p>
                    <p className="font-semibold text-gray-900">{settings.address_short}</p>
                    {settings.address_service_area && (
                      <p className="text-gray-500 text-sm">{settings.address_service_area}</p>
                    )}
                  </div>
                </div>
              )}

              {(settings.business_hours_weekday || settings.business_hours_weekend) && (
                <div className="flex items-start gap-4 bg-white rounded-xl p-4 border border-gray-200">
                  <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
                    <Clock size={18} className="text-[#C0392B]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Business Hours</p>
                    {settings.business_hours_weekday && (
                      <p className="font-semibold text-gray-900">{settings.business_hours_weekday}</p>
                    )}
                    {settings.business_hours_weekend && (
                      <p className="text-gray-500 text-sm">{settings.business_hours_weekend}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Enquiry Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
              <h2 className="text-2xl font-bold font-heading mb-2">Send an Enquiry</h2>
              <p className="text-gray-500 text-sm mb-6">Fill in the form below and we&apos;ll get back to you within 24 hours.</p>

              {status === 'success' ? (
                <div className="text-center py-12">
                  <CheckCircle size={52} className="mx-auto text-green-500 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Enquiry Sent!</h3>
                  <p className="text-gray-500 mb-6">
                    Thanks for reaching out. Our team will be in touch shortly.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="btn-primary"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="label">Full Name *</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="John Smith"
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="label">Email Address *</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="john@email.com"
                        className="input-field"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="phone" className="label">Phone Number</label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="04XX XXX XXX"
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label htmlFor="service_type" className="label">Service Required</label>
                      <select
                        id="service_type"
                        name="service_type"
                        value={form.service_type}
                        onChange={handleChange}
                        className="input-field"
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
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project – location, type of work, timeline, budget..."
                      className="input-field resize-none"
                    />
                  </div>

                  {status === 'error' && (
                    <div className="flex items-center gap-2 text-red-600 bg-red-50 rounded-lg px-4 py-3 text-sm">
                      <AlertCircle size={16} />
                      {errorMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="btn-primary w-full justify-center text-base py-4 disabled:opacity-60"
                  >
                    {status === 'loading' ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <>
                        <Send size={18} /> Send Enquiry
                      </>
                    )}
                  </button>

                  <p className="text-center text-gray-400 text-xs">
                    We typically respond within 24 business hours.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
