import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const SUPPORTED_LANGUAGES = ['cpp', 'c', 'java', 'python', 'javascript', 'html', 'css'];

// Helper to construct prompt for the AI
function buildPrompt(language, code) {
  return `You are an expert AI Code Reviewer. Perform a comprehensive code review for the following ${language.toUpperCase()} code.

CODE TO REVIEW:
\`\`\`${language}
${code}
\`\`\`

REQUIREMENTS FOR YOUR RESPONSE:
You MUST return ONLY a raw valid JSON object with NO markdown formatting wrapper around the JSON (do not include \`\`\`json or \`\`\`). The JSON structure must match this exact schema:

{
  "review": "Markdown formatted review text containing sections for: Bugs & Errors, Suggestions & Best Practices, Code Quality, and Explanation of changes.",
  "optimizedCode": "The complete, optimized, fixed code string without markdown backticks.",
  "complexity": {
    "time": "Time complexity notation e.g. O(n)",
    "space": "Space complexity notation e.g. O(1)"
  },
  "score": 85
}

Detailed instructions for each field:
1. "review": Use clean markdown syntax. Highlight any bugs, runtime errors, security issues, code quality concerns, best practices, and explain the optimizations made.
2. "optimizedCode": Write clean, production-ready, optimized replacement code.
3. "complexity": Provide realistic Time Complexity and Space Complexity estimates (e.g., O(N), O(1), O(N^2), N/A for CSS/HTML).
4. "score": An overall code quality score between 0 and 100 based on syntax correctness, efficiency, readability, and security.

Return ONLY the valid JSON object.`;
}

// Call Google Gemini API with fallback models
async function callGemini(apiKey, language, code) {
  const GEMINI_MODELS = [
    'gemini-3.5-flash',
    'gemini-3.1-flash-lite',
    'gemini-2.0-flash',
    'gemini-2.0-flash-lite',
    'gemini-2.5-flash'
  ];

  let lastError = null;

  for (const model of GEMINI_MODELS) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const response = await axios.post(
        url,
        {
          contents: [
            {
              parts: [{ text: buildPrompt(language, code) }]
            }
          ]
        },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );

      const text = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) {
        return parseAIResponse(text);
      }
    } catch (err) {
      lastError = err;
      const errMsg = err.response?.data?.error?.message || err.message;
      console.warn(`Gemini model [${model}] failed (${errMsg}). Trying next model...`);
    }
  }

  throw lastError || new Error('All Gemini API models failed to generate content.');
}

// Call Groq API
async function callGroq(apiKey, language, code) {
  const response = await axios.post(
    'https://api.groq.com/openai/v1/chat/completions',
    {
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: buildPrompt(language, code) }],
      response_format: { type: 'json_object' }
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    }
  );

  const text = response.data.choices?.[0]?.message?.content;
  return parseAIResponse(text);
}

// Call OpenRouter Free API
async function callOpenRouter(apiKey, language, code) {
  const response = await axios.post(
    'https://openrouter.ai/api/v1/chat/completions',
    {
      model: 'google/gemini-2.0-flash-lite-preview-02-05:free',
      messages: [{ role: 'user', content: buildPrompt(language, code) }]
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    }
  );

  const text = response.data.choices?.[0]?.message?.content;
  return parseAIResponse(text);
}

// Helper to parse JSON output from AI response
function parseAIResponse(rawText) {
  if (!rawText) throw new Error('Empty response received from AI service.');
  
  // Clean markdown block if present
  let cleaned = rawText.trim();
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(json)?\n?/, '').replace(/\n?```$/, '');
  }

  try {
    const data = JSON.parse(cleaned);
    return {
      review: data.review || 'No review comments provided.',
      optimizedCode: data.optimizedCode || '',
      complexity: {
        time: data.complexity?.time || 'N/A',
        space: data.complexity?.space || 'N/A'
      },
      score: typeof data.score === 'number' ? data.score : 80
    };
  } catch (err) {
    console.error('Failed to parse AI JSON response:', cleaned);
    throw new Error('AI returned an invalid JSON response structure.');
  }
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', serverTime: new Date().toISOString() });
});

// Review endpoint
app.post('/api/review', async (req, res) => {
  const { language, code } = req.body;

  if (!language || !code) {
    return res.status(400).json({ error: 'Language and code fields are required.' });
  }

  if (!SUPPORTED_LANGUAGES.includes(language.toLowerCase())) {
    return res.status(400).json({
      error: `Unsupported language. Supported languages are: ${SUPPORTED_LANGUAGES.join(', ')}`
    });
  }

  const geminiKey = process.env.GEMINI_API_KEY;
  const groqKey = process.env.GROQ_API_KEY;
  const openRouterKey = process.env.OPENROUTER_API_KEY;

  if (!geminiKey && !groqKey && !openRouterKey) {
    return res.status(500).json({
      error: 'No API Key configured on server. Please add GEMINI_API_KEY in server/.env file.'
    });
  }

  try {
    let result = null;

    if (geminiKey) {
      try {
        result = await callGemini(geminiKey, language, code);
      } catch (err) {
        console.error('Gemini API call failed:', err.message);
      }
    }

    if (!result && groqKey) {
      try {
        result = await callGroq(groqKey, language, code);
      } catch (err) {
        console.error('Groq API call failed:', err.message);
      }
    }

    if (!result && openRouterKey) {
      try {
        result = await callOpenRouter(openRouterKey, language, code);
      } catch (err) {
        console.error('OpenRouter API call failed:', err.message);
      }
    }

    if (!result) {
      return res.status(502).json({
        error: 'Failed to generate code review from AI API. Please verify your API key and network connection.'
      });
    }

    return res.json(result);
  } catch (error) {
    console.error('Error during code review:', error);
    return res.status(500).json({
      error: error.message || 'An unexpected error occurred while reviewing your code.'
    });
  }
});

app.listen(PORT, () => {
  console.log(`AI Code Reviewer backend server listening on http://localhost:${PORT}`);
});
