/**
 * Helper function for `getUrlState` that parses the URL hash into an object.
 */
export function parseUrlHash() {
  return document.location.hash
    .slice(1)
    .split('&')
    .reduce(
      (acc, curr) => {
        const [key, value] = curr.split('=')
        acc[key] = value
        return acc
      },
      {} as Record<string, string>
    )
}

/**
 * Retrieves the state from the URL based on the specified key and location.
 * The state is expected to be Base64 encoded and JSON serialized.
 *
 * @template T - The expected type of the state.
 *
 * @param key - The key to look for in the URL.
 * @param The location in the URL to search for the key ('hash' or 'search').
 * @param obj - Whether the state is expected to be an object.
 *
 * @returns - The decoded and parsed state object.
 */
export function getUrlState<T = any>(
  key: string,
  location: 'hash' | 'search',
  obj = false
): T {
  if (location === 'hash') {
    const urlState = parseUrlHash()
    const value = urlState[key]
    if (!obj) return value as T
    return value ? JSON.parse(window.atob(value)) : ({} as T)
  }
  const url = new URL(window.location.href)
  const value = url.searchParams.get(key)
  if (!obj) return value as T
  return value ? JSON.parse(window.atob(value)) : ({} as T)
}
