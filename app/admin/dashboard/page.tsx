'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, Edit, Trash2, LogOut, Home, Star, Eye, Building2, MessageSquare, BarChart3, Check, X, Settings } from 'lucide-react'
import { createClient } from '@/lib/supabase'
import type { Project, ContactEnquiry } from '@/lib/types'
import { PROJECT_TYPE_LABELS, PROJECT_STATUS_LABELS } from '@/lib/types'

export default function AdminDashboard() {
  const [projects, setProjects] = useState<Project[]>([])
  const [enquiries, setEnquiries] = useState<ContactEnquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'projects' | 'enquiries'>('projects')
  const router = useRouter()

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    const supabase = createClient()
    const [{ data: p }, { data: e }] = await Promise.all([
      supabase.from('projects').select('*').order('created_at', { ascending: false }),
      supabase.from('contact_enquiries').select('*').order('created_at', { ascending: false }),
    ])
    setProjects(p || [])
    setEnquiries(e || [])
    setLoading(false)
  }

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin')
  }

  const handleDelete = async (id: string) => {
    const supabase = createClient()
    const { error } = await supabase.from('projects').delete().eq('id', id)
    if (!error) {
      setProjects((prev) => prev.filter((p) => p.id !== id))
    }
    setDeleteId(null)
  }

  const toggleFeatured = async (project: Project) => {
    const supabase = createClient()
    await supabase.from('projects').update({ featured: !project.featured }).eq('id', project.id)
    setProjects((prev) =>
      prev.map((p) => (p.id === project.id ? { ...p, featured: !p.featured } : p))
    )
  }

  const markEnquiryRead = async (id: string) => {
    const supabase = createClient()
    await supabase.from('contact_enquiries').update({ read: true }).eq('id', id)
    setEnquiries((prev) => prev.map((e) => (e.id === id ? { ...e, read: true } : e)))
  }

  const unreadCount = enquiries.filter((e) => !e.read).length

  const STATUS_COLORS: Record<Project['status'], string> = {
    completed: 'bg-green-100 text-green-700',
    in_progress: 'bg-blue-100 text-blue-700',
    upcoming: 'bg-yellow-100 text-yellow-700',
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image src="/logo.png" alt="Auzi Homes" width={140} height={36} className="h-9 w-auto" />
            <span className="text-xs bg-[#C0392B] text-white px-2 py-0.5 rounded font-semibold">Admin</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/admin/settings" className="flex items-center gap-1.5 text-gray-500 hover:text-gray-900 text-sm transition-colors">
              <Settings size={15} /> Site Settings
            </Link>
            <Link href="/" target="_blank" className="flex items-center gap-1.5 text-gray-500 hover:text-gray-900 text-sm transition-colors">
              <Eye size={15} /> View Site
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-gray-500 hover:text-red-600 text-sm transition-colors ml-2"
            >
              <LogOut size={15} /> Sign Out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Projects', value: projects.length, icon: Building2, color: 'text-blue-600 bg-blue-50' },
            { label: 'Featured', value: projects.filter((p) => p.featured).length, icon: Star, color: 'text-yellow-600 bg-yellow-50' },
            { label: 'Completed', value: projects.filter((p) => p.status === 'completed').length, icon: Home, color: 'text-green-600 bg-green-50' },
            { label: 'New Enquiries', value: unreadCount, icon: MessageSquare, color: 'text-red-600 bg-red-50' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl p-5 border border-gray-200">
              <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center mb-3`}>
                <stat.icon size={20} />
              </div>
              <div className="text-2xl font-black font-heading">{stat.value}</div>
              <div className="text-gray-500 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-1 bg-white rounded-xl p-1 border border-gray-200 w-fit">
            <button
              onClick={() => setActiveTab('projects')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'projects' ? 'bg-[#C0392B] text-white' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <BarChart3 size={15} /> Projects
            </button>
            <button
              onClick={() => setActiveTab('enquiries')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'enquiries' ? 'bg-[#C0392B] text-white' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <MessageSquare size={15} />
              Enquiries
              {unreadCount > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>

          {activeTab === 'projects' && (
            <Link href="/admin/projects/new" className="btn-primary">
              <Plus size={16} /> Add Project
            </Link>
          )}
        </div>

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {loading ? (
              <div className="p-8 space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-16 bg-gray-100 rounded-lg animate-pulse" />
                ))}
              </div>
            ) : projects.length === 0 ? (
              <div className="text-center py-16">
                <Building2 size={40} className="mx-auto text-gray-300 mb-3" />
                <p className="text-gray-500 mb-4">No projects yet</p>
                <Link href="/admin/projects/new" className="btn-primary">
                  <Plus size={16} /> Add Your First Project
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      <th className="px-4 py-3">Project</th>
                      <th className="px-4 py-3 hidden md:table-cell">Type</th>
                      <th className="px-4 py-3 hidden md:table-cell">Status</th>
                      <th className="px-4 py-3 hidden sm:table-cell">Location</th>
                      <th className="px-4 py-3">Featured</th>
                      <th className="px-4 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {projects.map((project) => (
                      <tr key={project.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            {project.images?.[0] ? (
                              <Image
                                src={project.images[0]}
                                alt=""
                                width={40}
                                height={40}
                                className="w-10 h-10 rounded-lg object-cover shrink-0"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-lg bg-gray-200 shrink-0" />
                            )}
                            <div>
                              <p className="font-semibold text-sm text-gray-900 line-clamp-1">{project.title}</p>
                              <p className="text-xs text-gray-400">{project.suburb}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 hidden md:table-cell">
                          <span className="text-xs text-gray-600">{PROJECT_TYPE_LABELS[project.project_type]}</span>
                        </td>
                        <td className="px-4 py-3 hidden md:table-cell">
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${STATUS_COLORS[project.status]}`}>
                            {PROJECT_STATUS_LABELS[project.status]}
                          </span>
                        </td>
                        <td className="px-4 py-3 hidden sm:table-cell">
                          <span className="text-xs text-gray-500">{project.suburb}, {project.state}</span>
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => toggleFeatured(project)}
                            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                              project.featured
                                ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200'
                                : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                            }`}
                            title={project.featured ? 'Remove from featured' : 'Add to featured'}
                          >
                            <Star size={14} fill={project.featured ? 'currentColor' : 'none'} />
                          </button>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <Link
                              href={`/projects/${project.id}`}
                              target="_blank"
                              className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
                              title="View"
                            >
                              <Eye size={14} />
                            </Link>
                            <Link
                              href={`/admin/projects/${project.id}/edit`}
                              className="w-8 h-8 rounded-lg bg-blue-50 hover:bg-blue-100 flex items-center justify-center text-blue-600 transition-colors"
                              title="Edit"
                            >
                              <Edit size={14} />
                            </Link>
                            {deleteId === project.id ? (
                              <div className="flex items-center gap-1 bg-red-50 rounded-lg px-2 py-1">
                                <span className="text-xs text-red-600 font-medium">Sure?</span>
                                <button
                                  onClick={() => handleDelete(project.id)}
                                  className="w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded flex items-center justify-center"
                                >
                                  <Check size={11} />
                                </button>
                                <button
                                  onClick={() => setDeleteId(null)}
                                  className="w-6 h-6 bg-gray-200 hover:bg-gray-300 text-gray-600 rounded flex items-center justify-center"
                                >
                                  <X size={11} />
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => setDeleteId(project.id)}
                                className="w-8 h-8 rounded-lg bg-red-50 hover:bg-red-100 flex items-center justify-center text-red-500 transition-colors"
                                title="Delete"
                              >
                                <Trash2 size={14} />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Enquiries Tab */}
        {activeTab === 'enquiries' && (
          <div className="space-y-4">
            {loading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-28 bg-white rounded-xl animate-pulse" />
                ))}
              </div>
            ) : enquiries.length === 0 ? (
              <div className="bg-white rounded-xl p-12 text-center border border-gray-200">
                <MessageSquare size={40} className="mx-auto text-gray-300 mb-3" />
                <p className="text-gray-500">No enquiries yet</p>
              </div>
            ) : (
              enquiries.map((enq) => (
                <div
                  key={enq.id}
                  className={`bg-white rounded-xl p-5 border transition-colors ${
                    enq.read ? 'border-gray-200' : 'border-[#C0392B] shadow-sm'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900">{enq.name}</h3>
                        {!enq.read && (
                          <span className="text-xs bg-[#C0392B] text-white px-1.5 py-0.5 rounded font-medium">New</span>
                        )}
                        {enq.service_type && (
                          <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                            {enq.service_type.replace(/_/g, ' ')}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-3 text-sm text-gray-500 mb-3">
                        <a href={`mailto:${enq.email}`} className="hover:text-[#C0392B]">{enq.email}</a>
                        {enq.phone && <a href={`tel:${enq.phone}`} className="hover:text-[#C0392B]">{enq.phone}</a>}
                        <span className="text-gray-400">{new Date(enq.created_at).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">{enq.message}</p>
                    </div>
                    {!enq.read && (
                      <button
                        onClick={() => markEnquiryRead(enq.id)}
                        className="shrink-0 flex items-center gap-1.5 text-xs text-gray-400 hover:text-[#C0392B] transition-colors border border-gray-200 hover:border-[#C0392B] rounded-lg px-3 py-1.5"
                      >
                        <Check size={12} /> Mark read
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}
