import axios from "axios";

export const getProjectRequests = projectId => {
  return axios.post(`api/requests/get-project-requests`, { projectId });
}

export const makeRequest = request => {
  return axios.post(`/api/requests/new`, { projectRequest: request });
}

export const acceptRequest = id => {
  return axios.post(`api/requests/accept`, { requestId: id });
}

export const declineRequest = id => {
  return axios.post(`api/requests/decline`, { requestId: id });
}

export const deleteRequest = requestId => {
  return axios.post(`api/requests/delete`, { requestId });
}