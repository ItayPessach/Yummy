import { gatherCookie } from "@/common/utils/token";
import axios, { CanceledError } from "axios";

export { CanceledError };

const apiClient = axios.create({
  baseURL: "http://localhost:3000",
});

const apiClientWithAuth = axios.create({
  baseURL: "http://localhost:3000",
});

apiClientWithAuth.interceptors.request.use((config) => {
  config.headers["Authorization"] = `Bearer ${gatherCookie("access_token")}`;
  return config;
});

export { apiClient, apiClientWithAuth };
