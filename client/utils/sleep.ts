/**
 * Sleep for n seconds
 *
 * @param n - Seconds to sleep
 */
export function sleep(n: number) {
  return new Promise((resolve) => window.setTimeout(resolve, n * 1000))
}
