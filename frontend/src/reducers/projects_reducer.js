import { merge } from "lodash";
import { MERGE_MANY_PROJECTS, MERGE_ONE_PROJECT, SET_MANY_PROJECTS, SET_ONE_PROJECT } from "../actions/project_actions";

const projectsReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = merge({}, state);
  switch(action.type) {
    case SET_MANY_PROJECTS:
      return action.projects;
    case MERGE_MANY_PROJECTS:
      return merge({}, newState, action.projects);
    case MERGE_ONE_PROJECT:
      return merge({}, newState, { [action.project.id]: action.project });
    case SET_ONE_PROJECT:
      return merge({}, { [action.project.id]: action.project });
    default: 
      return newState;
  }
}

export default projectsReducer;