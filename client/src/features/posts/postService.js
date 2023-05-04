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

const approveNewPost = async (postId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.patch(API_URL + `approve/${postId}`, {}, config);
  return response.data;
};

const rejectNewPost = async (postId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.patch(API_URL + `reject/${postId}`, {}, config);
  return response.data;
};

const addNewComment = async (comment, postID, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    API_URL + `comment/${postID}`,
    { comment },
    config
  );
  return response.data;
};

export default {
  getAllPosts,
  addNewPost,
  approveNewPost,
  rejectNewPost,
  addNewComment,
};
