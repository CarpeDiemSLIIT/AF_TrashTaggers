import axios from "axios";
const API_URL = "http://localhost:3001/api/reports/";

const getAllReports = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + "all", config);
  return response.data;
};

const addNewReport = async (reason, pid, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL + `add/${pid}`, { reason }, config);
  return response.data;
};

const resolveReport = async (reportID, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.patch(
    API_URL + `resolve/${reportID}`,
    {},
    config
  );
  return response.data;
};

const resolveReportBanCreator = async (reportID, authorID, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.patch(
    API_URL + `resolve/banCreator/${authorID}`,
    { reportID },
    config
  );
  return response.data;
};

const resolveReportRemovePost = async (reportID, postID, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.patch(
    API_URL + `resolve/removePost/${postID}`,
    { reportID },
    config
  );
  return response.data;
};

export default {
  getAllReports,
  addNewReport,
  resolveReport,
  resolveReportBanCreator,
  resolveReportRemovePost,
};
