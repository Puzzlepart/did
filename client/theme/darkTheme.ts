import { Theme, webDarkTheme } from '@fluentui/react-components'
import { UserTheme } from './types'

/**
 * The default dark theme for the application with custom GitHub-inspired dark colors
 */
const fluentDarkTheme: Theme = {
  ...webDarkTheme,
  // Custom dark theme colors matching the old v8 theme
  colorNeutralBackground1: '#0d1117', // Main page background
  colorNeutralBackground2: '#161b22', // Secondary background (cards, panels)
  colorNeutralBackground3: '#21262d', // Tertiary background
  colorNeutralForeground1: '#c9d1d9', // Main text color
  colorNeutralForeground2: '#8b949e', // Secondary text color
  colorNeutralStroke1: '#30363d' // Border color
}

export const darkTheme: UserTheme = {
  name: 'dark',
  fluentTheme: fluentDarkTheme
}
