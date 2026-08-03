import { Resend } from 'resend'

export interface EnquiryPayload {
  name: string
  email: string
  phone?: string | null
  service_type?: string | null
  message: string
}

const SERVICE_LABELS: Record<string, string> = {
  new_build: 'New Home Build',
  renovation: 'Renovation & Extension',
  knockdown_rebuild: 'Knockdown Rebuild',
  other: 'Other / General Enquiry',
}

const BRAND = '#C0392B'

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function row(label: string, value: string, isLink?: 'mail' | 'tel'): string {
  const safe = escapeHtml(value)
  const inner =
    isLink === 'mail'
      ? `<a href="mailto:${safe}" style="color:${BRAND};text-decoration:none">${safe}</a>`
      : isLink === 'tel'
      ? `<a href="tel:${safe.replace(/\s+/g, '')}" style="color:${BRAND};text-decoration:none">${safe}</a>`
      : safe

  return `
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid #EFEBEA;width:130px;vertical-align:top;
                 font:600 12px/1.5 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;
                 letter-spacing:.06em;text-transform:uppercase;color:#9A918F">${label}</td>
      <td style="padding:12px 0;border-bottom:1px solid #EFEBEA;
                 font:400 15px/1.6 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#14100F">${inner}</td>
    </tr>`
}

function buildHtml(enquiry: EnquiryPayload, received: string): string {
  const service = enquiry.service_type
    ? SERVICE_LABELS[enquiry.service_type] || enquiry.service_type
    : 'Not specified'

  return `<!DOCTYPE html>
<html><body style="margin:0;padding:24px 12px;background:#F4F1F0">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:620px;margin:0 auto">
    <tr><td style="background:linear-gradient(135deg,#E74C3C,#C0392B 45%,#7B1818);border-radius:16px 16px 0 0;padding:28px 32px">
      <p style="margin:0;font:800 20px/1.3 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#fff">
        New website enquiry
      </p>
      <p style="margin:6px 0 0;font:400 13px/1.5 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:rgba(255,255,255,.8)">
        ${escapeHtml(received)}
      </p>
    </td></tr>

    <tr><td style="background:#fff;padding:8px 32px 28px">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        ${row('Name', enquiry.name)}
        ${row('Email', enquiry.email, 'mail')}
        ${enquiry.phone ? row('Phone', enquiry.phone, 'tel') : ''}
        ${row('Service', service)}
      </table>

      <p style="margin:26px 0 8px;font:600 12px/1.5 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;
                letter-spacing:.06em;text-transform:uppercase;color:#9A918F">Message</p>
      <div style="background:#FBF8F7;border-left:3px solid ${BRAND};border-radius:0 10px 10px 0;padding:16px 18px;
                  font:400 15px/1.7 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#2A2422;
                  white-space:pre-wrap">${escapeHtml(enquiry.message)}</div>

      <a href="mailto:${escapeHtml(enquiry.email)}"
         style="display:inline-block;margin-top:26px;background:${BRAND};color:#fff;text-decoration:none;
                border-radius:10px;padding:13px 26px;
                font:600 15px/1 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif">
        Reply to ${escapeHtml(enquiry.name.split(' ')[0])}
      </a>
      <p style="margin:16px 0 0;font:400 13px/1.6 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#9A918F">
        You can also just hit reply — this email is set to reply straight to them.
      </p>
    </td></tr>

    <tr><td style="background:#14100F;border-radius:0 0 16px 16px;padding:18px 32px;text-align:center">
      <p style="margin:0;font:400 12px/1.6 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#7A716F">
        Sent from the Auzi Homes website · also saved in your admin dashboard
      </p>
    </td></tr>
  </table>
</body></html>`
}

function buildText(enquiry: EnquiryPayload, received: string): string {
  const service = enquiry.service_type
    ? SERVICE_LABELS[enquiry.service_type] || enquiry.service_type
    : 'Not specified'

  return [
    'NEW WEBSITE ENQUIRY',
    received,
    '',
    `Name:    ${enquiry.name}`,
    `Email:   ${enquiry.email}`,
    enquiry.phone ? `Phone:   ${enquiry.phone}` : null,
    `Service: ${service}`,
    '',
    'Message:',
    enquiry.message,
    '',
    '— Sent from the Auzi Homes website. Also saved in your admin dashboard.',
  ]
    .filter(Boolean)
    .join('\n')
}

/**
 * Email the enquiry to the business inbox.
 *
 * Returns a result object rather than throwing: a failed notification must never
 * lose the enquiry, which is already stored in Supabase by the time this runs.
 */
export async function sendEnquiryEmail(
  enquiry: EnquiryPayload
): Promise<{ sent: boolean; reason?: string }> {
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_EMAIL
  const from = process.env.RESEND_FROM || 'Auzi Homes Website <onboarding@resend.dev>'

  if (!apiKey) return { sent: false, reason: 'RESEND_API_KEY is not set' }
  if (!to) return { sent: false, reason: 'CONTACT_EMAIL is not set' }

  const received = new Date().toLocaleString('en-AU', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Australia/Sydney',
  })

  try {
    const resend = new Resend(apiKey)
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: enquiry.email,
      subject: `New enquiry — ${enquiry.name}${enquiry.phone ? ` (${enquiry.phone})` : ''}`,
      html: buildHtml(enquiry, received),
      text: buildText(enquiry, received),
    })

    if (error) return { sent: false, reason: error.message }
    return { sent: true }
  } catch (err) {
    return { sent: false, reason: err instanceof Error ? err.message : 'Unknown error' }
  }
}
