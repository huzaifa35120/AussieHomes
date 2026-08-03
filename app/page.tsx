import Link from 'next/link'
import {
  ArrowUpRight, ArrowRight, CheckCircle2, Home, Wrench, Building2, Phone,
  Warehouse, ShieldCheck, MousePointer2, Sparkles, FileText, MapPin, Hammer,
} from 'lucide-react'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { getSiteSettings } from '@/lib/settings'
import { telHref } from '@/lib/utils'
import ProjectCard from '@/components/ProjectCard'
import Reveal from '@/components/Reveal'
import type { Project } from '@/lib/types'

export const revalidate = 60

async function getFeaturedProjects(): Promise<Project[]> {
  try {
    const supabase = createServerSupabaseClient()
    const { data } = await supabase
      .from('projects')
      .select('*')
      .eq('featured', true)
      .order('created_at', { ascending: false })
      .limit(6)
    return data || []
  } catch {
    return []
  }
}

const services = [
  {
    icon: Home,
    title: 'New Home Builds',
    desc: 'Custom-designed homes built from the ground up, tailored to your lifestyle and budget with premium quality finishes.',
    href: '/services#new-builds',
  },
  {
    icon: Wrench,
    title: 'Renovations & Extensions',
    desc: 'Transform your existing home with expert renovations and seamless extensions that add space and value.',
    href: '/services#renovations',
  },
  {
    icon: Building2,
    title: 'Knockdown Rebuild',
    desc: 'Maximise the potential of your land by replacing your old home with a brand-new, modern masterpiece.',
    href: '/services#knockdown-rebuild',
  },
  {
    icon: Warehouse,
    title: 'Granny Flats',
    desc: 'Add a stylish, self-contained secondary dwelling — perfect for family, rental income, or a private retreat.',
    href: '/services#granny-flats',
  },
]

const process = [
  { step: '01', title: 'Consultation', desc: 'We sit down with you, understand the brief, walk the site and talk honestly about budget.' },
  { step: '02', title: 'Design & Approvals', desc: 'Plans drawn, costs locked in, and we manage the council paperwork end to end.' },
  { step: '03', title: 'Construction', desc: 'Trusted trades, quality materials, and a single point of contact for every question.' },
  { step: '04', title: 'Handover', desc: 'Final inspection, defect-free finish, keys in your hand — and we stay reachable after.' },
]

const marquee = [
  'New Home Builds', 'Renovations', 'Knockdown Rebuild', 'Granny Flats',
  'Extensions', 'Project Management', 'Structural Work', 'Landscaping',
]

