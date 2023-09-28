/**
 * Checks if an array contains a value, ignoring case.
 * 
 * @param array - The array to check.
 * @param value - The value to check for.
 */
export function fuzzyContains(array: string[], value: string): boolean {
  return array.some((item) => item.toLowerCase().includes(value.toLowerCase()))
}