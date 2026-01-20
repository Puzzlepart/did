import { Theme, webLightTheme } from '@fluentui/react-components'
import { UserTheme } from './types'

/**
 * The Fluent Light theme uses `webLightTheme` from `@fluentui/react-components`
 */
export const fluentDefaultTheme: Theme = {
  ...webLightTheme,
  colorBrandForegroundLink: '#133748'
}

/**
 * The default light theme for the application
 */
export const defaultTheme: UserTheme = {
  name: 'default',
  fluentTheme: fluentDefaultTheme
}
