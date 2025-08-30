import api from "./axios";

const PostsApi = {
  fetchPosts: (params) => api.get("/posts", { params }),
};
