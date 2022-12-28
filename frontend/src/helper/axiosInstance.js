import axios from "axios";

// axios instance for making requests
const axiosInstance = axios.create();

// request interceptor for adding token
axiosInstance.interceptors.request.use((config) => {
  // add token to request headers
  config.headers["auth-token"] = sessionStorage.getItem("token");
  config.withCredentials = true;
  return config;
});

export default axiosInstance;
