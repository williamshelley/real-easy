import * as API_UTIL from "../util/user_api";

export const SET_FOCUSED_USER = "SET_FOCUSED_USER";
export const CLEAR_FOCUSED_USER = "CLEAR_FOCUSED_USER";

export const setFocusedUser = user => ({
  type: SET_FOCUSED_USER,
  user
});

export const clearFocusedUser = () => ({
  type: CLEAR_FOCUSED_USER
});