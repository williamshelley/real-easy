import { merge } from "lodash";
import { MERGE_MANY_POSITIONS, MERGE_ONE_POSITION,SET_MANY_POSITIONS,SET_ONE_POSITION } from "../actions/position_actions";

const positionsReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = merge({}, state);
  switch(action.type) {
    case SET_MANY_POSITIONS:
      return action.positions;
    case SET_ONE_POSITION:
      return merge({}, { [action.position.id]: action.position });
    case MERGE_MANY_POSITIONS:
      return merge({}, newState, action.positions);
    case MERGE_ONE_POSITION:
      return merge({}, newState, { [action.position.id]: action.position });
    default: 
      return newState;
  }
}

export default positionsReducer;