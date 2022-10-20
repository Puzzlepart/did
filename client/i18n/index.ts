/* eslint-disable unicorn/prevent-abbreviations */
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'

export const DEFAULT_LANGUAGE = 'en-GB'
const __RESOURCES = {
  'en-GB': require('./en-GB.json'),
  nb: require('./nb.json'),
  nn: require('./nn.json')
}
export const SUPPORTED_LANGUAGES = Object.keys(__RESOURCES)

i18next.use(initReactI18next).init({
  resources: __RESOURCES,
  fallbackLng: DEFAULT_LANGUAGE,
  debug: false,
  interpolation: {
    escapeValue: false
  },
  ns: Object.keys(__RESOURCES[DEFAULT_LANGUAGE]),
  nsSeparator: '.',
  keySeparator: ':'
})

export default i18next
