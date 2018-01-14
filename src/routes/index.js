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
        url: "http://www.echojs.com/rss",
        feeds: []
      },
      HackerNook: {
        name: "Hacker Noon",
        url: "https://hackernoon.com/feed",
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
