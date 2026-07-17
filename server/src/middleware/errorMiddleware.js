const errorHandler = (err, req, res, next) => {
  console.error(err.message);

  // Multer file filter errors (like our PDF-only rejection) arrive as plain Error objects
  if (err.message === 'Only PDF files are allowed') {
    return res.status(400).json({ message: err.message });
  }

  // Multer's own built-in errors (e.g., file too large)
  if (err.name === 'MulterError') {
    return res.status(400).json({ message: err.message });
  }

  // Fallback for anything else unexpected
  res.status(500).json({ message: 'Something went wrong on the server' });
};

module.exports = errorHandler;