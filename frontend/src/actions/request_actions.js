import * as API_UTIL from "../util/api/requests_api_util";
import { ERRORS, receive } from "./generic_actions";

export const DELETE_ONE_REQUEST = "DELETE_ONE_REQUEST";
export const SET_ONE_REQUEST = "SET_ONE_REQUEST";
export const MERGE_ONE_REQUEST = "MERGE_ONE_REQUEST";
export const SET_MANY_REQUESTS = "SET_MANY_REQUESTS";
export const RECEIVE_REQUEST_ERRORS = "RECEIVE_REQUEST_ERRORS";

export const ONE_FIELD = "request";
export const ONE_ID_FIELD = "requestId";
export const MANY_FIELD = "requests";

export const setOneRequest = request => receive(SET_ONE_REQUEST, ONE_FIELD, request);
export const clearOneRequest = requestId => receive(DELETE_ONE_REQUEST, ONE_ID_FIELD, requestId)
export const mergeOneRequest = request => receive(MERGE_ONE_REQUEST, ONE_FIELD, request);
export const setManyRequests = requests => receive(SET_MANY_REQUESTS, MANY_FIELD, requests);

const receiveErrors = errors => receive(RECEIVE_REQUEST_ERRORS, ERRORS, errors);

export const findProjectRequests = (projectId, action) => dispatch => {
  return API_UTIL.getProjectRequests(projectId)
    .then(res => dispatch(action(res.data)))
    .catch(err => dispatch(receiveErrors(err.response.data)));
}

export const makeOneRequest = (request, action) => dispatch => {
  return API_UTIL.makeRequest(request)
    .then(res => dispatch(action(res.data)))
    .catch(err => dispatch(receiveErrors(err.response.data)));
}

export const acceptOneRequest = (requestId, action) => dispatch => {
  return API_UTIL.acceptRequest(requestId)
  .then(res => dispatch(action(res.data)))
  .catch(err => dispatch(receiveErrors(err.response.data)));
}

export const declineOneRequest = (requestId, action) => dispatch => {
  return API_UTIL.declineRequest(requestId)
  .then(res => dispatch(action(res.data)))
  .catch(err => dispatch(receiveErrors(err.response.data)));
}

export const deleteOneRequest = (requestId, action) => dispatch => {
  return API_UTIL.deleteRequest(requestId)
  .then(res => {
    return dispatch(action(res.data))
  })
  .catch(err => {
    return dispatch(receiveErrors(err.response ? err.response.data : err.toLocaleString()));
  });
}