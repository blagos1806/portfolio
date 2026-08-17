import { createContext, useContext, useState, type ReactNode } from 'react'
import i18n from '../i18n'

export type Language = 'en' | 'pt'

interface LanguageContextValue {
  language: Language
  setLanguage: (lang: Language) => void
  supportedLanguages: Language[]
}

const SUPPORTED: Language[] = ['en', 'pt']

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLang] = useState<Language>(() => {
    const stored = localStorage.getItem('i18nextLng')
    return SUPPORTED.includes(stored as Language) ? (stored as Language) : 'en'
  })

  const setLanguage = (lang: Language) => {
    i18n.changeLanguage(lang)
    setLang(lang)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, supportedLanguages: SUPPORTED }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguageContext() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguageContext must be used inside LanguageProvider')
  return ctx
}