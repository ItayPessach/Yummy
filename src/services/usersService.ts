import { apiClientWithAuth, CanceledError } from "./apiClient";

export { CanceledError };

class UsersService {
  private endpoint;

  constructor() {
    this.endpoint = "/users";
  }

  getMe() {
    const controller = new AbortController();
    const request = apiClientWithAuth.get(`${this.endpoint}/me`, {
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort() };
  }

  editProfile(
    editDto: Partial<{
      fullName: string;
      email: string;
      homeCity: string;
      picture: File;
    }>
  ) {
    const controller = new AbortController();
    const formData = new FormData();

    Object.entries(editDto).forEach(([key, value]) => {
      if (key === "picture" && value instanceof File) {
        formData.append("picture", value);
      } else {
        formData.set(key, value);
      }
    });

    const request = apiClientWithAuth.put(this.endpoint, editDto, {
      signal: controller.signal,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return { request, cancel: () => controller.abort() };
  }
}

const usersService = new UsersService();

export default usersService;
