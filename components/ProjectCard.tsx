import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Calendar, ArrowUpRight, Bed, Bath, Maximize2 } from 'lucide-react'
import { Project, PROJECT_TYPE_LABELS, PROJECT_STATUS_LABELS } from '@/lib/types'

interface ProjectCardProps {
  project: Project
  priority?: boolean
}

const STATUS_STYLES: Record<Project['status'], string> = {
  completed: 'bg-emerald-500/90 text-white',
  in_progress: 'bg-sky-500/90 text-white',
  upcoming: 'bg-amber-500/90 text-white',
}

export default function ProjectCard({ project, priority = false }: ProjectCardProps) {
  const mainImage = project.images?.[0] || '/placeholder-project.svg'
  const hasSpecs = project.bedrooms || project.bathrooms || project.area_sqm

  return (
    <Link href={`/projects/${project.id}`} className="group block h-full">
      <article className="card card-hover flex h-full flex-col">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
          <Image
            src={mainImage}
            alt={project.title}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-[900ms] ease-out-expo group-hover:scale-[1.08]"
          />

          {/* Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/80 via-brand-ink/10 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-95" />

          {/* Badges */}
          <div className="absolute inset-x-4 top-4 flex items-start justify-between gap-2">
            <span className="rounded-full bg-primary px-3 py-1 text-[11px] font-semibold tracking-wide text-white shadow-soft">
              {PROJECT_TYPE_LABELS[project.project_type]}
            </span>
            <span className={`rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide backdrop-blur-sm ${STATUS_STYLES[project.status]}`}>
              {PROJECT_STATUS_LABELS[project.status]}
            </span>
          </div>

          {/* Location strip */}
          <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] font-medium text-white/90">
              <span className="flex items-center gap-1.5">
                <MapPin size={13} className="text-primary-300" />
                {project.suburb}, {project.state}
              </span>
              {project.year_completed && (
                <span className="flex items-center gap-1.5">
                  <Calendar size={13} className="text-primary-300" />
                  {project.year_completed}
                </span>
              )}
            </div>
            <span className="grid h-9 w-9 shrink-0 translate-y-2 place-items-center rounded-full bg-white text-primary opacity-0 shadow-lift transition-all duration-500 ease-out-expo group-hover:translate-y-0 group-hover:opacity-100">
              <ArrowUpRight size={17} />
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <h3 className="font-heading text-lg font-bold leading-snug text-gray-900 transition-colors duration-300 group-hover:text-primary line-clamp-2">
            {project.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-gray-500">
            {project.short_description}
          </p>

          {hasSpecs && (
            <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-gray-100 pt-4">
              {project.bedrooms ? (
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-gray-50 px-2.5 py-1.5 text-xs text-gray-600">
                  <Bed size={13} className="text-primary" />
                  <strong className="font-semibold text-gray-900">{project.bedrooms}</strong> Bed
                </span>
              ) : null}
              {project.bathrooms ? (
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-gray-50 px-2.5 py-1.5 text-xs text-gray-600">
                  <Bath size={13} className="text-primary" />
                  <strong className="font-semibold text-gray-900">{project.bathrooms}</strong> Bath
                </span>
              ) : null}
              {project.area_sqm ? (
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-gray-50 px-2.5 py-1.5 text-xs text-gray-600">
                  <Maximize2 size={13} className="text-primary" />
                  <strong className="font-semibold text-gray-900">{project.area_sqm}</strong> m²
                </span>
              ) : null}
            </div>
          )}
        </div>

        {/* Bottom accent */}
        <span className="block h-[3px] w-full origin-left scale-x-0 bg-gradient-to-r from-primary to-brand-orange transition-transform duration-500 ease-out-expo group-hover:scale-x-100" />
      </article>
    </Link>
  )
}
