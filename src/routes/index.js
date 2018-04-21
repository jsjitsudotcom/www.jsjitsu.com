import React from "react";
import Discover from "./../components/Discover/Discover";
import { Provider } from "react-redux";
import createStore from "./../stores";

const store = createStore();

export default (
  <Provider store={store}>
    <Discover />
  </Provider>
);
