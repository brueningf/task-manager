import axios from 'axios';

const API_URL = process.env.API_URL || 'http://localhost:3001';

const apiClient = axios.create({
  baseURL: `${API_URL}/api`,
});

export default apiClient;

