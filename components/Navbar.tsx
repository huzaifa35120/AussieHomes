'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone, ArrowUpRight, ShieldCheck } from 'lucide-react'
import type { SiteSettings } from '@/lib/types'
import { telHref } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar({ settings }: { settings: SiteSettings }) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const pathname = usePathname()

  const onScroll = useCallback(() => {
    const y = window.scrollY
    setScrolled(y > 24)
    const max = document.documentElement.scrollHeight - window.innerHeight
    setProgress(max > 0 ? Math.min(y / max, 1) : 0)
  }, [])

  useEffect(() => {
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [onScroll])

  // Close the drawer on route change
  useEffect(() => { setIsOpen(false) }, [pathname])

  // Lock body scroll while the drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (pathname?.startsWith('/admin')) return null

  const solid = scrolled || isOpen

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        {/* Utility bar – slides away on scroll */}
        <div
          className={`hidden md:block bg-brand-ink text-white/70 overflow-hidden transition-all duration-500 ease-out-expo ${
            scrolled ? 'max-h-0 opacity-0' : 'max-h-12 opacity-100'
          }`}
        >
          <div className="max-w-content mx-auto px-6 flex justify-between items-center h-9 text-[11px] tracking-wide">
            <span className="flex items-center gap-2">
              <ShieldCheck size={13} className="text-primary-400" />
              Licensed NSW Builder &nbsp;·&nbsp; LIC {settings.licence_number} &nbsp;·&nbsp; ACN {settings.acn}
            </span>
            <div className="flex items-center gap-6">
              {settings.phone_office && (
                <a href={telHref(settings.phone_office)} className="flex items-center gap-1.5 hover:text-white transition-colors">
                  <Phone size={12} /> {settings.phone_office}
                </a>
              )}
              {settings.phone_mobile && (
                <a href={telHref(settings.phone_mobile)} className="flex items-center gap-1.5 hover:text-white transition-colors">
                  <Phone size={12} /> {settings.phone_mobile}
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Main bar */}
        <nav
          className={`relative transition-all duration-500 ease-out-expo ${
            solid ? 'glass shadow-soft border-b border-gray-100' : 'bg-transparent'
          }`}
        >
          <div className="max-w-content mx-auto px-5 sm:px-6">
            <div
              className={`flex items-center justify-between transition-all duration-500 ease-out-expo ${
                scrolled ? 'h-16' : 'h-[72px] md:h-20'
              }`}
            >
              {/* Logo */}
              <Link href="/" className="group flex items-center gap-2.5 shrink-0">
                <Image
                  src="/logo.png"
                  alt={settings.company_name}
                  width={200}
                  height={52}
                  priority
                  className={`w-auto transition-all duration-500 ease-out-expo group-hover:scale-105 ${
                    scrolled ? 'h-9' : 'h-9 md:h-11'
                  }`}
                />
                <span
                  className={`font-heading text-lg md:text-xl font-extrabold tracking-tight whitespace-nowrap transition-colors duration-500 ${
                    solid ? 'text-primary' : 'text-white'
                  }`}
                >
                  AUZI HOMES
                </span>
              </Link>

              {/* Desktop links */}
              <div className="hidden lg:flex items-center gap-1">
                {navLinks.map((link) => {
                  const active = pathname === link.href
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-300 ${
                        solid
                          ? active ? 'text-primary' : 'text-gray-600 hover:text-primary'
                          : active ? 'text-white' : 'text-white/75 hover:text-white'
                      }`}
                    >
                      {link.label}
                      <span
                        className={`absolute left-4 right-4 -bottom-0.5 h-[2px] rounded-full origin-left transition-transform duration-400 ease-out-expo ${
                          solid ? 'bg-primary' : 'bg-white'
                        } ${active ? 'scale-x-100' : 'scale-x-0'}`}
                      />
                    </Link>
                  )
                })}
                <Link
                  href="/contact"
                  className={`ml-4 group inline-flex items-center gap-1.5 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all duration-400 ease-out-expo ${
                    solid
                      ? 'bg-primary text-white hover:shadow-red hover:-translate-y-0.5'
                      : 'bg-white text-brand-ink hover:-translate-y-0.5 hover:shadow-lift'
                  }`}
                >
                  Get a Quote
                  <ArrowUpRight size={15} className="transition-transform duration-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>

              {/* Mobile toggle */}
              <button
                onClick={() => setIsOpen((v) => !v)}
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isOpen}
                className={`lg:hidden relative z-10 grid place-items-center w-11 h-11 rounded-xl transition-colors duration-300 ${
                  solid ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                }`}
              >
                <span className={`absolute transition-all duration-300 ${isOpen ? 'opacity-0 rotate-90 scale-75' : 'opacity-100'}`}>
                  <Menu size={24} />
                </span>
                <span className={`absolute transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 -rotate-90 scale-75'}`}>
                  <X size={24} />
                </span>
              </button>
            </div>
          </div>

          {/* Scroll progress */}
          <div
            className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-primary via-brand-orange to-primary-light transition-[width] duration-150 ease-linear"
            style={{ width: `${progress * 100}%`, opacity: scrolled ? 1 : 0 }}
          />
        </nav>
      </header>

      {/* Mobile drawer */}
      <div
        className={`lg:hidden fixed inset-0 z-40 transition-all duration-500 ease-out-expo ${
          isOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <div
          className="absolute inset-0 bg-brand-ink/70 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 h-full w-[86%] max-w-sm bg-white shadow-deep transition-transform duration-500 ease-out-expo ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full pt-24 pb-8 px-7 overflow-y-auto">
            <nav className="flex flex-col">
              {navLinks.map((link, i) => {
                const active = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    style={{ transitionDelay: isOpen ? `${120 + i * 55}ms` : '0ms' }}
                    className={`group flex items-center justify-between border-b border-gray-100 py-4 font-heading text-2xl font-bold transition-all duration-500 ease-out-expo ${
                      isOpen ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0'
                    } ${active ? 'text-primary' : 'text-brand-ink'}`}
                  >
                    {link.label}
                    <ArrowUpRight
                      size={20}
                      className="text-gray-300 transition-all duration-300 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </Link>
                )
              })}
            </nav>

            <div className="mt-auto pt-8 space-y-3">
              {settings.phone_office && (
                <a href={telHref(settings.phone_office)} className="flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-3.5 text-gray-700">
                  <Phone size={16} className="text-primary" />
                  <span className="text-sm font-medium">{settings.phone_office}</span>
                </a>
              )}
              {settings.phone_mobile && (
                <a href={telHref(settings.phone_mobile)} className="flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-3.5 text-gray-700">
                  <Phone size={16} className="text-primary" />
                  <span className="text-sm font-medium">{settings.phone_mobile}</span>
                </a>
              )}
              <Link href="/contact" className="btn-primary w-full py-4 text-base">
                Get a Free Quote <ArrowUpRight size={17} />
              </Link>
              <p className="pt-2 text-center text-[11px] text-gray-400">
                LIC {settings.licence_number} · ACN {settings.acn}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
