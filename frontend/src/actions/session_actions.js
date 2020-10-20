import * as API_UTIL from "../util/api/session_api_util";
import jwt_decode from 'jwt-decode';
import { clear, receive, ERRORS } from "./generic_actions";
export const LOGIN_CURRENT_USER = "LOGIN_CURRENT_USER";
export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";

export const JWT_TOKEN = "JWT_TOKEN";

const LOGIN_FIELD = "user";

const decode = response => {
  const { token } = response.data;
  localStorage.setItem(JWT_TOKEN, token);
  API_UTIL.setAuthToken(token);
  const decoded = jwt_decode(token);
  return decoded;
}

const loginUser = user => receive(LOGIN_CURRENT_USER, LOGIN_FIELD, user);

const logoutUser = () => clear(LOGOUT_CURRENT_USER);

const receiveSessionErrors =  errors => {
  return receive(RECEIVE_SESSION_ERRORS, ERRORS, errors);
}

export const login = user => dispatch => {
  return (API_UTIL.login(user)
    .then(res => dispatch(loginUser(decode(res))))
    .catch(err => {
      return dispatch(receiveSessionErrors(err.response.data));
    })
  );
}

export const logout = () => dispatch => {
  localStorage.removeItem(JWT_TOKEN);
  return (API_UTIL.setAuthToken(false)
    .then(() => dispatch(logoutUser()))
    .catch(err => dispatch(receiveSessionErrors(err.response.data)))
  );
}

export const signup = user => dispatch => {
  return (API_UTIL.signup(user)
    .then(res => {
      return dispatch(loginUser(decode(res)))
    })
    .catch(err => dispatch(receiveSessionErrors(err.response.data)))
  );
}