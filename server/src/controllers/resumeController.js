const { PDFParse } = require('pdf-parse');
const Resume = require('../models/Resume');

const uploadResume = async (req, res) => {
  let parser;
  try {
    const { jobDescription } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Resume PDF file is required' });
    }

    if (!jobDescription || jobDescription.trim() === '') {
      return res.status(400).json({ message: 'Job description is required' });
    }

    // v2.x API: create a parser instance, then call methods on it
    parser = new PDFParse({ data: req.file.buffer });
    const result = await parser.getText();
    const resumeText = result.text;

    if (!resumeText || resumeText.trim() === '') {
      return res.status(400).json({
        message: 'Could not extract text from this PDF. Try a different file.',
      });
    }

    const resume = await Resume.create({
      user: req.userId,
      resumeText,
      jobDescription,
    });

    res.status(201).json({
      message: 'Resume uploaded and parsed successfully',
      resumeId: resume._id,
      resumeTextPreview: resumeText.slice(0, 200),
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  } finally {
    if (parser) {
      await parser.destroy(); // v2.x requires explicit cleanup
    }
  }
};

module.exports = { uploadResume };