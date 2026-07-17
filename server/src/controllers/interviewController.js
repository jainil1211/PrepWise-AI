const InterviewSession = require('../models/InterviewSession');
const Resume = require('../models/Resume');

const { generateInterviewQuestions, evaluateAnswers } = require('../services/llmService');

const startInterview = async (req, res) => {
  try {
    const { resumeId } = req.body;

    if (!resumeId) {
      return res.status(400).json({ message: 'resumeId is required' });
    }

    // Fetch the resume, and confirm it actually belongs to the logged-in user
    const resume = await Resume.findOne({ _id: resumeId, user: req.userId });

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    // Call the LLM to generate tailored questions
    const generatedQuestions = await generateInterviewQuestions(
      resume.resumeText,
      resume.jobDescription
    );

    // Transform into the shape our schema expects
    const questions = generatedQuestions.map((q) => ({
      questionText: q.question,
    }));

    const session = await InterviewSession.create({
      user: req.userId,
      resume: resume._id,
      questions,
    });

    res.status(201).json({
      message: 'Interview session created successfully',
      sessionId: session._id,
      questions: session.questions.map((q) => ({
        id: q._id,
        questionText: q.questionText,
      })),
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
const getInterviewSession = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const session = await InterviewSession.findOne({
      _id: sessionId,
      user: req.userId, // ownership check — same pattern as before
    });

    if (!session) {
      return res.status(404).json({ message: 'Interview session not found' });
    }

    res.status(200).json({
      sessionId: session._id,
      status: session.status,
      questions: session.questions.map((q) => ({
        id: q._id,
        questionText: q.questionText,
        answerText: q.answerText,
      })),
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


const submitAnswers = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { answers } = req.body; // expected shape: { questionId: answerText, ... }

    const session = await InterviewSession.findOne({
      _id: sessionId,
      user: req.userId,
    });

    if (!session) {
      return res.status(404).json({ message: 'Interview session not found' });
    }

    // Attach each answer to its matching question in the session
    session.questions.forEach((q) => {
      const submittedAnswer = answers[q._id.toString()];
      if (submittedAnswer) {
        q.answerText = submittedAnswer;
      }
    });

    // Send the full Q&A set to the LLM for evaluation
    const evaluation = await evaluateAnswers(session.questions);

    // Merge scores/feedback back into each question
    session.questions.forEach((q, index) => {
      q.score = evaluation.results[index]?.score ?? null;
      q.feedback = evaluation.results[index]?.feedback ?? '';
    });

    session.overallScore = evaluation.overallScore;
    session.status = 'completed';

    await session.save();

    res.status(200).json({
      message: 'Interview evaluated successfully',
      overallScore: session.overallScore,
      questions: session.questions.map((q) => ({
        id: q._id,
        questionText: q.questionText,
        answerText: q.answerText,
        score: q.score,
        feedback: q.feedback,
      })),
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getUserSessions = async (req, res) => {
  try {
    const sessions = await InterviewSession.find({ user: req.userId })
      .sort({ createdAt: -1 }) // most recent first
      .select('status overallScore createdAt questions'); // only fetch what we need

    const summaries = sessions.map((session) => ({
      id: session._id,
      status: session.status,
      overallScore: session.overallScore,
      questionCount: session.questions.length,
      createdAt: session.createdAt,
    }));

    res.status(200).json({ sessions: summaries });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { startInterview, getInterviewSession, submitAnswers, getUserSessions };



