import axios from "axios";

export const newProject = project => {
  return axios.post("api/projects", project);
}