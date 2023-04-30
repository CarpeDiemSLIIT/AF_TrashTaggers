import axios from "axios";
const API_URL = "http://localhost:3001/api/users/";

const getAllUsers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + "all", config);
  return response.data;
};

export default {
  getAllUsers,
};
