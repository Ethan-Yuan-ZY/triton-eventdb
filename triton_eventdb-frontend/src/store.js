import logger from "redux-logger";
import { createStore, combineReducers, applyMiddleware } from "redux";

import userReducer from "./reducers/userReducer";

export default createStore(
  combineReducers({ userReducer }),
  {},
  applyMiddleware(logger)
);
