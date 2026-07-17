import { useState } from 'react';

const Interview = ({ questions = [], onFinish = () => {}, isSubmitting = false }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;
  const currentAnswer = answers[currentQuestion?.id] || '';

  const handleAnswerChange = (e) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: e.target.value }));
  };

  const handleNext = () => {
    if (isLastQuestion) {
      onFinish(answers);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  if (!currentQuestion) {
    return (
      <main className="min-h-screen bg-[#0F1117] flex items-center justify-center px-4">
        <p className="text-slate-300 font-['Inter']">No questions available.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0F1117] flex items-center justify-center px-4 py-10">
      <div className="relative w-full max-w-2xl rounded-3xl bg-[#FAF8F3] shadow-2xl overflow-hidden">
        <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#6366F1] to-[#FB7185]" />

        <div className="p-8 sm:p-10">
          <div className="flex items-center justify-between mb-6">
            <p className="font-['Inter'] text-xs font-semibold uppercase tracking-[0.3em] text-[#6366F1]">
              Question {currentIndex + 1} of {questions.length}
            </p>
            <div className="flex gap-1">
              {questions.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 w-6 rounded-full ${
                    i <= currentIndex ? 'bg-[#6366F1]' : 'bg-slate-200'
                  }`}
                />
              ))}
            </div>
          </div>

          <h2 className="font-['Space_Grotesk'] text-2xl font-semibold text-slate-900 mb-6 leading-snug">
            {currentQuestion.questionText}
          </h2>

          <textarea
            rows={8}
            value={currentAnswer}
            onChange={handleAnswerChange}
            placeholder="Type your answer here..."
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 font-['Inter'] text-slate-900 outline-none transition focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20"
          />

          <div className="mt-6 flex items-center justify-between">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentIndex === 0}
              className="px-4 py-2 font-['Inter'] text-sm font-medium text-slate-500 disabled:opacity-30 disabled:cursor-not-allowed hover:text-slate-800 transition"
            >
              Back
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={isSubmitting || !currentAnswer.trim()}
              className="rounded-xl bg-[#6366F1] px-6 py-3 font-['Inter'] text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-indigo-400"
            >
              {isSubmitting
                ? 'Submitting...'
                : isLastQuestion
                ? 'Finish Interview'
                : 'Next Question'}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Interview;