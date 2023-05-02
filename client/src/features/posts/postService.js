import axios from "axios";
const API_URL = "http://localhost:3001/api/posts/";

const getAllPosts = async () => {
  const response = await axios.get(API_URL + "all");
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

const upVotePost = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.patch(API_URL + `${id}/upvote`, {}, config);
  console.log(response.data);
  return response.data;
};
const downVotePost = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.patch(API_URL + `${id}/downvote`, {}, config);
  console.log(response.data);
  return response.data;
};

export default {
  getAllPosts,
  addNewPost,
  upVotePost,
  downVotePost,
};
