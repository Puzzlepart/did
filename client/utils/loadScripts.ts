/**
 * Load scripts
 *
 * @param scriptSrc - Sources to load
 */
export function loadScripts(scriptSrc: string[]): Promise<void> {
  return new Promise((resolve) => {
    Promise.all(
      scriptSrc.map(
        (s) =>
          new Promise((r) => {
            const script = document.createElement('script')
            script.onload = () => r(true)
            script.src = s
            document.head.appendChild(script)
          })
      )
    ).then(() => resolve())
  })
}
