import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'http://192.168.0.101:3000', // Update to your backend URL
});

// Synchronous interceptor with asynchronous operations handled inside
api.interceptors.request.use(
  async (config:any) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default api;
