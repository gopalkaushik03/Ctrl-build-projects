import { MatchResult } from '@/types';

export const matchApi = {
  findMatch: async (name: string): Promise<MatchResult> => {
    // Calling the API endpoint with the name. In actual scenario we'd use ID from auth context.
    const res = await fetch(`/match?name=${encodeURIComponent(name)}`);
    
    if (!res.ok) {
      throw new Error('No match found or server error');
    }
    
    const data = await res.json();
    return data;
  }
};
