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
      profileImage: File;
    }>
  ) {
    const controller = new AbortController();
    const request = apiClientWithAuth.put(this.endpoint, editDto, {
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort() };
  }
}

const usersService = new UsersService();

export default usersService;
