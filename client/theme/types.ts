import { PartialTheme } from '@fluentui/react'
import { Theme } from '@fluentui/react-components'

export type UserTheme = {
  name: 'default' | 'dark' | 'auto'
  legacyTheme: PartialTheme
  fluentTheme: Theme
}