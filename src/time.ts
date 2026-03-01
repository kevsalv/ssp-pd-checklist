/**
 * Parse a time string (e.g. "30m", "1h", "1h 30m") into total minutes.
 * Invalid or missing values return 0; empty string defaults to 30m for backwards compatibility.
 */
export function parseTimeToMinutes(s: string | undefined): number {
  if (s == null || typeof s !== 'string') return 0;
  const raw = s.trim();
  if (raw === '') return 30; // default when empty
  let total = 0;
  const hourMatch = raw.match(/(\d+)\s*h(?:ours?)?/i);
  if (hourMatch) total += parseInt(hourMatch[1], 10) * 60;
  const minMatch = raw.match(/(\d+)\s*m(?:in(?:utes?)?)?/i);
  if (minMatch) total += parseInt(minMatch[1], 10);
  if (total === 0 && /^\d+$/.test(raw)) total = parseInt(raw, 10);
  return total;
}

/**
 * Format total minutes as "Xh Ym" or "Xm" (no hours if 0).
 */
export function formatMinutes(minutes: number): string {
  if (minutes <= 0) return '0m';
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}
