"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { translations, type Lang, type Translations } from "@/lib/i18n"

interface LangContextValue {
  lang: Lang
  t: Translations
  toggle: () => void
}

const LangContext = createContext<LangContextValue | null>(null)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("es")

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang | null
    if (saved === "en" || saved === "es") setLang(saved)
  }, [])

  const toggle = () => setLang(l => {
    const next = l === "es" ? "en" : "es"
    localStorage.setItem("lang", next)
    return next
  })

  return (
    <LangContext.Provider value={{ lang, t: translations[lang], toggle }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error("useLang must be used inside LanguageProvider")
  return ctx
}
