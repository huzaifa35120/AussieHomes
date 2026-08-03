import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight, ArrowRight, CheckCircle2, Home, Wrench, Building2, Ruler, HardHat, TreePine, Warehouse } from 'lucide-react'
import Reveal from '@/components/Reveal'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Auzi Homes offers new home builds, renovations, extensions, granny flats and knockdown rebuilds across Sydney. Licensed NSW builder.',
}

const services = [
  {
    id: 'new-builds',
    icon: Home,
    title: 'New Home Builds',
    subtitle: 'Build your dream home from scratch',
    description:
      'At Auzi Homes, we specialise in constructing stunning new homes that combine functionality, beauty, and lasting quality. From the first consultation to the final handover, our team manages every aspect of your new build with precision and care.',
    features: [
      'Custom architectural design consultation',
      'Council approval and DA management',
      'Full structural and interior build',
      'Premium fixtures and fittings',
      'Landscaping and exterior finishes',
      'Final inspection and handover',
    ],
    process: ['Design & Planning', 'Council Approval', 'Foundation & Frame', 'Lockup Stage', 'Fixing & Fit-out', 'Handover'],
  },
  {
    id: 'renovations',
    icon: Wrench,
    title: 'Renovations & Extensions',
    subtitle: 'Transform and expand your existing home',
    description:
      'Breathe new life into your home with a carefully planned renovation or extension. Whether it\'s a kitchen remodel, bathroom upgrade, adding a second storey, or extending the living space, Auzi Homes delivers seamless results that blend the old with the new.',
    features: [
      'Kitchen and bathroom renovations',
      'Second storey additions',
      'Ground floor extensions',
      'Structural alterations',
      'Internal reconfigurations',
      'Outdoor entertainment areas',
    ],
    process: ['Initial Consultation', 'Design & Quote', 'Approvals', 'Demolition', 'Build & Fit-out', 'Completion'],
  },
  {
    id: 'knockdown-rebuild',
    icon: Building2,
    title: 'Knockdown Rebuild',
    subtitle: 'Start fresh, keep your location',
    description:
      'Love your street but not your home? A knockdown rebuild lets you keep the land you love while starting completely fresh. Auzi Homes handles the full process — demolition, design, approvals, and construction of your brand-new home.',
    features: [
      'Demolition and site clearing',
      'Asbestos removal if required',
      'New home design and construction',
      'Council lodgement and management',
      'Temporary accommodation advice',
      'Landscaping and driveway',
    ],
    process: ['Feasibility Check', 'Demolition', 'Design & DA', 'Construction', 'Landscaping', 'Move In'],
  },
  {
    id: 'granny-flats',
    icon: Warehouse,
    title: 'Granny Flats',
    subtitle: 'Smart, self-contained living spaces',
    description:
      'Add value to your property and create flexible living space with a custom-built granny flat. Perfect for extended family, rental income, or a private home office. Auzi Homes delivers compliant, high-quality secondary dwellings from design to completion.',
    features: [
      'Custom design to suit your block',
      'CDC and DA approval management',
      'One and two bedroom layouts',
      'Full kitchen and bathroom fit-out',
      'Energy-efficient construction',
      'Driveway, fencing and landscaping',
    ],
    process: ['Site Assessment', 'Design & Quote', 'Approvals', 'Construction', 'Finishing', 'Handover'],
  },
]

const additionalServices = [
  { icon: Ruler, title: 'Project Management', desc: 'End-to-end project management ensuring quality and schedule.' },
  { icon: HardHat, title: 'Structural Work', desc: 'Structural repairs, underpinning, and reinforcement work.' },
  { icon: TreePine, title: 'Landscaping', desc: 'Outdoor design including gardens, decking, and driveways.' },
]

