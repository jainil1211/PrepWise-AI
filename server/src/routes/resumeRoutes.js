const express = require('express');
const upload = require('../config/multerConfig');
const protect = require('../middleware/authMiddleware');
const { uploadResume } = require('../controllers/resumeController');

const router = express.Router();

router.post('/upload', protect, (req, res, next) => {
  upload.single('resume')(req, res, (err) => {
    if (err) {
      return next(err);
    }
    next();
  });
}, uploadResume);

module.exports = router;