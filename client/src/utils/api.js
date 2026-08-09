import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || '/api';

const api = axios.create({
  baseURL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const requestReview = async (language, code) => {
  try {
    const response = await api.post('/review', { language, code });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error('Failed to communicate with AI review server. Please make sure the server is running.');
  }
};
