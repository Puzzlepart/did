/**
 * Truncate string
 *
 * @param {string[]} input String to truncate
 * @param {number} length Max length
 */
export function truncateString(input: string, length: number): string {
  if (input.length > length) return input.substring(0, length) + '...'
  return input
}
