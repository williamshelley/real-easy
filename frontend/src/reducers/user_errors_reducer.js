import { merge } from "lodash";
import { RECEIVE_USER_ERRORS } from "../actions/user_actions";

const userErrorsReducer = (state = [], action) => {
  Object.freeze(state);
  let newState = merge([], state);
  switch(action.type) {
    case RECEIVE_USER_ERRORS:
      return merge(newState, action.errors);
    default:
      return newState;
  }
}

export default userErrorsReducer;