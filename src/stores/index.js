import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { browserHistory } from "react-router";
import { routerMiddleware } from "react-router-redux";
import rootReducer from "../reducers";
import Amplitude, { reduxMiddleware } from "./../utils/amplitude";

const enhancer = compose(
  applyMiddleware(reduxMiddleware(Amplitude), thunk),
  applyMiddleware(routerMiddleware(browserHistory)),
  process.env.NODE_ENV === "test"
    ? compose
    : process.env.NODE_ENV !== "production" &&
      window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : compose
);

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer);
  if (module.hot) {
    module.hot.accept("../reducers", () => {
      const nextRootReducer = require("../reducers").default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
