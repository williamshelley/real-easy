import { merge } from "lodash";
import { MERGE_ONE_USER, MERGE_USERS, SET_ONE_USER, SET_USERS } from "../actions/user_actions";

const usersReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = merge({}, state);
  switch(action.type) {
    case MERGE_USERS:
      return merge({}, newState, action.users);
    case SET_USERS:
      return action.users;
    case MERGE_ONE_USER:
      return merge({}, newState, { [action.user.id]: action.user });
    case SET_ONE_USER:
      return merge({}, { [action.user.id]: action.user });
    default: 
      return newState;
  }
}

export default usersReducer;