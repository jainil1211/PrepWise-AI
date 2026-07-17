const express = require('express');
const protect = require('../middleware/authMiddleware');
const {
  startInterview,
  getInterviewSession,
  submitAnswers,
  getUserSessions,
} = require('../controllers/interviewController');

const router = express.Router();

router.get('/', protect, getUserSessions);
router.post('/start', protect, startInterview);
router.get('/:sessionId', protect, getInterviewSession);
router.post('/:sessionId/submit', protect, submitAnswers);

module.exports = router;