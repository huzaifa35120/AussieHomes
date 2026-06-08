import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, CheckCircle, Home, Wrench, Building2, Star, Phone, Award, Users, Clock } from 'lucide-react'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { getSiteSettings } from '@/lib/settings'
import { telHref } from '@/lib/utils'
import ProjectCard from '@/components/ProjectCard'
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

const stats = [
  { value: '10+', label: 'Years Experience', icon: Clock },
  { value: '200+', label: 'Projects Completed', icon: Building2 },
  { value: '100%', label: 'Licensed & Insured', icon: Award },
  { value: '500+', label: 'Happy Families', icon: Users },
]

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
]

export default async function HomePage() {
  const [featuredProjects, settings] = await Promise.all([
    getFeaturedProjects(),
    getSiteSettings(),
  ])

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
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-[#1a0a0a] to-[#2d0808] text-white overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, #C0392B 0, #C0392B 1px, transparent 0, transparent 50%)',
            backgroundSize: '20px 20px'
          }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 md:py-32">
          <div className="max-w-3xl">
            <span className="inline-block bg-[#C0392B] text-white text-xs font-bold px-3 py-1.5 rounded mb-6 uppercase tracking-wider">
              Sydney&apos;s Trusted Builder
            </span>
            <h1 className="text-5xl md:text-7xl font-black mb-6 font-heading leading-tight">
              Building Homes<br />
              <span className="text-[#E05A2B]">Just Got Better</span>
            </h1>
            <p className="text-xl text-gray-300 mb-10 max-w-xl leading-relaxed">
              Auzi Homes delivers exceptional new builds, renovations, and knockdown rebuilds across Sydney. Quality craftsmanship. On time. Every time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="btn-primary text-base px-8 py-4">
                Get a Free Quote <ArrowRight size={18} />
              </Link>
              <Link href="/projects" className="btn-outline text-base px-8 py-4 border-white text-white hover:bg-white hover:text-gray-900">
                View Our Work
              </Link>
            </div>
            <div className="flex items-center gap-6 mt-10">
              <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-9 h-9 rounded-full bg-gradient-to-br from-red-400 to-red-700 border-2 border-gray-900 flex items-center justify-center text-xs font-bold">
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex text-yellow-400 mb-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <p className="text-gray-400 text-xs">500+ happy clients across Sydney</p>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }} />
      </section>

      {/* Stats Bar */}
      <section className="bg-[#C0392B] py-10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center text-white">
              <stat.icon size={24} className="mx-auto mb-2 text-red-200" />
              <div className="text-3xl font-black font-heading">{stat.value}</div>
              <div className="text-red-200 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="section-subtitle">What We Do</p>
            <h2 className="section-title">Our Services</h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto">
              From concept to completion, Auzi Homes delivers end-to-end construction solutions across Sydney.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <Link key={service.title} href={service.href} className="group">
                <div className="p-8 rounded-xl border border-gray-200 hover:border-[#C0392B] hover:shadow-xl transition-all duration-300 h-full">
                  <div className="w-14 h-14 rounded-xl bg-red-50 flex items-center justify-center mb-5 group-hover:bg-[#C0392B] transition-colors">
                    <service.icon size={28} className="text-[#C0392B] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 font-heading group-hover:text-[#C0392B] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{service.desc}</p>
                  <div className="mt-4 flex items-center gap-1 text-[#C0392B] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/services" className="btn-outline">
              View All Services <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14">
            <div>
              <p className="section-subtitle">Our Portfolio</p>
              <h2 className="section-title">Featured Projects</h2>
            </div>
            <Link href="/projects" className="btn-primary mt-4 md:mt-0">
              All Projects <ArrowRight size={16} />
            </Link>
          </div>

          {featuredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
              <Building2 size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">Projects coming soon</p>
              <p className="text-gray-400 text-sm mt-2">Check back shortly to see our latest work</p>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="section-subtitle">Why Auzi Homes</p>
              <h2 className="section-title mb-6">
                Building Trust,<br />One Home at a Time
              </h2>
              <p className="text-gray-500 mb-8 leading-relaxed">
                With over 10 years in Sydney&apos;s construction industry, {settings.company_name} has built a reputation for excellence, transparency, and craftsmanship. Led by Director {settings.director_name}, we treat every project as if it were our own home.
              </p>
              <ul className="space-y-3">
                {whyUs.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-[#C0392B] shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">{point}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link href="/about" className="btn-primary">
                  About Us <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-[#C0392B] to-[#7B1818] rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6 font-heading">Get Started Today</h3>
                <p className="text-red-100 mb-6">
                  Talk to our team about your project. Free consultation, no obligation.
                </p>
                <div className="space-y-4">
                  {settings.phone_office && (
                    <a href={telHref(settings.phone_office)} className="flex items-center gap-3 bg-white/10 hover:bg-white/20 transition-colors rounded-lg px-4 py-3">
                      <Phone size={18} />
                      <div>
                        <div className="text-xs text-red-200">Office</div>
                        <div className="font-semibold">{settings.phone_office}</div>
                      </div>
                    </a>
                  )}
                  {settings.phone_mobile && (
                    <a href={telHref(settings.phone_mobile)} className="flex items-center gap-3 bg-white/10 hover:bg-white/20 transition-colors rounded-lg px-4 py-3">
                      <Phone size={18} />
                      <div>
                        <div className="text-xs text-red-200">Mobile</div>
                        <div className="font-semibold">{settings.phone_mobile}</div>
                      </div>
                    </a>
                  )}
                </div>
                <Link href="/contact" className="btn-white w-full justify-center mt-6 block text-center">
                  Send an Enquiry
                </Link>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-red-100 rounded-full opacity-50" />
              <div className="absolute -bottom-4 -left-4 w-14 h-14 bg-red-200 rounded-full opacity-40" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-[#7B1818] py-16 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black mb-4 font-heading">
            Your Dream Home Starts Here
          </h2>
          <p className="text-red-200 mb-8">
            Contact Auzi Homes today and let&apos;s bring your vision to life. We&apos;re ready to build.
          </p>
          <Link href="/contact" className="btn-white text-base px-10 py-4">
            Book a Free Consultation <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  )
}
