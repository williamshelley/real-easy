import { merge } from "lodash";

const positionsReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = merge({}, state);
  switch(action.type) {
    default: 
      return newState;
  }
}

export default positionsReducer;