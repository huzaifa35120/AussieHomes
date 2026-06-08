import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Calendar, ArrowRight } from 'lucide-react'
import { Project, PROJECT_TYPE_LABELS, PROJECT_STATUS_LABELS } from '@/lib/types'

interface ProjectCardProps {
  project: Project
}

const STATUS_COLORS: Record<Project['status'], string> = {
  completed: 'bg-green-100 text-green-700',
  in_progress: 'bg-blue-100 text-blue-700',
  upcoming: 'bg-yellow-100 text-yellow-700',
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const mainImage = project.images?.[0] || '/placeholder-project.svg'

  return (
    <Link href={`/projects/${project.id}`} className="group block">
      <div className="bg-white rounded-xl overflow-hidden card-shadow border border-gray-100">
        {/* Image */}
        <div className="relative h-56 overflow-hidden bg-gray-200">
          <Image
            src={mainImage}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Type badge */}
          <div className="absolute top-3 left-3 bg-[#C0392B] text-white text-xs font-semibold px-2.5 py-1 rounded">
            {PROJECT_TYPE_LABELS[project.project_type]}
          </div>
          {/* Status badge */}
          <div className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded ${STATUS_COLORS[project.status]}`}>
            {PROJECT_STATUS_LABELS[project.status]}
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-[#C0392B] transition-colors font-heading line-clamp-1">
            {project.title}
          </h3>
          <p className="text-gray-500 text-sm mb-4 line-clamp-2">
            {project.short_description}
          </p>

          <div className="flex items-center justify-between text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <MapPin size={12} className="text-[#C0392B]" />
              <span>{project.suburb}, {project.state}</span>
            </div>
            {project.year_completed && (
              <div className="flex items-center gap-1">
                <Calendar size={12} className="text-[#C0392B]" />
                <span>{project.year_completed}</span>
              </div>
            )}
          </div>

          {/* Stats row */}
          {(project.bedrooms || project.bathrooms || project.area_sqm) && (
            <div className="flex gap-4 mt-4 pt-4 border-t border-gray-100 text-xs text-gray-500">
              {project.bedrooms && (
                <span><strong className="text-gray-700">{project.bedrooms}</strong> Bed</span>
              )}
              {project.bathrooms && (
                <span><strong className="text-gray-700">{project.bathrooms}</strong> Bath</span>
              )}
              {project.area_sqm && (
                <span><strong className="text-gray-700">{project.area_sqm}</strong> m²</span>
              )}
            </div>
          )}

          <div className="mt-4 flex items-center gap-1 text-[#C0392B] text-sm font-medium group-hover:gap-2 transition-all">
            View Project <ArrowRight size={14} />
          </div>
        </div>
      </div>
    </Link>
  )
}
