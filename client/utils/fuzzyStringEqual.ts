/**
 * Compares two strings for equality, ignoring non-alphanumeric characters and case.
 *
 * @param a - The first string to compare.
 * @param b - The second string to compare.
 *
 * @returns True if the strings are equal, false otherwise.
 */
export function fuzzyStringEqual(a: string = '', b: string = ''): boolean {
  return (
    a?.replace(/[^\dA-Za-z]/g, '')?.toLowerCase() ===
    b?.replace(/[^\dA-Za-z]/g, '')?.toLowerCase()
  )
}
