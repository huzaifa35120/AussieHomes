'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone } from 'lucide-react'
import type { SiteSettings } from '@/lib/types'
import { telHref } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar({ settings }: { settings: SiteSettings }) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isAdmin = pathname?.startsWith('/admin')
  if (isAdmin) return null

  return (
    <>
      {/* Top bar */}
      <div className="bg-[#7B1818] text-white text-sm py-2 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <span className="text-gray-300 text-xs">
            LIC: {settings.licence_number} | ACN: {settings.acn}
          </span>
          <div className="flex items-center gap-6">
            {settings.phone_office && (
              <a
                href={telHref(settings.phone_office)}
                className="flex items-center gap-1.5 hover:text-red-300 transition-colors"
              >
                <Phone size={13} />
                {settings.phone_office}
              </a>
            )}
            {settings.phone_mobile && (
              <a
                href={telHref(settings.phone_mobile)}
                className="flex items-center gap-1.5 hover:text-red-300 transition-colors"
              >
                <Phone size={13} />
                {settings.phone_mobile}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <nav className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? 'shadow-md' : 'shadow-sm'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.svg"
                alt={settings.company_name}
                width={200}
                height={52}
                className="h-10 md:h-12 w-auto"
                priority
              />
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded font-medium text-sm transition-colors ${
                    pathname === link.href
                      ? 'text-[#C0392B] bg-red-50'
                      : 'text-gray-700 hover:text-[#C0392B] hover:bg-red-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/contact" className="ml-3 btn-primary text-sm py-2.5">
                Get a Quote
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-[#C0392B] transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded font-medium transition-colors ${
                    pathname === link.href
                      ? 'text-[#C0392B] bg-red-50'
                      : 'text-gray-700 hover:text-[#C0392B] hover:bg-red-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-3 pt-3 border-t border-gray-100 flex flex-col gap-2">
                {settings.phone_office && (
                  <a
                    href={telHref(settings.phone_office)}
                    className="flex items-center gap-2 px-4 py-2 text-gray-600"
                  >
                    <Phone size={15} /> {settings.phone_office}
                  </a>
                )}
                {settings.phone_mobile && (
                  <a
                    href={telHref(settings.phone_mobile)}
                    className="flex items-center gap-2 px-4 py-2 text-gray-600"
                  >
                    <Phone size={15} /> {settings.phone_mobile}
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
