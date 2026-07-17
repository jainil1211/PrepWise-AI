import { Link } from 'react-router-dom';

const Dashboard = ({ userName = '', sessions = [], isLoading = false }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getScoreColor = (score) => {
    if (score === null || score === undefined) return 'text-slate-400 bg-slate-50 border-slate-200';
    if (score >= 70) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    if (score >= 40) return 'text-amber-600 bg-amber-50 border-amber-200';
    return 'text-rose-600 bg-rose-50 border-rose-200';
  };

  return (
    <main className="min-h-screen bg-[#0F1117] px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="font-['Inter'] text-xs font-semibold uppercase tracking-[0.3em] text-[#6366F1] mb-2">
              PrepWise AI
            </p>
            <h1 className="font-['Space_Grotesk'] text-3xl font-bold text-white">
              Welcome back{userName ? `, ${userName}` : ''}
            </h1>
          </div>

          <Link
            to="/upload"
            className="rounded-xl bg-[#6366F1] px-5 py-3 font-['Inter'] text-sm font-semibold text-white transition hover:bg-indigo-500"
          >
            + Start New Interview
          </Link>
        </div>

        <div className="rounded-3xl bg-[#FAF8F3] p-6 sm:p-8">
          <h2 className="font-['Space_Grotesk'] text-lg font-semibold text-slate-900 mb-5">
            Your Interview History
          </h2>

          {isLoading ? (
            <p className="font-['Inter'] text-sm text-slate-500">Loading your sessions...</p>
          ) : sessions.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center">
              <p className="font-['Inter'] text-sm text-slate-500 mb-1">
                No interviews yet.
              </p>
              <p className="font-['Inter'] text-sm text-slate-400">
                Start your first one to see your progress here.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {sessions.map((session) => (
                <Link
                  key={session.id}
                  to={
                    session.status === 'completed'
                      ? `/results/${session.id}`
                      : `/interview/${session.id}`
                  }
                  className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-[#6366F1]/40 hover:shadow-sm"
                >
                  <div>
                    <p className="font-['Inter'] text-sm font-medium text-slate-900">
                      {session.questionCount} question interview
                    </p>
                    <p className="font-['Inter'] text-xs text-slate-500">
                      {formatDate(session.createdAt)} ·{' '}
                      {session.status === 'completed' ? 'Completed' : 'In progress'}
                    </p>
                  </div>

                  {session.status === 'completed' ? (
                    <span
                      className={`rounded-full border px-3 py-1 font-['Inter'] text-xs font-semibold ${getScoreColor(
                        session.overallScore
                      )}`}
                    >
                      {session.overallScore}/100
                    </span>
                  ) : (
                    <span className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 font-['Inter'] text-xs font-semibold text-indigo-600">
                      Resume →
                    </span>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;