export default function ServicesPage() {
  return (
    <>
      {/* ============================== HERO ============================== */}
      <section className="relative overflow-hidden bg-brand-ink pt-[calc(var(--nav-h)+5rem)] pb-24 md:pb-32">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1C1210] via-[#2A0F0D] to-[#5C1212]" />
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="absolute -left-20 bottom-0 h-96 w-96 rounded-full bg-brand-orange/20 blur-[120px] animate-float" />

        <div className="relative mx-auto max-w-content px-6">
          <p className="section-subtitle animate-fade-up !text-primary-300">What We Offer</p>
          <h1 className="page-title animate-fade-up anim-delay-100">Our Services</h1>
          <p className="animate-fade-up anim-delay-200 mt-6 max-w-xl text-lg leading-relaxed text-gray-300/90">
            Comprehensive construction solutions for every stage of your home journey.
          </p>

          {/* Quick jump */}
          <div className="animate-fade-up anim-delay-300 mt-10 flex flex-wrap gap-2.5">
            {services.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white/80 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/12 hover:text-white"
              >
                <s.icon size={15} className="text-primary-300" />
                {s.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ============================== DETAIL ============================== */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-content space-y-28 px-6 md:space-y-36">
          {services.map((service, index) => {
            const flipped = index % 2 === 1
            return (
              <div
                key={service.id}
                id={service.id}
                className="grid scroll-mt-32 grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16"
              >
                {/* Copy */}
                <Reveal
                  dir={flipped ? 'right' : 'left'}
                  className={`lg:col-span-7 ${flipped ? 'lg:col-start-6' : ''}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-primary-50">
                      <service.icon size={26} className="text-primary" />
                    </div>
                    <span className="font-heading text-6xl font-black leading-none text-gray-100">
                      0{index + 1}
                    </span>
                  </div>

                  <p className="section-subtitle mt-7">{service.subtitle}</p>
                  <h2 className="section-title">{service.title}</h2>
                  <p className="lead mt-5">{service.description}</p>

                  <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-gray-600">
                        <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-primary" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link href="/contact" className="btn-primary mt-10">
                    Get a Quote <ArrowUpRight size={16} />
                  </Link>
                </Reveal>

                {/* Process */}
                <Reveal
                  dir={flipped ? 'left' : 'right'}
                  delay={120}
                  className={`lg:col-span-5 ${flipped ? 'lg:col-start-1 lg:row-start-1' : ''}`}
                >
                  <div className="relative rounded-3xl border border-gray-100 bg-brand-paper p-8 md:p-9 lg:sticky lg:top-28">
                    <span className="rule-red" />
                    <h3 className="mt-5 font-heading text-lg font-bold text-gray-900">Our Process</h3>

                    <ol className="mt-7 space-y-6">
                      {service.process.map((step, i) => (
                        <li key={step} className="group flex gap-4">
                          <div className="flex flex-col items-center">
                            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-sm font-bold text-primary shadow-soft ring-1 ring-primary-100 transition-all duration-400 ease-out-expo group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                              {i + 1}
                            </span>
                            {i < service.process.length - 1 && (
                              <span className="mt-1.5 w-px flex-1 bg-gradient-to-b from-primary-200 to-transparent" />
                            )}
                          </div>
                          <p className="pt-1.5 text-sm font-semibold text-gray-700 transition-colors duration-300 group-hover:text-primary">
                            {step}
                          </p>
                        </li>
                      ))}
                    </ol>
                  </div>
                </Reveal>
              </div>
            )
          })}
        </div>
      </section>

      {/* ============================== ADDITIONAL ============================== */}
      <section className="relative overflow-hidden bg-brand-paper py-24">
        <div className="absolute inset-0 bg-blueprint opacity-40" />
        <div className="relative mx-auto max-w-content px-6">
          <Reveal className="mx-auto max-w-xl text-center">
            <p className="section-subtitle justify-center">Also Available</p>
            <h2 className="section-title">Additional Services</h2>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {additionalServices.map((s, i) => (
              <Reveal key={s.title} delay={i * 100}>
                <div className="card card-hover group flex h-full gap-5 p-7">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary-50 transition-all duration-500 ease-out-expo group-hover:scale-110 group-hover:bg-primary">
                    <s.icon size={22} className="text-primary transition-colors duration-500 group-hover:text-white" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-gray-900">{s.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-gray-500">{s.desc}</p>
                  </div>
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
            <div className="relative overflow-hidden rounded-[2rem] px-8 py-16 text-center md:px-16 md:py-20">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-light via-primary to-primary-800 animate-pan" />
              <div className="absolute inset-0 bg-grid opacity-50" />

              <div className="relative">
                <h2 className="font-heading text-3xl font-black text-white md:text-[2.75rem] md:leading-tight">
                  Ready to get started?
                </h2>
                <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-white/85">
                  Our team is ready to discuss your project. Get in touch for a free, no-obligation consultation.
                </p>
                <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                  <Link href="/contact" className="btn-white px-8 py-4 text-base">
                    Contact Us <ArrowUpRight size={18} />
                  </Link>
                  <Link href="/projects" className="btn-ghost-light px-8 py-4 text-base">
                    See Our Work <ArrowRight size={18} />
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
