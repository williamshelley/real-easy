import { merge } from "lodash";
import { POP_MODAL, PUSH_MODAL } from "../actions/ui_actions";

const uiReducer = (state = [], action) => {
  Object.freeze(state);
  let newState = merge([], state);
  switch(action.type) {
    case PUSH_MODAL:
      let shouldPush = true;
      newState.forEach(modal => {
        if (modal.name === action.modal.name) {
          shouldPush = false;
        }
      });
      if (shouldPush) {
        newState.push(action.modal);
      }

      return newState;
    case POP_MODAL:
      if (newState.length > 0) {
        newState.pop();
      }
      return newState;
    default:
      return newState;
  }
}

export default uiReducer;