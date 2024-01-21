import { apiClientWithAuth, CanceledError } from "./apiClient";
import { Post, Comment } from "../common/types";

export { CanceledError };

class PostsService {
  private endpoint;

  constructor() {
    this.endpoint = "/posts";
  }

  addPost(post: Post) {
    const controller = new AbortController();
    const request = apiClientWithAuth.post<Post>(this.endpoint, post, {
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort() };
  }

  getByCity(city: string) {
    const controller = new AbortController();
    const request = apiClientWithAuth.get<Post[]>(
      `${this.endpoint}/city/${city}`,
      {
        signal: controller.signal,
      }
    );
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
    const request = apiClientWithAuth.get<Post[]>(
      `${this.endpoint}/user/${userId}`,
      {
        signal: controller.signal,
      }
    );
    return { request, cancel: () => controller.abort() };
  }

  editPost(post: Post) {
    const controller = new AbortController();
    const request = apiClientWithAuth.put<Post>(
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
    const request = apiClientWithAuth.delete<Post>(
      `${this.endpoint}/${postId}`,
      {
        signal: controller.signal,
      }
    );
    return { request, cancel: () => controller.abort() };
  }
}

const postsService = new PostsService();

export default postsService;
