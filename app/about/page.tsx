import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight, CheckCircle2, Award, Shield, Clock, Users, Heart, Target, Quote } from 'lucide-react'
import { getSiteSettings } from '@/lib/settings'
import Reveal from '@/components/Reveal'

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSiteSettings()
  return {
    title: 'About Us',
    description: `Learn about ${s.company_name} – Sydney's trusted construction company led by ${s.director_name}. Quality new builds, renovations and knockdown rebuilds across Sydney.`,
  }
}

const values = [
  { icon: Heart, title: 'Client First', desc: 'Every decision we make starts with your needs. We listen, advise, and deliver what matters most to you.' },
  { icon: Shield, title: 'Integrity', desc: 'We operate with complete transparency. No hidden costs, no surprises. Just honest, quality work.' },
  { icon: Target, title: 'Excellence', desc: 'We set high standards and never compromise. Every nail, every finish, every detail matters.' },
  { icon: Clock, title: 'On-Time Delivery', desc: 'We respect your time. Our projects are planned meticulously to keep your build on schedule.' },
]

const stats = [
  { value: 'Licensed', label: 'NSW Builder' },
  { value: 'Insured', label: 'HBCF & Public Liability' },
  { value: 'Sydney', label: 'Greater Sydney serviced' },
]

export default async function AboutPage() {
  const settings = await getSiteSettings()

  const credentials = [
    { icon: Award, text: `NSW Builder's Licence: ${settings.licence_number}` },
    { icon: Shield, text: `ACN: ${settings.acn}` },
    { icon: CheckCircle2, text: 'Home Building Compensation Fund covered' },
    { icon: CheckCircle2, text: 'Public Liability Insurance' },
    { icon: CheckCircle2, text: 'Workers Compensation Insurance' },
  ]

  return (
    <>
      {/* ============================== HERO ============================== */}
      <section className="relative overflow-hidden bg-brand-ink pt-[calc(var(--nav-h)+5rem)] pb-24 md:pb-32">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1C1210] via-[#2A0F0D] to-[#5C1212]" />
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="absolute -right-20 top-10 h-96 w-96 rounded-full bg-primary/25 blur-[120px] animate-float" />

        <div className="relative mx-auto max-w-content px-6">
          <p className="section-subtitle animate-fade-up !text-primary-300">Our Story</p>
          <h1 className="page-title animate-fade-up anim-delay-100 max-w-4xl">
            About {settings.company_name}
          </h1>
          <p className="animate-fade-up anim-delay-200 mt-6 max-w-2xl text-lg leading-relaxed text-gray-300/90">
            More than a builder — a partner you can trust for the most important investment of your life.
          </p>
        </div>
      </section>

      {/* ============================== STORY ============================== */}
      <section className="py-24 md:py-32">
        <div className="mx-auto grid max-w-content grid-cols-1 items-start gap-16 px-6 lg:grid-cols-2">
          <Reveal dir="left">
            <p className="section-subtitle">Who We Are</p>
            <h2 className="section-title">
              Building Homes,
              <br />
              Building Trust
            </h2>

            <div className="mt-7 space-y-5 text-[15px] leading-relaxed text-gray-600">
              <p>
                {settings.company_name} is a Sydney-based construction company delivering exceptional residential
                projects. Founded on the principles of quality, transparency and care, we help families build and
                renovate their dream homes across the greater Sydney region.
              </p>
              <p>
                We are a fully licensed builder (LIC: {settings.licence_number}) and operate with complete insurance
                coverage, giving our clients the peace of mind they deserve on every project.
              </p>
              <p>
                Our approach is simple: treat every home as if it were our own. We bring the same level of attention,
                craftsmanship and care to a renovation as we do to a brand-new custom home build.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  style={{ transitionDelay: `${i * 90}ms` }}
                  className="group rounded-2xl border border-gray-100 bg-brand-paper p-5 text-center transition-all duration-500 ease-out-expo hover:-translate-y-1 hover:border-primary-200 hover:shadow-lift"
                >
                  <div className="font-heading text-xl font-black text-primary md:text-2xl">{stat.value}</div>
                  <div className="mt-1 text-xs leading-snug text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Director + credentials */}
          <Reveal dir="right" delay={120} className="space-y-6 lg:sticky lg:top-28">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-light via-primary to-primary-800 p-9 text-white shadow-red">
              <div className="absolute inset-0 bg-grid opacity-40" />
              <Quote size={90} className="absolute -right-3 -top-3 text-white/10" />

              <div className="relative">
                <div className="grid h-16 w-16 place-items-center rounded-2xl bg-white/15 font-heading text-2xl font-black backdrop-blur-sm">
                  {settings.director_initials}
                </div>
                <h3 className="mt-5 font-heading text-xl font-bold text-white">{settings.director_name}</h3>
                <p className="text-sm text-white/70">{settings.director_title}</p>
                <p className="mt-5 text-[15px] leading-relaxed text-white/90">
                  &ldquo;{settings.director_quote}&rdquo;
                </p>
                <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/20 pt-5 text-xs text-white/70">
                  <span className="flex items-center gap-1.5"><Award size={13} /> LIC {settings.licence_number}</span>
                  <span className="flex items-center gap-1.5"><Shield size={13} /> ACN {settings.acn}</span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-soft">
              <h4 className="font-heading text-lg font-bold text-gray-900">Credentials &amp; Licences</h4>
              <div className="mt-5 space-y-3.5">
                {credentials.map((item) => (
                  <div key={item.text} className="flex items-center gap-3 text-sm text-gray-600">
                    <item.icon size={16} className="shrink-0 text-primary" />
                    {item.text}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================== VALUES ============================== */}
      <section className="relative overflow-hidden bg-brand-paper py-24 md:py-32">
        <div className="absolute inset-0 bg-blueprint opacity-40" />
        <div className="relative mx-auto max-w-content px-6">
          <Reveal className="mx-auto max-w-xl text-center">
            <p className="section-subtitle justify-center">Our Values</p>
            <h2 className="section-title">What Drives Us</h2>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 90}>
                <div className="card card-hover group h-full p-7 text-center">
                  <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-primary-50 transition-all duration-500 ease-out-expo group-hover:scale-110 group-hover:bg-primary">
                    <v.icon size={25} className="text-primary transition-colors duration-500 group-hover:text-white" />
                  </div>
                  <h3 className="mt-5 font-heading text-lg font-bold text-gray-900">{v.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-gray-500">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================== CTA ============================== */}
      <section className="py-24 md:py-28">
        <div className="mx-auto max-w-content px-6">
          <Reveal dir="scale">
            <div className="relative overflow-hidden rounded-[2rem] bg-brand-ink px-8 py-16 text-center md:px-16 md:py-20">
              <div className="absolute inset-0 bg-gradient-to-br from-[#2A0F0D] via-[#5C1212] to-[#8C271D] animate-pan" />
              <div className="absolute inset-0 bg-grid opacity-50" />
              <div className="absolute -left-16 -top-16 h-64 w-64 rounded-full bg-primary/30 blur-[100px]" />

              <div className="relative">
                <Users size={38} className="mx-auto text-primary-300" />
                <h2 className="mt-6 font-heading text-3xl font-black text-white md:text-[2.75rem] md:leading-tight">
                  Join the {settings.company_name.replace(' PTY LTD', '')} family
                </h2>
                <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-gray-300">
                  Let us help you build a home you&apos;ll love coming back to.
                </p>
                <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                  <Link href="/contact" className="btn-primary px-8 py-4 text-base">
                    Start Your Project <ArrowUpRight size={18} />
                  </Link>
                  <Link href="/projects" className="btn-ghost-light px-8 py-4 text-base">
                    View Our Work
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
