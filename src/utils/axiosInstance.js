import axios from "axios";
import { baseURL } from "./constants";

const axiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true, // Always include cookies with requests
});

// Track if we're already redirecting to prevent infinite loops
let redirecting = false;

axiosInstance.interceptors.response.use(
  (res) => {
    redirecting = false; // Reset flag on successful response
    return res;
  },
  (err) => {
    // Handle 401 Unauthorized - token missing or expired
    if (err.response?.status === 401 && !redirecting) {
      redirecting = true;
      // Clear all stored data and redirect to login
      window.location.href = "/login";
      return new Promise(() => {}); // Never resolve/reject - stop execution
    }
    return Promise.reject(err);
  }
);

export default axiosInstance;
