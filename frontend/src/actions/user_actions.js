import * as API_UTIL from "../util/api/user_api_util";
import { receive, clear } from "./generic_actions";

export const SET_FOCUSED_USER = "SET_FOCUSED_USER";
export const CLEAR_FOCUSED_USER = "CLEAR_FOCUSED_USER";
export const MERGE_ONE_USER = "MERGE_ONE_USER";
export const MERGE_MANY_USERS = "MERGE_MANY_USERS";
export const SET_ONE_USER = "SET_ONE_USER";
export const SET_MANY_USERS = "SET_MANY_USERS";
export const RECEIVE_USER_ERRORS = "RECEIVE_USER_ERRORS";

const ONE_FIELD = "user";
const MANY_FIELD = "users";
const ERRORS_FIELD = "errors";

// generic user actions
export const receiveOneUser = (type = SET_ONE_USER, user) => {
  return receive(type, ONE_FIELD, user);
};

export const receiveManyUsers = (type = SET_MANY_USERS, users) => {
  return receive(type, MANY_FIELD, users);
};

export const clearOneUser = (type = CLEAR_FOCUSED_USER) => clear(type);

export const receiveUserErrors = errors => {
  return receive(RECEIVE_USER_ERRORS, ERRORS_FIELD, errors);
};

// specific actions
export const setFocusedUser = user => receiveOneUser(SET_FOCUSED_USER, user);
export const mergeOneUser = user => receiveOneUser(MERGE_ONE_USER, user);
export const setOneUser = user => receiveOneUser(SET_ONE_USER, user);

export const mergeManyUsers = users => receiveManyUsers(MERGE_MANY_USERS, users);
export const setManyUsers = users => receiveManyUsers(SET_MANY_USERS, users);

export const clearFocusedUser = clearOneUser(CLEAR_FOCUSED_USER);


// thunk actions
export const findOneUser = (id, action) => dispatch => {
  return (API_UTIL.fetchOneUser(id)
    .then(user => dispatch(action(user.data)))
    .catch(errors => dispatch(receiveUserErrors(errors)))
  );
}

export const findManyUsers = (id, action) => dispatch => {
  return (API_UTIL.fetchUsers(id)
    .then(user => {
      return dispatch(action(user.data));
    })
    .catch(errors => dispatch(receiveUserErrors(errors)))
  );
}