import axios from "axios";
import { ACCESS_TOKEN } from "./constants";
import "../public/config"


// Create an Axios instance
const api = axios.create({
  baseURL: window.configs.VITE_API_URL ? window.configs.VITE_API_URL : window.configs.apiUrl,
});

// Add request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export default api;
