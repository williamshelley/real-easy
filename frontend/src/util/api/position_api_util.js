import axios from "axios";

export const getUserPositions = userId => {
  return axios.get(`api/positions/${userId}`);
}

export const getProjectPositions = projectId => {
  return axios.post("api/positions/", { projectId });
}