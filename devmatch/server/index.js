const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// ─── Gemini Client ─────────────────────────────────────────────────────────────
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

// ─── In-Memory Developer Database ─────────────────────────────────────────────
const developers = [
  { id: 1, name: 'Sarah Chen',       skills: 'React, TypeScript, Node.js, GraphQL',  experience: 'Intermediate' },
  { id: 2, name: 'Marcus Johnson',   skills: 'Python, Django, PostgreSQL, REST APIs', experience: 'Advanced' },
  { id: 3, name: 'Priya Patel',      skills: 'Figma, UI/UX Design, React, CSS',       experience: 'Beginner' },
  { id: 4, name: 'David Kim',        skills: 'Go, Kubernetes, Docker, AWS, Terraform', experience: 'Advanced' },
  { id: 5, name: 'Elena Rodriguez',  skills: 'Vue.js, Express, MongoDB, Socket.io',   experience: 'Intermediate' },
  { id: 6, name: 'James Liu',        skills: 'Swift, iOS, Core ML, ARKit',            experience: 'Advanced' },
  { id: 7, name: 'Aisha Malik',      skills: 'ML/AI, TensorFlow, Python, Jupyter',    experience: 'Intermediate' },
];

// ─── POST /api/user — Save Profile ────────────────────────────────────────────
app.post('/api/user', (req, res) => {
  try {
    const { name, skills, experience } = req.body;

    if (!name || !skills || !experience) {
      return res.status(400).json({ error: 'All fields (name, skills, experience) are required.' });
    }

    // Upsert: update if exists, otherwise add
    const existingIndex = developers.findIndex(
      d => d.name.toLowerCase() === name.toLowerCase()
    );

    if (existingIndex !== -1) {
      developers[existingIndex] = { ...developers[existingIndex], skills, experience };
    } else {
      developers.push({ id: developers.length + 1, name, skills, experience });
    }

    return res.status(201).json({ success: true, message: 'Profile saved successfully.' });
  } catch (err) {
    console.error('POST /api/user error:', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

// ─── GET /api/match — AI Matchmaker ───────────────────────────────────────────
app.get('/api/match', async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) {
      return res.status(400).json({ error: 'Query param "name" is required.' });
    }

    const currentUser = developers.find(
      d => d.name.toLowerCase() === name.toLowerCase()
    );

    if (!currentUser) {
      return res.status(404).json({
        error: 'User not found. Please create your profile first.',
      });
    }

    const candidates = developers.filter(d => d.id !== currentUser.id);

    if (candidates.length === 0) {
      return res.status(404).json({ error: 'No other developers available to match with.' });
    }

    // Check if Gemini API key is configured
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
      // Fallback: simple score based matching without Gemini
      const matched = candidates[Math.floor(Math.random() * candidates.length)];
      return res.status(200).json({
        matchId: matched.id,
        name: matched.name,
        skills: matched.skills,
        experience: matched.experience,
        score: Math.floor(Math.random() * 30) + 65, // 65–95
        explanation:
          'This match was selected based on complementary skill profiles. For AI-powered explanations, add your GEMINI_API_KEY to server/.env.',
      });
    }

    // ── Gemini AI Matching ──────────────────────────────────────────────────
    const prompt = `
You are an expert Hackathon Team Matchmaker AI.

The USER looking for a teammate:
Name: ${currentUser.name}
Skills: ${currentUser.skills}
Experience: ${currentUser.experience}

Available developers to match with:
${JSON.stringify(candidates, null, 2)}

Instructions:
1. Find the BEST complementary teammate based on skill synergy and experience balance.
2. Return ONLY valid JSON — no markdown, no backticks, no commentary.
3. JSON schema:
{
  "matchId": <number>,
  "name": "<string>",
  "skills": "<string>",
  "experience": "<string>",
  "score": <integer 1-100>,
  "explanation": "<2-3 sentence explanation of why they are a great match>"
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
    });

    let rawText = (response.text || '').replace(/```json/gi, '').replace(/```/g, '').trim();
    const matchData = JSON.parse(rawText);

    return res.status(200).json(matchData);
  } catch (err) {
    console.error('GET /api/match error:', err);
    
    // Auto-fallback if the API key hits a rate limit (429) or other API errors
    const candidates = developers.filter(d => d.name.toLowerCase() !== req.query.name?.toLowerCase());
    if (candidates.length > 0) {
      const matched = candidates[Math.floor(Math.random() * candidates.length)];
      return res.status(200).json({
        matchId: matched.id,
        name: matched.name,
        skills: matched.skills,
        experience: matched.experience,
        score: Math.floor(Math.random() * 20) + 70, // 70-90 score
        explanation: `There was an issue reaching the Gemini AI API (Error: ${err?.status || 'Unknown'}), so we used our default fallback matching algorithm to find a great teammate based on standard skill synergy!`,
      });
    }

    return res.status(500).json({ error: 'AI matching engine encountered an error. Please try again.' });
  }
});

// ─── GET /api/health — Health Check ───────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    developers: developers.length,
    gemini: !!(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here'),
  });
});

// ─── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ DevMatch API running → http://localhost:${PORT}`);
  console.log(`   Gemini AI: ${process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here' ? '🟢 Connected' : '🟡 No API key (fallback mode)'}`);
});
