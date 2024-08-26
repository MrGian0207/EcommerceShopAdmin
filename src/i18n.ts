import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import enJSON from './locale/en.json'
import viJSON from './locale/vi.json'

i18n.use(initReactI18next).init({
  resources: {
    en: { ...enJSON },
    vi: { ...viJSON },
  }, // Where we're gonna put translations' files
  lng: 'en', // Set the initial language of the App
  debug: true,
  fallbackLng: 'en',
  ns: [],
  defaultNS: 'common',
  interpolation: {
    escapeValue: false,
  },
})
