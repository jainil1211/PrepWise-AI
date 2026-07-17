const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const generateWithRetry = async (prompt, retries = 3) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite',
        contents: prompt,
      });
      return response.text;
    } catch (error) {
      const isRetryable = error.message?.includes('UNAVAILABLE') || error.message?.includes('503');

      if (isRetryable && attempt < retries) {
        const waitTime = attempt * 2000; // 2s, then 4s, then 6s
        console.log(`Gemini busy, retrying in ${waitTime / 1000}s (attempt ${attempt}/${retries})...`);
        await sleep(waitTime);
        continue;
      }
      throw error; // not retryable, or out of attempts — let it fail properly
    }
  }
};

const testConnection = async () => {
  return generateWithRetry('Say hello in one short sentence.');
};

const generateInterviewQuestions = async (resumeText, jobDescription) => {
  const prompt = `You are an expert technical interviewer. Based on the candidate's resume and the job description below, generate exactly 8 technical interview questions tailored to this specific candidate and role.

Requirements:
- Questions should reference the candidate's actual skills/projects/experience where relevant
- Questions should also reflect the specific requirements in the job description
- Mix of difficulty: 3 easier/fundamental questions, 3 intermediate, 2 advanced
- Focus on technical/practical knowledge, not generic behavioral questions
- Do NOT include the answers

Return ONLY a valid JSON array in this exact format, with no other text, no markdown code fences, nothing else:
[
  { "question": "..." },
  { "question": "..." }
]

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}`;

  const rawResponse = await generateWithRetry(prompt);

  // Defensive cleanup — LLMs sometimes wrap JSON in code fences despite instructions
  const cleaned = rawResponse.replace(/```json|```/g, '').trim();

  let questions;
  try {
    questions = JSON.parse(cleaned);
  } catch (error) {
    throw new Error('LLM returned invalid JSON for questions');
  }

  return questions;
};

const evaluateAnswers = async (questionsWithAnswers) => {
  // Build a clean, numbered transcript for the prompt
  const transcript = questionsWithAnswers
    .map((q, i) => `Q${i + 1}: ${q.questionText}\nCandidate's Answer: ${q.answerText || '(no answer provided)'}`)
    .join('\n\n');

  const prompt = `You are an expert technical interviewer evaluating a candidate's interview answers.

For each question below, evaluate the candidate's answer and provide:
- A score from 0 to 10 (0 = no understanding shown, 10 = excellent, complete answer)
- Brief, constructive feedback (2-3 sentences) explaining the score and how to improve

Also provide an overall score from 0 to 100 summarizing overall performance across all questions.

Return ONLY a valid JSON object in this exact format, with no other text, no markdown code fences, nothing else:
{
  "overallScore": 75,
  "results": [
    { "score": 8, "feedback": "..." },
    { "score": 6, "feedback": "..." }
  ]
}

The "results" array must have exactly ${questionsWithAnswers.length} entries, in the same order as the questions below.

INTERVIEW TRANSCRIPT:
${transcript}`;

  const rawResponse = await generateWithRetry(prompt);
  const cleaned = rawResponse.replace(/```json|```/g, '').trim();

  let evaluation;
  try {
    evaluation = JSON.parse(cleaned);
  } catch (error) {
    throw new Error('LLM returned invalid JSON for evaluation');
  }

  return evaluation;
};

module.exports = {
  testConnection,
  generateWithRetry,
  generateInterviewQuestions,
  evaluateAnswers,
};

