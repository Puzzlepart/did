/**
 * Check if the value is nullish (null, undefined, empty string, or 0).
 *
 * @param value - Value to check
 */
export function isNullish<T = any>(value: T): boolean {
  return value === null || value === undefined || value === '' || value === 0
}
