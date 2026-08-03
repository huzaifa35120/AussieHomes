'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Upload, X, ArrowLeft, Save, GripVertical, AlertCircle, CheckCircle, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase'
import type { Project } from '@/lib/types'

type FormData = Omit<Project, 'id' | 'created_at' | 'updated_at' | 'images'> & {
  images: string[]
}

interface ProjectFormProps {
  initialData?: Project
  mode: 'new' | 'edit'
}

const INITIAL_FORM: FormData = {
  title: '',
  description: '',
  short_description: '',
  project_type: 'new_build',
  status: 'completed',
  address: '',
  suburb: '',
  state: 'NSW',
  year_completed: null,
  images: [],
  video_url: null,
  featured: false,
  bedrooms: null,
  bathrooms: null,
  area_sqm: null,
}

export default function ProjectForm({ initialData, mode }: ProjectFormProps) {
  const [form, setForm] = useState<FormData>(
    initialData
      ? {
          title: initialData.title,
          description: initialData.description,
          short_description: initialData.short_description,
          project_type: initialData.project_type,
          status: initialData.status,
          address: initialData.address,
          suburb: initialData.suburb,
          state: initialData.state,
          year_completed: initialData.year_completed,
          images: initialData.images || [],
          video_url: initialData.video_url,
          featured: initialData.featured,
          bedrooms: initialData.bedrooms,
          bathrooms: initialData.bathrooms,
          area_sqm: initialData.area_sqm,
        }
      : INITIAL_FORM
  )
  const [uploading, setUploading] = useState(false)
  const [videoUploading, setVideoUploading] = useState(false)
  const [videoError, setVideoError] = useState('')
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox'
        ? checked
        : type === 'number'
        ? value === '' ? null : Number(value)
        : value === '' ? null : value,
    }))
  }

  const handleImageUpload = async (files: FileList) => {
    if (!files.length) return
    setUploading(true)
    const supabase = createClient()
    const uploaded: string[] = []

    for (const file of Array.from(files)) {
      const ext = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
      const { data, error } = await supabase.storage
        .from('project-images')
        .upload(fileName, file, { cacheControl: '3600', upsert: false })

      if (!error && data) {
        const { data: urlData } = supabase.storage
          .from('project-images')
          .getPublicUrl(data.path)
        uploaded.push(urlData.publicUrl)
      }
    }

    setForm((prev) => ({ ...prev, images: [...prev.images, ...uploaded] }))
    setUploading(false)
  }

  const MAX_VIDEO_BYTES = 50 * 1024 * 1024

  const handleVideoUpload = async (file: File) => {
    setVideoError('')

    if (file.size > MAX_VIDEO_BYTES) {
      setVideoError(
        `That file is ${(file.size / 1024 / 1024).toFixed(0)}MB. The limit is 50MB \u2013 please compress it or upload a shorter clip.`
      )
      return
    }

    setVideoUploading(true)
    const supabase = createClient()
    const ext = file.name.split('.').pop()
    const fileName = `videos/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

    const { data, error } = await supabase.storage
      .from('project-images')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.type,
      })

    if (error || !data) {
      setVideoError(error?.message || 'Upload failed. Please try again.')
    } else {
      const { data: urlData } = supabase.storage
        .from('project-images')
        .getPublicUrl(data.path)
      setForm((prev) => ({ ...prev, video_url: urlData.publicUrl }))
    }

    setVideoUploading(false)
  }

  const removeVideo = () => {
    setForm((prev) => ({ ...prev, video_url: null }))
    setVideoError('')
    if (videoInputRef.current) videoInputRef.current.value = ''
  }

  const removeImage = async (url: string, index: number) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setErrorMsg('')

    const supabase = createClient()
    const payload = {
      ...form,
      year_completed: form.year_completed ? Number(form.year_completed) : null,
      bedrooms: form.bedrooms ? Number(form.bedrooms) : null,
      bathrooms: form.bathrooms ? Number(form.bathrooms) : null,
      area_sqm: form.area_sqm ? Number(form.area_sqm) : null,
      video_url: form.video_url || null,
      updated_at: new Date().toISOString(),
    }

    let error
    if (mode === 'new') {
      const result = await supabase.from('projects').insert([payload])
      error = result.error
    } else if (initialData) {
      const result = await supabase.from('projects').update(payload).eq('id', initialData.id)
      error = result.error
    }

    if (error) {
      setErrorMsg(error.message)
      setStatus('error')
    } else {
      setStatus('success')
      setTimeout(() => router.push('/admin/dashboard'), 1500)
    }
    setSaving(false)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin/dashboard" className="flex items-center gap-2 text-gray-500 hover:text-gray-900 text-sm transition-colors">
              <ArrowLeft size={16} /> Dashboard
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-semibold text-sm">
              {mode === 'new' ? 'New Project' : 'Edit Project'}
            </span>
          </div>
          <button
            form="project-form"
            type="submit"
            disabled={saving || uploading || videoUploading}
            className="btn-primary py-2 text-sm disabled:opacity-60"
          >
            {saving ? (
              <><Loader2 size={15} className="animate-spin" /> Saving...</>
            ) : (
              <><Save size={15} /> Save Project</>
            )}
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {status === 'success' && (
          <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 mb-6">
            <CheckCircle size={16} />
            Project saved! Redirecting to dashboard...
          </div>
        )}
        {status === 'error' && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 mb-6">
            <AlertCircle size={16} />
            {errorMsg}
          </div>
        )}

        <form id="project-form" onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h2 className="font-bold text-gray-900 mb-5 font-heading">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <label className="label">Project Title *</label>
                <input
                  name="title"
                  required
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. Modern 4-Bedroom Family Home – Parramatta"
                  className="input-field"
                />
              </div>

              <div>
                <label className="label">Short Description *</label>
                <input
                  name="short_description"
                  required
                  value={form.short_description}
                  onChange={handleChange}
                  placeholder="One line description shown on project cards (max 120 chars)"
                  maxLength={120}
                  className="input-field"
                />
              </div>

              <div>
                <label className="label">Full Description *</label>
                <textarea
                  name="description"
                  required
                  rows={6}
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Detailed description of the project – scope of work, materials used, challenges overcome, outcomes..."
                  className="input-field resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="label">Project Type *</label>
                  <select name="project_type" value={form.project_type} onChange={handleChange} className="input-field">
                    <option value="new_build">New Home Build</option>
                    <option value="renovation">Renovation & Extension</option>
                    <option value="knockdown_rebuild">Knockdown Rebuild</option>
                  </select>
                </div>
                <div>
                  <label className="label">Status *</label>
                  <select name="status" value={form.status} onChange={handleChange} className="input-field">
                    <option value="completed">Completed</option>
                    <option value="in_progress">In Progress</option>
                    <option value="upcoming">Upcoming</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={form.featured}
                  onChange={handleChange}
                  className="w-4 h-4 accent-[#C0392B]"
                />
                <label htmlFor="featured" className="text-sm font-medium text-gray-700 cursor-pointer">
                  Feature this project on the home page
                </label>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h2 className="font-bold text-gray-900 mb-5 font-heading">Location</h2>
            <div className="space-y-4">
              <div>
                <label className="label">Street Address *</label>
                <input
                  name="address"
                  required
                  value={form.address}
                  onChange={handleChange}
                  placeholder="e.g. 42 Sunset Drive"
                  className="input-field"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="label">Suburb *</label>
                  <input
                    name="suburb"
                    required
                    value={form.suburb}
                    onChange={handleChange}
                    placeholder="e.g. Parramatta"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="label">State *</label>
                  <select name="state" value={form.state} onChange={handleChange} className="input-field">
                    <option value="NSW">NSW</option>
                    <option value="VIC">VIC</option>
                    <option value="QLD">QLD</option>
                    <option value="WA">WA</option>
                    <option value="SA">SA</option>
                    <option value="TAS">TAS</option>
                    <option value="ACT">ACT</option>
                    <option value="NT">NT</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h2 className="font-bold text-gray-900 mb-5 font-heading">Project Details</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className="label">Year Completed</label>
                <input
                  name="year_completed"
                  type="number"
                  min="2000"
                  max="2030"
                  value={form.year_completed ?? ''}
                  onChange={handleChange}
                  placeholder="2024"
                  className="input-field"
                />
              </div>
              <div>
                <label className="label">Bedrooms</label>
                <input
                  name="bedrooms"
                  type="number"
                  min="0"
                  max="20"
                  value={form.bedrooms ?? ''}
                  onChange={handleChange}
                  placeholder="4"
                  className="input-field"
                />
              </div>
              <div>
                <label className="label">Bathrooms</label>
                <input
                  name="bathrooms"
                  type="number"
                  min="0"
                  max="10"
                  value={form.bathrooms ?? ''}
                  onChange={handleChange}
                  placeholder="2"
                  className="input-field"
                />
              </div>
              <div>
                <label className="label">Floor Area (m²)</label>
                <input
                  name="area_sqm"
                  type="number"
                  min="0"
                  value={form.area_sqm ?? ''}
                  onChange={handleChange}
                  placeholder="280"
                  className="input-field"
                />
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h2 className="font-bold text-gray-900 mb-2 font-heading">Project Images</h2>
            <p className="text-gray-500 text-sm mb-5">Upload photos of the project. First image will be used as the cover photo.</p>

            {/* Current images */}
            {form.images.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-4">
                {form.images.map((img, i) => (
                  <div key={i} className="relative group rounded-xl overflow-hidden aspect-square">
                    <Image src={img} alt="" fill className="object-cover" sizes="25vw" />
                    {i === 0 && (
                      <div className="absolute top-2 left-2 bg-[#C0392B] text-white text-xs px-1.5 py-0.5 rounded font-medium">
                        Cover
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => removeImage(img, i)}
                      className="absolute top-2 right-2 w-6 h-6 bg-black/60 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Upload zone */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 hover:border-[#C0392B] rounded-xl p-8 text-center cursor-pointer transition-colors"
            >
              {uploading ? (
                <div className="flex flex-col items-center gap-2 text-gray-500">
                  <Loader2 size={28} className="animate-spin text-[#C0392B]" />
                  <p className="text-sm">Uploading images...</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 text-gray-400">
                  <Upload size={28} />
                  <p className="text-sm font-medium text-gray-600">Click to upload images</p>
                  <p className="text-xs">PNG, JPG, WEBP up to 10MB each</p>
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => e.target.files && handleImageUpload(e.target.files)}
            />
          </div>

          {/* Video */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h2 className="font-bold text-gray-900 mb-2 font-heading">Project Video</h2>
            <p className="text-gray-500 text-sm mb-5">
              Optional. Upload a video of the project. MP4, WEBM or MOV up to 50MB.
            </p>

            {form.video_url ? (
              <div className="space-y-3">
                <video
                  key={form.video_url}
                  src={form.video_url}
                  controls
                  playsInline
                  preload="metadata"
                  className="w-full max-h-80 rounded-xl bg-black"
                />
                <button
                  type="button"
                  onClick={removeVideo}
                  className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-600 transition-colors"
                >
                  <X size={14} /> Remove video
                </button>
              </div>
            ) : (
              <div
                onClick={() => !videoUploading && videoInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 hover:border-[#C0392B] rounded-xl p-8 text-center cursor-pointer transition-colors"
              >
                {videoUploading ? (
                  <div className="flex flex-col items-center gap-2 text-gray-500">
                    <Loader2 size={28} className="animate-spin text-[#C0392B]" />
                    <p className="text-sm">Uploading video...</p>
                    <p className="text-xs">Large files can take a minute. Please don&apos;t close this page.</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-gray-400">
                    <Upload size={28} />
                    <p className="text-sm font-medium text-gray-600">Click to upload a video</p>
                    <p className="text-xs">MP4, WEBM, MOV up to 50MB</p>
                  </div>
                )}
              </div>
            )}

            {videoError && (
              <p className="mt-3 flex items-start gap-1.5 text-sm text-red-600">
                <AlertCircle size={14} className="shrink-0 mt-0.5" /> {videoError}
              </p>
            )}

            <input
              ref={videoInputRef}
              type="file"
              accept="video/mp4,video/webm,video/quicktime"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleVideoUpload(e.target.files[0])}
            />
          </div>

          {/* Mobile submit */}
          <div className="flex justify-end pb-8">
            <button
              type="submit"
              disabled={saving || uploading || videoUploading}
              className="btn-primary text-base px-8 py-3.5 disabled:opacity-60"
            >
              {saving ? (
                <><Loader2 size={16} className="animate-spin" /> Saving...</>
              ) : (
                <><Save size={16} /> {mode === 'new' ? 'Publish Project' : 'Save Changes'}</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
