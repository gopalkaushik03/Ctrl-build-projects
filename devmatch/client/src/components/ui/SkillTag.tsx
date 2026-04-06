'use client'

import { HTMLAttributes } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

// Plain function — no forwardRef needed, avoids motion type conflicts
export function SkillTag({ className, children, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'inline-flex items-center rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 whitespace-nowrap',
        className
      )}
      {...(props as any)}
    >
      {children}
    </motion.span>
  )
}
