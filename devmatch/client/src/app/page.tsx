'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles, Code2, Rocket, BrainCircuit, User,
  Users, Trophy, ArrowRight, CheckCircle2, Wifi, WifiOff
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { SkillTag } from '@/components/ui/SkillTag'
import { ScoreIndicator } from '@/components/ui/ScoreIndicator'
import { StatusBadge } from '@/components/ui/StatusBadge'

// ─── Types ────────────────────────────────────────────────────────────────────
type AppState = 'landing' | 'profile' | 'dashboard' | 'match_result'

interface MatchResult {
  name: string
  skills: string
  experience?: string
  score: number
  explanation?: string
}

// ─── Animation Variants ───────────────────────────────────────────────────────
const pageVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut', staggerChildren: 0.08 } },
  exit:    { opacity: 0, y: -16, transition: { duration: 0.25, ease: 'easeIn' } },
}

const itemVariants = {
  hidden:  { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function Home() {
  const [appState, setAppState]       = useState<AppState>('landing')
  const [name, setName]               = useState('')
  const [skills, setSkills]           = useState('')
  const [experience, setExperience]   = useState('Beginner')
  const [loading, setLoading]         = useState(false)
  const [error, setError]             = useState('')
  const [matchResult, setMatchResult] = useState<MatchResult | null>(null)

  // ── Handlers ────────────────────────────────────────────────────────────────
  const handleCreateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), skills: skills.trim(), experience }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to create profile')
      setAppState('dashboard')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleFindMatch = async () => {
    setLoading(true)
    setError('')
    setMatchResult(null)
    try {
      // Brief suspense delay for UX
      await new Promise(r => setTimeout(r, 900))
      const res = await fetch(`/api/match?name=${encodeURIComponent(name.trim())}`)
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'No match found')
      setMatchResult(data)
      setAppState('match_result')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const resetToLanding = () => {
    setAppState('landing')
    setName('')
    setSkills('')
    setExperience('Beginner')
    setError('')
    setMatchResult(null)
  }

  // ── Parsed skills ────────────────────────────────────────────────────────────
  const userSkills   = skills.split(',').map(s => s.trim()).filter(Boolean)
  const matchSkills  = matchResult?.skills.split(',').map(s => s.trim()).filter(Boolean) ?? []

  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <AnimatePresence mode="wait">

        {/* ════════════════ LANDING ════════════════ */}
        {appState === 'landing' && (
          <motion.section
            key="landing"
            variants={pageVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col items-center justify-center min-h-[80vh] text-center"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="mb-8">
              <StatusBadge text="AI-Powered Team Matching · v1.0" />
            </motion.div>

            {/* Hero headline */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight"
            >
              Find Your Perfect
              <br />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-500 bg-clip-text text-transparent">
                Hackathon Team
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mb-10 leading-relaxed"
            >
              Stop teaming up randomly. DevMatch AI analyzes your skills, experience level,
              and goals to pair you with developers who perfectly complement your strengths.
            </motion.p>

            {/* CTA */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 mb-20">
              <Button size="lg" onClick={() => setAppState('profile')} className="px-10">
                <Rocket className="h-5 w-5" />
                Get Started — It&apos;s Free
                <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>

            {/* Feature cards */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full"
            >
              {[
                {
                  icon: BrainCircuit,
                  color: 'text-purple-500',
                  bg: 'bg-purple-500/10',
                  title: 'AI-Powered Matching',
                  desc: 'Google Gemini evaluates skill synergy and tech-stack compatibility across all active developers.',
                },
                {
                  icon: Users,
                  color: 'text-emerald-500',
                  bg: 'bg-emerald-500/10',
                  title: 'Skill Synergy',
                  desc: 'Frontend + Backend, ML + DevOps — we build balanced, multi-discipline teams built to win.',
                },
                {
                  icon: Trophy,
                  color: 'text-amber-500',
                  bg: 'bg-amber-500/10',
                  title: 'Win Hackathons',
                  desc: 'Teams matched through DevMatch have a significantly higher chance of placing in the top 3.',
                },
              ].map((f, i) => (
                <Card key={i} hoverable className="text-left p-6 border-slate-200/60 dark:border-slate-800/60">
                  <div className={`inline-flex p-3 rounded-xl ${f.bg} mb-4`}>
                    <f.icon className={`h-6 w-6 ${f.color}`} />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{f.desc}</p>
                </Card>
              ))}
            </motion.div>
          </motion.section>
        )}

        {/* ════════════════ PROFILE ════════════════ */}
        {appState === 'profile' && (
          <motion.section
            key="profile"
            variants={pageVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex items-center justify-center min-h-[80vh]"
          >
            <Card className="w-full max-w-md shadow-2xl shadow-emerald-500/5">
              <CardHeader className="pb-6">
                <motion.div
                  variants={itemVariants}
                  className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 mb-4"
                >
                  <User className="h-7 w-7" />
                </motion.div>
                <CardTitle className="text-2xl">Create your profile</CardTitle>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Tell us about yourself so our AI can find your ideal teammate.
                </p>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleCreateProfile} className="space-y-5">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Full Name
                    </label>
                    <Input
                      id="name"
                      placeholder="e.g. Alex Jensen"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      required
                      autoComplete="off"
                    />
                  </div>

                  {/* Skills */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Tech Stack
                      <span className="ml-1 text-xs font-normal text-slate-400">(comma-separated)</span>
                    </label>
                    <Input
                      id="skills"
                      placeholder="e.g. React, Node.js, Python, AWS"
                      value={skills}
                      onChange={e => setSkills(e.target.value)}
                      required
                    />
                    {/* Preview tags */}
                    {userSkills.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {userSkills.map((s, i) => <SkillTag key={i}>{s}</SkillTag>)}
                      </div>
                    )}
                  </div>

                  {/* Experience */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Experience Level
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Beginner', 'Intermediate', 'Advanced'].map(level => (
                        <button
                          key={level}
                          type="button"
                          onClick={() => setExperience(level)}
                          className={`py-2.5 px-3 rounded-xl text-sm font-medium border-2 transition-all duration-150 ${
                            experience === level
                              ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                              : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600'
                          }`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Error */}
                  {error && (
                    <div className="flex items-start gap-2 p-3 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm rounded-xl">
                      <WifiOff className="h-4 w-4 mt-0.5 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="flex gap-3 pt-2">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setAppState('landing')}
                      className="flex-none"
                    >
                      Back
                    </Button>
                    <Button type="submit" isLoading={loading} className="flex-1">
                      {loading ? 'Saving...' : 'Save Profile'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.section>
        )}

        {/* ════════════════ DASHBOARD ════════════════ */}
        {appState === 'dashboard' && (
          <motion.section
            key="dashboard"
            variants={pageVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="py-10"
          >
            {/* Header */}
            <motion.div variants={itemVariants} className="mb-8">
              <h2 className="text-3xl font-bold mb-1">Welcome back, {name.split(' ')[0]} 👋</h2>
              <p className="text-slate-500 dark:text-slate-400">Ready to find your perfect hackathon teammate?</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Profile card */}
              <motion.div variants={itemVariants}>
                <Card className="overflow-hidden h-full">
                  {/* Gradient header */}
                  <div className="h-20 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-80" />
                  <CardContent className="relative -mt-10 pb-6">
                    <div className="w-20 h-20 bg-gradient-to-tr from-emerald-400 to-cyan-500 rounded-2xl border-4 border-white dark:border-slate-900 flex items-center justify-center text-white text-3xl font-bold shadow-lg mb-4">
                      {name.charAt(0).toUpperCase()}
                    </div>
                    <h3 className="text-xl font-bold mb-0.5">{name}</h3>
                    <p className="text-emerald-500 text-sm font-semibold mb-4">{experience} Developer</p>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Skills</p>
                      <div className="flex flex-wrap gap-1.5">
                        {userSkills.map((s, i) => <SkillTag key={i}>{s}</SkillTag>)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Stats / Match CTA */}
              <motion.div variants={itemVariants} className="md:col-span-2 space-y-4">
                {/* Match CTA card */}
                <Card className="border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5">
                  <CardContent className="p-8 flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 mb-5">
                      <Sparkles className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Find My Teammate</h3>
                    <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-sm text-sm leading-relaxed">
                      Our AI analyzes 7+ active developer profiles and selects the one with the highest
                      skill synergy with yours.
                    </p>

                    {error && (
                      <div className="mb-4 flex items-start gap-2 p-3 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm rounded-xl w-full max-w-sm">
                        <WifiOff className="h-4 w-4 mt-0.5 shrink-0" />
                        <span>{error}</span>
                      </div>
                    )}

                    <Button
                      size="lg"
                      onClick={handleFindMatch}
                      isLoading={loading}
                      className="w-full max-w-xs"
                    >
                      {loading ? 'Analyzing with AI...' : <><BrainCircuit className="h-5 w-5" /> Run AI Matching</>}
                    </Button>
                  </CardContent>
                </Card>

                {/* Quick stats row */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: 'Developers', value: '7+', icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
                    { label: 'Skill Factors', value: '12', icon: Code2, color: 'text-purple-500', bg: 'bg-purple-500/10' },
                    { label: 'Hackathons Won', value: '40%↑', icon: Trophy, color: 'text-amber-500', bg: 'bg-amber-500/10' },
                  ].map((stat, i) => (
                    <Card key={i} className="p-4 text-center">
                      <div className={`inline-flex p-2 rounded-lg ${stat.bg} mb-2`}>
                        <stat.icon className={`h-4 w-4 ${stat.color}`} />
                      </div>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{stat.label}</p>
                    </Card>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.section>
        )}

        {/* ════════════════ MATCH RESULT ════════════════ */}
        {appState === 'match_result' && matchResult && (
          <motion.section
            key="result"
            variants={pageVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="py-10"
          >
            {/* Header */}
            <motion.div variants={itemVariants} className="text-center mb-10">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 rounded-full px-4 py-1.5 text-sm font-semibold mb-4"
              >
                <CheckCircle2 className="h-4 w-4" />
                Perfect Match Found!
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-bold mb-3">Meet your teammate.</h2>
              <p className="text-slate-500 dark:text-slate-400">
                Gemini AI selected the best developer profile for <strong>{name}</strong>.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* Matched Developer Card */}
              <motion.div variants={itemVariants}>
                <Card className="overflow-hidden h-full" hoverable>
                  <div className="h-24 bg-gradient-to-r from-purple-500 to-indigo-600 opacity-80" />
                  <CardContent className="relative -mt-12 pb-6">
                    <div className="w-20 h-20 bg-white dark:bg-slate-800 border-4 border-white dark:border-slate-900 rounded-2xl flex items-center justify-center text-4xl shadow-xl mb-4">
                      🧑‍💻
                    </div>
                    <h3 className="text-2xl font-bold mb-1">{matchResult.name}</h3>
                    {matchResult.experience && (
                      <p className="text-purple-500 font-semibold text-sm mb-4">{matchResult.experience} Developer</p>
                    )}
                    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4">
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Skills</p>
                      <div className="flex flex-wrap gap-1.5">
                        {matchSkills.map((s, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center rounded-lg border border-purple-500/20 bg-purple-500/10 px-2.5 py-0.5 text-xs font-semibold text-purple-600 dark:text-purple-400"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Score + AI Explanation */}
              <motion.div variants={itemVariants} className="flex flex-col gap-4">
                {/* Score card */}
                <Card className="border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-transparent">
                  <CardContent className="pt-6 flex items-center gap-6">
                    <ScoreIndicator score={matchResult.score} className="shrink-0" />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-emerald-500 mb-1">
                        Compatibility Score
                      </p>
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                        Based on complementary skills and balancing experience levels.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* AI explanation */}
                {matchResult.explanation && (
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-2">
                        <div className="p-1.5 bg-purple-500/10 rounded-lg">
                          <BrainCircuit className="h-4 w-4 text-purple-500" />
                        </div>
                        Gemini AI Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600 dark:text-slate-300 text-sm leading-7">
                        {matchResult.explanation}
                      </p>
                    </CardContent>
                  </Card>
                )}

                {/* Actions */}
                <div className="flex gap-3">
                  <Button
                    className="flex-1"
                    onClick={() => {
                      alert(`🎉 Connection request sent to ${matchResult.name}! They'll receive your profile shortly.`)
                    }}
                  >
                    <Wifi className="h-4 w-4" />
                    Connect
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setError('')
                      setMatchResult(null)
                      setAppState('dashboard')
                    }}
                  >
                    Find Another
                  </Button>
                </div>

                <button
                  onClick={resetToLanding}
                  className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors text-center py-1"
                >
                  ← Start over
                </button>
              </motion.div>
            </div>
          </motion.section>
        )}

      </AnimatePresence>
    </div>
  )
}