import { merge } from "lodash";

const usersReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = merge({}, state);
  switch(action.type) {
    default: 
      return newState;
  }
}

export default usersReducer;