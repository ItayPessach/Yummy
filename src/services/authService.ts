import { apiClient, CanceledError } from "./apiClient";
import { gatherCookie } from "@/common/utils/token";

export { CanceledError };

class AuthService {
  private endpoint;

  constructor() {
    this.endpoint = "/auth";
  }

  register(registerDto: {
    email: string;
    password: string;
    fullName: string;
    homeCity: string;
    picture?: File;
  }) {
    const controller = new AbortController();
    const formData = new FormData();

    Object.entries(registerDto).forEach(([key, value]) => {
      if (key === "picture" && value instanceof File) {
        formData.append("picture", value);
      } else {
        formData.set(key, value);
      }
    });

    const request = apiClient.post(`${this.endpoint}/register`, formData, {
      signal: controller.signal,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return { request, cancel: () => controller.abort() };
  }

  login(loginDto: { email: string; password: string }) {
    const controller = new AbortController();
    const request = apiClient.post(`${this.endpoint}/login`, loginDto, {
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort() };
  }

  loginByGoogle(token: string) {
    const controller = new AbortController();
    const request = apiClient.post(`${this.endpoint}/google-login`, { token } , {
      signal: controller.signal,
    });

    return { request, cancel: () => controller.abort() };
  }

  logout() {
    const controller = new AbortController();
    const request = apiClient.get(`${this.endpoint}/logout`, {
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${gatherCookie("refresh_token")}`,
      },
    });
    return { request, cancel: () => controller.abort() };
  }
}

const authService = new AuthService();

export default authService;