export default async function HomePage() {
  const [featuredProjects, settings] = await Promise.all([
    getFeaturedProjects(),
    getSiteSettings(),
  ])

  const trustPoints = [
    { icon: ShieldCheck, title: 'Licensed & Insured', sub: `NSW Builder LIC ${settings.licence_number}` },
    { icon: FileText, title: 'Free Quotes', sub: 'No-obligation consultations' },
    { icon: MapPin, title: 'Sydney Wide', sub: settings.address_service_area },
    { icon: Hammer, title: 'End-to-End Build', sub: 'Design through to handover' },
  ]

  const whyUs = [
    `Licensed NSW Builder (LIC: ${settings.licence_number})`,
    'Full project management from design to handover',
    'Transparent pricing with no hidden costs',
    'Quality materials and trusted tradespeople',
    'On-time delivery, every time',
    'Lifetime relationship – not just a one-off build',
  ]

  return (
    <>
      {/* ============================== HERO ============================== */}
      <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-brand-ink pt-[var(--nav-h)]">
        {/* Layered background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1C1210] via-[#2A0F0D] to-[#5C1212]" />
        <div className="absolute inset-0 bg-grid opacity-[0.55]" />
        <div className="absolute inset-0 bg-noise opacity-[0.035] mix-blend-overlay" />
        <div className="absolute -left-32 top-1/4 h-[30rem] w-[30rem] rounded-full bg-primary/25 blur-[130px] animate-float" />
        <div className="absolute -right-24 bottom-0 h-[26rem] w-[26rem] rounded-full bg-brand-orange/20 blur-[120px] animate-float anim-delay-500" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white to-transparent" />

        <div className="relative mx-auto grid w-full max-w-content gap-14 px-6 py-20 lg:grid-cols-12 lg:items-center lg:py-28">
          {/* Copy */}
          <div className="lg:col-span-7">
            <span className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm">
              <Sparkles size={13} className="text-brand-orange" />
              Sydney&apos;s Trusted Builder
            </span>

            <h1 className="display-title animate-fade-up anim-delay-100 mt-7 text-white">
              Building Homes
              <span className="block text-gradient-red">Just Got Better</span>
            </h1>

            <p className="animate-fade-up anim-delay-200 mt-7 max-w-xl text-lg leading-relaxed text-gray-300/90">
              {settings.company_name.replace(' PTY LTD', '')} delivers exceptional new builds, renovations and knockdown
              rebuilds across Sydney. Quality craftsmanship. On time. Every time.
            </p>

            <div className="animate-fade-up anim-delay-300 mt-10 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className="btn-primary px-8 py-4 text-base">
                Get a Free Quote <ArrowUpRight size={18} />
              </Link>
              <Link href="/projects" className="btn-ghost-light px-8 py-4 text-base">
                View Our Work <ArrowRight size={18} />
              </Link>
            </div>

            {/* Trust row */}
            <div className="animate-fade-up anim-delay-400 mt-12 flex flex-wrap items-center gap-x-8 gap-y-5">
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <ShieldCheck size={22} className="shrink-0 text-primary-400" />
                <span>
                  Licensed &amp; insured
                  <span className="block text-xs text-gray-500">NSW LIC {settings.licence_number}</span>
                </span>
              </div>

              <div className="hidden h-10 w-px bg-white/15 sm:block" />

              <div className="flex items-center gap-3 text-sm text-gray-300">
                <FileText size={22} className="shrink-0 text-primary-400" />
                <span>
                  Free quotes
                  <span className="block text-xs text-gray-500">No-obligation consultation</span>
                </span>
              </div>

              <div className="hidden h-10 w-px bg-white/15 lg:block" />

              <div className="flex items-center gap-3 text-sm text-gray-300">
                <MapPin size={22} className="shrink-0 text-primary-400" />
                <span>
                  Sydney wide
                  <span className="block text-xs text-gray-500">{settings.address_service_area}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Floating quote card */}
          <div className="animate-scale-in anim-delay-300 lg:col-span-5">
            <div className="relative mx-auto max-w-md">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-primary/30 to-transparent blur-2xl" />
              <div className="glass-dark relative rounded-3xl border border-white/12 p-8 shadow-deep">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary text-white animate-pulse-ring">
                    <Phone size={19} />
                  </span>
                  <div>
                    <p className="font-heading text-lg font-bold text-white">Start your project</p>
                    <p className="text-xs text-gray-400">Free consultation · No obligation</p>
                  </div>
                </div>

                <div className="mt-7 space-y-2.5">
                  {settings.phone_office && (
                    <a href={telHref(settings.phone_office)} className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 transition-all duration-300 hover:border-white/25 hover:bg-white/10">
                      <span>
                        <span className="block text-[10px] uppercase tracking-widest text-gray-500">Office</span>
                        <span className="font-semibold text-white">{settings.phone_office}</span>
                      </span>
                      <ArrowUpRight size={16} className="text-gray-500 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
                    </a>
                  )}
                  {settings.phone_mobile && (
                    <a href={telHref(settings.phone_mobile)} className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 transition-all duration-300 hover:border-white/25 hover:bg-white/10">
                      <span>
                        <span className="block text-[10px] uppercase tracking-widest text-gray-500">Mobile</span>
                        <span className="font-semibold text-white">{settings.phone_mobile}</span>
                      </span>
                      <ArrowUpRight size={16} className="text-gray-500 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
                    </a>
                  )}
                </div>

                <Link href="/contact" className="btn-white mt-5 w-full py-3.5">
                  Send an Enquiry <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="pointer-events-none absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex">
          <MousePointer2 size={15} className="text-gray-500" />
          <span className="h-8 w-px bg-gradient-to-b from-gray-500 to-transparent animate-scroll-hint" />
        </div>
      </section>

      {/* ============================== MARQUEE ============================== */}
      <section className="border-y border-gray-100 bg-brand-paper py-5">
        <div className="flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
          <div className="flex shrink-0 animate-marquee items-center gap-10 pr-10">
            {[...marquee, ...marquee].map((item, i) => (
              <span key={i} className="flex shrink-0 items-center gap-10 text-sm font-medium uppercase tracking-[0.18em] text-gray-400">
                {item}
                <span className="h-1.5 w-1.5 rounded-full bg-primary/50" />
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============================== TRUST BAND ============================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-light via-primary to-primary-800 py-14">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="relative mx-auto grid max-w-content grid-cols-1 gap-x-8 gap-y-10 px-6 sm:grid-cols-2 lg:grid-cols-4">
          {trustPoints.map((point, i) => (
            <Reveal key={point.title} delay={i * 100} className="text-center text-white">
              <span className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-white/15 backdrop-blur-sm">
                <point.icon size={22} />
              </span>
              <div className="font-heading text-lg font-extrabold tracking-tight md:text-xl">{point.title}</div>
              <div className="mt-1.5 text-sm text-white/75">{point.sub}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============================== SERVICES ============================== */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 bg-blueprint opacity-40 mask-fade-b" />
        <div className="relative mx-auto max-w-content px-6">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="section-subtitle justify-center">What We Do</p>
            <h2 className="section-title">Our Services</h2>
            <p className="lead mt-5">
              From concept to completion, {settings.company_name.replace(' PTY LTD', '')} delivers end-to-end
              construction solutions across Sydney.
            </p>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, i) => (
              <Reveal key={service.title} delay={i * 90}>
                <Link href={service.href} className="group block h-full">
                  <article className="card card-hover flex h-full flex-col p-7">
                    <span className="absolute right-6 top-6 font-heading text-5xl font-black text-gray-100 transition-colors duration-500 group-hover:text-primary-50">
                      0{i + 1}
                    </span>
                    <div className="relative grid h-14 w-14 place-items-center rounded-2xl bg-primary-50 transition-all duration-500 ease-out-expo group-hover:scale-110 group-hover:bg-primary">
                      <service.icon size={26} className="text-primary transition-colors duration-500 group-hover:text-white" />
                    </div>
                    <h3 className="relative mt-6 font-heading text-lg font-bold text-gray-900 transition-colors duration-300 group-hover:text-primary">
                      {service.title}
                    </h3>
                    <p className="relative mt-3 flex-1 text-sm leading-relaxed text-gray-500">{service.desc}</p>
                    <span className="relative mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                      Learn more
                      <ArrowRight size={15} className="transition-transform duration-400 ease-out-expo group-hover:translate-x-1.5" />
                    </span>
                  </article>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200} className="mt-12 text-center">
            <Link href="/services" className="btn-outline">
              View All Services <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ============================== FEATURED PROJECTS ============================== */}
      <section className="bg-brand-paper py-24 md:py-32">
        <div className="mx-auto max-w-content px-6">
          <Reveal className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="section-subtitle">Our Portfolio</p>
              <h2 className="section-title">Featured Projects</h2>
            </div>
            <Link href="/projects" className="btn-primary self-start md:self-auto">
              All Projects <ArrowUpRight size={16} />
            </Link>
          </Reveal>

          {featuredProjects.length > 0 ? (
            <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.map((project, i) => (
                <Reveal key={project.id} delay={(i % 3) * 110}>
                  <ProjectCard project={project} priority={i < 3} />
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal className="rounded-3xl border border-dashed border-gray-200 bg-white py-20 text-center">
              <Building2 size={46} className="mx-auto text-gray-300" />
              <p className="mt-4 font-heading text-lg font-bold text-gray-500">Projects coming soon</p>
              <p className="mt-1.5 text-sm text-gray-400">Check back shortly to see our latest work</p>
            </Reveal>
          )}
        </div>
      </section>

      {/* ============================== WHY US ============================== */}
      <section className="py-24 md:py-32">
        <div className="mx-auto grid max-w-content grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2">
          <Reveal dir="left">
            <p className="section-subtitle">Why Auzi Homes</p>
            <h2 className="section-title">
              Building Trust,
              <br />
              One Home at a Time
            </h2>
            <p className="lead mt-6">
              {settings.company_name} is a fully licensed Sydney builder committed to excellence, transparency and
              craftsmanship. Led by Director {settings.director_name}, we treat every project as if it were our own home.
            </p>

            <ul className="mt-9 grid gap-3.5 sm:grid-cols-2">
              {whyUs.map((point, i) => (
                <li key={point} className="flex items-start gap-3" style={{ transitionDelay: `${i * 60}ms` }}>
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-primary" />
                  <span className="text-sm leading-relaxed text-gray-600">{point}</span>
                </li>
              ))}
            </ul>

            <Link href="/about" className="btn-primary mt-10">
              About Us <ArrowUpRight size={16} />
            </Link>
          </Reveal>

          {/* Process */}
          <Reveal dir="right" delay={120}>
            <div className="relative">
              <div className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-br from-primary-50 to-transparent" />
              <div className="relative rounded-3xl border border-gray-100 bg-white p-8 shadow-lift md:p-10">
                <h3 className="font-heading text-xl font-bold text-gray-900">How we work</h3>
                <p className="mt-1.5 text-sm text-gray-500">Four clear stages, no surprises.</p>

                <ol className="mt-8 space-y-7">
                  {process.map((p, i) => (
                    <li key={p.step} className="group relative flex gap-5">
                      <div className="flex flex-col items-center">
                        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-50 font-heading text-sm font-black text-primary transition-all duration-400 ease-out-expo group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                          {p.step}
                        </span>
                        {i < process.length - 1 && <span className="mt-2 w-px flex-1 bg-gradient-to-b from-primary-100 to-transparent" />}
                      </div>
                      <div className="pb-1">
                        <p className="font-heading font-bold text-gray-900">{p.title}</p>
                        <p className="mt-1 text-sm leading-relaxed text-gray-500">{p.desc}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
