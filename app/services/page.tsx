import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Home, Wrench, Building2, Ruler, HardHat, TreePine } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Auzi Homes offers new home builds, renovations, extensions, and knockdown rebuilds across Sydney. Licensed NSW builder.',
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
    color: 'bg-blue-50',
    accent: 'text-blue-600',
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
    color: 'bg-green-50',
    accent: 'text-green-600',
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
    color: 'bg-orange-50',
    accent: 'text-orange-600',
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
      {/* Hero */}
      <section className="bg-gradient-to-r from-gray-900 to-[#7B1818] text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <p className="section-subtitle text-red-300">What We Offer</p>
          <h1 className="text-4xl md:text-6xl font-black font-heading mb-4">Our Services</h1>
          <p className="text-gray-300 text-xl max-w-xl">
            Comprehensive construction solutions for every stage of your home journey.
          </p>
        </div>
      </section>

      {/* Services Detail */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 space-y-24">
          {services.map((service, index) => (
            <div
              key={service.id}
              id={service.id}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-start ${index % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}
            >
              <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                <div className={`w-14 h-14 rounded-xl ${service.color} flex items-center justify-center mb-5`}>
                  <service.icon size={28} className="text-[#C0392B]" />
                </div>
                <p className="section-subtitle">{service.subtitle}</p>
                <h2 className="text-3xl md:text-4xl font-bold font-heading mb-5">{service.title}</h2>
                <p className="text-gray-500 leading-relaxed mb-6">{service.description}</p>
                <ul className="space-y-2.5 mb-8">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-gray-700 text-sm">
                      <CheckCircle size={16} className="text-[#C0392B] shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="btn-primary">
                  Get a Quote <ArrowRight size={16} />
                </Link>
              </div>

              {/* Process Steps */}
              <div className={`bg-gray-50 rounded-2xl p-8 ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                <h3 className="font-bold text-gray-900 mb-6 font-heading">Our Process</h3>
                <div className="space-y-0">
                  {service.process.map((step, i) => (
                    <div key={step} className="flex items-start gap-4 relative">
                      <div className="flex flex-col items-center">
                        <div className="w-9 h-9 rounded-full bg-[#C0392B] text-white flex items-center justify-center text-sm font-bold shrink-0 z-10">
                          {i + 1}
                        </div>
                        {i < service.process.length - 1 && (
                          <div className="w-0.5 h-8 bg-red-200 -mt-0.5" />
                        )}
                      </div>
                      <div className="pt-1.5 pb-6">
                        <p className="font-semibold text-gray-800">{step}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold font-heading text-center mb-10">Additional Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {additionalServices.map((s) => (
              <div key={s.title} className="bg-white rounded-xl p-6 border border-gray-200 flex gap-4">
                <div className="w-11 h-11 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
                  <s.icon size={22} className="text-[#C0392B]" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{s.title}</h3>
                  <p className="text-gray-500 text-sm">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#C0392B] py-16 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-black font-heading mb-4">Ready to Get Started?</h2>
          <p className="text-red-100 mb-8">
            Our team is ready to discuss your project. Get in touch for a free, no-obligation consultation.
          </p>
          <Link href="/contact" className="btn-white text-base px-10 py-4">
            Contact Us <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  )
}
