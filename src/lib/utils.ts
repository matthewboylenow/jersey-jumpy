import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

/**
 * Formats a calendar date (e.g. an event date chosen in a
 * `<input type="date">`) for display.
 *
 * A bare date string like "2026-06-19" has no time or timezone. Passing it to
 * `new Date()` parses it as UTC midnight, and formatting that in a timezone
 * behind UTC (such as America/New_York) rolls it back to the previous day —
 * the classic "off by one" booking-date bug. To avoid that, we parse the
 * Y/M/D parts directly and format in UTC so the calendar date is preserved
 * regardless of the server or browser timezone.
 */
export function formatEventDate(
  date: string | Date | null | undefined,
  options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
): string {
  if (!date) return 'N/A'
  const iso = typeof date === 'string' ? date : date.toISOString()
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso)
  if (!match) return typeof date === 'string' ? date : iso
  const [, year, month, day] = match
  const d = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)))
  return d.toLocaleDateString('en-US', { ...options, timeZone: 'UTC' })
}
