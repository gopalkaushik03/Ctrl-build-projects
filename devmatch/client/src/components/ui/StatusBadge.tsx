'use client'

import { memo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

// ─── Types ────────────────────────────────────────────────────────────────────

interface StatusBadgeProps {
  text: string
  className?: string
}

// ─── Constants (defined outside component to avoid recreation) ────────────────

const SPRING = { type: 'spring' as const, stiffness: 300, damping: 24 }
const INSTANT = { duration: 0 }

// ─── Component ────────────────────────────────────────────────────────────────

export const StatusBadge = memo(function StatusBadge({ text, className }: StatusBadgeProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      role="status"
      aria-label={text}
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={shouldReduceMotion ? INSTANT : SPRING}
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-sm font-medium backdrop-blur-xl',
        className,
      )}
    >
      {/* Pulse indicator */}
      <span aria-hidden="true" className="relative flex h-2 w-2 shrink-0 items-center justify-center">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-500" />
      </span>

      <span className="text-zinc-300">{text}</span>
    </motion.div>
  )
})