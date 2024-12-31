import axios from 'axios';

const API_URL = process.env.API_URL;

const apiClient = axios.create({
  baseURL: `${API_URL}/api`,
});

export default apiClient;

