export const selectCurrentUser = state => {
  return state.session.currentUser;
}

export const selectFocusedUser = state => {
  return state.entities.focusedUser;
};

export const selectAllUsers = state => {
  return state.entities.users;
}
