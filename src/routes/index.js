import React from "react";
import Home from "./Home/Home";
import { Provider } from "react-redux";
import createStore from "./../stores";

const store = createStore({
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
});

export default (
  <Provider store={store}>
    <Home />
  </Provider>
);
