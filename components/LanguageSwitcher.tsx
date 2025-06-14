"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/LanguageContext"
import { Languages } from "lucide-react"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center gap-1 sm:gap-2 bg-zinc-800/50 backdrop-blur-sm rounded-lg p-1.5 sm:p-2 border border-zinc-700"
      >
        <Languages className="w-3 h-3 sm:w-4 sm:h-4 text-zinc-400" />
        <button
          onClick={() => setLanguage("en")}
          className={`px-1.5 sm:px-2 py-1 rounded text-xs sm:text-sm transition-all duration-300 ${language === "en" ? "bg-zinc-700 text-zinc-100" : "text-zinc-400 hover:text-zinc-200"
            }`}
        >
          EN
        </button>
        <button
          onClick={() => setLanguage("vi")}
          className={`px-1.5 sm:px-2 py-1 rounded text-xs sm:text-sm transition-all duration-300 ${language === "vi" ? "bg-zinc-700 text-zinc-100" : "text-zinc-400 hover:text-zinc-200"
            }`}
        >
          VI
        </button>
      </motion.div>
    </div>
  )
}
