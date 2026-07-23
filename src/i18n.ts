import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import en from './locales/en/translation.json'
import pt from './locales/pt/translation.json'

i18n
  .use(LanguageDetector)       // deteta idioma do browser automaticamente
  .use(initReactI18next)       // integra com React
  .init({
    resources: {
      en: { translation: en },
      pt: { translation: pt },
    },
    fallbackLng: 'en',         // se o idioma detetado não tiver tradução, usa inglês
    lng: 'en',                 // idioma padrão (inglês, para vagas internacionais)
    interpolation: {
      escapeValue: false,      // React já faz escape por defeito (segurança XSS)
    },
    detection: {
      order: ['localStorage', 'navigator'],  // persiste escolha do utilizador
      caches: ['localStorage'],
    },
  })

export default i18n