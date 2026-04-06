import { useState } from 'react';
import { MatchResult } from '@/types';
import { matchApi } from '../services/matchApi';

export function useMatch() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [matchResult, setMatchResult] = useState<MatchResult | null>(null);

  const findMatch = async (name: string) => {
    setIsLoading(true);
    setError(null);
    setMatchResult(null);
    
    try {
      const data = await matchApi.findMatch(name);
      setMatchResult(data);
      return data;
    } catch (err: any) {
      setError(err.message || 'Error occurred while looking for a match');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const resetMatch = () => {
    setMatchResult(null);
    setError(null);
  };

  return {
    findMatch,
    resetMatch,
    matchResult,
    isLoading,
    error
  };
}
