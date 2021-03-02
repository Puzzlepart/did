/**
 * Attempts to parse JSON string, and falls back to the specified fallbackValue if
 * the parse fails.
 *
 * @param string_ - String to parse
 * @param fallbackValue - Fallback value
 */
export function tryParseJson<T = any>(
  string_: string,
  fallbackValue: T = null
): T {
  try {
    const json = JSON.parse(string_) || fallbackValue
    return json
  } catch {
    return fallbackValue
  }
}
