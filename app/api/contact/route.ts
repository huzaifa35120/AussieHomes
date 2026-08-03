import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { sendEnquiryEmail } from '@/lib/email'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, service_type, message } = body

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: 'Name, email and message are required.' },
        { status: 400 }
      )
    }

    if (!EMAIL_RE.test(email.trim())) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      )
    }

    const enquiry = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || null,
      service_type: service_type || null,
      message: message.trim(),
    }

    // 1. Persist first — the enquiry must survive even if the email fails.
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const { error } = await supabase
      .from('contact_enquiries')
      .insert([{ ...enquiry, read: false }])

    if (error) {
      console.error('[contact] Supabase insert failed:', error)
      return NextResponse.json(
        { error: 'Failed to save enquiry. Please try again.' },
        { status: 500 }
      )
    }

    // 2. Notify the business inbox. Never block the visitor on this.
    const result = await sendEnquiryEmail(enquiry)
    if (!result.sent) {
      console.error('[contact] Email notification not sent:', result.reason)
    }

    return NextResponse.json({ success: true, emailed: result.sent })
  } catch (err) {
    console.error('[contact] Unhandled error:', err)
    return NextResponse.json(
      { error: 'Server error. Please try again.' },
      { status: 500 }
    )
  }
}
