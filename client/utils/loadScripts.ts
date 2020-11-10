/**
 * Load scripts
 *
 * @param {string[]} src Source to load
 */
export function loadScripts(src: string[]): Promise<void> {
  return new Promise((resolve) => {
    Promise.all(
      src.map(
        (s) =>
          new Promise((r) => {
            const script = document.createElement('script')
            script.onload = () => r()
            script.src = s
            document.head.appendChild(script)
          })
      )
    ).then(() => resolve())
  })
}
