import { apiClientWithAuth, CanceledError } from "./apiClient";
import { Post, Comment } from "../common/types";
const env = import.meta.env;

export { CanceledError };

class PostsService {
  private endpoint;

  constructor() {
    this.endpoint = "/posts";
  }

  uploadPost(uploadDto: {
    restaurant: string;
    description: string;
    picture: File;
    city: string;
  }) {
    const controller = new AbortController();
    const formData = new FormData();

    Object.entries(uploadDto).forEach(([key, value]) => {
      if (key === "picture" && value instanceof File) {
        formData.append("picture", value);
      } else {
        formData.set(key, value);
      }
    });

    const request = apiClientWithAuth.post(this.endpoint, formData, {
      signal: controller.signal,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return { request, cancel: () => controller.abort() };
  }

  getPost(postId: string) {
    const controller = new AbortController();
    const request = apiClientWithAuth.get<Post>(`${this.endpoint}/${postId}`, {
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort() };
  }

  getByCity(
    city: string,
    page: number = 1,
    pageSize: number = env.VITE_DEFAULT_PAGE_SIZE
  ) {
    const controller = new AbortController();
    const request = apiClientWithAuth.get(
      `${this.endpoint}/city/${city}?page=${page}&pageSize=${pageSize}`,
      {
        signal: controller.signal,
      }
    );
    return { request, cancel: () => controller.abort() };
  }

  addCommentToPost(
    addCommentDto: { body: string; date: Date },
    postId: string
  ) {
    const controller = new AbortController();
    const request = apiClientWithAuth.post<Comment>(
      `${this.endpoint}/${postId}/comment`,
      addCommentDto,
      {
        signal: controller.signal,
      }
    );
    return { request, cancel: () => controller.abort() };
  }

  getByUser(page: number = 1, pageSize: number = env.VITE_DEFAULT_PAGE_SIZE) {
    const controller = new AbortController();
    const request = apiClientWithAuth.get(
      `${this.endpoint}/user/me?page=${page}&pageSize=${pageSize}`,
      {
        signal: controller.signal,
      }
    );
    return { request, cancel: () => controller.abort() };
  }

  editPost(post: Post) {
    const controller = new AbortController();
    const request = apiClientWithAuth.put(
      `${this.endpoint}/${post._id}`,
      post,
      {
        signal: controller.signal,
      }
    );
    return { request, cancel: () => controller.abort() };
  }

  deletePost(postId: string) {
    const controller = new AbortController();
    const request = apiClientWithAuth.delete(`${this.endpoint}/${postId}`, {
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort() };
  }
}

const postsService = new PostsService();

export default postsService;
