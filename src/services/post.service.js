import axios from "axios";
import authHeader from "./auth.header";
const API = "https://final-blog-api.herokuapp.com/posts/";

class PostService {
  getAllPosts() {
    return axios.get(`${API}`, { headers: authHeader() });
  }
  getOnePost(postId) {
    return axios.get(`${API}${postId}`, { headers: authHeader() });
  }
}

export default new PostService();
