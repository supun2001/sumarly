import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

// Define the URL for the API
const apiUrl = "/choreo-apis/sumarly/backend/v1";

// Create an Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : apiUrl,
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

// Add response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      // Show dialog box
      // Clear the token from local storage
      localStorage.removeItem(ACCESS_TOKEN);
      // Optionally redirect to login page or perform other actions
      window.location.href = "/logout"; // Adjust the redirect URL as needed
    }

    return Promise.reject(error);
  }
);

export default api;
