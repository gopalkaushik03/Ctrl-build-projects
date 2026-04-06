import { UserProfile } from '@/types';

export const authApi = {
  createProfile: async (profile: UserProfile): Promise<void> => {
    // In a real app we'd target an actual API endpoint.
    // The previous frontend was hitting `/user`.
    const res = await fetch('/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile)
    });
    
    if (!res.ok) {
      throw new Error('Failed to create profile');
    }
  }
};
