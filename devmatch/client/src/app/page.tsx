'use client'

import { useState } from 'react'
import { UserProfile } from '@/types'
import { CreateProfileForm } from '@/features/auth/components/CreateProfileForm'
import { MatchDashboard } from '@/features/matching/components/MatchDashboard'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/FadeIn'

export default function Home() {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const handleProfileSuccess = (newProfile: UserProfile) => {
    setProfile(newProfile);
  };

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center p-6 relative">
      <div className="noise-bg" />
      
      {/* Background gradients for SaaS feel */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-600/20 blur-[120px] pointer-events-none" />

      <StaggerContainer className="z-10 w-full max-w-md">
        <StaggerItem className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-2 bg-white/5 rounded-2xl border border-white/10 mb-4 backdrop-blur-sm">
            <span className="text-2xl ml-1 mr-2">🚀</span>
            <span className="font-mono text-sm tracking-widest text-zinc-300 font-medium px-2 uppercase">Hackathon Ready</span>
          </div>
          <h1 className="text-6xl font-extrabold tracking-tighter sm:text-7xl mb-4 bg-clip-text text-transparent bg-gradient-to-br from-white to-zinc-500">
            DevMatch <span className="text-blue-500">AI</span>
          </h1>
          <p className="text-lg text-zinc-400 font-medium">
            Find your perfect hackathon teammate.
          </p>
        </StaggerItem>

        <StaggerItem>
          {!profile ? (
            <CreateProfileForm onSuccess={handleProfileSuccess} />
          ) : (
            <MatchDashboard userProfile={profile} />
          )}
        </StaggerItem>
      </StaggerContainer>
    </main>
  )
}