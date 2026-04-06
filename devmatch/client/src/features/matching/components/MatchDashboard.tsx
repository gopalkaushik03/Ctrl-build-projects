import { useMatch } from '../hooks/useMatch';
import { UserProfile } from '@/types';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/FadeIn';

interface MatchDashboardProps {
  userProfile: UserProfile;
}

export function MatchDashboard({ userProfile }: MatchDashboardProps) {
  const { findMatch, resetMatch, matchResult, isLoading, error } = useMatch();

  return (
    <FadeIn duration={0.6}>
      <Card className="flex flex-col items-center">
        <div className="mb-8 text-center space-y-2">
          <div className="w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">👋</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Active Profile</h2>
          <p className="text-zinc-400">Welcome, <span className="font-medium text-zinc-300">{userProfile.name}</span></p>
        </div>

        {!matchResult && !isLoading && (
          <FadeIn direction="up" delay={0.2} className="w-full">
            <Button 
              onClick={() => findMatch(userProfile.name)}
              className="w-full"
              size="lg"
              variant="secondary"
            >
              Find My Teammate
            </Button>
          </FadeIn>
        )}

        {isLoading && (
          <FadeIn className="py-8 text-center text-emerald-400">
            <div className="flex flex-col items-center gap-4">
              <svg className="animate-spin h-8 w-8 text-emerald-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="animate-pulse font-medium">Scanning dev network...</p>
            </div>
          </FadeIn>
        )}

        {error && (
          <FadeIn className="w-full mt-4">
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-center text-red-500 font-medium">
              {error}
            </div>
            <Button 
              variant="outline" 
              className="w-full mt-4" 
              onClick={() => resetMatch()}
            >
              Try Again
            </Button>
          </FadeIn>
        )}

        {matchResult && !isLoading && (
          <FadeIn className="w-full mt-2">
            <div className="p-6 bg-gradient-to-br from-emerald-500/[0.08] to-teal-500/[0.03] border border-emerald-500/20 rounded-2xl space-y-4">
              <div className="flex items-center justify-between mb-2 pb-2 border-b border-emerald-500/10">
                <h3 className="text-xl font-bold text-emerald-400 tracking-tight">Match Found! 🎉</h3>
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 font-bold rounded-full text-xs uppercase tracking-wider shadow-sm">
                  {matchResult.score}% fit
                </span>
              </div>
              
              <StaggerContainer className="space-y-4">
                <StaggerItem>
                  <p className="text-[10px] uppercase font-bold text-emerald-500/50 tracking-widest mb-1">Teammate Information</p>
                  <p className="text-lg font-semibold text-white">{matchResult.name}</p>
                </StaggerItem>
                <StaggerItem>
                  <p className="text-[10px] uppercase font-bold text-emerald-500/50 tracking-widest mb-1.5">Expertise</p>
                  <div className="flex flex-wrap gap-1.5">
                    {matchResult.skills.split(',').map((skill, i) => (
                      <span key={i} className="px-2.5 py-1 bg-zinc-900/80 border border-zinc-800 rounded-lg text-xs font-medium text-emerald-100">
                        {skill.trim()}
                      </span>
                    ))}
                  </div>
                </StaggerItem>
              </StaggerContainer>
            </div>

            <Button 
               variant="outline" 
               className="w-full mt-6" 
               onClick={() => findMatch(userProfile.name)}
            >
              Search Again
            </Button>
          </FadeIn>
        )}
      </Card>
    </FadeIn>
  );
}
