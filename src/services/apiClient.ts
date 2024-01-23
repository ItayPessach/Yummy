import { gatherCookie } from "@/common/utils/token";
import axios, { CanceledError } from "axios";
const env = import.meta.env;

export { CanceledError };

const apiClient = axios.create({
  baseURL: env.VITE_BACKEND_API_URL,
});

const apiClientWithAuth = axios.create({
  baseURL: env.VITE_BACKEND_API_URL,
});

apiClientWithAuth.interceptors.request.use((config) => {
  config.headers["Authorization"] = `Bearer ${gatherCookie("access_token")}`;
  return config;
});

export { apiClient, apiClientWithAuth };
