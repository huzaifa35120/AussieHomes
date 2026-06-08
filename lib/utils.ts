/**
 * Turn an Australian phone number into a tel: href.
 * "02 8361 0375" -> "tel:0283610375"
 *
 * Pure utility – safe to import from both client and server components.
 */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/\s+/g, '')}`
}
