/**
 * Sleep for x seconds
 *
 * @param seconds - Seconds to sleep
 */
export function sleep(seconds: number) {
  return new Promise((resolve) => window.setTimeout(resolve, seconds * 1000))
}
