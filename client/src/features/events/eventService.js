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

const addNewEvent = async (event, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL + "new", event, config);
  return response.data;
};


const deleteEvent = async (eventId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + eventId, config)

  return response.data
}


const updateEvent= async (EventData, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  console.log(JSON.stringify(EventData));
    const response = await axios.put(API_URL + EventData._id,EventData, config)
    console.log(JSON.stringify(response));
  
    return response.data
  }


export default {
    getAllEvents,
    addNewEvent,
    deleteEvent,
    updateEvent,
};
