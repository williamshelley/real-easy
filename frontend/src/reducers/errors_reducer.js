import { merge } from "lodash";

const _state = {
  session: {},
  ui: {},
}

const errorsReducer = (state = _state, action) => {
  Object.freeze(state);
  let newState = merge({}, state);
  switch(action.type) {
    default:
      return newState;
  }
}

export default errorsReducer;