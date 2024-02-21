import { darkTheme } from './darkTheme'
import { defaultTheme } from './defaultTheme'
import { UserTheme } from './types'

/**
 * Get theme by name
 *
 * @returns the theme with palette
 */
export function getTheme(name: UserTheme['name'] = 'auto'): UserTheme {
  switch (name) {
    case 'dark': {
      return darkTheme
    }
    case 'auto': {
      return getAutoColorScheme()
    }
    default: {
      return defaultTheme
    }
  }
}

/**
 * Get color scheme based on client's system preference
 *
 * @see https://developer.mozilla.org/docs/Web/CSS/\@media/prefers-color-scheme
 *
 * @returns the system preferred color scheme, either darkTheme or lightTheme
 */
function getAutoColorScheme(): UserTheme {
  if (window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? getTheme('dark')
      : getTheme('default')
  }
  return getTheme('default')
}

export * from './Themed'
export * from './darkTheme'
export * from './defaultTheme'
export * from './iconCatalog'
