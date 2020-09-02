import * as API_UTIL from "../util/session_api";
import jwt_decode from 'jwt-decode';
export const LOGIN_CURRENT_USER = "LOGIN_CURRENT_USER";
export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";

export const JWT_TOKEN = "JWT_TOKEN";

const decode = (response) => {
  const { token } = response.data;
  localStorage.setItem(JWT_TOKEN, token);
  API_UTIL.setAuthToken(token);
  const decoded = jwt_decode(token);
  return decoded;
}

export const loginUser = user => ({
  type: LOGIN_CURRENT_USER,
  user
});

export const logoutUser = () => ({
  type: LOGOUT_CURRENT_USER
});

export const receiveSessionErrors =  errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
});

export const login = user => dispatch => {
  return (API_UTIL.login(user)
    .then(res => dispatch(loginUser(decode(res))))
    .catch(err => dispatch(receiveSessionErrors(err.response.data)))
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
    .then(res => dispatch(loginUser(decode(res))))
    .catch(err => dispatch(receiveSessionErrors(err.response.data)))
  );
}