import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Signup from '../components/Signup';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const SignupPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (formData) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await api.post('/auth/signup', formData);
      const { token, user } = response.data;
      login(user, token);
      navigate('/dashboard');
    } catch (error) {
      const message =
        error.response?.data?.message || 'Something went wrong. Please try again.';
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Signup
      onSubmit={handleSignup}
      isLoading={isLoading}
      errorMessage={errorMessage}
      activeTab="signup"
    />
  );
};

export default SignupPage;