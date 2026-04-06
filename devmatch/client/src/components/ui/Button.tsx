'use client'

import { ButtonHTMLAttributes } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
}

// Use a plain function component — avoids forwardRef + motion type conflicts
export function Button({
  className,
  variant = 'primary',
  size = 'md',
  isLoading,
  children,
  disabled,
  type = 'button',
  onClick,
  ...rest
}: ButtonProps) {
  return (
    <motion.button
      type={type}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.97 }}
      whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
        {
          'bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-500/25':
            variant === 'primary',
          'bg-slate-800 text-slate-100 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600':
            variant === 'secondary',
          'border-2 border-slate-300 dark:border-slate-700 bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100':
            variant === 'outline',
          'bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100':
            variant === 'ghost',
          'h-9 px-4 text-xs': size === 'sm',
          'h-11 px-6': size === 'md',
          'h-14 px-8 text-base': size === 'lg',
        },
        className
      )}
      disabled={disabled || isLoading}
      onClick={onClick}
      // spread the remaining safe HTML attrs (aria, data, name, form, value etc.)
      {...(rest as any)}
    >
      {isLoading && <Loader2 className="h-4 w-4 animate-spin shrink-0" />}
      {children}
    </motion.button>
  )
}
