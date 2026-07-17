import { Link } from 'react-router-dom';

const Results = ({ overallScore = 0, questions = [] }) => {
    const getScoreColor = (score) => {
        if (score >= 8) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
        if (score >= 5) return 'text-amber-600 bg-amber-50 border-amber-200';
        return 'text-rose-600 bg-rose-50 border-rose-200';
    };

    return (
        <main className="min-h-screen bg-[#0F1117] px-4 py-10 sm:px-6">
            <div className="mx-auto max-w-3xl">
                <div className="relative overflow-hidden rounded-3xl bg-[#FAF8F3] shadow-2xl">
                    <div className="absolute left-0 top-0 h-full w-1 bg-linear-to-b from-[#6366F1] to-[#FB7185]" />

                    <div className="p-8 sm:p-10">
                        <div className="mb-6 flex items-center justify-between">
                            <div>
                                <p className="font-['Inter'] text-xs font-semibold uppercase tracking-[0.3em] text-[#6366F1] mb-2">
                                    Interview Complete
                                </p>
                                <h1 className="font-['Space_Grotesk'] text-3xl font-bold text-slate-900">
                                    Your Results
                                </h1>
                            </div>

                            <Link
                                to="/dashboard"
                                className="rounded-xl border border-slate-300 bg-white px-4 py-2 font-['Inter'] text-sm font-medium text-slate-700 transition hover:border-[#6366F1] hover:text-[#6366F1]"
                            >
                                ← Dashboard
                            </Link>
                        </div>

                        <div className="mb-8 flex items-center gap-6 rounded-2xl border border-slate-200 bg-white p-6">
                            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[#6366F1] font-['Space_Grotesk'] text-2xl font-bold text-white">
                                {overallScore}
                            </div>
                            <div>
                                <p className="font-['Space_Grotesk'] text-lg font-semibold text-slate-900">
                                    Overall Score
                                </p>
                                <p className="font-['Inter'] text-sm text-slate-600">Out of 100</p>
                            </div>
                        </div>




                        <div className="space-y-4">
                            {questions.map((q, index) => (
                                <div key={q.id} className="rounded-2xl border border-slate-200 bg-white p-5">
                                    <div className="mb-2 flex items-start justify-between gap-4">
                                        <p className="font-['Space_Grotesk'] font-semibold text-slate-900">
                                            Q{index + 1}. {q.questionText}
                                        </p>
                                        <span
                                            className={`shrink-0 rounded-full border px-3 py-1 font-['Inter'] text-xs font-semibold ${getScoreColor(
                                                q.score
                                            )}`}
                                        >
                                            {q.score}/10
                                        </span>
                                    </div>
                                    <p className="mb-3 font-['Inter'] text-sm text-slate-500 italic">
                                        Your answer: {q.answerText || '(no answer provided)'}
                                    </p>
                                    <p className="font-['Inter'] text-sm text-slate-700">{q.feedback}</p>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </main>
    );
};

export default Results;