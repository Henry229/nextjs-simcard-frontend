import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getAllSims = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/sims`);
    return response.data;
  } catch (error) {
    console.error('Error fetching SIMs:', error);
    throw error;
  }
};
