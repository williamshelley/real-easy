import { merge } from "lodash";
import { MERGE_SEARCH_USERS, SET_SEARCH_USERS, MERGE_ONE_SEARCH_USER, SET_ONE_SEARCH_USER } from "../actions/user_actions";

const usersReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = merge({}, state);
  switch(action.type) {
    case MERGE_SEARCH_USERS:
      return merge({}, newState, action.users);
    case SET_SEARCH_USERS:
      return action.users;
    case MERGE_ONE_SEARCH_USER:
      return merge({}, newState, { [action.user.id]: action.user });
    case SET_ONE_SEARCH_USER:
      return merge({}, { [action.user.id]: action.user });
    default: 
      return newState;
  }
}

export default usersReducer;