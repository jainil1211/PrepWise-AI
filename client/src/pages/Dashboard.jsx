import { useState, useEffect } from 'react';
import Dashboard from '../components/Dashboard';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const DashboardPage = () => {
  const { user } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await api.get('/interview');
        setSessions(response.data.sessions);
      } catch (error) {
        console.error('Failed to load sessions:', error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSessions();
  }, []);

  return <Dashboard userName={user?.name} sessions={sessions} isLoading={isLoading} />;
};

export default DashboardPage;