import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Interview from '../components/Interview';
import api from '../services/api';

const InterviewPage = () => {
    const { sessionId } = useParams();
    const navigate = useNavigate();

    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const response = await api.get(`/interview/${sessionId}`);
                setQuestions(response.data.questions);
            } catch (error) {
                setErrorMessage('Could not load this interview session.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchSession();
    }, [sessionId]);

    const handleFinish = async (answers) => {
        setIsSubmitting(true);
        try {
            const response = await api.post(`/interview/${sessionId}/submit`, { answers });
            navigate(`/results/${sessionId}`, { state: response.data });
        } catch (error) {
            setErrorMessage('Something went wrong while evaluating your answers.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <main className="min-h-screen bg-[#0F1117] flex items-center justify-center">
                <p className="text-slate-300 font-['Inter']">Loading your interview...</p>
            </main>
        );
    }

    if (errorMessage) {
        return (
            <main className="min-h-screen bg-[#0F1117] flex items-center justify-center">
                <p className="text-rose-400 font-['Inter']">{errorMessage}</p>
            </main>
        );
    }

    return (
        <Interview questions={questions} onFinish={handleFinish} isSubmitting={isSubmitting} />
    );
};


export default InterviewPage;
