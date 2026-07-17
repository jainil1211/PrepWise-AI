import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ResumeUpload from '../components/ResumeUpload';
import api from '../services/api';

const UploadResumePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleUpload = async ({ file, jobDescription }) => {
    setIsLoading(true);
    setErrorMessage(null);

    if (!file) {
      setErrorMessage('Please select a resume PDF.');
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('resume', file);
    formData.append('jobDescription', jobDescription);

    try {
      // Step 1: upload + parse resume
      const uploadResponse = await api.post('/resume/upload', formData);
      const { resumeId } = uploadResponse.data;

      // Step 2: immediately generate questions from that resume
      const interviewResponse = await api.post('/interview/start', { resumeId });
      const { sessionId } = interviewResponse.data;

      // Step 3: go straight to the interview
      navigate(`/interview/${sessionId}`);
    } catch (error) {
      const message =
        error.response?.data?.message || 'Something went wrong. Please try again.';
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ResumeUpload
      onSubmit={handleUpload}
      isLoading={isLoading}
      errorMessage={errorMessage}
    />
  );
};

export default UploadResumePage;