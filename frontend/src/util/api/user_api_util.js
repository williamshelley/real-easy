import axios from "axios";

// fetch user of id 'hash'
export const fetchOneUser = id => {
  return axios.get(`api/users/${id}`);
}

// fetch multiple users that match 'filters'
export const fetchUsers = filters => {
  return axios.post("api/users", { filters });
};