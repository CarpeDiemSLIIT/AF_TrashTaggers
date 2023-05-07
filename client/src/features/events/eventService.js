import axios from "axios";
const API_URL = "http://localhost:3001/api/events/";

const getAllEvents = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + "all", config);
  return response.data;
};

const addNewEvent = async (cevent, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL + "new", cevent, config);
  return response.data;
};


const deleteEvent = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + `${id}`, config);
  return response.data;
};

const updateEvent = async (post, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(API_URL + `${post.id}`, post, config);

  return response.data;
};



export default {
  getAllEvents,
  addNewEvent,
  deleteEvent,
  updateEvent
};
