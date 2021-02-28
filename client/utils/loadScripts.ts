/**
 * Load scripts using document.createElement
 *
 * @param scriptSrc - Sources to load
 */
export function loadScripts(scriptSource: string[]): Promise<void> {
  return new Promise((resolve) => {
    Promise.all(
      scriptSource.map(
        (s) =>
          new Promise((r) => {
            const script = document.createElement('script')
            script.addEventListener('load', () => r(true))
            script.src = s
            document.head.append(script)
          })
      )
    ).then(() => resolve())
  })
}
