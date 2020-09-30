import { merge } from "lodash";
import { MERGE_MANY_USERS_SEARCH, SET_MANY_USERS_SEARCH, MERGE_ONE_USER_SEARCH, SET_ONE_USER_SEARCH } from "../actions/user_search_actions";

const usersSearchReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = merge({}, state);
  switch(action.type) {
    case MERGE_MANY_USERS_SEARCH:
      return merge({}, newState, action.users);
    case SET_MANY_USERS_SEARCH:
      return action.users;
    case MERGE_ONE_USER_SEARCH:
      return merge({}, newState, { [action.user.id]: action.user });
    case SET_ONE_USER_SEARCH:
      return merge({}, { [action.user.id]: action.user });
    default: 
      return newState;
  }
}

export default usersSearchReducer;