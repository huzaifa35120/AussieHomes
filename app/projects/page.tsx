'use client'

import { useState, useEffect, useMemo } from 'react'
import { Building2, Search, X, SlidersHorizontal } from 'lucide-react'
import { createClient } from '@/lib/supabase'
import ProjectCard from '@/components/ProjectCard'
import Reveal from '@/components/Reveal'
import type { Project } from '@/lib/types'

const FILTER_OPTIONS = [
  { value: 'all', label: 'All Projects' },
  { value: 'new_build', label: 'New Builds' },
  { value: 'renovation', label: 'Renovations' },
  { value: 'knockdown_rebuild', label: 'Knockdown Rebuild' },
]

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })
      setProjects(data || [])
      setLoading(false)
    }
    load()
  }, [])

  const filtered = useMemo(
    () =>
      projects.filter((p) => {
        const matchesFilter = filter === 'all' || p.project_type === filter
        const q = search.trim().toLowerCase()
        const matchesSearch =
          q === '' ||
          p.title.toLowerCase().includes(q) ||
          p.suburb.toLowerCase().includes(q)
        return matchesFilter && matchesSearch
      }),
    [projects, filter, search]
  )

  const isFiltering = filter !== 'all' || search !== ''

  const countFor = (value: string) =>
    value === 'all' ? projects.length : projects.filter((p) => p.project_type === value).length

  return (
    <>
      {/* ============================== HERO ============================== */}
      <section className="relative overflow-hidden bg-brand-ink pt-[calc(var(--nav-h)+5rem)] pb-24 md:pb-28">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1C1210] via-[#2A0F0D] to-[#5C1212]" />
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="absolute -right-24 top-0 h-96 w-96 rounded-full bg-primary/25 blur-[120px] animate-float" />

        <div className="relative mx-auto max-w-content px-6">
          <p className="section-subtitle animate-fade-up !text-primary-300">Our Work</p>
          <h1 className="page-title animate-fade-up anim-delay-100">Projects</h1>
          <p className="animate-fade-up anim-delay-200 mt-6 max-w-xl text-lg leading-relaxed text-gray-300/90">
            Explore our portfolio of completed and ongoing construction projects across Sydney.
          </p>
        </div>
      </section>

      {/* ============================== FILTERS ============================== */}
      <section className="sticky top-[var(--nav-h)] z-30 border-b border-gray-100 glass">
        <div className="mx-auto flex max-w-content flex-col gap-4 px-6 py-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Chips */}
          <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 lg:flex-wrap lg:overflow-visible lg:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {FILTER_OPTIONS.map((opt) => {
              const active = filter === opt.value
              const count = countFor(opt.value)
              return (
                <button
                  key={opt.value}
                  onClick={() => setFilter(opt.value)}
                  className={`group inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-400 ease-out-expo ${
                    active
                      ? 'bg-primary text-white shadow-red'
                      : 'bg-gray-100/80 text-gray-600 hover:bg-gray-200/80 hover:text-gray-900'
                  }`}
                >
                  {opt.label}
                  {!loading && (
                    <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold tabular-nums ${active ? 'bg-white/25' : 'bg-white text-gray-500'}`}>
                      {count}
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          {/* Search */}
          <div className="relative lg:w-72">
            <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search suburb or project…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search projects"
              className="w-full rounded-full border border-gray-200 bg-white py-2.5 pl-11 pr-10 text-sm transition-all duration-300 placeholder:text-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                aria-label="Clear search"
                className="absolute right-3.5 top-1/2 grid h-5 w-5 -translate-y-1/2 place-items-center rounded-full bg-gray-200 text-gray-500 transition-colors hover:bg-gray-300"
              >
                <X size={12} />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ============================== GRID ============================== */}
      <section className="min-h-[60vh] bg-brand-paper py-16 md:py-20">
        <div className="mx-auto max-w-content px-6">
          {loading ? (
            <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
                  <div className="skeleton aspect-[4/3]" />
                  <div className="space-y-3 p-6">
                    <div className="skeleton h-5 w-3/4 rounded" />
                    <div className="skeleton h-4 w-full rounded" />
                    <div className="skeleton h-4 w-2/3 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length > 0 ? (
            <>
              <div className="mb-8 flex items-center gap-2 text-sm text-gray-500">
                <SlidersHorizontal size={15} className="text-primary" />
                <span>
                  <strong className="font-semibold text-gray-900 tabular-nums">{filtered.length}</strong>{' '}
                  project{filtered.length !== 1 ? 's' : ''} found
                </span>
              </div>

              <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
                {filtered.map((project, i) => (
                  <Reveal key={project.id} delay={(i % 3) * 100}>
                    <ProjectCard project={project} priority={i < 3} />
                  </Reveal>
                ))}
              </div>
            </>
          ) : (
            <div className="animate-fade-up rounded-3xl border border-dashed border-gray-200 bg-white py-24 text-center">
              <Building2 size={50} className="mx-auto text-gray-300" />
              <h3 className="mt-5 font-heading text-xl font-bold text-gray-700">No projects found</h3>
              <p className="mx-auto mt-2 max-w-sm text-sm text-gray-400">
                {projects.length === 0
                  ? 'Projects will appear here once they are added from the admin dashboard.'
                  : 'Try adjusting your filters or search term.'}
              </p>
              {isFiltering && (
                <button
                  onClick={() => { setFilter('all'); setSearch('') }}
                  className="btn-outline mt-7"
                >
                  Clear filters
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
