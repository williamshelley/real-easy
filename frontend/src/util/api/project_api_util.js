import axios from "axios";

export const postNewProject = project => {
  return axios.post("api/projects/new", { project });
}

// export const getOneProject = id => {
//   return axios.get(`api/projects/${id}`);
// }

export const getOneProject = id => {
  return axios.post("api/projects/get-one", { filters: { id } });
}

// export const getManyUserProjects = userId => {
//   return axios.get(`api/projects/users/${userId}`);
// }

export const getManyUserProjects = user => {
  return axios.post("api/projects/get-many", { filters: { user, owner: user } })
}

export const editOneProject = project => {
  return axios.post("api/projects/edit", { project });
}