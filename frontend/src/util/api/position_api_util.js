import axios from "axios";

export const getUserPositions = userId => {
  return axios.get(`api/positions/${userId}`);
}