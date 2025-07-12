// API Configuration for DevFlow
import axios from 'axios';

// Get API base URL from environment variable or default to production
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://devflow-1.onrender.com/api';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token if available
api.interceptors.request.use((config) => {
  console.log('🚀 API Request:', config.method?.toUpperCase(), config.url);
  console.log('📦 Request data:', config.data);
  
  // Get token from cookies and add to Authorization header
  const token = document.cookie
    .split('; ')
    .find(row => row.startsWith('token='))
    ?.split('=')[1];
    
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('🔐 Token added to request');
  }
  
  return config;
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', response.status, response.statusText);
    console.log('📥 Response data:', response.data);
    return response;
  },
  (error) => {
    console.error('❌ API Error Status:', error.response?.status);
    console.error('❌ API Error Data:', error.response?.data);
    console.error('❌ Full Error:', error);
    return Promise.reject(error);
  }
);

export default api;
export { API_BASE_URL };
