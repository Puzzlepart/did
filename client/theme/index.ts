import { Theme, webDarkTheme, webLightTheme } from '@fluentui/react-components'
import { PartialTheme } from '@fluentui/react/lib/Theme'
import { default as darkTheme } from './dark'
import { default as lightTheme } from './light'

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
  const _lightTheme = [lightTheme, webLightTheme] as [PartialTheme, Theme]
  const _darkTheme = [darkTheme, webDarkTheme] as [PartialTheme, Theme]
  if (forceLightTheme) {
    return _lightTheme
  }
  switch (name) {
    case 'dark': {
      return _darkTheme
    }
    case 'auto': {
      return getAutoColorScheme()
    }
    default: {
      return _lightTheme
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

export { default as darkTheme } from './dark'
export { default as lightTheme } from './light'
export * from './Themed'
