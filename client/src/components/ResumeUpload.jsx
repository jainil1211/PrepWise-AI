import { useState } from 'react';

const ResumeUpload = ({ onSubmit = () => {}, isLoading = false, errorMessage = null, successMessage = null }) => {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setFileName(selected.name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ file, jobDescription });
  };

  return (
    <main className="min-h-screen bg-[#0F1117] flex items-center justify-center px-4 py-10">
      <div className="relative w-full max-w-2xl rounded-3xl bg-[#FAF8F3] shadow-2xl overflow-hidden">
        <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#6366F1] to-[#FB7185]" />

        <div className="p-8 sm:p-10">
          <p className="font-['Inter'] text-xs font-semibold uppercase tracking-[0.3em] text-[#6366F1] mb-2">
            Step 1 of 2
          </p>
          <h1 className="font-['Space_Grotesk'] text-3xl font-bold text-slate-900 mb-2">
            Set up your interview
          </h1>
          <p className="font-['Inter'] text-sm text-slate-600 mb-6">
            Upload your resume and paste the job description to get personalized questions.
          </p>

          {errorMessage && (
            <div className="mb-5 rounded-xl border border-rose-300 bg-rose-50 px-4 py-3 text-sm text-rose-700 font-['Inter']" role="alert">
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="mb-5 rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 font-['Inter']" role="status">
              {successMessage}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block font-['Inter'] text-sm font-medium text-slate-700 mb-1.5">
                Resume (PDF only)
              </label>
              <label className="flex items-center justify-center w-full rounded-xl border-2 border-dashed border-slate-300 bg-white px-4 py-6 cursor-pointer hover:border-[#6366F1] transition">
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  className="hidden"
                  required
                />
                <span className="font-['Inter'] text-sm text-slate-500">
                  {fileName || 'Click to select your resume PDF'}
                </span>
              </label>
            </div>

            <div>
              <label htmlFor="jobDescription" className="block font-['Inter'] text-sm font-medium text-slate-700 mb-1.5">
                Job description
              </label>
              <textarea
                id="jobDescription"
                name="jobDescription"
                rows={6}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                required
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 font-['Inter'] text-slate-900 outline-none transition focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20"
                placeholder="Paste the job description here..."
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl bg-[#6366F1] px-4 py-3 font-['Inter'] text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-indigo-400"
            >
              {isLoading ? 'Uploading and parsing...' : 'Continue'}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default ResumeUpload;