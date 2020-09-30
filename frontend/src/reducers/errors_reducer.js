import { combineReducers } from "redux";
import sessionErrorsReducer from "./session_errors_reducer";
import userErrorsReducer from "./user_errors_reducer";

const errorsReducer = combineReducers({
  users: userErrorsReducer,
  session: sessionErrorsReducer,
});

export default errorsReducer;