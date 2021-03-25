import { Theme } from '@fluentui/react'
import { default as lightTheme } from './light'
import { default as darkTheme } from './dark'

/**
 * Get theme by name
 *
 * @param name - Theme name
 *
 * @returns the theme with palette
 */
export function getTheme(name: string): Theme {
    switch (name) {
        case 'dark': return darkTheme
        case 'auto': return getAutoColorScheme()
        default: return lightTheme
    }
}

function getAutoColorScheme(): Theme {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? darkTheme : lightTheme
}

export { lightTheme, darkTheme }
