import { apiClientWithAuth, CanceledError } from "./apiClient";
import { User } from "../common/types";

export { CanceledError };

class UsersService {
  private endpoint;

  constructor() {
    this.endpoint = "/users";
  }

  getMe() {
    const controller = new AbortController();
    const request = apiClientWithAuth.get<User>(`${this.endpoint}/me`, {
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort() };
  }

  editProfile(user: User) {
    const controller = new AbortController();
    const request = apiClientWithAuth.put<User>(`${this.endpoint}`, user, {
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort() };
  }
}

const usersService = new UsersService();

export default usersService;
