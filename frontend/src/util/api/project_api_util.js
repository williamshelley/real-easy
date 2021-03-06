import axios from "axios";

export const postNewProject = project => {
  return axios.post("api/projects/new", { project });
}

export const getOneProject = id => {
  return axios.post("api/projects/get-one", { filters: { id } });
}

export const getManyUserProjects = user => {
  return axios.post("api/projects/get-many", { filters: { user, owner: user } })
}

export const editOneProject = project => {
  return axios.post("api/projects/edit", { project });
}