import { merge } from "lodash";
import { LOGIN_CURRENT_USER, LOGOUT_CURRENT_USER } from "../actions/session_actions";

const _state = { currentUser: null };

const sessionReducer = (state = _state, action) => {
  Object.freeze(state);
  let newState = merge({}, state);
  switch(action.type) {
    case LOGIN_CURRENT_USER:
      newState.currentUser = action.user;
      return newState;
    case LOGOUT_CURRENT_USER:
      delete newState.currentUser;
      newState.currentUser = null;
      return newState;
    default:
      return newState;
  }
}

export default sessionReducer;