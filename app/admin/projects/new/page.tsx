import type { Metadata } from 'next'
import ProjectForm from '@/components/ProjectForm'

export const metadata: Metadata = { title: 'New Project' }

export default function NewProjectPage() {
  return <ProjectForm mode="new" />
}
