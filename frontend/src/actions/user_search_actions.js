import * as API_UTIL from "../util/api/user_api_util";
import { ERRORS, receive } from "./generic_actions";
import { receiveOneUser, receiveManyUsers } from "./user_actions";

export const MERGE_ONE_USER_SEARCH = "MERGE_ONE_USER_SEARCH";
export const MERGE_MANY_USERS_SEARCH = "MERGE_MANY_USERS_SEARCH";
export const SET_ONE_USER_SEARCH = "SET_ONE_USER_SEARCH";
export const SET_MANY_USERS_SEARCH = "SET_MANY_USERS_SEARCH";
export const RECEIVE_USER_SEARCH_ERRORS = "RECEIVE_USER_SEARCH_ERRORS";

export const mergeOneUserSearch = user => {
  return receiveOneUser(MERGE_ONE_USER_SEARCH, user);
}

export const mergeManyUsersSearch = users => {
  return receiveManyUsers(MERGE_MANY_USERS_SEARCH, users);
};

export const setOneUserSearch = user => {
  return receiveOneUser(SET_ONE_USER_SEARCH, user);
};

export const setManyUsersSearch = users => {
  return receiveManyUsers(SET_MANY_USERS_SEARCH, users);
};

export const receiveUserSearchErrors = errors => {
  return receive(RECEIVE_USER_SEARCH_ERRORS, ERRORS, errors);
};

export const clearAllUsersSearch = () => {
  return receiveManyUsers(SET_MANY_USERS_SEARCH, {});
}

export const findOneUserSearch = (id, action) => dispatch => {
  return (API_UTIL.fetchOneUser(id)
    .then(user => {
      return dispatch(action(user.data));
    })
    .catch(errors => dispatch(receiveUserSearchErrors(errors)))
  );
}

export const findManyUsersSearch = (filters, action) => dispatch => {
  return (API_UTIL.fetchUsers(filters)
    .then(users => {
      return dispatch(action(users.data));
    })
    .catch(errors => dispatch(receiveUserSearchErrors(errors)))
  );
}