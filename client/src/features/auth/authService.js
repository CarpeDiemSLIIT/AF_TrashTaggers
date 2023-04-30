import axios from "axios";

const API_URL = "http://localhost:3001/api/auth/";

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem("user");
};

const setMode = (state) => {
  localStorage.setItem("mode", state);
};

const makeMeAdmin = async () => {
  const response = await axios.put(API_URL + "makeMeAdmin");
  return response.data;
};
const authService = {
  logout,
  login,
  setMode,
  makeMeAdmin,
};

export default authService;
