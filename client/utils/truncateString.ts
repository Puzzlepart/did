/**
 * Truncate string
 *
 * @param str - String to truncate
 * @param length - Max length
 */
export function truncateString(str: string, length: number): string {
  if (str.length > length) return str.substring(0, length) + '...'
  return str
}
