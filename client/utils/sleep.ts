/**
 * Sleep for x seconds
 *
 * @param {number} seconds Seconds
 */
export function sleep(seconds: number) {
  return new Promise((resolve) => window.setTimeout(resolve, seconds * 1000))
}
