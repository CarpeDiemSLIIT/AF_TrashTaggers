import axios from "axios";
// const API_URL = "/api/posts/";
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

//approve new post
const approveNewPost = async (postId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.patch(API_URL + `approve/${postId}`, {}, config);
  return response.data;
};
//reject new post
const rejectNewPost = async (postId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.patch(API_URL + `reject/${postId}`, {}, config);
  return response.data;
};

const deletePost = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + `${id}/delete`, config);
  return response.data;
};

const updatePost = async (post, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(API_URL + `update/${post.id}`, post, config);

  return response.data;
};
const updatePostImage = async (post, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    API_URL + `updatePostImage/${post.id}`,
    post.formData,
    config
  );

  return response.data;
};

const upVotePost = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.patch(API_URL + `${id}/upvote`, {}, config);
  return response.data;
};
const downVotePost = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.patch(API_URL + `${id}/downvote`, {}, config);
  return response.data;
};
const newComment = async (postIdAndComment, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(
    API_URL + `${postIdAndComment.postId}/newComment`,
    { comment: postIdAndComment.comment },
    config
  );
  return response.data;
};
export default {
  getAllPosts,
  addNewPost,
  deletePost,
  upVotePost,
  downVotePost,
  newComment,
  //admin
  updatePost,
  updatePostImage,
  approveNewPost,
  rejectNewPost,
};
