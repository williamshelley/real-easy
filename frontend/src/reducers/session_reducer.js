import { merge } from "lodash";

const _state = { currentUser: null };

const sessionReducer = (state = _state, action) => {
  Object.freeze(state);
  let newState = merge({}, state);
  switch(action.type) {
    default:
      return newState;
  }
}

export default sessionReducer;