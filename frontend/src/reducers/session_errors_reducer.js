import { merge } from "lodash";
import { RECEIVE_SESSION_ERRORS } from "../actions/session_actions";

const sessionErrorsReducer = (state = [], action) => {
  Object.freeze(state);
  let newState = merge([], state);
  switch(action.type) {
    case RECEIVE_SESSION_ERRORS:
      return merge(newState, action.errors);
    default:
      return newState;
  }
}

export default sessionErrorsReducer;