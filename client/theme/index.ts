import { ContextUser } from 'AppContext'
import { darkTheme } from './darkTheme'
import { defaultTheme } from './defaultTheme'

/**
 * Get theme by name
 *
 * @returns the theme with palette
 */
export function getTheme(
  name: 'auto' | 'dark' | 'default' = 'auto'
): ContextUser['theme'] {
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
function getAutoColorScheme(): ContextUser['theme'] {
  return window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
    ? getTheme('dark')
    : getTheme('default')
}

export * from './Themed'
export * from './darkTheme'
export * from './defaultTheme'
