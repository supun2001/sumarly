import axios from "axios";
import Cookies from "js-cookie"; // Import js-cookie
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
    // Get the access token from local storage
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Include Bearer token in headers
    }

    // Get the CSRF token from cookies and add it to headers
    const csrfToken = Cookies.get('csrftoken'); // Default name for CSRF token in Django
    if (csrfToken) {
      config.headers['X-CSRFToken'] = csrfToken; // Include CSRF token in headers
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
