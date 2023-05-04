import axios from "axios";
const API_URL = "http://localhost:3001/api/compevents/";

const getAllCevents = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + "all", config);
  return response.data;
};

const addNewCevent = async (cevent, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL + "new", cevent, config);
  return response.data;
};

export default {
  getAllCevents,
  addNewCevent,
};
