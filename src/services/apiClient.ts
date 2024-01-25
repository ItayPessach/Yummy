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

apiClientWithAuth.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (axios.isCancel(error)) {
      return Promise.reject(error);
    }

    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      originalRequest.url === "/auth/refresh"
    ) {
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await apiClient.get("/auth/refresh", {
          headers: {
            Authorization: `Bearer ${gatherCookie("refresh_token")}`,
          },
        });
        document.cookie = `access_token=${response.data.accessToken}; path=/`;
        document.cookie = `refresh_token=${response.data.refreshToken}; path=/`;
        apiClient.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.accessToken}`;
        return apiClientWithAuth(originalRequest);
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export { apiClient, apiClientWithAuth };
