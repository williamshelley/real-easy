import React from 'react';
import ReactDOM from 'react-dom';
import Root from './root';
import configureStore from './store/store';

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");
  const preloadedState = {}
  const store = configureStore(preloadedState);

  window.getState = store.getState;
  window.dispatch = store.dispatch;

  ReactDOM.render(<Root store={store} />, root);
});