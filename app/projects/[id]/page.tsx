import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Calendar, Bed, Bath, Maximize2, ArrowLeft, ExternalLink, Play, CheckCircle } from 'lucide-react'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { PROJECT_TYPE_LABELS, PROJECT_STATUS_LABELS, type Project } from '@/lib/types'

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

const STATUS_COLORS: Record<Project['status'], string> = {
  completed: 'bg-green-100 text-green-700',
  in_progress: 'bg-blue-100 text-blue-700',
  upcoming: 'bg-yellow-100 text-yellow-700',
}

export default async function ProjectDetailPage({ params }: Props) {
  const project = await getProject(params.id)
  if (!project) notFound()

  const youtubeId = project.video_url ? getYouTubeId(project.video_url) : null

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200 py-3">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-[#C0392B]">Home</Link>
          <span>/</span>
          <Link href="/projects" className="hover:text-[#C0392B]">Projects</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium truncate">{project.title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <Link href="/projects" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#C0392B] text-sm mb-6 transition-colors">
          <ArrowLeft size={16} /> Back to Projects
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            {project.images && project.images.length > 0 ? (
              <div className="space-y-3">
                <div className="relative h-80 md:h-[480px] rounded-2xl overflow-hidden">
                  <Image
                    src={project.images[0]}
                    alt={project.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 66vw"
                  />
                </div>
                {project.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-3">
                    {project.images.slice(1, 5).map((img, i) => (
                      <div key={i} className="relative h-24 rounded-xl overflow-hidden">
                        <Image src={img} alt={`${project.title} ${i + 2}`} fill className="object-cover hover:scale-105 transition-transform cursor-pointer" sizes="25vw" />
                        {i === 3 && project.images.length > 5 && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-bold">
                            +{project.images.length - 5}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="h-80 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400">
                No images available
              </div>
            )}

            {/* Video */}
            {project.video_url && (
              <div className="mt-6">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Play size={18} className="text-[#C0392B]" /> Project Video
                </h3>
                {youtubeId ? (
                  <div className="relative w-full rounded-xl overflow-hidden" style={{ paddingBottom: '56.25%' }}>
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${youtubeId}`}
                      title={project.title}
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <a
                    href={project.video_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[#C0392B] hover:underline"
                  >
                    <ExternalLink size={16} /> Watch Video
                  </a>
                )}
              </div>
            )}

            {/* Description */}
            <div className="mt-8">
              <h1 className="text-3xl md:text-4xl font-black font-heading text-gray-900 mb-3">
                {project.title}
              </h1>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-[#C0392B] text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {PROJECT_TYPE_LABELS[project.project_type]}
                </span>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${STATUS_COLORS[project.status]}`}>
                  {PROJECT_STATUS_LABELS[project.status]}
                </span>
              </div>
              <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed whitespace-pre-line">
                {project.description}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Project Details Card */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-4 font-heading">Project Details</h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-[#C0392B] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-500 text-xs mb-0.5">Location</p>
                    <p className="font-medium text-gray-800">{project.address}</p>
                    <p className="text-gray-600">{project.suburb}, {project.state}</p>
                  </div>
                </div>
                {project.year_completed && (
                  <div className="flex items-center gap-3">
                    <Calendar size={16} className="text-[#C0392B] shrink-0" />
                    <div>
                      <p className="text-gray-500 text-xs mb-0.5">Year</p>
                      <p className="font-medium text-gray-800">{project.year_completed}</p>
                    </div>
                  </div>
                )}
                {project.bedrooms && (
                  <div className="flex items-center gap-3">
                    <Bed size={16} className="text-[#C0392B] shrink-0" />
                    <div>
                      <p className="text-gray-500 text-xs mb-0.5">Bedrooms</p>
                      <p className="font-medium text-gray-800">{project.bedrooms}</p>
                    </div>
                  </div>
                )}
                {project.bathrooms && (
                  <div className="flex items-center gap-3">
                    <Bath size={16} className="text-[#C0392B] shrink-0" />
                    <div>
                      <p className="text-gray-500 text-xs mb-0.5">Bathrooms</p>
                      <p className="font-medium text-gray-800">{project.bathrooms}</p>
                    </div>
                  </div>
                )}
                {project.area_sqm && (
                  <div className="flex items-center gap-3">
                    <Maximize2 size={16} className="text-[#C0392B] shrink-0" />
                    <div>
                      <p className="text-gray-500 text-xs mb-0.5">Floor Area</p>
                      <p className="font-medium text-gray-800">{project.area_sqm} m²</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-br from-[#C0392B] to-[#7B1818] rounded-2xl p-6 text-white">
              <CheckCircle size={24} className="mb-3 text-red-200" />
              <h3 className="font-bold text-lg mb-2 font-heading">Want a similar project?</h3>
              <p className="text-red-100 text-sm mb-4">
                Get in touch with our team for a free quote on your next home build or renovation.
              </p>
              <Link href="/contact" className="btn-white w-full justify-center block text-center">
                Get a Quote
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
