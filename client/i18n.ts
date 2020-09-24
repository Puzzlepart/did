import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n
  .use(initReactI18next)
  .init({
    resources: require('../resources').default,
    fallbackLng: 'nb',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
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
    keySeparator: ':'
  })

export default i18n
