import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import ProjectForm from '@/components/ProjectForm'

export const metadata: Metadata = { title: 'Edit Project' }

interface Props {
  params: { id: string }
}

export default async function EditProjectPage({ params }: Props) {
  const supabase = createServerSupabaseClient()
  const { data: project } = await supabase
    .from('projects')
    .select('*')
    .eq('id', params.id)
    .single()

  if (!project) notFound()

  return <ProjectForm mode="edit" initialData={project} />
}
