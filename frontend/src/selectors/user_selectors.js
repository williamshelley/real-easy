export const selectCurrentUser = state => {
  return state.session.currentUser;
}

export const selectFocusedUser = state => {
  return state.entities.focusedUser;
};

export const selectAllUsers = state => {
  return state.entities.users;
}

export const selectUser = (id, state) => {
  return state.entities.users[id];
}
