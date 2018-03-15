import React from "react";
import Home from "./Home/Home";
import { Provider } from "react-redux";
import createStore from "./../stores";

const feeds = {
  feeds: {
    selected: "Echojs",
    sources: {
      Echojs: {
        name: "Echojs",
        feeds: []
      },
      Medium: {
        name: "Medium",
        feeds: []
      }
    }
  }
};

const store = createStore(feeds);

export default (
  <Provider store={store}>
    <Home />
  </Provider>
);
