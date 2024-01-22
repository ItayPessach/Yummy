import { apiClientWithAuth, CanceledError } from "./apiClient";
import { Post, Comment } from "../common/types";

export { CanceledError };

class PostsService {
  private endpoint;

  constructor() {
    this.endpoint = "/posts";
  }

  uploadPost(post: Post) {
    const controller = new AbortController();
    const formData = new FormData();

    Object.entries(post).forEach(([key, value]) => {
      if (key === "image" && value instanceof File) {
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

  getByCity(city: string) {
    const controller = new AbortController();
    const request = apiClientWithAuth.get(`${this.endpoint}/city/${city}`, {
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort() };
  }

  addCommentToPost(comment: Comment, postId: string) {
    const controller = new AbortController();
    const request = apiClientWithAuth.post<Comment>(
      `${this.endpoint}/${postId}/comment`,
      comment,
      {
        signal: controller.signal,
      }
    );
    return { request, cancel: () => controller.abort() };
  }

  getPostsByUser(userId: string) {
    const controller = new AbortController();
    const request = apiClientWithAuth.get(`${this.endpoint}/user/${userId}`, {
      signal: controller.signal,
    });
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
