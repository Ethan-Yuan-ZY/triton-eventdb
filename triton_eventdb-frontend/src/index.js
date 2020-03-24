import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers, applyMiddleware } from "redux";

import logger from "redux-logger";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App";
import store from "./store";
import { createReadStream } from "fs";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
