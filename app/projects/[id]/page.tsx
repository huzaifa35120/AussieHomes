import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Calendar, Bed, Bath, Maximize2, ArrowLeft, Play, CheckCircle2, ArrowUpRight } from 'lucide-react'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { PROJECT_TYPE_LABELS, PROJECT_STATUS_LABELS, type Project } from '@/lib/types'
import Reveal from '@/components/Reveal'

export const revalidate = 60

interface Props {
  params: { id: string }
}

async function getProject(id: string): Promise<Project | null> {
  try {
    const supabase = createServerSupabaseClient()
    const { data } = await supabase.from('projects').select('*').eq('id', id).single()
    return data
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProject(params.id)
  if (!project) return { title: 'Project Not Found' }
  return {
    title: project.title,
    description: project.short_description,
  }
}

function getYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/)
  return match ? match[1] : null
}

const STATUS_STYLES: Record<Project['status'], string> = {
  completed: 'bg-emerald-500/90 text-white',
  in_progress: 'bg-sky-500/90 text-white',
  upcoming: 'bg-amber-500/90 text-white',
}

export default async function ProjectDetailPage({ params }: Props) {
  const project = await getProject(params.id)
  if (!project) notFound()

  const youtubeId = project.video_url ? getYouTubeId(project.video_url) : null
  const hero = project.images?.[0]
  const gallery = project.images?.slice(1) ?? []

  const details = [
    { icon: MapPin, label: 'Location', value: project.address, sub: `${project.suburb}, ${project.state}` },
    project.year_completed ? { icon: Calendar, label: 'Year', value: String(project.year_completed) } : null,
    project.bedrooms ? { icon: Bed, label: 'Bedrooms', value: String(project.bedrooms) } : null,
    project.bathrooms ? { icon: Bath, label: 'Bathrooms', value: String(project.bathrooms) } : null,
    project.area_sqm ? { icon: Maximize2, label: 'Floor Area', value: `${project.area_sqm} m²` } : null,
  ].filter(Boolean) as { icon: typeof MapPin; label: string; value: string; sub?: string }[]

  return (
    <>
      {/* ============================== HERO ============================== */}
      <section className="relative min-h-[62vh] overflow-hidden bg-brand-ink pt-[var(--nav-h)] md:min-h-[72vh]">
        {hero ? (
          <Image src={hero} alt={project.title} fill priority sizes="100vw" className="object-cover" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#1C1210] via-[#2A0F0D] to-[#5C1212]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-ink via-brand-ink/70 to-brand-ink/35" />
        <div className="absolute inset-0 bg-grid opacity-30" />

        <div className="relative mx-auto flex min-h-[calc(62vh-var(--nav-h))] max-w-content flex-col justify-end px-6 pb-14 pt-10 md:min-h-[calc(72vh-var(--nav-h))] md:pb-20">
          {/* Breadcrumb */}
          <nav className="animate-fade-in mb-auto flex flex-wrap items-center gap-2 text-xs text-white/50">
            <Link href="/" className="transition-colors hover:text-white">Home</Link>
            <span>/</span>
            <Link href="/projects" className="transition-colors hover:text-white">Projects</Link>
            <span>/</span>
            <span className="text-white/85">{project.title}</span>
          </nav>

          <div className="animate-fade-up mt-10 flex flex-wrap gap-2">
            <span className="rounded-full bg-primary px-3.5 py-1.5 text-[11px] font-semibold text-white">
              {PROJECT_TYPE_LABELS[project.project_type]}
            </span>
            <span className={`rounded-full px-3.5 py-1.5 text-[11px] font-semibold backdrop-blur-sm ${STATUS_STYLES[project.status]}`}>
              {PROJECT_STATUS_LABELS[project.status]}
            </span>
          </div>

          <h1 className="page-title animate-fade-up anim-delay-100 mt-5 max-w-4xl">{project.title}</h1>

          <div className="animate-fade-up anim-delay-200 mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/70">
            <span className="flex items-center gap-2">
              <MapPin size={15} className="text-primary-300" />
              {project.suburb}, {project.state}
            </span>
            {project.year_completed && (
              <span className="flex items-center gap-2">
                <Calendar size={15} className="text-primary-300" />
                Completed {project.year_completed}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* ============================== BODY ============================== */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-content px-6">
          <Link
            href="/projects"
            className="group mb-10 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-primary"
          >
            <ArrowLeft size={16} className="transition-transform duration-400 ease-out-expo group-hover:-translate-x-1" />
            Back to Projects
          </Link>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Main */}
            <div className="lg:col-span-8">
              <Reveal>
                <p className="section-subtitle">Overview</p>
                <p className="text-xl leading-relaxed text-gray-700">{project.short_description}</p>
                {project.description && (
                  <div className="mt-6 whitespace-pre-line text-[15px] leading-relaxed text-gray-600">
                    {project.description}
                  </div>
                )}
              </Reveal>

              {/* Gallery */}
              {gallery.length > 0 && (
                <Reveal delay={100} className="mt-14">
                  <h2 className="font-heading text-xl font-bold text-gray-900">Gallery</h2>
                  <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
                    {gallery.map((img, i) => (
                      <div
                        key={i}
                        className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100 shadow-soft"
                      >
                        <Image
                          src={img}
                          alt={`${project.title} — image ${i + 2}`}
                          fill
                          sizes="(max-width: 768px) 50vw, 33vw"
                          className="object-cover transition-transform duration-[900ms] ease-out-expo group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-brand-ink/0 transition-colors duration-500 group-hover:bg-brand-ink/15" />
                      </div>
                    ))}
                  </div>
                </Reveal>
              )}

              {/* Video */}
              {project.video_url && (
                <Reveal delay={100} className="mt-14">
                  <h2 className="flex items-center gap-2.5 font-heading text-xl font-bold text-gray-900">
                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary-50">
                      <Play size={16} className="text-primary" fill="currentColor" />
                    </span>
                    Project Video
                  </h2>
                  <div className="mt-6 overflow-hidden rounded-2xl bg-black shadow-lift">
                    {youtubeId ? (
                      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                        <iframe
                          className="absolute inset-0 h-full w-full"
                          src={`https://www.youtube.com/embed/${youtubeId}`}
                          title={project.title}
                          allowFullScreen
                        />
                      </div>
                    ) : (
                      <video
                        src={project.video_url}
                        controls
                        playsInline
                        preload="metadata"
                        className="w-full"
                      />
                    )}
                  </div>
                </Reveal>
              )}
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="space-y-6 lg:sticky lg:top-28">
                <Reveal dir="right">
                  <div className="rounded-3xl border border-gray-100 bg-brand-paper p-7">
                    <span className="rule-red" />
                    <h3 className="mt-5 font-heading text-lg font-bold text-gray-900">Project Details</h3>
                    <dl className="mt-6 space-y-5">
                      {details.map((d) => (
                        <div key={d.label} className="flex items-start gap-3.5">
                          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white shadow-soft">
                            <d.icon size={15} className="text-primary" />
                          </span>
                          <div>
                            <dt className="text-[11px] uppercase tracking-wider text-gray-400">{d.label}</dt>
                            <dd className="font-medium text-gray-800">{d.value}</dd>
                            {d.sub && <dd className="text-sm text-gray-500">{d.sub}</dd>}
                          </div>
                        </div>
                      ))}
                    </dl>
                  </div>
                </Reveal>

                <Reveal dir="right" delay={100}>
                  <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-light via-primary to-primary-800 p-7 text-white shadow-red">
                    <div className="absolute inset-0 bg-grid opacity-40" />
                    <div className="relative">
                      <CheckCircle2 size={26} className="text-white/70" />
                      <h3 className="mt-4 font-heading text-lg font-bold">Want a similar project?</h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/85">
                        Get in touch for a free quote on your next home build or renovation.
                      </p>
                      <Link href="/contact" className="btn-white mt-6 w-full py-3.5">
                        Get a Quote <ArrowUpRight size={16} />
                      </Link>
                    </div>
                  </div>
                </Reveal>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
