import { SET_FOCUSED_USER, CLEAR_FOCUSED_USER } from "../actions/user_actions";

const focusedUserReducer = (state = null, action) => {
  Object.freeze(state);
  switch(action.type) {
    case SET_FOCUSED_USER:
      return action.user;
    case CLEAR_FOCUSED_USER:
      return null;
    default:
      return state;
  }
}

export default focusedUserReducer;