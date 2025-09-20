import axios from 'axios';
import dayjs from 'dayjs';

// Use the full backend URL since we are not using a proxy
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const getAnalyticsData = async (startDate, endDate) => {
  try {
    const formattedStartDate = dayjs(startDate).format('YYYY-MM-DD');
    const formattedEndDate = dayjs(endDate).format('YYYY-MM-DD');
    
    const response = await api.get('/analytics', {
      params: {
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching analytics data', error);
    throw error;
  }
};