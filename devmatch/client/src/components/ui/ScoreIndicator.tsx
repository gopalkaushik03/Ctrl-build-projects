'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ScoreIndicatorProps {
  score: number // 0–100
  className?: string
}

export function ScoreIndicator({ score, className }: ScoreIndicatorProps) {
  const size = 96
  const strokeWidth = 8
  const radius = (size - strokeWidth) / 2  // 40
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (Math.min(Math.max(score, 0), 100) / 100) * circumference

  const color =
    score >= 80 ? '#10b981' // emerald-500
    : score >= 50 ? '#f59e0b' // amber-500
    : '#ef4444' // red-500

  return (
    <div className={cn('relative flex items-center justify-center', className)} style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="absolute inset-0 -rotate-90"
        aria-hidden="true"
      >
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-slate-200 dark:text-slate-700"
        />
        {/* Progress */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
        />
      </svg>

      {/* Score label */}
      <motion.div
        className="absolute flex flex-col items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.4 }}
      >
        <span className="text-xl font-bold leading-none" style={{ color }}>
          {score}
        </span>
        <span className="text-[10px] text-slate-400 font-medium mt-0.5">/ 100</span>
      </motion.div>
    </div>
  )
}
