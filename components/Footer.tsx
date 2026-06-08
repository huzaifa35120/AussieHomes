'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Phone, Mail, MapPin, Award, Shield } from 'lucide-react'
import type { SiteSettings } from '@/lib/types'
import { telHref } from '@/lib/utils'

export default function Footer({ settings }: { settings: SiteSettings }) {
  const pathname = usePathname()
  if (pathname?.startsWith('/admin')) return null

  return (
    <footer className="bg-[#1a1a1a] text-gray-300">
      <div className="bg-[#C0392B] py-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 font-heading">
            Ready to Build Your Dream Home?
          </h2>
          <p className="text-red-100 mb-6 max-w-xl mx-auto">
            Contact us today for a free consultation and quote. We bring your vision to life.
          </p>
          <Link href="/contact" className="btn-white text-base px-8 py-3">
            Get a Free Quote
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/logo.png"
                alt={settings.company_name}
                width={180}
                height={48}
                className="h-12 w-auto"
              />
              <span className="text-xl font-bold text-white tracking-wide whitespace-nowrap">
                AUZI HOMES
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {settings.tagline}. Sydney&apos;s trusted construction specialists for over a decade.
            </p>
            <div className="flex gap-3 mt-4">
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <Award size={14} className="text-[#C0392B]" />
                LIC: {settings.licence_number}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <Shield size={14} className="text-[#C0392B]" />
                ACN: {settings.acn}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 font-heading">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: '/', label: 'Home' },
                { href: '/services', label: 'Services' },
                { href: '/projects', label: 'Projects' },
                { href: '/about', label: 'About Us' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[#E74C3C] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4 font-heading">Services</h3>
            <ul className="space-y-2 text-sm">
              {[
                'New Home Builds',
                'Renovations & Extensions',
                'Knockdown Rebuild',
                'Granny Flats',
                'Structural Work',
                'Project Management',
              ].map((s) => (
                <li key={s}>
                  <Link
                    href="/services"
                    className="text-gray-400 hover:text-[#E74C3C] transition-colors"
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 font-heading">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              {settings.phone_office && (
                <li>
                  <a
                    href={telHref(settings.phone_office)}
                    className="flex items-center gap-2 text-gray-400 hover:text-[#E74C3C] transition-colors"
                  >
                    <Phone size={14} className="text-[#C0392B] shrink-0" />
                    {settings.phone_office}
                  </a>
                </li>
              )}
              {settings.phone_mobile && (
                <li>
                  <a
                    href={telHref(settings.phone_mobile)}
                    className="flex items-center gap-2 text-gray-400 hover:text-[#E74C3C] transition-colors"
                  >
                    <Phone size={14} className="text-[#C0392B] shrink-0" />
                    {settings.phone_mobile}
                  </a>
                </li>
              )}
              {settings.email && (
                <li>
                  <a
                    href={`mailto:${settings.email}`}
                    className="flex items-center gap-2 text-gray-400 hover:text-[#E74C3C] transition-colors"
                  >
                    <Mail size={14} className="text-[#C0392B] shrink-0" />
                    {settings.email}
                  </a>
                </li>
              )}
              {settings.address_short && (
                <li className="flex items-start gap-2 text-gray-400">
                  <MapPin size={14} className="text-[#C0392B] shrink-0 mt-0.5" />
                  {settings.address_short}
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 py-5">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} {settings.company_name}. All rights reserved.</p>
          <p>
            Director: <span className="text-gray-400">{settings.director_name}</span>
            {' '}|{' '}
            Builder&apos;s Licence: <span className="text-gray-400">{settings.licence_number}</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
