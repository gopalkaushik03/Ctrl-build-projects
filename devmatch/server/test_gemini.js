const { GoogleGenAI } = require('@google/genai');
const ai = new GoogleGenAI({ apiKey: 'AIzaSyAoEIiZj7fLnlEldIwk4eQ9wd_DZdvvMNc' });
async function run() {
  try {
    await ai.models.generateContent({ model: 'gemini-2.0-flash', contents: 'hello' });
    console.log('Success');
  } catch(e) {
    console.error('ERROR::::', e);
  }
}
run();
