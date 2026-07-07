import { createContext, useContext, useEffect, useState } from 'react'
import { translations } from './translations'


function detectLang() {
  try {
    const saved = localStorage.getItem('lang')
    if (saved === 'it' || saved === 'en') return saved
  } catch {
    // localStorage unavailable (private mode etc.) — fall through to detection
  }
  const candidates = navigator.languages?.length ? navigator.languages : [navigator.language]
  return candidates.some((l) => l && l.toLowerCase().startsWith('it')) ? 'it' : 'en'
}

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(detectLang)

  // Keep the document itself in sync: <html lang>, <title>, meta description.
  useEffect(() => {
    const t = translations[lang]
    document.documentElement.lang = lang
    document.title = t.meta.title
    const desc = document.querySelector('meta[name="description"]')
    if (desc) desc.setAttribute('content', t.meta.description)
    try {
      localStorage.setItem('lang', lang)
    } catch {
      
    }
  }, [lang])

  const toggle = () => setLang((l) => (l === 'en' ? 'it' : 'en'))

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used inside <LanguageProvider>')
  return ctx
}

// Helper for bilingual data fields, e.g. { en: '...', it: '...' }.
// Plain strings pass through untouched, so old-format data still works.
export function pick(field, lang) {
  if (field && typeof field === 'object') return field[lang] ?? field.en
  return field
}
