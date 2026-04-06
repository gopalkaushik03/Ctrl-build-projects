import { useState } from 'react';
import { UserProfile } from '@/types';
import { authApi } from '../services/authApi';

export function useCreateProfile() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const createProfile = async (profile: UserProfile) => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);
    
    try {
      await authApi.createProfile(profile);
      setIsSuccess(true);
      return true;
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createProfile,
    isLoading,
    error,
    isSuccess
  };
}
