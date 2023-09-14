import { PartialTheme, ThemeProviderProps } from '@fluentui/react'
import { Theme } from '@fluentui/react-components'

export interface IThemedProps extends Omit<ThemeProviderProps, 'theme'> {
  theme: [PartialTheme, Theme]
}
