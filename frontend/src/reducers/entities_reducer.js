import { combineReducers } from "redux";
import usersReducer from "./users_reducer";
import usersSearchReducer from "./users_search_reducer";
import focusedUserReducer from "./focused_user_reducer";
import projectsReducer from "./projects_reducer";
import positionsReducer from "./positions_reducer";

const entitiesReducer = combineReducers({
  users: usersReducer,
  usersSearch: usersSearchReducer,
  focusedUser: focusedUserReducer,
  projects: projectsReducer,
  positions: positionsReducer,
});

export default entitiesReducer;