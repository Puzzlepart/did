/**
 * Try parse JSON
 *
 * @param str - String
 * @param fallbackValue - Fallback value when `JSON.parse` fails
 */
export function tryParseJson<T = any>(string: string, fallbackValue = {}): T {
  try {
    return JSON.parse(string)
  } catch {
    return fallbackValue as T
  }
}
