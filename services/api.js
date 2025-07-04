import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Sửa lại khi deploy

export const translateText = async (text, from, to) => {
  return axios.post(`${API_BASE_URL}/translate`, { text, from, to });
};

export const getHistory = async (userId) => {
  return axios.get(`${API_BASE_URL}/history`, { params: { userId } });
}; 