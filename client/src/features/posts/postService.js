import axios from "axios";
const API_URL = "http://localhost:3001/api/admin/order/";

const getAllPosts = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + "get/all", config);
  return response.data;
};

export default {
  getAllPosts,
};
