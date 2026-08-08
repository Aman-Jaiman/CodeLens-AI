import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
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
