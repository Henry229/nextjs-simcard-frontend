import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000'; // 백엔드 서버 주소

export const getAllSims = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/sims`);
    console.log('>>>> API response:', response.data[0]);
    return response.data;
  } catch (error) {
    console.error('Error fetching SIMs:', error);
    throw error;
  }
};
