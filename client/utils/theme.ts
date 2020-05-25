import { loadTheme } from 'office-ui-fabric-react/lib/Styling'

const themes = {
    dark: {
        themePrimary: '#78bcf0',
        themeLighterAlt: '#05080a',
        themeLighter: '#131e26',
        themeLight: '#243848',
        themeTertiary: '#487190',
        themeSecondary: '#69a5d3',
        themeDarkAlt: '#85c2f1',
        themeDark: '#97cbf3',
        themeDarker: '#b1d9f6',
        neutralLighterAlt: '#202528',
        neutralLighter: '#282d31',
        neutralLight: '#343b3f',
        neutralQuaternaryAlt: '#3c4348',
        neutralQuaternary: '#424a4f',
        neutralTertiaryAlt: '#5e676d',
        neutralTertiary: '#f5f4ee',
        neutralSecondary: '#f6f6f1',
        neutralPrimaryAlt: '#f8f8f4',
        neutralPrimary: '#f0efe6',
        neutralDark: '#fbfbf9',
        black: '#fdfdfc',
        white: '#181c1f',
    },
    light: {
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
        white: '#ffffff'
    }
}

export const LoadTheme = (themeName) => {
    if (themes[themeName])
        loadTheme({ palette: themes[themeName]
        })
}