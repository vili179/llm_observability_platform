import axios from 'axios';

const API_BASE_URL = 'http://localhost:8888/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {'Content-Type': 'application/json'},
  timeout: 30000,
});

export const generateAPI = {
  generateContent: (prompt) => api.post('/generate', { prompt }),
  getHistory: () => api.get('/history'),
  logInteraction: (data) => api.post('/llm/log', data),
  checkHealth: () => api.get('/health'),
};

export default api;