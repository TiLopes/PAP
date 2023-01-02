import axios from "axios";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((config) => {
  config.baseURL = "http://localhost:3000";
  config.headers["auth-token"] = sessionStorage.getItem("token");
  config.withCredentials = true;
  return config;
});

export default axiosInstance;
