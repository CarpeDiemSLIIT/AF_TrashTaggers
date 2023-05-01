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

const getAllSuspendedUsers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + "allSuspend", config);
  return response.data;
};

const suspendUsers = async (token, deleteID) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.patch(
    API_URL + `suspendUser/${deleteID}`,
    {},
    config
  );
  return response.data;
};

const reActiveUsers = async (token, deleteID) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.patch(
    API_URL + `reActiveUser/${deleteID}`,
    {},
    config
  );
  return response.data;
};

export default {
  getAllUsers,
  getAllSuspendedUsers,
  suspendUsers,
  reActiveUsers,
};
