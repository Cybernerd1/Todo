import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Use your PC's IP address here
export const API_URL = "https://todo-dhtc.onrender.com/api";

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

// Add token to requests
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle server errors
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const msg =
      err?.response?.data?.message ||
      err.message ||
      "Something went wrong";
    return Promise.reject(new Error(msg));
  }
);

export default api;
