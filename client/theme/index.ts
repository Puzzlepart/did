import { Theme } from '@fluentui/react-components'
import { PartialTheme } from '@fluentui/react/lib/Theme'
import { defaultTheme } from './defaultTheme'

/**
 * Get theme by name
 *
 * @returns the theme with palette
 */
export function getTheme(): [PartialTheme, Theme] {
  return defaultTheme
}

export * from './defaultTheme'
export * from './Themed'
