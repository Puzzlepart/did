import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n.use(initReactI18next).init({
  resources: {
    'en-GB': require('../resources/en-GB.json'),
    nb: require('../resources/nb.json'),
  },
  fallbackLng: 'nb',
  debug: false,
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
