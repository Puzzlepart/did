import { PartialTheme } from '@fluentui/react/lib/Theme'
import fonts from './fonts'

export default {
  semanticColors: {
    menuHeader: '#161b22',
    bodyBackground: '#0d1117',
    successBackground: '#393d1b',
    successText: '#fff',
    infoBackground: '#323130',
    infoText: '#fff',
    bodySubtext: '#c9d1d9'
  },
  palette: {
    themeDarker: '#0d1117',
    themeDark: '#0d1117',
    themeDarkAlt: '#dcdcdc',
    themePrimary: '#dcdcdc',
    themeSecondary: '#dcdcdc',
    themeTertiary: '#dcdcdc',
    themeLight: '#dcdcdc',
    themeLighter: '#dcdcdc',
    themeLighterAlt: '#dcdcdc',
    /**
     * Strongest color, very light in dark theme
     */
    black: '#f8f8f8',
    blackTranslucent40: '#000000aa',
    neutralDark: '#f4f4f4',

    /**
     * Main text color'
     */
    neutralPrimary: '#c9d1d9',
    neutralPrimaryAlt: '#dadada',
    neutralSecondary: '#c9d1d9',
    neutralSecondaryAlt: '#ff0000',
    neutralTertiary: '#c8c8c8',
    neutralTertiaryAlt: '#6d6d6d',
    neutralQuaternary: '#4f4f4f',
    neutralQuaternaryAlt: '#484848',
    neutralLight: '#3f3f3f',
    /**
     * Timesheet border, hover color. same as background for now
     */
    neutralLighter: '#3f3f3f',
    neutralLighterAlt: '#252422',
    accent: '#ff0000',
    /**
     * This is the page background
     */
    white: '#0d1117',
    whiteTranslucent40: '#1f1f1f88',
    yellowDark: '#dcdcdc',
    yellow: 'yellow',
    yellowLight: '#dcdcdc',
    orange: 'orange',
    orangeLight: '#dcdcdc',
    orangeLighter: '#dcdcdc',
    redDark: '#dcdcdc',
    red: 'red',
    magentaDark: '#dcdcdc',
    magenta: 'magenta',
    magentaLight: '#dcdcdc',
    purpleDark: '#dcdcdc',
    purple: 'purple',
    purpleLight: '#dcdcdc',
    blueDark: '#dcdcdc',
    blueMid: '#dcdcdc',
    blue: 'blue',
    blueLight: '#dcdcdc',
    tealDark: '#dcdcdc',
    teal: 'teal',
    tealLight: '#dcdcdc',
    greenDark: '#dcdcdc',
    green: 'green',
    greenLight: '#dcdcdc'
  },
  fonts
} as PartialTheme
