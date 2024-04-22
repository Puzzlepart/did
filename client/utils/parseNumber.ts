/**
 * Parses a string value into an integer. If the value is
 * not a number, returns `null`.
 *
 * @param value The string value to parse.
 */
export function parseInt(value: string): number {
  if (Number.isNaN(value)) return null
  return Number.parseInt(value)
}

/**
 * Parses a string value into a floating point number. If the value is
 * not a number, returns `null`.
 *
 * @param value The string value to parse.
 */
export function parseFloat(value: string): number {
  if (Number.isNaN(value)) return null
  return Number.parseFloat(value)
}
