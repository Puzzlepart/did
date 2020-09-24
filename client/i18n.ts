import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import resources from '../resources'

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: 'nb',
  debug: process.env.NODE_ENV === 'development',
  interpolation: {
    escapeValue: false,
  },
  defaultNS: 'common',
  ns: [
    'timesheet',
    'projects',
    'customers',
    'admin',
    'reports',
    'common',
    'navigation',
    'permissions',
    'notifications'
  ],
  nsSeparator: '.',
  keySeparator: ':',
})

export default i18n
