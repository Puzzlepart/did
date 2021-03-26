import { PartialTheme } from '@fluentui/react'
import { default as darkTheme } from './dark'
import { default as lightTheme } from './light'

/**
 * Get theme by name
 *
 * @param name - Theme name
 *
 * @returns the theme with palette
 */
export function getTheme(name: string): PartialTheme {
  switch (name) {
    case 'dark':
      return darkTheme
    case 'auto':
      return getAutoColorScheme()
    default:
      return lightTheme
  }
}

/**
 * Get color scheme based on client's system preference
 *
 * @see https://developer.mozilla.org/docs/Web/CSS/\@media/prefers-color-scheme
 *
 * @returns the system preferred color scheme, either darkTheme or lightTheme
 */
function getAutoColorScheme(): PartialTheme {
  return window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
    ? darkTheme
    : lightTheme
}

export { lightTheme, darkTheme }
