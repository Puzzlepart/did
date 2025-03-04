/**
 * Generates a random alphanumeric string of length 9.
 *
 * @returns A random alphanumeric string.
 */
export function generateId(length = 9): string {
  return Math.random()
    .toString(36)
    .slice(2, length + 2)
}
