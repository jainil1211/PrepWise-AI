import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../components/Login';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (formData) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await api.post('/auth/login', formData);
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
    <Login
      onSubmit={handleLogin}
      isLoading={isLoading}
      errorMessage={errorMessage}
      activeTab="signin"
    />
  );
};

export default LoginPage;