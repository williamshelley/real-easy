import { merge } from "lodash";
import { DELETE_ONE_REQUEST, SET_MANY_REQUESTS, SET_ONE_REQUEST } from "../actions/request_actions";

const requestsReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = merge({}, state);
  switch(action.type) {
    case SET_ONE_REQUEST:
      return merge({}, { [action.request.id]: action.request });
    case SET_ONE_REQUEST:
      return merge(newState, { [action.request.id]: action.request });
    case SET_MANY_REQUESTS:
      newState = {};
      action.requests.forEach(r => {
        newState[r.id] = r;
      });
      return newState;
    case DELETE_ONE_REQUEST:
      delete newState[action.requestId];
      return newState;
    default: 
      return newState;
  }
}

export default requestsReducer;