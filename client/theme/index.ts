import { default as dark } from './dark'
import { default as light } from './light'

/**
 * Get theme by name
 * 
 * @param name - Theme name
 * 
 * @returns the theme with palette
 */
export function getTheme(name: string) {
    switch (name) {
        case 'dark': return dark
        default: return light
    }
}