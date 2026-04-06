import { useState } from 'react';
import { useCreateProfile } from '../hooks/useCreateProfile';
import { UserProfile } from '@/types';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/FadeIn';

interface CreateProfileFormProps {
  onSuccess: (profile: UserProfile) => void;
}

export function CreateProfileForm({ onSuccess }: CreateProfileFormProps) {
  const { createProfile, isLoading, error } = useCreateProfile();
  
  const [formData, setFormData] = useState<UserProfile>({
    name: '',
    skills: '',
    experience: 'Beginner'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await createProfile(formData);
    if (success) {
      onSuccess(formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <FadeIn duration={0.6}>
      <Card>
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-white mb-2">Create Your Profile</h2>
          <p className="text-sm text-zinc-400">Tell us about your skills to find the perfect team</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <StaggerContainer className="flex flex-col gap-5">
            <StaggerItem>
              <Input
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Jane Doe"
                required
              />
            </StaggerItem>

            <StaggerItem>
              <Input
                label="Skills (comma separated)"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="e.g. React, Node.js, Python"
                required
              />
            </StaggerItem>

            <StaggerItem>
              <div className="w-full flex flex-col gap-2">
                <label className="text-sm font-medium text-zinc-400">Experience Level</label>
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="flex h-12 w-full rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-2 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all duration-200 cursor-pointer appearance-none"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </StaggerItem>

            {error && (
              <StaggerItem>
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-500 font-medium">
                  {error}
                </div>
              </StaggerItem>
            )}

            <StaggerItem>
              <Button 
                type="submit" 
                className="w-full mt-4" 
                size="lg"
                isLoading={isLoading}
              >
                Create Profile to Continue
              </Button>
            </StaggerItem>
          </StaggerContainer>
        </form>
      </Card>
    </FadeIn>
  );
}
