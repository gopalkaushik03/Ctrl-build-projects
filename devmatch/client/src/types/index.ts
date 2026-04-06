export interface UserProfile {
  name: string;
  skills: string;
  experience: 'Beginner' | 'Intermediate' | 'Advanced' | string;
}

export interface MatchResult {
  name: string;
  skills: string;
  score: number;
}
