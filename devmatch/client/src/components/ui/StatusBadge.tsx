'use client'

import { memo } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface StatusBadgeProps {
  text: string
  className?: string
}

export const StatusBadge = memo(function StatusBadge({ text, className }: StatusBadgeProps) {
  return (
    <motion.div
      role="status"
      aria-label={text}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-slate-200/50 dark:border-white/10 bg-white/80 dark:bg-white/5 px-4 py-1.5 text-sm font-medium shadow-sm backdrop-blur-xl',
        className
      )}
    >
      <span aria-hidden="true" className="relative flex h-2 w-2 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>
      <span className="text-slate-600 dark:text-slate-300">{text}</span>
    </motion.div>
  )
})