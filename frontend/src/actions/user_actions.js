import * as API_UTIL from "../util/api/user_api_util";

export const SET_FOCUSED_USER = "SET_FOCUSED_USER";
export const CLEAR_FOCUSED_USER = "CLEAR_FOCUSED_USER";
export const MERGE_ONE_USER = "MERGE_ONE_USER";
export const MERGE_USERS = "MERGE_USERS";
export const SET_ONE_USER = "SET_ONE_USER";
export const SET_USERS = "SET_USERS";
export const RECEIVE_USER_ERRORS = "RECEIVE_USER_ERRORS";

export const setFocusedUser = user => ({
  type: SET_FOCUSED_USER,
  user
});

export const clearFocusedUser = () => ({
  type: CLEAR_FOCUSED_USER
});

export const mergeOneUser = user => ({
  type: MERGE_ONE_USER,
  user
})

export const mergeUsers = users => ({
  type: MERGE_USERS,
  users
});

export const setOneUser = user => ({
  type: SET_ONE_USER,
  user
});

export const setUsers = users => ({
  type: SET_USERS,
  users
});

export const receiveUserErrors = errors => ({
  type: RECEIVE_USER_ERRORS,
  errors
});

export const findMergeOneUser = id => dispatch => {
  return (API_UTIL.fetchOneUser(id)
    .then(user => {
      return dispatch(mergeOneUser(user.data));
    })
    .catch(errors => dispatch(receiveUserErrors(errors)))
  );
}

export const findMergeUsers = filters => dispatch => {
  return (API_UTIL.fetchUsers(filters)
    .then(users => {
      return dispatch(mergeUsers(users.data));
    })
    .catch(errors => dispatch(receiveUserErrors(errors)))
  );
}

export const findSetOneUser = id => dispatch => {
  return (API_UTIL.fetchOneUser(id)
    .then(user => {
      return dispatch(setOneUser(user.data));
    })
    .catch(errors => dispatch(receiveUserErrors(errors)))
  );
}

export const findSetUsers = filters => dispatch => {
  return (API_UTIL.fetchUsers(filters)
    .then(users => {
      return dispatch(setUsers(users.data));
    })
    .catch(errors => dispatch(receiveUserErrors(errors)))
  );
}