import { Link } from 'react-router-dom';
import { useState } from 'react';

const Login = ({
    onSubmit = () => { },
    isLoading = false,
    errorMessage = null,
    activeTab = 'signin',
}) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((current) => ({
            ...current,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(formData);
    };

    return (
        <main className="min-h-screen bg-[#0F1117] px-4 py-8 text-slate-100 sm:px-6 lg:px-8">
            <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-5xl items-center justify-center">
                <section className="relative w-full overflow-hidden rounded-3xl bg-[#FAF8F3] shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
                    <div className="absolute left-0 top-0 h-full w-1 bg-linear-to-b from-[#6366F1] to-[#FB7185]" />
                    <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
                        <div className="flex flex-col justify-between px-6 py-8 text-[#1E293B] sm:px-8 sm:py-10 lg:px-10 lg:py-12">
                            <div>
                                <div className="mb-8 flex items-center justify-between gap-4">
                                    <p className="font-['Inter'] text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                                        PrepWise AI
                                    </p>
                                    <div className="flex rounded-full border border-slate-200 bg-white/70 p-1">
                                        <Link
                                            to="/login"
                                            className={`rounded-full px-4 py-2 text-sm font-medium transition font-['Inter'] ${activeTab === 'signin'
                                                    ? 'bg-[#6366F1] text-white shadow-sm'
                                                    : 'text-slate-500 hover:text-slate-800'
                                                }`}
                                        >
                                            Sign In
                                        </Link>
                                        <Link
                                            to="/signup"
                                            className={`rounded-full px-4 py-2 text-sm font-medium transition font-['Inter'] ${activeTab === 'signup'
                                                    ? 'bg-[#6366F1] text-white shadow-sm'
                                                    : 'text-slate-500 hover:text-slate-800'
                                                }`}
                                        >
                                            Sign Up
                                        </Link>
                                    </div>
                                </div>

                                <div className="max-w-xl">
                                    <p className="font-['Inter'] text-sm font-semibold uppercase tracking-[0.32em] text-[#6366F1]">
                                        Welcome back
                                    </p>
                                    <h1 className="mt-4 font-['Space_Grotesk'] text-4xl font-semibold tracking-tight text-[#1E293B] sm:text-5xl">
                                        Pick up where you left off with your <span className="text-[#FB7185]">practice</span>.
                                    </h1>
                                    <p className="mt-4 max-w-lg font-['Inter'] text-base leading-7 text-slate-600 sm:text-lg">
                                        Log back in to continue tracking your interview readiness.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-10 hidden rounded-2xl border border-slate-200 bg-white/70 p-5 lg:block">
                                <p className="font-['Space_Grotesk'] text-lg font-semibold text-[#1E293B]">
                                    Designed for technical prep
                                </p>
                                <p className="mt-2 font-['Inter'] text-sm leading-6 text-slate-600">
                                    Track patterns, strengthen weak areas, and stay ready for your next round.
                                </p>
                            </div>
                        </div>

                        <div className="px-6 pb-8 sm:px-8 lg:px-10 lg:py-10">
                            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
                                <div className="mb-6 lg:hidden">
                                    <div className="flex rounded-full border border-slate-200 bg-slate-50 p-1">
                                        <Link
                                            to="/login"
                                            className={`rounded-full px-4 py-2 text-sm font-medium transition font-['Inter'] ${activeTab === 'signin'
                                                    ? 'bg-[#6366F1] text-white shadow-sm'
                                                    : 'text-slate-500 hover:text-slate-800'
                                                }`}
                                        >
                                            Sign In
                                        </Link>
                                        <Link
                                            to="/signup"
                                            className={`rounded-full px-4 py-2 text-sm font-medium transition font-['Inter'] ${activeTab === 'signup'
                                                    ? 'bg-[#6366F1] text-white shadow-sm'
                                                    : 'text-slate-500 hover:text-slate-800'
                                                }`}
                                        >
                                            Sign Up
                                        </Link>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <h2 className="font-['Space_Grotesk'] text-2xl font-semibold text-[#1E293B]">
                                        Sign in to your account
                                    </h2>
                                    <p className="mt-2 font-['Inter'] text-sm leading-6 text-slate-600">
                                        Enter your credentials to continue.
                                    </p>
                                </div>

                                {errorMessage ? (
                                    <div
                                        className="mb-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 font-['Inter'] text-sm text-rose-700"
                                        role="alert"
                                    >
                                        {errorMessage}
                                    </div>
                                ) : null}

                                <form className="space-y-5" onSubmit={handleSubmit} noValidate>
                                    <div>
                                        <label htmlFor="email" className="mb-2 block font-['Inter'] text-sm font-medium text-[#1E293B]">
                                            Email address
                                        </label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full rounded-2xl border border-slate-200 bg-[#FAF8F3] px-4 py-3 font-['Inter'] text-[#1E293B] outline-none transition placeholder:text-slate-400 focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/25"
                                            placeholder="you@example.com"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="password" className="mb-2 block font-['Inter'] text-sm font-medium text-[#1E293B]">
                                            Password
                                        </label>
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            autoComplete="current-password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className="w-full rounded-2xl border border-slate-200 bg-[#FAF8F3] px-4 py-3 font-['Inter'] text-[#1E293B] outline-none transition placeholder:text-slate-400 focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/25"
                                            placeholder="Enter your password"
                                            required
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="inline-flex w-full items-center justify-center rounded-2xl bg-[#6366F1] px-4 py-3 font-['Inter'] text-sm font-semibold text-white transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:ring-offset-2 focus:ring-offset-[#FAF8F3] disabled:cursor-not-allowed disabled:bg-indigo-400/70"
                                    >
                                        {isLoading ? 'Signing in...' : 'Sign in'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default Login;