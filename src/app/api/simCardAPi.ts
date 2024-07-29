import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL; // 백엔드 서버 주소

export const getDevices = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/simCards`);
    return response.data;
  } catch (error) {
    console.error('Error fetching SIMCards:', error);
    throw error;
  }
};
