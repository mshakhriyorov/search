import axios from "axios";

const CONFIG_BASE_URL = "https://fakestoreapi.com";

export const axiosInstance = axios.create({
  baseURL: CONFIG_BASE_URL,
  timeout: 5000, // Timeout of 5 seconds
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
