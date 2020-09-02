import { combineReducers } from "redux";
import usersReducer from "./users_reducer";
import focusedUserReducer from "./focused_user_reducer";

const entitiesReducer = combineReducers({
  users: usersReducer,
  focusedUser: focusedUserReducer,
});

export default entitiesReducer;