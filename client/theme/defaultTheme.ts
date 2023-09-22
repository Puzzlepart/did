import { Theme, webLightTheme } from '@fluentui/react-components'
import { ISemanticColors, PartialTheme } from '@fluentui/react/lib/Theme'
import fonts from './fonts'

interface ExtendedThemeSemanticColors extends Partial<ISemanticColors> {
  infoText?: string
}

interface ExtendedTheme extends PartialTheme {
  semanticColors: ExtendedThemeSemanticColors
}

const legacyDefaultTheme: ExtendedTheme = {
  components: {
    logo: {
      styles: {
        color: '#fff'
      }
    },
    motto: {
      styles: {
        color: '#999999'
      }
    }
  },
  semanticColors: {
    link: '#133748',
    menuBackground: '#fff',
    menuHeader: '#3a0960',
    bodyBackground: '#ffffff',
    bodySubtext: '#605e5c',
    successBackground: '#C9F7E8',
    successText: '#444',
    infoBackground: '#fff',
    infoText: '#444',
    errorBackground: 'var(--colorPaletteRedForeground1)',
    errorText: '#fff',
    warningBackground: '#fff4ce',
    warningText: '#444'
  },
  palette: {
    themePrimary: '#0078d4',
    themeLighterAlt: '#eff6fc',
    themeLighter: '#deecf9',
    themeLight: '#c7e0f4',
    themeTertiary: '#71afe5',
    themeSecondary: '#2b88d8',
    themeDarkAlt: '#106ebe',
    themeDark: '#005a9e',
    themeDarker: '#004578',
    neutralLighterAlt: '#f8f8f8',
    neutralLighter: '#f4f4f4',
    neutralLight: '#eaeaea',
    neutralQuaternaryAlt: '#dadada',
    neutralQuaternary: '#d0d0d0',
    neutralTertiaryAlt: '#c8c8c8',
    neutralTertiary: '#c2c2c2',
    neutralSecondary: '#858585',
    neutralPrimaryAlt: '#4b4b4b',
    neutralPrimary: '#333333',
    neutralDark: '#272727',
    black: '#1d1d1d',
    white: '#ffffff',
    whiteTranslucent40: '#ffffff88'
  },
  ...fonts
}

/**
 * The Fluent Light theme uses `webLightTheme` from `@fluentui/react-components`
 */
export const fluentDefaultTheme = webLightTheme

/**
 * The Light theme is a combination of the legacy theme and the Fluent Light theme
 */
export const defaultTheme: [PartialTheme, Theme] = [
  legacyDefaultTheme,
  fluentDefaultTheme
]
