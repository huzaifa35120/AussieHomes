'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Phone, Mail, MapPin, Award, Shield, ArrowUpRight, Clock } from 'lucide-react'
import type { SiteSettings } from '@/lib/types'
import { telHref } from '@/lib/utils'

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
]

const serviceLinks = [
  { href: '/services#new-builds', label: 'New Home Builds' },
  { href: '/services#renovations', label: 'Renovations & Extensions' },
  { href: '/services#knockdown-rebuild', label: 'Knockdown Rebuild' },
  { href: '/services#granny-flats', label: 'Granny Flats' },
]

export default function Footer({ settings }: { settings: SiteSettings }) {
  const pathname = usePathname()
  if (pathname?.startsWith('/admin')) return null

  return (
    <footer className="relative overflow-hidden bg-brand-ink text-gray-400">
      {/* CTA band */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary-light via-primary to-primary-800 animate-pan">
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="relative mx-auto max-w-content px-6 py-16 text-center md:py-20">
          <h2 className="font-heading text-3xl font-black text-white md:text-[2.75rem] md:leading-tight">
            Ready to build your dream home?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-white/85">
            Tell us about your project and we&apos;ll come back with a clear, honest plan — free consultation, no obligation.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/contact" className="btn-white px-8 py-3.5 text-base">
              Get a Free Quote <ArrowUpRight size={18} />
            </Link>
            {settings.phone_mobile && (
              <a href={telHref(settings.phone_mobile)} className="btn-ghost-light px-8 py-3.5 text-base">
                <Phone size={17} /> {settings.phone_mobile}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="relative mx-auto max-w-content px-6 py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2.5">
              <Image src="/logo.png" alt={settings.company_name} width={180} height={48} className="h-11 w-auto" />
              <span className="font-heading text-xl font-extrabold tracking-tight text-white">AUZI HOMES</span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-gray-400">
              {settings.tagline}. Sydney&apos;s trusted construction specialists for new builds, renovations and knockdown rebuilds.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-[11px] text-gray-300">
                <Award size={13} className="text-primary-400" /> LIC {settings.licence_number}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-[11px] text-gray-300">
                <Shield size={13} className="text-primary-400" /> ACN {settings.acn}
              </span>
            </div>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-2">
            <h3 className="font-heading text-sm font-bold uppercase tracking-widest text-white">Explore</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="link-underline text-gray-400 transition-colors hover:text-primary-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h3 className="font-heading text-sm font-bold uppercase tracking-widest text-white">Services</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="link-underline text-gray-400 transition-colors hover:text-primary-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className="font-heading text-sm font-bold uppercase tracking-widest text-white">Get in touch</h3>
            <ul className="mt-5 space-y-4 text-sm">
              {settings.phone_office && (
                <li>
                  <a href={telHref(settings.phone_office)} className="group flex items-start gap-3 text-gray-400 transition-colors hover:text-white">
                    <Phone size={15} className="mt-0.5 shrink-0 text-primary" />
                    <span>
                      <span className="block text-[11px] uppercase tracking-wider text-gray-500">Office</span>
                      {settings.phone_office}
                    </span>
                  </a>
                </li>
              )}
              {settings.phone_mobile && (
                <li>
                  <a href={telHref(settings.phone_mobile)} className="group flex items-start gap-3 text-gray-400 transition-colors hover:text-white">
                    <Phone size={15} className="mt-0.5 shrink-0 text-primary" />
                    <span>
                      <span className="block text-[11px] uppercase tracking-wider text-gray-500">Mobile</span>
                      {settings.phone_mobile}
                    </span>
                  </a>
                </li>
              )}
              {settings.email && (
                <li>
                  <a href={`mailto:${settings.email}`} className="flex items-start gap-3 break-all text-gray-400 transition-colors hover:text-white">
                    <Mail size={15} className="mt-0.5 shrink-0 text-primary" />
                    {settings.email}
                  </a>
                </li>
              )}
              {settings.address_short && (
                <li className="flex items-start gap-3">
                  <MapPin size={15} className="mt-0.5 shrink-0 text-primary" />
                  <span>
                    {settings.address_short}
                    {settings.address_service_area && (
                      <span className="block text-xs text-gray-500">{settings.address_service_area}</span>
                    )}
                  </span>
                </li>
              )}
              {(settings.business_hours_weekday || settings.business_hours_weekend) && (
                <li className="flex items-start gap-3">
                  <Clock size={15} className="mt-0.5 shrink-0 text-primary" />
                  <span>
                    {settings.business_hours_weekday}
                    {settings.business_hours_weekend && (
                      <span className="block text-xs text-gray-500">{settings.business_hours_weekend}</span>
                    )}
                  </span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-content flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-gray-500 md:flex-row">
          <p>© {new Date().getFullYear()} {settings.company_name}. All rights reserved.</p>
          <p>
            Director <span className="text-gray-400">{settings.director_name}</span>
            <span className="mx-2 text-gray-700">|</span>
            Builder&apos;s Licence <span className="text-gray-400">{settings.licence_number}</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
