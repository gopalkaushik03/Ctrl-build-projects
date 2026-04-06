'use client'

import { useState } from 'react'

export default function Home() {
  const [name, setName] = useState('')
  const [skills, setSkills] = useState('')
  const [experience, setExperience] = useState('Beginner')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [profileCreated, setProfileCreated] = useState(false)

  const [matchResult, setMatchResult] = useState<{
    name: string;
    skills: string;
    score: number;
  } | null>(null)

  const handleCreateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, skills, experience })
      })
      if (!res.ok) throw new Error('Failed to create profile')
      setProfileCreated(true)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleFindMatch = async () => {
    setLoading(true)
    setError('')
    setMatchResult(null)
    try {
      const res = await fetch(`/match?name=${encodeURIComponent(name)}`)
      if (!res.ok) throw new Error('No match found')
      const data = await res.json()
      setMatchResult(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '80px 20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '3rem', margin: '0 0 10px 0', letterSpacing: '-0.02em' }}>DevMatch AI</h1>
        <p style={{ fontSize: '1.25rem', color: '#888', margin: 0 }}>Find your perfect hackathon teammate</p>
      </div>

      <div style={{ border: '1px solid #333', borderRadius: '12px', padding: '32px', backgroundColor: '#111', color: '#fff', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <form onSubmit={handleCreateProfile} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#aaa' }}>Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #333', backgroundColor: '#000', color: '#fff', fontSize: '1rem', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#aaa' }}>Skills (comma separated)</label>
            <input 
              type="text" 
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              required
              style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #333', backgroundColor: '#000', color: '#fff', fontSize: '1rem', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#aaa' }}>Experience Level</label>
            <select
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #333', backgroundColor: '#000', color: '#fff', fontSize: '1rem', boxSizing: 'border-box' }}
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{ marginTop: '10px', padding: '14px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '1rem', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer' }}
          >
            {loading && !profileCreated && !matchResult ? 'Processing...' : 'Create Profile'}
          </button>
        </form>

        {profileCreated && (
          <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #333' }}>
            <button 
              onClick={handleFindMatch}
              disabled={loading}
              style={{ width: '100%', padding: '14px', backgroundColor: '#059669', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '1rem', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer' }}
            >
              {loading && profileCreated && !matchResult ? 'Searching...' : 'Find Match'}
            </button>
          </div>
        )}

        {error && <div style={{ marginTop: '20px', padding: '16px', backgroundColor: 'rgba(220, 38, 38, 0.1)', color: '#ef4444', borderRadius: '6px', border: '1px solid #7f1d1d' }}>{error}</div>}

        {matchResult && (
          <div style={{ marginTop: '24px', padding: '20px', backgroundColor: 'rgba(5, 150, 105, 0.1)', border: '1px solid #065f46', borderRadius: '6px' }}>
            <h3 style={{ margin: '0 0 16px 0', color: '#10b981', fontSize: '1.2rem' }}>Match Found!</h3>
            <p style={{ margin: '8px 0', color: '#ccc' }}><strong style={{ color: '#fff' }}>Name:</strong> {matchResult.name}</p>
            <p style={{ margin: '8px 0', color: '#ccc' }}><strong style={{ color: '#fff' }}>Skills:</strong> {matchResult.skills}</p>
            <p style={{ margin: '8px 0', color: '#ccc' }}><strong style={{ color: '#fff' }}>Match Score:</strong> {matchResult.score}%</p>
          </div>
        )}
      </div>
    </div>
  )
}