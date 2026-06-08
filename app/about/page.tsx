import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Award, Shield, Clock, Users, Heart, Target } from 'lucide-react'
import { getSiteSettings } from '@/lib/settings'

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSiteSettings()
  return {
    title: 'About Us',
    description: `Learn about ${s.company_name} – Sydney's trusted construction company led by ${s.director_name}. Over 10 years building quality homes.`,
  }
}

const values = [
  {
    icon: Heart,
    title: 'Client First',
    desc: 'Every decision we make starts with your needs. We listen, advise, and deliver what matters most to you.',
  },
  {
    icon: Shield,
    title: 'Integrity',
    desc: 'We operate with complete transparency. No hidden costs, no surprises. Just honest, quality work.',
  },
  {
    icon: Target,
    title: 'Excellence',
    desc: 'We set high standards and never compromise. Every nail, every finish, every detail matters.',
  },
  {
    icon: Clock,
    title: 'On-Time Delivery',
    desc: 'We respect your time. Our projects are planned meticulously to keep your build on schedule.',
  },
]

const milestones = [
  { year: '2012', event: 'Auzi Homes founded in Sydney' },
  { year: '2015', event: 'Completed 50th new home build' },
  { year: '2018', event: 'Expanded into knockdown rebuild specialist' },
  { year: '2021', event: 'Surpassed 150 successful projects' },
  { year: '2024', event: '200+ projects, still growing strong' },
]

export default async function AboutPage() {
  const settings = await getSiteSettings()

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-r from-gray-900 to-[#7B1818] text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <p className="section-subtitle text-red-300">Our Story</p>
          <h1 className="text-4xl md:text-6xl font-black font-heading mb-4">About {settings.company_name}</h1>
          <p className="text-gray-300 text-xl max-w-2xl">
            More than a builder – a partner you can trust for the most important investment of your life.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="section-subtitle">Who We Are</p>
            <h2 className="section-title mb-6">Building Homes,<br />Building Trust</h2>
            <p className="text-gray-600 leading-relaxed mb-5">
              {settings.company_name} is a Sydney-based construction company with over a decade of experience delivering exceptional residential projects. Founded on the principles of quality, transparency, and care, we have helped hundreds of families build and renovate their dream homes across the greater Sydney region.
            </p>
            <p className="text-gray-600 leading-relaxed mb-5">
              We are a fully licensed builder (LIC: {settings.licence_number}) and operate with complete insurance coverage, giving our clients the peace of mind they deserve on every project.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Our approach is simple: treat every home as if it were our own. We bring the same level of attention, craftsmanship, and care to a renovation as we do to a brand-new custom home build.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '10+', label: 'Years Experience' },
                { value: '200+', label: 'Projects Completed' },
                { value: '500+', label: 'Happy Families' },
                { value: '100%', label: 'Licensed & Insured' },
              ].map((stat) => (
                <div key={stat.label} className="bg-red-50 rounded-xl p-4 text-center">
                  <div className="text-3xl font-black text-[#C0392B] font-heading">{stat.value}</div>
                  <div className="text-gray-600 text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {/* Director Card */}
            <div className="bg-gradient-to-br from-[#C0392B] to-[#7B1818] rounded-2xl p-8 text-white">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4 text-2xl font-black font-heading">
                {settings.director_initials}
              </div>
              <h3 className="text-xl font-bold font-heading mb-1">{settings.director_name}</h3>
              <p className="text-red-200 text-sm mb-4">{settings.director_title}</p>
              <p className="text-red-100 text-sm leading-relaxed">
                &ldquo;{settings.director_quote}&rdquo;
              </p>
              <div className="mt-4 pt-4 border-t border-white/20 flex gap-4 text-xs text-red-200">
                <span className="flex items-center gap-1"><Award size={12} /> LIC: {settings.licence_number}</span>
                <span className="flex items-center gap-1"><Shield size={12} /> ACN: {settings.acn}</span>
              </div>
            </div>

            {/* Credentials */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <h4 className="font-bold text-gray-900 mb-4 font-heading">Credentials & Licences</h4>
              <div className="space-y-3">
                {[
                  { icon: Award, text: `NSW Builder's Licence: ${settings.licence_number}` },
                  { icon: Shield, text: `ACN: ${settings.acn}` },
                  { icon: CheckCircle, text: 'Home Building Compensation Fund covered' },
                  { icon: CheckCircle, text: 'Public Liability Insurance' },
                  { icon: CheckCircle, text: 'Workers Compensation Insurance' },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3 text-sm text-gray-700">
                    <item.icon size={15} className="text-[#C0392B] shrink-0" />
                    {item.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="section-subtitle">Our Values</p>
            <h2 className="section-title">What Drives Us</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-white rounded-xl p-6 border border-gray-200 text-center">
                <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center mx-auto mb-4">
                  <v.icon size={24} className="text-[#C0392B]" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 font-heading">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="section-subtitle">Our Journey</p>
            <h2 className="section-title">Company Milestones</h2>
          </div>
          <div className="space-y-0">
            {milestones.map((m, i) => (
              <div key={m.year} className="flex gap-6 relative">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-[#C0392B] text-white flex items-center justify-center font-bold text-sm shrink-0 z-10">
                    {m.year.slice(2)}
                  </div>
                  {i < milestones.length - 1 && (
                    <div className="w-0.5 h-12 bg-red-100 -mt-0.5" />
                  )}
                </div>
                <div className="pt-2.5 pb-8">
                  <p className="text-[#C0392B] font-bold text-sm">{m.year}</p>
                  <p className="text-gray-700 font-medium">{m.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#C0392B] py-16 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <Users size={40} className="mx-auto mb-4 text-red-200" />
          <h2 className="text-3xl font-black font-heading mb-4">Join the {settings.company_name} Family</h2>
          <p className="text-red-100 mb-8">
            Hundreds of Sydney families trust {settings.company_name}. Let us help you build yours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-white text-base px-8 py-4">
              Start Your Project <ArrowRight size={18} />
            </Link>
            <Link href="/projects" className="btn-outline border-white text-white hover:bg-white hover:text-gray-900 text-base px-8 py-4">
              View Our Work
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
