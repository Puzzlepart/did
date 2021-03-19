/* eslint-disable unicorn/prevent-abbreviations */
import { getValue as get } from 'helpers'

/**
 * Load scripts using document.createElement
 *
 * @param scriptSrc - Sources to load
 * @param basePath - Base path
 * @param globals - Globals
 */
export function loadScripts<T = any>(
  scriptSource: string[],
  basePath = '',
  globals: Record<string, string>
): Promise<T> {
  return new Promise((resolve) => {
    Promise.all(
      scriptSource.map(
        (src_) =>
          new Promise((r) => {
            const script = document.createElement('script')
            script.addEventListener('load', () => r(true))
            script.src = [basePath, src_].join('')
            document.head.append(script)
          })
      )
    ).then(() => {
      const _globals = Object.keys(globals).reduce(
        (obj, key) => ({
          ...obj,
          [key]: get(window, globals[key])
        }),
        {}
      )
      resolve((_globals as unknown) as T)
    })
  })
}
