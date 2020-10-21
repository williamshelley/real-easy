import * as API_UTIL from "../util/api/position_api_util";
import { receive } from "./generic_actions";

export const SET_ONE_POSITION = "SET_ONE_POSITION";
export const MERGE_ONE_POSITION = "MERGE_ONE_POSITION";

export const SET_MANY_POSITIONS = "SET_MANY_POSITIONS";
export const MERGE_MANY_POSITIONS = "MERGE_MANY_POSITIONS";

export const RECEIVE_POSITION_ERRORS = "RECEIVE_POSITION_ERRORS";

const ONE_FIELD = "position";
const MANY_FIELD = "positions";
const ERRORS_FIELD = "errors";

const receiveErrors = errors => receive(RECEIVE_POSITION_ERRORS, ERRORS_FIELD, errors);

const receiveOne = (type, project) => receive(type, ONE_FIELD, project);
const receiveMany = (type, projects) => receive(type, MANY_FIELD, projects);

export const setOnePosition = project => receiveOne(SET_ONE_POSITION, project);
export const mergeOnePosition = project => receiveOne(MERGE_ONE_POSITION, project);

export const setManyPositions = projects => receiveMany(SET_MANY_POSITIONS, projects);
export const mergeManyPositions = projects => receiveMany(MERGE_MANY_POSITIONS, projects);

export const clearPositions = () => receiveMany(SET_MANY_POSITIONS, {});

export const findUserPositions = (userId, action) => dispatch => {
  return API_UTIL.getUserPositions(userId)
    .then(res => {
      return dispatch(action(res.data));
    })
    .catch(errors => dispatch(receiveErrors(errors)));
}

export const findProjectPositions = (projectId, action) => dispatch => {
  return API_UTIL.getProjectPositions(projectId)
    .then(res => {
      return dispatch(action(res.data))
    })
    .catch(errors => dispatch(receiveErrors(errors)));
}