import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Navbar } from '@/components/ui/Navbar'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'DevMatch AI — Find Your Perfect Hackathon Team',
  description:
    'AI-powered developer matching platform. Built for hackathons. Powered by Google Gemini.',
  keywords: ['hackathon', 'developer matching', 'AI', 'team building', 'Gemini'],
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
        <Navbar />
        <main className="flex-1 pt-20 pb-16">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-200/50 dark:border-slate-800/50 py-6 text-center text-xs text-slate-400">
          Built with ❤️ for hackathons · DevMatch AI © 2025
        </footer>
      </body>
    </html>
  )
}
