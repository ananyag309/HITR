// API Configuration for DevFlow
import axios from 'axios';
import Cookies from 'js-cookie';

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
  
  // Get token using js-cookie library for better reliability
  const token = Cookies.get('token');
    
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('🔐 Token added to request');
    console.log('🔍 Token preview:', token.substring(0, 20) + '...');
    
    // Verify token format
    if (!token.includes('.')) {
      console.log('⚠️ Warning: Token might not be a valid JWT format');
    }
  } else {
    console.log('⚠️ No token found in cookies');
    console.log('🔍 All cookies:', document.cookie);
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
    
    // Handle rate limiting (429)
    if (error.response?.status === 429) {
      console.log('🕾 Rate limit hit - reducing request frequency');
      // Could implement exponential backoff here
    }
    
    // Handle 401 errors specifically
    if (error.response?.status === 401) {
      console.log('🔑 Token appears to be invalid or expired');
      
      // Check if token exists
      const token = Cookies.get('token');
      if (token) {
        console.log('🔍 Current token:', token.substring(0, 20) + '...');
        
        // Try to decode the token to check expiration
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          const now = Math.floor(Date.now() / 1000);
          console.log('🕒 Token expires at:', new Date(payload.exp * 1000));
          console.log('🕒 Current time:', new Date());
          
          if (payload.exp < now) {
            console.log('❌ Token is expired');
            Cookies.remove('token');
            window.location.href = '/login';
          }
        } catch (e) {
          console.log('❌ Could not decode token, removing it');
          Cookies.remove('token');
        }
      } else {
        console.log('😵 No token found, user needs to login');
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;
export { API_BASE_URL };
