import { Theme } from '@fluentui/react-components'
import { PartialTheme } from '@fluentui/react/lib/Theme'
import { darkTheme } from './dark'
import { lightTheme } from './light'

/**
 * Get theme by name
 *
 * @param name - Theme name
 * @param forceLightTheme - Force light theme
 *
 * @returns the theme with palette
 */
export function getTheme(
  name: string,
  forceLightTheme = true
): [PartialTheme, Theme] {
  if (forceLightTheme) {
    return lightTheme
  }
  switch (name) {
    case 'dark': {
      return darkTheme
    }
    case 'auto': {
      return getAutoColorScheme()
    }
    default: {
      return lightTheme
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
function getAutoColorScheme(): [PartialTheme, Theme] {
  return window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
    ? getTheme('dark')
    : getTheme('light')
}

export * from './dark'
export * from './light'
export * from './Themed'
