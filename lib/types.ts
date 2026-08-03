export interface Project {
  id: string
  title: string
  description: string
  short_description: string
  project_type: 'new_build' | 'renovation' | 'knockdown_rebuild'
  status: 'completed' | 'in_progress' | 'upcoming'
  address: string
  suburb: string
  state: string
  year_completed: number | null
  images: string[]
  video_url: string | null
  featured: boolean
  bedrooms: number | null
  bathrooms: number | null
  area_sqm: number | null
  created_at: string
  updated_at: string
}

export interface ContactEnquiry {
  id: string
  name: string
  email: string
  phone: string
  service_type: string
  message: string
  created_at: string
  read: boolean
}

export const PROJECT_TYPE_LABELS: Record<Project['project_type'], string> = {
  new_build: 'New Home Build',
  renovation: 'Renovation & Extension',
  knockdown_rebuild: 'Knockdown Rebuild',
}

export const PROJECT_STATUS_LABELS: Record<Project['status'], string> = {
  completed: 'Completed',
  in_progress: 'In Progress',
  upcoming: 'Upcoming',
}

export interface SiteSettings {
  id: string
  company_name: string
  tagline: string
  director_name: string
  director_title: string
  director_initials: string
  director_quote: string
  licence_number: string
  acn: string
  phone_mobile: string
  phone_office: string
  email: string
  address_short: string
  address_service_area: string
  business_hours_weekday: string
  business_hours_weekend: string
  updated_at: string
}

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  id: 'main',
  company_name: 'Auzi Homes PTY LTD',
  tagline: 'Building homes just got better',
  director_name: 'Faizan Tayyab',
  director_title: 'Director & Licensed Builder',
  director_initials: 'FT',
  director_quote:
    'At Auzi Homes, we believe every family deserves a home built with honesty, skill, and genuine care. That\'s the standard we hold ourselves to on every single project.',
  licence_number: '466481',
  acn: '673 861 893',
  phone_mobile: '0424 870 667',
  phone_office: '',
  email: 'auzihomes@gmail.com',
  address_short: 'Sydney, NSW, Australia',
  address_service_area: 'Servicing all of Greater Sydney',
  business_hours_weekday: 'Mon – Fri: 7am – 6pm',
  business_hours_weekend: 'Sat: 8am – 2pm',
  updated_at: new Date(0).toISOString(),
}
