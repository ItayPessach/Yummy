import { apiClient, CanceledError } from "./apiClient";
import { User } from "../common/types";
import { gatherCookie } from "@/common/utils/token";

export { CanceledError };

class AuthService {
  private endpoint;

  constructor() {
    this.endpoint = "/auth";
  }

  register(user: User) {
    const controller = new AbortController();
    const formData = new FormData();

    Object.entries(user).forEach(([key, value]) => {
      if (key === "profilePicture" && value instanceof File) {
        formData.append(key, value);
      } else {
        formData.set(key, value);
      }
    });

    const request = apiClient.post<User>(
      `${this.endpoint}/register`,
      formData,
      {
        signal: controller.signal,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return { request, cancel: () => controller.abort() };
  }

  login(loginDto: { email: string; password: string }) {
    const controller = new AbortController();
    const request = apiClient.post<User>(`${this.endpoint}/login`, loginDto, {
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort() };
  }

  logout() {
    const controller = new AbortController();
    const request = apiClient.post<User>(
      `${this.endpoint}/logout`,
      {
        Authorization: `Bearer ${gatherCookie("refresh_token")}`,
      },
      {
        signal: controller.signal,
      }
    );
    return { request, cancel: () => controller.abort() };
  }
}

const authService = new AuthService();

export default authService;
