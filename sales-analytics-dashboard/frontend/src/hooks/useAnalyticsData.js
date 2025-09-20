import { useState, useEffect } from 'react';
import { getAnalyticsData } from '../services/api';

const useAnalyticsData = (startDate, endDate) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (!startDate || !endDate) return;
      
      setLoading(true);
      setError('');
      try {
        const result = await getAnalyticsData(startDate, endDate);
        setData(result);
      } catch (err) {
        setError('Failed to fetch analytics data. Please try again.');
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [startDate, endDate]);

  return { data, loading, error };
};

export default useAnalyticsData;