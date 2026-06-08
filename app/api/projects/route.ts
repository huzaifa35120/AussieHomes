import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const featured = searchParams.get('featured')
  const type = searchParams.get('type')
  const limit = parseInt(searchParams.get('limit') || '50')

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  let query = supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit)

  if (featured === 'true') query = query.eq('featured', true)
  if (type) query = query.eq('project_type', type)

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}
