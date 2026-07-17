import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Results from '../components/Results';
import api from '../services/api';

const ResultsPage = () => {
  const { sessionId } = useParams();
  const location = useLocation();

  const [data, setData] = useState(location.state || null);
  const [isLoading, setIsLoading] = useState(!location.state);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    // If we already have data passed via navigation state, skip the fetch
    if (location.state) return;

    const fetchResults = async () => {
      try {
        const response = await api.get(`/interview/${sessionId}`);
        setData(response.data);
      } catch (error) {
        setErrorMessage('Could not load these results.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [sessionId, location.state]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#0F1117] flex items-center justify-center">
        <p className="text-slate-300 font-['Inter']">Loading your results...</p>
      </main>
    );
  }

  if (errorMessage || !data) {
    return (
      <main className="min-h-screen bg-[#0F1117] flex items-center justify-center">
        <p className="text-rose-400 font-['Inter']">{errorMessage || 'No results found.'}</p>
      </main>
    );
  }

  return <Results overallScore={data.overallScore} questions={data.questions} />;
};

export default ResultsPage;