// frontend/src/api.js
import axios from "axios";

// Create axios instance with base URL
const api = axios.create({
  baseURL: "http://localhost:5000/api", // Backend URL
});

// Add Authorization header with token to each request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
