import React from 'react';
import ReactDOM from 'react-dom';
import jwt_decode from "jwt-decode";
import Root from './components/root';
import configureStore from './store/store';
import { JWT_TOKEN, logout, login } from './actions/session_actions';
import { setAuthToken } from './util/api/session_api_util';
import { postNewProject } from './util/api/project_api_util';
import { acceptOneRequest, declineOneRequest, makeOneRequest, setOneRequest } from './actions/request_actions';

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");
  const token = localStorage[JWT_TOKEN];
  let store;
  if (token) {
    setAuthToken(token);
    const restoredUser = jwt_decode(token);
    const preloadedState = { session: { currentUser: restoredUser } };
    store = configureStore(preloadedState);
    const currentTime = Date.now() / 1000;
    if (restoredUser.exp < currentTime) {
      store.dispatch(logout());
    }
  } else {
    store = configureStore();
  }

  window.getState = store.getState;
  window.dispatch = store.dispatch;
  window.login = login;
  window.logout = logout;

  window.acceptRequest = acceptOneRequest;
  window.declineRequest = declineOneRequest;
  window.setRequest = setOneRequest;
  window.makeRequest = makeOneRequest;

  window.postNewProject = postNewProject;

  ReactDOM.render(<Root store={store} />, root);
});