'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Moon, Sun, Code2, Menu, X } from 'lucide-react'

export function Navbar() {
  const [mounted,  setMounted]  = useState(false)
  const [isDark,   setIsDark]   = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)

  // Initialise from localStorage on mount
  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem('devmatch-theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const dark = stored ? stored === 'dark' : prefersDark
    setIsDark(dark)
    document.documentElement.classList.toggle('dark', dark)
  }, [])

  const toggleTheme = () => {
    const next = !isDark
    setIsDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('devmatch-theme', next ? 'dark' : 'light')
  }

  // Avoid hydration mismatch
  if (!mounted) return null

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 26 }}
      className="fixed top-0 inset-x-0 z-50 border-b border-slate-200/50 dark:border-slate-800/50 bg-white/60 dark:bg-slate-950/70 backdrop-blur-xl"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between h-16 px-4 sm:px-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-emerald-500/10 rounded-lg">
            <Code2 className="h-5 w-5 text-emerald-500" />
          </div>
          <span className="text-lg font-bold tracking-tight">
            DevMatch{' '}
            <span className="text-emerald-500">AI</span>
          </span>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-150"
          >
            <AnimatePresence mode="wait">
              {isDark ? (
                <motion.span
                  key="sun"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Sun className="h-4 w-4" />
                </motion.span>
              ) : (
                <motion.span
                  key="moon"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Moon className="h-4 w-4" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          {/* Mobile menu toggle (stub) */}
          <button
            onClick={() => setMenuOpen(v => !v)}
            className="sm:hidden p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400"
            aria-label="Menu"
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </motion.nav>
  )
}
