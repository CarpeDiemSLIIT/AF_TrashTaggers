import axios from "axios";
const API_URL = "http://localhost:3001/api/posts/";

const getAllPosts = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + "all", config);
  return response.data;
};

const addNewPost = async (post, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL + "add", post, config);
  return response.data;
};

export default {
  getAllPosts,
  addNewPost,
};
