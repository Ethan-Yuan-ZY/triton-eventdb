import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers, applyMiddleware } from "redux";

import logger from "redux-logger";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App";
import { createReadStream } from "fs";

const userReducer = (
  state = {
    name: "Max",
    age: 27,
    token: null,
    userId: null
  },
  action
) => {
  switch (action.type) {
    case "SET_NAME":
      state = {
        ...state,
        name: action.payload
      };
      break;
    case "LOGIN":
      state = {
        ...state,
        token: action.payload.token,
        userId: action.payload.userId
      };
      break;
    case "LOGOUT":
      state = {
        ...state,
        token: null,
        userId: null
      };
      break;
  }
  return state;
};

const store = createStore(
  combineReducers({ userReducer }),
  {},
  applyMiddleware(logger)
);

store.subscribe(() => {
  // console.log("store updated")
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
