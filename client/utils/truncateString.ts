/**
 * Truncate string
 *
 * @param str - String to truncate
 * @param length - Max length
 */
export function truncateString(string: string, length: number): string {
  if (string.length > length) return string.slice(0, Math.max(0, length)) + '...'
  return string
}
