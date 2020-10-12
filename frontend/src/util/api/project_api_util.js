import axios from "axios";

export const postNewProject = project => {
  return axios.post("api/projects", project);
}

export const getOneProject = id => {
  return axios.get(`api/projects/${id}`);
}

export const getManyUserProjects = userId => {
  return axios.get(`api/projects/users/${userId}`);
}