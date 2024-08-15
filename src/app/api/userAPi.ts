import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const updateUser = async (id: number, userData: any) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/api/users/${id}`,
      userData
    );
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const deleteUser = async (id: number) => {
  try {
    await axios.delete(`${API_BASE_URL}/api/users/${id}`);
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};
// Add more user-related API calls here as needed
