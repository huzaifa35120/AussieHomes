'use client'

import { useState, useEffect } from 'react'
import { Building2, Search } from 'lucide-react'
import { createClient } from '@/lib/supabase'
import ProjectCard from '@/components/ProjectCard'
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

  const filtered = projects.filter((p) => {
    const matchesFilter = filter === 'all' || p.project_type === filter
    const matchesSearch =
      search === '' ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.suburb.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-r from-gray-900 to-[#7B1818] text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <p className="section-subtitle text-red-300">Our Work</p>
          <h1 className="text-4xl md:text-6xl font-black font-heading mb-4">Projects</h1>
          <p className="text-gray-300 text-xl max-w-xl">
            Explore our portfolio of completed and ongoing construction projects across Sydney.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b border-gray-200 sticky top-[80px] z-30">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {FILTER_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setFilter(opt.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === opt.value
                    ? 'bg-[#C0392B] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search suburb or project..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#C0392B] w-64"
            />
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 bg-gray-50 min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl overflow-hidden animate-pulse">
                  <div className="h-56 bg-gray-200" />
                  <div className="p-5 space-y-3">
                    <div className="h-5 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-full" />
                    <div className="h-4 bg-gray-200 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length > 0 ? (
            <>
              <p className="text-gray-500 text-sm mb-6">{filtered.length} project{filtered.length !== 1 ? 's' : ''} found</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-24">
              <Building2 size={52} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-500">No projects found</h3>
              <p className="text-gray-400 mt-2">
                {projects.length === 0
                  ? 'Projects will appear here once added.'
                  : 'Try adjusting your filters or search term.'}
              </p>
              {filter !== 'all' && (
                <button
                  onClick={() => { setFilter('all'); setSearch('') }}
                  className="mt-4 text-[#C0392B] font-medium text-sm hover:underline"
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
