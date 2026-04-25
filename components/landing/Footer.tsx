"use client"

import { useLang } from "@/components/LanguageProvider"

export function Footer() {
  const { t } = useLang()

  return (
    <footer className="bg-stone-950 border-t border-stone-800 py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-500 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-amber-500 rounded flex items-center justify-center">
            <span className="text-white font-black text-xs">V</span>
          </div>
          <span className="text-stone-400 font-medium">Ventura Construcciones</span>
          <span>·</span>
          <span>{t.footer.location}</span>
        </div>
        <span>© {new Date().getFullYear()} Ventura Construcciones. {t.footer.rights}</span>
      </div>
    </footer>
  )
}
